.. _send-server-cluster-data:

******************************************************************************
Part 2: Install the OpenTelemetry Collector to send server and cluster data
******************************************************************************

.. meta:: 
    :description: Use the OpenTelemetry Collector to collect and send data from your infrastructure, including hosts, servers, and clusters.

Install the :ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>` on any hosts or clusters you're using as a part of your infrastructure, such as servers running in your data center or on a virtual machine running in the cloud to: 

- Send metrics to Infrastructure Monitoring
- Send logs to Log Observer
- Set up your environment to receive logs and traces from applications instrumented in step :ref:`gdi-4`

After you've installed the Collector and configured your servers and clusters, you can access your data in the following locations:

- View metrics in Infrastructure Monitoring navigators

   .. image:: /_images/infrastructure/hosts-navigator.png
      :width: 100%
      :alt: This screenshot shows the Hosts navigator in Splunk Infrastructure Monitoring displaying charts and visualizations of data collected from hosts.

   For more information, see:

      - :ref:`monitor-hosts`
      - :Ref:`use-the-k8s-navigator`

- View metrics in :ref:`built-in dashboards <built-in-dashboards>` for hosts and Kubernetes

- Search for metrics :ref:`using Metric Finder <metric-finder>`

- Query logs in :ref:`Log Observer <logs-timeline>`, if you chose to ingest logs

Steps
-------------------------------------------------------------------

- To configure Windows servers, install the Splunk Distribution of OpenTelemetry Collector using the method that best suits your environment:

   - :ref:`Use a wizard to install on Windows <get-started-windows>`
   - :ref:`Manually install on Windows <otel-install-windows-manual>`

- To configure Linux servers, install the Splunk Distribution of OpenTelemetry Collector using the method that best suits your environment:

   - :ref:`Use a wizard to install on Linux <get-started-linux>`
   - :ref:`Manually install on Linux <otel-install-linux-manual>`

- To configure Kubernetes clusters, install the Splunk Distribution of OpenTelemetry Collector using the method that best suits your environment:

   - :ref:`Use a wizard to install in a Kubernetes cluster <get-started-k8s>`
   - :ref:`Manually install in a Kubernetes cluster <otel-install-k8s>`

One of the benefits of using the Splunk Distribution of OpenTelemetry Collector to send your data to Splunk Observability Cloud is that Related Content, a feature that activates users to seamlessly move between key views in Splunk Observability Cloud, is easier to implement. For more information, see :ref:`get-started-relatedcontent`.