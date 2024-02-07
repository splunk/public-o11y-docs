ConnectWise Automate, formerly LabTech, is the same powerful remote
monitoring and management solution to help you eliminate technician
inefficiencies, automate your IT services, and master proactive IT
service delivery.  The following guide will walk you through this
integration.

In VictorOps

From the VictorOps web portal, select **Settings** >> **Alert Behavior**
>> **Integrations**.

..image images/Integration-ALL-FINAL.png

Select the **Email** integration option.

..image images/Integration-Email-final.png

Click **Enable Integration**.

|image\ Copy the **Email Address** to the clipboard.  Be sure to
replace the “$routing_key” section with the actual routing key you
intend to use. (To view or configure route keys in VictorOps,
click **Alert Behavior**, then **Route Keys**).  Select how you would
like an alert to be categorized when an email is not parsable from the
“Email Options” dropdown menu.

..image images/Integration-Email-3-final.png

In ConnectWise Automate
-----------------------

From the ConnectWise Automate Control Center, select **Dashboard**.

..image images/Screenshot__5__png__11_documents__11_total_pages_.png

Select **Management** from the “System Dashboard”.

..image images/Screenshot__6__png__11_documents__11_total_pages_.png

Select the **Alert Templates** tab.

..image images/Screenshot__7__png__11_documents__11_total_pages_.png

Click on **New Template**.

..image images/Screenshot__8__png__11_documents__11_total_pages_.png

Enter a name for the alert template in the “Name” field, then
click **Add Alerts**.

..image images/Screenshot__9__png__11_documents__11_total_pages_.png

Click **New Alert**.

..image images/Screenshot__21__png.png

Check the “Warning” and “Error” boxes for “Email” under “Alert Actions”,
then check “Everyday” next to “Select the days of the week to use these
template settings.”

..image images/Screenshot__10__png__11_documents__11_total_pages_.png

Paste the following code into the “Alert Message on Success” and “Alert
Message on Failure” fields.

name:%NAME% status:%STATUS% clientName:%CLIENTNAME%
computerName:%COMPUTERNAME% locationName:%LOCATIONNAME%
fieldName:%FIELDNAME% result:%RESULT% failCount:%FailCount% when:%when%
contactName:%ContactName%

..image images/Screenshot__11__png__11_documents__11_total_pages_.png

Select the “Alert Contact” option that you want to associate this alert
with, then click **Save**.

..image images/Screenshot__11__png__11_documents__11_total_pages_-1.png

Close windows until you are back at the “System Dashboard” window, then
select the **Config** tab.

..image images/Screenshot__6__png__11_documents__11_total_pages_-1.png

In the “System” tab, paste the “Email Address” from the “In VictorOps”
section into the “Support Email” field, then configure the SMTP and POP
settings, then click **Save**.

..image images/Screenshot__20__png__11_documents__11_total_pages_.png

You have completed setting up this integration.  If you have any
questions, please contact `VictorOps
support <mailto:Support@victorops.com?Subject=ConnectWise%20Automate%20VictorOps%20Integration>`__.

.. |image1 images/Integration-Email-2-final.png
