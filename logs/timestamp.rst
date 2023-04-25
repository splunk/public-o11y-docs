.. _logs-timestamp:

*****************************************************************
Where does a log’s logical time come from?
*****************************************************************

.. meta::
  :description: Log Observer determines a log’s time and assigns it to _time. Time comes from event time processor, HEC protocol timestamp, or entrance into Observability Cloud.

A log’s logical time can come from different places, depending on what data is available for the log. Your logs may have fields, such as ``timestamp`` or ``Time``, that sound like the log’s logical time. However, Log Observer determines the log’s logical time and assigns it to the field, ``_time``. If your logs already contain the field ``_time``, Log Observer overwrites it.

Log Observer applies the following three rules, in priority order, to determine each log’s logical time:

1. The time matched and parsed by any rule you created using an event time processor, a log processing rule (See :ref:`event-time-processor` for more information.)
2. The timestamp sent as part of the HTTP Event Collector (HEC) protocol as the event time
3. The time when the log event hits Splunk Observability Cloud

First, Log Observer checks for a matching event time processor, rule 1 in the preceding list. If there is a match, it is used as the logical time. Log Observer prioritizes an event time processor rule first because it was a rule you created to determine your logs’ logical time. 

If there is no match to an event time processor rule, Log Observer checks for a timestamp sent as part of the HEC protocol as the event time. If there is a HEC protocol timestamp, it becomes that log’s logical time in Log Observer.

If there is no HEC protocol timestamp, Log Observer uses the time when the log event first hits Splunk Observability Cloud as the log’s logical time.