.. _redaction-processor:

****************************
Redaction processor
****************************

.. meta::
      :description: The Redaction processor deletes span attributes that don't match a list of allowed span attributes. It also masks span attribute values that match a blocked value list.

The Redaction processor is an OpenTelemetry Collector component that deletes span attributes that don't match a list of allowed span attributes. It also masks span attribute values that match a blocked value list. Span attributes that aren't on the allowed list are removed before any value checks are done.

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

How does the processor work?
---------------------------------------------------

Ignored attributes are processed first so they're always allowed and never blocked. This field should only be used where you know the data is always safe to send to the telemetry system.

Only span attributes included on the list of allowed keys list are retained. If ``allowed_keys`` is empty, then no span attributes are allowed. All span attributes are removed in that case. To keep all span attributes, you should explicitly set ``allow_all_keys`` to ``true``.

``blocked_values`` applies to the values of the allowed keys. If the value of an allowed key matches the regular expression for a blocked value, the matching part of the value is then masked with a fixed length of asterisks. For example, if notes is on the list of allowed keys, then the ``notes`` span attribute is retained. However, if there is a value such as a credit card number in the notes field that matched a regular expression on the list of blocked values, then that value is masked.

Use cases
======================

Typical use-cases include:

* Prevent sensitive fields from accidentally leaking into traces
* Ensure compliance with legal, privacy, or security requirements

Data protection
---------------------------------------------------

The EU General Data Protection Regulation (GDPR) prohibits the transfer of any personal data like birthdates, addresses, or IP addresses across borders without explicit consent from the data subject. Popular trace aggregation services are located in US, not in EU. You can use the redaction processor to scrub personal data from your data.

PRC legislation prohibits the transfer of geographic coordinates outside of the PRC. Popular trace aggregation services are located in US, not in the PRC. You can use the redaction processor to scrub geographic coordinates from your data.

Payment Card Industry (PCI) Data Security Standards prohibit logging certain things or storing them unencrypted. You can use the redaction processor to scrub them from your traces.

.. _redaction-processor-settings:

Settings
======================

The following table shows the configuration options for the redaction processor:

.. list-table::
  :header-rows: 1
  :widths: 20 20 60

  * - Name
    - Type
    - Description

  * - ``allow_all_keys``
    - bool
    - Allows all span attribute keys. Set this to ``true`` to disable the ``allowed_keys`` list. The list of blocked values is applied regardless. If you just want to block values, set this to ``true``.

  * - ``allowed_keys``
    - string
    - List of allowed span attribute keys. Span attributes not on the list are removed. The list fails if it's empty. To allow all keys, you need to set ``allow_all_keys``.

  * - ``ignored_keys``
    - string
    - List of span attribute keys that are not redacted. Span attributes in this list are allowed to pass through the filter without being changed or removed.

  * - ``blocked_values``
    - string
    - List of regular expressions for blocking values of allowed span attributes. Values that match are masked.

  * - ``summary``
    - string
    - Controls the verbosity level of the diagnostic attributes that the processor adds to the spans when it redacts or masks other attributes. In some contexts a list of redacted attributes leaks information, while it's valuable when integrating and testing a new configuration. Possible values are ``debug``, ``info``, and ``silent``.

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
