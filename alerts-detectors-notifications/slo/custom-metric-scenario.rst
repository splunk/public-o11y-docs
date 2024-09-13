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

#. Kai wants to use custom metrics as the system health indicators, so they select the :guilabel:`Custom metric` from the :guilabel:`Metric type` menu.
#. Kai enters following into the SignalFlow editor:

      .. code-block:: python

          G = data('synthetics.run.count', filter=filter('test', 'Monitoring Services - Emby check') and filter('success', 'true'))
          T = data('synthetics.run.count', filter=filter('test', 'Monitoring Services - Emby check'))

   While Kai uses the same metric name for both the ``G`` and ``T`` variables, they use the :strong:`success` dimension to count the number of successful requests for the Emby service on the Buttercup Games website.

      .. image:: /_images/images-slo/custom-metric-slo-scenario.png
       :width: 100%
       :alt: This image shows Kai's SLO configuration using the ``synthetics.run.count`` metric and appropriate filters.

    ..     :header-rows: 1
    ..     :widths: 10 20 30 40

    ..     * - Field
    ..       - SignalFlow editor
    ..       - Filters
    ..       - Description 

    ..     * - :guilabel:`Good events (numerator)`
    ..       - :strong:`synthetics.run.count`
    ..       - Kai adds the following filters for this metric:
            
    ..           * :strong:`test = Emby check`
    ..           * :strong:`success = true`
    ..       - Kai uses the :strong:`success = true` filter to count the number of successful requests for the Emby service on the Buttercup Games website.

    ..     * - :guilabel:`Total events (denominator)`
    ..       - :strong:`synthetics.run.count`
    ..       - Kai adds the following filter for this metric:

    ..           * :strong:`test = Emby check`
    ..       - Kai uses the same metric name and the :strong:`test = Emby check` filter to track the same Synthetics Browser test. However, Kai doesn't include the :strong:`success = true` dimension filter in order to count the number of total requests for the Emby service on the Buttercup Games website.

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
