.. _logs-filter-logs-by-field:

*****************************************************************
Filter logs by field
*****************************************************************

.. meta::
  :description: Include or exclude fields or field values to filter your log collection and find specific log events. 

You can filter your Log Observer query to logs that include or exclude specific fields or even specific field values. For example, you can filter data to find log records that contain the value ``error`` in a particular field.

To filter log records by a field, follow these steps:

#. Navigate to :guilabel:`Log Observer`. In the content control bar, enter a time range in the time picker if you know it.
#. Click the :guilabel:`Index` selector next to :guilabel:`Saved Queries`, then select the indexes you want to query. If you want to search your Splunk platform data, select the integration for the appropriate Splunk platform instance, then select the indexes that you want to query in Log Observer. You can only query indexes from one Splunk platform instance or Observability Cloud instance at a time. Click :guilabel:`Apply`.
#. Click :guilabel:`Add Filter`.
#. On the :guilabel:`Fields` tab, type the name of the field you want to filter on, then click the field you want.
#. Review the Top Values for the field on the right panel of the :guilabel:`Fields` tab. This list includes the count of each value in the log records. To include log records with a particular value, hover over the value, then click :guilabel:`=`. To exclude log records with a particular value from your results, hover over the value and click :guilabel:`!=`. 
#. Click :guilabel:`Explore all values` to see the full list of values and distribution for this field. Alternatively, you can click :guilabel:`Include all logs with this field`, or :guilabel:`Exclude all logs with this field`.

When you add the field and value, Log Observer narrows the results in the Timeline and the Logs table so that only records that contain the field and value appear.

.. |Settings| image:: /_images/logs/log-observer-raw-log-gear-icon.png
               :width: 20
               :alt: Settings icon
               :align: middle
