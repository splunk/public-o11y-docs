.. _oauth2client-extension:

*************************************
OAuth2 Client Auth extension
*************************************

.. meta::
      :description: This extension provides OAuth2 Client Credentials flow authenticator for HTTP and gRPC based exporters. 

The ``oauth2client`` extension provides OAuth2 Client Credentials flow authenticator for HTTP and gRPC based exporters. The extension automatically fetches and refreshes the token after it expires. 

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the ``basicauth`` extension as described in the next section.
3. Restart the Collector.

Sample configuration
--------------------------------

To activate the component, add ``oauth2client`` to the ``extensions`` section of your configuration file:

.. code-block:: yaml

  extensions:
    oauth2client:

To complete the configuration, include the extension in the ``service`` section of your configuration file:

.. code:: yaml

  service:
    extensions: [oauth2client]

The following settings are required to configure the extension:



Configuration examples
--------------------------------

This is a basic configuration example for the extension:



Settings
======================

The following table shows the configuration options for the ``health_check`` extension:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/extension/oauth2client.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
