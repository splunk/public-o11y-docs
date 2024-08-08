.. _udp-logs-receiver:

**************************************************************
UDP log receiver
**************************************************************

.. meta::
      :description: The UDP log receiver collects logs over UDP connections.

The UDP log receiver allows the Splunk Distribution of the OpenTelemetry Collector to collect logs over UDP connections. The supported pipeline is ``logs``. See :ref:`otel-data-processing` for more information.

.. _get-started-udp-receiver:

Get started
=================================================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:

   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the UDP log receiver as described in the next section. 

3. Restart the Collector.

.. _udp-receiver-sample-configs:

Sample configurations
-------------------------------------------------

To activate the UDP receiver add ``udplog`` to the ``receivers`` section of your ``agent_config.yaml`` file, as in the following example configuration:

.. code-block:: yaml

    receivers:
      udplog:
        listen_address: "0.0.0.0:54525"

To complete the configuration, include the receiver in the ``logs`` pipeline of the ``service`` section of your
configuration file. For example:

.. code:: yaml

  service:
    pipelines:
      logs:
        receivers: [udplog]        

See :ref:`udp-receiver-settings` for additional settings.

Use operators to format logs
============================================

The UDP log receiver uses operators to process logs into a desired format. Each operator fulfills a single responsibility, such as reading lines from a file, or parsing JSON from a field. You need to chain operators together in a pipeline to achieve your desired result.

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
--------------------------------

Use parser operators to isolate values from a string. There are two classes of parsers, simple and complex.

Parsers with embedded operations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can configure parsing operators to embed certain follow-up operations such as timestamp and severity parsing. 

For more information, see the the GitHub entry on complex parsers at :new-page:`Parsers <https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/stanza/docs/types/parsers.md#complex-parsers>`.

Multiline configuration
-------------------------------------------------

If set, the ``multiline`` configuration block instructs the ``udplog`` receiver to split log entries on a pattern other than newlines.

The ``multiline`` configuration block must contain exactly one of ``line_start_pattern`` or ``line_end_pattern``. These are regex patterns that match either the beginning of a new log entry, or the end of a log entry.

The ``omit_pattern`` setting can be used to omit the start/end pattern from each entry.

Supported encodings
============================================

The following encodings are supported:

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

Other less common encodings are supported on a best-effort basis. See the list of available encodings in :new-page:`https://www.iana.org/assignments/character-sets/character-sets.xhtml`.

.. _udp-receiver-settings:

Settings
=================================================

The following table shows the configuration options for the UDP receiver:

.. raw:: html

    <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tool/main/cfg-metadata/receiver/udplog.yaml"></div>


.. _troubleshoot-udp-receiver:

Troubleshooting
=================================================

.. include:: /_includes/troubleshooting-components.rst
