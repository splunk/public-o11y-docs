.. _opsdash-spoc:

OpsDash integration for Splunk On-Call
******************************************

.. meta::
    :description: Configure the OpsDash integration for Splunk On-Call.

OpsDash monitors your servers, services, databases, and application metrics. The following guide shows you the steps needed to integrate both systems.

In Splunk On-Call
==========================

From Splunk On-Call, go to :guilabel:`Settings`, :guilabel:`Alert Behavior`, :guilabel:`Integrations`.

.. image:: _images/spoc/Integration-ALL-FINAL.png
   :alt: OpsDash integration

Select the :guilabel:`OpsDash` integration and copy the :guilabel:`Service API Endpoint` value to your clipboard.

.. image:: _images/spoc/OpsDash-final.png
   :alt: OpsDash integration screen

Make sure to add the appropriate routing key to the end of the URL. See :ref:`routing-keys` for more information.

In OpsDash
======================

In Scalyr, select on the :guilabel:`System Settings` tab, then expand next to the VictorOps Integration.

.. image:: _images/spoc/OpsDash_integrations_settings.png
   :alt: Integration settings

Paste the Service API Endpoint from the previous section into the :guilabel:`REST URL` field and select :guilabel:`UPDATE`.

.. image:: _images/spoc/OpsDash_integrations_REST.png
   :alt: Add REST endpoint

Select the :guilabel:`Notifications`` tab, then select :guilabel:`Add another` under :guilabel:`Notification Rules`.

.. image:: _images/spoc/OpsDash_integrations_notifications.png
   :alt: Configure notifications

In the :guilabel:`Add New Rule` window, select :guilabel:`VictorOps` from the menu, select :guilabel:`Add`, then select :guilabel:`Save`.

.. image:: _images/spoc/OpsDash_integrations_rules.png
   :alt: Add new rule

Now you can set up a test alert in OpsDash to verify that the integration is working:

#. Select any source to open its dashboard, then select any graph.

#. Scroll down and select the metric you want to alert on.

#. Scroll down and add alert thresholds.

#. Add a value that can trigger an alert immediately. Make sure to save.

Within a minute or so, your alert is generated in OpsDash. If it isn't, you might need to adjust your threshold settings.
