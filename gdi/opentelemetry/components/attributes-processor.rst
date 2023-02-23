.. _attributes-processor:

*************************
Attributes processor
*************************

.. meta::
      :description: Use the attributes processor to transform, redact, update, hash, or delete attributes of spans, metrics, or logs. Read on to learn how to configure the component.

The attributes processor is an OpenTelemetry Collector component that modifies spans, metrics, or logs through actions. You can combine actions in a single processor instance to run complex operations. Use cases include, among others, obfuscating sensitive information, copying values to new keys, and backfilling attributes.

You can apply any of the following actions on collected attributes of spans, metrics, or logs:

.. list-table::
   :width: 100%
   :widths: 20 80
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

You can include or exclude attributes for processing using ``include`` or ``exclude`` parameters. See the next sections for more information.

.. note:: To include or exclude whole spans, logs, or metrics without, use the filter processor. See :ref:`filter-processor`.

Get started
======================

By default, the Splunk Distribution of OpenTelemetry Collector includes the attributes processor. To turn on the attributes processor for a pipeline, add ``attributes`` to the ``processors`` section of the configuration. For example:

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

You can include or exclude attributes using any of the following properties:

- ``services``
- ``resources``
- ``libraries``
- ``span_names``
- ``log_bodies``
- ``log_severity_texts``
- ``metric_names``
- ``attributes``

The following example shows 

.. code-block:: yaml

   processors:
     attributes/includeexclude:
       include:
         match_type: regexp
         services: ["auth.*"]
       exclude:
         match_type: regexp
         span_names: ["login.*"]

For a complete list of parameters, see :ref:`attributes-processor-settings`.

Sample configurations
----------------------

The following sample configurations show how to filter spans, metrics, and logs using different criteria.



.. _attributes-processor-settings:

Settings
======================

The following table shows the configuration options for the filter processor:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/processor/attributes.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
