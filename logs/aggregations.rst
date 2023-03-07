.. _logs-aggregations:

*****************************************************************
Group logs by fields using log aggregation
*****************************************************************

.. meta::
  :description: Identify problems using log aggregation. Aggregate log records in groups, then perform analyses to see averages, sums, and other statistics for related logs.

Aggregations group related data by one field and then perform a
statistical calculation on other fields. Aggregating log records helps you
visualize problems by showing averages, sums, and other statistics for related
logs.

For example, suppose that you're browsing the Logs table to learn more about
the performance of your services. If you're concerned about the response time
of each service, you can group log records by service URL and calculate average
response time using an aggregation. This aggregation helps you identify
services that are responding slowly.

After you identify services with poor response time, you can drill down in the
log records for the service to understand the problems in more detail.

Aggregate log records
--------------------------------------------------------------------------------

To perform an aggregation, follow these steps:

#. Find the aggregations control bar. Log Observer Connect has no default aggregation. Log Observer defaults to :strong:`Group by: severity`. This default corresponds to the following aggregation controls settings:

   * :guilabel:`COUNT`
   * :guilabel:`All(*)`
   * :guilabel:`Group by`: severity

#. To change the field to group by, type the field name in the :guilabel:`Group by` text box and press Enter. The aggregations control bar also has these features:

   * When you click in the text box, Log Observer displays a drop-down list containing all the fields available in the log records.
   * The text box does auto-search. To find a field, start typing its name.
   * To select a field in the list, click its name.
   * When searching for a field to group by, you can only view 50 fields at a time. Continue typing to see a more and more specific list of fields to choose from.

#. To change the calculation you want to apply to each group, follow these steps:

   #. Select the type of statistic from the calculation control. For example, to calculate a mean value, select
      :menuselection:`AVG`.
   #. Choose the field for the statistic by typing its name in the calculation field control text box. The
      text box does auto-search, so start typing to find matching field names.
#. To perform the aggregation, click :guilabel:`Apply`.

Whenever you use a field for grouping or calculation, the results shown in the Timeline histogram and Logs table include only logs containing that field. Logs are implicitly filtered by the field you group by, ensuring that calculations are not impacted by logs that do not contain the field you used.

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

