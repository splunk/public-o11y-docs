:orphan:

.. _aopt-glossary:

.. include:: /private-preview/aopt/toc.rst
    :start-after: :orphan:

**********************************************************
Glossary
**********************************************************

.. _aopt-glossary-confidence-level:

Confidence level
==========================================================

The ratio of how many days of information is available for a workload compared to how many days worth of information Application Optimization needs in order to analyze it (14 contiguous days). If your data spans 14 contiguous days, the confidence will be high. If your data spans fewer than 14 days or since the initial deployment, the confidence level will be lower. For example, if you've made a configuration change such as a change to CPU or memory limits, an addition of a container, and so on. Definition of confidence levels:

* :guilabel:`High`: Greater than 90% of needed information is available.

* :guilabel:`Medium`: 50-89% of needed information is available.

* :guilabel:`Low`: Only 5-49% of needed information is available.

* :guilabel:`Unknown`: Less than 5% of needed information is available.


Application Optimization calculates an overall confidence level by taking the lowest confidence level across all containers, where each container's confidence level is an average of the separate confidence levels for CPU and memory.


Why the confidence level matters
----------------------------------------------------------

It's a good idea to match the confidence level to your workload's importance or criticality. In other words, if your workload is a test or you just need to preview the recommendations, a confidence level of :guilabel:`Low` is okay. But if your workload is a production or business critical workload, it's best to wait for a confidence level of :guilabel:`High` before applying the recommendations.


.. _aopt-glossary-efficiency:

Efficiency
==========================================================

The balance between over-provisioning and under-provisioning to optimize resource utilization without compromising performance or stability. Highly efficient workloads use resources in a way that aligns closely with their actual consumption, reducing waste and maximizing your cluster's capacity to run other workloads. 

Application Optimization is a powerful tool for achieving and maintaining efficiency. It calculates efficiency as the average of the pod-wide usage of a resource's ``request`` setting, capped at 100%. Its calculation only includes metrics within the analysis window, which is the lesser of 14 days and the time since the last resource change (or the initial deployment). Note that rather than finding the utilization (usage over requests) of each container within a pod, all of the containers' usage and requests are added up first. The averages for each CPU and memory ``request`` setting are then weight-averaged based on the assumed resource cost weights.

Best practices call for resource utilization in the 60-80% range. Having efficiency above 70-80% presents resource starvation risks. 

When values are unset for a particular resource, this tool assumes those ``request`` settings to be at usage (in other words, 100% efficient) to more accurately weigh multi-container rates.

When the main container has an unset resource, this tool considers the efficiency rate to be undefined.


.. _aopt-glossary-resource-footprint:

Resource Footprint
==========================================================

A workload's resource footprint is the sum of its pods' ``request`` settings for that resource or its average usage if it exceeds its ``request`` settings. If the ``request`` value is not set, the footprint represents the sum of actual usage instead. This tile displays the sum of all resource footprints of all the pods of all your workloads. 


.. _aopt-glossary-starvation-risk:

Starvation risk
==========================================================

A workload's average risk of running out of CPU or memory:

* :guilabel:`High`: The workload has tried to use more resources than were available, so its performance and reliability have likely been impacted. Application Optimization marks any container in which usage is greater than or equal to 95% of its ``limit`` settings as :guilabel:`High`.

* :guilabel:`Medium`: The workload has used more than its allocated resources (``request`` settings). While this may not have an impact on its performance and reliability due to Kubernetes bursting into additional resources, future occurrences of overusage may have an impact, since extra resources are not guaranteed to exist. 
  
  Application Optimization sets :guilabel:`Starvation risk` to :guilabel:`Medium` for any container in which either of these is true:
  
    * At least one resource (CPU or memory) of is undefined.
    
    * All ``request`` settings are defined and actual usage of at least one resource of exceeds its ``request`` setting for any time slot.

* :guilabel:`Low`: The workload hasn't exceeded its allocated resources but doesn't have enough headroom to absorb spikes or delays in scale-out when traffic increases. Application Optimization marks any container in which, for either CPU or memory, the recommendation is greater than the baseline value. For example, the usage is greater than target utilization (0.85).

* :guilabel:`Minimal`: None of the above conditions are detected. In other words, all containers have ``request`` settings for both CPU and memory, and neither of these resources has had usage exceeding its target utilization. 

