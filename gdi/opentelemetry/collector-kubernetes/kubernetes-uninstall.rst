.. _otel-kubernetes-uninstall:

********************************************
Uninstall the Collector for Kubernetes
********************************************

.. meta::
      :description: Describes how to uninstall the Splunk Distribution of OpenTelemetry Collector for Kubernetes.

To uninstall the Collector for Kubernetes, run the ``helm uninstall`` command. 

Running this command:

* Removes all Kubernetes components associated with the chart.
* Deletes the release.
* Removes the release history.

For example, to uninstall ``my-splunk-otel-collector``, run:

.. code-block:: bash

   helm uninstall my-splunk-otel-collector


