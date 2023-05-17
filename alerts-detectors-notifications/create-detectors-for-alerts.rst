.. _create-detectors:

************************************
Create detectors to trigger alerts
************************************

.. meta::
   :description: How to create detectors to trigger alerts.

A :term:`detector` monitors signals on a plot line, as on a chart, and triggers alert events and clear events based on conditions you define in rules. You can think of a detector as a chart that can trigger alerts when a signal's value crosses specified thresholds defined in alert rules.

Create detectors
=============================================================================

The main steps involved in creating a detector are:

1. Choose :ref:`how to create the detector <how-to-create-detector>`.

2. Add :ref:`alert rules <build-rules>` to the detector that specify when alerts must be triggered.

Alert rules are also called build rules. They use settings you specify for :ref:`condition-reference` to define thresholds that trigger alerts. When a detector determines that the conditions for a rule are met, it triggers an alert, creates an event, and sends notifications, if specified. 

Detectors can send notifications through email, as well as through other systems, such as Slack, or by using a webhook. To learn more, see :ref:`admin-notifs-index`.

You can find active alerts and existing detectors in tabs on the Alerts page. Find events in the Events sidebar, available from within any dashboard.

When you configure alert settings in a detector rule, an alert preview appears. The alert preview can help you adjust your settings as you create the detector, but also helps when you are editing existing detectors. To learn more, see :ref:`preview-detector-alerts`.


.. _how-to-create-detector:

Choose how to create a detector
=============================================================================

There are several ways to create a detector.

-  You can clone an existing detector if you or someone else in your organization have already created detectors that you want to modify, or if you want to learn more about detectors.

- Customize AutoDetect detectors. See :ref:`autodetect-customize`.

-  Start from the Detector tab to create detectors that are based on what you are currently viewing, such as a chart or the Infrastructure Navigator. See :ref:`create-detector-from-chart`.

-  Create a detector from a chart to preselect one of the chart signals as the signal to be monitored. See :ref:`create-detector-from-chart`.

-  Create a detector from scratch if you know how to create charts from scratch and none of the other detector creation options meets your needs. See :ref:`create-detector-from-scratch`.

-  Use the API to programmatically create detectors, instead of creating them through the user interface. See :ref:`create-via-api`.

.. _clone-detector:

Clone an existing detector
-------------------------------------------------------------------

You can see a list of existing detectors in the Detectors tab on the Alerts page. If you see one that represents a good starting point for a detector you want to create, you can open it and then select :menuselection:`Clone` from the detector's actions menu (|more|) to save it as a new detector.

After cloning and saving the new detector, see :ref:`build-rules`.

.. _create-detector-from-chart:

Create a detector from a chart
-------------------------------------------------------------------

If there is a chart that monitors a signal that you want to alert on, you can use that chart to create a detector. Creating a detector from a chart pre-selects one of the chart's signals as the signal to be monitored.

Follow these steps to create the detector:

#. Select the bell icon on a chart to open the :strong:`Detector` menu.
#. Select :menuselection:`New detector from chart`.

- If you are not monitoring services using Splunk APM, the Alert Rule Builder is displayed automatically. To continue, see :ref:`build-rules`.

- If the chart contains only metrics relevant to APM, such as latency or error rate, the Alert Rule Builder is displayed automatically.

- If you are using APM and the chart contains both APM and infrastructure or custom metrics, you need to choose which type of detector you want to create. To continue after choosing a type and selecting :guilabel:`Proceed to alert signal`, see :ref:`build-rules`.

After you create a detector from a chart, a :ref:`link to the new detector<link-detector-to-chart>` is automatically added to the chart.

.. _create-detector-from-scratch:

Create a detector from scratch
-------------------------------------------------------------------

To create a new detector from scratch, you can either select the :guilabel:`New Detector` button on the Alerts or Detectors tab on the Alerts page, or select :menuselection:`Detector` from the Create menu (plus sign) on the navigation bar.

-  If you are not monitoring services using Splunk APM, the Alert Rule Builder appears automatically. To continue, skip to :ref:`build-rules`.

-  If you are using Splunk APM, you can create a detector designed to alert on conditions related to tracing, such as latency or error rate.

   -  If you want to create an APM detector, select that rule type and then select :guilabel:`Proceed to alert signal`. For details about the default alert conditions available for detectors in Splunk APM, see :ref:`alert-conditions-apm`.

   -  If you want to create an Infrastructure or Custom Metrics rule type, select that rule type and then select :guilabel:`Proceed to alert signal`. For instructions on building the rule, see :ref:`build-rules`.

.. _create-via-api:

Create a detector using the API
-------------------------------------------------------------------

Using the API to create a detector provides a number of capabilities that are not available in the UI, letting you build detectors with more advanced rules and conditions. You can view these detectors in the UI. The program text appears in place of the signals displayed in standard detectors.

-  For general information on creating detectors using the API, see the :new-page:`Detect Anomalies with Detectors <https://dev.splunk.com/observability/docs/detectors/detectors_events_alerts/>` topic in the Splunk Observability Cloud Developer Guide.

-  For information on using the UI to edit detectors created using the API, see :ref:`v2-detector-signalflow`.

.. note:: If a detector display includes a SignalFlow tab, you are viewing a detector created programmatically using the :new-page:`Observability Cloud Detectors API <https://dev.splunk.com/observability/reference/api/detectors/latest>`. If you are familiar with that API, you can use the detector display to view and edit the detector code and make changes to the detector rules.


.. _build-rules:

Build detector rules
=============================================================================

-  In the Alert Signal tab, you select one or more signals to monitor for unusual behavior. To learn more, see :ref:`alert-signal`.

-  In the :ref:`Alert condition <alert-condition>` and :ref:`Alert settings <alert-settings>` tabs, you specify criteria for triggering an alert.

.. note:: If you don't see the Alert Signal, Alert Condition, or Alert Settings tabs, you are viewing a detector created using the API. For more information, see :ref:`v2-detector-SignalFlow`.

-  In the :ref:`Alert message <alert-message>` and :ref:`Alert recipients <alert-recipients>` tabs, you specify who can receive notifications, and add notes that are included in the notifications.

-  In the :ref:`Activate <activate-detector>` tab, you name the rule and enable the detector.

After you activate the detector, it begins monitoring the signal immediately. When the signal meets the specified criteria, the detector triggers alerts, creates events, and sends the specified message to the alert recipients.

.. _alert-signal:

Select alert signals
-------------------------------------------------------------------

In the :strong:`Alert signal` tab, define the signal to monitor by entering a metric and corresponding analytics.

.. note:: If you don't see an Alert signal tab, you are viewing a detector that was created using the API; signals are defined in the :ref:`SignalFlow tab<v2-detector-signalflow>`.

If you are creating a detector from scratch, you must first specify the signal or signals you want to monitor. Specifying a signal for a detector is similar to specifying a signal in a chart in the Plot Editor tab in the Chart Builder. When you start typing, a list of metrics and events displays. Select the metric you want to monitor, then add any filters or analytics. To learn more, see :ref:`specify-signal`

If you want to add more signals, select :guilabel:`Add Metric or Event` or :guilabel:`Add Formula`. Note that you can add events to be displayed on the chart, but you cannot select an event as the signal to be monitored.

.. note:: If you are creating a detector :ref:`from a chart<create-detector-from-chart>` or by :ref:`cloning a detector<clone-detector>`, you might not need to add any new signals. However, if you do add new signals to the detector, the signals is not added to the original chart or detector.

.. _compound-conditions:

If the detector has multiple signals, you can choose whether to monitor one or more signals.

-  To monitor one signal, select the bell icon for the :strong:`Detector` menu to specify which signal you want to monitor. A blue bell indicates the signal that is being monitored.

-  To create compound conditions based on the values of more than one signal, for example, signal A is higher than ``x`` OR signal B is higher than ``y``, select the multiple signals icon. This option is available only if the alert condition is a Custom Threshold.

Continue to the next tab to select a condition for the detector's rule.

.. _alert-condition:

Select alert conditions
-------------------------------------------------------------------

In the :strong:`Alert condition` tab, you select the type of condition that triggers an alert.

If you have chosen to monitor multiple signals, the only available alert condition is Custom Threshold.

.. note:: If you don't see an Alert condition tab, you are viewing a detector that was created using the API; alert conditions are defined in the :ref:`SignalFlow tab<v2-detector-signalflow>`.

Splunk Infrastructure Monitoring and Splunk APM provide several built-in alert conditions to make it simple for you to create robust alert conditions without needing to build advanced conditions behind the scenes.

The following table summarizes the available built-in alert conditions for Infrastructure Monitoring and Custom Metrics detectors.

.. _condition-ref-table:

.. list-table::
   :header-rows: 1
   :widths: 20,30,40

   * - :strong:`Name`
     - :strong:`Description`
     - :strong:`Examples of summary`


   * - :ref:`static-threshold`

     - Alert when a signal crosses a static threshold
     - Availability over the last day is lower than 99.9.

   * - :ref:`heartbeat-check`
     - Alert when a signal has stopped reporting for some time
     - ``Host-linux-001`` has not reported for 15 minutes.

   * - :ref:`resource-running-out`

     - Detect when a signal is projected to reach a specified minimum or maximum value
     - ``disk_space_available`` is projected to decrease to zero within 24 hours. ``cpu.utilization`` is projected to reach 95 within 2 hours.

   * - :ref:`outlier-detection`
     - Alert when the signal from one data source differs from similar data sources
     - The number of logins in the last 10 minutes for this instance is 3 standard deviations lower than other instances in the same AWS availability zone.

   * - :ref:`sudden-change`
     - Alert when a signal is different from its normal behavior based on mean of preceding window or percentile of preceding window
     - All the values for ``cpu.utilization`` received in the last 15 |nbsp| minutes are at least |nbsp| 3 standard deviations higher than the mean of the preceding hour. All the values for ``latency`` received in the last 10 minutes are greater than 99% of the values of the preceding 1 hour.

   * - :ref:`hist-anomaly`
     - Alert when a signal differs by a specified amount when compared to similar periods in the past
     - The average number of logins in the last 2 hours is [30% higher] [3 standard deviations higher] than the average for this same two hours last week.

   * - :ref:`custom-threshold`
     - Alert when a signal crosses another signal, or when you want to specify compound conditions using AND and OR operators.
     - Example 1 - The value for ``cache_misses`` is higher than ``cache_hits``. Example 2 - The value for ``cache_misses`` is higher than ``cache_hits`` OR the value for ``cache_misses_percent`` is higher than 10.

.. note:: If you want to create compound conditions using AND or OR operators on the Alert Settings tab, you must use the Custom Threshold condition. This limitation applies whether you are monitoring a single signal or multiple signals.

After you have selected the alert condition, continue to the next tab to specify the settings that trigger alerts.

.. _alert-settings:

Specify alert settings
-------------------------------------------------------------------

In the :strong:`Alert settings` tab, you specify the settings that trigger an alert.

.. note:: If you don't see an Alert settings tab, you are viewing a detector that was created using the API; alert settings are defined in the :ref:`SignalFlow tab<v2-detector-signalflow>`.

The available settings vary depending on the alert condition you selected.

.. note:: If you are using the Custom Threshold condition, you can select :guilabel:`Add another condition` to create compound conditions using AND and OR operators. For more information about compound conditions, see :ref:`custom-threshold`.

In the chart, you see a preview of the alerts that are triggered based on the settings you selected. For more information on using the preview, see :ref:`preview-detector-alerts`.

After you have specified settings for triggering alerts, continue to the next tab to create a message that is sent when the alert is triggered.

.. _alert-message:

Alert messages
-------------------------------------------------------------------

In the :strong:`Alert message` tab, you specify the severity of the alert and the information you want to include in the notification message.

.. _severity:

Severity
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Specify the importance of the alerts generated by this rule. Splunk Observability Cloud has five severity labels: ``Critical``, ``Major``, ``Minor``, ``Warning``, and ``Info``. Each severity label has a different color, and event markers appear on charts in the associated color.

You can create multiple rules to generate alerts with different severity levels for similar conditions, for example:

-  Critical alert for the alert condition :ref:`resource-running-out` set to low trigger sensitivity
-  Major alert for the same condition set to medium sensitivity
-  Minor alert for same the condition set to high sensitivity

Another example might be:

-  Critical alert for the alert condition :ref:`heartbeat-check` where the value for :strong:`Hasn't reported for` is 60 minutes
-  Major alert for the same condition set at 30 minutes
-  Minor alert for same the condition set at 15 minutes

The easiest way to do this is to create a rule at one severity, select :menuselection:`Clone` from the rule's actions menu (|more|) on the right side of the screen, and then edit the settings and severity.

.. _message:

Message preview
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Displays a default message that is sent when an alert is triggered or cleared. To edit the subject or the content of the message, select :guilabel:`Customize`; you can see the code and variables used to construct the message. Available variables are shown to the right of the message area while you are editing the message.

Note that the use of variables is supported only in the message subject and body, not in the Runbook or Tip fields.

.. image:: /_images/images-detectors-alerts/customize-message.png
   :width: 99%
   :alt: This image shows the message editor.

You can also use Markdown in the message.

.. _message-variables:

When entering a variable in the message, typing the first few letters narrows down the list of variables shown on the right. If only one is shown, pressing Tab adds it to the message. If more than one is shown, pressing Tab adds the first one in the list to the message.

The following tables describe the variables and helper functions you can use when creating a custom message. Use triple braces where indicated so that the variable value is not escaped.

.. Note:: :ref:`Different additional variables may be available<condition-variables>` depending on the alert condition you specify. If you change the alert condition after customizing the message, an icon on the Message preview tab appears.

   .. image:: /_images/images-detectors-alerts/message-tab-icon.png
      :alt: This image shows the message tab icon.

   This is to remind you to review the message, since some variables you used might no longer apply to the new condition you selected. The icon is removed when you navigate away from the Message preview tab.

|br|


:strong:`Detector and rule details`

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - :strong:`Variable`
     - :strong:`Description`

   * - {{{detectorName}}}
     - The name of this detector

   * - {{{ruleName}}}
     - The name of the rule that triggered the alert

   * - {{ruleSeverity}}
     - The severity of this rule: ``Critical``, ``Major``, ``Minor``, ``Warning``, or ``Info``

   * - {{{readableRule}}}
     - The readable description of this rule. For example: "The value of metric.name.here is above 100".

   * - {{{runbookUrl}}}
     - URL of page to see when this alert is triggered

   * - {{{tip}}}
     - Plain text suggested first course of action, such as a command line to run.

   * - {{detectorId}}
     - The ID of this detector. You can use this to programmatically reference this detector.

   * - {{detectorUrl}}
     - The URL of this detector


|br|


:strong:`Alert details`

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - :strong:`Variable`
     - :strong:`Description`

   * - | There are two variations of this variable:
        
       * {{timestamp}}
       * {{dateTimeFormat timestamp format="short"}}
     - * {{timestamp}} gives the UTC timestamp of this alert in the following format:
         ``Wed, 8 Mar 2023 22:11:32 GMT``
       * {{dateTimeFormat timestamp format="short"}} gives the UTC timestamp of this alert in UNIX time:
         ``1678313492000``
       
       | Note: When an alert fires or clears, it always generates a timestamp in UTC. However, in the preview message for the alert, you will see this timestamp in your UI time zone, which might be different from GMT.
         
   * - {{anomalyState}}
     - The state of this alert (OK or ANOMALOUS)

   * - {{anomalous}}
     - Boolean; true indicates that the alert triggered

   * - {{normal}}
     - Boolean; true indicates that the alert cleared

   * - {{imageUrl}}
     - The URL for the preview image shown in the notification message

   * - {{incidentId}}
     - The ID of this incident. The incidentID is the same for both the trigger and the clear alerts.


|br|




:strong:`Signal details`

.. list-table::
   :header-rows: 1
   :widths: 40 60

   * - :strong:`Variable`
     - :strong:`Description`

   * - {{inputs.A.value}}
     - The value of the signal on plot line A

   * - {{inputs.B.value...}}
     - (The value of other signals in the detector)

   * - {{{dimensions}}}
     - List of all dimensions for the signal being monitored, in the following format:
         {sf_metric=metricName, dimensionNameA=valueA, dimensionNameB=valueB, ...}

   * - {{dimensions.dimensionName}}
     - The value of the dimension "dimensionName" for the signal being monitored

   * - {{dimensions.dimensionName2...}}
     - The value of other dimensions for the signal being monitored

   * - {{dimensions.[dimension.name.3...]}}
     - The value of other dimensions for the signal being monitored. When dimension names contain dots (.), you must enclose them in square brackets ([]) for the variable to work.


|br|


:strong:`ORGANIZATION DETAILS`

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - :strong:`Variable`
     - :strong:`Description`

   * - {{organizationId}}
     - The organization ID. You can use this to programmatically reference this organization.


|br|



:strong:`Helper functions`

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - :strong:`Option`
     - :strong:`Description`

   * - {{#if}}  {{else}}   {{/if}}
     - Conditional, e.g.
         {{#if anomalous}}Alert triggered at {{timestamp}} {{else}} Alert cleared at {{timestamp}} {{/if}}

   * - {{#notEmpty dimensions}} {{/notEmpty}}
     - If there are dimensions associated with the signal, e.g.
         {{#notEmpty dimensions}} Signal details: {{{dimensions}}} {{/notEmpty}}



Here is an example of a default message that you can customize:

.. code-block:: none

   {{#if anomalous}}
      Rule "{{ruleName}}" in detector "{{detectorName}}" triggered at {{timestamp}}.
   {{else}}
      Rule "{{ruleName}}" in detector "{{detectorName}}" cleared at {{timestamp}}.
   {{/if}}

   {{#if anomalous}}
   Triggering condition: {{{readableRule}}}
   {{/if}}

   {{#if anomalous}}Signal value: {{inputs.A.value}}
   {{else}}Current signal value: {{inputs.A.value}}
   {{/if}}

   {{#notEmpty dimensions}}
   Signal details:
   {{{dimensions}}}
   {{/notEmpty}}

   {{#if anomalous}}
   {{#if runbookUrl}}Runbook: {{{runbookUrl}}}{{/if}}
   {{#if tip}}Tip: {{{tip}}}{{/if}}
   {{/if}}



.. _condition-variables:


The following tables describe the additional variables you can use when creating a custom message for specific alert conditions. 



:strong:`Resource running out`

.. list-table::
   :header-rows: 1
   :widths: 40 60

   *  - :strong:`Variable`
      - :strong:`Description`


   *  - {{inputs.hours_left.value}}
      - Number of hours left before reaching empty or capacity

   *  - {{event_annotations.fire_forecast_ahead}}
      - Threshold for triggering alert, in hours

   *  - {{event_annotations.clear_forecast_ahead}}
      - Threshold for clearing alert, in hours





:strong:`Outlier detection`

.. list-table::
   :header-rows: 1
   :widths: 40 60

   *  - :strong:`Variable`
      - :strong:`Description`

   *  - {{inputs.promoted_population_stream.value}}
      - Signal being monitored

   *  - {{inputs.fire_bot.value}}
      - Threshold for triggering alert when value is lower than the threshold

   *  - {{inputs.clear_bot.value}}
      - Threshold for clearing alert

   *  - {{inputs.fire_top.value}}
      - Threshold for triggering alert when value is higher than the threshold

   *  - {{inputs.clear_top.value}}
      - Threshold for clearing alert




:strong:`Sudden change`

.. list-table::
   :header-rows: 1
   :widths: 40 60

   *  - :strong:`Variable`
      - :strong:`Description`

   *  - {{event_annotations.current_window}}
      - Window being tested for anomalous values

   *  - {{inputs.recent_min.value}}
      - Minimum value during current window

   *  - {{inputs.recent_max.value}}
      - Maximum value during current window

   *  - {{inputs.f_bot.value}}
      - Threshold for triggering alert when value is lower than the threshold

   *  - {{inputs.c_bot.value}}
      - Threshold for clearing alert

   *  - {{inputs.f_top.value}}
      - Threshold for triggering alert when value is higher than the threshold

   *  - {{inputs.c_top.value}}
      - Threshold for clearing alert




:strong:`Historical anomaly`

.. list-table::
   :header-rows: 1
   :widths: 40 60

   *  - :strong:`Variable`
      - :strong:`Corresponds to`

   *  - {{event_annotations.current_window}}
      - Window being tested for anomalous values

   *  - {{inputs.summary.value}}
      - Mean value during current window

   *  - {{inputs.fire_bot.value}}
      - Threshold for triggering alert when value is lower than the threshold

   *  - {{inputs.clear_bot.value}}
      - Threshold for clearing alert

   *  - {{inputs.fire_top.value}}
      - Threshold for triggering alert when value is higher than the threshold

   *  - {{inputs.clear_top.value}}
      - Threshold for clearing alert


After you have created an alert message, continue to the next tab to specify where alert messages will be sent.

.. _alert-recipients:


Alert recipients
-------------------------------------------------------------------

In the :strong:`Alert recipients` tab, specify where notification messages are sent when alerts are triggered or cleared. Recipients are considered subscribers to a rule.

If you have previously :ref:`integrated your alerts with another system <admin-notifs-index>`, those options appear in the :guilabel:`Add Recipient` dropdown menu. You can also send to email addresses, :ref:`webhook URLs<webhook>`, and :ref:`Create and manage teams<admin-manage-teams>`. Notifications are also sent when a condition clears.

Adding recipients is optional, but often useful.


.. note:: Tips

   - If you want to add the same subscribers to each of multiple rules, you can add the subscribers to all rules at once by using the :ref:`Manage subscriptions<manage-subs>` option in the Detectors tab on the Alerts page after you save the detector.

   - You can temporarily stop a detector from sending notifications by :ref:`muting notifications<mute-notifications>`.


.. _activate-detector:

Activate
-------------------------------------------------------------------

In the :strong:`Activate` tab you see a summary of the detector settings you specified. Review the summary and make any necessary changes in the associated tabs, then name the rule; by default, the rule name is the same as the detector name. The rule name is displayed on the Alerts page and in notifications.

Select :guilabel:`Activate Alert Rule` to save the detector and begin monitoring the specified signal. After you activate the detector, the :strong:`Alert Rules` tab of the detector is displayed, showing the signal you selected and a summary of the rule you built. You can edit the detector name; the text you enter here is displayed as the detector name in the Detectors tab on the Alerts page. You can also provide additional descriptive text below the name, for example, to clarify the purpose of the detector for others.


.. note:: If you make any changes to the detector name or description, select the :guilabel:`Save` button. If you select the :strong:`Close` button without saving, your changes will be lost.



.. _rules-v2-detectors:

.. _v2-detector-signalflow:

Edit detectors through the SignalFlow tab
----------------------------------------------------------------------------------



.. note:: This section assumes you are familiar with the :new-page:`Observability Cloud Detectors API <https://dev.splunk.com/observability/reference/api/detectors/latest>`.

If you are modifying a detector that was created using the API, you can add and edit detector rules using the SignalFlow tab. The SignalFlow program text replaces the Alert Signal, Alert Condition, and Alert Settings tabs that are used when creating and editing detectors using the UI.

Every ``publish`` statement in a SignalFlow ``detect`` statement corresponds to a rule in the Alert Rules tab. The label you enter inside the ``publish`` block is displayed next to the number of active alerts displayed on the Alert Rules tab.

For example, this SignalFlow ``detect`` block:

   ``detect(when(A > 1000)).publish('Weekly Starting Monday')``

looks like this on the Alert Rules tab:

.. image:: /_images/images-detectors-alerts/v2-detectors/publish=rule.png
   :width: 45%
   :alt: This image shows an example of the SignalFlow detect block on the Alert Rules tab.

If the detector contains ``data`` blocks that correspond to plot lines in the detector's chart, such as:

   ``A = data('cpu.idle'.publish(label='CPU idle')``

then the labels are displayed on the right side of the screen in the SignalFlow tab. For a label to be displayed, the ``data`` block must include a ``publish`` block.



.. image:: /_images/images-detectors-alerts/v2-detectors/plot-label.png
   :width: 99%
   :alt: This image shows plot label.

Select the gear icon to display options you can specify for the plot line shown in the detector's chart.



.. image:: /_images/images-detectors-alerts/v2-detectors/plot-options.png
   :width: 99%
   :alt: This image shows the plot options for the plot line.

To add or edit the alert message, recipients, or rule name, use the :guilabel:`Edit` button on the Alert Rules tab. The rule name you add on the :strong:`Activate` tab is displayed on the :strong:`Alert Rules` tab. The rule name is also shown as the alert condition on the :strong:`Alerts` page and in alert notifications.

For example, this rule name on the :strong:`Activate` tab

.. image:: /_images/images-detectors-alerts/v2-detectors/name=condition.png
   :width: 65%
   :alt: This image shows the rule name in the Activate tab.

looks like this on the :strong:`Alert Rules` tab:

.. image:: /_images/images-detectors-alerts/v2-detectors/name=condition2.png
   :width: 45%
   :alt: This image shows another example of the rule name in the Alert Rules tab.

For more information about editing detector options in the :strong:`Alert Rules` tab, see :ref:`alert-message`, :ref:`alert-recipients`, and :ref:`activate-detector`.


.. _name-detector:

Name the detector
=============================================================================

Add a name for the detector in the Detector name field. The text you enter here is displayed as the detector name in the Detectors tab on the Alerts page. You can also provide additional descriptive text below the name, such as to clarify the purpose of the detector for other people.

If you don't enter a name while creating a detector, you will be prompted to add a name when you save the detector.


.. _manage-rules:

Manage detector rules
=============================================================================

In the Alert Rules tab of a detector, you can use the actions menu (|more|) menu for a rule to do any of the following.

-  Disable/enable

   If a detector has multiple rules, such as different rules for different severity levels, you might want to specify which ones to enable or disable. Disabling a rule prevents it from generating any events or sending any notifications. This option is commonly used after the detector has been activated for a while, to decrease or increase the number of alerts the detector is triggering.

   .. note:: The options to clone or delete rules are not available for detectors created using the API.

-  Clone

   As with plot lines on charts, you can clone rules. This option is commonly used to create rules with slightly different settings from each other, such as specifying a different value for the `Alert condition` property or changing the severity level of an alert.

-  Delete

   Use this option to remove a rule from the detector.

Set detector permissions
=============================================================================

|hr|

:strong:`Available in Enterprise Edition`

|hr|

To protect detectors from being edited or deleted by other members of your organization, you can specify which users and teams have permissions for them. For more information, see :ref:`about-permissions`.
