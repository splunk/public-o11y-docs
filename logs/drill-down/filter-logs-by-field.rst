.. _filter-logs-by-field:

*****************************************************************
Filter logs by field
*****************************************************************

.. meta created 2021-02-17
.. meta DOCS-1962

.. meta::
  :description: Identify problems using log field filtering

When you look for problems in log record data, you can narrow your search by
filtering the display to show you logs that contain a specific value.
For example, you can filter data to find log records that contain the value
``error`` in a field.

To filter log records by a field, follow these steps:

#. Check that the field you want to filter on appears in the Raw Logs Table. If the
   field doesn't appear, follow these steps:

   #. In the Raw Logs Table header row, click :guilabel:`Configure settings`.
      The :guilabel:`Table Settings` dialog box appears.
   #. In the dialog box, select the fields you want to display and deselect the ones you don't want.
   #. Click :guilabel:`Apply Changes`. In the Raw Logs Table, you see the fields you selected as column headers.
#. In the Filter bar at the top, type the name of the field you want to filter on. For example, if you want to find log
   records that contain an error, and you know that the logs contain the field ``error``, type ``error``.
   Log Observer auto-completes entries as you type. When you find the field you want, stop typing.
   If you see more than one result listed, click the expand/collapse icon next to each one to hide the field details.
   Now you can see a list of the field names.
#. To view the values for a field, click the expand/collapse icon to display its details.
#. Review the Top Values list for the field. This list includes the frequency of each value in the log records.
   Select values that have a high frequency, because these values give you most useful problem-solving results.
#. Hover over a value, then click :guilabel:`=` to include log records with the value in your results. Click
   :guilabel:`!=` to exclude log records with the value from your results.

When you add the field and value, Log Observer narrows the results in the Timeline and the Raw Logs Table so that only
records that contain the field and value appear.

.. |Settings| image:: /_images/logs/log-observer-raw-log-gear-icon.png
               :width: 20
               :alt: Settings icon
               :align: middle
