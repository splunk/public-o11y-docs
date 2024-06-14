.. _collector-splunk:

***************************************************
Part 2: Configure the Collector and Splunk instance
***************************************************

Now that you've configured your services using Docker Compose, learn how to create the Collector configuration wherein you assemble all the Collector components, and then create the Splunk indexes configuration. For an overview of the tutorial, see :ref:`about-logs-collector-splunk-tutorial`.

Configure the Collector
=======================

#. Create a file in the ``log-collection`` directory called ``otel-collector-config.yml``.

#. In the ``otel-collector-config.yml`` file, define the receivers used to collect the logs from the 2 logging services:

   .. code-block:: yaml
      receivers:
        # Each filelog receiver requires a unique name that follows the slash.
        filelog/output1:
          # The include field specifies the path from which the receiver collects the container logs.
          include: [ /output1/file.log ]
        filelog/output2:
          include: [ /output2/file.log ]

#. After the receivers in the ``otel-collector-config.yml`` file, define the processors used to transform the collected log data for use with Splunk Enterprise:

   .. code-block:: yaml
      # ...
      processors:
        # The batch processor helps regulate the data flow from the receivers.
        batch:
        # The transform processor is configured to set the `com.splunk.index` attribute to `index2`
        # for the logs with a `logging2` message, and `index1` for all other logs.
        transform:
          log_statements:
            - context: log
              statements:
                - set(attributes["com.splunk.index"], "index1")
                - set(attributes["com.splunk.index"], "index2") where ParseJSON(body)["message"] == "logging2"
        # The groupbyattrs processor groups the logs by their `com.splunk.index` attribute,
        # which is either `index1` or `index2`.
        groupbyattrs:
          keys:
            - com.splunk.index

#. After the processors in the ``otel-collector-config.yml`` file, define the exporter used to send the logs to the Splunk server's HTTP Event Collector (HEC):

   .. code-block:: yaml
      # ...
      exporters:
        splunk_hec/logs:
          # Splunk HTTP Event Collector token.
          token: "00000000-0000-0000-0000-0000000000000"
          # Splunk instance URL where the exporter sends the log data.
          endpoint: "https://splunk:8088/services/collector"
          tls:
            # Skips checking the certificate of the HEC endpoint when sending data over HTTPS.
            insecure_skip_verify: true

#. After the exporter in the ``otel-collector-config.yml`` file, define the service, which consists of a ``logs`` pipeline that organizes the flow of logging data through the 3 component types:

   .. code-block:: yaml
      # ...
      service:
        pipelines:
          logs:
            receivers: [ filelog/output1, filelog/output2 ]
            processors: [ transform, groupbyattrs, batch ]
            exporters: [ splunk_hec/logs ]

Configure the Splunk indexes
============================

#. Create a file in the ``log-collection`` directory called ``splunk.yml``.

#. In the ``splunk.yml`` file, define the ``index1`` and ``index2`` indexes:

   .. code-block:: yaml
      splunk:
        conf:
          indexes:
            directory: /opt/splunk/etc/apps/search/local
            content:
              index1:
                coldPath: $SPLUNK_DB/index1/colddb
                datatype: event
                homePath: $SPLUNK_DB/index1/db
                maxTotalDataSizeMB: 512000
                thawedPath: $SPLUNK_DB/index1/thaweddb
              index2:
                coldPath: $SPLUNK_DB/index2/colddb
                datatype: event
                homePath: $SPLUNK_DB/index2/db
                maxTotalDataSizeMB: 512000
                thawedPath: $SPLUNK_DB/index2/thaweddb

Next step
=========

You've now defined the necessary components for collecting, processing, and exporting the container logs using the Collector, and defined the Splunk indexes for storing the logs. Next, deploy the services using Docker Compose and verify that everything works as expected. To continue, see :ref:`deploy-verify-environment`.

Learn more
==========

* For more information about the Collector, see :ref:`otel-intro`.
* For more information about the components used in this Collector configuration see:

  * :ref:`filelog-receiver`
  * :ref:`batch-processor`
  * :ref:`transform-processor`
  * :ref:`groupbyattrs-processor`
  * :ref:`splunk-hec-exporter`
* For additional examples of how to use the HEC exporter, see the `OpenTelemetry Collector Contrib <https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/splunkhecexporter>`__ GitHub repository.
* For more information about configuring Splunk indexes, see `indexes.conf <https://docs.splunk.com/Documentation/Splunk/9.2.1/Admin/Indexesconf>`__.