.. _apm-find-root-cause:

************************************
Example APM root cause investigation
************************************

.. meta::
   :description: Follow along with an example to see how Splunk Observability Cloud helps you find the root cause of an issue with APM.

The following example illustrates how Splunk APM helps you quickly narrow in on the root cause of an incident. These are some characteristics of the example:

- There is a high error rate on an endpoint
- The endpoint is in a service with inbound and outbound dependent services
- Services run in a containerized infrastructure
 
Step 1. Identify a service with a high error rate
=================================================

You just received a high error rate alert on the ``/checkout`` endpoint for the ``api`` service. From the alert notification, select :strong:`Troubleshoot` to navigate directly to troubleshooting in Splunk APM. The time, service, endpoint, and environment context carries over.

In the service map, the circle inside the ``api:/checkout`` endpoint has hashed lines, which indicates that the error is rooted in another service.

Since you are investigating a high error rate issue, click the :strong:`Requests and Errors` card to get more insights. View information about error sources in an error stack. An error stack identifies the full path of the error. In this example, there is one error stack, identified by the name of the service the error is rooted in: ``payment``. 

Step 2. View inbound and outbound dependencies
==============================================
	
Click the ``payment`` error stack to see the full error path. The errors originate in the ``payment`` service and affect the ``api`` service.

Filter on the whole path. To do so, double-click the ``checkout`` service and then on the ``payment`` service. The circle inside the ``payment`` service is solid, which indicates that the error originates with that service. This is also known as a root-cause error. 

Step 3. Use span tags to pinpoint an issue
===========================================

Use span tags to determine whether there are any trends in the errors that originate from the ``payment`` service. :strong:`Top tags in error spans` surfaces the indexed tags that have the highest error count in the selected service (``payment``). The problem is with a particular Kubernetes node named ``node6``. Every request associated with ``node6`` results in an error. 
   
Let's explore further. From the :strong:`Breakdown` drop-down menu in the service map, select :strong:`kubernetes_node` to validate that the issue is only with ``node6``.

Next, you want to find out if there are issues with ``node6`` you can investigate further. Select :strong:`tenant` from the :strong:`Breakdown` drop-down menu to see whether different tenants in the same node experience the same issue. In this case, ``gold``, ``platinum``, and ``silver`` are all having the same issue. This can indicate the issue is at the infrastructure level. 

Step 4. Drill down into an example trace
========================================

Now, let's look at an example trace. Click on a point that corresponds with high errors in the :strong:`Request Rate` chart to display a list of example traces to choose from. Click a trace ID to see the trace. 

Click on ``/payment/execute``, the most downstream span with errors, to display the metadata on that span. You can see all the tags, including the ``kubernetes_node`` tag, that the problematic endpoint is running on. It's starting to seem like the issue is with the node itself.

Step 5. Investigate the infrastructure
======================================

Let's explore what's going on with ``node6`` by navigating to the :ref:`Kubernetes Navigator <infrastructure-k8s>`. In the node details, you can see the containers running in ``node6``. Notice that a container named ``robot`` is taking approximately 90% of memory in this node, which puts memory pressure on the ``payment`` pod. Click ``robot`` to open the sidebar and drill down to details without losing context. In this case, the container has no memory limit, which is probably why it is using all of the memory on this node.
   
It looks like a “noisy neighbor” is putting memory pressure on the pod the ``payment`` service is running in, causing errors that then propagate all the way upstream to the ``api`` service. To address the incident, you probably want to enforce a memory limit on the ``robot`` container.