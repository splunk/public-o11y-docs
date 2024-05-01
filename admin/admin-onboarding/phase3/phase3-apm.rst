.. _phase3-apm:

Expansion and optimization part 2: Splunk Application Performance Monitoring
*************************************************************************************

To expand and optimize Splunk Infrastructure Monitoring, complete the following tasks:

1. :ref:`optimize-data`

2. :ref:`bottlenecks`

3. :ref:`data-links-apm`

4. :ref:`onboard-apps`

.. note::
    Work closely with your Splunk Sales Engineer or Splunk Customer Success Manager throughout your onboarding process. They can help you fine tune your Splunk Observability Cloud journey and provide best practices, training, and workshop advice.

.. _optimize-data:

Optimize data usage
================================================================================================================
Indexed tags are used to produce Troubleshooting MetricSets (TMS) and give visual insights through breakdowns for nodes and edges. Use Tag Spotlight to filter Service Level Indicators (SLIs) to specific tag values. Filter the service map. Indexed tags can include endpoints and operations. Indexed tags automatically generate SLIs and breakdowns. It is important to understand the cardinality contribution when indexing a span tag.

To learn more, see the following topics:

- :ref:`apm-metricsets`

- :ref:`apm-span-tags`

- :ref:`apm-index-tag-tips`



.. _bottlenecks:

Identify and address bottlenecks in code and architecture using AlwaysOn Profiling
================================================================================================================
Using AlwaysOn Profiling in development environments helps identify bottlenecks in the code before turning on AlwaysOn Profiling in production environments. If you have an application or service using Java, Node.js, or .NET, turn on CPU profiling to get intra-service visibility to identify code issues that lead to a slow service. This also helps identify inefficiencies to reduce infrastructure footprint and spending.

To learn more, see the following topics:

- :ref:`profiling-intro`

- :ref:`profiling-scenario-landingpage`


.. _data-links-apm:

Use Data Links to connect APM properties to relevant resources
================================================================================================================
After fully deploying Splunk APM, make sure you understand how to create global data links to link Splunk APM to outside resources such as Splunk Infrastructure Monitoring dashboards, Splunk Cloud Platform logs, Kibana logs, or custom URLs. 

To learn more, see the following topics:

- :ref:`link-metadata-to-content`

- :ref:`apm-create-data-links`

- :ref:`apm-use-data-links`


.. _onboard-apps:

Onboard all production applications
================================================================================================================
During the expansion and optimization phase, you can automate most processes and add new services into Splunk Observability Cloud. You can continue expanding the OpenTelemetry agent configuration library for all production applications, which populates all the necessary metrics to build the desired charts, dashboards, and detectors. Continue to onboard all production applications.

Congratulations on completing all 3 phases of onboarding Splunk Observability Cloud. Use this experience and any notes you might have to build a center of excellence that will grow as you expand your coverage and usage of Splunk Observability Cloud.