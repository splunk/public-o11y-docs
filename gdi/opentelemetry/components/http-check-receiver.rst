.. _http-check-receiver:

*************************
HTTP check receiver
*************************

.. meta::
      :description: Use the HTTP check receiver to perform synthethic checks against HTTP endpoints. 

Use the HTTP check receiver to perform synthethic checks against HTTP endpoints. The supported pipeline type is ``metrics``. See :ref:`otel-data-processing` for more information.

The receiver makes a request to the specified endpoint and generates a metric with a label for each HTTP response status class with a value of ``1`` if the status code matches the class. For example, the receiver generates the following metrics if the endpoint returns a ``200``:

* ``httpcheck.status{http.status_class:1xx, http.status_code:200,...} = 0``
* ``httpcheck.status{http.status_class:2xx, http.status_code:200,...} = 1``
* ``httpcheck.status{http.status_class:3xx, http.status_code:200,...} = 0``
* ``httpcheck.status{http.status_class:4xx, http.status_code:200,...} = 0``
* ``httpcheck.status{http.status_class:5xx, http.status_code:200,...} = 0``

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
--------------------------------

To activate the receiver, add ``httpcheck`` to the ``receivers`` section of your configuration file:

.. code-block:: yaml

  receivers:
    httpcheck:

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file:

.. code:: yaml

  service:
    pipelines:
      metrics:
        receivers: [httpcheck]

Advanced configuration
--------------------------------

The following configuration settings are available:

* ``targets``. Required. The list of targets to be monitored.
* ``collection_interval``. Optional. ``60s`` by default. This receiver collects metrics on an interval. Valid time units are ``ns``, ``us`` (or ``µs``), ``ms``, ``s``, ``m``, ``h``.
* ``initial_delay``. Optional. ``1s`` by default. Defines how long this receiver waits before starting.

Each target has the following properties:

* ``endpoint``. Required. The URL to be monitored.
* ``method``. Optional. ``GET`` by default. The HTTP method used to call the endpoint.

See :ref:`http-check-receiver-settings` for more details. Additionally, targets also support the configuration options listed in :new-page:`HTTP config options for the Collector <https://github.com/open-telemetry/opentelemetry-collector/tree/main/config/confighttp#client-configuration>` in GitHub.

Configuration example
--------------------------------

See the following example:

.. code:: yaml

  receivers:
    httpcheck:
      targets:
        - endpoint: http://endpoint:80
          method: GET
        - endpoint: http://localhost:8080/health
          method: GET
        - endpoint: http://localhost:8081/health
          method: POST
          headers:
            test-header: "test-value"
      collection_interval: 10s

Metrics
======================

The following metrics, resource attributes, and attributes are available.

.. note:: The SignalFx exporter excludes some available metrics by default. Learn more about default metric filters in :ref:`list-excluded-metrics`.

.. raw:: html

  <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/httpcheckreceiver.yaml"></div>

.. include:: /_includes/activate-deactivate-native-metrics.rst

.. _http-check-receiver-settings:

Settings
======================

The following table shows the configuration options for the HTTP check receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/httpcheck.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
