.. _create-detectors:

************************************
Create detectors to trigger alerts
************************************

.. meta::
   :description: How to create detectors to trigger alerts.

A :term:`detector` monitors signals on a plot line and triggers alert events and clear events based on conditions you define in the detector rules. Think of a detector as a chart that triggers alerts when a signal's value crosses specified thresholds defined in alert rules.

Detectors are made up of alert rules. When you create an alert rule you can select various built-in alert conditions to define thresholds that trigger alerts. See :ref:`condition-reference`. 

When a detector determines that the conditions for a rule are met, it triggers an alert, creates an event, and sends notifications, if specified. Detectors can send notifications through email, as well as through other systems, such as Slack, or by using a webhook. To learn more, see :ref:`admin-notifs-index`.

You can find active alerts, existing detectors, and muting rules under :guilabel:`Alerts & Detectors`. You can also find alerts in the Events Feed, available within any dashboard.

Create detectors
=============================================================================

The high-level steps for creating a detector are:

1. Choose :ref:`how to create the detector <how-to-create-detector>`.

2. Create :ref:`alert rules <build-rules>` to the detector to specify when to trigger alerts.

.. _how-to-create-detector:

Choose how to create a detector
=============================================================================

There are several ways to create a detector.

.. note:: To create a detector for Splunk APM, see :ref:`apm-alerts`.

* You can clone an existing detector if you have existing detectors that you want to modify. See :ref:`clone-detector`
* You can customize AutoDetect detectors. See :ref:`autodetect-customize`.
* Start from the Detector tab to create detectors based on what you are currently viewing, such as a chart or the Infrastructure Navigator. See :ref:`create-detector-from-chart`.
* Create a detector from a dashboard chart to preselect one of the chart signals as the signal to be monitored. See :ref:`create-detector-from-chart`.
* Create a detector from scratch. See :ref:`create-detector-from-scratch`.
* Use the API to programmatically create detectors, instead of creating them through the user interface. See :ref:`create-via-api`.

.. _clone-detector:

Clone an existing detector
-------------------------------------------------------------------

You can see a list of existing detectors on the :guilabel:`Detectors` tab under Alerts & Detectors. 

1. Look for a detector that is similar to the detector you want to create. 
2. Select the detector.
3. Select :menuselection:`Clone` from the actions menu (|more|).

Next, see :ref:`build-rules`.

.. _create-detector-from-chart:

Create a detector from a chart
-------------------------------------------------------------------

If there is a chart that monitors a signal that you want to alert on, you can use that chart to create a detector. Creating a detector from a chart pre-selects one of the chart's signals as the signal to be monitored.

Follow these steps to create the detector:

#. Select the bell icon on a chart to open the :strong:`Detector` menu.
#. Select :menuselection:`New detector from chart`.
#. To continue, see :ref:`build-rules`.

After you create a detector from a chart, a :ref:`link to the new detector<link-detector-to-chart>` is automatically added to the chart.

.. _create-detector-from-scratch:

Create a detector from scratch
-------------------------------------------------------------------

To create a new detector for Infrastructure or Custom Metrics from scratch, you can either select :guilabel:`New Detector` under Alerts & Detectors, or select :menuselection:`Custom Detector` from the create menu on the navigation bar. Enter a detector name and then select :guilabel:`Create Alert Rule` to proceed to the alert rule builder. For instructions on building the rule, see :ref:`build-rules`.

.. note:: See :ref:`apm-alerts` for steps to create an APM Detector.

.. _create-via-api:

Create a detector using the API
-------------------------------------------------------------------

Using the API to create a detector provides a number of capabilities that are not available in the UI, letting you build detectors with more advanced rules and conditions. You can view these detectors in the UI. The program text appears in place of the signals displayed in standard detectors.

-  For general information on creating detectors using the API, see the :new-page:`Detect Anomalies with Detectors <https://dev.splunk.com/observability/docs/detectors/detectors_events_alerts/>` topic in the Splunk Observability Cloud Developer Guide.

-  For information on using the UI to edit detectors created using the API, see :ref:`v2-detector-signalflow`.

.. note:: If a detector display includes a SignalFlow tab, you are viewing a detector created programmatically using the :new-page:`Observability Cloud Detectors API <https://dev.splunk.com/observability/reference/api/detectors/latest>`. If you are familiar with that API, you can use the detector display to view and edit the detector code and make changes to the detector rules.


.. _build-rules:

Create alert rules for your detector
=============================================================================

1. On the :guilabel:`Alert signal` tab, select one or more signals to monitor for unusual behavior. To learn more, see :ref:`alert-signal`.
2. On the :guilabel:`Alert condition` tab, select the alert condition. See :ref:`Alert condition <alert-condition>`.
3. On the :guilabel:`Alert settings` tab, complete the alert condition using the settings available. The settings that are available are based on your selection on the :guilabel:`Alert condition` tab. See :ref:`Alert settings <alert-settings>`.
4. On the :guilabel:`Alert message` tab, select the alert severity, customize the alert message, and a runbook or tip. See :ref:`Alert message <alert-message>`.
5. On the :guilabel:`Alert recipients` tab, add recipients who you want to receive a notification through email or other third-party integration. See :ref:`Alert recipients <alert-recipients>`.
6. On the tab, you name the rule and activate the detector. See :ref:`Activate <activate-detector>`.

After you activate the detector, it begins monitoring the signal immediately. When the signal meets the specified criteria, the detector triggers alerts, creates events, and sends the specified message to the alert recipients.

.. note:: If you don't see the Alert signal, Alert condition, or Alert settings tabs, you are viewing a detector created through the API. For more information, see :ref:`v2-detector-SignalFlow`.

.. _alert-signal:

Select alert signals
-------------------------------------------------------------------

On the :strong:`Alert signal` tab, define the signal to monitor by entering a metric and corresponding analytics.

If you are creating a detector from scratch, you have to first select the signals you want to monitor. Selecting a signal for a detector is similar to selecting a signal in a chart in the Chart Builder. Enter a metric and select the metric you want to monitor from the list. Add filters or analytics. To learn more, see :ref:`specify-signal`

If you want to add more signals, select :guilabel:`Add Metric or Event` or :guilabel:`Add Formula`. Note that you can add events to be displayed on the chart, but you cannot select an event as the signal to be monitored.

.. note:: If you are creating a detector :ref:`from a chart<create-detector-from-chart>` or by :ref:`cloning a detector<clone-detector>`, you might not need to add new signals. However, if you do add new signals to the detector, the signals you add are not added to the original chart or detector.

.. _compound-conditions:

If the detector has multiple signals, select what signal you want to alert on. 

-  To monitor one signal, select the bell icon in the :guilabel:`Alert on` column to select which signal you want to monitor. A blue bell indicates the signal that is being monitored.

-  To create compound conditions based on the values of more than one signal, for example, signal A is higher than ``x`` OR signal B is higher than ``y``, select the :guilabel:`Monitor multiple signals` double-bells icon. When you select to monitor multiple signals your alert condition is changed to :guilabel:`Custom Threshold`.

.. _alert-condition:

Select alert conditions
-------------------------------------------------------------------

.. note:: If you don't see an Alert condition tab, you are viewing a detector that was created using the API; alert conditions are defined in the :ref:`SignalFlow tab<v2-detector-signalflow>`.

On the :strong:`Alert condition` tab, select the type of condition that triggers an alert. If you want to create compound conditions using AND or OR operators on the Alert settings tab, you must use the Custom Threshold condition. This applies whether you are monitoring a single signal or multiple signals.

Splunk Infrastructure Monitoring and Splunk APM provide several built-in alert conditions. See :ref:`condition-reference` for the list of the available built-in alert conditions for Infrastructure Monitoring and Custom Metrics detectors.

After you have selected the alert condition, continue to the next tab to specify the settings that trigger alerts.

.. _alert-settings:

Specify alert settings
-------------------------------------------------------------------

On the :strong:`Alert settings` tab, you specify the settings that trigger an alert.

.. note:: If you don't see an Alert settings tab, you are viewing a detector that was created using the API; alert settings are defined in the :ref:`SignalFlow tab<v2-detector-signalflow>`.

The available settings vary depending on the alert condition you selected.

.. note:: If you are using the Custom Threshold condition, you can select :guilabel:`Add another condition` to create compound conditions using AND and OR operators. For more information about compound conditions, see :ref:`custom-threshold`.

In the chart, you see a preview of the alerts that are triggered based on the settings you selected. For more information on using the preview, see :ref:`preview-detector-alerts`.

After you have specified settings for triggering alerts, continue to the next tab to create a message that is sent when the alert is triggered.

.. _alert-message:

Alert messages
-------------------------------------------------------------------

On the :strong:`Alert message` tab, you specify the severity of the alert and the information you want to include in the notification message.

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

The easiest way to do this is to create a rule at one severity, select :menuselection:`Clone` from the actions menu (|more|), and then edit the settings and severity.

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

On the :strong:`Alert recipients` tab, specify where notification messages are sent when alerts are triggered or cleared. Recipients are considered subscribers to a rule.

If you have previously :ref:`integrated your alerts with another system <admin-notifs-index>`, those options appear in the :guilabel:`Add Recipient` dropdown menu. You can also send to email addresses, :ref:`webhook URLs<webhook>`, and :ref:`Create and manage teams<admin-manage-teams>`. Notifications are also sent when a condition clears.

Adding recipients is optional, but often useful.


.. note:: Tips

   - If you want to add the same subscribers to each of multiple rules, you can add the subscribers to all rules at once by using the :ref:`Manage subscriptions<manage-subs>` option on the Detectors tab under Alerts & Detectors after you save the detector.

   - You can temporarily stop a detector from sending notifications by :ref:`muting notifications<mute-notifications>`.


.. _activate-detector:

Activate
-------------------------------------------------------------------

On the :strong:`Activate` tab you see a summary of the detector settings you specified. Review the summary and make any necessary changes in the associated tabs, then name the rule; by default, the rule name is the same as the detector name. The rule name is displayed on the Alerts page and in notifications.

Select :guilabel:`Activate Alert Rule` to save the detector and begin monitoring the specified signal. After you activate the detector, the :strong:`Alert Rules` tab of the detector is displayed, showing the signal you selected and a summary of the rule you built. You can edit the detector name; the text you enter here is displayed as the detector name on the Detectors tab under Alerts & Detectors. You can also provide additional descriptive text below the name, for example, to clarify the purpose of the detector for others.


.. note:: If you make any changes to the detector name or description, select the :guilabel:`Save` button. If you select the :strong:`Close` button without saving, your changes will be lost.



.. _rules-v2-detectors:

.. _v2-detector-signalflow:

Edit detectors through the SignalFlow tab
----------------------------------------------------------------------------------

.. note:: This section assumes you are familiar with the :new-page:`Observability Cloud Detectors API <https://dev.splunk.com/observability/reference/api/detectors/latest>`.

If you are modifying a detector that was created using the API, you can add and edit detector rules using the SignalFlow tab. The SignalFlow program text replaces the Alert signal, Alert condition, and Alert settings tabs that are used when creating and editing detectors using the UI.

Every ``publish`` statement in a SignalFlow ``detect`` statement corresponds to a rule on the Alert Rules tab. The label you enter inside the ``publish`` block is displayed next to the number of active alerts displayed on the Alert Rules tab.

For example, this SignalFlow ``detect`` block:

   ``detect(when(A > 1000)).publish('Weekly Starting Monday')``

looks like this on the Alert Rules tab:

.. image:: /_images/images-detectors-alerts/v2-detectors/publish=rule.png
   :width: 45%
   :alt: This image shows an example of the SignalFlow detect block on the Alert Rules tab.

If the detector contains ``data`` blocks that correspond to plot lines in the detector's chart, such as:

   ``A = data('cpu.idle'.publish(label='CPU idle')``

then the labels are displayed on the right side of the screen on the SignalFlow tab. For a label to be displayed, the ``data`` block must include a ``publish`` block.



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
   :alt: This image shows the rule name on the Activate tab.

looks like this on the :strong:`Alert Rules` tab:

.. image:: /_images/images-detectors-alerts/v2-detectors/name=condition2.png
   :width: 45%
   :alt: This image shows another example of the rule name on the Alert Rules tab.

For more information about editing detector options on the :strong:`Alert Rules` tab, see :ref:`alert-message`, :ref:`alert-recipients`, and :ref:`activate-detector`.


.. _name-detector:

Name the detector
=============================================================================

Add a name for the detector in the Detector name field. The text you enter here is displayed as the detector name on the Detectors tab on the Alerts page. You can also provide additional descriptive text below the name, such as to clarify the purpose of the detector for other people.

If you didn't enter a name while creating a detector, you will be prompted to add a name when you save the detector.


.. _manage-rules:

Manage detector rules
=============================================================================

On the Alert Rules tab of a detector, you can use the actions menu (|more|) menu for a rule to do any of the following.

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
