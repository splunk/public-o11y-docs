.. _auto-instrumentation-java-operator:

*****************************************************************************
Use case: Deploy the OpenTelemetry Operator and Java auto-instrumentation
*****************************************************************************

.. meta::
   :description: Example/use case on how to deploy the OpenTelemetry Operator and Java auto-instrumentation

.. note:: To install the Operator for Auto Instrumentation, see :ref:`Install the Collector with the Kubernetes Operator <auto-instrumentation-operator>`.

Spring Clinic Microservices, a fictitious company, wants to use the Collector with the Kubernetes Operator to auto-instrument their Java applications. The final architecture will look as shown in the diagram below:

.. image:: /_images/collector/auto-instrumentation-op-java-2.png
   :width: 80%
   :alt: Java app auto instrumentation diagram.

To do so, Arnau, their DevOps manager, proceeds as described:

#. :ref:`Set up the apps to instrument <auto-instrument-operator-java-set-up>`.
#. :ref:`Deploy and configure the Collector <auto-instrument-operator-java-install>`.

.. note:: Learn more about the Spring Clinic Microservices demo in GitHub at :new-page:`spring-petclinic/spring-petclinic-microservices <https://github.com/spring-petclinic/spring-petclinic-microservices>`.

.. _auto-instrument-operator-java-set-up:

Set up the applications to instrument
======================================================================

The Java ``spring-petclinic`` demo creates a ``spring-petclinic`` namespace and deploys the related Java applications to it. 

TODO: Add the Kubernetes manifests for spring-petclinic to this example in a followup PR

.. code-block:: yaml
   
   kubectl apply -f examples/enable-operator-and-auto-instrumentation/spring-petclinic -R

.. _auto-instrument-operator-java-install:

Deploy and configure the Collector
======================================================================

LINK TO INSTALL INSTRUCTIONS TBC

.. image:: /_images/collector/auto-instrumentation-op-java-1.png
   :width: 100%
   :alt: Java app auto instrumented.

