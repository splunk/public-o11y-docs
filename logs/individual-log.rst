.. _logs-individual-log:

***********************************************************************
View individual log details
***********************************************************************

.. meta::
  :description: View and search a log's fields and values in JSON. Link to related content. 

After you find a set of log records that contain specific useful information, you can view the contents of an individual record to get a complete view of the data in the log, broken down by fields and values and displayed in JSON format in the :strong:`Fields` panel. You can also see the number of times each field appears in all of your logs. 

To view the contents of an individual log record, follow these steps:

#. Select a log record line in the Logs table to display the Log Details panel.

   This panel displays the entire record in JSON format as well as a table of each field and its value.

#. To do more with a particular field in the table, select the field value.

   Log Observer displays a drop-down list with 5 options:

   * To copy the field value to the clipboard, select :menuselection:`Copy`
   * To filter to the Logs table so it only displays log records containing the selected value, select :menuselection:`Add to filter`.
   * To filter the Logs table so it doesn't display log records containing the selected value, select :menuselection:`Exclude from filter`.
   * To add the field as a new column in the  Logs table, select :menuselection:`Add field as column`.
   * Select :menuselection:`View <field_name>` to go to the appropriate view in the Splunk Observability Cloud. For
     example, if you select a field related to Kubernetes, Splunk Observability Cloud displays related data in the Kubernetes Navigator.
     If you select fields related to APM, such as :menuselection:`View trace_id` or :menuselection:`View span_id`, Splunk Observability Cloud displays the trace or span in the APM Navigator.
