.. _purefa-receiver:

********************************************************
Pure Storage FlashArray receiver
********************************************************

.. meta::
      :description: Receives metrics from the Pure Storage FlashArray.

The Pure Storage FlashArray (Purefa) receiver fetches metrics from the Pure Storage FlashArray.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the receiver as described in the next section.
3. Restart the Collector.

Sample configuration
----------------------------------------------------------------------

To activate the Purefa receiver in the Collector, add ``purefa`` to the ``receivers`` section of your configuration file, as shown in the following example:

.. code:: yaml

  receivers:
    purefa:

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file. For example:

.. code:: yaml

  service:
    pipelines:
      metrics:
        receivers: [purefa]



Configuration settings
-------------------------------------------------

The following settings are required:

* ``endpoint``. The URL of the scraper selected endpoint. If void the receiver runs without fetching any metrics.

* ``fa_array_name``. The array's pretty name to be used as a metrics label.

* ``namespace``. ``purefa`` by default. The selected Pure Storage OpenMetrics Namespace to query.

Configuration example
----------------------------------------------------------------------

In this example ``array01`` uses the :new-page:`Pure Storage FlashArray OpenMetrics exporter <https://github.com/PureStorage-OpenConnect/pure-fa-openmetrics-exporter>`, while ``array02`` uses the native on-box metrics provided in Purity//FA v6.6.11 or higher.

.. code:: yaml

  extensions:
    bearertokenauth/array01:
      token: "..."
    bearertokenauth/array02:
      token: "..."

  receivers:
    purefa/array01:
      fa_array_name: foobar01
      endpoint: http://127.0.0.1:9490/metrics
      array:
        - address: array01
          auth:
            authenticator: bearertokenauth/array01
      hosts:
        - address: array01
          auth:
            authenticator: bearertokenauth/array01
      directories:
        - address: array01
          auth:
            authenticator: bearertokenauth/array01
      pods:
        - address: array01
          auth:
            authenticator: bearertokenauth/array01
      volumes:
        - address: array01
          auth:
            authenticator: bearertokenauth/array01
      env: dev
      settings:
        reload_intervals:
          array: 20s
          hosts: 60s
          directories: 60s
          pods: 60s
          volumes: 60s

    purefa/array02:
      fa_array_name: foobar02
      endpoint: https://127.0.0.1/metrics
      tls:
        insecure_skip_verify: true
      array:
        - address: array02
          auth:
            authenticator: bearertokenauth/array02
      hosts:
        - address: array02
          auth:
            authenticator: bearertokenauth/array02
      directories:
        - address: array02
          auth:
            authenticator: bearertokenauth/array02
      pods:
        - address: array02
          auth:
            authenticator: bearertokenauth/array02
      volumes:
        - address: array02
          auth:
            authenticator: bearertokenauth/array02
      env: production
      settings:
        reload_intervals:
          array: 20s
          hosts: 60s
          directories: 60s
          pods: 60s
          volumes: 60s

  service:
    extensions: [bearertokenauth/array01,bearertokenauth/array02]
    pipelines:
      metrics:
        receivers: [purefa/array01,purefa/array02]

Settings
======================

The following table shows the configuration options for the Purefa receiver:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/purefa.yaml"></div>

.. _purefa-receiver-metrics:

Metrics
=====================

The following metrics, resource attributes, and attributes are available.

.. raw:: html

  <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/purefareceiver.yaml"></div>

Troubleshooting
======================

.. raw:: html

   <div class="include-start" id="troubleshooting-components.rst"></div>

.. include:: /_includes/troubleshooting-components.rst

.. raw:: html

   <div class="include-stop" id="troubleshooting-components.rst"></div>





