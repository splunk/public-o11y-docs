.. include:: /_includes/gdi/zero-config-preview-header.rst

.. meta::
   :description: How to enable zero configuration automatic instrumentation for Kubernetes Java applications and thus collect and send traces to Splunk Application Performance Monitoring (APM) without altering your code.

.. _auto-instrumentation-java-k8s:

==================================================================================================================
Zero Configuration Auto Instrumentation for Java Applications on Kubernetes
==================================================================================================================

Zero Configuration Auto Instrumentation for Java enables automatic instrumentation for Kubernetes Java applications. [TODO LINK to main]
After enabling automatic instrumentation, you do not have to recompile your applications, but you have to restart them.

.. _zero-config-k8s-prereqs:

Prerequisites
====================================

.. include:: /_includes/gdi/zero-conf-reqs.rst

- Kubernetes versions 1.23 - 1.25

- Install :ref:`the Splunk OTel Collector Kubernetes Operator<k8s-operator>`.


.. _enable-zero-conf-java-k8s:

Enable/disable automatic instrumentation of Kubernetes
=============================================================

After you install the Collector operator, you can enable or disable automatic instrumentation for a specific Kubernetes pod or deployment with the ``otel.splunk.com/inject-java`` annotation. If you add the annotation to a pod, the annotation is lost if the pod restarts. 

When you enable instrumentation, the operator injects the Splunk OTel Java agent into Java applications to capture telemetry data.


To enable automatic instrumentation, add this annotation to the ``spec`` for a deployment or pod: ``otel.splunk.com/inject-java: "true"``.

To disable automatic instrumentation, set the annotation to ``otel.splunk.com/inject-java: "false"``.

.. _enable-zero-conf-java-yaml:

Enable/disable automatic instrumentation before deployment
-------------------------------------------------------------

If the pod or deployment is not already running, set the ``otel.splunk.com/inject-java`` annotation in its YAML file.

For example, given the following depoyment YAML:

.. code-block:: yaml

    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: my-java-app
    spec:
      template:
        spec:
          containers:
          - name: my-java-app
            image: my-java-app:latest


Add auto instrumentation to the deployment by adding ``otel.splunk.com/inject-java: "true"`` to the ``spec``:


.. code-block:: yaml

    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: my-java-app
    spec:
      template:
        metadata:
          annotations:
            otel.splunk.com/inject-java: "true"
        spec:
          containers:
          - name: my-java-app
            image: my-java-app:latest
    

When the Java applications in the deployment start, the Collector operator enables auto instrumentation.

.. _enable-zero-conf-java-patch:

Enable/disable automatic instrumentation on a running deployment
-----------------------------------------------------------------

If the application is already running, patch the deployment using ``kubectl patch`` to enable instrumentation. 

.. caution:: 

    Patching a pod or deployment restarts the pods.


Use the following snippet as an example. Replace ``<my-deployment>`` with your deployment's name.

.. code-block:: bash
    
    kubectl patch deployment <my-deployment> -p '{"spec": {"template":{"metadata":{"annotations":{"otel.splunk.com/inject-java":"true"}}}} }'

To disable automatic instrumentation, run the same command but change the value of the annotation to ``false``.


.. _k8s-zero-conf-java-verify:

Verify automatic instrumentation is enabled
-------------------------------------------------

If patching was successful, you will er launching or patching the deployment, check the deployment 

.. _k8s-zero-conf-java-conf:

Optionally configure the operator
-----------------------------------------


.. _k8s-zero-conf-troubleshooting:

Troubleshooting
=======================
