.. _logs-aggregations:

*****************************************************************
Identify problem areas using log aggregation
*****************************************************************

.. meta created 2021-02-17
.. meta DOCS-1962

.. meta::
  :description: Identify problem areas using log record aggregation

Aggregations group related data by one field and then perform a
statistical calculation on other fields. Aggregating log records helps you
visualize problems by showing averages, sums, and other statistics for related
logs.

For example, suppose that you're browsing the Raw Logs Table to learn more about
the performance of your services. If you're concerned about the response time
of each service, you can group log records by service URL and calculate average
response time using an aggregation. This aggregation helps you identify
services that are responding slowly.

After you identify services with poor response time, you can drill down in the
log records for that service to understand the problems in more detail.

Aggregate log records
--------------------------------------------------------------------------------

To perform an aggregation, follow these steps:

#. Find the aggregations controls in the control bar. The default aggregation
   is a count of all log records grouped by the value of the ``severity`` field. This
   default corresponds to the following aggregation controls settings:

   * :guilabel:`COUNT`
   * :guilabel:`All(*)`
   * :guilabel:`Group by`: severity

   The default shows a count of all log events grouped by severity.

#. To change the field to group by, type the field name in the :guilabel:`Group by` text box and press Enter. The
   control also has these features:

   * When you click in the text box, Log Observer displays a drop-down list containing all the fields available in
     the log records.
   * The text box does auto-search. To find a field, start typing its name.
   * To select a field in the list, click its name.

#. To change the calculation you want to apply to each group, follow these steps:

   #. Select the type of statistic from the calculation control. For example, to calculate a mean value, select
      :menuselection:`AVG`.
   #. Choose the field for the statistic by typing its name in the calculation field control text box. The
      text box does auto-search, so start typing to find matching field names.
#. To perform the aggregation, click :guilabel:`Apply`.

Example 1: Identify problems by aggregating severity by service name
----------------------------------------------------------------------------

One way you can discover potential problems is to find services that are generating
a high number of severe errors. To find these services, group log records by
service name and count all the records. Services with problems appear as groups
with many records that have a ``severity`` value of ERROR.

To apply this aggregation, follow these steps:

#. Using the calculation control, set the calculation type by selecting :guilabel:`COUNT`.
#. Using the calculation field control, set the calculation field to :guilabel:`All(*)`.
#. Using the :guilabel:`Group by` text box, set the field to group by to ``service.name``.
#. Click :guilabel:`Apply`. The Timeline histogram displays a count of logs by all your services as
   stacked columns, in which each severity value has a different color. The histogram legend
   identifies the color of each severity.

The following screenshot shows you an example of this aggregation:

.. image:: /_images/logs/log-observer-aggregation-by-service-name-screenshot.png
    :width: 99%
    :alt: Example of a Log Observer aggregation

Example 2: Identify problems by aggregating response time by request path
-------------------------------------------------------------------------------

Longer than expected service response might indicate a problem with the service
or other part of the host on which it runs. To identify services that
are responding more slowly than expected, group log events by ``http.req.path``,
a field that uniquely identifies each service. For each group, calculate the mean
of the response time field ``http.resp.took_ms``.

To apply this aggregation, follow these steps:

#. Using the calculation control, set calculation type to :guilabel:`AVG`.
#. Using the calculation field control, set the field to :guilabel:`http.resp.took_ms`
#. Using the :guilabel:`Group by` text box, set the field to group by to ``http.req.path``.
#. Click :guilabel:`Apply`. The Timeline histogram displays the average response time for
   each service.

The following screenshot shows you an example of this aggregation:

.. image:: /_images/logs/log-observer-aggregation-by-request-path-screenshot.png
    :width: 99%
    :alt: Example of a Log Observer aggregation
