.. _rum-subscription-usage:

***************************************************************************
RUM subscription and usage metrics 
***************************************************************************

.. note:: The following information describes aspects of your usage and consumption. For more detailed billing-related queries, contact your Splunk Account Team.

View subscription usage 
==========================================

There are two types of subscriptions: enterprise and standard. For more information on each type of subscription, see :new-page:`Splunk RUM Pricing <https://www.splunk.com/en_us/products/pricing/faqs/observability.html#splunk-rum>`.


Splunk RUM offers three metrics you can use to track your subscription usage. You can use these metrics to create charts, dashboards, and set alerts. Usage data is based on a monthly cadence. To see how your usage compares to limits, see :ref:`rum-limits`.

Each metric has two dimensions:

* ``app``: The application where the data came from.
*  ``sf_product``: The type of product, either web or mobile device that the data came from.

.. list-table:: 
   :widths: 25 25 
   :header-rows: 1

   * - :strong:`Metric`
     - :strong:`Description`
   * - ``sf.org.rum.numSessions``
     - Number of unique sessions processed by RUM. 
   * - ``sf.org.rum.numSpans``
     - Number of spans processed by RUM.
   * - ``sf.org.rum.numBytes``
     - Number of bytes processed by RUM.


Dashboard
=============

In Dashboards> Organization metrics> RUM entitlements. 



See also
==========

To learn more, see: 

* :ref:`get-started-metrics`
* :ref:`rum-alerts`
* :ref:`Create charts in Splunk Observability Cloud<create-charts>`

