.. _logs-logs:

**************************************************
Set up Log Observer
**************************************************


.. meta::
   :description: Connect Splunk Observability Cloud to your data sources. Set up Log Observer to investigate logs in context with metrics and traces.

..	toctree::
   :hidden:

Complete the instructions on this page if you have a Log Observer entitlement in Observability Cloud. If you don't have a Log Observer entitlement in Observability Cloud, see :ref:`logs-intro-logconnect` to set up the integration and begin using Log Observer to query your Splunk platform logs.

By default, Log Observer indexes and stores all logs data that you send to Observability Cloud unless you choose to archive some of your logs data in Amazon S3 buckets. See :ref:`logs-infinite` to learn how to archive logs until you want to index and analyze them in Log Observer. If you use Log Observer Connect, your logs data remains in your Splunk platform instance and is never stored in Log Observer or Observability Cloud.

What type of data is supported?
==================================================
Splunk Log Observer supports unstructured log data at ingest.


Prerequisites
==================================================
Before setting up Log Observer, you must meet the following criteria:

- Your Observability Cloud organization must be provisioned with an entitlement for Log Observer.
- You must be an administrator in an Observability Cloud organization to set up integrations.


Start using Log Observer
==================================================
You can use Observability Cloud guided setups to send logs to Log Observer from your hosts, containers, and cloud providers. Use the :ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>` to capture logs from your resources and applications. Decide whether you want to see logs from each data source, only one, or any combination of data sources. The more complete your log collection in Log Observer, the more effective your use of Log Observer can be for troubleshooting your entire environment using logs. You can complete step 1, step 2, or both in the following list, depending on which logs you want to see.

To start using Log Observer, complete the following tasks:

1. :ref:`Collect logs from your hosts and containers <hosts-containers>`

2. :ref:`Collect logs from your cloud providers <cloud-providers>`

3. :ref:`Filter and aggregate your data in Log Observer <work-with-data>`

4. :ref:`Ensure the severity key is correctly mapped <severity-key>`

.. _hosts-containers:

Collect logs from your hosts and containers
--------------------------------------------------
To send logs from your hosts and containers to Log Observer, follow these instructions:

1. Log in to Splunk Observability Cloud.

2. In the left navigation menu, select :menuselection:`Data Management` to open the Integrate Your Data page.

3. On the :strong:`Integrate Your Data` page in Observability Cloud, select the tile for the platform you want to import logs from. You can select Windows, Kubernetes, or Linux. The guided setup for your platform appears.

4. Follow the instructions in the guided setup then see :ref:`work-with-data`.

After you see data coming into Log Observer from your data source, you can send logs from another data source or continue analyzing logs from the platform you have just set up.

.. _cloud-providers:

Collect logs from your cloud providers
--------------------------------------------------

Amazon Web Services
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To send logs from Amazon Web Services to Log Observer, follow these instructions:

1. Log in to Splunk Observability Cloud.

2. In the left navigation menu, select :menuselection:`Data Management` to display the Integrate Your Data page.

3. Select :guilabel:`Add Integration`. 
   
4. In the :guilabel:`Cloud Integrations` section, select the the Amazon Web Services tile.

5. Follow the instructions in the guided setup then see :ref:`work-with-data`.

For more information about setting up an AWS connection, see :ref:`aws-logs` and :ref:`aws-cloudformation`.

Google Cloud Platform
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To send logs from Google Cloud Platform to Log Observer, follow the instructions in :ref:`ingest-gcp-log-data` then see :ref:`work-with-data`.

Microsoft Azure
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
To send logs from Microsoft Azure to Log Observer, follow the instructions in :ref:`ingest-azure-log-data` then see :ref:`work-with-data`.

After you see data coming into Log Observer from your data source, you can send logs from another data source or continue analyzing logs from the cloud provider you have just set up.

.. note::

   If you already have existing Fluentd or Fluent Bit deployments, you can configure them to send logs to Log Observer. However, it is important to note that the following are true when using Fluentd or Fluent Bit:

      - Logs captured by your own Fluentd or Fluent Bit agents do not include the resource metadata that automatically links log data to other related sources available within APM and Infrastructure Monitoring.

      - Although there are multiple ways to send log data to Log Observer, Splunk only provides direct support for the Splunk distribution of OpenTelemetry Collector.

   If you still want to use Fluentd to send logs to Log Observer, see :ref:`Configure Fluentd to send logs <fluentd>`.

.. _work-with-data:

Filter and aggregate your data in Log Observer
--------------------------------------------------
After you have collected some logs, use filters and aggregation to efficiently navigate your logs in Log Observer. You can verify that Log Observer is correctly processing and indexing your logs by filtering and aggregating your log data.

You can use the Log Observer interface to filter your logs based on keywords or fields. To filter your data, follow these steps:

1. Select :strong:`Add Filter`.

2. To find logs containing a keyword, select the :strong:`Keyword` tab and enter a keyword.

3. To find logs containing a specific field, select the :strong:`Fields` tab and enter a field in :strong:`Find a field` then select it from the list. If helpful, you can enter a value for the specified field.

4. To display only results that include the keywords, fields, or field values you entered, select the equal sign (=) next to the appropriate entry. To display only results that exclude the keywords, fields, or field values you entered, select the not equal sign (!=) next to the appropriate entry.

The resulting logs appear in the Logs table. You can add more filters, enable and disable existing filters, and select individual logs to learn more.

Perform aggregations on logs to visualize problems in a histogram that shows averages, sums, and other statistics related to logs. Aggregations group related data by one field and then perform statistical calculation on other fields. Find the aggregations controls in the control bar at the top of the Log Observer UI. The default aggregation shows all logs grouped by severity.

See :ref:`logs-aggregations` to learn how to perform more aggregations.

.. _severity-key:

Ensure severity key is correctly mapped
--------------------------------------------------
The severity key is a field that all logs contain. It has the values ``Debug``, ``Error``, ``Info``, ``Unknown``, and ``Warning``. Because the ``severity`` field in many logs is called ``level``, Log Observer automatically remaps the log field ``level`` to ``severity``.

If your logs call the ``severity`` key by a different name, that's okay. To ensure that Log Observer can read your field, transform your field name to ``severity`` using a Field Copy Processor. See :ref:`field-copy-processors` to learn how.

.. _fluentd:

Configure Fluentd to send logs
--------------------------------------------------------------------------
If you already have Fluentd running in your environment, you can reconfigure it
to send logs to an additional output. To send logs to Splunk Observability Cloud
in addition to your current system, follow these steps:

1. Make sure that you have the HEC plugin for Fluentd installed.

   | :strong:`Option A`
   | Install the plugin and rebuild the Fluentd using the instructions in :new-page:`fluent-plugin-splunk-hec <https://github.com/splunk/fluent-plugin-splunk-hec#installation>`.

   | :strong:`Option B`
   | Use an existing Fluentd docker image with HEC plugin included. To get this image, enter
   | `docker pull splunk/fluentd-hec`.

   | To learn more, see :new-page:`Fluentd docker image with HEC plugin included <https://hub.docker.com/r/splunk/fluentd-hec>`.

2. Add HEC output.
   Change your Fluentd configuration by adding another output section. The new HEC
   output section points to Splunk’s SignalFx Observability ingest endpoint.

   For example, if you have one output to elasticsearch, follow these steps:

   - Change ``type`` from ``@elasticsearch`` to ``@copy`` in the match section.
   - Put ``elasticsearch`` into the ``<store>`` block.
   - Add another ``<store>`` block for HEC output.


    The following is a sample of output to ``@elasticsearch``:

    .. code-block:: bash

       <match **>
          @type elasticsearch
          ...
          <buffer>
          ...
          </buffer>
       </match>

3. Change the ``@elasticsearch`` output to the following:

    .. code-block::

       <match **>
          @type copy
          <store>
            @type elasticsearch
            ...
            <buffer>
            ...
            </buffer>
          </store>
          <store>
            @type splunk_hec
            hec_host "ingest.<SIGNALFX_REALM>.signalfx.com"
            hec_port 443
            hec_token "<SIGNALFX_TOKEN>"
            ...
            <buffer>
            ...
            </buffer>
          </store>
       </match>

4. In the new ``<store>`` section for splunk_hec, provide at least the following fields:

   - ``hec_host`` - Set the HEC ingest host (for example, ``ingest.us1.signalfx.com hec_port``) to 443.

   - ``hec_token`` - Provide the SignalFx access token.

5. Specify the following parameters:

   - ``sourcetype_key`` or ``sourcetype`` - Defines source type of logs by using a particular log field or static value

   - ``source_key`` or ``source`` - Defines source of logs by using a particular log field or static value

6. Set up a buffer configuration for HEC output. The following is an example using memory buffer:

    .. code-block::

       <buffer>
         @type memory
         chunk_limit_records 100000
         chunk_limit_size 200k
         flush_interval 2s
         flush_thread_count 1
         overflow_action block
         retry_max_times 10
         total_limit_size 600m
       </buffer>

For more details on buffer configuration, see :new-page:`About buffer <https://github.com/splunk/fluent-plugin-splunk-hec#about-buffer>`.

See :new-page:`HEC exporter documentation <https://github.com/splunk/fluent-plugin-splunk-hec#parameters-for-both-splunk_hec-and-splunk_ingest_api>` to learn about other optional fields.
