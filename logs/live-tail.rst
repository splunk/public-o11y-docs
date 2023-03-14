.. _logs-live-tail:

**************************************************************************
Verify changes to monitored systems with Live Tail
**************************************************************************

.. meta::
  :description: Live Tail shows a near real-time feed of log messages as they come into Log Observer. See the impact of updates live. Verify that an integration is sending data.

.. note:: Only customers with a Splunk Log Observer entitlement in Splunk Observability Cloud can monitor systems with Live Tail. If you do not have a Log Observer entitlement and are using Splunk Log Observer Connect instead, see :ref:`logs-intro-logconnect` to learn what you can do with the Splunk Enterprise integration.

Live Tail displays a streaming view of log messages. Use Live Tail to do the following:

- Verify that an integration is sending data to Splunk Observability Cloud.
- View spans and traces that your APM services are sending to Observability Cloud.
- See the impact of configuration changes on your incoming data streams.


View the Live Tail time range
================================================================================

The Log Observer TimeLine time picker offers Live Tail as one of the time ranges.
In all other time ranges, the logs are already indexed by Splunk Cloud Platform services.
The logs displayed by Live Tail aren't indexed.

Exit Live Tail
================================================================================

To exit Live Tail and return to the Log Observer main page, use the time picker in the
navigation bar to select a different time range.

The Live Tail display
================================================================================

The Live Tail displays a sample of incoming logs because the amount of log data
is too large to display completely. Below the time picker menu in the navigation bar,
you can see the time when Live Tail started displaying logs and the percentage of logs displayed.
The number of logs visible in Live Tail depends on the amount of data you're
receiving.

Adjust incoming log speed in Live Tail
================================================================================

Because incoming data comes in quickly, you might have problems reading the incoming logs.
You can adjust the incoming log speed in the following ways:

- Scroll the table. Scrolling freezes the table view, letting you read a portion of
  the incoming log lines.
- Click :guilabel:`Stop` or :guilabel:`Play` in the navigation bar.
- Adjust the log speed using the :guilabel:`Logs/Second` slider. Next to the slider, you can see what percentage of logs are visible at the selected rate. As you increase the rate of logs per second, the :guilabel:`Showing 100% of logs` callout adjusts accordingly.

When you are not viewing the most recent events, you can view the most recent incoming event
by clicking :guilabel:`Jump to recent` at the end of the display.

The following examples use Live Tail to check that data is coming into the Splunk
Observability Suite after an integration with Kubernetes.

Verify an integration using Live Tail
================================================================================

To verify, for example, your integration of Kubernetes with Splunk Observability Cloud, use
one of of the techniques demonstrated in the following examples:

- :ref:`verify-integration-with-live-tail-filtering`
- :ref:`verify-integration-with-live-tail-keyword-highlighting`

.. _verify-integration-with-live-tail-filtering:

Example: Verify an integration with Live Tail filtering
--------------------------------------------------------------------------------

To use Live Tail filtering to verify your Kubernetes integration worked, follow these steps:

#. In Log Observer, click the navigation bar menu, select the :menuselection:`time picker`, then select
   :menuselection:`Live Tail` from the time picker drop-down list.

#. To add a filter, in the navigation bar click :guilabel:`Add Filter`.

#. Select the filter type you want to use:

   - To filter by keywords, click the :guilabel:`Keywords` tab.

   - To filter by fields in the log records, click the :guilabel:`Fields` tab.

#. In the :guilabel:`Find` text box, type the keyword or field that you want to filter on,
   then press Enter to filter the logs as they stream into the Live Tail display.

#. To filter for minimum or maximum values in a numeric field, enter a range in the
   :guilabel:`Min` and :guilabel:`Max` text boxes.

For example, if you add a filter for the log record field :monospace:`K8s.container.name`, you
see this field name in all the records in the display. If you don't see the field, then you
know that your integration might have problems.

Adding filters helps you find log records for a specific integration.


.. _verify-integration-with-live-tail-keyword-highlighting:

Example: Verify an integration with Live Tail keyword highlighting
--------------------------------------------------------------------------------

Live Tail highlighting helps you filter logs using keywords. You can specify
up to nine keywords at a time, and Live Tail displays each keyword it finds with a unique
color.

If you highlight nine keywords, you have to remove a keyword to add
another one.

To highlight keywords in log records, follow these steps:

#. In Log Observer, click the navigation bar menu, select the :menuselection:`time picker`, then select
   :menuselection:`Live Tail` from the time picker drop-down list.
#. In the navigation bar, type up to nine keywords in the :guilabel:`Enter keyword` text box, then press Enter.
   Live Tail displays each keyword it finds with a unique color.

