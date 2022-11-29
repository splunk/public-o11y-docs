.. include:: /_includes/incident_intelligence/incident-intelligence-preview-header.rst

.. _ii-notification-preferences:

Set your on-call notification preferences
**************************************************

When you are on call, triggered incidents notify you by email by default. You can also choose to receive notifications via SMS or mobile push. To set your on-call notification preferences follow these steps:

#. Go to :guilabel:`Settings` > :guilabel:`Users` in the main menu.
#. Search for your user and select it when it appears.
#. Go to :guilabel:`Notification Preferences`.
#. Under :guilabel:`Intelligence notifications` > :guilabel:`Receive notifications by` select the notification methods you want to be notified by. :guilabel:`Email` is selected by default. If you want to uncheck :guilabel:`Email`, select another notification method first, then uncheck :guilabel:`Email`.
#. Next, review your :guilabel:`Contact method details` to confirm they are correct. Go to the :guilabel:`Personal Information` tab to update your contact details.
#. For SMS notifications, if you you haven't already verified your phone number, select :guilabel:`Verify` to verify your phone to receive notifications via SMS. This sends a code to your phone that you have to enter to verify your phone. Each time you update your phone number under :guilabel:`Personal Details` you will need to verify your phone.
#. For push notifications, check the :guilabel:`Logged-in devices for push` to verify that you are logged in to Splunk Observability Cloud for Mobile on the devices where you want to receive push notifications. See :ref:`intro-to-mobile`.
#. (Optional) Use the :guilabel:`Test` option for each contact method to test that you receive each notification.

You are now ready to be notified of triggered incidents. 

SMS notification phone numbers
======================================

If you choose to receive notifications via SMS notifications, the sending phone number is dependent on the device country location. numbers. 

See also
============

* :ref:`ii-respond-to-incident`
* :ref:`ii-snooze-incident`
* :ref:`ii-add-responders-roles`
* :ref:`ii-add-incident-tools-resources`
* :ref:`ii-edit-incident`
* :ref:`ii-muted-incidents`
* :ref:`ii-mtta-mttr`