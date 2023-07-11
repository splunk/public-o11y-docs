.. _linking-detectors:

*****************************************************************
Link detectors to charts
*****************************************************************



.. meta::
  :description: Learn how to Link detectors to charts in Splunk Observability Cloud so that you can discover and diagnose issues more quickly.

Detectors constantly monitor signals for conditions or issues, triggering alerts when needed. When you link detectors to charts, you can discover and diagnose issues at a glance from your dashboards. If you :ref:`create a new detector from a chart <create-detector-from-chart>`, a link to the new detector is automatically added to the chart.

.. _display-detector-state:

Linked detectors color the border of the charts, tables, and icons with the color of the highest alert severity for all detectors linked to that chart. In the following example, the green border means there are no active alerts. If there is no border, then the chart has no linked detectors.

.. image:: /_images/data-visualization/charts/link-detectors/overview-borders.png
   :width: 99%
   :alt: Chart decorated by a detector.

.. note:: You can only link detectors to charts in custom or user dashboards.

.. _link-detector-to-chart:

Link a detector to a chart
=============================================================================

When you :ref:`create a new detector <create-detectors>`, you can link the detector to a chart for more visibility into alerts based on the chart data.

.. _via-detector-menu:

To link one or more existing detectors to a chart:

#. Open the Detector menu (bell icon) for a chart in a dashboard or from the Chart Builder, then select :menuselection:`Link detector`. 

#. Depending on the plots in the chart, you might see one or more related detectors. 

#. Select a detector from the list to link it to the chart. 

.. _via-choose-detector-to-link:      

If you don't see a related detector that you want to link, select :menuselection:`Choose Detector to Link` to open the Chart Builder and enter the detector's name.

.. _via-link-button:

.. note:: Selecting the :guilabel:`Link detector` button in the Chart Builder has identical functionality to selecting :ref:`Choose detector to link <via-choose-detector-to-link>`.

.. _unlink-linked-detector:

Unlink a detector from a chart
=============================================================================

The black bell icon next to the linked detector name helps you differentiate linked detectors from other plot types in the :guilabel:`Plot Editor`.

.. image:: /_images/data-visualization/charts/link-detectors/linked-detector.png
   :width: 50%
   :alt: Plot name with detector bell next to it.

To unlink the detector from the chart, select the more icon (|more|) and select :menuselection:`Delete` from the menu.

.. _list-alerts-detectors:

View active alerts and linked detectors
=============================================================================

When you open the Detector menu for a chart in a dashboard or in the Chart Builder, you might see one or more active alerts, and one or more linked detectors that have already been linked to the chart. 
      
.. _list-active-alerts:

View active alerts related to a chart
-------------------------------------------------------------------

When hovering over the bell icon, the detector's name and alert count of the highest severity alert display in the tooltip.

.. image:: /_images/data-visualization/charts/link-detectors/active-alerts.png
      :width: 25%
      :alt: Active alerts when hovering over the Detector menu.

If there are active alerts listed on the Detector menu, the detector's name and alert count of the highest severity alert display in the Detector menu. The maximum number of visible alert rules is 5.

.. image:: /_images/data-visualization/charts/link-detectors/detector-menu-6.png
      :width: 25%
      :alt: List of active alerts in the Detector menu.

Select an active alert from the list to open the alert dialog box.

.. _list-linked-detectors:

View linked detectors on the Detector menu
-------------------------------------------------------------------

If there are linked detectors listed on the Detector menu, the detector's name with the color of the highest alert severity for that chart displays in this list.

.. image:: /_images/data-visualization/charts/link-detectors/detector-menu-7.png
      :width: 25%
      :alt: Linked detectors listed on the Detector menu.

.. _view-linked-charts-list:

List charts linked to a detector
=============================================================================

To view the linked detector information:

#. Select the :guilabel:`Plot Editor` tab of the Chart Builder.
#. Select the more icon (|more|).
#. Select :menuselection:`Detector info`.

The Detector Info dialog box lists all of the charts, with their dashboard name and group name for context, that are linked to the detector. 

.. image:: /_images/data-visualization/charts/link-detectors/detector-info-edited.png
      :width: 75%
      :alt: Detector info dialog box


