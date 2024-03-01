.. _migrate-from-splunk-ruby:

************************************************************************************************
Migrate from the Splunk Ruby agent to the OpenTelemetry instrumentation for Ruby
************************************************************************************************

.. meta:: 
    :description: Learn how to migrate from the deprecated Splunk Distribution of OpenTelemetry Ruby to the upstream OpenTelemetry instrumentation for Ruby.

The Splunk Distribution of OpenTelemetry Ruby is deprecated. Use this guide to learn how to migrate from the Splunk Ruby agent to the upstream OpenTelemetry instrumentation for Ruby.

Compatibility and requirements
=============================================

Make sure that you have the correct requirements for the OpenTelemetry Ruby instrumentation. See :ref:`ruby-otel-requirements`.

Migrate to the OpenTelemetry instrumentation for Ruby 
==================================================================

To migrate from the Splunk instrumentation for Ruby to the OpenTelemetry instrumentation for Ruby, follow these steps:

#. Uninstall the Splunk Ruby agent.
#. Install and activate the OpenTelemetry instrumentation for Ruby. See :ref:`instrument-ruby-applications`.
#. Restart the server and application.

Uninstall the Splunk Ruby agent
--------------------------------------------------------------

If you've installed the Splunk Ruby agent, uninstall it using the following command: 

.. code-block:: bash

    gem uninstall <splunk-ruby-gem>

Replace ``<splunk-ruby-gem>`` with each Splunk Ruby agent gem that you've added to your Gemfile. 