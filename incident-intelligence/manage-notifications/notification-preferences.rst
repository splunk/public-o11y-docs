.. _ii-notification-preferences:

Set your on-call notification preferences
**************************************************

.. meta::
   :description: Steps to set your notification preferences for Incident Intelligence in Splunk Observability Cloud.

When you are on call, triggered incidents notify you by email by default. You can also choose to receive notifications through SMS, mobile push, or voice. To set your on-call notification preferences, follow these steps:

#. In Splunk Observability Cloud, select :guilabel:`Settings` > :guilabel:`Users` in the main menu.
#. Search for your user name and select it when it appears.
#. Go to :guilabel:`Notification Preferences`.
#. Under :guilabel:`Intelligence notifications` > :guilabel:`Receive notifications by`, select the notification methods you want to be notified by. :guilabel:`Email` is selected by default. If you want to uncheck :guilabel:`Email`, select another notification method first, then uncheck :guilabel:`Email`.
#. Next, review your :guilabel:`Contact method details` to confirm they are correct. Go to the :guilabel:`Personal Information` tab to update your contact details.
    #. For SMS notifications, if you haven't already verified your phone number, select :guilabel:`Verify` to verify your phone to receive notifications over SMS. This sends a code to your phone that you have to enter to verify your phone. You need to verify your phone every time you update your phone number under :guilabel:`Personal Details`. If you choose to receive notifications through SMS notifications, the sending phone number is dependent on the device's country location.
    #. For push notifications, check the :guilabel:`Logged-in devices for push` to verify that you are logged in to Splunk Observability Cloud for Mobile on the devices where you want to receive push notifications. See :ref:`intro-to-mobile`.
    #. (Optional) Use the :guilabel:`Test` option for each contact method to test that you receive each notification.

You are now ready to be notified of triggered incidents. 

Receive notifications on your mobile phone
================================================

There are a number of different settings on the Android platform that affect the delivery of Splunk Incident Intelligence notifications to your device. Here are the things you can do to minimize your risk of missing a notification from Splunk Observability Cloud for Mobile:

* Use a diverse set of notification types in your personal notification preferences (voice, SMS, push) to avoid a single point of failure.
* Test your configuration in various modes for example, do not disturb, vibrate only, using a manual incident before you go on call.
* If using Do Not Disturb, set  Splunk Observability Cloud for Mobile contact to a favorite and allow Favorites to bypass Do Not Disturb (DND).

See the following sections for operating system-specific information.

Notification delivery on iOS
===================================

To ensure you receive notifications from Incident Intelligence, follow these steps:

#. Open Splunk Observability Cloud for Mobile app on your phone.
#. Select :guilabel:`Settings`
#. Enable :guilabel:`Incident Notifications are Critical Alerts` to ensure incident notifications are not muted by the system.
#. When prompted, confirm that the Splunk Observability Cloud for Mobile app can send push notifications.
#. Review the options for notifications, sounds, badges, and banners are turned on to ensure you do not miss incident notifications if your phone is locked or set to Do Not Disturb.
    .. image:: /_images/incident-intelligence/incident-intelligence-iOS-notif-override.png
        :width: 40%
        :alt: In the Triggered Incidents section, manage your notification settings to ensure you receive incident notifications while not receiving dual notifications from the app and your mobile device settings.


Notification delivery on Android
===================================

Splunk Observability Cloud for Mobile supports Android devices running Android 8 or newer.

.. note:: Using custom Read Only Memory (ROMs) (or those provided by the device manufacturer) can alter the settings and functionality described herein. If your device utilizes a custom or manufacturer-furnished ROM, see the owner's manual or other applicable literature provided by the ROM developer.

There are a number of different settings on the Android platform that affect the delivery of Splunk Incident Intelligence notifications to your device. Due to the critical nature of Splunk Incident Intelligence notifications, it is important that you correctly configure your settings on your mobile phone and test those notifications before you go on call. 

* Add Splunk Incident Intelligence to your phone contacts from the bottom of the Setting page in the app, then under Notifications. 
* If you are planning on using Do Not Disturb mode, favorite the Splunk Incident Intelligence contact and ensure that in your mobile phone settings, Splunk Incident Intelligence is one of the contacts allowed to override Do Not Disturb mode.


Set up volume override on Android
----------------------------------------

Depending on the version of Android you are using, it might be possible to set the sound and volume levels for notifications in two places for Splunk Observability Cloud for Mobile: in the general settings on your Android device and within Splunk Observability Cloud for Mobile.

To set the volume override follow these steps:

#. Open Splunk Observability Cloud for Mobile app on your phone.
#. Select :guilabel:`Settings`, then go to the :guilabel:`Notifications` tab.
#. Select :guilabel:`Incident Notifications`.
#. In the :guilabel:`Triggered Incidents` section:
    #. Change the Notification Sound to your preference.
    #. Ensure you turn on the option to Override System Notification Volume. This ensures that the notification sound plays at maximum volume.
        #. Select :guilabel:`Manage Channel Settings` and do the following:
        #. Ensure :guilabel:`Show notifications` is turned on.
        #. (Optional) To avoid double sounds or ringtones being issued by the Splunk Observability Cloud for Mobile app and your Android system settings, expand the :guilabel:`Advanced settings` and change the Sound setting to None. 
        


Android system settings to check
------------------------------------

Check your Android system settings to ensure you receive notification from the Splunk Observability Cloud for Mobile app. How to do this might vary depending on the version of Android you are using. See your Android documentation for specific instructions.

* Ensure that your Do Not Disturb (DND) settings are set to allow notifications, including calls or notifications, from the Splunk Observability Cloud for Mobile app to override any DND settings. 

        .. image:: /_images/incident-intelligence/incident-intelligence-notif-override.png
            :width: 60%
            :alt: In the Triggered Incidents section, manage your notification settings to ensure you receive incident notifications while not receiving dual notifications from the app and your mobile device settings.

See also
============

* :ref:`ii-prevent-spam`
* :ref:`ii-sending-phone-numbers`
* :ref:`ii-example-notifications`