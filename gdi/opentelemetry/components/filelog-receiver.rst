.. _filelog-receiver:

*************************
Filelog receiver
*************************

.. meta::
      :description: The Filelog receiver tails and parses logs from files.

The Filelog receiver tails and parses logs from files. The supported pipeline type is ``logs``. See :ref:`otel-data-processing` for more information.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the Filelog receiver as described in the next section.
3. Restart the Collector.

Sample configuration
--------------------------------

To activate the Filelog receiver, add ``filelog`` to the ``receivers`` section of your configuration file:

.. code-block:: yaml

  receivers:
    filelog:

To complete the configuration, include the receiver in the ``logs`` pipeline of the ``service`` section of your configuration file:

.. code:: yaml

  service:
    pipelines:
      logs:
        receivers: [filelog]

Configuration examples
--------------------------------

This example shows how to tail a simple JSON file:

.. code-block:: yaml


  receivers:
    filelog:
      include: [ /var/log/myservice/*.json ]
      operators:
        - type: json_parser
          timestamp:
            parse_from: attributes.time
            layout: '%Y-%m-%d %H:%M:%S'

This example shows how to tail a plaintext file:

.. code-block:: yaml


  receivers:
    filelog:
      include: [ /simple.log ]
      operators:
        - type: regex_parser
          regex: '^(?P<time>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}) (?P<sev>[A-Z]*) (?P<msg>.*)$'
          timestamp:
            parse_from: attributes.time
            layout: '%Y-%m-%d %H:%M:%S'
          severity:
            parse_from: attributes.sev

The receiver reads logs from the simple.log file, such as:

``2023-06-19 05:20:50 ERROR This is a test error message``

``2023-06-20 12:50:00 DEBUG This is a test debug message``

Use operators to format logs
============================================

The Filelog receiver uses operators to process logs into a desired format. Each operator fulfills a single responsibility, such as reading lines from a file, or parsing JSON from a field. You need to chain operators together in a pipeline to achieve your desired result.

For instance, you can read lines from a file using the ``file_input`` operator. From there, you can send the results of this operation to a ``regex_parser`` operator that creates fields based on a regex pattern. Next, you can send the results to a ``file_output`` operator to write each line to a file on disk.

All operators either create, modify, or consume :strong:`entries`. 

* An entry is the base representation of log data as it moves through a pipeline. 
* A field is used to reference values in an entry.
* A common expression syntax is used in several operators. For example, expressions can be used to filter or route entries.

Available operators
--------------------------------------------------------------------------

For a complete list of available operators, see :new-page:`What operators are available? <https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/stanza/docs/operators/README.md#what-operators-are-available>` in GitHub.

The following applies to operators:

* Each operator has a ``type``.

* You can give a unique Id to each operator. 

  * If you use the same type of operator more than once in a pipeline, you must specify an Id. 
  * Otherwise, the Id defaults to the value of ``type``.

* An operator outputs to the next operator in the pipeline. 

  * The last operator in the pipeline emits from the receiver. 
  * Optionally, you can use the output parameter to specify the Id of another operator to pass logs there directly.
  
Parser operators 
--------------------------------------------

Use parser operators to isolate values from a string. There are two classes of parsers, simple and complex.

Parse header metadata 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To turn on header metadata parsing, set the ``filelog.allowHeaderMetadataParsing`` feature, and set ``start_at`` at the beginning. If set, the file input operator attempts to read a header from the start of the file. 

The following applies:

* Each header line must match the ``header.pattern`` pattern. 
* Each line is emitted into a pipeline defined by ``header.metadata_operators``. 
* Any attributes on the resultant entry from the embedded pipeline are merged with the attributes from previous lines. If attribute collisions happen, they are resolved with an upsert strategy. 
* After all header lines are read, the final merged header attributes are present on every log line that is emitted for the file.

The receiver does not emit header lines.

Parsers with embedded operations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can configure many parsing operators to embed certain follow-up operations such as timestamp and severity parsing. 

For more information, see the the GitHub entry on complex parsers at :new-page:`Parsers <https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/stanza/docs/types/parsers.md#complex-parsers>`.

Multiline configuration
--------------------------------------------

If set, the multiline configuration block instructs the ``file_input`` operator to split log entries on a pattern other than new lines.

The multiline configuration block must contain ``line_start_pattern`` or ``line_end_pattern``. These are Regex patterns that match either the beginning of a new log entry, or the end of a log entry.   

Supported encodings
----------------------

The Filelog receiver supports the following encodings:

.. list-table::
  :widths: 30 70
  :header-rows: 1
  :width: 100%

  * - Key
    - Description

  * - ``nop``
    - No encoding validation. Treats the file as a stream of raw bytes.

  * - ``utf-8``
    - UTF-8 encoding.

  * - ``utf-16le``
    - UTF-16 encoding with little-endian byte order.

  * - ``utf-16be``
    - UTF-16 encoding with big-endian byte order.

  * - ``ascii``
    - ASCII encoding.

  * - ``big5``
    - The Big5 Chinese character encoding.
	
Other less common encodings are supported on a best-effort basis. See the list of available encodings in :new-page:`https://www.iana.org/assignments/character-sets/character-sets.xhtml <https://www.iana.org/assignments/character-sets/character-sets.xhtml>`.

Advanced use cases
============================================

See a few use cases for the Filelog receiver in the following sections. 

You can find more examples in the GitHub repository :new-page:`splunk-otel-collextor/examples <https://github.com/signalfx/splunk-otel-collector/tree/main/examples>`.

Send logs to Splunk Cloud
--------------------------------------------

Use the following configuration to send logs to Splunk Cloud:

.. code-block:: yaml


  receivers:
    filelog:
      include: [ /output/file.log ]
      operators:
        - type: regex_parser
          regex: '(?P<before>.*)\d\d\d\d-\d\d\d-\d\d\d\d(?P<after>.*)'
          parse_to: body.parsed
          output: before_and_after
        - id: before_and_after
          type: add
          field: body
          value: EXPR(body.parsed.before + "XXX-XXX-XXXX" + body.parsed.after)

  exporters:
    # Logs
    splunk_hec:
      token: "${SPLUNK_HEC_TOKEN}"
      endpoint: "${SPLUNK_HEC_URL}"
      source: "otel"
      sourcetype: "otel"

  service:
    pipelines:
      logs:
        receivers: [filelog, otlp]
        processors:
        - memory_limiter
        - batch
        - resourcedetection
        #- resource/add_environment
        exporters: [splunk_hec]

Send truncated logs to Splunk Enterprise
--------------------------------------------

Use the following configuration to truncate logs and send them to Splunk Enterprise:

.. github:: yaml
  :url: https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/examples/otel-logs-truncate-splunk/otel-collector-config.yml

Send sanitized logs to Splunk Enterprise
--------------------------------------------

Use the following configuration to sanitize logs and send them to Splunk Enterprise.

.. github:: yaml
  :url: https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/examples/otel-logs-sanitization-splunk/otel-collector-config.yml

Route logs to different indexes
--------------------------------------------

Use the following configuration to route logs to different Splunk indexes.

.. github:: yaml
  :url: https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/examples/otel-logs-processor-splunk/otel-collector-config.yml

Associate log sources with source types 
--------------------------------------------

This example showcases how the Collector collects data from files and sends it to Splunk Enterprise, associating each source with a different source type. The source type is a default field that identifies the structure of an event, and determines how Splunk Enterprise formats the data during the indexing process.

.. github:: yaml
  :url: https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/examples/otel-logs-with-sourcetypes-splunk/otel-collector-config.yml

Settings
======================

.. note:: By default, the receiver doesn't read logs from a file that is not actively being written to because ``start_at`` defaults to ``end``.

The following table shows the configuration options for the Filelog receiver:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/filelog.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
