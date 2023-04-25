.. _logs-individual-log-connect:

***********************************************************************
View individual log details 
***********************************************************************

.. meta::
  :description: View the contents of an individual log, then create a field extraction to drill down further. See message, error, span ID, trace ID, and other fields.


After you find log records that contain a specific area, view the
contents of an individual record to get a precise view of the data related to
the problem. 

To view the contents of an individual log record, follow these steps:

#. Select a log record line in the Logs table to display the log details panel.
   This panel displays the entire record in JSON format as well as a table
   of each field and its value.
#. To do more with a particular field in the table, select the field value.
   Log Observer displays a drop-down list with 5 options:

   * To copy the field value to the clipboard, select :menuselection:`Copy`
   * To filter to the Logs table so it only displays log records containing the selected value, select :menuselection:`Add to filter`.
   * To filter the Logs table so it doesn't display log records containing the selected value, select :menuselection:`Exclude from filter`.
   * To add the field as a new column in the  Logs table, select :menuselection:`Add field as column`.
   * Select :menuselection:`View <field_name>` to go to the appropriate view in the Splunk Observability Cloud. For
     example, if you select a field related to Kubernetes, Observability Cloud displays related data in the Kubernetes Navigator.
     If you select fields related to APM, such as :menuselection:`View trace_id` or :menuselection:`View span_id`, Observability Cloud displays the trace or span in the APM Navigator.


