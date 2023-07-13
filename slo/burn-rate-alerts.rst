:orphan:

.. include:: /_includes/slo/slo-preview-header.rst

.. _burn-rate-alerts:

*****************************************************************************************
Burn rate alerts
*****************************************************************************************

Burn rate is a unitless measurement of how quickly the compliance period’s error budge is being consumed.

Splunk Observability Cloud implements multiwindow, multi-burn-rate alerting to let you know when the rate of consumption of your service level objective (SLO) error budget exceeds your specified threshold and for a period of time.

How multiwindow, multi-burn-rate alerts work
===================================================

.. role:: raw-latex(raw)
    :format: latex html

.. raw:: html

    <script type="text/javascript" src="http://localhost/mathjax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

:raw-latex:`burn rate = \\frac{SLO compliance window (in hours) * percentage of error budget consumed}{long window (in hours) * 100%}`







