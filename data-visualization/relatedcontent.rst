.. _get-started-relatedcontent:

*****************************************************************
Related Content in Splunk Observability Cloud
*****************************************************************

.. meta created 2021-03-22
.. meta DOCS-2095

.. meta::
   :description: Ensure metadata keys are correct to enable full Related Content functionality.


The Related Content feature automatically correlates data between different views within Splunk Observability Cloud by presenting related data at the bottom of the screen.

Click tiles in the Related Content bar to seamlessly navigate from one view to another in Observability Cloud. The following animated GIF shows a user navigating from APM to Infrastructure Monitoring to Log Observer.

..  image:: /_images/get-started/Related1.gif
    :alt: Using Related Content in Observability CLOUD.

In the preceding example, the user navigates through the following sequence:

1. The user starts in APM by exploring the service dependency map. She clicks the :strong:`Frontend` service because it shows a high error rate.

   In the Related Content bar at the bottom of the screen, the user sees a tile showing related EC2 instances and clicks it.

2. Observability Cloud takes the user to Infrastructure where she clicks the first EC2 instance because it shows the highest CPU utilization. 

   In the Related Content bar, the user sees a tile showing logs related to the EC2 instance, so she clicks it.

3. Observability Cloud takes her to Log Observer where she can drill down into the related logs to find the root cause of the problem.


Required metadata keys
=================================================================
Related Content relies on specific metadata keys that allow APM, Infrastructure Monitoring, and Log Observer to pass filters around Observability Cloud. The following sections list the metadata key names required to enable Related Content for each view in Observability Cloud. If your data does not have the field names listed here, Observability Cloud cannot correlate your related data.

APM
-----------------------------------------------------------------
The following APM span tags are required to enable Related Content:

- service.name
- deployment.environment

The Splunk Distribution of OpenTelemetry Collector provides the span tags listed here.

To learn more about deployment environments in Splunk APM, see :ref:`apm-environments`.

Infrastructure Monitoring
-----------------------------------------------------------------
The following Infrastructure Monitoring metadata keys are required to enable Related Content:

- host.name

- k8s.cluster.name

- k8s.node.name

- k8s.pod.name

- container.id

- k8s.namespace.name

- kubernetes.workload.name

The Splunk Distribution of OpenTelemetry Collector provides the Infrastructure Monitoring metadata keys listed here.


Log Observer
-----------------------------------------------------------------
The following metadata keys are required to enable Related Content for Log Observer:

- service.name

- deployment.environment

- host.name

- trace_id

- span_id

How to enable Related Content
=================================================================
See :ref:`get-started-enablerelatedcontent` to learn how you can make any necessary updates to metadata key names to enable the Related Content feature.

Where can I see Related Content?
=================================================================
The following table describes when and where in Observability Cloud you can see Related Content:

.. list-table::
   :header-rows: 1
   :widths: 50, 50

   * - :strong:`Starting Point`
     - :strong:`Possible Destinations`

   * - Specific APM service
     - Kubernetes clusters filtered by service, AWS EC2s, GCP GCEs, Azure VMs, all log lines for the service

   * - Specific trace ID
     - Specific log line

   * - Specific cloud compute instance (AWS EC2, GCP GCE, Azure VM)
     - APM services, log lines for the specific instance

   * - Specific Kubernetes cluster, node, pod, container
     - Log lines for that node

   * - Specific Kubernetes pod or container
     - APM service in that pod/container, log lines for that pod/container

   * - Specific log line
     - Specific APM service, specific trace, specific Kubernetes node/pod/container, specific compute instance (AWS EC2, GCP GCE, Azure VM)


.. note::  Related Content is different from data links, a separate capability, which lets you dynamically transfer contextual information about the property you’re viewing to the resource, helping you get to relevant information faster. To learn more about data links, see :ref:`apm-create-data-links`.