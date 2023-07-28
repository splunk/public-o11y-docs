.. _rum-limits:

****************************************
System limits for Splunk RUM
****************************************

Splunk RUM has system limits that help ensure good performance, stability, and reliability. These limits also protect the Splunk RUM multi-tenant environment. Exceeding these limits might degrade your Splunk RUM experience.

Subscriptions 
==========================

There are two types of subscriptions: enterprise and standard. For more information on each type of subscription, see :new-page:`Splunk RUM Pricing <https://www.splunk.com/en_us/products/pricing/faqs/observability.html#splunk-rum>`.

Session limits
========================
.. list-table::
   :header-rows: 1
   :widths: 15, 15, 70

   * - :strong:`Limit name`
     - :strong:`Default limit value`
     - :strong:`Notes`
   * - Max session duration 
     - 4 hours
     - If you exceed the limit, Splunk RUM generates a new session ID but doesn't drop the span. 
   * - Max inactive time in session
     - 15 minutes
     - If you exceed the limit, Splunk RUM generates a new session ID but doesn't drop the span. 



Data ingestion limits
==================================

If you exceed the data ingestion limit for your subscription, data is dropped. Splunk RUM notifies you if you've exceeded the limit with a status code error. Data ingestion limits are determined by your subscription.


.. list-table::
   :header-rows: 1
   :widths: 15, 15

   * - :strong:`Limit name`
     - :strong:`Default limit value`
   * - :ref:`Bytes-per-Minute`
     - Determined by your subscription
   * - :ref:`spans-per-minute`
     - Determined by your subscription
   * - :ref:`span-size`
     - 128kB


MetricSet limits
========================

.. list-table::
   :header-rows: 1
   :widths: 25, 75

   * - :strong:`Default limit`
     - :strong:`Notes`
   * - Troubleshooting MetricSets (TMS)
     - TMS limits are determined by your subscription. If you exceed the limit session events or spans aren't dropped. 
   * - Monitoring MetricSets
     - Monitoring MetricSets are determined by your subscription. For more information on system limits for Monitoring MetricSets, see :ref:`sys-limits`.


Additional limit details for Splunk RUM 
==================================================
To help you optimize your product experience, this section describes the following:

* The name and value of each system limit.

* If available, the organization metrics associated with the limit.

* The impact you observe when you exceed the limit.



.. _Bytes-per-Minute:

Bytes per minute (BPM)
-----------------------

.. list-table::
   :header-rows: 1
   :widths: 25, 75

   * - :strong:`Default limit`
     - :strong:`Notes`
   * - Determined by Session Volume entitlement as per contract
     -  The number of session events or spans dropped after this limit is reached. Monitor how many spans were dropped when you exceeded the throttle for BPM with the following metrics:
      
        * ``sf.org.rum.numSpansDroppedThrottle``
        * ``sf.org.rum.grossSpanBytesReceived``
        * ``sf.org.rum.grossContentBytesReceived``
        * ``sf.org.rum.numSpanBytesReceived``

``numSpanBytes`` is the size of the spans that Splunk RUM accepted. 

.. _spans-per-minute:

Spans Per Minute (SPM)
-----------------------

.. list-table::
   :header-rows: 1
   :widths: 25, 75

   * - :strong:`Default limit`
     - :strong:`Notes`
   * - Determined by Session Volume entitlement as per contract
     - The number of session events or spans dropped after this limit is reached. Monitor SPM with the following metrics: 
    
         * ``sf.org.rum.numSpansDroppedThrottle``
         * ``sf.org.rum.numSpansReceived`` 
         * ``sf.org.rum.grossSpansReceived``


.. _span-size:

Span size 
-----------------------

.. list-table::
   :header-rows: 1
   :widths: 25, 75

   * - :strong:`Default limit`
     - :strong:`Notes`
   * - 128kB
     - The volume of an individual RUM event or span in kB. If you exceed the limit, Splunk RUM drops the span and doesn't analyze the contents. Measure the number of drops due to span size with this metric ``sf.org.rum.numSpansDroppedInvalid``. You can also add the dimension ``spanTooLarge``. 


