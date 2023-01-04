.. _min-delay-detectors-use-case:

********************************************************************
Set Min Delay for detectors to account for sparse data
********************************************************************

.. meta::
    :description: A Splunk alerts and detectors use case describes how to set min delay for detectors.

In Splunk Observability Cloud, the site reliability engineering (SRE) team at Buttercup Game has set up a detector called :strong:`Service error` that monitors Buttercup Games services and alerts when the error rate of any service exceeds 5%.

Despite the alert, Buttercup Game has been receiving complaints from customers about errors coming from the ``productcatalog`` service.

Kai, an SRE on the team, investigates ``productcatalog`` and finds out that the service doesn't serve many requests and rarely reports errors. The metric time series (MTS) tracking error counts for ``productcatalog`` are sparse, sometimes only sending one data point a day. Because of this, the analytics engine can't keep track of the delay of the sparse MTS, which come it with a higher delay than MTS from other services. As the sparse MTS are not included in the detector computation, :strong:`Service error` has been failing to report errors from the ``productcatalog`` service.

In order to account for delayed data points from ``productcatalog``, Kai configures a Min Delay value for :strong:`Service error`. They do this by making an API call to the ``/detector`` endpoint.

Kai charts the lag from the sparse MTS and determines that it is usually less than 30 seconds but has never been higher than 1 minute, so they set a Min Delay of 1 minute for :strong:`Service error`.

By setting a Min Delay threshold for :strong:`Service error`, Kai has successfully included sparse data and can now catch errors from the ``productcatalog`` service before they affect to customers' experience.

Learn more
=======================

For more information on Min delay for detectors, see :ref:`min-delay-detectors`. 

For more information on the Detectors API, see the :new-page:`Detectors API reference <https://dev.splunk.com/observability/reference/api/detectors/latest>`.



