.. _dynatrace-synthetic-monitoring:

************************************************************************
Dynatrace Synthetic Monitoring integration for Splunk On-Call
************************************************************************

.. meta::
   :description: Dynatrace Synthetic Monitoring simulates customer journeys from thousands of locations around the world, using all major desktop and mobile browsers.



Dynatrace Synthetic Monitoring simulates customer journeys from thousands of locations around the world, using all major desktop and
mobile browsers. The following guide will walk you through this integration.

In Splunk On-Call
========================

#. From the Splunk On-Call web portal, select :guilabel:`Settings`, then :guilabel:`Alert Behaviors`. Finally, select :`Integrations`. 

.. image:: /_images/spoc/Integration-ALL-FINAL.png
    :width: 100%

#. Select the :guilabel:`Dynatrace Synthetic` integration option.

.. image:: /_images/spoc/dyna-synth-1.png
    :width: 100%

#. Copy the :guilabel:`Service API Key` to the clipboard.

.. image:: /_images/spoc/dyna-synth-2.png
    :width: 100%

In Dynatrace Synthetic Monitoring
=============================================

#. From the Dynatrace Synthetic Monitoring web interface, select the menu icon in the upper-left corner, then select :guilabel:`Alerts` from the dropdown.

.. image:: /_images/spoc/dyna-synth-3.png
    :width: 100%

.. image:: /_images/spoc/dyna-synth-4.png
    :width: 100%

#. Select :guilabel:`Alert Destinations`.

.. image:: /_images/spoc/Alerts-Dynatrace_Synthetic.png
    :width: 100%

#. Select :guilabel:`Create an alert destination`.

.. image:: /_images/spoc/Alerts-Dynatrace_Synthetic-1.png
    :width: 100%

#. Select :strong:`VictorOps` from the :guilabel:`Format`` menu, then enter appropriate values for :strong:`Name`` and :strong:`Routing_key`. Paste the API key from the :guilabel:`In VictorOps` (Splunk On-Call) section. 

#. Select :guilabel:`Create`.

.. image:: /_images/spoc/Alerts-Dynatrace_Synthetic-9.png
    :width: 100%


#. Select the :guilabel:`Alert Configuration` tab.

.. image:: /_images/spoc/Alerts-Dynatrace_Synthetic-3.png
    :width: 100%

#. For a test that that you want to associate the alert with, select :guilabel:`Action`, then select :guilabel:`Edit` from the dropdown menu.

.. image:: /_images/spoc/Alerts-Dynatrace_Synthetic-4.png
    :width: 100%

#. Select either the :guilabel:`Test Level Alerts` tab or the :guilabel:`Step Level Alerts` tab, then select the type of alert from the left side of the tab that you want to configure.

.. image:: /_images/spoc/Alerts-Dynatrace_Synthetic-5.png
    :width: 100%

#. For testing, make sure to have :menuselection:`Activation` set to :strong:`On`. You can change the Activation setting after testing if you want. Configure the alert settings how you want, then select :guilabel:`Add Notification` near the bottom of the
page.

.. image:: /_images/spoc/Alerts-Dynatrace_Synthetic-6.png
    :width: 100%

#. Set :guilabel:`Reminders Frequency` and :guilabel:`Level`` to the values you want, then set :guilabel:`Destination/Subject` to the Alert Destination that you created earlier. Select :guilabel:`Update and Finish` to complete the process or select :guilabel:`Add Notification` to add another notification with different settings.

.. image:: /_images/spoc/Alerts-Dynatrace_Synthetic-7.png

#. Select the :guilabel:`Action` dropdown for the test you just updated, the select :menuselection:`Send sample alerts`.

.. image:: /_images/spoc/Alerts-Dynatrace_Synthetic_and_Managing_Alerts-Synthetic_Monitoring-Dynatrace_Community-2.png

#. Select the alert to test, then select :guilabel:`Send Alerts`.

.. image:: /_images/spoc/Alerts-Dynatrace_Synthetic-8.png

#. Confirm that you received the test alert in your Splunk On-Call timeline.

.. image:: /_images/spoc/Timeline-Ops_Testing.png



You have completed setting up this integration. 