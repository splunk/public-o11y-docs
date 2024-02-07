.. _alertsite-integration:

AlertSite by SMARTBEAR integration
******************************************

.. meta::
    :description: Configure the AlertSite integration for Splunk OnCall.



AlertSite by SMARTBEAR provides advanced synthetic monitoring platform for APIs, mobile and web applications. The Splunk OnCall integration with AlertSite allows you to send alerts into the Splunk OnCall timeline by using
the generic email endpoint. The following guide will walk you through this integration.

.. alertsite-spoc:

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

   Team routing keys are configured at the bottom of the Settings > Integrations page. For details, see `Routing
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
       -  Template name: Splunk OnCall - Monitor Error (or similar)
       -  Subject: [AlertSite] Monitor Alert - $DESCRIP CRITICAL

       .. note:: You can use another subject, but make sure it includes the word :strong:`CRITICAL` and does not include the *$STATUS* variable.

      .. image:: _images/spoc/error-template.png
         :width: 90%
         :alt: Ensure the subject field includes the word Critical rather than variables.

    #. Select :guilabel:`Save As` to save the changes as a new template.
#. To configure the ”all clear“ template:
    #. Filter the template list to show only *Alert Type: Site Clear*.
    #. Select the **AlertSite Template** for **Site Clear** with the delivery method of Text.
    
      .. image:: _images/spoc/base-clear-template.png
         :width: 90%
         :alt: Select the delivery method of Text.

    #. Select the template text in the editor to activate the edit mode.
    #. Enter the following:

       -  Template name: *Splunk OnCall - Monitor Clear* (or similar).
       -  Subject: *[AlertSite] Monitor Alert - $DESCRIP OK*

      .. note:: The subject must be exactly the same as in the error template, but with the *OK* word instead of *CRITICAL*.

      .. image:: _images/spoc/clear-template.png
         :width: 90%
         :alt: The subject must be exactly the same as in the error template, but with the OK word instead of CRITICAL.

     #. Select :guilabel:`Save As` to save the changes as a new template.

You can see the created templates on the template list:

   .. image:: _images/spoc/victorops-templates.png
      :width: 90%
      :alt: The templates you created appear on the template list.


Adding Splunk OnCall to Alert Recipients
--------------------------------------------

Next, you need to add the Splunk OnCall email endpoint that you generated in :ref:`alertsite-spoc:` as an alert recipient in AlertSite:

#. In the AlertSite, navigate to :guilabel:`Alerts` then :guilabel:`Alert Recipient`.
#. Select :guilabel:`+ New Recipient`.
#. In the dialog that appears, enter the following:
    -  Name - any name, for example, *Splunk OnCall*
    -  Recipient - the email address you generated in Splunk OnCall
    -  Mode - *E-mail (text format)\ *


      .. image:: _images/spoc/add-victorops-recipient.png
         :width: 90%
         :alt: Add the email address generated in an earlier step 

   - Click :guilabel:`Submit`.
#. Select the created recipient and click :guilabel:`Edit Recipient`.
#. On the :guilabel:`Availability Alerts` tab, set the option to Alert whenever an error clears. This is needed to automatically resolve incidents in Splunk OnCall when an error clears in AlertSite.

      .. image:: _images/spoc/availability-alerts-settings.png
         :width: 90%
         :alt: Set the option to Alert whenever an error clears.

#. Configure other options as needed. For a description of available options, see `Recipient Properties - Availability
   Alerts <http://doc.alertsite.com/synthetic/alerts/editing-recipients.htm#availabillity>`__.
#. Click :guilabel:`Submit`.


Assigning Custom Templates to Splunk OnCall Email Alerts
-----------------------------------------------------------

Now, you need to assign your custom alert templates to the Splunk OnCall alert recipient. To do this, you need to create a `recipient group <http://doc.alertsite.com/synthetic/alerts/recipient-groups.htm>` that contains the Splunk OnCall recipient, the custom templates, and the monitor whose alerts you want to send to Splunk OnCall:

#. In AlertSite, navigate to :guilabel:`Alerts`, then :guilabel:`Recipient Groups`. 
#. Select :guilabel:`New Recipient Group`.
#. Enter a name for the group.
#. Under :guilabel:`Monitors`, add the monitors that should send alerts to Splunk OnCall.
#. Under :guilabel:`Recipients`, add the Splunk OnCall recipient.
#. Under :guilabel:`Custom Templates`, add the Splunk OnCall “error” and “clear” templates that you created earlier.
#. Optionally: Under :guilabel:`Error Types`, select specific error codes that should be reported to Splunk OnCall The default value is all errors.
#. Select :guilabel:`Save as new`.

Now, the specified monitors will send alerts to Splunk OnCall.

Viewing Alerts in Splunk OnCall
-------------------------------------------

You can view AlertSite alerts in the Splunk OnCall :guilabel:`Timeline` and :guilabel:`Incidents` tabs.

Select :guilabel:`More info` to view the alert contents, including the description of the error occurred:

The team members can then acknowledge the incidents and take action to resolve them. The incidents will also be resolved automatically when a “clear” notification arrives from AlertSite.

