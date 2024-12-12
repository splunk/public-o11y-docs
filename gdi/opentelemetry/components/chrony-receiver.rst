.. _chrony-receiver:

****************************
Chrony receiver
****************************

.. meta::
      :description: Go implementation of the command chronyc tracking to allow for portability across systems and platforms.

The Chrony receiver is a pure Go implementation of the command ``chronyc tracking`` which allows portability across systems and platforms. The receiver produces all of the metrics that would typically be captured by the tracking command.

For more information about Chrony, see :new-page:`Red Hat's Chrony suite documentation <https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/7/html/system_administrators_guide/ch-configuring_ntp_using_the_chrony_suite>`.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the Chrony receiver as described in the next section.
3. Restart the Collector.

Default configuration
--------------------------------

To activate the receiver, add ``chrony`` to the ``receivers`` section of your configuration file:

.. code:: yaml

  receivers:
    chrony/defaults:
      endpoint: unix:///var/run/chrony/chronyd.sock # The default port by chronyd to allow cmd access
      timeout: 10s # Allowing at least 10s for chronyd to respond before giving up   

Next, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file:

.. code:: yaml

  service:
    pipelines:
      metrics:
        receivers:
          - chrony

Advanced configuration
-----------------------------------------------

You can use the following settings:

* ``endpoint``. Required. The address where ``chrony`` communicates to. Allowed formats are: 

  * udp://hostname:port 

  * unixgram:///path/to/chrony/sock 

  * unix:///path/to/chrony.sock - Note the triple slash. Unix is converted to unixgram.

* ``timeout``. Optional. The total amount of time allowed to read and process the data from chronyd. Use at least 1 second.

* ``collection_interval``. Optional. Determines how often to query Chrony.

* ``initial_delay``. Optional. ``1s`` by default. Defines how long this receiver waits before starting. See more in :new-page:`Red Hat's Chrony suite documentation <https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/7/html/system_administrators_guide/ch-configuring_ntp_using_the_chrony_suite>`.


* ``metrics``. Optional. Metrics to export. See the :new-page:`metric documentation in GitHub <https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/chronyreceiver/documentation.md>`.

Configuration example
-----------------------------------------------

See the following configuration example:

.. code:: yaml

  receivers:
    chrony:
      endpoint: unix:///var/run/chrony/chronyd.sock
      timeout: 10s
      collection_interval: 30s
      metrics:
        ntp.skew:
          enabled: true
        ntp.stratum:
          enabled: true

.. _chrony-receiver-settings:

Settings
======================

The following table shows the configuration options for the Chrony receiver:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/chrony.yaml"></div>

.. _metrics-receiver-settings:

Metrics
=======================

The following metrics, resource attributes, and attributes, are available.

.. raw:: html

  <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/chronyreceiver.yaml"></div>

See also the :new-page:`metric documentation in GitHub <https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/chronyreceiver/documentation.md>`.



.. raw:: html

   <div class="include-start" id="activate-deactivate-native-metrics.rst"></div>

.. include:: /_includes/activate-deactivate-native-metrics.rst

.. raw:: html

   <div class="include-stop" id="activate-deactivate-native-metrics.rst"></div>




Troubleshooting
======================



.. raw:: html

   <div class="include-start" id="troubleshooting-components.rst"></div>

.. include:: /_includes/troubleshooting-components.rst

.. raw:: html

   <div class="include-stop" id="troubleshooting-components.rst"></div>



