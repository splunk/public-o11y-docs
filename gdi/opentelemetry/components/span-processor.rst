.. _span-processor:

****************************
Span processor 
****************************

.. meta::
      :description: Use the span processor to modify the span name based on its attributes or extract span attributes from the span name.

The span processor allows you to:

* Modify the span name based on its attributes. 
* Extract span attributes from the span name.
* Change span status. 
* Optionally, you can include or exclude spans. Read more in the GitHub Filtering repo at :new-page:`Include/Exclude Filtering <https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md#includeexclude-filtering>`.
  
The supported pipeline types are ``traces``. See :ref:`otel-data-processing` for more information.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the span processor as described in the next section.
3. Restart the Collector.

Sample configurations
----------------------

To activate the span processor, add ``span`` to the ``processors`` section of your configuration file, as shown in the following example:

.. code:: yaml

  resource:
    span:
      name:
      status:

The processor supports the following actions:

* ``name``: Modify the name of attributes within a span.
* ``status``: Modify the status of the span.

Next, add the processor to the service pipelines section of your configuration file, for example: 

.. code-block:: yaml

  service:
    pipelines:
      traces:
        processors: [span]

.. _span-processor-use:

Use the ``span`` processor
===============================

.. _span-processor-name:

Name a span
--------------------------------------------

To name a span, use the following settings:

* ``from_attributes``. **Required**. The attribute value for the keys used to create a new name in the order specified in the configuration.
* ``separator``: A string used to split values.

.. note:: If renaming is dependent on attributes being modified by the :ref:`attributes-processor`, ensure the span processor is specified after the attributes processor in the pipelines.

.. code:: yaml

    span:
      name:
        # from_attributes represents the attribute keys to pull the values from to generate the new span name.
        from_attributes: [<key1>, <key2>, ...]
        # Separator is the string used to concatenate various parts of the span name.
        separator: <value>

Example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

See the following example:

.. code:: yaml

  span:
    name:
      from_attributes: ["db.svc", "operation"]
      separator: "::"

.. _span-processor-extract:

Extract attributes from a span name
--------------------------------------------

The ``span`` processor takes a list of regular expressions to match the span name against, and extracts attributes from it based on subexpressions. It must be specified under the ``to_attributes`` section.

To extract attributes from a span name, use the following settings:

* ``rules``. **Required**. A list of rules to extract attribute values from span name. The values in the span name are replaced by extracted attribute names. Each rule in the list is a regex pattern string. 
  
  * The span name is checked against the regex and, if the regex matches, all named subexpressions of the regex are extracted as attributes and are added to the span. 
  * Each subexpression name becomes an attribute name and subexpression matched portion becomes the attribute value. The matched portion in the span name is replaced by the extracted attribute name. 
  * If the attributes already exist in the span they are overwritten. 
  * The process is repeated for all rules in the order they are specified. Each subsequent rule works on the span name that is the output after processing the previous rule.

* ``break_after_match``. **Required**. ``false`` by default. Specifies if processing of rules should stop after the first match. If ``false``, rule processing will continue to be performed over the modified span name.

.. code:: yaml

  span/to_attributes:
    name:
      to_attributes:
        rules:
          - regexp-rule1
          - regexp-rule2
          - regexp-rule3
          ...
        break_after_match: <true|false>

Example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

See the following example:

.. code:: yaml

  # Let's assume input span name is /api/v1/document/12345678/update
  # Applying the following results in output span name /api/v1/document/{documentId}/update
  # and will add a new attribute "documentId"="12345678" to the span.
  span/to_attributes:
    name:
      to_attributes:
        rules:
          - ^\/api\/v1\/document\/(?P<documentId>.*)\/update$

.. _span-processor-set-status:

Set the status for a span
--------------------------------------------

To set the status for a span, see the following settings:

* ``code``. **Required**. Represents the span status. Accepted values: ``Unset``, ``Error``, ``Ok``.
* ``description``. Only used for code ``Error``.

Example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

See the following example:

.. code:: yaml

  # Set status allows to set specific status for a given span. Possible values are
  # Ok, Error and Unset as per
  # https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/api.md#set-status
  # The description field allows to set a human-readable message for errors.
  span/set_status:
    status:
      code: Error
      description: "some error description"

.. _span-processor-settings:

Settings
======================

The following table shows the configuration options for the span processor:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/processor/span.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
