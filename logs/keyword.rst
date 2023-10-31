.. _logs-keyword:

*****************************************************************
Search logs by keywords or fields
*****************************************************************

.. meta::
  :description: Search and filter logs by keyword, field, or field values.

.. include:: /_includes/log-observer-transition.rst

You can search Splunk Observability Cloud logs if your Splunk Observability Cloud instance ingests logs. If your organization has integrated its Splunk platform (Splunk Cloud Platform or Splunk Enterprise) instance with its Splunk Observability Cloud instance, you can search Splunk platform logs that your Splunk platform role has permissions to see in Splunk platform. If you cannot access a log in your Splunk platform instance, you cannot access it in Splunk Observability Cloud. 

You can search logs that you have permissions to see for particular keywords, field names, or field values. 

To search your logs, follow these steps:

.. include:: /_includes/logs/query-logs.rst

When you add keywords, field names, or field values to the filters, Log Observer narrows the results in the Timeline and the Logs table so that only records containing the selected fields and values appear. To learn how you can use a productive search in the future, see :ref:`logs-save-share`.
