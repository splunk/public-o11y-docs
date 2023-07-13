:orphan:

.. include:: /_includes/slo/slo-preview-header.rst

.. _burn-rate-alerts:

*****************************************************************************************
Burn rate alerts
*****************************************************************************************

Burn rate is a unitless measurement of how quickly the error budget is being consumed for the specified compliance window.

For example, for a compliance window of 30 days, a constant burn rate of 1 means your error budget is used up in exactly 30 days, a constant burn rate of 2 means the error budget is used up in 15 days, and so on.

Splunk Observability Cloud implements multiwindow, multi-burn-rate alerting to let you know when the rate of consumption of your service level objective (SLO) error budget exceeds your specified threshold for the compliance window.

How multiwindow, multi-burn-rate alerts work
===================================================

.. role:: raw-latex(raw)
    :format: latex html

    .. raw:: html

        <script type="text/javascript" src="http://localhost/mathjax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

    .. raw:: latex html
        
        burn rate = \\frac{SLO compliance window (in hours) * percentage of error budget consumed}{long window (in hours) * 100%}
        
        burn rate = \frac{SLO compliance window (in hours) * percentage of error budget consumed}{long window (in hours) * 100%}






