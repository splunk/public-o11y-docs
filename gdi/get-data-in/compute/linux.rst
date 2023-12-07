.. _get-started-linux:

***********************
Collect Linux data
***********************

.. meta::
   :description: Send metrics and logs from Linux hosts to Splunk Observability Cloud.

The Splunk Distribution of OpenTelemetry Collector is a package that provides integrated collection and forwarding for all telemetry types for the Linux platform. You can deploy the Collector to gather telemetry for Splunk Infrastructure Monitoring, Splunk APM, or Splunk Log Observer.

Supported versions
=====================

.. include:: /_includes/requirements/collector-linux.rst

Get started
===================

Splunk Observability Cloud offers a guided setup to install the Collector:

#. Log in to Splunk Observability Cloud.

#. Open the :new-page:`Linux guided setup <https://login.signalfx.com/#/gdi/scripted/otel-connector-linux/step-1?category=all&gdiState=%7B"integrationId":"otel-connector-linux"%7D>`. Optionally, you can navigate to the guided setup on your own:

   #. In the navigation menu, select :menuselection:`Data Management`, then select :guilabel:`+ Add Integration` to open the :strong:`Integrate Your Data` page.

   #. In the integration filter menu, select :guilabel:`All`.

   #. Select :guilabel:`Linux`.

   #. Select :guilabel:`Add Connection`. The integration guided setup appears.

#. Follow the steps in the guided setup.

For advanced installation instructions, see :ref:`otel-install-linux`.

Learn more
=================

- Configure the Collector on Linux. See :ref:`otel-linux-config`.
- Learn about the Collector commands. See :ref:`otel-commands`.
- Troubleshoot Collector issues. See :ref:`otel-troubleshooting`.
- For a list of host and application monitors see :ref:`monitor-data-sources`.