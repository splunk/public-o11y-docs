.. _infrastructure-hosts:

**************************
Monitor hosts
**************************

.. meta::
   :description: Learn how to monitor hosts with Splunk Observability Cloud.

You can monitor host metrics with Splunk Observability Cloud. Before you can start monitoring hosts, you must sign in with your administrator credentials, and export metrics from the hosts. The following resources explain how to export metrics from supported host types:

- :ref:`get-started-linux`
- :ref:`get-started-windows`

Splunk Observability Cloud provides infrastructure monitoring capabilities powered by the :ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>`. If you're also exporting logs from hosts and want to learn about how to view logs in Splunk Observability Cloud, see :ref:`get-started-logs`.

You can also export and monitor data related to hosts, as described in the following table.

.. list-table::
  :header-rows: 1
  :widths: 30, 30, 40

  * - :strong:`Get data in`
    - :strong:`Monitor`
    - :strong:`Description`

  * - - :ref:`get-started-aws`
      - :ref:`get-started-gcp`
      - :ref:`get-started-azure`
    - - :ref:`infrastructure-aws`
      - :ref:`infrastructure-gcp`
      - :ref:`infrastructure-azure`
    - Connect to the cloud service provider your hosts run in, if any.

  * - :ref:`get-started-application`
    - :ref:`get-started-apm`
    - Collect metrics and spans from applications running on hosts. 
  
Splunk Observability Cloud also provides metrics and other data :ref:`for the following host and application monitors <monitor-data-sources>`.

.. _monitor-hosts:

Monitor hosts from the Infrastructure page
==============================================

View the health of your entire data center at a glance from the Infrastructure page. This page provides key performance information about each host at a glance.

.. note::

  - Host instances in My Data Center include only hosts where the Splunk Distribution of OpenTelemetry Collector is installed. To see the performance of all hosts (public cloud or otherwise) where SmartAgent is installed, select :guilabel:`Navigation menu > Dashboard > Built-in` and select the :guilabel:`Hosts with agent installed` index.
  - Host instances in My Data Center also don't include Amazon EC2, GCP Compute Engine, Azure Virtual Machines, and Kubernetes instances. To view Amazon EC2, GCP Compute Engine, Azure Virtual Machines, and Kubernetes instances, see :ref:`use-navigators-imm` and go to the respective navigator for each service.

Follow these steps to analyze problem hosts from the Infrastructure page:

1. Select :strong:`Navigation menu > Infrastructure` and select the :strong:`Hosts` category.
2. Compare hosts along the following metrics with the :strong:`Color by` drop-down list. In the heat map, colors represent the health of instances based on the metrics you select. For example, a heat map that shows green and red, uses green to denote healthy and red to denote unhealthy instances. If your heat map has multiple colors, then the lighter gradient represents less activity, and the darker gradient represents more activity. To apply visually accessible color palettes on custom dashboards and charts and throughout Infrastructure Monitoring, select :strong:`Account Settings > Color Accessibility.`

   .. list-table::
      :header-rows: 1
      :widths: 30, 70

      * - :strong:`Metric`
        - :strong:`Description`

      * - ``cpu.utilization``
        - Hosts with CPU utilization under 20% are green. Hosts with CPU utilization over 80% are red.

      * - ``memory.utilization``
        - Hosts with memory utilization under 20% are green. Hosts with memory utilization over 80% are red.

      * - ``disk.summary_utilization``
        - Hosts with disk space utilization under 20% are green. Hosts with disk space utilization over 80% are red.

      * - ``network.total``
        - Relative comparison where hosts with the lowest 20% of network traffic are green and hosts with the highest 20% of network traffic are red.

      * - ``disk_ops.total``
        - Relative comparison where hosts with the lowest 20% of disk operations are green and hosts with the highest 20% of disk operations are red.

3. Group hosts based on metadata about each host with the :strong:`Group by` drop-down list.

   For example, you can see hosts in groups according to the region they are running in, the operating system version, or the environment tag. Use this to see correlations between different parts of your infrastructure and its performance.
4. Find outliers for your metrics with the :strong:`Find Outliers` setting. Specify the :strong:`Scope` and :strong:`Strategy`.

   Set the :strong:`Scope` to analyze outliers from across the entire visible population of instances, or only within groups defined by the dimension or property you grouped instances by.

   You can select one of two :strong:`Strategies` to find outliers, as described in the following table.

   .. list-table::
      :header-rows: 1
      :widths: 30, 70

      * - :strong:`Strategy`
        - :strong:`Description`

      * - ``Deviation from Mean``
        - Hosts appear as red that exceed the mean value of the metric by at least three standard deviations. Use this setting to find the most extreme outliers.

      * - ``Deviation from Median``
        - Hosts appear as red that exceed the median absolute deviation value by at least three absolute deviations. This setting does not weigh extreme outliers as heavily as the standard deviation.
5. Select a specific host you want to investigate further to view all the metadata and key metrics for the host. For every host instance, Observability Cloud provides built-in content for you to drill down into your host instance.

For interactive walkthroughs of how to drill down into and investigate or troubleshoot a host instance, see :new-page:`Splunk Infrastructure Monitoring web server troubleshooting scenario <https://splunko11y.com/imt/webserver-troubleshooting.html>` and :new-page:`Splunk Infrastructure Monitoring application monitoring scenario <https://splunko11y.com/imt/application-monitoring.html>`.

See the following sections for available built-in content that you can work with.

View metadata with dashboards
------------------------------

To analyze all available metadata about the cloud service a host instance is running in, the host itself, and any custom tags associated with the host, you can use the dashboards provided by Infrastructure Monitoring. The default dashboard provides various charts representing metric time series (MTS) for the following metrics:

- CPU utilization
- Memory utilization
- Disk space utilization
- Disk operations
- Network I/O

To learn more, see :ref:`built-in-dashboards`.

Investigate processes with process list
-------------------------------------------

When you are in the drill-down view of a host instance, you can access the current status and full list of processes on your host to look for potential outlier processes based on CPU utilization, memory utilization, and so on.

.. note:: To view the full list of processes, include the :ref:`processlist <processlist>` monitor type in your OpenTelemetry configuration.  

* By default, the list of processes are sorted by descending CPU utilization. 
* If you want to sort the list by a different property or toggle the sorting order, click the column header representing the property you want to sort by. The columns in the process list are the same properties you might see by running the ``top`` command on your \*nix system.
* Some commands in the COMMAND column are truncated, but you can still see the full command by hovering over the truncated texts. You can also copy the full text by clicking the :guilabel:`Copy to Clipboard` icon.





