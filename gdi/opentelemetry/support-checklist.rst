.. _otel-support-checklist:
.. _otel-open-support-request:

*************************************************************************
Gather information to open a support request
*************************************************************************

.. meta::
    :description: Gather support information before opening a support request in Splunk Observability Cloud. Use this checklist to gather relevant information.

If you are an existing customer and are unable to determine why something is not working, you can file a new case using the Splunk Support Portal at :new-page:`Support and Services <https://www.splunk.com/en_us/customer-success.html>`. Otherwise, contact :new-page:`Splunk Customer Support <https://www.splunk.com/en_us/about-splunk/contact-us.html#tabs/tab_parsys_tabs_CustomerSupport_4>`. See more at :ref:`support`.

When opening a support request, it is important to include as much information about the issue as possible. Use this checklist to gather relevant information.

Basic information
=============================

* What did you try to do?
* What happened?
* What did you expect to happen?
* Have you found a workaround?
* How impactful is the issue?
* Can you reproduce the issue?

End-to-end architecture information
=========================================

* What is generating the data?
* Where was the data configured to go to?
* What format was the data sent in?
* How is the next hop configured?
* Where is the data configured to go from here?
* What format was the data sent in?
* Is there any DNS, firewall, networking, or proxy information to be aware of?

Configuration files
============================

* Kubernetes: Run ``kubectl get configmap my-configmap -o yaml >my-configmap.yaml`` to retrieve the logs.
* Linux: View the file at ``/etc/otel/collector``.

Logs and debug logs
============================

* Docker: Run ``docker logs my-container >my-container.log`` to retrieve the logs.
* Journald: Run ``journalctl -u my-service >my-service.log`` to retrieve the logs.
* Kubernetes: Run the following commands to retrieve the logs.
    
    .. code-block:: bash

        kubectl describe pod my-pod
        kubectl logs my-pod otel-collector >my-pod-otel.log
        kubectl logs my-pod fluentd >my-pod-fluentd.log


Support bundle scripts
==========================

Run support bundle scripts to collect information:

* Kubernetes: Run ``kubectl-splunk``
* Linux (if installer script was used): Run ``/etc/otel/collector/splunk-support-bundle.sh``
* Windows (if MSI installer version 0.34.0 or higher was used): Run ``C:\Program Files\Splunk\OpenTelemetry Collector\splunk-support-bundle.ps1``