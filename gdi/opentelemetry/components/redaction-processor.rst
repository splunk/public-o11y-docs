.. _redaction-processor:

****************************
Redaction processor
****************************

.. meta::
      :description: Deletes span attributes that don't match a list of allowed span attributes. It also masks span attribute values that match a blocked value list.

The Redaction processor is an OpenTelemetry Collector component that deletes span attributes that don't match a list of allowed span attributes. It also masks span attribute values that match a blocked value list. 

The supported pipeline type is ``traces``. See :ref:`otel-data-processing` for more information.



Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:
  
  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the processor as described in this doc.
3. Restart the Collector.    

Main configuration
---------------------------------------------------

The following example shows the main configuration settings of the redaction processor:

.. code-block:: yaml

  processors:
    redaction:
      # allow_all_keys is a flag which when set to true, which can disables the
      # allowed_keys list. The list of blocked_values is applied regardless. If
      # you just want to block values, set this to true.
      allow_all_keys: false
      # allowed_keys is a list of span attribute keys that are kept on the span and
      # processed. The list is designed to fail closed. If allowed_keys is empty,
      # no span attributes are allowed and all span attributes are removed. To
      # allow all keys, set allow_all_keys to true.
      allowed_keys:
        - description
        - group
        - id
        - name
      # Ignore the following attributes, allow them to pass without redaction.
      # Any keys in this list are allowed so they don't need to be in both lists.
      ignored_keys:
        - safe_attribute
      # blocked_values is a list of regular expressions for blocking values of
      # allowed span attributes. Values that match are masked
      blocked_values:
        - "4[0-9]{12}(?:[0-9]{3})?" ## Visa credit card number
        - "(5[1-5][0-9]{14})"       ## MasterCard number
      # summary controls the verbosity level of the diagnostic attributes that
      # the processor adds to the spans when it redacts or masks other
      # attributes. In some contexts a list of redacted attributes leaks
      # information, while it is valuable when integrating and testing a new
      # configuration. Possible values:
      # - `debug` includes both redacted key counts and names in the summary
      # - `info` includes just the redacted key counts in the summary
      # - `silent` omits the summary attributes
      summary: debug

Next, include the processor in the required pipelines of the ``service`` section of your configuration file:

.. code-block:: yaml

  service:
    pipelines:
      traces:
        processors: [redaction]




.. _redaction-processor-settings:

Settings
======================

The following table shows the configuration options for the redaction processor:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/processor/redaction.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
