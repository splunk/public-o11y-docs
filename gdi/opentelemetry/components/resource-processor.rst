.. _resource-processor:

****************************
Resource processor
****************************

.. meta::
      :description: Use the resource processor to update, add, or delete resource attributes. Read on to learn how to configure the component.

The resource processor is an OpenTelemetry Collector component that can add, update, or delete resource attributes. The supported pipeline types are ``traces``, ``metrics``, and ``logs``. See :ref:`otel-data-processing` for more information.

The resource processor is useful when you want to add attributes that your instrumentation doesn't provide, or when you need to override the value of attributes collected by receivers using other attributes. To edit existing attributes, for example to obfuscate sensitive information, use the attributes processor. See :ref:`attributes-processor`.

Target attributes are defined through the ``key`` field. The ``value`` field contains the desired value for the attribute. Each attribute in the list requires an action. The available actions are the following:

.. list-table::
   :header-rows: 1
   :widths: 30, 70
   :width: 100%

   * - Action
     - Description
   * - ``insert``
     -  Adds the key-value combination to attributes when the key doesn't exist. Requires one of the following fields: ``value``, ``from_attribute``, or ``from_context``.
   * - ``update``
     -  Updates an existing key with a value. Requires one of the following fields: ``value``, ``from_attribute``, or ``from_context``.
   * - ``upsert``
     -  Adds or updates a key-value combination depending on the attributes containing the key. Requires one of the following fields: ``value``, ``from_attribute``, or ``from_context``.
   * - ``delete``
     - Deletes the attribute.
   * - ``hash`` 
     - Hashes an existing value using the SHA-1 algorithm.
   * - ``extract``
     - Extracts values from an attribute using a regular expression to add or update the value of keys specified in the rule. Requires the ``pattern`` field.
   * -  ``convert``
     - Converts the type of an existing attribute if the attribute can be converted. Requires the ``converted_type`` field.

.. note:: For information about the Resource Detection processor, see :ref:`resourcedetection-processor`.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the resource processor as described in the next section.
3. Restart the Collector.

Sample configurations
----------------------

To activate the resource processor, add ``resource`` to the ``processors`` section of your
configuration file, as shown in the following example:

.. code:: yaml

   resource:
     attributes:
     # Adds the attribute overriding existing values
     - key: cloud.availability_zone
       value: zone-1
       action: upsert
     # Copies the value of an attribute into another  
     - key: k8s.cluster.name
       from_attribute: k8s-cluster
       action: insert
      # Removes an attribute 
     - key: redundant-attribute
       action: delete

To complete the configuration, include the receiver in any pipeline of the ``service`` section of your
configuration file. For example:

.. code:: yaml

   service:
     pipelines:
       metrics:
         processors: [resource]
       logs:
         processors: [resource]
       traces:
         processors: [resource]

.. _resource-processor-settings:

Settings
======================

The following table shows the configuration options for the resource processor:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/processor/resource.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
