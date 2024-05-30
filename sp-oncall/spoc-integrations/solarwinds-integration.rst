SolarWindws integration for Splunk On-Call
**********************************************************

This guide will walk you through integrating SolarWinds Orion alerts to
VictorOps using the SolarWinds API URL endpoint in VictorOps. SolarWinds
Orion NPM is needed for the integration, and SAM for the ack-back
component.

In VictorOps
------------

1. In your account, navigate to **Integrations >> SolarWinds**
2. **Enable** the integration
3. Copy the **Service API Endpoint** (this will be used later)
4. Be sure to replace **$routing_key** with a valid `routing
   key <https://help.victorops.com/knowledge-base/routing-keys/>`__ in
   your account

In SolarWinds
-------------

**Configure Alerts**
~~~~~~~~~~~~~~~~~~~~

1.  Navigate to **Alerts & Activity > Alerts** and click **Manage
    Alerts** (to the right) to reach the **Alert Manager**
2.  Select **Add New Alert**. Name the alert *“Send Alert to
    VictorOps\_”*,\_ then configure your desired trigger, reset, and
    time of day conditions
3.  Within the **Trigger Actions** tab select **Add Action**
4.  Select the **Send a Get or Post a URL to a Web Server** action and
    select **Configure Action**
5.  Name your action “*Critical to VictorOps*”, select **Use HTTP/S
    POST**, and enter your VictorOps SolarWinds **Service API
    Endpoint** (found in VictorOps in previous steps). *Note: this is a
    great spot to check for the correct routing_key at the end of the
    Service API Endpoint*
6.  In the **Body to POST**, copy/paste an applicable **Trigger Action**
    payload from below
7.  For **Content Type** you'll want to set it to \_“application/json\_”
    and for **Authentication** you can leave it at “*None*”.
8.  You can configure the rest of the settings however you'd like and
    when you're done be sure to save your changes.
9.  Select **Next** to open the **Reset Action** tab, and again click
    to **Add Action**
10. In the **Body to POST**, copy/paste the corresponding **Reset
    Action** payload from below and click **Add Action**
11. Click **Next** through the Summary tab, review, then **Submit**

**Alert VictorOps for Multiple Actions**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Navigate to **Alerts & Activity > Alerts** and click **Manage
   Alerts** (to the right) to reach the **Alert Manager**
2. Check box next to the newly-created “\ *Send Alert to VictorOps”* and
   select **Assign Action**
3. Assign your Trigger and Reset actions as desired, then
   click **Assign**

**Enable the VictorOps Ack-Back**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This ack-back is a command poll against the VictorOps public API,
configured in SolarWinds as an Application Manager. As such you will
have to create a new user and node in SolarWinds

1. Navigate to **Main Settings & Administration** section in SolarWinds,
   go to **Product Specific Settings > SAM Settings**. Navigate to
   **Application Monitors** > **Manage Application Monitors** >
   **Application Monitor Templates.** 
2. Import the VictorOps Ack-Back.apm-template from
   `here <https://thwack.solarwinds.com/content-exchange/server-application-monitor/m/application-monitor-templates/2853/download>`__
   and replace the script with the v2 version found
   `here <https://help.victorops.com/wp-content/uploads/2019/09/SolarWinds-ack-back-v2.1.txt>`__.
3. From the **Main Settings & Administration** section in SolarWinds, go
   to **Product Specific Settings > SAM Settings**. Navigate to
   **Application Monitors** > **Manage Application Monitors**
4. Click to check the box for “*VictorOps Ack-Back*” and click **Edit
   Properties.** *Note the *\ **Polling Frequency**\ * is set to 60
   seconds, which means SolarWinds will command-poll VictorOps every 60
   seconds for new ACKs*
5. Expand the component **Ack-Back Get Requests**
6. Change the **Credential for Monitoring** to the **SolarWinds API
   User**
7. Double-check the **Script Body** includes the v2 version (from step
   2) of the ack-back script (there is a note saying so near the top of
   the script)
8. Update the PowerShell script with your VictorOps API values and
   SolarWinds primary server name. You can find the VictorOps API values
   from your VictorOps portal under `Settings >>
   API <https://help.victorops.com/knowledge-base/api/>`__\ *.* Near the
   top of the PowerShell script you will find the following variables.
   Replace everything between the quotes with the correct information:
   #Victor Ops Company ID $API_ID = “” #Victor Ops API Key $ApiKey = “”
   #Set to your SolarWinds Primary Application Server
   $SolarWindsServer = “”
9. Click **Submit** to finish

Create a Limited Rights User for SolarWinds Alert Management

1. Navigate to **Settings > All Settings** to reach the **Main Settings
   & Administration** section in SolarWinds. Go to **User Accounts >
   Manage Accounts**
2. Select **Add New Account**
3. Select **Orion individual account**, click **Next**
4. In the **User Name** field enter **solarwindsapi**
5. Enter a password, click **Next**
6. In the **Define Settings** section, scroll down to **Alerts**. Change
   the dropdown box **Allow Alert Management Rights** to **Yes**.
7. Scroll to the bottom and click **Submit**.

Add the Limited Rights User to the SAM Credential Library

1. From the **Main Settings & Administration** section in SolarWinds, go
   to **Product Specific Settings > SAM Settings**. Navigate to **Global
   SAM Settings** > **Credentials Library**
2. Add the limited user account created above. For the credential name
   use **SolarWinds API User**

Create an external node for VictorOps.com

1. Navigate to **Settings > Manage Nodes** and add a node
2. For the Node name enter **victorops.com**

Assign the VictorOps Ack-Back Application Template

1. From the **Main Settings & Administration** section in SolarWinds, go
   to **Product Specific Settings > SAM Settings**. Navigate to
   **Application Monitors** > **Manage Application Monitors** and click
   the tab for **Application Monitor Templates**
2. Find and click to check the box next to “*VictorOps Ack-Back*” then
   select **Assign to Node**
3. Choose the node **victorops.com** and click the green arrow to add it
   to **Selected Nodes**, then click **Next**
4. Assign the *SolarWinds API User* credentials, and click **Assign
   Application Monitors** to finish

Example Body Payloads
---------------------

The below template payloads contain the required fields, though you may
add additional fields as you wish. *Note that a ‘\\' character cannot be
user in the HTTP post. Instead use an SQL replace function in the
SolarWinds Alert:*

SQL: SELECT REPLACE (''‘${Caption}''‘,'\\‘,' ')}

**Node is Down**

Trigger Action

{ “message_type”:“CRITICAL”, “monitor_name”:“SolarWinds”,
“monitoring_tool”:“SolarWinds”,
“alert_rule”:“:math:`{N=Alerting;M=AlertName}",  "state\_message":"`\ {NodeName}
is :math:`{Status}",  "entity\_display\_name":"`\ {NodeName} is
:math:`{Status}",  "entity\_id":"`\ {N=Alerting;M=AlertObjectID}”,
“host_name”:“:math:`{NodeName}",  "ip\_address":"`\ {Node.IP_Address}” }

Reset Action

{ “message_type”:“RECOVERY”, “monitor_name”:“SolarWinds”,
“monitoring_tool”:“SolarWinds”,
“alert_rule”:“:math:`{N=Alerting;M=AlertName}",  "state\_message":"`\ {NodeName}
is :math:`{Status}",  "entity\_display\_name":"`\ {NodeName} is
:math:`{Status}",  "entity\_id":"`\ {N=Alerting;M=AlertObjectID}”,
“host_name”:“:math:`{NodeName}",  "ip\_address":"`\ {Node.IP_Address}” }

**Volume Space Alert**

Trigger Action

{
“alert_rule”:“:math:`{N=Alerting;M=AlertName}",  "entity\_display\_name":"`\ {NodeName}
:math:`{SQL: SELECT REPLACE ('''`\ {Caption}''‘,'\\‘,' ')} has
:math:`{VolumeSpaceAvailable} free",  "entity\_id":"`\ {N=Alerting;M=AlertObjectID}”,
“host_name”:“:math:`{NodeName}",  "ip\_address":"`\ {Node.IP_Address}”,
“message_type”:“CRITICAL”, “monitor_name”:“SolarWinds”,
“monitoring_tool”:“SolarWinds”, “state_message”:“${NodeName}
:math:`{SQL: SELECT REPLACE ('''`\ {Caption}''‘,'\\‘,' ')} has
${VolumeSpaceAvailable} free” }

Reset Action

{
“alert_rule”:“:math:`{N=Alerting;M=AlertName}",  "entity\_display\_name":"`\ {NodeName}
:math:`{SQL: SELECT REPLACE ('''`\ {Caption}''‘,'\\‘,' ')} has
:math:`{VolumeSpaceAvailable} free",  "entity\_id":"`\ {N=Alerting;M=AlertObjectID}”,
“host_name”:“:math:`{NodeName}",  "ip\_address":"`\ {Node.IP_Address}”,
“message_type”:“RECOVERY”, “monitor_name”:“SolarWinds”,
“monitoring_tool”:“SolarWinds”, “state_message”:“${NodeName}
:math:`{SQL: SELECT REPLACE ('''`\ {Caption}''‘,'\\‘,' ')} has
${VolumeSpaceAvailable} free” }

**Component Based Alert**

Trigger Action

{ “message_type”:“CRITICAL”, “monitor_name”:“SolarWinds”,
“monitoring_tool”:“SolarWinds”,
“alert_rule”:“:math:`{N=Alerting;M=AlertName}",  "state\_message":"`\ {NodeName}
${N=SwisEntity;M=ComponentAlert.ComponentName} is
:math:`{N=SwisEntity;M=Status;F=Status}",  "entity\_display\_name":"`\ {NodeName}
${N=SwisEntity;M=ComponentAlert.ComponentName} is
:math:`{N=SwisEntity;M=Status;F=Status}",  "entity\_id":"`\ {N=Alerting;M=AlertObjectID}”,
“host_name”:“:math:`{NodeName}",  "ip\_address":"`\ {Node.IP_Address}” }

Reset Action

{ “message_type”:“RECOVERY”, “monitor_name”:“SolarWinds”,
“monitoring_tool”:“SolarWinds”,
“alert_rule”:“:math:`{N=Alerting;M=AlertName}",  "state\_message":"`\ {NodeName}
${N=SwisEntity;M=ComponentAlert.ComponentName} is
:math:`{N=SwisEntity;M=Status;F=Status}",  "entity\_display\_name":"`\ {NodeName}
${N=SwisEntity;M=ComponentAlert.ComponentName} is
:math:`{N=SwisEntity;M=Status;F=Status}",  "entity\_id":"`\ {N=Alerting;M=AlertObjectID}”,
“host_name”:“:math:`{NodeName}",  "ip\_address":"`\ {Node.IP_Address}” }
