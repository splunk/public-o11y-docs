.. _logs-processors:

*****************************************************************
Transform your data with log processing rules
*****************************************************************

.. meta::
  :description: Manage the logs pipeline with log processing rules, log metricization rules, and Infinite Logging rules. Customize your logs pipeline.

.. note:: Only customers with a Splunk Log Observer entitlement in Splunk Observability Cloud can create or manage log processing rules. If you do not have a Log Observer entitlement and are using Splunk Log Observer Connect instead, see :ref:`logs-intro-logconnect` to learn what you can do with the Splunk Enterprise integration.

Add value to your raw logs by creating log processing rules, also known as processors, to transform your data or a subset of your data as it arrives.

To add more control to processors, you can add filters that determine which logs a processor will be applied to.

On the Logs Pipeline Management page, you can adjust the order in which your processing rules run, edit processors, or delete processors.

.. note:: You can't edit or delete prepackaged processors.

Prepackaged processors appear at the beginning of the list of processors, and
they're identified by a lock icon. These prepackaged processors always execute
before any processors you define. You can't modify or reorder prepackaged processors.

One example of a prepackaged processor is the ``Level`` to ``severity`` attributed remapper.

Splunk Observability Cloud includes prepackaged processors for Kubernetes and
Cassandra.

Observability Cloud provides three types of log processors:

* :ref:`Field extraction processors <field-extraction-processors>` create a subset of log data by extracting fields and values.
* :ref:`Field copy processors <field-copy-processors>` create a set of log data by moving field values from one field
  in the log record to a different field name in a new record.
* :ref:`Field redaction processors <field-redaction-processors>` redact data to mask personally identifiable information.

Order of execution of logs pipeline rules
=============================================================================
Logs pipeline rules execute in the following order:

1. All log processing rules (field extraction, field copy, and field redaction processors)

2. All log metricization rules

3. All infinite logging rules

Because log processing rules execute first, you can create field extraction rules, then use the resulting fields in log metricization rules or infinite logging rules or both. For more information, see :ref:`logs-pipeline-sequence`.


.. _field-extraction-processors:

Field extraction processors
================================================================================
Field extraction lets you find an existing field in your incoming logs and
create a processor based on the format of the field's value.

Field extraction helps you do the following tasks:

* Filter logs based on the extracted fields. To learn more about filtering, see :ref:`logs-keyword`.
* Aggregate on extracted fields. To learn more, see :ref:`logs-aggregations`.

Consider the following raw log record

`10.4.93.105 - - [04/Feb/2021:16:57:05 +0000] "GET /metrics HTTP/1.1" 200 73810 "-" "Go-http-client/1.1" 23`

If you have not defined any processors in your logs pipeline, you can only do a keyword search on the sample log, 
which searches the ``_raw`` field. The following table shows how you can extract fields to define processing rules:

.. list-table::
   :header-rows: 1
   :widths: 50 50

   * - :strong:`Example of value to extract`
     - :strong:`Processor definition to use`
        
   * - IP address (10.4.93.105)
     - IP

   * - 04/Feb/2021:16:57:05 +0000
     - time

   * - GET
     - method

   * - /metrics
     - path

Creating Regex and event time field extractions allows you to filter and aggregate on the fields:
IP, time, method, and path. This enables you to create the query "Display a Visual Analysis of the number of
requests from {IP} broken down by {method}".

Additionally, the extracted fields begin appearing in the fields summary panel along with their
top values and other statistics.

There are three types of field extraction. These are:

* Regex processors
* JSON processors
* Event time processors
* KV parser processors

To start creating a field extraction, follow these steps:

#. From the navigation menu, go to :guilabel:`Data Configuration > Logs Pipeline Management`.
   A list of existing processors is displayed with the prepackaged processors displaying first.

#. Click :guilabel:`New Processing Rule`.
   
   Alternatively, you can launch the processor wizard from Log Observer.
   To do this, click into a log in the Logs table. The :guilabel:`Log Details` panel
   appears on the right. Click a field value then select :menuselection:`Extract field`.
   This takes you to :guilabel:`Define Processor`, the second step of the processor wizard.
   Skip to step 7.

#. Select :menuselection:`Field Extraction` as the processor type, then click :guilabel:`Continue`.
   This takes you to :menuselection:`Select sample`, the first step in the processor wizard.

#. To narrow your search for a log that contains the field you want to extract, you can select a time from the time picker or click :guilabel:`Add Filter` and add keywords or fields.

#. Click the log containing the field you want. A list of fields and values
   appears below the log line.

#. Click :guilabel:`Use as sample` next to the field you want to extract, then click :guilabel:`Next`.
   This takes you to :guilabel:`Define Processor`, the second step of the processor wizard.

#. Select the extraction processor type that you want to use.

#. From here, follow the steps to create the extraction processor type you selected:

   * :ref:`Regex processor <regex-processor>`
   * :ref:`JSON processor <json-processor>`
   * :ref:`Event time processor <event-time-processor>`
   * :ref:`KV parser processor<kv-processor>`
   
.. _regex-processor:

Create a Regex processor
--------------------------------------------------------------------------------
The regular expression workspace lets you to extract fields from your data
and then create a new processor using regex. Pipeline Management makes
suggestions to help you write the appropriate regex for your processor.
You can modify the regex within the processor wizard.

To create a regex processor, follow these steps:

#. Highlight the value of the field you want to extract in your sample and select :menuselection:`Extract field` from the drop-down menu.
#. Click into the field name box and enter a name for the field you selected. The default name is ``Field1``. Results display in a table.
#. Click `Edit regex` below the field name box if you want to modify the regex that the processor has automatically generated to create this rule based on your field name and value.
#. Preview your rule in the table to ensure that the correct fields are extracted.
#. To apply your new rule to only a subset of incoming logs, add filters to the content control bar.
   The new rule will apply only to logs matching this filter.
#. In step 3 of the processor wizard entitled :guilabel:`Name, Save, and Review`, give your new rule a name and description.
#. Review your configuration choices, then click :guilabel:`Save`. Your processor defaults to :guilabel:`Active` and immediately begins processing incoming logs. 
#. To see your new processor, go to :guilabel:`Data Configuration > Logs Pipeline Management`, expand the :guilabel:`Processing Rules` section, and find it in the list. You can reorder, edit, or delete all processors except those that are prepackaged (shown with a lock). To disable your processor, click :guilabel:`Inactive`.

.. _json-processor:

Create a JSON processor
--------------------------------------------------------------------------------
To create a JSON processor, follow these steps:

#. To apply your new rule to only a subset of incoming logs, click :guilabel:`Add Filter` and add a keyword or field. The new rule will apply only to logs matching this filter. Pipeline Management only applies the new processor to log events that match this filter.
#. Preview your rule to ensure that Pipeline Management is extracting the correct field values.
#. If you see the correct field values in the results table, click :guilabel:`Next`. Otherwise, adjust your filter.
#. Add a name and description for your new rule, then click :guilabel:`Save`. Your processor defaults to :guilabel:`Active` and immediately begins processing incoming logs. 
#. To see your new processor, go to :guilabel:`Data Configuration > Logs Pipeline Management`, expand the :guilabel:`Processing Rules` section, and find it in the list. You can reorder, edit, or delete all processors except those that are prepackaged (shown with a lock). To disable your processor, click :guilabel:`Inactive`.

.. _event-time-processor:

Create an event time processor
--------------------------------------------------------------------------------
To create an event time processor, follow these steps:

#. Select a time format from the drop-down list. The wizard looks for the selected format within your sample.
#. From the matches you see, select the time when the sample event occurred, then click :guilabel:`Next`.
#. Add filters to the content control bar to define a matching condition, then click :guilabel:`Next`.
   Pipeline Management only applies the new processor to log events that match this filter.
#. Give your new rule a name and description.
#. Review your configuration choices, then click :guilabel:`Save`. Your processor defaults to :guilabel:`Active` and immediately begins processing incoming logs. 
#. To see your new processor, go to :guilabel:`Data Configuration > Logs Pipeline Management`, expand the :guilabel:`Processing Rules` section, and find it in the list. You can reorder, edit, or delete all processors except those that are prepackaged (shown with a lock). To disable your processor, click :guilabel:`Inactive`. 

.. _kv-processor:

Create a KV parser processor
--------------------------------------------------------------------------------
A KV parser processor is a rule that parses key-value (KV) pairs. To create a KV parser processor, follow these steps:

#. To apply your new rule to only a subset of incoming logs, click :guilabel:`Add Filter` then add a keyword or field. The new rule will apply only to logs matching this filter.
#. Preview your rule to ensure that Pipeline Management is extracting the correct field values.
#. If you see the correct field values in the results table, click :guilabel:`Next`. Otherwise, adjust your filter.
#. Add a name and description for your new rule, then click :guilabel:`Save`. Your processor defaults to :guilabel:`Active` and immediately begins processing incoming logs. 
#. To see your new processor, go to :guilabel:`Data Configuration > Logs Pipeline Management`, expand the :guilabel:`Processing Rules` section, and find it in the list. You can reorder, edit, or delete all processors except those that are prepackaged (shown with a lock). To disable your processor, click :guilabel:`Inactive`. 


.. _field-copy-processors:

Field copy processors
================================================================================
Field copy processors let you define a new relationship between new or existing fields. One way to use Field Copy Processors is to use OpenTelemetry mappings to help power your :ref:`Related Content <get-started-relatedcontent>` suggestions.

To create a field copy processor, follow these steps:

#. From the navigation menu, go to :menuselection:`Data Configuration > Logs Pipeline Management`.
#. Click :guilabel:`New Processing Rule`.
#. Select :menuselection:`Field Copy`, then click :guilabel:`Continue`.
#. Enter a target field in the first text box.
   You can choose from available extracted fields in the drop-down list.
#. In the second text box, choose a field to which you want to map your target field.
   The drop-down list options suggest OpenTelemetry mappings,
   which help power your Related Content suggestions.
#. If you want to create multiple mappings, click :guilabel:`+ Add another field copying rule` and repeat steps 4 and 5; otherwise, click :guilabel:`Next`.
#. To apply your new rule to only a subset of incoming logs, add filters to the content control bar.
   The new rule is applied only to logs matching this filter. If you do not add a filter,
   the rule is applied to all incoming log events.
#. Preview your rule to ensure that Pipeline Management is extracting the correct field values, then click :guilabel:`Next`.
#. Give your new rule a name and description, then click :guilabel:`Save`. Your processor defaults to :guilabel:`Active` and immediately begins processing incoming logs. 
#. To see your new processor, go to :guilabel:`Data Configuration > Logs Pipeline Management`, expand the :guilabel:`Processing Rules` section, and find it in the list. You can reorder, edit, or delete all processors except those that are prepackaged (shown with a lock). To disable your processor, click :guilabel:`Inactive`. 

.. _field-redaction-processors:

Field redaction processors
================================================================================
Field redaction lets you mask data, including personally identifiable information.

To create a field redaction processor, follow these steps:

#. From the navigation menu, go to :menuselection:`Data Configuration > Logs Pipeline Management`.
#. Click :guilabel:`New Processing Rule`.
#. Select :menuselection:`Field Redaction`, then click :guilabel:`Continue`. This takes you to the first step in the processor wizard, Select :guilabel:`Sample`.
#. To find a log that contains the field you want to redact, add filters to the content control bar until the Logs table displays a log with the desired field.
#. Click the log containing the field you want. A list of fields and values appears below the log line.
#. Click :guilabel:`Use as sample` next to the field you want to redact, then click :guilabel:`Next`. This takes you to :guilabel:`Define Processor`, the second step of the processor wizard.
#. Select if you want to redact an entire field value or a partial field value. If you want to redact a partial field value, highlight the portion you want to redact. You can edit the regex here.
#. Define a matching condition. To apply your new rule to only a subset of incoming logs, add filters to the content control bar. The new rule will apply only to logs matching this filter.
#. Give your new rule a name and description.
#. Review your configuration choices, then click :guilabel:`Save`. Your processor defaults to :guilabel:`Active` and immediately begins processing incoming logs. 
#. To see your new processor, go to :guilabel:`Data Configuration > Logs Pipeline Management`, expand the :guilabel:`Processing Rules` section, and find it in the list. You can reorder, edit, or delete all processors except those that are prepackaged (shown with a lock). To disable your processor, click :guilabel:`Inactive`. 

.. note:: If the field you redacted also appears in ``_raw``, it is still available in ``_raw``. Redact the field in ``_raw`` in addition to redacting the field itself.

Log processing rules limits
================================================================================
An organization can create a total of 128 log processing rules. The 128 rule limit includes the combined sum of field extraction processors, field copy processors, and field redaction processors.