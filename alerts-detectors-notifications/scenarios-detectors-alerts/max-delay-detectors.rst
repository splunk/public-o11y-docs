.. _max-delay-detectors-scenario:

************************************************************************************
Scenario: Kai sets a Max Delay for detectors to account for sudden changes in delay
************************************************************************************



.. meta::
    :description: This Splunk alerts and detectors scenario describes how to set max delay for detectors.

In Splunk Observability Cloud, the site reliability engineering (SRE) team at Buttercup Game has set up a detector called :strong:`Store sales` that monitors Buttercup Games stores and alerts when any store’s hourly sales decrease by more than 10% compared to the previous week.

Kai, an SRE on the team, notices that sometimes the :strong:`Store sales` detector fires, but when they look at the chart 30 minutes later, everything seems normal.

After some investigation, they find out that the data from some stores has a sudden, momentary increase in delay caused by the network infrastructure in that region. Data points missing from the initial computation caused the alert to fire. However, when Kai goes look at the chart 30 minutes later, the data points have arrived, causing them to think that the detector misfired. In cases like this, the analytics engine can't predict the sudden change in delay. 

To make sure that the data from sudden lags is included in the detector computation, Kai configures a Max Delay value for :strong:`Store sales`.

Kai sees that the maximum delay for the late metric time series (MTS) is 10 minutes, so they configure a Max Delay of 10 minutes. Now the analytics engine can't run earlier than 10 minutes if known MTS have not sent a data point. If all known MTS send a data point, the computation can still occur before the 10-minute Max Delay.

Summary
===========

By setting a Max Delay threshold for :strong:`Service error`, Kai has successfully accounted for unexpected changes in delayed data and corrected the detector behavior.


Learn more
=======================

For more information on Max Delay for detectors, see :ref:`max-delay-detectors`. 


