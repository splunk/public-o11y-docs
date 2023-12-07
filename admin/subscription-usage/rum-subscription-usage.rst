.. _rum-subscription-usage:

***************************************************************************
RUM subscription and usage metrics 
***************************************************************************

Splunk RUM offers three metrics you can use to track your subscription usage. You can use these metrics to create charts, dashboards, and set alerts. 

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

See also
==========

To learn more, see: 

* :ref:`get-started-metrics`
* :ref:`rum-alerts`
* :ref:`Create charts in Splunk Observability Cloud<create-charts>`

