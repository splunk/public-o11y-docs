.. _get-started-core-to-o11y:

****************************************************************
Expand the Splunk platform into Splunk Observability Cloud
****************************************************************

.. meta::
    :description: Learn to use your Splunk core platform logs in the observability space.

* :ref:`Monitor SLIs, manage SLOs, and meet SLAs <get-started-slis>`
* :ref:`Respond to incidents and write postmortems <get-started-incident-response>`
* :ref:`Reduce toil: Automated solutions for interacting with the infrastructure <get-started-toil-reduction>`
* :ref:`Collaborate on reliability across teams <get-started-collaboration>`

.. _get-started-slis:

Monitor SLIs, manage SLOs, and meet SLAs
=================================================================================
Splunk Observability Cloud provides out of the box solutions for monitoring your SLIs, and setting and meeting your SLIs and SLAs. 

SLIs are Service Level Indicators, the metrics used to measure your system's availability. SLOs, Service Level Objectives, are what you have determined is the appropriate level of availability, as measured by your SLIs. Service Level Agreements, SLAs, are the promise you make to your customers about how much of the time you will meet your SLOs and what you will do if you do not meet them.

Observability Cloud takes the guesswork out of determining error budgets, and helps you set reasonable SLOs and meet your SLAs. 

The following sections detail the multiple views in Observability Cloud that you can use to track reliability.

Splunk APM
---------------------------------------------------------------------------------
Splunk APM automatically generates a service map displaying all of your instrumented and inferred services, the dependencies among them, and SLIs for each when you click into a service. See :ref:`apm-service-map`. Defining and managing SLOs for services with dependencies, some of which have their own SLOs, is tricky. A dynamically generated service map showing all integrated services and dependencies helps you decide if and how to combine SLOs for multiple dependencies.

:ref:`data-visualization-built-in-dashboards` in Splunk APM are automatically populated with SLIs for all integrated services. See :ref:`data-visualization-dashboards` for a list of types of dashboards and how you can create, customize, import, export, clone, and share them. See :ref:`apm-apm-alert-visualization-apm-dashboards` to learn how to track performance, troubleshoot from the dashboard, and finally create a detector so that you can alert on a dashboard or chart in the future. 


Splunk Infrastructure Monitoring
---------------------------------------------------------------------------------


Splunk Synthetic Monitoring
---------------------------------------------------------------------------------
Splunk Synthetic Monitoring tests your SLOs before users do. When you proactively monitor the performance of your web application, you can remediate problems before they impact your users. Technical and business teams use Synthetic Monitoring to create detailed tests that proactively monitor the speed and reliability of websites, web apps, and resources over time, at any stage in the development cycle.  See :ref:`synthetics-intro-synthetics` to learn more. 

Set up browser tests and uptime tests to monitor your site or application. You can set the tests to run at a frequency you prefer. Each test captures a set of metrics each time it runs. You can monitor the Synthetics metrics and set up alerts that notify you when tests fail. See :ref:`synthetics-test-config-synth-alerts` to learn how.


.. _get-started-incident-response:

Respond to incidents and write postmortems
=================================================================================
blah blah

.. _get-started-toil-reduction:

Reduce toil: Automated solutions for interacting with the infrastructure 
=================================================================================
blah blah


.. _get-started-collaboration:

Collaborate on reliability across teams
=================================================================================
blah blah



------------------


.. collapse:: Monitor SLIs, manage SLOs, and meet SLAs

    Blah blah blah SLIs


.. collapse:: Respond to incidents and write postmortems

    Blah blah blah incident response


.. collapse:: Reduce toil: Automated solutions for interacting with the infrastructure

    Blah blah blah toil reduction


.. collapse:: Collaborate on reliability across teams

    Blah blah blah collaboration across teams