:orphan:

.. include:: /_includes/slo/slo-preview-header.rst

.. _burn-rate-alerts:

*****************************************************************************************
Burn rate alerts
*****************************************************************************************

.. meta::
    :description: How burn rate alerting works in Splunk Observability Cloud SLO.

Burn rate is a unitless measurement of how quickly a service consumes the error budget during the compliance window of the service level objective (SLO).

For example, for a compliance window of 30 days, a constant burn rate of 1 means your error budget is used up in exactly 30 days, a constant burn rate of 2 means the error budget is used up in 15 days, and so on.

Splunk Observability Cloud implements multiwindow, multi-burn-rate alerting to let you know when the rate of consumption of your service level objective (SLO) error budget exceeds a healthy burn rate threshold for the length of your specified compliance window.

Error budget calculation
=================================

Error budget measures the difference between actual and desired performance. For example, an SLO with a 99.9% target has an error budget of 0.1%.

.. math::

    \text{Error budget} = \text{100%} - \text{SLO target}


How multiwindow, multi-burn-rate alerts work
===================================================

Burn rate alerting in Splunk Observability Cloud uses a long window and a short window to check how fast the service consumes the error budget as an alert is triggered against the burn rate threshold.

Splunk Observability Cloud uses the following formula to calculate burn rate thresholds for the alerting mechanism:

.. math::
    
    \text{Burn rate threshold} = \frac{\text{SLO compliance window (in hours) * Error budget consumed}}{\text{Long window (in hours) * 100%}}

The following tables show the burn rate threshold estimates for different long and short windows. Short windows are 1/12 of the long windows, as suggested by Google. To learn more, see :new-page:`Alerting on SLOs <https://sre.google/workbook/alerting-on-slos/>` on Google's Site Reliability Workbook.

Burn rate for a 99.9% SLO with a 30-day compliance window
------------------------------------------------------------------

    .. list-table::
      :header-rows: 1
      :widths: 20 20 20 20

      * - :strong:`Long window`
        - :strong:`Short window`
        - :strong:`Error budget consumed`
        - :strong:`Burn rate threshold`   
      * - 1 hour
        - 5 minutes
        - 2%
        - 14.4
      * - 6 hours
        - 30 minutes
        - 5%
        - 6

Burn rate for a 99.9% SLO with a 7-day compliance window
-------------------------------------------------------------------

    .. list-table::
      :header-rows: 1
      :widths: 20 20 20 20

      * - :strong:`Long window`
        - :strong:`Short window`
        - :strong:`Error budget consumed`
        - :strong:`Burn rate threshold`   
      * - 1 hour
        - 5 minutes
        - 10%
        - 16.8
      * - 6 hours
        - 30 minutes
        - 20%
        - 5.6
