.. _logs-keyword:

*****************************************************************
Search logs by keywords or fields
*****************************************************************

.. meta::
  :description: Search and filter logs by keyword, field, or field values.

You can search Splunk Observability Cloud logs if your Splunk Observability Cloud instance ingests logs. If your organization has integrated its Splunk platform (Splunk Cloud Platform or Splunk Enterprise) instance with its Splunk Observability Cloud instance, you can search Splunk platform logs that your Splunk platform role has permissions to see in Splunk platform. If you cannot access a log in your Splunk platform instance, you cannot access it in Splunk Observability Cloud. 

You can search logs that you have permissions to see for particular keywords, field names, or field values. 

To search your logs, follow these steps:

#. Navigate to :guilabel:`Log Observer`. In the content control bar, enter a time range in the time picker if you know it.
#. Select :guilabel:`Index` next to :guilabel:`Saved Queries`, then select the indexes you want to query. If you want to search your Splunk platform (Splunk Cloud Platform or Splunk Enterprise) data, select the integration for the appropriate Splunk platform instance first, then select which index you want to query in Log Observer. You can only query indexes from one Splunk platform instance or Observability Cloud instance at a time. You can only query Splunk platform indexes if you have the appropriate role and permissions in the Splunk platform instance. Select :guilabel:`Apply`.
#. In the content control bar next to the index picker, select :guilabel:`Add Filter`.
#. To search on a keyword, select the :guilabel:`Keyword` tab, type the keyword or phrase you want to search on, then press Enter. If you want to search on a field, select the :guilabel:`Fields` tab, enter the field name, then press Enter. 
#. To continue adding keywords or fields to the search, select :guilabel:`Add Filter`.
#. Review the top values for your query on the the :guilabel:`Fields` panel on right. This list includes the count of each value in the log records. To include log records with a particular value, select the field name, then select ``=``. To exclude log records with a particular value from your results, select the field name, then select ``!=``. To see the full list of values and distribution for this field, select :guilabel:`Explore all values`.

When you add keywords, field names, or field values to the filters, Log Observer narrows the results in the Timeline and the Logs table so that only records containing the selected fields and values appear. To learn how you can use a productive search in the future, see :ref:`logs-save-share`.
