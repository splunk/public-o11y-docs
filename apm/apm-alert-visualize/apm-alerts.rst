.. _apm-alerts:

*********************************************
Configure detectors and alerts in Splunk APM
*********************************************

.. meta::
   :description: Learn about options for detectors and alerts in Splunk APM. 

You can use detectors to dynamically monitor request rate, error rate and latency in the services you are tracing with Splunk APM. APM detectors use built-in algorithms to generate alerts about sudden spikes, historical anomalies, or a static threshold in your APM metrics or Business Workflows. AutoDetect detectors are also available.

Create a APM detector
========================

You can create an APM detector from anywhere within Splunk Observability Cloud using the create menu.

Entry points for creating APM detectors
------------------------------------------
There are several entry points for creating APM detectors.

* From the Splunk Observability Cloud create menu
* From a APM dashboard
* From Tag Spotlight in Splunk APM
* From the landing page in Splunk APM
* From the service map in Splunk APM

Steps to create a detector
-----------------------------

Follow these steps to create a detector for Splunk APM:

#. Name your detector.
#. Select the metric that is of interest to you. The following metrics are available to you:
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

