.. _phase3-apm:



Expansion and optimization: Application Performance Monitoring
*******************************************************************************

To expand and optimize Splunk Infrastructure Monitoring, you must do the following:

1. :ref:`Optimize data usage. Analyze cardinality contribution of indexed span tags and processes <optimize-data>'

2. :ref:`Identify and address bottlenecks in code and architecture using AlwaysOn Profiling <bottlenecks>'

3. :ref:`Utilize Data Links to connect APM properties to relevant resources <data-links-apm>'

4. :ref:`Onboard all production applications <onboard-apps>'


.. _optimize-data:

Optimize data usage. Analyze cardinality contribution of indexed span tags and processes
================================================================================================================
Indexed tags are used to produce Troubleshooting MetricSets (TMS) and will give visual insights through breakdowns for nodes and edges, you can utilize Tag Spotlight, SLIs filtered to specific tag values and also filter the service map, while retaining a rich troubleshooting experience. Indexed tags are not limited to key values added to spans as metadata, it can include endpoint or operation, once indexed, SLIs and breakdowns are automatically generated from these keys. 
It is important to understand the cardinality contribution when indexing a span tag, so understanding how to manage  these TMS cardinality is essential.

.. _bottlenecks:

Identify and address bottlenecks in code and architecture using AlwaysOn Profiling
================================================================================================================
Utilizing AlwaysOn Profiling in dev environments is recommended as this will help troubleshoot and identify bottlenecks within the code before enabling AlwaysOn Profiling in production environments. If you have an application or service using Java, Node.js or .NET, enable CPU profiling to get intra-service visibility to identify code issues that lead to service being slow, this also helps identify inefficiencies to reduce infrastructure footprint/spend.

.. _data-links-apm:

Utilize Data Links to connect APM properties to relevant resources
================================================================================================================
Once Splunk APM is fully deployed, it is recommended to understand how to create global data links to link Splunk APM to outside resources such as Splunk IM dashboards, Splunk Cloud logs, Kibana logs, or custom URLs, etc. Note on property parameters required to set this up such as service, trace Id, span Id and span tag. 

.. _onboard-apps:

Onboard all production applications
================================================================================================================
During this phase, most processes can be automated and new services can be added into the Splunk Observability Cloud system. You can continue expanding the OTel agent configuration library for all production applications. These should populate all the necessary metrics to build the desired charts/dashboards and detectors. Continue onboard all production applications.