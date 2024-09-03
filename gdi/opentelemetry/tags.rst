.. _otel-tags:

*******************************************************
Use tags or attributes in OpenTelemetry
*******************************************************

.. meta::
      :description: Add tags to your Splunk Distribution of the OpenTelemetry Collector configuration. You can include span tags in settings for the batch processor in your configuration YAML file.

Tags are key-value pairs of data associated with recorded measurements to provide contextual information, distinguish, and group metrics during analysis and inspection. 

In the OpenTelemetry data model, tags are provided as :strong:`attributes`. After Splunk Observability Cloud ingests ``traces`` with attributes, these are available as ``tags``. Alternatively, you could use attributes to create Monitoring Metric Sets, which can be used to drive alerting.

.. important:: Define your naming conventions before you start your OpenTelemetry roll-out. See :ref:`otel-tags-naming` for more information.

Create and configure attributes
===========================================

You can attach attributes to ``metrics``, ``logs``, and ``traces``, either via manual instrumentation, via automated instrumentation, or 
at the Collector level, using various processors such the :ref:`resource-processor` or the :ref:`attributes-processor`. 

With the processors you can do the following:

- ``insert``: Create the key-value pair if it doesn't already exist.
- ``update``: Update an attribute, when the key exists.
- ``upsert``: Insert or update an attribute, regardless of its previous existence.
- ``delete``: Delete an attribute from the data.
- ``hash``: Hash the value of an existing attribute using the SHA1 algorithm.
- ``extract``: Extract values using regular expression rules. 
- ``convert``: Convert an attribute to another type.

Sample configuration with the attributes processor
--------------------------------------------------------

Include the ``atributes`` processor in your configuration:

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

Next, add it as well to your pipelines, as shown in the following example:

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

.. _otel-tags-naming:

Semantic conventions for attributes
===========================================

Semantic conventions for standard resources
------------------------------------------------------------

See the following naming conventions for different standard resources.

Service attributes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can use a number of attributes to describe the service being monitored. 

``service.name`` is added automatically by the OpenTelemetry SDK and defines the logical name of the service. You can customize it, but keep it simple, and use other attributes to capture other aspects of the service.

The following service attributes are useful:

* ``service.namespace``: Identifies the team that owns the service.
* ``service.instance.id``: Identifies a unique instance of the service.
* ``service.version``: Identifies the version of the service.

Telemetry SDK
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The OpenTelemetry SDK sets these attributes automatically to record information about the instrumentation libraries being used:

* ``telemetry.sdk.name``: Typically set to ``opentelemetry``.
* ``telemetry.sdk.language``: The language of the SDK, such as ``java``.
* ``telemetry.sdk.version``: Identifies which version of the SDK is utilized.

Containers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

There are numerous attributes for services running in containers, such as ``container.id``, ``container.name``, or ``container.image.name``. 

Learn more in the OpenTelemetry GitHub repo at :new-page:`Container semantic conventions <https://github.com/open-telemetry/semantic-conventions/blob/main/model/resource/container.yaml>`.

Hosts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

There are numerous attributes for services running in hosts, such as ``host.id``, ``host.name``, or ``host.arch``. 

Learn more in the OpenTelemetry GitHub repo at :new-page:`Host semantic conventions <https://github.com/open-telemetry/semantic-conventions/blob/main/model/resource/host.yaml>`.

Deployment environment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Use the ``deployment.environment`` attribute to identify the environment where the service is deployed, such as ``staging`` or ``production``.

Splunk Observability Cloud uses this attribute to enable related content, so it's important to include it. Learn more at :ref:`get-started-enablerelatedcontent`.

Cloud
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

There are attributes that capture information for services running in public cloud environments, such ``cloud.provider``, ``cloud.account.id``, or ``cloud.region``.

Learn more in the OpenTelemetry GitHub repo at :new-page:`Cloud semantic conventions <https://github.com/open-telemetry/semantic-conventions/blob/main/model/resource/cloud.yaml>`.

.. caution:: Some cloud providers, such as GCP, define semantic conventions specific to their offering. Check Google official documentation for more information.

Kubernetes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

There are a number of standardized attributes for applications running in Kubernetes. The Splunk Distribution of the OpenTelemetry Collector adds many of these automatically, such as ``k8s.cluster.name``, ``k8s.node.name``, ``k8s.pod.name``, ``k8s.namespace.name``, and ``kubernetes.workload.name``.

See more at :ref:`Related content in Infrastructure monitoring <enablerelatedcontent-imm>`.

Best practices for creating custom attributes
------------------------------------------------------------

If you require custom attributes, avoid naming conflicts with attribute names already included in the semantic conventions. 

You also need to consider attribute values. For example, if you'd like to capture the particular business unit with which an application belongs, then you'll also want to have a standardized list of business unit values to choose from, to facilitate effective filtering.

The OpenTelemetry community provides guidelines for naming attributes, including: 

* Prefix the attribute name with your company's domain name, for example ``com.acme.shopname``, if the attribute is used outside your company as well as inside.
* Prefix the attribute name with the application name if it's unique to a particular application and only used within your organization.
* Do not use existing OpenTelemetry semantic convention names as a prefix for your attribute name.
* Consider submitting a proposal to add your attribute name to the OpenTelemetry specification, if there's a general need for it across different organizations and industries.
* Avoid having attribute names start with ``otel.*``, as this is reserved for OpenTelemetry specification usage.

Find the complete list at :new-page:`Attribute naming <https://opentelemetry.io/docs/specs/otel/common/attribute-naming/>`.

Considerations on metric cardinality
------------------------------------------------------------

Metric cardinality is defined as the number of unique metric time series (MTS) produced by a combination of metric name and its associated dimensions. A metric has high cardinality when it has a high number of dimension keys, and a high number of possible unique values for those dimension keys.

For example, suppose your application sends in data for a metric named ``custom.metric``. 

* In the absence of any attributes, custom.metric would generate a single metric time series (MTS).
* On the other hand, if ``custom.metric`` includes an attribute named ``customer.id`` and there are thousands of customer ID values, this would generate thousands of MTSes, which might impact costs and query performance.

Splunk Observability Cloud provides a report that allows for management of metrics usage, and you can create rules to drop undesirable dimensions. See more at :ref:`subscription-overview`.

Learn more
------------------------------------------------------------

For additional details see the following resources in GitHub:

* :new-page:`Resource SDK <https://github.com/open-telemetry/opentelemetry-specification/blob/49c2f56f3c0468ceb2b69518bcadadd96e0a5a8b/specification/resource/sdk.md>` 
* :new-page:`Metrics API <https://github.com/open-telemetry/opentelemetry-specification/blob/49c2f56f3c0468ceb2b69518bcadadd96e0a5a8b/specification/metrics/api.md>`
* :new-page:`Trace Semantic Conventions <https://github.com/open-telemetry/opentelemetry-specification/blob/52cc12879e8c2d372c5200c00d4574fa73996369/specification/trace/semantic_conventions/README.md>` 