.. _otel-tags:

******************************************
Configure tags in OpenTelemetry
******************************************

.. meta::
      :description: Add tags to your Splunk Distribution of OpenTelemetry Collector configuration. You can include span tags in settings for the batch processor in your configuration YAML file.

Tags are key-value pairs of data associated with recorded measurements to provide contextual information, distinguish, and group metrics during analysis and inspection. When measurements are aggregated to become metrics, tags are used as the labels to break down the metrics.

In the OpenTelemetry data model, tags are provided as span attributes and can be added and modified by using an ``attributes`` processor in your traces pipelines. Some examples of actions the ``attributes`` processor can handle:

- ``insert``: Will only create the key-value pair if it doesn't already exist
- ``update``: Will update an attribute, when the key exists
- ``upsert``: Performs an insert or update (regardless of existence)

The settings look like this in the configuration YAML file:

.. code-block:: yaml

   processors:
     # Overrides an existing tag for a span.
     attributes/copyfromexistingkey:
       actions:
         - key: SPAN_TAG_KEY
           from_attribute: "SPAN_TAG_VALUE"
           action: upsert
     # Adds a tag to spans without a tag.
     attributes/newenvironment:
       actions:
         - key: SPAN_TAG_KEY
           value: "SPAN_TAG_VALUE"
           action: insert

If you include ``attributes`` processor(s), you have to add them to your pipelines, as shown in the following example:

.. code-block:: yaml

   service:
     pipelines:
       traces:
         processors:
           - memory_limiter
           - batch
           - resourcedetection
           - attributes/copyfromexistingkey
           - attributes/newenvironment
