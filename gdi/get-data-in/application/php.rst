.. _get-started-php:

***********************************************************
Instrument PHP applications for Splunk Observability Cloud
***********************************************************

.. meta::
   :description: Instrument a PHP application to export metrics and spans to Splunk Observability Cloud.

The SignalFx Tracing Library for PHP provides an OpenTracing-compatible tracer and automatically configurable instrumentations for many popular PHP libraries and frameworks. This is a native extension that supports PHP versions 5.4+ running on the Zend Engine.

For all available configuration options and their default values, see :new-page:`the README file <https://github.com/signalfx/signalfx-php-tracing#readme>`.

Start the integration
========================

To start a PHP integration, follow these steps:

#. Log in to Splunk Observability Cloud.
#. In the left navigation menu, select :menuselection:`Data Management`. 
#. Select :guilabel:`Add Integration` to open the :guilabel:`Integrate Your Data` page.
#. In the integration filter menu, select :guilabel:`By Product`.
#. Select the :guilabel:`APM` product.
#. Select the :guilabel:`PHP` tile.
#. Select:guilabel:`Add Connection`. The integration guided setup appears.
#. Follow the steps in the guided setup.
#. At the end of the guided setup, go to APM to see a live view of your data flowing into the application.
