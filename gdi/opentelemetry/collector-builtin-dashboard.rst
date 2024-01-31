.. _collector-builtin-dashboard:

********************************************************************************************
Monitor the Collector with Splunk Observability Cloud's built-in dashboards
********************************************************************************************

.. meta::
      :description: Use the built-in Collector dashboard in Splunk Observability Cloud for a better understanding of how your Collector instances are doing.

Splunk Observability Cloud provides built-in dashboards that give you immediate visibility into the technologies and services being used in your environment, including your deployed OTel Collector instances. 

Learn more about the available built-in dashboards at and how to use them at :ref:`built-in-dashboards`.

Access the built-in Collector dashboard
==============================================================

To access the Collector built-in dashboard:

#. Log in to Splunk Observability Cloud.
#. Select :guilabel:`Dashboards` on the left navigation menu. 
#. Use the search bar or browse down to locate the OpenTelementry Collector tile.
#. Select the link in the tile to access the built-in dashboard.

Use the built-in Collector dashboard
==============================================================

The built-in dashboard for the Collector has the following sections:

* :ref:`collector-builtin-dashboard-process`
* :ref:`collector-builtin-dashboard-critical`
* :ref:`collector-builtin-dashboard-secondary`
* :ref:`collector-builtin-dashboard-outbound`

Each section contains a set of charts with information relevant to your deployments. To know how to work with charts, and understand the types of charts available, see :ref:`data-visualization-charts`.

.. _collector-builtin-dashboard-process:

Collector process metrics
----------------------------------

This section of the built-in dashboard contains three charts with basic metrics related to your Collector instances:

* The amount of your Collector instances running
* Your Collectors' memory usage, in MB 
* Your Collector's total CPU user and system time, in seconds

.. image:: /_images/gdi/collector/collector-builtin-dashboard-01.jpg
      :width: 100%
      :alt: Collector process metrics in the built-in dashboard

.. _collector-builtin-dashboard-critical:

Critical monitoring
----------------------------------

.. caution:: This section of the dashboard focuses on dropped data and is essential to understand the health of your system. Investigate any value above zero. 

This section is structured in three columns, one for each type of available data type: spans, metrics, and logs. For more information about the Splunk Observability Cloud data model, see :ref:`data-model`.

.. image:: /_images/gdi/collector/collector-builtin-dashboard-02.jpg
      :width: 100%
      :alt: Collector critical monitoring in the built-in dashboard

For each processed data type, you'll find metrics on:

* Sending queue dropped spans/metric datapoints/log records
* Droppeded spans/metric datapoints/log records per processor

.. _collector-builtin-dashboard-secondary:

Secondary monitoring
----------------------------------

In this section, you'll find additional metrics, per processed data type, that can help you monitor and troubleshoot the behavior of your system:

* Queue length
* Failure rates
* Refusal rates

.. image:: /_images/gdi/collector/collector-builtin-dashboard-03.jpg
      :width: 100%
      :alt: Collector secondary monitoring in the built-in dashboard

.. _collector-builtin-dashboard-outbound:

Outbound monitoring
----------------------------------

Finally, Outbound monitoring shows the outbound data flow of your OTel Collectors. 

.. image:: /_images/gdi/collector/collector-builtin-dashboard-04.jpg
      :width: 100%
      :alt: Collector outbound metrics in the built-in dashboard