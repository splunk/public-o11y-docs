.. _phase2-im:

Pilot rollout phase part 2: Initial pilot rollout for Splunk Infrastructure Monitoring
***************************************************************************************

After completing :ref:`phase2-rollout-plan`, you are ready for pilot rollout phase part 2. During this part of the pilot, focus on onboarding your pilot teams to Splunk Infrastructure Monitoring. This part of the implementation prepares you to monitor critical solutions and brings business value based on custom metrics. 

To onboard Infrastructure Monitoring, complete the following tasks:


.. note::
    Work closely with your Splunk Sales Engineer or Splunk Customer Success Manager throughout your onboarding process. They can help you fine tune your Splunk Observability Cloud journey and provide best practices, training, and workshop advice.

.. _onboard-imm-apps:

Launch Infrastructure Monitoring applications
=======================================================================================

#. For each of the participating teams, identify which services you want to ingest data from.
#. Install the OpenTelemetry (OTel) agent. 
#. Configure the receivers and pipeline for these services. This creates the default dashboards and detectors for the services such as databases, message bus, and OS platform.

After you set up these dashboards and detectors, the pilot teams can observe their application data in the built-in dashboards and create their own custom dashboards.

* See :ref:`built-in-dashboards`.
* See :ref:`dashboard-create-customize`.

.. _otel-reqs:

Understand OTel sizing requirements
==========================================

Before you start scaling up the use of the OTel agents, consider the OTel sizing guidelines. For details about the sizing guidelines, see :ref:`otel-sizing`. This is especially important on platforms such as Kubernetes where there can be a sudden growth from various autoscaling services. Ensure that the OTel agents can allocate sufficient memory and CPU needed to aid with a smooth rollout.




.. _customer-framework:

Finalize framework and adoption protocol
===============================================================================

As you onboard more teams with Splunk Observability Cloud, maintain review sessions to incorporate what you learned from previous onboardings. Review the feedback from the initial onboarded teams and engage with Splunk Observability Cloud Sales Engineers or Professional Services. Start utilizing resources available to your organization including engaging with your Splunk Observability Cloud Sales Engineer or Professional Services resources. These resources can help you with best practices and faster rollout.

Next step
===============

Next, begin your initial pilot rollout for Splunk Application Performance Monitoring. :ref:`phase2-apm`