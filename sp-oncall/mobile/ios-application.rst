.. _spoc-ios:

************************************************************************
iOS for mobile Splunk On-Call
************************************************************************

.. meta::
   :description: About the user roll in Splunk On-Call.


This article will help iOS users understand the features and
capabilities that are specific to the iOS version of the Splunk On-Call
mobile application.

Add Splunk On-Call Contact
--------------------------

Splunk On-Call uses a total of six source phone numbers for delivery of
phone call and SMS notifications in the US. (`Full list
here <http://help.victorops.com/knowledge-base/victorops-phone-numbers/>`__) 
This is part of a load balancing strategy that helps us ensure timely
delivery of notifications. Luckily, you do not need to manually create a
contact and add these numbers.  There is a feature within the app that
will do this for you.

Click on the *Settings* Menu in the bottom right corner of the
application, click on the Notifications button, then   to find choose
**Add Splunk On-Call to Your Contacts.**

|image1|\ |image2|

This will automatically create a new contact with all of the Splunk
On-Call numbers already included.

This will give you the ability to **add Splunk On-Call to your
Favorites**, in order to ensure that calls from Splunk On-Call are able
to **override Do Not Disturb mode**.  It also allows you to give the
Splunk On-Call contact “\ **Emergency Bypass”** capabilities, ensuring
that you will always get your phone and SMS notifications regardless of
the state of your phone (provided it is turned on).

--------------

iOS App Permission Settings
---------------------------

Having the appropriate permissions and settings on your device is
crucial to ensuring that you receive all of your Splunk On-Call
notifications.

Below are permissions settings we highly recommend for your iOS device:

**General App Permissions**
~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Navigate to your iOS *Settings*. Scroll down to the application
   settings and select Splunk On-Call.
-  In the Splunk On-Call settings, make sure *Cellular Data* is **ON**
-  Make sure Push Notifications permissions are **ON**. **NOTE:** If
   Push Notification permissions are not granted to the Splunk On-Call
   app, the device will not register with Splunk On-Call and hence will
   not appear in your user profile.
-  Navigate to *Notifications (Badges, Sounds, Banners)* and make sure
   that all settings are turned **ON**.

|image3|\ |image4|

 

Do Not Disturb Mode
~~~~~~~~~~~~~~~~~~~

Push Notifications
^^^^^^^^^^^^^^^^^^

-  To override Do Not Disturb mode for paging Push notifications, ensure
   that the *Allow Critical Alerts* toggle is enabled as defined in the
   above section
-  Next, navigate to the settings section of the app,
   then *Notifications*
-  Enable the toggle for *Incidents are Critical Alerts*

SMS/Phone Calls
^^^^^^^^^^^^^^^

-  |image5|\ Splunk On-Call must be added as a contact
-  Then add Splunk On-Call as a favorite in your contacts list
-  To add Splunk On-Call as a favorite, you will want to go to your
   Contacts >> Splunk On-Call Contact >> Add to Favorites
-  Be sure to have the proper  *Do Not Disturb* settings enabled. To do
   so, select *Settings >> Do Not Disturb >>*  Allow Calls from
   *Favorites*

This will allow you to receive calls and SMS messages when you are in
*Do Not Disturb*.

--------------

Emergency Bypass
~~~~~~~~~~~~~~~~

You have the option to set Splunk On-Call as an Emergency Bypass
contact. This will allow the Splunk On-Call contact to contact you when
you're in *Do Not Disturb*, without adding the contact as a favorite.

To add Splunk On-Call as an Emergency Bypass contact, go to Contacts >>
your Splunk On-Call contact >> Text Tone >> Toggle Emergency Bypass
**ON**

Notification Settings in the Splunk On-Call App
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 images/Incident-Settings.png

 

Within your Splunk On-Call Settings Menu, you can edit your Notification
sounds preferences.

-  Select Incident Notifications >> Sounds
-  Customize sound settings for Triggered Incidents/Resolved Incidents
-  Here you will also find your lock screen options for Incident
   Previews and Incident Quick Actions, these are automatically set to
   **ON**.

 

 

--------------

Ack From Lock Screen
--------------------

One of the Splunk On-Call notification options is a push notification to
your iOS device. When being notified via PUSH notification while your
phone locked, you have the convenience to acknowledge the alert directly
from the lock-screen.

**NOTE:** This looks different on iPhone 6 and earlier versus iPhone 6s
and later. 

 images/Screen-Shot-2020-06-03-at-1.43.32-PM.png

 

 

-  By Swiping to the left, you will see Manage \| View \| Clear to
   select from
-  For iPhone 6s and later, press hard to activate the 3D touch feature
   and reveal all of the actions and options you can take
-  After you have acknowledged an incident, you'll receive a success
   notification confirming that your acknowledgment was successful

 

 

 

iOS App Troubleshooting
-----------------------

**How to Submit a Swipe Report**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Swipe across the screen from right to left with two fingers**

 _images/spock/Swipe-Report.png

 

 

 

-  Swipe from **right to lef**\ t with **two fingers** and this window
   will appear
-  Select ‘**Report a Bug**' or ‘**Suggest an Improvement**'
-  From there you will be prompted in another screen where you can add
   more information to your report, take a screen recording, screenshot,
   or attach a screenshot from your Camera Roll

 

 

 

**Reset your Mobile Device in Splunk On-Call:**

From your mobile device: 1. Log out of the mobile app (Click the
settings icon (gear)) 2. Delete the mobile app from your device
entirely.

**From the webUI:** 3. Log in to your account and access your personal
profile (Click your username in the top right corner and select “Your
profile”) 4. Delete the device from your contact methods (You do not
need to remove any phone numbers associated with the device, just the
device itself)

**From the mobile device:** 5. Re-install the Splunk On-Call Mobile app
1. Log in to the Splunk On-Call app.

This process will redo the device association process and often clears
up any issues with the app.

.. |image1| image:: images/IMG_2632.jpg
.. |image2| image:: images/IMG_2633.jpg
.. |image3| image:: images/Image-from-iOS-23.png
.. |image4| image:: images/Image-from-iOS-24.png
.. |image5| image:: images/Favorites.png
