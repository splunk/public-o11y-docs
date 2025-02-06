.. _snowflake-receiver:

****************************
Snowflake receiver
****************************

.. meta::
      :description: Collects metrics from a Snowflake account by connecting to and querying a Snowflake deployment.

The Snowflake receiver collects metrics from a Snowflake account by connecting to and querying a Snowflake deployment.

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

To activate the receiver in the Collector, add ``snowflake`` to the ``receivers`` section of your configuration file, as shown in the following example:

.. code:: yaml

  receivers:
    snowflake:

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file. For example:

.. code:: yaml

  service:
    pipelines:
      metrics:
        receivers: [snowflake]

Configuration example
----------------------------------------------------------------------

See the following config example:

.. code:: yaml

  receivers:
    snowflake:
      username: snowflakeuser
      password: securepassword
      account: bigbusinessaccount
      warehouse: metricWarehouse
      collection_interval: 5m
      metrics:
        snowflake.database.bytes_scanned.avg:
          enabled: true
        snowflake.query.bytes_deleted.avg:
          enabled: false

Configuration settings
-------------------------------------------------

The following settings are required:

* ``account``. No default. Specifies the account from which metrics are gathered from.
* ``password``. No default. Specifies the password associated with the designated username. Used to authenticate with Snowflake.
* ``username``. No default. Specifies the username used to authenticate with Snowflake.
* ``warehouse``. No default. Specifies the warehouse, or unit of computer, designated for the metric gathering queries. Must be an existing warehouse in your Snowflake account.

The following settings are optional:

* ``collection_interval``. ``30m`` by default. Collection interval for the metrics receiver. The value for this setting must be readable by golang's ``time.ParseDuration``. Learn more at :new-page:`GO's time ParseDuration <https://pkg.go.dev/time#ParseDuration>`.
* ``database``. ``'SNOWFLAKE`` by default. Snowflake DB containing the schema with usage statistics and metadata to be monitored.
* ``metrics``. Controls the enabling/disabling of specific metrics. For a list of available metrics see :ref:`snowflake-receiver-metrics`. To learn more refer to :new-page:`Snowflake generated metrics <https://pkg.go.dev/time#ParseDuration>` in GitHub. 
* ``role``. ``'ACCOUNTADMIN'`` by default. Role associated with the username designated above. By default you need admin privileges to access most/all of the usage data.
* ``schema``. ``'ACCOUNT_USAGE'`` by default. The Snowflake DB schema that contains the usage statistics and metadata to be monitored.

Settings
======================

The following table shows the configuration options for the Snowflake receiver:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/snowflake.yaml"></div>

.. _snowflake-receiver-metrics:

Metrics
=====================

The following metrics, resource attributes, and attributes are available.

.. raw:: html

  <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/snowflakereceiver.yaml"></div>

Troubleshooting
======================

.. raw:: html

   <div class="include-start" id="troubleshooting-components.rst"></div>

.. include:: /_includes/troubleshooting-components.rst

.. raw:: html

   <div class="include-stop" id="troubleshooting-components.rst"></div>



