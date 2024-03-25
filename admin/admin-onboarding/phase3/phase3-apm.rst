.. _phase3-apm:



Expansion and optimization part 2: Splunk Application Performance Monitoring
*************************************************************************************

To expand and optimize Splunk Infrastructure Monitoring, you must do the following:

1. :ref:`optimize-data`

2. :ref:`bottlenecks`

3. :ref:`data-links-apm`

4. :ref:`onboard-apps`


.. _optimize-data:

Optimize data usage; Analyze cardinality contribution of indexed span tags and processes
================================================================================================================
Indexed tags are used to produce Troubleshooting MetricSets (TMS) and give visual insights through breakdowns for nodes and edges. Utilize Tag Spotlight. Filter SLIs to specific tag values. Filter the service map. Indexed tags can include endpoint or operation. Indexed tags automatically generate SLIs and breakdowns. It is important to understand the cardinality contribution when indexing a span tag, so understanding how to manage these TMS cardinality is essential.

To learn more, see the following:

- :ref:`apm-metricsets`

- :ref:`apm-span-tags`

- :ref:`Troubleshooting MetricSets`

- :ref:`apm-index-tag-tips`



.. _bottlenecks:

Identify and address bottlenecks in code and architecture using AlwaysOn Profiling
================================================================================================================
Utilizing AlwaysOn Profiling in development environments helps identify bottlenecks within the code before enabling AlwaysOn Profiling in production environments. If you have an application or service using Java, Node.js or .NET, enable CPU profiling to get intra-service visibility to identify code issues that lead to a slow service. This also helps identify inefficiencies to reduce infrastructure footprint and spend.

To learn more, see the following:

- :ref:`profiling-intro`

- :ref:`profiling-scenario-landingpage`

- :ref:`profiling-troubleshooting`


.. _data-links-apm:

Utilize Data Links to connect APM properties to relevant resources
================================================================================================================
After fully deploying Splunk APM, make sure you understand how to create global data links to link Splunk APM to outside resources such as Splunk IM dashboards, Splunk Cloud Platform logs, Kibana logs, or custom URLs. 

To learn more, see the following:

- :ref:`link-metadata-to-content`

- :ref:`apm-create-data-links`

- :ref:`apm-use-data-links`


.. _onboard-apps:

Onboard all production applications
================================================================================================================
During the expansion and optimization phase, you can automate most processes and add new services into Splunk Observability Cloud. You can continue expanding the OTel agent configuration library for all production applications, which populates all the necessary metrics to build the desired charts, dashboards, and detectors. Continue to onboard all production applications.

Next step
===============

:ref:`phase3-excellence`