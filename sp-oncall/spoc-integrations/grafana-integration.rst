.. _grafana-spoc:

Grafana integration for Splunk On-Call
******************************************************

Use the Splunk On-Call Grafana integration to forward Grafana alerts and dashboards into Splunk On-Call to notify the correct on-call users. Create on-call schedules, rotations, and escalation policies in Splunk On-Call, then route Grafana alerts and charts based on those parameters. Monitor and visualize logs,
metrics and traces in Grafana and set thresholds to optimize alerts, create charts and surface actionable system insights.

When events meet predetermined monitoring criteria, Grafana sends an alert notification. Then, in the Splunk On-Call timeline, users can route and escalate critical alert data to the correct people. With the Splunk On-Call and Grafana integration, on-call responders can collaborate in real time around system data to reduce mean time to acknowledge (MTTA) and mean time to repair (MTTR) and resolve incidents faster.

With the Splunk On-Call Grafama integration, teams are able to:

-  Track system performance over time, visualize service health and alert on-call teams when applicable monitoring thresholds are met
-  Surface alert context in the form of metrics, logs, graphs and links to runbooks
-  Automatically route and escalate Grafana alert data through Splunk On-Call software and collaborate in a single-pane-of-glass to drive incident workflows forward
-  Chat in-line with incident context to improve collaboration and quickly share critical infrastructure information and dashboards, reducing MTTA and MTTR

Activate Grafana in Splunk On-Call
=========================================

#. From the main timeline go to :guilabel:`Integrations` then :guilabel:`Grafana`. 
#. Select the Grafana integration and copy the :guilabel:`Service API Endpoint` for later use.

.. image:: /_images/spoc/Integrations-victorops-2.png
   :alt: Copy service api endpoint for Grafana - VictorOps

Connect Splunk On-Call in Grafana
========================================

#. From the main dashboard, select the options menu then :guilabel:`Alerting` then :guilabel:`Notification Channels`.

   .. image:: /_images/spoc/grafana4.png
      :alt: Connect VictorOps in Grafana dash
      :width: 65%

#. Add a new channel.

   .. image:: /_images/spoc/kb-new-channel.png
      :alt: Add a new channel in Grafana dash
      :width: 65%

#. Give the notification a name select the :guilabel:`VictorOps` type. 
#. In the VictorOps settings paste in your :guilabel:`Service API Endpoint`. Replace the ``$routing_key`` with the routing key you intend to use. For more information on routing keys, see :ref:`spoc-routing-keys`.
#. Save the integration.

   .. image:: /_images/spoc/kb-send-test.png
      :alt: test and save integration in grafana dash
      :width: 65%

The resulting test alert in Splunk On-Call looks similar to this:

.. image:: /_images/spoc/kb-grafana-in-timeline.png
   :alt: test alert in VictorOps - from Grafana
   :width: 65%

Connect the notification channel to your alert
--------------------------------------------------

#. Locate the Grafana Dashboard panel you want to send alerts to Splunk On-Call and select :guilabel:`Edit` under dropdown arrow next to the panel name.
#. Go to the :guilabel:`Alert` section.
#. Define your alert conditions.
#. Under :guilabel:`Notifications`, select the plus button to select the notification channel you configured.
#. Save your changes.

.. image:: /_images/spoc/Cmillane-testing_alert_lag-Grafana.jpg
   :width: 65%

You have completed the standard configuration. Repeat these steps as necessary, creating separate notification channels for each routing key.

Include an image on the alert
---------------------------------

For those with Enterprise Splunk On-Call features, you can include the Grafana image of the alert in the notification. 

#. When configuring the notification channel in Grafana, select :guilabel:`Include image`.

   .. image:: /_images/spoc/kb-include-image.png
      :alt: include grafana image of alert in victorops
      :width: 65%

#. In Splunk On-Call, go to :guilabel:`Settings` then :guilabel:`Alert Rules Engine` and add the following Rules Engine rule to surface the image_url as an annotation to the incident. Ensure that the image is hosted in a publicly accessible location so that Splunk On-Call can display it. For further information, see :new-page:`Enable images in notification <https://grafana.com/docs/grafana/latest/alerting/old-alerting/notifications/#external-image-store>` in Grafana documentation.

   .. image:: /_images/spoc/Screen-Shot-2020-06-24-at-4.37.01-PM.png
      :width: 65%

Your resulting Splunk On-Call incident now includes the image as an annotation:

.. image:: /_images/spoc/Screen-Shot-2019-01-25-at-12.39.42-PM.png
   :alt: grafana example image annotation
   :width: 65%

.. image:: /_images/spoc/kb-test-notification-with-image.png
   :alt: successful test - save notification in grafana
   :width: 65%