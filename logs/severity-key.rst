.. _severity-key:

*****************************************************************
Ensure the correct mapping of your severity key
*****************************************************************

.. meta::
  :description: Log Observer Connect relies on the correct mapping of the severity key. Confirm that your severity key is correctly mapped.

The Log Observer Connect timeline displays a histogram of logged events over time, grouped by values of the message field :guilabel:`severity`. The severity key is a field that all logs contain. It has the values :guilabel:`DEBUG`, :guilabel:`ERROR`, :guilabel:`INFO`, :guilabel:`UNKNOWN`, and :guilabel:`WARNING`. Your logs might use a different field name for the severity key. Because the severity key in many logs is called :guilabel:`level`, Log Observer Connect automatically remaps the log field :guilabel:`level` to :guilabel:`severity`.

If your logs call the severity key by a different name, that's okay. To ensure that Log Observer Connect can read your field, transform your field name to :guilabel:`severity` or add a :guilabel:`severity` alias to your field name. To transform your field name, see :new-page:`Extract fields from event data using Ingest Processor <https://docs.splunk.com/Documentation/SplunkCloud/9.3.2408/IngestProcessor/FieldExtractionPipeline>`. To add an alias to your field name, see :ref:`logs-alias`.

The mapping of your severity key and its values is case sensitive. The key and its values must appear exactly as follows:

* severity
* DEBUG
* ERROR
* INFO
* UNKNOWN
* WARNING 