.. _per-product-limits:

******************************************************
Per-product limits in Splunk Observability Cloud
******************************************************

.. meta::
   :description: Separate metric limits alerting for each product.

When you use more than one products in Splunk Observability Cloud to monitor and analyze your data, each product has its own metric time series (MTS) limits. Per-product limits let you set up metric limits alerting to manage your resource usage on a per-product basis.

The following table shows per-product MTS creation limits.

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Limit name`
     - :strong:`Default limit value`

   * - :ref:`mts-creations-per-hour-per-product-limit`
     - Absolute limit of 500,000 MTS per hour, regardless of your subscription limit, or 50 times your MTS per minute limit, whichever is smaller.

   * - :ref:`mts-creations-per-minute-per-product-limit`
     - 6,000 or determined by your subscription


.. _mts-creations-per-hour-per-product-limit:

MTS creations per hour per product limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: Absolute limit of 500,000 MTS per hour, regardless of your subscription limit, or 50 times your MTS per minute limit, whichever is smaller.
   * :strong:`Notes`: Maximum number of MTS you can create per hour for each product.
   * :strong:`Customer impact`: The product drops new MTS exceeding the limit without returning an error. Data points for existing MTS are still accepted.

.. _mts-creations-per-minute-per-product-limit:

MTS creations per minute per product limit
--------------------------------------------------------------------------------------

   * :strong:`Default limit value`: 6,000 or determined by your subscription.
   * :strong:`Notes`: Maximum number of MTS you can create per minute. For example, if you create 5,500 MTS in the first minute, you can still create 5,500 more in the next minute. If you exceed your MTS limit per minute for more than 30 minutes of any hour, you can't create any more MTS for the remainder of the hour.
   * :strong:`Related metrics`:

     - ``sf.org.numMetricTimeSeriesCreated``
     - ``sf.org.limit.metricTimeSeriesCreatedPerMinute``
   * :strong:`Customer impact`: The product drops new MTS exceeding the limit without returning an error. Data points for existing MTS are still accepted.