.. _java-otel-performance:

***************************************************
Performance reference for Splunk OTel Java agent
***************************************************

.. meta::
   :description:

<General statement>

Minimum requirements for production deployments the Java agent
===============================================================

Minimum hardware and software requirements for a production grade deployment of the Java agent.

Hardware specifications to scale deployments of the Java agent
===============================================================

Hardware specifications to scale the deployment of the various components of the Java agent. This can be a graduated list for the different scaling levels such as small, mid-range and large deployments.

Guidelines to optimize performance of the Java agent
===========================================================

<General guidelines as an include>

Suggestions for storage, hardware, data ingestion, and configuration to optimize performance. For example, settings that can be tweaked or disable according to the situation, features that can be disabled, etc.

Constraints impacting the performance of the Java agent
===========================================================

<General constraints as an include>

Information on the potential challenges that might decrease the performance of the Java agent, such as span volume, application features, etc.

Performance considerations to deploy the Java agent in virtualized environments
======================================================================================

<General considerations as an include>

Information on the performance considerations when deploying the Java agent in a virtualized environment. 

Troubleshooting performance issues when deploying the Java agent
==================================================================

If you run into unusual performance overhead issues when instrumenting services using the Splunk OpenTelemetry Java agent, collect the following information:

- Description of the performance impact or degradation (for example, increase in network latency), and which load your environment is experiencing.
- Description of your environment, including hardware specifications, version of the agent, runtime environment, and so on.

After you've collected the information, you can do the following:

- Ask questions and get answers through community support at Splunk Answers.
- If you have a support contract, file a case using the Splunk Support Portal. See Support and Services.
- To get professional help with optimizing your Splunk software investment, see Splunk Services.
