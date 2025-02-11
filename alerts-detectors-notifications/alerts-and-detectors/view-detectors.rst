.. _view-detectors:

************************************
View detectors
************************************



.. meta::
  :description: How to view detector list and individual detectors in Splunk Observability Cloud.

You can view detectors as line items in a list, or individually. When you open an individual detector, you can see also see its rules and settings.

View a list of all detectors
================================

To see a list of existing detectors, open :guilabel:`Detectors & SLOs` page and select the :guilabel:`Detectors` tab.

* By default, detectors are sorted by last updated, with the most recently updated detector at the top. To reverse the sorting order or sort detectors by a different criterion, select the corresponding column header.
* To filter detectors by assigned teams, select the :guilabel:`Team` menu and select or enter the team name you want to find.
* To filter detectors by type, select the :guilabel:`Type` menu. You can filter detectors by the following types:

   * Standard detectors are user-created detectors, including all RUM, APM, Synthetics, and custom detectors.
   * AutoDetect detectors are read-only detectors Splunk Observability Cloud automatically creates when you configure supported integrations. To learn more, see :ref:`autodetect-intro`.
   * Customized AutoDetect detectors are AutoDetect detectors that you copy and customize. To learn more, see :ref:`autodetect-customize`.

* To filter detectors by tags, enter the tags you want to find.
* Detectors with active or scheduled muting rules directly applied to them have a muting indicator. If a detector is muted but the muting rule applies only to the detector's properties, the detector doesn't have a muting indicator.


.. _view-related-detectors:

View detectors linked to a chart
====================================================================================

In dashboards and navigators, you can link detectors and view detectors linked to a chart. Linking detectors helps ensure that everyone in your organization is using the same detectors to monitor the same data.

To add or view linked detectors, select the bell icon in a chart.

The following illustration shows two linked detectors for this chart. If you hover over a linked detector, you see options that let you view active alerts, open the detector for viewing and editing, :ref:`subscribe to the detector<subscribe>` by adding a new notification, or edit linked detectors for the chart. 

.. image:: /_images/images-detectors-alerts/detectors-related.png
   :width: 50%
   :alt: View of list of detectors linked to a chart.

View an individual detector
================================================================

Custom detectors and other standard detectors have different views.

View custom and APM detectors
-----------------------------------------

When you open a custom or APM detector, you can see a summary chart and a detailed chart. The summary chart shows the data over a longer period of time. Short spikes are not visible in the summary chart. The detailed chart shows each data point at the native resolution of the detector and represents exactly the data points that the detector sees. The yellow box controls which part of the summary chart displays in the detail chart. You can see a short-term spike in the detail view by dragging the yellow box to the area where the alert fired.

.. image:: /_images/images-detectors-alerts/custom-detector-view.png
   :width: 80%
   :alt: View of a custom and APM detector.

The resolution of data displayed is determined by the detector's time range. The detail view displays data at the detector's resolution, the frequency at which the detector evaluates the signal. Any events occurring during the detector's time range are shown under the X axis.

The :guilabel:`Alert Rules` tab is open when you open a detector, showing a chart that represents values for the visible signals. The list of detector rules and the number of currently active alerts for each rule are visible. To learn more, see :ref:`view-alerts-within-detector`. For information on creating rules, see :ref:`build-rules` or :ref:`apm-alerts`, depending on the type of detector.

.. note:: If a detector contains a SignalFlow tab, you are viewing a detector that created using the API.

   If you are familiar with the API, you can use this tab to view and edit the detector code and make changes to the detector rules. For more information, see :ref:`v2-detector-signalflow`.

View RUM and Synthetics detectors
---------------------------------------------

When you open a RUM or Synthetics detector, you can see alert configurations and a summary chart for the detector's data.

To learn more about RUM detectors, see :ref:`rum-alerts`.

To learn more about Synthetics detectors, see :ref:`synth-alerts`.


View a detector's properties
-----------------------------------

To see a detector's properties, such as its description and creator, follow these steps:

#. Open the detector.
#. Select the detector's actions menu (|more|), then select :guilabel:`Info`.


.. image:: /_images/images-detectors-alerts/detector-info.png
  :width: 70%
  :alt: Detector info panel showing description, creator, and other properties.


