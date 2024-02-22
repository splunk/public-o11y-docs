Datadog integration for Splunk On-Call
**********************************************************

* Splunk On-Call version required:** Starter, Growth, or Enterprise
* Annotating the links to your incidents provided by Datadog requires the use of the Splunk On-Call rules engine which is an Enterprise feature

The Datadog integration with Splunk On-Call, allows you to send content from Datadog into the timeline using @ mentions in the Datadog event stream. 

Enable the integration in Splunk On-Call
============================================

1. Go to :guilabel:`Integrations` then :guilabel:`3rd Party Integrations` then :guilabel:`Datadog`.
2. Select :guilabel:`Enable Integration`. 
3. Copy the :guilabel:`Service API Key` to your clipboard.

.. image:: /_images/spoc/Screen-Shot-2019-10-09-at-9.31.19-AM.png

Configure Datadog
====================

1. Select :guilabel:`Integrations` in the sidebar menu, find the VictorOps integration, and select :guilabel:`Available` then :guilabel:`Install`. 
2. In the dialog box, select the configuration tab. 
3. Paste in your service API key you obtained from Splunk On-Call, as well as, the Splunk On-Call routing key you want to use and select :guilabel:`Update Configuration`.

.. image:: /_images/spoc/Screen-Shot-2019-10-09-at-9.35.26-AM.png

4. Add ``@victorops`` to your Datadog metric monitors. To ensure a monitor auto-resolves the corresponding VictorOps incident, make sure that @victorops is selected in the monitor's notification step.

.. image:: /_images/spoc/datadog-notify-@victorops.png

Resolve the DataDog Monitor from Splunk On-Call
====================================================

Typically it is best to let Datadog, the source of the incident, resolve monitor incidents. However, if you would like to resolve the incident from Splunk On-Call, here are the steps to do so.

Requirements
-----------------

Custom Outgoing Webhooks and the Alert Rules Engine are Enterprise features.

Steps
-----------

1. Create a new Custom Outgoing Webhook in Splunk On-Call. Go to :guilabel:`Integrations` then :guilabel:`Outgoing Webhooks`.
2. Create a new webhook with the following details. Add your specific Datadog API credentials to the end of the URL, as in the example.
   * In the :guilabel:`Event` field, select :guilabel:`Incident-Resolved`.
   * For :guilabel:`Method` select :guilabel:`POST`.
   * For :guilabel:`Content Type` select :guilabel:`application/json`.
   * In the :guilabel:`To` field, enter your Datadog API credentials as in this example:
     ``https://api.datadoghq.com/monitor/bulk_resolve?api_key=<datadpg_api_key>&application_key=<datadog_app_key>``
   * Paste the following payload: 
     .. code-block:: 
        {
            "resolve": [
               {
                  "${{ALERT.datadog_monitor_id}}": "ALL_GROUPS"
               }
            ]
         }

3. Next, create an alert rules engine rule to conditionally fire the webhook you created. To do so, go to :guilabel:`Settings` then :guilabel:`Alert Rules Engine` and create the following rule:
   #. When :guilabel:`monitoring_tool` matches :guilabel:`Datadog`
   #. Under :guilabel:`Transform these alert fields`
      * Select :guilabel:`datadog_monitor_id` then :guilabel:`${{monitor_data.id}}`. 

.. image:: /_images/spoc/Screen-Shot-2019-10-09-at-9.45.55-AM.png

Recommended alert rules engine rule
-----------------------------------

Datadog alerts typically include links to your alerts that you can annotate to automatically render snapshot images and provide links to Datadog. We recommend the following rules engine annotations:

Requirements
-----------------

Custom Outgoing Webhooks and the Alert Rules Engine are Enterprise features.

Steps
----------

#. When :guilabel:`monitoring_tool` matches :guilabel:`Datadog`
#. Under :guilabel:`Transform these alert fields`
   * Select :guilabel:`Image URL` then :guilabel:`Snapshot` then :guilabel:`${{snapshot_url}}`. This transformation renders a snapshot image in the Splunk On-Call timeline.
   * Select :guilabel:`URL` then :guilabel:`Snapshot Link` then :guilabel:`${{snapshot_link}}}`. This transformation provides link to the image in Datadog.
   * Select :guilabel:`URL` then :guilabel:`Event Link` then :guilabel:`${{event_url}}`. This transformation provides a link to the event in Datadog.

.. image:: /_images/spoc/Screen-Shot-2019-10-09-at-9.49.00-AM.png


