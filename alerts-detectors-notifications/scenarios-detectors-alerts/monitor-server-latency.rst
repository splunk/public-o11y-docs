.. _monitor-server-latency:

***********************************************************
Scenario: Kai creates a detector to monitor server latency 
***********************************************************



.. meta::
    :description: This Splunk alerts and detectors scenario describes how to create a detector to monitor server latency.

Kai, a site reliability engineer at Buttercup Games, receives many tickets from Buttercup Games customers experiencing high latency on game servers. Kai wants a reliable way to monitor their host machines' server latency so they can quickly identify and solve high latency issues before customers experience them. 

Using Splunk Observability Cloud, Kai can create a detector that alerts them whenever a server's latency crosses a threshold for a period of time.

Define the data to use for alerting
===================================

Kai opens the :guilabel:`Alerts & Detectors` page in Splunk Observability Cloud and selects :guilabel:`New Detector` to create a detector from scratch.

After naming the detector, Kai chooses :guilabel:`Infrastructure or Custom Metrics Alert Rule`.

Kai selects their desired metric, :code:`latency`, and sees a preview detector that reports on the metric:

.. image:: /_images/images-detectors-alerts/use-cases/preview-detector-updated.png
    :width: 100%
    :alt: This image shows a preview view of the metric that Kai's detector reports on.

Kai can apply analytics to change how the signal is reported. Kai wants to report on the average server latency over a 1-minute window, so Kai applies the :guilabel:`Mean:Transformation` analytic and enters a period of 1 minute. 

The preview detector changes to reflect Kai's applied analytic: 

.. image:: /_images/images-detectors-alerts/use-cases/mean-transformation-preview.png
    :width: 100 %
    :alt: This screenshot shows a preview reflecting the average server latency of each machine over a period of 1 minute.

Choose an alert condition 
=====================================

Kai can choose between several options for an alert condition. Alert conditions determine the type of behavior that triggers an alert. 

Kai chooses the :guilabel:`Static threshold` alert condition because they want to know when server latency exceeds a certain point for a certain duration of time. In other cases, Kai might want to choose a different alert condition. For example, Kai might choose the :guilabel:`Sudden change` condition if they want to be alerted when server latency rapidly increases.

Customize alert settings
=====================================

In the :guilabel:`Alert Setting` menu, Kai enters desired values for the following fields: 

.. list-table::
    :header-rows: 1
    :widths: 33 33 33 

    * - Field
      - Value
      - Description

    * - :guilabel:`Threshold`
      - :guilabel:`280`
      - The detector alerts when :code:`latency` exceeds 280 milliseconds

    * - :guilabel:`Duration`
      - :guilabel:`1 minute`
      - The detector alerts when :code:`latency` exceeds 280 milliseconds for 1 minute or more

The detector preview shows red arrows on the timestamps when the detector triggers an alert:

.. image:: /_images/images-detectors-alerts/use-cases/timestamp-alert.png
    :width: 50%
    :alt: This screenshot displays red arrows on timestamps where the alert is triggered.

Set up alert messages and recipients
==============================================

After creating the alert condition, Kai selects :guilabel:`Alert Message`. Kai enters the runbook buttercupgames.com/alerts and adds an internal tip to check the memory load and disk usage on the server:

.. image:: /_images/images-detectors-alerts/use-cases/alert-message.png
    :width: 100%
    :alt: This screenshot displays the runbook and tip that Kai enters for the alert.

The runbook and tip allow Kai to quickly view their alerts and remind Kai what to do when an alert is triggered. 

Kai then selects :guilabel:`Alert Recipients` and adds their email to the list of alert recipients. After adding their email, Kai activates the alert rule.

Summary
==============================================

Kai has created a detector that sends them an alert whenever the average server latency over a 1-minute window exceeds a threshold of 280 milliseconds for 1 minute. This detector allows Kai to quickly detect and resolve server latency issues that they were previously unaware of.

Learn more
==============================================

For more information on how to create a detector, see :ref:`create-detectors`.

For more information on alert conditions and how to choose the right condition, see :ref:`condition-reference`.
    