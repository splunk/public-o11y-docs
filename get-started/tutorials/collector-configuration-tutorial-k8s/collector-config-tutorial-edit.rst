.. _collector-config-tutorial-edit-k8s:

***********************************************************************
Part 2: Edit the configuration to filter and send logs to Splunk
***********************************************************************

Now that you've installed the Splunk Distribution of OpenTelemetry Collector in your local Kubernetes cluster, you can edit the default configuration to modify or extend the capabilities of the Collector, for example by adding different :ref:`otel-components` or by editing existing settings.

In the following steps, you're going to edit the configuration of the Collector using YAML files and Helm. At the end of this part of the tutorial, you'll be able to:

1. Activate logs collection using :ref:`filelog-receiver` and the OpenTelemetry protocol (OTLP).
2. Filter logs using :ref:`filter-processor`.
3. Export the filtered logs to Splunk Cloud Platform.


Examine the default values.yaml file
=======================================

By default, the Helm chart for the Splunk Distribution of OpenTelemetry Collector deploys the Collector with predefined settings. All possible settings are documented in the values.yaml file. To modify the configuration, you either override existing settings or add new settings using YAML files or command-line arguments.

:new-page:`Download the default values.yaml <https://github.com/signalfx/splunk-otel-collector-chart/blob/main/helm-charts/splunk-otel-collector/values.yaml>` file and open it using your favorite code or text editor. Take a moment to scroll through the values.yaml file and examine its structure.

.. note:: As you'll create and edit Helm configurations during this tutorial, create a directory you can use to store the files and find them later on.


Configure the Splunk HEC endpoint and token
============================================

The Splunk OpenTelemetry Collector for Kubernetes collects logs by default. To send the logs to Splunk Cloud Platform, you need to add the Splunk HEC endpoint and token to the configuration. See :ref:`hec-endpoints`.

1. Create a new YAML file, for example, hec.yaml.

2. Open the hec.yaml file in a code or text editor.

3. Paste the following snippet:

   .. code-block:: yaml

      splunkPlatform:
        endpoint: "<your_hec_endpoint>"
        token: "<your_hec_token>"

4. Optionally, set a different ``index`` if you're using a different index for this tutorial:

   .. code-block:: yaml

      splunkPlatform:
        endpoint: "<your_hec_endpoint>"
        token: "<your_hec_token>"
        index: "<your_index>"

5. Save the file.


Create a filter processor configuration
==========================================

Create a new file called filter.yaml next to the hec.yaml file you've created in the previous step.

Open the file in your code or text editor and add the following snippet:

.. code-block:: yaml

   agent:
     config:
       processors:
         filter/exclude_logs_from_pod:
           logs:
             exclude:
               match_type: regexp
               resource_attributes:
                 - key: k8s.pod.name
                   value: '^(podNameX)$'
         filter/exclude_logs_from_node:
           logs:
             exclude:
               match_type: regexp
               resource_attributes:
                 - key: k8s.node.name
                   value: '^(nodeNameX)$'
       service:
         pipelines:
           logs:
             processors:
               - memory_limiter
               - k8sattributes
               - filter/logs
               - batch
               - resourcedetection
               - resource
               - resource/logs
               - filter/exclude_logs_from_pod
               - filter/exclude_logs_from_node

The previous snippet instructs Helm to add filter processor settings to the agent configuration and add them to the logs pipeline together with the default processors. The filters exclude logs from matching pods and nodes.

Save the filter.yaml configuration file and continue to the next step.


Apply the new configuration
=====================================

To apply the configuration to the Collector running on your Kubernetes cluster, run the following command from the directory that contains the YAML files:

.. code-block:: bash

   helm upgrade --reuse-values -f ./filter.yaml -f ./values.yaml splunk-otel-collector-1709226095 splunk-otel-collector-chart/splunk-otel-collector --set="splunkPlatform.insecureSkipVerify=true"

Use the Tab key to autocomplete the file names, the release, and the chart you installed in part 1. Notice the following about the command:

- ``--reuse-values`` ensures that the Collector only updates the settings you provide.
- ``splunkPlatform.insecureSkipVerify=true`` turns off SSL, as Splunk Cloud Platform free trials don't support it.
- ``--set`` is a way of defining settings through the command line. You can use this method as an alternative to passing YAML files.

.. caution:: Don't set ``insecureSkipVerify`` to ``true`` in production environments, as it might compromise the security of your data. In this tutorial, you need to turn off SSL because trial stacks don't support it.

After upgrading the configuration, Helm shows messages similar to the following:

.. code-block:: text

   Release "splunk-otel-collector-1709226095" has been upgraded. Happy Helming!
   NAME: splunk-otel-collector-1709226095
   LAST DEPLOYED: Thu Mar  7 19:23:30 2024
   NAMESPACE: default
   STATUS: deployed
   REVISION: 3
   TEST SUITE: None
   NOTES:
   Splunk OpenTelemetry Collector is installed and configured to send data to Splunk Platform endpoint "https://<your-splunk-cloud-trial-stack>.splunkcloud.com:8088/services/collector".

   Splunk OpenTelemetry Collector is installed and configured to send data to Splunk Observability realm us0.

If you need to restart your local cluster, run ``minikube stop`` followed by ``minikube start``.

Check that logs are getting to Splunk Cloud
==================================================

Open your Splunk Cloud Platform trial and go to :guilabel:`Search & Reporting`. Enter ``index="main"`` and press Enter to see the logs coming from your local Kubernetes cluster.

.. image:: /_images/get-started/logs-cloud.png
      :width: 90%
      :alt: Kubernetes logs sent to Splunk Cloud


Learn more
====================================

This completes the tutorial.

To learn more about the Collector installation and components, see the following resources:

- :ref:`otel-install-k8s`
- :ref:`otel-kubernetes-config`
- :ref:`splunk-hec-exporter`

