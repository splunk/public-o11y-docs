.. _alertsite-integration:

AlertSite by SMARTBEAR integration
******************************************

.. meta::
    :description: Configure the AlertSite integration for Splunk OnCall.



AlertSite by SMARTBEAR provides advanced synthetic monitoring platform for APIs, mobile and web applications. The Splunk OnCall integration with AlertSite allows you to send alerts into the Splunk OnCall timeline by using
the generic email endpoint. The following guide will walk you through this integration.



In Splunk OnCall
=============================

To enable the AlertSite integration in Splunk OnCall to be able to trigger and resolve incidents via email:

#. In Splunk OnCall, navigate to :guilabel:`Settings`, then :guilabel:`Alert Behavior`. Select :guilabel:`Integrations` and select AlertSite.

    .. image:: /_images/spoc/Integration-alertsite.png
      :width: 90%
      :alt: Under All integrations, select the AlertSite logo.

#. If it is not already enabled, select :guilabel:`Enable Integration`. This will generate an email address to which you can send email alerts. Note down this address. You will need to specify it in the AlertSite application.

    .. image:: /_images/spoc/alertsite-integrationEmail.png
      :width: 90%
      :alt: Record the Service Email address for use in following steps.
         
#. The *$routing_key* should be replaced with the key of a team to which you want to route the alerts. For example:

    db212e48-……8669\:strong:`+databaseteam`\ @alert.victorops.com

   Team routing keys are configured at the bottom of the Settings > Integrations** page. For details, see `Routing
Keys <http://help.victorops.com/knowledge-base/routing-keys/>`.
#. If you do not use routing, remove the *+$routing_key* part, including the plus sign, so that the email looks like this:

    db212e48-……8669@alert.victorops.com



Configuring AlertSite
==============================


Customizing Email Templates
---------------------------------

When using the Splunk OnCall email endpoint, the email subject must include specific keywords - CRITICAL or PROBLEM to open a new incident, and RESOLVED or OK to resolve an incident. You can customize AlertSite email alerts to include these keywords.

.. note:: The email subject line must be the same in both the error and clear templates (apart from the CRITICAL/PROBLEM and RESOLVED/OK words). This is needed for Splunk OnCall to recognize that the “clear” email is related to the incident opened by the “error” email. For example, do not use the $STATUS variable in the subject line, because the status code will be different in the “error” and “clear” alerts, and, in this case, Splunk OnCall will not be able to match these alerts.

To create custom alert templates for Splunk OnCall in AlertSite:

#. In the AlertSite user interface, navigate to :guilabel:`Alerts` then :guilabel:`Template Editor`.
#. To configure the error template:
    #. Filter the template list to show only Alert Type: Site Error.
    #. On the list, select the AlertSite Template for :strong:`Site Error`` with the delivery method :strong:`Text`. 
    #. Select the template text in the editor to activate the edit mode.
    #. Enter the following:
       -  Template name: VictorOps - Monitor Error (or similar)
       -  Subject: [AlertSite] Monitor Alert - $DESCRIP CRITICAL

       .. note:: You can use another subject, but make sure it includes the word :strong:`CRITICAL` and does not include the *$STATUS* variable.

      .. image:: images/spoc/error-template.png
         :width: 90%
         :alt: Ensure the subject field includes the word Critical rather than variables.

    #. Select :guilabel:`Save As` to save the changes as a new template.
#. To configure the ”all clear“ template:
    #. Filter the template list to show only *Alert Type: Site Clear*.
    #. Select the **AlertSite Template** for **Site Clear** with the delivery method of Text.
    
      .. image:: images/spoc/base-clear-template.png
         :width: 90%
         :alt: Select the delivery method of Text.

    #. Select the template text in the editor to activate the edit mode.
    #. Enter the following:

       -  Template name: *VictorOps - Monitor Clear* (or similar).
       -  Subject: *[AlertSite] Monitor Alert - $DESCRIP OK*

      .. note:: The subject must be exactly the same as in the error template, but with the *OK* word instead of *CRITICAL*.

      .. image:: images/spoc/clear-template.png
         :width: 90%
         :alt: The subject must be exactly the same as in the error template, but with the OK word instead of CRITICAL.

     #. Select :guilabel:`Save As` to save the changes as a new template.

You can see the created templates on the template list:

   .. image:: images/spoc/victorops-templates.png
      :width: 90%
      :alt: The templates you created appear on the template list.


Adding Splunk OnCall to Alert Recipients
--------------------------------------------

Next, you need to add the VictorOps email endpoint that you `generated
earlier <https://help.victorops.com/knowledge-base/alertsite-integration-guide-victorops/#victorops-email>`__
as an alert recipient in AlertSite:

-  In AlertSite UXM, go to **Alerts > Alert Recipients**.
-  Click **+ New Recipient**.
-  In the dialog that appears, enter the following:

   -  Name – any name, for example, *VictorOps*
   -  Recipient – the email address you generated in VictorOps
   -  Mode – *E-mail (text format)\ *

-  Click **Submit**.
-  Select the created recipient and click **Edit Recipient**.
-  On the **Availability Alerts** tab, set the option to **Alert
   whenever an error clears**. This is needed to automatically resolve
   incidents in VictorOps when an error clears in AlertSite.\ |image7|
-  Configure other options as needed. For a description of available
   options, see `Recipient Properties - Availability
   Alerts <http://doc.alertsite.com/synthetic/alerts/editing-recipients.htm#availabillity>`__.
-  Click **Submit**.

Assigning Custom Templates to VictorOps Email Alerts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now, you need to assign your custom alert templates to the VictorOps
alert recipient. To do this, you need to create a `recipient
group <http://doc.alertsite.com/synthetic/alerts/recipient-groups.htm>`__
that contains the VictorOps recipient, the custom templates, and the
monitor whose alerts you want to send to VictorOps:

-  In AlertSite UXM, go to **Alerts > Recipient Groups**.
-  Click **+ New Recipient Group**.\ |image8|
-  Enter a name for the group.
-  Under **Monitors**, add the monitors that should send alerts to
   VictorOps.
-  Under **Recipients**, add the VictorOps recipient.
-  Under **Custom Templates**, add the VictorOps “error” and “clear”
   templates that you created earlier.\ |image9|
-  (Optional) Under **Error Types**, select specific error codes that
   should be reported to VictorOps. The default value is all errors.
-  Click **Save as new**.

Now, the specified monitors will send alerts to VictorOps.

Viewing Alerts in VictorOps
---------------------------

You can view AlertSite alerts in the VictorOps **Timeline** and
**Incidents** tabs:

|AlertSite alert in VictorOps|

Click **More info** to view the alert contents, including the
description of the error occurred:

|Alert details|

The team members can then acknowledge the incidents and take action to
resolve them. The incidents will also be resolved automatically when a
“clear” notification arrives from AlertSite.

If you have any questions please contact `VictorOps
support <mailto:Support@victorops.com?Subject=Alert%Site%20VictorOps%20Integration>`__.

.. |image1| image:: images/Integration-AlertSite-Final.png
.. |image2| image:: images/AlertSiteIntegrationEmail@2x-2.png
.. |image3| image:: images/envelope.png
.. |Base error template| image:: images/base-error-template.png
.. |image4| image:: images/envelope.png
.. |image5| image:: images/base-clear-template.png
.. |image6| image:: images/victorops-templates.png
.. |image7| image:: images/availability-alerts-settings_thumb_0_300.png
.. |image8| image:: images/new-recipient-group.png
.. |image9| image:: images/recipient-group_thumb_600_0.png
.. |AlertSite alert in VictorOps| image:: images/victorops-incident_thumb_700_0.png
   :target: http://doc.alertsite.com/Resources/Images/synthetic/integrations/victorops/victorops-incident.png
.. |Alert details| image:: images/victorops-alert-details_thumb_550_0.png
   :target: http://doc.alertsite.com/Resources/Images/synthetic/integrations/victorops/victorops-alert-details.png
