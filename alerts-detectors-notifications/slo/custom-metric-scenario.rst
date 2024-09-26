.. _custom-metric-slo-scenario:

*********************************************************************************************
Scenario: Kai configures a service level objective (SLO) based on a Synthetics check
*********************************************************************************************


.. meta::
    :description: This Splunk service level objective (SLO) scenario describes how to configure an SLO based on a Synthetics check

Kai, a site reliability engineer at Buttercup Games, has created a Synthetics Browser test for the Emby service on the Buttercup Games website. Kai didn't instrument the Emby service but wants to monitor the health of this service.

To measure and track the health metrics of the Emby service, Kai configures a custom metric SLO based on the Synthetics Browser test.

Use custom metric as service level indicator (SLI)
======================================================

From the :guilabel:`Detectors & SLOs` page, Kai configures the SLI and sets up a target for their SLO. Kai follows these steps: 

#. Kai wants to use a Synthetics metric as the system health indicators, so they select the :guilabel:`Custom metric` from the :guilabel:`Metric type` menu.
#. Kai enters following into the SignalFlow editor:

      .. code-block:: python

          G = data('synthetics.run.count', filter=filter('test', 'Monitoring Services - Emby check') and filter('success', 'true'))
          T = data('synthetics.run.count', filter=filter('test', 'Monitoring Services - Emby check'))

   Kai defines variables ``G`` and ``T`` as two streams of ``synthetics.run.count`` metric time series (MTS) measuring the health of requests sent to the Emby service. To distinguish between the two data streams, Kai applies an additional filter on the ``success`` dimension in the definition for ``G``. This filter queries for a specific collection of MTS that track successful requests for the Emby service. In Kai's SignalFlow program, ``G`` is a data stream of good events and ``T`` is a data stream of total events.

      .. image:: /_images/images-slo/custom-metric-slo-scenario.png
          :width: 100%
          :alt: This image shows Kai's SLO configuration using the ``synthetics.run.count`` metric and appropriate filters.


#. Kai assigns ``G`` to the :guilabel:`Good events (numerator)` dropdown menu and ``T`` to the :guilabel:`Total events (denominator)` dropdown menu.

#. Kai enters the following fields to define a target for their SLO:

    .. list-table::
        :header-rows: 1
        :widths: 32 30 50

        * - Field
          - Value 
          - Description 

        * - :guilabel:`Target (%)`
          - :strong:`99.9`
          - Kai wants to measure the Emby service successful request rate against a 99.9% target.

        * - :guilabel:`Compliance window`
          - :strong:`Last 30 days`
          - Kai wants to track this SLO over the past 30 days.

#. Kai subscribes to receive an alert whenever there is a breach event for the SLO target.

Summary
=======================

Kai set up an SLO and subscribed to breach event alerts that let them know when the Emby service on the Buttercup Games website fails to meet the request rate target. Kai managed to use custom metrics from an existing Synthetic Browser test to configure the SLO, despite not instrumenting the service themself.

Learn more
=======================

For more information about creating an SLO, see :ref:`create-slo`. 

For more information about the Synthetics Browser test, see :ref:`browser-test`.

For more information on SignalFlow, see :new-page:`Analyze data using SignalFlow <https://dev.splunk.com/observability/docs/signalflow>` in the Splunk Observability Cloud Developer Guide.