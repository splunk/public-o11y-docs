.. _view-alerts:

*****************************************************************
View alerts in Splunk Observability Cloud
*****************************************************************



.. meta::
   :description: Learn how to view currently active alerts on the Alerts page or in the Infrastructure Navigator.

Alerts are highly relevant to the health of your services and applications. Observability Cloud shows alerts in all places where they matter, so that you don't miss on important information.

You can view active alerts on the :ref:`Alerts page <alerts-page>`, from :ref:`charts <view-alerts-for-related>` and :ref:`detectors <view-alerts-within-detector>`, or access them :ref:`from APM <view-apm-alerts>`.


.. _alerts-page:

Review all active alerts in your organization
=============================================================

To review all the active alerts in your organization, go to :guilabel:`Alerts`. The :guilabel:`Active Alerts` tab shows the number of active alerts at each severity level, from critical to informative.

.. image:: /_images/images-detectors-alerts/alerts/alerts.png
      :width: 99%
      :alt: Alert counters in the Active Alerts tab

The table lists all active alerts matching the conditions you've entered. If a notification for an alert is :ref:`muted <mute-notifications>`, a :guilabel:`notifications muted` label is shown next to the alert.

To see more details about the alert, select its rule name and source in the table. In the details dialog box, you can select :guilabel:`Resolve` the alert, open the detector that triggered the alert, and explore related items.

.. image:: /_images/images-detectors-alerts/alerts/alert-details.png
   :width: 99%
   :alt: Details of an alert

.. note:: If you can't find an alert, :ref:`apply a filter <alerts-filter>` to reduce the number of matching alerts.

.. _alerts-filter:

Filter alerts to reduce noise
-------------------------------------------------------------------

You can select any of the alert counters to filter alerts by the corresponding severity level. You can also use :guilabel:`Filter` to show only alerts that are relevant to specific tags or dimensions.

.. image:: /_images/images-detectors-alerts/alerts/alerts-filter.png
   :width: 99%
   :alt: Filter field with a sample selection of tags

To filter by service, endpoint, environment, or business workflow, set the :guilabel:`APM Filters`.

.. _alerts-group:

Group alerts by properties or dimensions
-------------------------------------------------------------------

Use :guilabel:`Group by` to group active alerts by one or more properties. For example, you can group alerts by host first, followed by the AWS region. When you select two levels, hierarchical grouping is also applied to the list.

.. image:: /_images/images-detectors-alerts/alerts/alerts-group-by.png
   :width: 99%
   :alt: Group by field with a sample selection

.. _view-alerts-within-detector:

See which alerts are active for a detector
=============================================================================

To view active alerts for a detector, go to the :guilabel:`Detectors` tab in :guilabel:`Alerts` and select a detector.

.. image:: /_images/images-detectors-alerts/alerts/detectors-tab.png
   :width: 99%
   :alt: Detectors tab in Alerts

To open a detector, select its name. When you open a detector, a counter for each alert rule shows the number of active alerts that apply to the detector.

.. image:: /_images/images-detectors-alerts/alerts/open-detector.png
   :width: 70%
   :alt: Alert counts in the detector details screen

Select any of the counters to view a list of active alerts for that rule. If there are multiple filters in the view, you can remove any of them to see a wider range of alerts for that detector. 

.. _view-alerts-for-related:

.. _view-alerts-on-infra-nav:

Identify alerts from your charts
=============================================================================

You can view alerts from charts or in the Infrastructure Navigator by browsing related detectors. 

#. |openmenu| 

#. Select an active alert or hover over a detector and select :menuselection:`View Active Alerts` to see all active alerts for that detector.

.. image:: /_images/images-detectors-alerts/alerts/view-alert-page.png
   :width: 65%
   :alt: Active alerts inside the Detector menu

.. _view-apm-alerts:

Find which service has active alerts in APM
=============================================================================

To view active alerts for the services you're monitoring in APM, go to :guilabel:`APM`. Active alerts appear in the :guilabel:`Services` and the :guilabel:`Business Workflows` tabs under each service name.

.. image:: /_images/images-detectors-alerts/alerts/apm-alerts.png
   :width: 99%
   :alt: Active alerts tab in APM

Select a service with an active alert to check how the service is affected.