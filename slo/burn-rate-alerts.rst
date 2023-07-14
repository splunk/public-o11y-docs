:orphan:

.. include:: /_includes/slo/slo-preview-header.rst

.. _burn-rate-alerts:

*****************************************************************************************
Burn rate alerts
*****************************************************************************************

Burn rate is a unitless measurement of how quickly a service consumes the error budget during the compliance window of the SLO.

For example, for a compliance window of 30 days, a constant burn rate of 1 means your error budget is used up in exactly 30 days, a constant burn rate of 2 means the error budget is used up in 15 days, and so on.

Splunk Observability Cloud implements multiwindow, multi-burn-rate alerting to let you know when the rate of consumption of your service level objective (SLO) error budget exceeds your specified threshold for the compliance window.

How multiwindow, multi-burn-rate alerts work
===================================================

Apart from the specified compliance window, which is considered the "long window", a shorter window is used to check if the error budget is still being consumed as 

.. math::
    


:math:`\\frac{ \sum_{t=0}^{N}f(t,k) }{N}`

:math:`\\frac{ \sum_{t=0}^{N}f(t,k) }{N}`

.. role:: raw-latex(raw)
    :format: latex html

.. raw:: html

    <script type="text/javascript" src="http://localhost/mathjax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

.. raw:: latex html
    
    burn rate = \\frac{SLO compliance window (in hours) * percentage of error budget consumed}{long window (in hours) * 100%}

.. raw:: latex html
    
    burn rate = \frac{SLO compliance window (in hours) * percentage of error budget consumed}{long window (in hours) * 100%}

.. raw:: latex html
     
    a = \\frac{a}{b}

.. raw:: latex html

    a = \frac{a}{b}

.. raw:: latex html

    \[ \frac{1}{\Bigl(\sqrt{\phi \sqrt{5}}-\phi\Bigr) e^{\frac25 \pi}} =
    1+\frac{e^{-2\pi}} {1+\frac{e^{-4\pi}} {1+\frac{e^{-6\pi}}
    {1+\frac{e^{-8\pi}} {1+\ldots} } } } \]

:raw-latex:`\(x = {-b \pm \sqrt{b^2-4ac} \over 2a}.\)`






