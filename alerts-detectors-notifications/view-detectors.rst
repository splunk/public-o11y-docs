.. _view-detectors:

************************************
View detectors
************************************



.. meta::
  :description: How to view detectors in Splunk Observability Cloud.

You can view detectors as line items in a list, or individually. When you open an individual detector, you can see also see its rules and settings.

View a list of all detectors
================================

You can see a list of existing detectors in the Detectors tab on the Alerts page. If a detector is currently :ref:`muted<mute-notifications>` or scheduled to be muted, a red or grey indicator (respectively) appears next to the detector. For more information, see :ref:`view-muting-rules`.


.. _view-related-detectors:

View detectors related to a chart or the Infrastructure Navigator
------------------------------------------------------------------------

When you are looking at the Detector menu for a chart, or in the Infrastructure Navigator, you might see one or more Related Detectors. Making related detectors easy to find helps ensure that everyone using Infrastructure Monitoring in your organization is using the same detectors to monitor the same data.

..
	|openmenu| is defined in conf.py

|openmenu| The following illustration shows two related detectors for this chart. If you hover over a related detector, you see options that let you :ref:`subscribe to the detector<subscribe>` by adding a new notification, open the detector for viewing or editing, or view the alerts triggered by the detector. To learn more, see :ref:`view-alerts`.

.. image:: /_images/images-detectors-alerts/detectors-related.png
   :width: 50%

View an individual detector
-------------------------------------------------------------------

When you open a detector, the Alert Rules tab is opened, and you see a chart that represents values for the visible signals. The list of detector rules, and the number of currently active alerts for each rule, is shown. To learn more, see :ref:`view-alerts-within-detector`. For information on creating rules, see :ref:`build-rules` or :ref:`apm-alerts`, depending on which type of detector you are creating.

As with charts, the resolution of data displayed is determined by the chart's time range. The detail view at right displays data at the detector's resolution, that is, the frequency at which the detector evaluates the signal. Any events that have occurred during the detector's time range are shown under the X axis.

.. note:: If a detector contains a SignalFlow tab, you are viewing a detector that created using the API.

   If you are familiar with the API, you can use this tab to view and edit the detector code and make changes to the detector rules. For more information, see :ref:`v2-detector-signalflow`.


View a detector's properties
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can see a detector's properties, such as its description and creator, by following these steps:

#. Open the detector.
#. Select the detector's actions menu (|more|), then select :menuselection:`Info`.

This displays the detector's properties, as shown in the illustration.


.. image:: /_images/images-detectors-alerts/detector-info.png
  :width: 90%
  :alt: Detector info panel showing description, creator, and other properties.


