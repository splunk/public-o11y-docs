.. _alert-message-variables-ref:

*********************************
Alert message variables reference
*********************************

The following tables describe the variables and helper functions you can use when creating a custom message. Use triple braces where indicated so that the variable value is not escaped.

.. note:: 

   If you change the alert condition after customizing the message, an icon on the Message preview tab appears.

   .. image:: /_images/images-detectors-alerts/message-tab-icon.png
      :width: 20%
      :alt: This image shows the message tab icon.

   This is to remind you to review the message, since some variables you used might no longer apply to the new condition you selected. The icon is removed when you navigate away from the Message preview tab.

.. _condition-variables:

Built-in alert rules
====================

The following tables describe the additional variables you can use when creating a custom message for the given built-in alert rule. You can't use variables other than the ones that are listed.

Resource running out
---------------------

.. list-table::
   :header-rows: 1
   :widths: 40 60

   *  - :strong:`Variable`
      - :strong:`Description`


   *  - {{inputs.hours_left.value}}
      - Number of hours remaining before reaching empty or capacity

   *  - {{event_annotations.fire_forecast_ahead}}
      - Threshold for triggering alert, in hours

   *  - {{event_annotations.clear_forecast_ahead}}
      - Threshold for clearing alert, in hours

Outlier detection
-----------------

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

Sudden change
-------------

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

Historical anomaly
------------------

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

Additional variables
====================

Detector and rule details
-------------------------

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

Alert details
-------------

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

Signal details
--------------

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

Organization details
--------------------

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - :strong:`Variable`
     - :strong:`Description`

   * - {{organizationId}}
     - The organization ID. You can use this to programmatically reference this organization.

Helper functions
================

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

Example message
===============

The following is an example of a default message that you can customize:

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

.. note::

   Only the variables present in the detect condition are available in the alert body. For example, variable A in the following is not available in the alert body because it is only used in the ``TRIGGER_CONDITION`` and not in the detect condition.

   .. code-block::

      A = data('metric').publish('A')
      B = data('test').publish('B')
      TRIGGER_CONDITION = when(A > 100)

      detect(TRIGGER_CONDITION and when(B < 500)).publish('Alert notification')