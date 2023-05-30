:orphan:

.. include:: /_includes/slo/slo-preview-header.rst


.. _slo-intro:

******************************************************************************************
Introduction to service level objective (SLO) management in Splunk Observability Cloud
******************************************************************************************

.. meta::
    :description: Get started with service level objective (SLO) concepts and SLO in Splunk Observability Cloud


Service level objective (SLO) management is a service level monitoring experience that helps you align your business needs with your engineering reliability goals.

While you have always been able to use the data in Splunk Observability Cloud to monitor, troubleshoot, and optimize your services, including applications and infrastructure, SLO management provides a quantitative way to track the reliability and performance of your services. This allows teams to make the right investment trade-offs between product development and operational work.

What is service level monitoring?
=============================================

Service level monitoring is the process of measuring, tracking, and analyzing a variety of service level indicators (SLIs) associated with a given service in order to calculate the health and performance of a deployed software or service and compare it against the service level agreement (SLA).

The following table defines key concepts in service level monitoring.

 .. list-table::
    :header-rows: 1
    :widths: 20 40 40

    * - :strong:`Concept`
      - :strong:`Definition`
      - :strong:`Examples`
        
    * - Service level indicator (SLI)
      - | An SLI is a quantitative measurement showing some health of a service, expressed as a metric or combination of metrics. There are two types of SLI:
        | * Request-based SLIs count individual events, such as successful requests.
        | * Time window-based SLIs count time windows, classifying them as good or bad based on criteria that you define.
      - * Request-based availability SLI: Proportion of requests that resulted in a successful response
        * Request-based performance SLI: Proportion of requests that loaded in < 100 ms
        * Time window-based availability SLIs: Count of minutely windows where 97% of requests are successful
        * Time window-based performance SLI: Count of minutely windows where p95 < 100ms

    * - Service level objective (SLO)
      - An SLO defines a target for an SLI and a compliance period over which that target should be met. An SLO contains 3 elements: an SLI, a target, and a compliance period. Compliance periods can be calendar, such as monthly, or rolling, such as past 30 days.
      - * Request-based availability SLI over a calendar period: Our service should respond successfully to 95% of requests in a month
        * Request-based performance SLI over a rolling period: Our service must respond to 99% of requests in < 100 ms over a 7-day period
        * Time window-based availability SLI over a rolling period: Our service should respond successfully to 97% of requests 99.9% of the time in a 30-day period
        * Time window-based performance SLI over a calendar period: Our service p95 should be < 100ms 99% of the time in a month

    * - Service level agreement (SLA)
      - An SLA is a contractual agreement that indicates service levels your users can expect from your organization. If an SLA is not met, there can be financial consequences.
      - 
    
    * - Error budget
      - The number of errors allowed before an SLO is out of compliance and an SLA breached.
      - Our service can respond to 1% of requests in >100 ms over a 7 day period

    * - Burn rate 
      - A unitless measure of how quickly the compliance period’s error budge is being consumed. Burn rate makes the SLO and error budget actionable, showing service owners when a current incident is serious enough to page an on-call responder.
      - Burn rate of 1 means that at the current level, the error budge will be consumed within the compliance period but the SLO target will not be missed.

    








