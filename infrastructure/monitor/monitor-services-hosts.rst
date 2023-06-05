.. _monitor-services-hosts:

*****************************************************************
Monitor services and hosts in Splunk Infrastructure Monitoring
*****************************************************************

.. meta::
    :description: Learn about navigators in Splunk Infrastructure Monitoring 

.. toctree::
    :maxdepth: 3
    :hidden:

    aws
    azure
    gcp
    k8s-nav
    k8s
    hosts
    scenario-k8s-nav
    
    

See the following pages for more information about using :ref:`navigators <use-navigators-imm>` to monitor public cloud, container, or host integrations:

* Public clouds

  - :ref:`infrastructure-aws`
  - :ref:`infrastructure-gcp`
  - :ref:`infrastructure-azure`

* Containers

  - :ref:`infrastructure-k8s-nav`
  - :ref:`infrastructure-k8s`

* My Data Center
  
  - :ref:`infrastructure-hosts`

* Scenarios for navigators

  - :ref:`troubleshoot-k8s-nav-scenario`

Splunk Observability Cloud also provides metrics and other data :ref:`for the following host and application monitors <monitor-data-sources>`.

.. _imm-traffic-considerations:

Displayed data: Traffic considerations
================================================

* Information is displayed only if data is streamed in. If there's no data coming in from a stream for more than 3 hours, that stream stops being counted in Observability Cloud. 
    
    - Kubernetes monitoring holds tiles in a disabled state until it goes inactive, which happens 25 hours after the last data point is received.
* Some metrics, like those related to CPU utilization, are always reported. Observability Cloud uses these metrics on the Navigator summary page.
* A few metrics are not sent continuously. For example, metrics related to the number of errors are only sent when errors happen.  
    
    - Don't try to get a list of entities using one of the few metrics not sent continuously, because entities with no errors might be hidden. 
* Counts are sensitive to the time range, the calculated resolution of the job that runs, and the frequency of the data that is coming in. 
    
    - A typical cloud integration reports a new data point every 5 minutes. 
    - As the job is running, reporting instances that are turned off drop off after the time range that they are part of passes.  

Navigator considerations
-------------------------------------------------------------------

:ref:`Navigators <use-navigators-imm>` display information when an entity is both active and sending metrics, whether they are being monitored by a cloud integration or by an agent. Navigators are sensitive to the time range selected, and queries with a broader time range take longer. 

The :strong:`Navigator Summary` page only shows the latest data point, regardless of the selected time range. 

    - You can see historical numbers in the purple graph, but the number displayed will be the latest value.  
    - Even if you select a wide time range, Navigators only displays entities active in the most recent data point.

