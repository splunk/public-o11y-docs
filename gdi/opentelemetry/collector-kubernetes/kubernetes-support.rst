.. _kubernetes-support:

***************************************************************
Collector for Kubernetes: Gather support information 
***************************************************************

.. meta::
    :description: Gather support information for the Collector for Kubernetes.

If you're an existing Splunk Observability Cloud customer and have issues with the Collector, you can contact Support. See how at :ref:`support`. Splunk Enterprise and Splunk Cloud customers with Splunk support entitlement can reach out to Splunk Support at :new-page:`Splunk Contact Us <https://www.splunk.com/en_us/about-splunk/contact-us.html#tabs/tab_parsys_tabs_CustomerSupport_4>`.

Gather information for Support
=============================================================================================

When opening a support request, try to include as much information about the issue as possible, including:

* What did you try to do?
* What happened?
* What did you expect to happen?
* Have you found any workaround?
* How impactful is the issue?
* How can we reproduce the issue?

In addition, include the following information:

* Which destination is configured: Splunk Platform or Splunk Observability?
* Helm chart version.
* Custom values.yaml file you applied with either the ``helm install`` command or ``--set`` arguments.
* Are there any manual customization done to the Kubernetes resources once the chart is installed?

* Kubernetes cluster details:

  * Kubernetes version.
  * Managed or on premises: if managed, which cloud provider and distribution?

* Logs from problematic pods:

  * ``kubectl logs my-splunk-otel-collector-agent-fzn4q otel-collector > my-splunk-otel-collector-agent.log``
  * ``kubectl logs my-splunk-otel-collector-agent-fzn4q fluentd > my-splunk-otel-collector-agent-fluentd.log``
  * ``kubectl logs my-splunk-otel-collector-k8s-cluster-receiver-7545499bc7-vqdsl > my-splunk-otel-collector-k8s-cluster-receiver.log``

.. note:: You can use the ``kubectl-splunk`` support bundle script to gather this information. Find it at the :new-page:`Splunk kubectl GitHub repository <https://github.com/signalfx/kubectl-splunk/blob/main/docs/kubectl-splunk_support.md>`.



