.. _get-started-windows:

*************************
Collect Windows data
*************************

.. meta::
   :description: Start sending metrics and log telemetry from Windows hosts to Splunk Observability Cloud.

The Splunk Distribution of the OpenTelemetry Collector is a package that provides integrated collection and forwarding for all telemetry types of the Windows platform to Splunk Observability Cloud.

Supported versions
=====================

.. include:: /_includes/requirements/collector-windows.rst

Install the Collector for Windows
======================================

Splunk Observability Cloud offers a guided setup to install the Collector:

#. Log in to Splunk Observability Cloud.

#. Open the :new-page:`Windows guided setup <https://login.signalfx.com/#/gdi/scripted/otel-connector-windows/step-1?category=all&gdiState=%7B"integrationId":"otel-connector-windows"%7D>`. Optionally, you can navigate to the guided setup on your own:

   #. In the navigation menu, select :menuselection:`Data Management`, then select :guilabel:`+ Add Integration` to open the :strong:`Integrate Your Data` page.

   #. In the integration filter menu, select :guilabel:`All`.

   #. Select :guilabel:`Windows`.

   #. Select :guilabel:`Add Connection`. The integration guided setup appears.

#. Follow the steps in the guided setup.

For advanced installation instructions, see :ref:`otel-install-windows`.

Learn more
=================

- :ref:`collector-windows-intro`.
- Troubleshoot Collector issues. See :ref:`otel-troubleshooting`.
- For a list of host and application monitors, see :ref:`monitor-data-sources`.