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

The ratio of how many days of information is available for a workload compared to how many days worth of information Application Optimization needs in order to analyze it (14 contiguous days). If your data spans 14 contiguous days, the confidence will be high. If your data spans a shorter timespan than 14 days (for example, if you've made a configuration change such as a change to CPU or memory limits, an addition of a container, and so on), or since the initial deployment, the confidence level will be lower. Definition of confidence levels:

* :guilabel:`High`: Greater than 90% of needed information is available.

* :guilabel:`Medium`: 50-89% of needed information is available.

* :guilabel:`Low`: Only 5-49% of needed information is available.

* :guilabel:`Unknown`: Less than 5% of needed information is available.


Application Optimization calculates an overall confidence level by taking the lowest confidence level across all containers, where each container's confidence level is an average of the separate confidence levels for CPU and memory.


.. _aopt-glossary-efficiency:

Efficiency
==========================================================

The balance between over-provisioning and under-provisioning to optimize resource utilization without compromising performance or stability. Highly efficient workloads use resources in a way that aligns closely with their actual consumption, reducing waste and maximizing your cluster's capacity to run other workloads. 

Application Optimization is a powerful tool for achieving and maintaining efficiency. It calculates efficiency as the average of the pod-wide usage of a resource's ``request`` setting, capped at 100%. Its calculation only includes metrics within the analysis window, which is the lesser of 14 days and the time since the last resource change (or the initial deployment). Note that rather than finding the utilization (usage over requests) of each container within a pod, all of the containers' usage and requests are added up first. The averages for each CPU and memory ``request`` setting are then weight-averaged based on the assumed resource cost weights.

When values are unset for a particular resource, this tool assumes those ``request`` settings to be at usage (in other words, 100% efficient) to more accurately weigh multi-container rates.

When the main container has an unset resource, this tool considers the efficiency rate to be nullified.


.. _aopt-glossary-starvation-risk:

Starvation risk
==========================================================

A workload's average risk of running out of CPU or memory:

* :guilabel:`High`: Any container in which usage is greater than or equal to 95% of its ``limit`` settings.

* :guilabel:`Medium`: At least one resource (CPU or memory) of one container is not defined OR (all ``request`` settings are defined AND actual usage of at least one resource of one container exceeds its ``request`` setting for any time slot).

* :guilabel:`Low`: For either CPU or memory, the recommendation is greater than the baseline value. For example, the usage is greater than target utilization (0.85).

* :guilabel:`Minimal`: None of the above conditions are detected. In other words, all containers have ``request`` settings for both CPU and memory, and neither of these resources has had usage exceeding its target utilization. 


