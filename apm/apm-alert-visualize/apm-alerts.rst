.. _apm-alerts:

*********************************************
Configure detectors and alerts in Splunk APM
*********************************************

.. meta::
   :description: Learn about options for detectors and alerts in Splunk APM. 

You can use detectors to dynamically monitor request rate, error rate and latency in the services you are tracing with Splunk APM. APM detectors use built-in algorithms to generate alerts about sudden spikes, historical anomalies, or a static threshold in your APM metrics or Business Workflows. See :ref:`alert-conditions-apm` for more information about alert conditions. 

You can also use AutoDetect detectors that are available by default for service latency, error rate, and request rate. See :ref:`autodetect` for more information.

Create a APM detector
========================

There are several entry points for creating APM detectors.

From the Splunk Observability Cloud create menu
-------------------------------------------------

#. Select the plus icon to open the create menu in Splunk Observability Cloud.
#. Select :guilabel:`APM Detector`.
#. See :ref:`detector-steps` to complete your detector configuration.

.. image:: /_images/apm/apm-detectors/new-detector-create-menu.png
  :width: 30%
  :alt: Screenshot of the create menu in Splunk Observability Cloud.

From a dashboard
--------------------

To create an APM detector from Splunk APM dashboards, select the bell icon within a specific chart in the dashboard and select :guilabel:`New detector from chart`. See :ref:`detector-steps` to complete your detector configuration.

.. image:: /_images/apm/apm-detectors/new-detector-from-chart.png
  :width: 30%
  :alt: Screenshot of the create menu in Splunk Observability Cloud.

From Tag Spotlight in Splunk APM
----------------------------------

To create an APM detector from Tag Spotlight in Splunk APM, select the 3-dot menu from the Tag Spotlight menu bar and select :guilabel:`Create Detector`. See :ref:`detector-steps` to complete your detector configuration.

.. image:: /_images/apm/apm-detectors/new-detector-from-tag-spotlight.png
  :width: 30%
  :alt: Screenshot of the create menu in Splunk Observability Cloud.

From the landing page in Splunk APM
--------------------------------------

To create an APM detector from the landing page in Splunk APM, select the 3-dot icon to open the :guilabel:`More`` menu in the metric charts for services and Business Workflows and select :guilabel:`Create Detector`. See :ref:`detector-steps` to complete your detector configuration.

.. image:: /_images/apm/apm-detectors/new-detector-landing-page.png
  :width: 30%
  :alt: Screenshot of the create menu in Splunk Observability Cloud.

From the service map in Splunk APM
------------------------------------

To create an APM detector from the service map in Splunk APM, select a service from the service map. Then, select the 3-dot icon in the panel for the service and select :guilabel:`Create Detector`. See :ref:`detector-steps` to complete your detector configuration.

.. image:: /_images/apm/apm-detectors/new-detector-service-map.png
  :width: 45%
  :alt: Screenshot of the create menu in Splunk Observability Cloud.

.. _detector-steps:

Steps to create a detector
-----------------------------

Follow these steps to create a detector for Splunk APM:

#. Name your detector.
#. Select the metric that is of interest to you. The following metrics are available. See :ref:`alert-conditions-apm` for more information about alert conditions.
    #. Request rate for a workflow, service, or endpoint.
    #. Error rate for a workflow, service, or endpoint.
    #. Latency for a workflow, service, or endpoint.
#. Set the condition for your alert: :guilabel:`Static threshold`, :guilabel:`Sudden change`, or :guilabel:`Historic anomaly`.
#. Select the scope of your alert. You can select specific environments and services.
#. Select the severity of the alert.
#. Configure your alert details:
    #. See :ref:`static-threshold`  to review options for the static threshold condition.
    #. See :ref:`sudden-change` to review options for the static threshold condition.
    #. See :ref:`hist-anomaly` to review options for the static threshold condition.
#. Select the alert severity. 
#. Share your alert with others by integrating with the tool your team uses to communicate and add a link to your runbook.
#. Select :guilabel:`Activate`.

