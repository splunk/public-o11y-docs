.. _logs-raw-logs-display:

*****************************************************************
Browse logs in the logs table
*****************************************************************

.. meta::
   :description: Browse logs in the logs table as they come into Log Observer or Log Observer Connect. Customize the logs table display by field. See a count of new log events.

At the center of the Log Observer display is the logs table,
which displays log records as they come in. The most recent logs appear at the
beginning of the table. Scan the :guilabel:`Severity` to find important
severity levels, then click in the record line to see the record details.

These features help you browse the logs table:

* Load log records by scrolling the table. As you scroll, you see records for log events that occurred in the past. The logs table doesn't have a scrolling limit, so you can scroll to see the oldest records.

  When new log records are available, a prompt displays the number of new log events, such as :strong:`693 new events`. Click it to see the most recent log results.

  You can now examine the currently displayed section of logs for as long as you want.

  If you see important data in a log record, continue scrolling in the table to find more occurrences. If you see repeated occurrences of log records with an :guilabel:`ERROR` severity value, you might have a problem in one of your systems.

* At the top top center of the logs table, find the button that displays the number of events in the table.
  Click the button to refresh the table and return to the current, incoming stream of logs.

* Sort the logs table by any column by clicking the title of that column or the sort icon next to it.

* Display particular fields as column headers in the table by performing the following steps:

  #. In the logs table header row, click the :guilabel:`Configure Table` gear icon.

  #. On the Table Settings popup, select the fields you want to display. You can search for particular fields in the Search box. When finished, click :guilabel:`Apply Changes`. Each field you selected is now a column in the table. 

  #. You can customize the logs table display by adjusting the column width or dragging and dropping columns to a new order.


.. |Settings| image:: /_images/logs/log-observer-raw-log-gear-icon.png
               :width: 20
               :alt: Settings icon
               :align: middle
