.. _min-delay-detectors-scenario:

***********************************************************************
Scenario: Kai sets a Min Delay for detectors to account for sparse data
***********************************************************************



.. meta::
    :description: This Splunk alerts and detectors scenario describes how to set min delay for detectors.

In Splunk Observability Cloud, the site reliability engineering (SRE) team at Buttercup Games has set up a detector called :strong:`Service error` that monitors Buttercup Games services and alerts when the error rate of any service exceeds 5%.

Despite the alert, Buttercup Game has been receiving complaints from customers about errors coming from the ``productcatalog`` service.

Kai, an SRE on the team, investigates ``productcatalog`` and finds out that the service has a low request rate and rarely sends a data point for errors, sometimes only once a day. Because of this, the analytics engine can't keep track of the increased delay of the sparse error-tracking MTS. Its data points are too delayed to be included in the :strong:`Service error` detector, so the detector can't generate alerts on the ``productcatalog`` service.

In order to account for delayed data points from ``productcatalog``, Kai configures a Min Delay value for :strong:`Service error` by making an API call to the ``/detector`` endpoint. The Min Delay configuration forces the detector to wait a set amount of time before running the computation.

Kai charts the lag from the sparse MTS and determines that it is usually less than 30 seconds but has never been higher than 1 minute, so they set a Min Delay of 1 minute for :strong:`Service error`.

Summary
===========

By setting a Min Delay threshold for :strong:`Service error`, Kai has successfully included sparse data and can now catch errors from the ``productcatalog`` service before they affect customers' experience.

Learn more
=======================

For more information on Min Delay for detectors, see :ref:`min-delay-detectors`. 

For more information on the Detectors API, see the :new-page:`Detectors API reference <https://dev.splunk.com/observability/reference/api/detectors/latest>`.



