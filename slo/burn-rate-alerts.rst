:orphan:

.. include:: /_includes/slo/slo-preview-header.rst

.. _burn-rate-alerts:

*****************************************************************************************
Burn rate alerts
*****************************************************************************************

Burn rate is a unitless measurement of how quickly a service consumes the error budget during the compliance window of the SLO.

For example, for a compliance window of 30 days, a constant burn rate of 1 means your error budget is used up in exactly 30 days, a constant burn rate of 2 means the error budget is used up in 15 days, and so on.

Splunk Observability Cloud implements multiwindow, multi-burn-rate alerting to let you know when the rate of consumption of your service level objective (SLO) error budget exceeds your specified threshold for the compliance window.

Error budget calculation
=================================

Error budget measures the difference between actual and desired performance. For example, an SLO with a 99.9% target has an error budget of 0.1%.

.. math::

    \text{Error budget} = \text{100%} - \text{SLO target}




How multiwindow, multi-burn-rate alerts work
===================================================

Burn rate alerting in Splunk Observability Cloud uses a long window and a short window to check how fast the service consumes the error budget as an alert is triggered against your specified burn rate threshold.

When you set up burn rate alerting for your SLO, select a long window and calculate the short window as 1/12 of the long window, as suggested by Google.

You can use the following formula to estimate your burn rate threshold:


.. math::
    
    \text{Burn rate} = \frac{\text{SLO compliance window (in hours) * percentage of error budget consumed}}{\text{long window (in hours) * 100%}}






