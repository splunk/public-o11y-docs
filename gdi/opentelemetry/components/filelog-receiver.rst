.. _filelog-receiver:

*************************
Filelog receiver
*************************

.. meta::
      :description: The Filelog receiver tails and parses logs from files.

The Filelog receiver tails and parses logs from files. The supported pipeline type is ``logs``. See :ref:`otel-data-processing` for more information.

Get started
======================

Keep the following in mind when using the Filelog receiver 


An entry is the base representation of log data as it moves through a pipeline. All operators either create, modify, or consume entries.
A field is used to reference values in an entry.
A common expression syntax is used in several operators. For example, expressions can be used to filter or route entries.
Parsers with Embedded Operations
Many parsers operators can be configured to embed certain followup operations such as timestamp and severity parsing. For more information, see complex parsers.

All time parameters must have the unit of time specified. For example, ``200ms``, ``1s``, or ``1m``.

The Filelog receiver can read files that are being rotated.

How does the Filelog receiver work?
---------------------------------------------

The Filelog receiver uses operators 

Each operator performs a simple responsibility, such as parsing a timestamp or JSON. Chain together operators to process logs into a desired format.

Every operator has a type.
Every operator can be given a unique id. If you use the same type of operator more than once in a pipeline, you must specify an id. Otherwise, the id defaults to the value of type.
Operators will output to the next operator in the pipeline. The last operator in the pipeline will emit from the receiver. Optionally, the output parameter can be used to specify the id of another operator to which logs will be passed directly.
Only parsers and general purpose operators should be used.



Parse header metadata 
--------------------------------------------

To enable header metadata parsing, the filelog.allowHeaderMetadataParsing feature gate must be set, and start_at must be beginning.

If set, the file input operator will attempt to read a header from the start of the file. Each header line must match the header.pattern pattern. Each line is emitted into a pipeline defined by header.metadata_operators. Any attributes on the resultant entry from the embedded pipeline will be merged with the attributes from previous lines (attribute collisions will be resolved with an upsert strategy). After all header lines are read, the final merged header attributes will be present on every log line that is emitted for the file.

The header lines are not emitted by the receiver.

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

Sample configurations
--------------------------------

Json files
^^^^^^^^^^^^^^^^^^^^^^^^^^

This example shows how to tail a simple json file:

.. code-block:: yaml

  receivers:
    filelog:
      include: [ /var/log/myservice/*.json ]
      operators:
        - type: json_parser
          timestamp:
            parse_from: attributes.time
            layout: '%Y-%m-%d %H:%M:%S'

Plaintext files
^^^^^^^^^^^^^^^^^^^^^^^^^^

This example shows how to tail a plaintext file. 

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

Settings
======================

.. note:: By default, no logs are read from a file that is not actively being written to because ``start_at`` defaults to ``end``.

The following table shows the configuration options for the Filelog receiver:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/filelog.yaml"></div>

Multiline configuration
--------------------------------------------

If set, the multiline configuration block instructs the ``file_input`` operator to split log entries on a pattern other than new lines.

The multiline configuration block must contain ``line_start_pattern`` or ``line_end_pattern``. These are Regex patterns that match either the beginning of a new log entry, or the end of a log entry.   

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
