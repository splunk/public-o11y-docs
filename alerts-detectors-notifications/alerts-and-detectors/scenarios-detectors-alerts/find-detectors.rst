.. _find-detectors:

*************************************************************
Scenario: Kai finds active alerts to investigate a CPU issue
*************************************************************



.. meta::
    :description: This Splunk alerts and detectors scenario describes how to find active alerts.

Kai, a site reliability engineer at Buttercup Games, has created a detector called "CPU Detector" that monitors Buttercup Games host machine's CPU usage for sudden changes. Kai has received many alerts from this detector, and wants to get a more detailed view of these alerts. 

Using the :guilabel:`Alerts & Detectors` page in Splunk Observability Cloud, Kai can find and view these active alerts so they can easily troubleshoot the CPU changes.

Find active alerts using the search list
====================================================

From the :guilabel:`Alerts & Detectors` page, Kai can find active alerts using the search list. Kai follows these steps: 

#. Kai wants to find an active alert, so they select the :guilabel:`Active Alerts` tab.
#. Kai enters filters so they can find their active alerts more easily. They enter desired values for the following fields:

.. list-table::
    :header-rows: 1
    :widths: 33 33 33

    * - Field
      - Value 
      - Description 

    * - :guilabel:`Group By`
      - :guilabel:`host.name`
      - Groups active alerts from the same host machine name into one category.

    * - :guilabel:`Team`
      - :guilabel:`Buttercup Games` 
      - Shows only active alerts from detectors created by the Buttercup Games team.

After applying filters, Kai finds a list of active alerts triggered by their detector:

.. image:: /_images/images-detectors-alerts/use-cases/active-alerts-list.png
    :width: 100%
    :alt: This screenshot shows a list of active alerts.

View details of active alerts
===================================================

Now that Kai has found their active alerts in the search list, Kai wants to see which alerts are active for this detector.

Kai can now view a detailed report of each active alert associated with their detector by selecting the alert name. 

.. image:: /_images/images-detectors-alerts/use-cases/detail-view-cpu.png
    :width: 100%
    :alt: This screenshot shows a detailed view of one of the alerts, displaying a spike in CPU value. 

By viewing several of these alerts, Kai determines that one of their host machines experienced spikes in CPU utilization. 

Summary
=======================

Kai viewed a list of active alerts triggered by their detector. By finding and viewing the detailed reports of these active alerts, Kai discovered that one of their host machines experienced sudden increases in CPU usage, and they can now troubleshoot the problem more easily.

Learn more
=======================

For more information about ways to view alerts, see :ref:`view-alerts`. 

For more information about ways to view detectors, see :ref:`view-detectors`.
