.. _auto-instrumentation-java-operator:

*************************************************************************************************************
Scenario: Arnau instruments Java apps using the Splunk Collector and Kubernetes Operator  
*************************************************************************************************************

.. meta::
   :description: Learn how to deploy the upstream Kubernetes Operator and Java automatic instrumentation for Splunk Observability Cloud.

Spring Clinic Microservices, a fictitious company, wants to use the OTel Collector and the upstream Kubernetes Operator to auto-instrument their Java applications. The final architecture will look as shown in the diagram below:

.. image:: /_images/collector/auto-instrumentation-op-java-architecture.png
   :width: 90%
   :alt: Java app auto instrumentation architecture diagram.

To do so, Arnau, their DevOps manager, proceeds to:

#. :ref:`Set up the apps to instrument <auto-instrument-operator-java-set-up>`.
#. :ref:`Deploy and configure the Collector <auto-instrument-operator-java-install>`.

.. note:: Learn more about the Spring Clinic Microservices demo in GitHub at :new-page:`spring-petclinic/spring-petclinic-microservices <https://github.com/spring-petclinic/spring-petclinic-microservices>`.

.. _auto-instrument-operator-java-set-up:

1. Set up the applications to instrument
======================================================================

Arnau creates the ``spring-petclinic`` namespace and deploys the related Java applications to it. 

.. code-block:: yaml
   
   kubectl apply -f examples/enable-operator-and-auto-instrumentation/spring-petclinic -R

.. _auto-instrument-operator-java-install:

2. Deploy and configure the Collector
======================================================================

Arnau follows the steps described in :ref:`auto-instrumentation-operator` to set up Auto Intrumentation for their clinic apps.

After completing the deployment, Arnau is able to see the results using :ref:`APM <get-started-apm>`.

.. image:: /_images/collector/auto-instrumentation-op-java-1-light.png
   :width: 100%
   :alt: Java app auto instrumented.

Summary
======================================================================

Arnau uses the Collector and the upstream Kubernetes Operator to auto-instrument their Java applications and see the results in APM dashboards. 

Learn more
======================================================================

To install the Operator for Auto Instrumentation, see :ref:`Install the Collector with the Kubernetes Operator <auto-instrumentation-operator>`.