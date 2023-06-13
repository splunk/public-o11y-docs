:orphan:

.. include:: /_includes/slo/slo-preview-header.rst

.. _create-slo:

*****************************************************************************************
Measure and track your service health metrics with service level objectives (SLOs)
*****************************************************************************************


.. meta::
    :description: Learn how to create a service level objective (SLO) in Splunk Observability Cloud.

For each service or metric indicating system health you are monitoring in Splunk Observability Cloud, you can define an SLO and how to measure it.


Create an SLO
=================

Follow these steps to create an SLO.

#. From the landing page of Splunk Observability Cloud, go to :strong:`Service Level Objectives (SLOs)`.
#. Select :guilabel:`Create SLO`.
#. Choose a service or metric indicating system health for the SLO.

    #. If you want to create an SLO for a service, enter the following fields:

       .. list-table::
        :header-rows: 1
        :widths: 40 60

        * - :strong:`Field name`
          - :strong:`Description`
        * - Metric type
          - Select :guilabel:`Service & endpoint` from the dropdown menu
        * - Service:endpoint
          - * Search for the service you want to create an SLO for
            * (Optional) Add an endpoint for the selected service
        * - Indicator type
          - * Select :guilabel:`Request response` ...
            * Select :guilabel:`Request latency` ...
        * - Environment
          - Check the boxes for the environments where you want to apply this SLO
        * - Filters
          - ... 
            
    #. If you want to create an SLO for a metric, enter the following fields:

       .. list-table::
        :header-rows: 1
        :widths: 40 60

        * - :strong:`Field name`
          - :strong:`Description`
        * - Metric type
          - Select :guilabel:`Custom metrics` from the dropdown menu
        * - Numerator metric
          - Search for the metric you want to use as the numerator metric
        * - Denominator metric
          - Search for the metric you want to use as the denominator metric
        * - SLO name 
          - Enter a name for your SLO
        * - Service name
          - ...

#. Define your SLO and how to measure it

    .. list-table::
      :header-rows: 1
      :widths: 20 80

      * - :strong:`Field name`
        - :strong:`Description`
      * - Target (%)
        - Enter the target you want to set for this SLO. 
      * - Compliance window
        - Select a compliance window for this SLO from the dropdown menu.
      * - Rollup
        - * Select :guilabel:`Entire compliance window` if you want to measure the SLO target for the whole period of the compliance window.
          * Select :guilabel:`Per minute windows` if you want to measure the SLO target for each minute in the defined compliance window.

#. Set up alerting for your SLO. You can subscribe to get notifications for the following alerts:

    .. list-table::
      :header-rows: 1
      :widths: 20 80

      * - :strong:`Field name`
        - :strong:`Description`
      * - Breach event
        - Alerts when the service level indicator (SLI) doesn't meet the target over the specified compliance window. 
      * - Failure budget
        - Alerts when the remaining failure budget is less than 10% of the estimated failure budget for the compliance window.
      * - Burn rate
        - Alerts when the burn rate exceeds 1.0, which means if the current burn rate is sustained over any future compliance window, the service will be out of SLO for that period.

#. Select :guilabel:`Create` to create the SLO.







