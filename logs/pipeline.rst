.. _logs-pipeline:

*****************************************************************
Manage the logs pipeline
*****************************************************************

.. meta created 2021-02-17
.. meta DOCS-1962

.. meta::
  :description: Manage the logs pipeline with log processing rules.

Add value to your raw logs by creating a pipeline to process logs as they come
into Observability Cloud. A pipeline is a set of sequential processing
rules, also known as processors, that transform your data or a subset of your
data as it arrives.

To add more control to processors, you add filters that determine the
processors to apply to a log.

On the pipeline lister page you can adjust the order in which your processors
run, edit processors, or delete processors.

.. note:: You can't edit or delete prepackaged processors.

Prepackaged processors appear at the beginning of the list of processors, and
they're identified by a lock icon. These prepackaged processors always execute
before any processors you define. You can't modify or reorder prepackaged processors.

One example of a prepackaged processor is the Level to severity attributed remapper.

Splunk Observability Cloud includes prepackaged processors for Kubernetes and
Cassandra.

Observability Cloud provides three types of log processors:

* :ref:`Field extraction processors <field-extraction-processors>`: Creates a subset of log data by extracting fields and values
* :ref:`Field copy processors <field-copy-processors>`: Creates a set of log data by moving field values from one field
  in the log record to a different field name in a new record.
* :ref:`Field redaction processors <field-redaction-processors>`: Redacts data to mask personally identifiable information

.. _field-extraction-processors:

Field extraction processors
----------------------------------------------------------------------------

Field extraction lets you find an existing field in your incoming logs and
create a processor based on the format of the field's value.

Field extraction helps you do the following tasks:

* Filter logs based on the extracted fields. To learn more about filtering, see :new-page-ref:`filter-logs-by-field`.
* Aggregate on extracted fields. To learn more, see :new-page-ref:`logs-aggregations`.

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

Creating Regex and Event Time field extractions allows you to filter and aggregate on the fields:
IP, time, method, and path. This enables you to create the query "Display a Visual Analysis of the number of
requests from {IP} broken down by {method}".

Additionally, the extracted fields begin appearing in the Fields summary panel along with their
top values and other statistics.

There are three types of field extraction. These are:

* Regex
* JSON
* Event Time

To start creating a field extraction, follow these steps:

#. From the main menu, go to :guilabel:`Organization Settings > Logs Pipeline Management`.
   A list of existing processors is displayed with the prepackaged processors displaying first.

#. Click :guilabel:`New Processing Rule`.
   Alternatively, you can launch the processor wizard from Log Observer.
   To do this, click into a log in the Raw Logs Table. The :guilabel:`Log Details` panel
   appears on the right. Click a field value then select :menuselection:`Extract field`.
   This takes you to :guilabel:`Define Processor`, the second step of the processor wizard.
   Skip to step 7.

#. Select :menuselection:`Field Extraction` as the processor type, then click :guilabel:`Continue`.
   This takes you to :menuselection:`Select sample`, the first step in the processor wizard.

#. To find a log that contains the field you want to extract, add filters to the
   filter bar until the Raw Logs Table displays a log with the desired field.

#. Click the log containing the field you want. A list of fields and values
   appears below the log line.

#. Click :guilabel:`Use as sample` next to the field you want to extract, then click :guilabel:`Next`.
   This takes you to :guilabel:`Define Processor`, the second step of the processor wizard.

#. Select the extraction processor type that you want to use.

#. From here, follow the steps to create the extraction processor type you selected:

   * :ref:`Regex processor <regex-processor>`
   * :ref:`JSON processor <json-processor>`
   * :ref:`Event Time processor <event-time-processor>`
   
.. _regex-processor:

Create a Regex processor
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The regular expression workspace lets you to extract fields from your data
and then create a new processor using regex. Pipeline Management makes
suggestions to help you write the appropriate regex for your processor.
You can modify the regex within the processor wizard.

To create a Regex processor, follow these steps:

#. Highlight one or more values in your sample and select :menuselection:`Extract field` from the drop-down menu.
#. Enter the name for your new field, then click :guilabel:`Validate`. Results display in a table.
#. Preview your rule in the table to ensure that the correct fields are extracted.
#. To apply your new rule to only a subset of incoming logs, add filters to the filter bar.
   The new rule will apply only to logs matching this filter.
#. In step 3 of the processor wizard entitled :guilabel:`Name, Save, and Review`, give your new rule a name and description.
#. Review your configuration choices, then click :guilabel:`Save`.
   The Logs Pipeline Management homepage displays a list of existing processors.
   Your new processor appears at the end of the list. It defaults to :guilabel:`Active` and
   immediately begins processing incoming logs. To disable your processor,
   click :guilabel:`Inactive`.
#. On the rule lister page, you can reorder, edit, or delete all processors except
   those that are prepackaged (shown with a lock).

.. _json-processor:

Create a JSON processor
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To create a JSON processor, follow these steps:

#. Add filters to the filter bar to define a matching condition.
   Pipeline Management only applies the new processor to log events that match this filter.
#. Preview your rule to ensure that Pipeline Management is extracting the correct field values.
#. If you see the correct field values in the results table, click :guilabel:`Next`. Otherwise, adjust your filter.
#. Add a name and description for your new rule, then click :guilabel:`Save`.
   The Logs Pipeline Management homepage displays a list of existing processors.
   Your new processor appears at the end of the list. It defaults to :guilabel:`Active` and immediately
   begins processing incoming logs. To disable your processor, click :guilabel:`Inactive`.
#. On the rule lister page, you can edit, reorder, or delete all processors
   except those that are prepackaged (shown with a lock).

.. _event-time-processor:

Create an Event Time processor
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To create an Event Time processor, follow these steps:

#. Select a time format from the drop-down list. The wizard looks for the selected format
   within your sample.
#. From the matches you see, select the time when the sample event occurred, then click :guilabel:`Next`.
#. Add filters to the filter bar to define a matching condition, then click :guilabel:`Next`.
   Pipeline Management only applies the new processor to log events that match this filter.
#. Give your new rule a name and description.
#. Review your configuration choices, then click :guilabel:`Save`.
#. The Logs Pipeline Management homepage displays a list of existing processors. 
   Your new processor appears at the end of the list. 
   It defaults to :guilabel:`Active` and immediately begins processing incoming logs. 
   To disable your processor, click :guilabel:`Inactive`.
#. On the rule lister page, you can edit, reorder, or delete all processors
   except those that are prepackaged (shown with a lock).

.. _field-copy-processors:

Field copy processors
--------------------------------------------------------------------------------

Field copy processors let you define a new relationship between new or existing fields.
One way to use field copy processors is to use OpenTelemetry mappings to help power your
related content suggestions.

To create a field copy processor, follow these steps:

#. From the main menu, go to :menuselection:`Organization Settings > Logs Pipeline Management`.
#. Click :guilabel:`New Processing Rule`.
#. Select :menuselection:`Field Copy`, then click :guilabel:`Continue`.
#. Enter a target field in the first text box.
   You can choose from available extracted fields in the drop-down list.
#. In the second text box, choose a field to which you want to map your target field.
   The drop-down list options suggest OpenTelemetry mappings,
   which help power your Related Content suggestions.
#. If you want to create multiple mappings, click :guilabel:`+ Add another mapping` and repeat
   steps 4 and 5; otherwise, click :guilabel:`Next`.
#. To apply your new rule to only a subset of incoming logs, add filters to the filter bar.
   The new rule is applied only to logs matching this filter. If you do not add a filter,
   the rule is applied to all incoming log events.
#. Preview your rule to ensure that Pipeline Management is extracting the correct field values, then click :guilabel:`Next`.
#. Give your new rule a name and description, then click :guilabel:`Save`.
#. The Logs Pipeline Management homepage displays a list of existing processors.
   Your new processor appears at the end of the list. It defaults to :guilabel:`Active` and
   immediately begins processing incoming logs. To disable your processor, click :guilabel:`Inactive`.
#. On the rule lister page, you can edit, reorder, or delete all processors
   except those that are prepackaged (shown with a lock).

.. _field-redaction-processors:

Field redaction processors
--------------------------------------------------------------------------------

Field redaction lets you mask data, including personally identifiable information.

To create a field redaction processor, follow these steps:

#. From the main menu, go to :menuselection:`Organization Settings > Logs Pipeline Management`.
#. Click :guilabel:`New Processing Rule`.
#. Select :menuselection:`Field Redaction`, then click :guilabel:`Continue`. This takes you to the first step in the processor wizard, Select Sample.
#. To find a log that contains the field you want to redact, add filters to the filter bar until the Raw Logs Table displays a log with the desired field.
#. Click the log containing the field you want. A list of fields and values appears below the log line.
#. Click :guilabel:`Use as sample` next to the field you want to redact, then click :guilabel:`Next`. This takes you to :guilabel:`Define Processor`, the second step of the processor wizard.
#. Select if you want to redact an entire field value or a partial field value. If you want to redact a partial field value, highlight the portion you want to redact. You can edit the Regex here.
#. Define a matching condition. To apply your new rule to only a subset of incoming logs, add filters to the filter bar. The new rule will apply only to logs matching this filter.
#. Give your new rule a name and description.
#. Review your configuration choices, then click :guilabel:`Save`. The Logs Pipeline Management homepage displays a list of existing processors. Your new processor appears at the end of the list. It defaults to :guilabel:`Active` and immediately begins processing incoming logs. To disable your processor, click :guilabel:`Inactive`.
#. On the rule lister page, you can reorder, edit, or delete all processors except those that are prepackaged (shown with a lock).

.. note:: If the field you redacted also appears in ``_raw``, it is still available in ``_raw``. Redact the field in ``_raw`` in addition to redacting the field itself.