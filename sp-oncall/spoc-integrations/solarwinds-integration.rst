.. _solarwinds-spoc:

SolarWinds integration for Splunk On-Call
**********************************************************

.. meta::
    :description: Configure the SolarWinds integration for Splunk On-Call.

Integrate SolarWinds Orion alerts to Splunk On-Call using the SolarWinds API URL endpoint. 

Requirements
================

* SolarWinds Orion NPM is required for the integration
* SAM is required for the acknowledge-back component

Configure in Splunk On-Call
===============================

#. In your account, go to :guilabel:`Integrations` then :guilabel:`SolarWinds`.
#. Activate the integration.
#. Copy the :guilabel:`Service API Endpoint` to use in later steps. 

Configure in SolarWinds
============================

#. Go to :guilabel:`Alerts & Activity` then :guilabel:`Alerts` then select :guilabel:`Manage Alerts` to go to the Alert Manager.
#. Select :guilabel:`Add New Alert` 
#. Name the alert "Send Alert to Splunk On-call".
#. Configure your trigger, reset, and time-of-day conditions.
#. On the :guilabel:`Trigger Actions` tab, select :guilabel:`Add Action`.
#. Select :guilabel:`Send a Get or Post a URL to a Web Server` and select :guilabel:`Configure Action`.
#. Name your action "Critical to Splunk On-Call".
#. Select :guilabel:`Use HTTP/S POST` and enter your Splunk On-Call SolarWinds :guilabel:`Service API Endpoint`. Replace the trailing ``$routing_key`` with the actual routing key you intend to use for the alert. For more information on routing keys, see :ref:`spoc-routing-keys`.
#. In  :guilabel:`Body to POST`, copy and paste an applicable :guilabel:`Trigger Action` payload from the example payloads. See :ref:`example-payloads`. 
#. Set :guilabel:`Content Type` to ``application/json``.
#. Set  :guilabel:`Authentication` to ``None``.
#. Configure the rest of the settings as needed and save your changes.
#. Select :guilabel:`Next` to open the :guilabel:`Reset Action` tab.
#. Select  :guilabel:`Add Action`.
#. In :guilabel:`Body to POST` copy and paste the corresponding :guilabel:`Reset Action` payload from the example payloads. See :ref:`example-payloads`.
#. Select :guilabel:`Add Action`.
#. Select:guilabel:`Next` through the Summary tab, review, then :guilabel:`Submit`.

Alert Splunk On-Call for multiple actions
--------------------------------------------

#. Go to :guilabel:`Alerts & Activity` then :guilabel:`Alerts` then select :guilabel:`Manage Alerts` to go to the Alert Manager.
#. Select the box next to the newly-created "Send Alert to Splunk On-Call" alert and select :guilabel:`Assign Action`.
#. Assign your trigger and reset actions, then select  :guilabel:`Assign`.

Activate the Splunk On-Call acknowledge back
---------------------------------------------------

This acknowledge back is a command poll against the Splunk On-Call public API, configured in SolarWinds as an Application Manager. You have to create a new user and node in SolarWinds.

#. Go to :guilabel:`Main Settings & Administration` in SolarWinds.
#. Go to :guilabel:`Product Specific Settings` then :guilabel:`SAM Settings`.
#. Go to :guilabel:`Application Monitors` then :guilabel:`Manage Application Monitors` then  :guilabel:`Application Monitor Templates`.
#. Import the VictorOps Ack-Back.apm-template and replace the script with the SolarWinds-ack-back-v2.1.txt.
    * :new-page:`VictorOps Ack-Back.apm-template <https://thwack.solarwinds.com/content-exchange/server-application-monitor/m/application-monitor-templates/2853/download>`
    * :new-page:`SolarWinds-ack-back-v2.1.txt <https://help.victorops.com/wp-content/uploads/2019/09/SolarWinds-ack-back-v2.1.txt>`
#. From the :guilabel:`Main Settings & Administration` section in SolarWinds, go to :guilabel:`Product Specific Settings` then :guilabel:`SAM Settings`
#. Go to :guilabel:`Application Monitors` then :guilabel:`Manage Application Monitors`.
#. Select :guilabel:`VictorOps Ack-Back` and select :guilabel:`Edit Properties`. The :guilabel:`Polling Frequency` is set to 60seconds, which means SolarWinds command-polls Splunk On-Call every 60 seconds for new acknowledgement.
#. Expand the component :guilabel:`Ack-Back Get Requests`.
#. Change the :guilabel:`Credential for Monitoring` to the :guilabel:`SolarWinds API User`.
#. Review the :guilabel:`Script Body` to confirm it includes the v2 version of the ack-back script.
#. Update the PowerShell script with your Splunk On-Call API values and SolarWinds primary server name. You can find the Splunk On-Call API values from your Splunk On-Call under :guilabel:`Settings` then :guilabel:`API`. Near the top of the PowerShell script replace everything between the quotes with the correct information for the following variables:
    * ``#Victor Ops Company ID`` 
    * ``$API_ID="<Your API ID>"``
    * ``#Victor Ops API Key``
    * ``$ApiKey="<Your API Key>"``
    * ``#Set to your SolarWinds Primary Application Server``
    * ``$SolarWindsServer="<Your Primary SolarWinds Server Name>"``
#. Select :guilabel:`Submit`.

Create a limited-rights user for SolarWinds alert management
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Go to :guilabel:`Settings` then :guilabel:`All Settings` to reach the :guilabel:`Main Settings & Administration` section in SolarWinds. 
#. Go to :guilabel:`User Accounts` then :guilabel:`Manage Accounts`. 
#. Select :guilabel:`Add New Account`.
#. Select :guilabel:`Orion individual account`.
#. Select :guilabel:`Next`.
#. In the :guilabel:`User Name` field enter "solarwindsapi".
#. Enter a password.
#. Select :guilabel:`Next`.
#. In the :guilabel:`Define Settings` section, scroll to :guilabel:`Alerts`. 
#. In :guilabel:`Allow Alert Management Rights` select :guilabel:`Yes`.
#. Select :guilabel:`Submit`.

Add the limited-rights user to the SAM credential library
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. From the :guilabel:`Main Settings & Administration` section in SolarWinds, go to :guilabel:`Product Specific Settings` then :guilabel:`SAM Settings`.
#. Go to :guilabel:`Global SAM Settings` then :guilabel:`Credentials Library`. 
#. Add the limited user account. For the credential name use :guilabel:`SolarWinds API User`.

Create an external node for VictorOps.com
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Go to :guilabel:`Settings` then :guilabel:`Manage Nodes`.
#. Add a node.
#. For the node name enter "victorops.com".

Assign the Splunk On-Call acknowledge back application templates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. From the :guilabel:`Main Settings & Administration` section in SolarWinds, go to :guilabel:`Product Specific Settings` then :guilabel:`SAM Settings`.
#. Go to :guilabel:`Application Monitors` then :guilabel:`Manage Application Monitors`. 
#. Select :guilabel:`Application Monitor Templates`.
#. Select :guilabel:`VictorOps Ack-Back` then select :guilabel:`Assign to Node`.
#. Select the "victorops.com" node and select the green arrow to add it to :guilabel:`Selected Nodes`.
#. Select :guilabel:`Next`.
#. Assign the SolarWinds API User credentials.
#. Select :guilabel:`Assign Application Monitors`.


.. _example-payloads:

Example body payloads
==========================

The following template payloads contain the required fields, you can add fields as needed. 

The backslash ``\`` character can't be used in the HTTP post. Instead use an SQL replace function in the SolarWinds Alert:

.. code:: 

   SQL: SELECT REPLACE (''‘${Caption}''‘,'\‘,' ')}

Node is down
--------------

Trigger action
^^^^^^^^^^^^^^^^^^

.. code-block:: 

   {
     "message_type":"CRITICAL",
     "monitor_name":"SolarWinds",
     "monitoring_tool":"SolarWinds",
     "alert_rule":"${N=Alerting;M=AlertName}",
     "state_message":"${NodeName} is ${Status}",
     "entity_display_name":"${NodeName} is ${Status}",
     "entity_id":"${N=Alerting;M=AlertObjectID}",
     "host_name":"${NodeName}",
     "ip_address":"${Node.IP_Address}"
   }

Reset action
^^^^^^^^^^^^^^

.. code-block:: 

   {
     "message_type":"RECOVERY",
     "monitor_name":"SolarWinds",
     "monitoring_tool":"SolarWinds",
     "alert_rule":"${N=Alerting;M=AlertName}",
     "state_message":"${NodeName} is ${Status}",
     "entity_display_name":"${NodeName} is ${Status}",
     "entity_id":"${N=Alerting;M=AlertObjectID}",
     "host_name":"${NodeName}",
     "ip_address":"${Node.IP_Address}"
   }

Volume space alert
--------------------

Trigger action
^^^^^^^^^^^^^^^^^^

.. code-block:: 

   {
     "alert_rule":"${N=Alerting;M=AlertName}",
     "entity_display_name":"${NodeName} ${SQL: SELECT REPLACE ('''${Caption}''','\',' ')} has ${VolumeSpaceAvailable} free",
     "entity_id":"${N=Alerting;M=AlertObjectID}",
     "host_name":"${NodeName}",
     "ip_address":"${Node.IP_Address}",
     "message_type":"CRITICAL",
     "monitor_name":"SolarWinds",
     "monitoring_tool":"SolarWinds",
     "state_message":"${NodeName} ${SQL: SELECT REPLACE ('''${Caption}''','\',' ')} has ${VolumeSpaceAvailable} free"
   }

Reset action
^^^^^^^^^^^^^^

.. code-block:: 

   {
     "alert_rule":"${N=Alerting;M=AlertName}",
     "entity_display_name":"${NodeName} ${SQL: SELECT REPLACE ('''${Caption}''','\',' ')} has ${VolumeSpaceAvailable} free",
     "entity_id":"${N=Alerting;M=AlertObjectID}",
     "host_name":"${NodeName}",
     "ip_address":"${Node.IP_Address}",
     "message_type":"RECOVERY",
     "monitor_name":"SolarWinds",
     "monitoring_tool":"SolarWinds",
     "state_message":"${NodeName} ${SQL: SELECT REPLACE ('''${Caption}''','\',' ')} has ${VolumeSpaceAvailable} free"
   }

Component-based alert
------------------------

Trigger action
^^^^^^^^^^^^^^^^^^

.. code-block:: 

   {
     "message_type":"CRITICAL",
     "monitor_name":"SolarWinds",
     "monitoring_tool":"SolarWinds",
     "alert_rule":"${N=Alerting;M=AlertName}",
     "state_message":"${NodeName} ${N=SwisEntity;M=ComponentAlert.ComponentName} is ${N=SwisEntity;M=Status;F=Status}",
     "entity_display_name":"${NodeName} ${N=SwisEntity;M=ComponentAlert.ComponentName} is ${N=SwisEntity;M=Status;F=Status}",
     "entity_id":"${N=Alerting;M=AlertObjectID}",
     "host_name":"${NodeName}",
     "ip_address":"${Node.IP_Address}"
   }

Reset action
^^^^^^^^^^^^^^

.. code-block:: 

   {
     "message_type":"RECOVERY",
     "monitor_name":"SolarWinds",
     "monitoring_tool":"SolarWinds",
     "alert_rule":"${N=Alerting;M=AlertName}",
     "state_message":"${NodeName} ${N=SwisEntity;M=ComponentAlert.ComponentName} is ${N=SwisEntity;M=Status;F=Status}",
     "entity_display_name":"${NodeName} ${N=SwisEntity;M=ComponentAlert.ComponentName} is ${N=SwisEntity;M=Status;F=Status}",
     "entity_id":"${N=Alerting;M=AlertObjectID}",
     "host_name":"${NodeName}",
     "ip_address":"${Node.IP_Address}"
   }
