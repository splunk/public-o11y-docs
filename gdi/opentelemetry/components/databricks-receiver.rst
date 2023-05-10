.. _databricks_receiver:

********************************************
Databricks receiver
********************************************

.. meta::
  :description: The Databricks receiver allows the Splunk Distribution of OpenTelemetry Collector to collect metrics from Databricks using the Databricks API.
  
The Databricks receiver allows the Splunk Distribution of OpenTelemetry Collector to collect metrics from Databricks using the Databricks API. Use this integration to view and monitor the health of your Databricks clusters. The receiver also generates metrics from the Spark subsystem running in a Databricks instance. The supported pipeline type is ``metrics``.

Benefits
===============================

After you configure the integration, you can access the following features:

- Visualize physical servers, virtual machines, AWS instances, and other resources in your environment that are visible to Splunk Observability Cloud. For information about navigators, see :ref:`use-navigators-imm`.

- Search for metrics sent by the receiver. For information about Metric Finder, see :ref:`metrics-finder-and-metadata-catalog`.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the Databricks receiver as described in the next section.
3. Restart the Collector.

Sample configurations
----------------------

To activate the Databricks receiver, add ``databricks`` to the ``receivers`` section of your
configuration file with all the mandatory fields, as shown in the following example:

.. code-block:: yaml

   databricks:
     instance_name: my-instance
     endpoint: https://dbr.example.net
     token: abc123
     spark_org_id: 1234567890
     spark_endpoint: https://spark.example.net
     spark_ui_port: 40001
     collection_interval: 10s

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your
configuration file. For example:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [databricks]

.. _spark-substytem-databricks:

Spark subsystem configuration
----------------------------------

To obtain the Spark settings for the receiver configuration, run the following Scala notebook and copy the values into your configuration:

.. code-block:: scala

   %scala  
   val sparkOrgId = spark.conf.get("spark.databricks.clusterUsageTags.clusterOwnerOrgId")
   val sparkEndpoint = dbutils.notebook.getContext.apiUrl.get
   val sparkUiPort = spark.conf.get("spark.ui.port")

Settings
======================

The following table shows the configuration options for the Databricks receiver:

.. list-table::
   :widths: 25 50 25
   :header-rows: 1

   * - Name
     - Description
     - Required
   * - ``instance_name``
     - A string representing the name of the instance. This value gets set as a ``databricks.instance.name`` resource attribute.
     - Yes
   * - ``endpoint``
     - The protocol (http or https), host name, and port for the Databricks API, without a trailing slash.
     - Yes
   * - ``token``
     - An access token to authenticate to the Databricks API. See :new-page:`Authentication using Databricks personal access tokens <https://docs.databricks.com/dev-tools/api/latest/authentication.html>` on the Databricks documentation site for more information. 
     - Yes
   * - ``spark_org_id``
     - Spark Org ID. See :ref:`spark-substytem-databricks` for information on how to found this value.
     - Yes
   * - ``spark_endpoint``
     - Spark API endpoint, composed of protocol, host name, and, optionally, the port. See :ref:`spark-substytem-databricks` for information on how to found this value.
     - Yes
   * - ``spark_ui_port``
     - Spark UI Port. Usually, the port is ``40001``. See :ref:`spark-substytem-databricks` for information on how to found this value.
     - Yes
   * - ``collection_interval``
     -  How often this receiver fetches information from the Databricks API. Must be a string readable by ``time.ParseDuration``. The default value is ``30s``.
     -  No
   * -  ``max_results``
     - The maximum number of items to return per API call. The default value is ``25``, which is the maximum value. If set explicitly, the API requires a value greater than ``0``, and less than or equal to ``25``.
     - No

Metrics
=====================

The following metrics, resource attributes, and attributes are available.

.. raw:: html

   <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/receiver/databricksreceiver/metadata.yaml"></div>

.. include:: /_includes/activate-deactivate-native-metrics.rst

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
