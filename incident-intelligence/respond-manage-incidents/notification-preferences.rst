.. _ii-notification-preferences:

Set your on-call notification preferences
**************************************************

.. meta::
   :description: Steps to set your notification preferences for Incident Intelligence in Splunk Observability Cloud.

When you are on call, triggered incidents notify you by email by default. You can also choose to receive notifications through SMS or mobile push. To set your on-call notification preferences, follow these steps:

#. In Splunk Observability Cloud, select :guilabel:`Settings` > :guilabel:`Users` in the main menu.
#. Search for your user name and select it when it appears.
#. Go to :guilabel:`Notification Preferences`.
#. Under :guilabel:`Intelligence notifications` > :guilabel:`Receive notifications by`, select the notification methods you want to be notified by. :guilabel:`Email` is selected by default. If you want to uncheck :guilabel:`Email`, select another notification method first, then uncheck :guilabel:`Email`.
#. Next, review your :guilabel:`Contact method details` to confirm they are correct. Go to the :guilabel:`Personal Information` tab to update your contact details.
    #. For SMS notifications, if you haven't already verified your phone number, select :guilabel:`Verify` to verify your phone to receive notifications over SMS. This sends a code to your phone that you have to enter to verify your phone. You need to verify your phone every time you update your phone number under :guilabel:`Personal Details`. If you choose to receive notifications through SMS notifications, the sending phone number is dependent on the device's country location.
    #. For push notifications, check the :guilabel:`Logged-in devices for push` to verify that you are logged in to Splunk Observability Cloud for Mobile on the devices where you want to receive push notifications. See :ref:`intro-to-mobile`.
    #. (Optional) Use the :guilabel:`Test` option for each contact method to test that you receive each notification.

You are now ready to be notified of triggered incidents. 

See also
============

* :ref:`ii-respond-to-incident`
* :ref:`ii-snooze-incident`
* :ref:`ii-add-responders-roles`
* :ref:`ii-add-incident-tools-resources`
* :ref:`ii-edit-incident`
* :ref:`ii-muted-incidents`
* :ref:`ii-mtta-mttr`