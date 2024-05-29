.. _prtg-integration-spoc:

PRTG integration for Splunk On-Call
**********************************************************

.. meta:: 
    :description: Configure the PRTG integration for Splunk On-Call.

PRTG Network Monitor is a server up-time and utilization, network
monitoring, and bandwidth usage software package for server
infrastructure. It can monitor and classify bandwidth usage in a
network using SNMP, packet sniffing, and Netflow. The following guide
walks you through installing and configuring this integration.

In Splunk On-Call
-----------------

From the Splunk On-Call web portal, select :guilabel:`Integrations`.

From the list of integrations options, select the :guilabel:`PRTG (webhook)` integration option.

On the resulting page, copy the :guilabel:`Service API Endpoint` to the
clipboard. Be sure to replace the "$routing_key" part of this endpoint
with the actual routing key you intend to use.

In PRTG Network Monitor
-----------------------

On your server, navigate to
``C:\Program Files (x86)\PRTG Network Monitor\Notifications\EXE`` and
create a file named :strong:`prtgtovictorops.ps1`. In the file, paste the
following code and save the updated file.

.. code-block:: 

    Param( [string]\ :math:`API\_URL,  \[string\]`\ MessageType,
    [string]\ :math:`SiteName,  \[string\]`\ Device,
    [string]\ :math:`DeviceId,  \[string\]`\ Name,
    [string]\ :math:`Status,  \[string\]`\ Down,
    [string]\ :math:`DateTime,  \[string\]`\ LinkDevice, [string]$Message )

    Add-Type -AssemblyName System.Web.Extensions function ConvertTo-Json
    ([Object] $value) {
    [System.Web.Script.Serialization.JavaScriptSerializer] $jsSerializer =
    New-Object ‘System.Web.Script.Serialization.JavaScriptSerializer'
    :math:`jsSerializer.Serialize(`\ value) }

    function setMessageType ([string]
    :math:`inputString) {  If (`\ inputString -like “Up\*”) { return
    ‘recovery' } elseif
    (:math:`inputString -like "Down\*")  {  return 'critical'  }  elseif (`\ inputString
    -like “Warning\*”) { return ‘warning' } else { return ‘info' } }

    :math:`postVOAlert = ConvertTo-Json(@{ message\_type = SetMessageType(`\ Status);
    entity_id = $DeviceId; entity_display_name = $Device; monitoring_tool =
    “PRTG”; site_name =
    :math:`SiteName; link\_device = "<`\ (:math:`LinkDevice)|`\ ($Device)
    :math:`(`\ Name)>“; status =”\ :math:`(`\ Status) :math:`(`\ Down) on
    :math:`(`\ DateTime)“; state_message = $Message; })

    [Net.ServicePointManager]::SecurityProtocol =
    [Net.SecurityProtocolType]::Tls12 $postVOAlert \| Out-File -FilePath
    vo.log

    [System.Net.WebClient] $webclient = New-Object ‘System.Net.WebClient'
    $webclient.Headers.Add(“Content-Type”,“application/json”)
    :math:`webclient.UploadData(`\ API_URL,
    [System.Text.Encoding]::UTF8.GetBytes($postVOAlert)) \| Out-File
    -FilePath vo.log -Append

From your server's desktop, open :guilabel:`PRTG Enterprise Console`.

.. image:: /_images/spoc/Screenshot__24__png__15_documents__15_total_pages_.png
    :alt: The PRTG Enterprise Console desktop icon.

In the PRTG Enterprise Console, select the :guilabel:`Setup` tab.

.. image:: /_images/spoc/Screenshot__25__png__15_documents__15_total_pages_.png
    :alt: The "Setup" tab in the PRTG Enterprise Console. 

Select :guilabel:`Notifications` under "Account Settings".

.. image:: /_images/spoc/Screenshot__26__png__15_documents__15_total_pages_.png
    :alt: The "Notifications" tab located under "Account Settings".

Select :guilabel:`Add new notification`.

.. image:: /_images/spoc/Screenshot__27__png__15_documents__15_total_pages_.png
    :alt: A blue button stating "Add new notification".

Enter "Splunk On-Call Notification" in the "Notification Name" field,
then select :guilabel:`Always notify ASAP, never summarize` for "Method".

.. image:: /_images/spoc/Screenshot__28__png__15_documents__15_total_pages_.png
    :alt: A notification name and summary option.

Scroll down, then select :guilabel:`EXECUTE PROGRAM`.

.. image:: /_images/spoc/Screenshot__31__png__15_documents__15_total_pages_.png
    :alt: An empty check box stating "Execute program".

Select :guilabel:`Prtgtovictorops.ps1` from the "Program File" dropdown menu,
then paste the following into the "Parameter" field replacing
``URL_to_notify`` with your "URL to notify" from the "In Splunk On-Call" section.

.. code-block:: 

    -API_URL 'URL_to_notify' -SiteName '%sitename' -Device '%device'
    -DeviceId '%deviceid' -Name '%name' -Status '%status' -Down '%down'
    -DateTime '%datetime' -LinkDevice '%linkdevice' -Message '%message'

.. image:: /_images/spoc/Screenshot__32__png__15_documents__15_total_pages_-2.png
    :alt: The fields of "Execute program" filled with credentials from the previous code.

Enter the credentials for the Windows administrator that originally
installed PRTG, then select :guilabel:`Save`.

.. image:: /_images/spoc/Screenshot__32__png__15_documents__15_total_pages_-1.png
    :alt: An arrow points to a blue button stating "Save".

Select the :guilabel:`Test` link next to "VictorOps Notification".

.. image:: /_images/spoc/Screenshot__33__png__15_documents__15_total_pages_.png
    :alt: An arrow points to a blue button next to the VictorOps Notification stating "Test".

Select :guilabel:`OK` in "Notification Test Results".

.. image:: /_images/spoc/Screenshot__39__png__15_documents__15_total_pages_.png
    :alt: A gray button stating "OK".

An alert appears in your Splunk On-Call timeline.

Select the :guilabel:`Devices` tab.

.. image:: /_images/spoc/Screenshot__33__png__15_documents__15_total_pages_-1.png
    :alt: The "Devices" tab in the PRTG Enterprise Console.

Select the parent PRTG server connection.

.. image:: /_images/spoc/Screenshot__34__png__15_documents__15_total_pages_.png
    :alt: The root PRTG server connection, labelled "prtg admin".

Select the :guilabel:`Notifications` tab.

.. image:: /_images/spoc/Screenshot__35__png__15_documents__15_total_pages_.png
    :alt: The "Notifications" tab in the PRTG server connection menu.

Select :guilabel:`Add State Trigger`.

.. image:: /_images/spoc/Screenshot__36__png__15_documents__15_total_pages_.png
    :alt: The Notifications menu. An arrow points to a blue button stating "Add State Trigger".

In this example, the trigger uses the "Warning" sensor state.
You can modify these settings or create other triggers
for when sensors are "Down" for example, make sure to
select :guilabel:`VictorOps Notification` from the three dropdown menus after
"perform", then select :guilabel:`Save`.

.. image:: /_images/spoc/Screenshot__37__png__15_documents__15_total_pages_.png
    :alt: Settings for the alert triggers. You can toggle various fields in this menu. An arrow points to a blue button stating "Save".

You have now completed setting up this integration.

Simulate an Alert
-----------------

You can verify the integration by navigating to one of your sensors,
selecting one, and selecting "simulate error status". This creates through to Splunk On-Call.

Troubleshooting
---------------

Make sure you have the :new-page:`latest version of Powershell <https://docs.microsoft.com/en-us/powershell/scripting/setup/installing-windows-powershell?view=powershell-6>`
running in your PRTG environment for the integration script to work
best. You can check which version of Powershell you currently have by
running the following command line:

.. code-block:: bash

    $PSVersionTable.PSVersion

If you have any questions, contact :new-page:`Splunk On-Call support <mailto:Support@victorops.com?Subject=PRTG%20Network%20Monitor%20VictorOps%20Integration>`.
