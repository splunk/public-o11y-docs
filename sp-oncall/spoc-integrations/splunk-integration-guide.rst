.. _splunk-spoc-integration:

Splunk integration for Splunk On-Call
******************************************

.. meta::
    :description: Configure the Splunk integration for Splunk On-Call.

The following guide shows how to integrate Splunk On-Call with action alerts from searches in Splunk Enterprise and Splunk Cloud Platform.

Requirements
==================

The integration supports the following Splunk versions:

- Splunk Enterprise: 9.1, 9.0, 8.2, 8.1, 8.0, 7.3, 7.2, 7.1, 7.0
- Splunk Cloud Platform: 9.1, 9.0, 8.2, 8.1, 8.0, 7.3, 7.2, 7.1, 7.0

The following roles and capabilities are required:

-  For v.1.0.23 or newer

   -  Setup and configuration require:

      * admin
      * victorops_admin and admin_all_objects
      * list_storage_passwords and admin_all_objects

   -  Usage and testing require:

      * admin
      * victorops_admin
      * victorops_user

-  For v.1.0.18 or lower to setup and configuration require to grant th following:

   -  list_storage_passwords AND admin_all_objects

For on-premises installation, open port 443 for outgoing communication with Splunk On-Call. The full URL used is the following format:

.. code-block:: text

   https://alert.victorops.com/integrations/generic/20131114/alert/<your_api_key>/<your_routing_key>

Configuring Splunk Enterprise
====================================

.. note:: When updating to a newer version of the app, run the bump command to clear client and server assets that have been cached. See :new-page:`Customization options <https://docs.splunk.com/Documentation/Splunk/8.0.3/AdvancedDev/CustomizationOptions>` for more information.

In Splunk On-Call
------------------------------------

From Splunk On-Call, navigate to :guilabel:`Integrations`, :guilabel:`3rd Party Integrations`, :guilabel:`Splunk Enterprise`, then select :guilabel:`Enable Integration`. Copy the API key to the clipboard to use in later steps.

.. image:: /_images/spoc/Screen_Shot_2020-03-18_at_3_39_45_PM.png
   :alt: Splunk Enterprise integration

In Splunk Enterprise
-------------------------------------

In Splunk Base, search for Splunk On-Call. Select :guilabel:`Download` and accept the license agreements by checking the boxes and selecting :guilabel:`Agree to Download`.

Start Splunk and open the web UI in a browser. From the top navigation bar, expand the menu and select :guilabel:`Manage Apps`. Next, select :guilabel:`Install app from file`.

.. image:: /_images/spoc/Screen-Shot-2019-09-30-at-10.40.30-AM.png
   :alt: Install from file

Choose the Splunk On-Call for Splunk app .tgz file you downloaded earlier, check :guilabel:`Upgrade app` to ensure your application is updated to the latest version. Next, select :guilabel:`Upload` then finish the process by restarting Splunk.

.. image:: /_images/spoc/Screen-Shot-2019-09-30-at-10.58.01-AM.png
   :alt: Upload an app

Once Splunk has restarted, return to the :guilabel:`Manage Apps` page and select :guilabel:`Launch App` next to the Splunk On-Call Incident Management app. Continue the configuration in the Splunk On-Call Incident Response homepage.

.. image:: /_images/spoc/photo34.png
   :alt: Splunk On-Call configuration page

Alert API key configuration
------------------------------

On the Alert API Key Configuration page, paste the API key copied earlier, along with any desired routing key from your Splunk On-Call organization. If the routing key is empty, alerts are routed to your default routing key. You can also access your API key by following the :guilabel:`Splunk On-Call Splunk Integration` link.

.. image:: /_images/spoc/Screen-Shot-2020-04-28-at-3.39.35-PM.png
   :alt: Alert API Key Configuration

Testing configuration
---------------------------

After the API is saved you can verify the integration by selecting :guilabel:`Test` under actions. This test alert isn't an incident in your org and is logged as an ``INFO`` alert. To find this test alert, look in your timeline instead of the incidents tab. Alternatively, from the Search app in Splunk, type:

.. code-block:: text
   
   | sendalert victorops param.message_type=“INFO”

This sends a test alert directly to your Splunk On-Call timeline. To create an incident, change ``INFO`` to ``CRITICAL``.

Data API configuration and routing keys
---------------------------------------------

For versions 1.0.21 and higher you can add your Splunk On-Call API ID and API Key, found in Splunk On-Call under :guilabel:`Integrations`, :guilabel:`API`, to retrieve routing keys within Splunk On-Call. If you have yet to generate your API key and ID, activate and generate your orgs key and ID.

After the API Key and API ID are saved, select :guilabel:`Retrieve Routing Keys` to retrieve the most up to date list of your organizations routing keys.

.. image:: /_images/spoc/Screen-Shot-2020-04-15-at-10.53.23-AM.png
   :alt: Data API configuration

When creating a Splunk On-Call alert action, a menu of all routing keys within your Splunk On-Call organization appears.

.. image:: /_images/spoc/Screen-Shot-2020-03-26-at-9.13.19-AM.png
   :alt: Menu with API keys

Configure Splunk On-Call alert actions
---------------------------------------------

The following is an example of new alert based on a search. From a new search, select :guilabel:`Save As`, then select :guilabel:`Alert`.

.. image:: /_images/spoc/Screen-Shot-2019-09-30-at-11.28.03-AM.png
   :alt: Splunk search

Give the alert a title, description, and permissions as well as a schedule. Under :guilabel:`+ Add Actions`, select :guilabel:`Splunk On-Call`.

.. image:: /_images/spoc/Screen-Shot-2019-09-30-at-11.12.57-AM.png
   :alt: Select Splunk On-Call

Select the desired message type, and use the state message field to add a brief description of what this particular alert indicates. You can overwrite the default values for ``entity_id`` if desired. If no API key or routing key is selected, alerts are sent to the default values for these fields. Additionally, you can dynamically reference Splunk fields within these assignments using tokens.

.. image:: /_images/spoc/Screen-Shot-2020-04-15-at-10.08.57-AM.png
   :alt: Save as alert screen

Once the specified conditions are met, an alert appears in your Splunk On-Call timeline.

Alert annotations
----------------------------------

In Splunk On-Call, under the Annotations tab in the incident, all Splunk alerts include an alert link that directs you back to the Splunk alert.

.. image:: /_images/spoc/Screen-Shot-2020-01-21-at-1.16.44-PM.png
   :alt: Alert annotations tab

To add other incident annotations see :ref:`alert-rules-engine`.

Splunk and Splunk On-Call mapped fields
--------------------------------------------

The following table shows mapped Splunk and Splunk On-Call fields:

.. image:: /_images/spoc/Screen-Shot-2020-09-02-at-9.56.58-AM.png
   :alt: Table of mapped fields

Configure Splunk Cloud Platform
===================================

In Splunk On-Call
-----------------------------

From the Splunk On-Call web portal, navigate to :guilabel:`Integrations`, :guilabel:`3rd Party Integrations`, :guilabel:`Splunk Enterprise`, then select :guilabel:`Enable Integration`. Copy the API key to the clipboard to use in later steps.

.. image:: /_images/spoc/Screen_Shot_2020-03-18_at_3_39_45_PM.png
   :alt: Copy API key

.. _in-splunk-1:

In Splunk Cloud Platform
-------------------------------

Under :guilabel:`Apps`, select :guilabel:`Find More Apps`, then in the search bar type :guilabel:`Splunk On-Call:guilabel:`. Select :guilabel:`Install`. Once the app is installed it shows up under :guilabel:`Apps`.

Open the app to go to the Splunk On-Call Incident Response Home page, which guides you through setting up the account,
configuring API keys, and testing alerts. Once your configuration is complete a check next to each configuration step appears.

.. image:: /_images/spoc/photo34.png
   :alt: Configuring Splunk On-Call inside Splunk Cloud

Alert API key configuration
------------------------------------

On the Alert API Key Configuration page, paste the API key copied earlier, along with any desired routing key from your Splunk On-Call organization. If the routing key is blank, alerts are routed to your default routing key. You can also access your API key by selecting :guilabel:`Splunk On-Call Splunk Integration`.

.. image:: /_images/spoc/Screen-Shot-2020-04-28-at-3.39.35-PM.png
   :alt: Alert API Key Configuration

Data API configuration and routing keys
---------------------------------------------

For versions 1.0.21 and higher, you can add your Splunk On-Call API ID and API Key, found in Splunk On-Call under :guilabel:`Integrations`, :guilabel:`API`, to retrieve routing keys within Splunk On-Call. If you have yet to generate your API key and ID, activate and generate your orgs key and ID.

Once the API Key and API ID are saved, select :guilabel:`Retrieve Routing Keys` to retrieve the most up to date list of your organizations routing keys.

.. image:: /_images/spoc/Screen-Shot-2020-04-15-at-10.53.23-AM.png
   :alt: Data API configuration

When creating a Splunk On-Call alert action, a menu with all routing keys within your Splunk On-Call organization appears.

.. image:: /_images/spoc/Screen-Shot-2020-03-26-at-9.13.19-AM.png
   :alt: API keys menu

Test the configuration
------------------------------------

After the API is saved you can verify the integration by selecting :guilabel:`Test` under actions. This test alert isn't an incident in your org as it's logged as an ``INFO`` alert. To find the test alert, look in your timeline instead of the :guilabel:`Incidents` tab. Alternatively, type the following from the Search app in Splunk:

.. code-block:: text

   | sendalert victorops param.message_type=“INFO”

To create an incident, change ``INFO`` to ``CRITICAL``.


Configuring Splunk On-Call alert actions
------------------------------------------------

The following is an example of setting up a new alert based on a search. From a new search select :guilabel:`Save As`, then select :guilabel:`Alert`.

.. image:: /_images/spoc/Screen-Shot-2019-09-30-at-11.28.03-AM.png
   :alt: New search in Splunk

Give the alert a title, description, and permissions as well as configure the check schedule. Under :guilabel:` + Add Actions`, select :guilabel:`Splunk On-Call`.

.. image:: /_images/spoc/Screen-Shot-2019-09-30-at-11.12.57-AM.png
   :alt: Save as alert

Select the desired message type, and use the state message field to add a brief description of what this particular alert indicates. You can overwrite the default values for ``entity_id`` if desired. If no API key or routing key is selected, alerts are sent to the default values for these fields. Additionally, you can reference Splunk fields within these assignments using tokens.

.. image:: /_images/spoc/Screen-Shot-2020-04-15-at-10.08.57-AM.png
   :alt: Save as alert API add actions menu

Once the specified conditions are met, an alert appears in your Splunk On-Call timeline.

Alert annotations
-----------------------

In Splunk On-Call, under the :guilabel:`Annotations` tab in the incident, all Splunk alerts include an alert link that directs you back to the Splunk alert.

.. image:: /_images/spoc/Screen-Shot-2020-01-21-at-1.16.44-PM.png
   :alt: Alert annotations tab

To add other incident annotations, see :ref:`alert-rules-engine`.


Advanced configuration
===============================

Proxy settings
-----------------------

A proxy configuration can be activated for the integration by navigating to :guilabel:`Configuration`. :guilabel:`Proxy Configuration`.

.. image:: /_images/spoc/Screen-Shot-2020-03-27-at-10.47.12-AM-1.png
   :alt: Proxy settings

Alert recovery configuration
--------------------------------

Once the Splunk for Splunk On-Call app is enabled (1.0.18 and higher), the Alert Recovery checkbox is globally set to ``ON`` by default. The alert recovery checkbox can also be configured at the individual alert level for a more granular setting.

In the global recovery configuration, you can configure the polling interval (in seconds) as well as the number of inactive polls before sending a recovery. The following are the global default settings for Alert Recoveries:

.. image:: /_images/spoc/Screen-Shot-2020-03-27-at-10.48.56-AM.png
   :alt: Alert Recovery defaults

At the individual alert level, under the Splunk On-Call Trigger Actions, you can find the :guilabel:`Enable Recovery` checkbox for the more granular setting. For versions 1.0.25 and higher you can set the Polling Interval as well as Inactive Poll count for each individual alert.

.. note:: Alert specific recovery settings must be greater than the global recovery settings.

Dynamically setting the API Key and Routing Key using Search
----------------------------------------------------------------

From versions 1.0.25 and higher you can set the API key as well as the routing key in the Search.

The following is an example of the format needed for the dynamic values.

.. code-block:: text

   <alert search> | eval 'param.api_key'="xxxxxxxxxx" | eval 'param.routing_key'="xxx"

When creating the Splunk On-Call trigger action with dynamically pulled values from your search, select the parameter ``api_key`` as the API Key for the alerts as well as ``param.routing_key`` as the Routing Key for the alert.

.. image:: /_images/spoc/Screen-Shot-2020-05-14-at-9.32.33-AM.png
   :alt: Key parameters

Any dynamic keys used in a Search will be added as in key in your Alert API Key Configuration.

.. image:: /_images/spoc/Screen-Shot-2020-05-14-at-8.51.35-AM.png
   :alt: Dynamic keys

Search Head cluster setup
==========================================

Before running Splunk for Splunk On-Call with search heads, make sure that there is a deployer as well as at least 3 search heads.

The following are the steps to take when using the Splunk for Splunk On-Call app with search head clusters.

1. Install the latest version of the Splunk for Splunk On-Call app on the deployer using the UI.

2. Push out to the search head by running ``./bin/splunk apply shcluster-bundle -target `https://sh1:8089 <https://sh1:8089/>`__ -auth username:password``.

3. Configure the Integration API key on one search head.

4. The Integration API key automatically gets replicated to the other search head nodes.

5. Test each search head to verify.


Splunk ITSI
===================================

With the Splunk On-Call and Splunk ITSI integration, you can leverage Splunk's data and log analysis capabilities to
correlate multiple incidents into single event groups and easily send alerts into Splunk On-Call. Then, teammates can collaborate in-line with monitoring data inside the Splunk On-Call timeline to speed up incident response and remediation.

To follow this integration guide you need Splunk ITSI 4.0 or higher. 

In Splunk On-Call (ITSI)
----------------------------------

From the Splunk On-Call web portal, navigate to :guilabel:`Integrations`, :guilabel:`3rd Party Integrations`, :guilabel:`Splunk ITSI`, then select :guilabel:`Enable Integration`. Copy the API key to the clipboard to use in later steps.

In Splunk ITSI Notable Event Aggregation Policies
-------------------------------------------------

Navigate to :guilabel:`Configure`, :guilabel:`Notable Events Aggregation Policies` and select the name of the Aggregation Policy you want to alert Splunk On-Call.

.. image:: /_images/spoc/Screen-Shot-2019-10-01-at-12.48.28-PM.png
   :alt: Aggregation policy

In the :guilabel:`Action Rules` tab, set your trigger conditions then select :guilabel:`Splunk On-Call` and configure your alert accordingly.

.. image:: /_images/spoc/Screen-Shot-2019-10-01-at-12.52.03-PM.png
   :alt: Action rules

Keep the Alert Entity ID consistent for all Message Types (leave blank for default) across related actions. Splunk On-Call uses this field to identify incidents and correlate subsequent alerts with the original incident. Once configured correctly, ITSI automatically creates a Splunk On-Call incident.

Create a Splunk On-Call Incident
--------------------------------------

Navigate to the :guilabel:`Action Rules` tab for the desired Aggregation Policy. For an action to create an incident in Splunk On-Call, set the conditions to :guilabel:`if the following event occurs: severity greater than Normal` then select :guilabel:`Splunk On-Call` and :guilabel:`Configure`.

.. image:: /_images/spoc/Screen-Shot-2019-10-01-at-12.52.03-PM.png
   :alt: Configure action rules

The monitoring tool field and message type are the only fields that need to be set. The rest of the fields use default values. The default values are:

-  Message Type : ``CRITICAL`` (set this value)
-  Monitoring Tool: ``splunk-itsi`` (set this value)
-  Alert Entity ID: ``$result.itsi_group_id``
-  Alert Entity Display Name: ``$result.itsi_group_title``
-  State Message: ``$result.itsi_group_title``
-  Routing Key: Default routing key (unless specified otherwise)

.. image:: /_images/spoc/ITSI-image.png
   :alt: All tickets section

-  This functionality requires the “Data API Keys” and organization name to be set up in the Splunk On-Call for Splunk app.
-  **From ITSI:** you will be able to see if there is an associated Incident to the ticket.
-  **From Splunk On-Call:** this will allow for easy access back to the ITSI Filtered Episode Review or Overall Episode Review through annotations.

To Resolve a Splunk On-Call Incident
----------------------------------------

Within the same Aggregation Policy, navigate to the :guilabel:`Action Rules` tab. To resolve the episode in ITSI, select :guilabel:`Change status to Resolved`. To resolve the corresponding incident in Splunk On-Call, set the conditions to :guilabel:`if the episode is broken`, then :guilabel:`Splunk On-Call` and select :guilabel:`Configure`.

.. image:: /_images/spoc/Screen-Shot-2019-10-01-at-12.51.46-PM-1.png
   :alt: Resolve incident

Configure the action making sure to select RECOVERY as the message type and ITSI as the monitoring tool, other values are default values. The Alert Entity ID are the same as the initial alert so that Splunk On-Call resolves the corresponding incident if default values are used.

To acknowledge a Splunk On-Call incident manually
------------------------------------------------------

Navigate to :guilabel:`Episode Review` then select the desired episode, :guilabel:`Actions`, and select :guilabel:`Splunk On-Call`.

.. image:: /_images/spoc/Screen-Shot-2019-10-01-at-12.54.05-PM.png
   :alt: Acknowledge incident

Configure the action making sure to select ``ACKNOWLEDGEMENT`` as the message type and ITSI as the monitoring tool. Other values are default. The Alert Entity ID is the same as the initial alert so that Splunk On-Call acknowledges the corresponding incident if default values are used.

Splunk SAI
==========================

Splunk SAI allows you to search through depths of log data and monitor the health of your infrastructure and applications. The Splunk On-Call and Splunk Insights for Infrastructure integration allows you to set alerting thresholds on key monitoring metrics and get alerts to the right person at the right time. Through a simple dropdown
in the Splunk SAI platform, choose to send alerts directly into Splunk On-Call where your team can collaborate and resolve incidents faster.

In Splunk On-Call (SAI)
----------------------------

From the Splunk On-Call web portal, navigate to :guilabel:`Integrations`, :guilabel:`3rd Party Integrations`, :guilabel:`Splunk Enterprise`, then select :guilabel:`Enable Integration`. Copy the API key to the clipboard to use in later steps.

In Splunk SAI, navigate to :guilabel:`Settings`, :guilabel:`Notifications` and paste your API key and a routing key from your Splunk On-Call accountinto the respective fields. Select :guilabel:`Save Credentials`. 

.. image:: /_images/spoc/VO-SAI.jpg
   :alt: Enter credentials for Splunk On-Call

Under the :guilabel:`Investigate` page, select an entity.

.. image:: /_images/spoc/alert1@2x.png
   :alt: Select an entity

Navigate to the :guilabel:`Analysis tab` and select an alert graph, select the three dots and then select :guilabel:`Create Alert`.

.. image:: /_images/spoc/Alert2@2x.png
   :alt: Create alert

From the alert creation, scroll to the bottom of the dialog and select how under what conditions the alert fires. For the notification method select :guilabel:`Splunk On-Call`. Select :guilabel:`Submit`.

.. image:: /_images/spoc/alert3@2x.png
   :alt: Submit alert

Splunk Enterprise Security
=====================================

Splunk Enterprise Security (ES) enables security teams to use all data to gain organization-wide visibility and security intelligence. Regardless of deployment model—on-premises, in a public or private cloud, SaaS, or any combination of these—Splunk ES can be used for continuous monitoring, incident response, running a security operations
center or for providing executives a window into business risk.

In Splunk Enterprise Security App
-------------------------------------

In the Splunk Enterprise Security App navigate to the :guilabel:`Incident Review`. Once in Incident Review, select an incident you want to send to Splunk On-Call and select the menu under :guilabel:`Actions`. Next, select :guilabel:`Run Adaptive Response Action`.

.. image:: /_images/spoc/Screen-Shot-2020-01-27-at-9.14.34-AM.png
   :alt: Select Run Adaptative Response Action

A dialog appears allowing you to add Splunk On-Call as a response action.

.. image:: /_images/spoc/Screen-Shot-2020-01-27-at-9.14.46-AM.png
   :alt: Select response action

Once the response action has been dispatched you receive a confirmation.

.. image:: /_images/spoc/Screen-Shot-2020-01-27-at-9.14.58-AM.png
   :alt: Confirmation of response action


Troubleshooting
===========================

See the following troubleshooting steps for help. If your problem still persists, send a detailed summary
of your issue, when it first occurred, and what version Splunk instance and Splunk On-Call app you are currently running.

Splunk On-Call app was installed but I am not able to configure the app
-------------------------------------------------------------------------------

Make sure you have the necessary permissions to configure and set up alerts for Splunk On-Call.

There is no option to customize the Alert Actions
--------------------------------------------------------------------------------------------------------

This is because the Splunk On-Call App Alert Action permissions are not set to global. Go to :guilabel:`Settings`, :guilabel:`Alert Actions` and make sure Splunk On-Call App is set to **Global** sharing.

Splunk On-Call Alert Action is not visible
--------------------------------------------------------------------------------------------

Sometimes a reset of the Alert Action permission can fix this issue. Go to :guilabel:`Settings`, :guilabel:`Alert Action`, :guilabel:`Splunk On-Call (Permissions)`. Next to :guilabel:`Display For`, check :guilabel:`app`, save, then reopen permission and select :guilabel:`All apps`. Check your alert trigger action on an alert to see if the Splunk On-Call Alert Action is now visible.

Routing key retrieval is failing
-------------------------------------------------------------------------------

This can sometimes be caused by a firewall or multiple firewalls. To check to see if it is an internal network issue you can run the following cURL command:

.. code-block::

   curl -X POST
   https://alert.victorops.com/integrations/generic/20131114/alert/SPLUNK_API_KEY –insecure -H”accept: application/json” -H “Content-Type:
   application/json” -d ‘{“message_type”: “INFO”, “monitoring_tool”:
   “splunk”, “state_message”: “Test Alert”, “entity_display_name”: “Test
   Alert”}'\`

If the command does not make it to Splunk On-Call, grep for sendalert in the ``$SPLUNK_HOME/var/log/splunk/victorops_modalert.log`` and send the output to Splunk support alongside a detailed summary of the issue you are facing.

Splunk On-Call app is not visible as an alert action for an alert
-------------------------------------------------------------------------------

Run ``*./splunk btool check –debug`` and send the log and a detailed summary of the issue you are facing to Splunk support.

Splunk (enterprise) alerts stopped alerting in Splunk On-Call
-------------------------------------------------------------------------------

Run the following command to check for any internal network issues. If the post makes it to Splunk On-Call, check your firewalls.

.. code-block:: text

   curl -X POST
   “https://alert.victorops.com/integrations/generic/20131114/alert/SPLUNK_API_KEY
   –insecure -H”accept: application/json” -H “Content-Type:
   application/json” -d ‘{“message_type”: “INFO”, “monitoring_tool”:
   “splunk”, “state_message”: “Test Alert from localhost”,
   “entity_display_name”: “Test Alert”}'\`

If the post does not make it to Splunk On-Call, grep for sendalert in the ``$SPLUNK_HOME/var/log/splunk/victorops_modalert.log`` and send the output and a detailed summary of the issue you are facing to Splunk support.

Integrating with ITSI Version 4.0 or lower
--------------------------------------------------

Part of the integration relies on system macros not included with older versions of ITSI. To alleviate the issue, you can create the macros by navigating to :guilabel:`Settings`, :guilabel:`Advanced Settings`, :guilabel:`Search Macros within Splunk`. Make sure the following macros exist:

.. list-table::
   :header-rows: 1
   :widths: 30 70
   :width: 100%

   * - :strong:`Macro`
     - :strong:`Definition`


   * - ``itsi_notable_event_actions_temp_state_values``
     - ``eval action_temp_status=status | eval action_temp_owner=owner | eval action_temp_severity=severity | eval action_temp_title=title | eval action_temp_description=description``


   * - ``itsi_notable_event_actions_coalesce_state_values``
     - ``eval status=coalesce(status, action_temp_status) | eval owner=coalesce(owner, action_temp_owner) | eval severity=coalesce(severity,action_temp_severity) | eval title=coalesce(title, action_temp_title) | eval description=coalesce(description, action_temp_description) | fields – action_temp_*``

   * - ``itsi_notable_group_lookup``
     - ``lookup itsi_notable_group_user_lookup _key AS itsi_group_id OUTPUT owner severity status instruction | lookup itsi_notable_group_system_lookup _key AS itsi_group_id OUTPUT title description start_time last_time is_active event_count``
