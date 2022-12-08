.. _logs-individual-log-connect:

***********************************************************************
View individual log details 
***********************************************************************

.. meta created 2022-12-08
.. meta DOCS-4768

.. meta::
  :description: View problem details in an individual log

The previous topic, Filter by fields from logs, filtered logs to find the error that appeared with the greatest frequency. Clicking the most frequent error value helps you focus on logs that contained the :strong:`could not retrieve product` error.

After you find log records that contain a specific area, view the
contents of an individual record to get a precise view of the data related to
the problem. 

To view the contents of an individual log record, follow these steps:

#. Click a log record line in the Logs table to display the Log Details panel.
   This panel displays the entire record in JSON format as well as a table
   of each field and its value.
#. To do more with a particular field in the table, hover over the field value, then click the :strong:`More` menu.
   Log Observer displays a drop-down list with 5 options:

   * To copy the field value to the clipboard, select :menuselection:`Copy`
   * To filter to the Logs table so it only displays log records containing the selected value, select :menuselection:`Add to filter`.
   * To filter the Logs table so it doesn't display log records containing the selected value, select :menuselection:`Exclude from filter`.
   * To add the field as a new column in the  Logs table, click :menuselection:`Add field as column`.
   * Select :menuselection:`View <field_name>` to go to the appropriate view in the Splunk Observability Cloud. For
     example, if you click a field related to Kubernetes, Observability Cloud displays related data in the Kubernetes Navigator.
     If you click fields related to APM, such as :menuselection:`View trace_id` or :menuselection:`View span_id`, Observability Cloud displays the trace or span in the APM Navigator.


