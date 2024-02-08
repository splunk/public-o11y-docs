Dynatrace Synthetic Monitoring integration for Splunk On-Call
**************************************************************

Dynatrace Synthetic Monitoring simulates customer journeys from
thousands of locations around the world, using all major desktop and
mobile browsers. The following guide will walk you through this
integration.

In VictorOps
------------

From the VictorOps web portal, select **Settings** >> **Alert Behavior**
>> **Integrations**

.. image:: /_images/spoc/Integration-ALL-FINAL.png

Select the **Dynatrace Synthetic** integration option.

.. image:: /_images/spoc/Screen-Shot-2018-08-27-at-1.43.57-PM.png

Copy the **Service API Key** to the clipboard.

.. image:: /_images/spoc/Integration-Dynatrace-Page-final.png

In Dynatrace Synthetic Monitoring
---------------------------------

From the Dynatrace Synthetic Monitoring web interface, click the menu
icon in the upper-left corner, then select **Alerts** from the dropdown.

.. image:: /_images/spoc/Operational_summary-Dynatrace_Synthetic.png

.. image:: /_images/spoc/Operational_summary-Dynatrace_Synthetic-1.png

Select the **Alert Destinations** tab.

.. image:: /_images/spoc/Alerts-Dynatrace_Synthetic.png

Click **Create an alert destination**.

.. image:: /_images/spoc/Alerts-Dynatrace_Synthetic-1.png

Select **VictorOps** from the “Format” dropdown menu, then enter
appropriate values for “Name” and “Routing_key”, and paste the “API key”
from the “In VictorOps” section.  Click **Create**.

.. image:: /_images/spoc/Alerts-Dynatrace_Synthetic-9.png

 

Select the **Alert Configuration** tab.

.. image:: /_images/spoc/Alerts-Dynatrace_Synthetic-3.png

For a test that that you want to associate the alert with,
click **Action**, then select **Edit** from the dropdown menu.

.. image:: /_images/spoc/Alerts-Dynatrace_Synthetic-4.png

Select either the **Test Level Alerts** tab or the **Step Level Alerts**
tab, then select the type of alert from the left side of the tab that
you want to configure.

.. image:: /_images/spoc/Alerts-Dynatrace_Synthetic-5.png

For testing, make sure to have “Activation” set to **On** (you can
change this after testing if you want).  Configure the alert settings
how you want, then click **Add Notification** near the bottom of the
page.

.. image:: /_images/spoc/Alerts-Dynatrace_Synthetic-6.png

Set “Reminders Frequency” and “Level” to the values you want, then set
“Destination/Subject” to the “Alert Destination” that you created
earlier.  Click **Update and Finish** to complete the process or
click **Add Notification** to add another notification with different
settings.

.. image:: /_images/spoc/Alerts-Dynatrace_Synthetic-7.png

Click on the **Action** dropdown for the test you just updated, the
select **Send sample alerts**.

.. image:: /_images/spoc/Alerts-Dynatrace_Synthetic_and_Managing_Alerts-Synthetic_Monitoring-Dynatrace_Community-2.png

Select the Alert to test, then click **Send Alerts**.

.. image:: /_images/spoc/Alerts-Dynatrace_Synthetic-8.png

Confirm that you received the test alert in your VictorOps timeline.

.. image:: /_images/spoc/Timeline-Ops_Testing.png

 

 

You have completed setting up this integration.  If you have any
questions, please contact `VictorOps
support <mailto:Support@victorops.com?Subject=Dynatrace%20Synthetic%20Monitoring%20VictorOps%20Integration>`__.
