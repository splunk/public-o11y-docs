.. _syslog-receiver:

*************************
Syslog receiver
*************************

.. meta::
      :description: The Syslog receiver parses Syslogs received over TCP or UDP.

The Syslog receiver parses Syslogs received over TCP or UDP. The supported pipeline type is ``logs``. See :ref:`otel-data-processing` for more information.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the Syslog receiver as described in the next section.
3. Restart the Collector.

Sample configuration
--------------------------------

To activate the Syslog receiver, add ``syslog`` to the ``receivers`` section of your configuration file, as in the following sample configurations. See :ref:`syslog-receiver-settings` for more details.

.. code-block:: yaml

  receivers:
    syslog:

To complete the configuration, include the receiver in the ``logs`` pipeline of the ``service`` section of your
configuration file:

.. code:: yaml

  service:
    pipelines:
      logs:
        receivers: [syslog]

Configuration examples
--------------------------------------------

This example shows how to configure logs received using TCP:

.. code-block:: yaml

  receivers:
    syslog:
      tcp:
        listen_address: "0.0.0.0:54526"
      protocol: rfc5424

This example shows how to configure logs received using UDP:

.. code-block:: yaml

  receivers:
    syslog:
      udp:
        listen_address: "0.0.0.0:54526"
      protocol: rfc3164
      location: UTC    

Advanced configurations
--------------------------------

You can find more examples in the GitHub repository :new-page:`splunk-otel-collextor/examples <https://github.com/signalfx/splunk-otel-collector/tree/main/examples>`.

Use cases
======================

Configure your connection
--------------------------------

Use the following fields to configure your connection. For more details, see the section :ref:`syslog-receiver-settings`.

Configure TCP
^^^^^^^^^^^^^^^^^^^^^^^^^^

You can use the following fields to configure the Syslog receiver with a TCP connection:

* ``listen_address``. A listening address with the format ``<ip>:<port>``. :strong:`Required`.
* ``max_buffer_size``.	Maximum size of buffer that can be allocated while reading a TCP input. ``1024kib`` by default.

* ``tls``. Optional TLS configuration for the ``tcp_input`` operator:
  
  *  ``cert_file``.	Path to the TLS certificate you want to use for TLS required connections.
  
  * ``key_file``.	Path to the TLS key you want to use for TLS required connections.
  
  * ``ca_file``.	Path to the CA certificate. For a client this verifies the server certificate. For a server this verifies client certificates. If empty, it uses the system's root CA.
  
  * ``client_ca_file``. Optional. Path to the TLS certificate the server uses to verify a client certificate. This sets the ClientCAs and ClientAuth to RequireAndVerifyClientCert in the TLSConfig. See :new-page:`https://godoc.org/crypto/tls#Config` for more information.

Configure UDP
^^^^^^^^^^^^^^^^^^^^^^^^^^

The following field is required:

* ``listen_address``: A listening address with the format ``<ip>:<port>``.

Use operators to format logs
--------------------------------------------

The Syslog receiver uses operators to parse Syslogs into a desired format. Each operator fulfills a single responsibility, such as reading lines from a file, or parsing JSON from a field. You need to chain operators together in a pipeline to achieve your desired result.

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

Parsers with embedded operations
--------------------------------------------------------------------------

You can configure many parsing operators to embed certain follow-up operations such as timestamp and severity parsing. 

For more information, see the the GitHub entry on complex parsers at :new-page:`Parsers <https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/stanza/docs/types/parsers.md#complex-parsers>`.

.. _syslog-receiver-settings:

Settings
======================

The following table shows the configuration options for the Syslog receiver:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/syslog.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
