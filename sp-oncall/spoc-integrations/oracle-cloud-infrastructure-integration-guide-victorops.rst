This guide contains documentation to integrate your Oracle Cloud
Infrastructure  with Splunk On-Call.

General Requirements
--------------------

-  

   -  

      -  **OCI Account:** May Require Administrative Privileges to
         Integrate

         -  **Splunk On-Call Version Required:** Starter, Growth, or
            Enterprise.

Configuration In Splunk On-Call
-------------------------------

Enable The Integration
~~~~~~~~~~~~~~~~~~~~~~

From the Splunk On-Call web portal navigate to *Integrations >> 3rd
Party Integrations >> Oracle Cloud Infrastructure* and click *Enable
Integration.*

Copy the resulting uniquely generated service API Endpoint to your
clipboard for later use in OCI.

Configuration in Oracle Cloud Infrastructure
--------------------------------------------

From the Oracle Cloud console navigate to Solutions and Platform >>
Monitoring >> Alarm Definitions.

 

.. image:: images/OCI-1.jpg

 

Then select “Create Alarm” - On this screen define your alarm and
configure the desired alarm metrics and trigger rules. 

.. image:: images/Create-Alarm.jpg

 

After the alarm configuration is complete, the “Notifications” section
will populate at the bottom of the “Create Alarm” page. Select “Create a
topic”

.. image:: images/Create-a-topic.jpg

 

Here, Provide a Topic Name and under Subscription Protocol, select
HTTPS. Paste the Service Endpoint URL copied in previous steps from
VictorOps. Make sure you replace “$routing_key” in the URL with value of
the actual routing key you have configured. 

.. image:: images/URL.jpg

.. image:: images/Configure-URL.jpg

 

After creating the topic - Click Save alarm.

Now, navigate back to Splunk On-Call and you should see an initial INFO
alert from Oracle Cloud.

Expand the Alert Payload and copy the confirmation url that is included
in the alert data under “raw.ConfirmationURL”

Finally, Paste the URL into a browser and you should see the topic
subscription confirmation message like the one below:

.. image:: images/OCI-Confirmation.jpg

Congratulations! You have successfully configured Oracle Cloud to send
alerts to VictorOps.
