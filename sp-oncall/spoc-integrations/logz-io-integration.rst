
.. _logz-io-integration:

************************************************************************
Logz.io integration for Splunk On-Call
************************************************************************

.. meta::
   :description: Logz.io provides a cloud-based log analytics service with additional features such as predictive fault detection, alerts, multi-user access and role definitions.

Logz.io provides a cloud-based log analytics service with additional features such as predictive fault detection, alerts, multi-user access and role definitions. The platform uses machine-learning algorithms to find critical log events before they impact operations, providing users with information about their systems and applications. The following guide will walk you through this integration.

In Splunk On-Call
============================

#. In Splunk On-Call, navigate to :guilabel:`Settings`, then :guilabel:`Alert Behavior`.
#. Select :guilabel:`Integrations`, then the :guilabel:`REST` integration option.
#. If the REST endpoint integration has not been enabled, select the green :guilabel:`Enable` button to generate your endpoint destination URL. 
#. Copy the :strong:`URL to notify``:strong: to the clipboard.

.. image:: /_images/spoc/logz1.png
    :width: 100%

In Logz.io
===================

#. From the Logz.io web interface, click on :guilabel:`Alerts`.

.. image:: /_images/spoc/logz2.png
    :width: 100%

#. Select :guilabel:`ALERT ENDPOINTS`.

.. image:: /_images/spoc/logz3.png
    :width: 100%


#. Select :guilabel:`Create a New Endpoint`.

.. image:: /_images/spoc/logz5.png
    :width: 100%

#. In the :strong:`ADD A NEW ENDPOINT` form, select the Custom type. 
#. Fill out the Name and Description fields.  
#. Paste the :strong:`URL to notify` from the :strong:`In VictorOps`` section into the URL field.
#. Select POST for the Method. 
#. Finally, paste the text below into the :strong:`Body`` field, then :guilabel:`Save`.

{ “message_type”: “CRITICAL”, “entity_id”: “{{alert_title}}”,
“entity_display_name”: “{{alert_description}}”, “alert_severity”:
“{{alert_severity}}”, “state_message”: “{{alert_event_samples}}”,
“monitoring_tool”: “Logz.io” }

.. image:: /_images/spoc/logz4.png
    :width: 100%

#. Click on :strong:`logz.io` logo to return to the main tab.

.. image:: /_images/spoc/logz6.png
    :width: 100%

#. You can now add the Splunk On-Call notification endpoint to your alerts. In order to test the notification endpoint, click on :strong:`Create Alert`.

.. image:: /_images/spoc/logz7.png
    :width: 100%

#. Select :strong:`Equal to` from the :strong:`Condition`` dropdown menu. Enter :strong:`99` in the :strong:`Threshold` field, then select :strong:`Continue`.

.. image:: /_images/spoc/logz8.png
    :width: 100%

#. Enter a name in the :strong:`Name` field, then click :strong:`CONTINUE`.

#. Set :strong:`Suppress notifications for` to :strong:`5 minutes`, then select :strong:`SplunSplunk On-Call` (formerly VictorOps) from the :strong:`Notifications endpoint` dropdown menu, then click :strong:`CREATE ALERT`.

.. image:: /_images/spoc/logz9.png
    :width: 100%


#. Confirm that an alert shows up in the Splunk On-Call timeline.

.. image:: /_images/spoc/logz91.png
    :width: 100%

You have completed setting up this integration. 