.. _logs-raw-logs-display:

*****************************************************************
Browse raw logs in the Raw Logs display
*****************************************************************

.. meta created 2021-02-17
.. meta DOCS-1962

.. meta::
   :description: Browse raw logs in the Raw Logs display

The main part of the Log Observer display is the Raw Logs Table,
which displays log records as they come in. The most recent logs appear at the
beginning of the table. Scan the :guilabel:`Severity` to find important
severity levels, then click in the record line to see the record details.

These features help you browse the Raw Logs Table:

* Load log records by scrolling the table. As you scroll, you see records for log events that occurred in the past. The
  Raw Logs Table doesn't have a scrolling limit, so you can scroll to see the oldest records.

  To stop new log records from appearing in the table, in the control bar click :guilabel:`Pause`.

  You can now examine the currently displayed section of logs for as long as you want.

  If you see important data in a log record, continuing scrolling in the table to find more occurrences. If you see repeated
  occurrences of log records with an :guilabel:`ERROR` severity value, you might have a problem in one of your systems.

* At the top top center of the Raw Logs Table, find the button that displays the number of events in the table.
  Click the button to refresh the table and return to the current, incoming stream of logs.

* Display particular fields as column headers in the table by performing the following steps:

  #. In the Raw Logs Table header row, click :guilabel:`Settings`.

  #. Select the fields you want to display, then click :guilabel:`Apply Changes`. Each field you selected is now a
     column in the table.


.. |Settings| image:: /_images/logs/log-observer-raw-log-gear-icon.png
               :width: 20
               :alt: Settings icon
               :align: middle
