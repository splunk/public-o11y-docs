.. _severity-key:

*****************************************************************
Ensure the correct mapping of your severity key
*****************************************************************

.. meta::
  :description: Log Observer Connect relies on the correct mapping of the severity key. Confirm that your severity key is correctly mapped.

The Log Observer Connect timeline displays a histogram of logged events over time, grouped by values of the message field :guilabel:`severity`. The severity key is a field that all logs contain. It has the values :guilabel:`debug`, :guilabel:`error`, :guilabel:`info`, :guilabel:`unknown`, and :guilabel:`warning`. Your logs might use a different field name for the severity key. 

If your logs call the severity key or its values by different names, that's okay. Ensure that Log Observer Connect can read your field and value names. Log Observer Connect assigns :guilabel:`unknown` to all values that it does not recognize.

.. note:: The names of your severity key and its values are not case sensitive. 

Your severity key can have any of the following names:

* severity
* level
* otel.log.severity.text

The following table lists the values that Log Observer Connect recognizes for each severity name:

.. list-table::
   :header-rows: 1
   :widths: 50, 50

   * - :guilabel:`Severity field names`
     - :guilabel:`Severity value names`

   * - severity
     - | info, information
       | err, error
       | warn, warning
       | debug
       | critical

   * - level
     - | info, information
       | err, error
       | warn, warning

   * - otel.log.severity.text
     - | normal
       | warn, warning


If your severity key or values do not match any of the names in the previous table, do one of the following to turn them to names that Log Observer Connect recognizes:

* Use a field extraction to transform your field name. See :new-page:`Extract fields from event data using Ingest Processor <https://docs.splunk.com/Documentation/SplunkCloud/9.3.2408/IngestProcessor/FieldExtractionPipeline>` to learn how.

* Add a :guilabel:`severity` alias to your field name.  See :ref:`logs-alias` to learn how.

When you create an alias for your severity key name, the original key name and its aliases continue to function for Log Observer queries. On the Log Observer timeline histogram, the severity key name and all its aliases are combined into one and represented as "severity". 