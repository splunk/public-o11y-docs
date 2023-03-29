.. _troubleshoot-k8s-nav-use-case:

***********************************************************************
Use case: Troubleshoot server failure using the Kubernetes navigator
***********************************************************************

.. meta::
    :description: Learn how to troubleshoot using the Kubernetes navigator


The following use case features an example from Buttercup Games, a fictitious e-commerce company.

Kai, a site reliability engineer (SRE) at Buttercup Games, is responsible for monitoring web servers in their Kubernetes environment. For the past hour, Kai has noticed that the Apache web servers have stopped showing data in Splunk Observability Cloud. Since all other web servers are still sending in data, Kai suspects that the issue is specific to Apache.

To further investigate, Kai examines the service dependencies 