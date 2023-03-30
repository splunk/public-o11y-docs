.. _troubleshoot-k8s-nav-use-case:

***********************************************************************
Use case: Troubleshoot server failure using the Kubernetes navigator
***********************************************************************

.. meta::
    :description: Learn how to troubleshoot using the Kubernetes navigator


The following use case features an example from Buttercup Games, a fictitious e-commerce company.

Kai, a site reliability engineer (SRE) at Buttercup Games, is responsible for monitoring web servers in their Kubernetes environment. For the past hour, Kai has noticed that the Apache web servers have stopped showing data in Splunk Observability Cloud. Since all other web servers are still sending in data, Kai suspects that the issue is specific to Apache.

To further investigate, Kai examines the service dependencies for Apache. When Kai navigates to the Kubernetes nodes navigator from the Apache navigator, they immediately notice that some pods are not running.

Using the hierarchical map, Kai drills down into the appropriate cluster and identify the node with the failing pod. They see that the pod has been stuck in ``Pending`` state for <X amount of time>.


With the help of their Splunk Observability account team, Kai is able identify that the ``Pending`` pod has its memory limits configured incorrectly, and therefore can't start.


Now that Kai knows the root cause of the server failure, they update the configuration and restart the pod. Kai verifies that the pod is running, and that their Apache dashboards are showing incoming data again.







