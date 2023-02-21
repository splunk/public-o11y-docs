.. _databricks_receiver:

****************************************************************
Databricks receiver
****************************************************************

.. meta::
  :description: Use this Splunk Observability Cloud integration for the Databricks clusters monitor. See benefits, install, configuration, and metrics 

Use this integration to view and monitor the health of your Databricks clusters. 

The Databricks Receiver uses the Databricks API to generate metrics about the operation of a Databricks instance. The supported pipeline type is ``metrics``.

.. note:: This receiver is experimental. Behavior, configuration fields, and the metric data model might change.

Benefits
=====================================

After you configure the integration, you can access these features:

- View a data-driven visualization of the physical servers, virtual machines, AWS instances, and other resources in your environment that are visible to Infrastructure Monitoring. For information about navigators, see :new-page:`Splunk Infrastructure Monitoring navigators <use-navigators-imm>`.

- Access Metric Finder and search for metrics sent by the receiver. For information about Metric Finder, see :new-page:`Use the Metric Finder <metrics-finder-and-metadata-catalog>`.

Installation
===============================

Follow these steps to deploy the integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   
   - :ref:`otel-install-windows`
   
   - :ref:`otel-install-k8s`

2. Configure the receiver as described in the next section.
3. Restart the Collector.

Configuration
================================

To activate this receiver, add a collection to your configuration (YAML) file, as shown in the following example:

.. code-block:: yaml

  receivers:
    databricks:
      instance_name: my-instance
      endpoint: https://my.host
      token: abc123
      collection_interval: 60s
      max_results: 10

See the :new-page:`Collector YAML file <https://github.com/signalfx/splunk-otel-collector/tree/main/cmd/otelcol/config/collector>` on GitHub for the complete configuration.

Configuration options
---------------------------------

The following table shows the configuration options available for this receiver:

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
     - The protocol (http or https), hostname, and port for the Databricks API, without a trailing slash.
     - Yes
   * - ``token``
     - An access token to authenticate to the Databricks API. See :new-page:`Authentication using Databricks personal access tokens <https://docs.databricks.com/dev-tools/api/latest/authentication.html>` on the Databricks documentation site for more information. 
     - Yes
   * - ``collection_interval``
     -  How often this receiver fetches information from the Databricks API. Must be a string readable by ``time.ParseDuration``. The default value is ``30s``.
     -  No
   * -  ``max_results``
     - The maximum number of items to return per API call. The default value is ``25``, which is the maximum value. If set explicitly, the API requires a value greater than ``0``, and less than or equal to ``25``.
     - No

Troubleshooting
================================

Before you create an issue or open a support request, try gathering the following information:

- What happened and the impact of the issue.
- All the steps you've followed until the issue appeared.
- What was the expected outcome.
- Your attempts to solve the issue, including workarounds.
- The operating system, runtime or compiler version, libraries, frameworks, and application servers of your environment, including your instrumentation settings.
- Debug logs and other logs that might help troubleshoot the issue.

To get help, see :ref:`support`.
