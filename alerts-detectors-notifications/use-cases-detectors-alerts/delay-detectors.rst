.. _delay-detectors:

********************************************************
Set delay for detectors to account for sparse data
********************************************************

.. meta::
    :description: A Splunk alerts and detectors use case describes how to set delays for detectors.

Kai, a site reliability engineer at Buttercup Games, has created a detector called "Service error" that monitors Buttercup Games services and alerts when the error rate of any service goes above 5%. 

However, because some services do not serve many requests and rarely report errors, The metric time series (MTS) tracking error counts for these services are sparse, sometimes only sending one data point a day.

In cases like this, the analytics engine cannot keep track of the delay of the sparse MTS. If these MTS come in with a higher delay than other services, they might not be included in the detector computation.

