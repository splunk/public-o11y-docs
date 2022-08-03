.. _infrastructure-hosts:

*************
Monitor hosts
*************

.. meta::
   :description: Learn how to monitor hosts with Splunk Observability Cloud.

Monitor host metrics with Splunk Observability Cloud. Any user can monitor hosts in Observability Cloud. 

Before you can start monitoring hosts, you have to export metrics from hosts. These resources explain how to export metrics from supported host types:

- :ref:`get-started-linux`
- :ref:`get-started-windows`

You have to be an administrator to export host metrics.

Observability Cloud uses the :new-page:`Splunk OpenTelemetry Collector <https://github.com/signalfx/splunk-otel-collector>` to provide robust infrastructure monitoring capabilities. If you're also exporting logs from hosts and want to learn about how to view logs in Observability Cloud, see :ref:`get-started-logs`. 

You can also export and monitor data related to hosts:

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

Monitor hosts from the Infrastructure Overview
==============================================

View the health of your entire data center at a glance from the Infrastructure Overview. This view provides key performance information about each host at a glance. 

Follow these steps to analyze problem hosts from the Infrastructure Overview:

1. Select :strong:`Navigation menu > Infrastructure` and select the :strong:`Hosts` category.
2. Compare hosts along the following metrics with the :strong:`Color by` dropdown menu. In the heat map, colors represent the health of instances based on the metrics you select. For example, a heat map that shows green and red, uses green to denote healthy and red to denote unhealthy instances. If your heat map has multiple colors, then the lighter gradient represents less activity, and the darker gradient represents more activity. To apply visually accessible color palettes on custom dashboards and charts and throughout Infrastructure Monitoring, go to :strong:`Account Settings > Color Accessibility.`

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

      * - ``Most severe alert``
        - Hosts with no alerts are green, and hosts with the highest alert level are red.
3. Group hosts based on metadata about each host with the :strong:`Group by` dropdown menu. 
   
   For example, you can see hosts in groups according to the region they are running in, the operating system version, or the environment tag. This is useful because you can see correlations between different parts of your infrastructure and its performance.
4. Find outliers for your metrics with the :strong:`Find Outliers` setting. Specify the :strong:`Scope` and :strong:`Strategy`.
    
   Set the :strong:`Scope` to the entire population of hosts or to the dimension you grouped hosts by.

   There are two :strong:`Strategies` you can select to find outliers:

   .. list-table::
      :header-rows: 1
      :widths: 30, 70

      * - :strong:`Strategy`
        - :strong:`Description`

      * - ``Deviation from Mean``
        - Hosts appear as red that exceed the mean value of the metric by at least three standard deviations. This setting is helpful for finding extreme outliers.

      * - ``Deviation from Median``
        - Hosts appear as red that exceed the median absolute deviation value by at least three absolute deviations. This setting does not weigh extreme outliers as heavily as the standard deviation.
5. Select a specific host you want to investigate further to view all the metadata and key metrics for the host. For every host, Observability Cloud provides a default dashboard. 
   
   Analyze all the available metadata about the cloud service the host is running in, the host itself, and any custom tags associated with the host. The default dashboard provides metric time series for these metrics with a 10-second resolution:

   - CPU utilization
   - Memory utilization
   - Disk space utilization
   - Disk operations
   - Network I/O
