.. _logs-alias:

*****************************************************************
Create field aliases
*****************************************************************

.. meta::
  :description: Aliases are alternate names for a field that allows you to search for it by multiple names. Aliasing does not rename or remove the original field.

An alias is an alternate name that you assign to a field, allowing you to use that name to search for events that contain that field. An alias is added to the event alongside the original field name to make it easier to find the data you want and to connect your data sources through :ref:`Related Content <get-started-relatedcontent>` suggestions.

:strong:`Field Aliasing` occurs at search time, not index time, so it does not transform your data. Field Aliasing does not rename or remove the original field name. When you alias a field, you can search for it by its original name or by any of its aliases.

When to use Field Aliasing
================================================================================
Use Field Aliasing when the following situations are true:

- You use Log Observer Connect to get logs data, and do not have access to Log Observer Pipeline Management. 
- You do not want to use any indexing capacity by creating additional log processing rules.
- You want to retain your original field names, so you do not want to create a log processing rule, which transforms your data at index time. 
- You want the new alias to affect every log message, even those that came in from a time before you created the alias.
- You want to display a field separately at the top of the log details flyout


Field Aliasing examples
================================================================================

Displaying a field separately in the log details flyout
--------------------------------------------------------------------------------
For convenience, your team can choose to always display a particular field separately at the top of the log details flyout. To display the field of your choice separately, alias the desired field to the ``message`` field. The log details flyout in Log Observer always displays the ``message`` field at the top. When you alias another field to the ``message`` field, it appears in the standalone section called :strong:`MESSAGE` at the top of the log details flyout. 

For example, say your team most frequently uses the ``summary`` field. Add an alias for the ``summary`` field called ``message``. The ``summary`` field still exists but is also known as ``message`` and appears in the :strong:`MESSAGE` section of the log details flyout on the right side of the screen.

.. image:: /_images/logs/log-observer-message-field2.png
   :width: 99%
   :alt: This image shows the location of the message field in a separate section at the top of the log details flyout.

Enabling Related Content
--------------------------------------------------------------------------------
For example, say Observability Cloud receives the following telemetry data:

* Splunk APM receives a trace with the metadata field ``trace_id: 2b78e7c951497655``
* Splunk Log Observer receives a log with the metadata field ``trace.id:2b78e7c951497655``

Although these refer to the same trace ID value, the log and the trace cannot be correlated in Observability Cloud because the field names, ``trace_id`` and ``trace.id`` do not match. In this case, alias your log metadata field ``trace.id`` to ``trace_id`` using Field Aliasing. When the field names in APM and Log Observer match, the trace and the log with the same trace ID value can be correlated in Observability Cloud. Then when you are viewing the trace in APM, you can click directly into the log with the same trace ID value and view the correlated log in Log Observer.

Normalizing field names
--------------------------------------------------------------------------------
One data source might have a field called ``http_referrer``. This field might be misspelled in your source data as ``http_referer``. Use field aliases to capture the misspelled field in your original source data and map it to the expected field name without modifying your logging code.

You may have two data sources that call the same field by somewhat different names. For example, one data source might have a field called ``EventID`` while another data source might have a field called ``EventRecordID``. You can tell by the values that these fields represent the same thing. You can create a field alias that maps ``EventID`` to ``EventRecordID`` to aggregate all logs with either of those field names to the field ``EventRecordID`` for analysis in Log Observer.

Create a new field alias
================================================================================
To create a new field alias, follow these steps:

1. In Splunk Observability Cloud navigation menu, go to :guilabel:`Settings > Log Field Aliasing` and click :guilabel:`Add a new alias`.

2. In :guilabel:`Original field name`, enter the name of the field you want to create an alias for. Start typing then select the field name you want from the drop-down list of all available fields.

3. In :guilabel:`Alias`, enter the new name that you want this field to have in addition to its original name. A list of other existing field names appears in the drop-down list. Click :guilabel:`Save and Activate`.

4. Click :guilabel:`Save and Activate`.

Your new field alias appears in Your aliases and defaults to active. It is now applied to your search-time queries. To deactivate the alias, find the field in Your aliases and click the toggle next to Active.


Deactivate or delete a field alias
================================================================================
You can deactivate or delete a field alias if you do not want the alias to be applied to your search-time queries. You cannot edit a field alias. Instead, you must delete it and create a new one.

To deactivate or delete a field alias, do the following:

1. Go to :guilabel:`Settings > Log Field Aliasing`.

2. Find the alias you want to deactivate or delete in the Your aliases list.

3. To deactivate the alias, click the toggle next to :guilabel:`Active` in the :guilabel:`STATUS` column. To delete the alias, click the trash icon in the row for that alias.