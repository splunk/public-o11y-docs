.. _attributes-processor:

*************************
Attributes processor
*************************

.. meta::
      :description: Use the attributes processor to transform, redact, update, hash, or delete attributes of spans, metrics, or logs. Read on to learn how to configure the component.

The attributes processor is an OpenTelemetry Collector component that modifies the attributes of spans, metrics, or logs through actions. You can combine actions in a single processor instance to run complex operations. Use cases include, among others, obfuscating sensitive information, copying values to new keys, and backfilling attributes.

You can apply any of the following actions on collected attributes of spans, metrics, or logs:

.. list-table::
   :width: 100%
   :widths: 10 90
   :header-rows: 1

   * - Action
     - Description
   * - ``insert``
     - Inserts a new attribute in data lacking a specific ``key``, which must have either a ``value``, ``from_attribute``, or ``from_context`` defined.
   * - ``update``
     - Updates an attribute in data that has a specific ``key``, which must have either a ``value``, ``from_attribute``, or ``from_context`` defined.
   * - ``upsert``
     - Updates or insert an attribute in data depending on whether a ``key`` exists or not. The ``key`` must have either a ``value``, ``from_attribute``, or ``from_context`` defined.
   * - ``delete``
     - Deletes an attribute from the data that has a specific ``key`` or ``pattern``.
   * - ``hash``
     - Hashes the value of an existing attribute that has a specific ``key`` or ``pattern`` using the SHA1 algorithm.
   * - ``extract``
     - Extracts values using regular expression rules. A ``pattern`` is required.
   * - ``convert``
     - Converts an attribute to another type, as specified in the ``converted_type`` parameter, which can be either ``int``, ``double``, or ``string``.

.. note:: To include or exclude whole spans, logs, or metrics, use the filter processor. See :ref:`filter-processor`.

Get started
======================

By default, the Splunk Distribution of OpenTelemetry Collector includes the attributes processor. To activate the attributes processor for a pipeline, add ``attributes`` to the ``processors`` section of the configuration. For example:

.. code-block:: yaml

   processors:
     attributes/example:
       actions:
         - key: db.table
           action: delete
         - key: redacted_span
           value: "new_value"
           action: upsert
         - key: copy_key
           from_attribute: key_original
           action: update
         - key: account_id
           value: 33445
           action: insert
         - key: account_password
           action: delete
         - key: account_email
           action: hash
         - key: http.status_code
           action: convert
           converted_type: int

You can then add the attributes processors to any compatible pipeline. For example:

.. code-block:: yaml
   :emphasize-lines: 6, 14, 22

   service:
     pipelines:
       traces:
         receivers: [jaeger, otlp, smartagent/signalfx-forwarder, zipkin]
         processors:
         - attributes/traces
         - memory_limiter
         - batch
         - resourcedetection
         exporters: [sapm, signalfx]
       metrics:
         receivers: [hostmetrics, otlp, signalfx, smartagent/signalfx-forwarder]
         processors:
         - attributes/metrics
         - memory_limiter
         - batch
         - resourcedetection
         exporters: [signalfx]
       logs:
         receivers: [fluentforward, otlp]
         processors:
         - attributes/logs
         - memory_limiter
         - batch
         - resourcedetection
         exporters: [splunk_hec]

To include or exclude attributes use any of the following properties:

- ``services``
- ``resources``
- ``libraries``
- ``span_names``
- ``log_bodies``
- ``log_severity_texts``
- ``metric_names``
- ``attributes``

The following example shows how to apply a ``delete`` action to specific services:

.. code-block:: yaml

   attributes/selectiveprocessing:
     include:
       match_type: strict
       services: ["service1", "service2"]
     actions:
       - key: sensitive_field
         action: delete

For a complete list of parameters, see :ref:`attributes-processor-settings`.

Sample configurations
----------------------

The following sample configurations show how to perform different actions on attributes.

.. note:: For a complete list of examples, see the configuration snippets in :new-page:`https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/testdata/config.yaml`.

Remove or obfuscate sensitive information from logs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following example shows how to remove a token attribute, hash an email, and redact a password in logs:

.. code-block:: yaml

   attributes/log_body_regexp:
     include:    
       match_type: regexp
         log_bodies: ["AUTH.*"]
       actions:
         - key: password
           action: update
           value: "Redacted"
         - key: apitoken
           action: delete
         - key: email
           action: hash

Create a new attribute based on the value of another
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following example shows how to create a new attribute based on the value of another attribute in spans:

.. code-block:: yaml

   attributes/createattributes:
     actions:
         # Creates four new attributes (defined in pattern) from the
         # value of the http.url attribute
       - key: "http.url"
           pattern: ^(?P<http_protocol>.*):\/\/(?P<http_domain>.*)\/(?P<http_path>.*)(\?|\&)(?P<http_query_params>.*)
           action: extract

Backfill spans that are missing an attribute
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following example shows how to backfill spans that are missing an attribute:

.. code-block:: yaml

   attributes/complex:
     actions:
       - key: operation
         value: default
         action: insert
       - key: svc.operation
         from_attribute: operation
         action: upsert
       - key: operation
         action: delete

More examples and scenarios
------------------------------

See also the following scenarios: 

* :ref:`configure-remove`
* :ref:`collector-remove-data`  

.. _attributes-processor-settings:

Settings
======================

The following table shows the configuration options for the attributes processor:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/processor/attributes.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
