.. _spoc-android:

************************************************************************
Android mobile devices for Splunk On-Call
************************************************************************

.. meta::
   :description: About the user roll in Splunk On-Call.


Requirements
------------

Android devices running Android 6 or newer. Splunk On-Call no longer
supports the mobile app for Android versions 5 and below.

**Note:** Using custom ROMs (or those provided by the device
manufacturer) can alter the settings and functionality described herein.
If your device utilizes a custom/manufacturer-furnished ROM, please
refer to the owner's manual (and/or other applicable literature)
provided by the ROM developer.

Best Practices
--------------

If you are unable to download the Splunk On-Call app from your
playstore, please click
`HERE <http://download.victorops.com/VictorOps.apk>`__.

Here are the things you can do to minimize your risk of missing a
notification from Splunk On-Call:

-  **Use a diverse set of notification types in your personal paging
   policy (Call, SMS, push) to avoid a single point of failure.**
-  **Test your configuration in various modes (do not disturb, vibrate
   only, etc.) via a manual incident before you go on-call.**
-  **If using Do Not Disturb, set the Splunk On-Call contact to a
   favorite and allow Favorites to bypass DND.**

--------------

Notification Delivery
---------------------

There are a number of different settings on the Android platform that
affect the delivery of Splunk On-Call notifications to your device. Due
to the critical nature of Splunk On-Call notifications, it is imperative
that you correctly configure your settings in Android and **test those
notifications before you go on call.** This article describes, in
detail, how to ensure that Splunk On-Call can reach you despite the
current state of your phone (unless it is turned off).

First, Add Splunk On-Call to your phone contacts from the bottom of the
Setting page in the app, then under Notifications. If you are planning
on using Do Not Disturb mode, please favorite the Splunk On-Call
contact.

--------------

Android Configuration Guides
----------------------------

[ht_toggle title=“Android 11” id=“” class=“” style=“” ]

After you make sure you have added the Splunk On-Call contact to your
phone and added it as a favorite, you want to then make sure you do
these steps for Setting Up the Volume Override.

You first want to open the Splunk On-Call app on your phone.

1. Once opened, go to your **Settings** (three line icon)
2. Then go to the **Notifications** tab.

_images/spoc/Android-11-ss1-1.png

Once in the Notifications section you want to select **Incident
Notifications**. Then, you will select  **Triggered Incidents** next.

In the Triggered Incidents section, you want to do a couple of things:

1. Change the Notification Sound there to something of your liking (pick
   a loud one!).
2. Make sure you toggle and enable the option for “**Override System
   Notification Volume**”.
3. Finally, Go to **Manage Channel Settings**. |image|

In the Channel Settings now, you will want to do two things:

1. Make sure the Show Notifications toggle is enabled.
2. Lastly, expand the **Advanced settings**, in there change the Sound
   setting to None. This is to avoid double sounds or ringtones.

_images/spoc/Android-11-ss3.png

**Android Settings To Check**

Now that you have made sure we configured the Splunk On-Call app to
truly receive notifications, you want to double check one last thing on
the Android Settings.

First, you want to go to the Do Not Disturb (DND) settings on our phone.
You can get there a couple of ways.

1. You can try pulling down your System Tray, once you see the icons in
   the top, you should be able to see a DND icon. Press that icon for 2
   seconds, and it should redirect you to the settings.
2. You can open your Android Settings and search for “Do Not
   Disturb”.

.. image:: /_images/spoc/Android-11-ss4.png

Once you open the DND Settings, you will want to check one thing:

1. First, you will see the section “**What Can Interrupt DND**”. You can
   select **Apps** there. Then, make sure you see **Splunk On-Call**
   there. If you don't see it, press **Add Apps**, and find
   Splunk On-Call there.

.. image:: /_images/spoc/Android-11-ss5-1.png

[/ht_toggle]

[ht_toggle title=“Android 9 and 10” id=“” class=“” style=“” ]

Sound & volume levels for notifications can be set in two places for
Splunk On-Call: in the general settings on the Android device AND within
Splunk On-Call. To ensure users still receive notifications, the
**Override system notification volume** setting within Splunk On-Call
has been updated to play an **additional** sound at MAX volume when a
notification is received. Due to limitations on Android, this sound will
play simultaneously as any sound configured for VictorOps Notifications
natively in Android unless settings are adjusted to only play one sound.
Read on to learn how to set up Volume Override for VictorOps on Android.

--------------

**Set Up the Volume Override (Android 9 and Android 10)**

From the Settings app, navigate to **Apps & notifications** > **App
info** > **Splunk On-Call > App Notifications**.

.. image:: /_images/spoc/Android_V9_1.png
   :alt: Navigate to app notifications in VictorOps

   Navigate to app notifications in VictorOps

There are seven events that generate notifications in Splunk On-Call, as
highlighted below:

.. image::_images/spoc/Android_V9_2.png
   :alt: seven events that generate notifications in VictorOps

   seven events that generate notifications in VictorOps

You may set unique notification settings for each event by clicking on
that category. Let's use **@Mentions** as the example. There are two
things to set:

1. Change **Sound** to **None** (in the event you're toggling the
   Override system notification volume setting, as outlined below)
2. Toggle on **Override Do Not Disturb**

.. image:: /_images/spoc/Android_V9_3.png
   :alt: setting sound and override toggles in VictorOps for Android

   setting sound and override toggles in VictorOps for Android

--------------

**Enable Splunk On-Call to Override Do Not Disturb Permission**

Granting Splunk On-Call paging permission to override the native Do Not
Disturb settings allows you to have your device muted for all non-paging
notifications while you sleep! The first step is to add Splunk On-Call
to your contacts. Within the Splunk On-Call app navigate to *Settings >>
Notifications* and select Import Splunk On-Call contact info (vCard).
Make sure that Splunk On-Call is starred as a favorite contact in the
native Contacts app on your phone.

From the Settings app, navigate to Sound > Do Not Disturb > Calls (found
under the heading *Exceptions*) then select *From starred contacts
only*.

.. image:: /_images/spoc/Android_V9_5.png
   :alt: Set up to receive notifications from starred contacts only

   Set up to receive notifications from starred contacts only

Do the same for Messages. From the Settings app, navigate to Sound > Do
Not Disturb > Messages, events, & reminders (found under the
heading *Exceptions*) then select *From starred contacts only* for
*Allow messages*.

.. image:: /_images/spoc/Android_V9_6.png
   :alt: configure messages in Android to receive from victorops

   configure messages in Android to receive from victorops

*Do Not Disturb* settings can be accessed by swiping down the screen
twice and long-pressing the *Do Not Disturb* icon.

--------------

**Configure Notification Settings in Splunk On-Call**

After you configured native Android settings to allow notifications from
Splunk On-Call without playing other sounds, we can now walk through how
to allow Splunk On-Call notifications to play an additional sound. This
allows Splunk On-Call to play a sound at maximum volume regardless of
what the device sound settings are.

**Override with Additional Sound**

Within the Splunk On-Call app navigate to Settings.

.. image:: /_images/spoc/Android_V9_7.png
   :alt: Override Android settings with additional sound

   Override Android settings with additional sound

Within each event (using **Triggered Incidents** as the example),
enabled the **Override System Notification volume** as shown below.
Select a preferred sound for that event by clicking on **Override
Sound**. With this setting enabled, Splunk On-Call will play that sound
at MAX volume when you receive a notification for that event, regardless
of system sound settings.

.. image:: /_images/spoc/Android_V9_8.png
   :alt: override system notification value in Android

   override system notification value in Android

*REMINDER: If you have configured native settings on your Android to
also play a sound, the two sounds will play simultaneously. Refer to the
previous section for steps on how to quiet the sound produced by the
native settings on your device and to only play the sound defined in the
VictorOps application.*

When you enable **Override System Notification Volume** in the Splunk
On-Call app, Splunk On-Call checks that permissions have been granted to
Splunk On-Call to override the native Do Not Disturb on your Android. If
you have not set this permission yet, you will be prompted with the
following warning:

.. image:: /_images/spoc/Screenshot_20190521-161752.png
   :alt: Grant VictorOps permission to override Do Not Disturb

   Grant VictorOps permission to override Do Not Disturb

Click *Continue* to be routed to the **Do Not Disturb Access** in your
Android Device. Make sure to turn the toggle **On** next to the
VictorOps app to give it access.

.. image:: /_images/spoc/Android_V9_9.png
   :alt: Toggle on do not disturb access

   Toggle on do not disturb access

**NOTE:** If Splunk On-Call does not appear in the list above, make sure
that Splunk On-Call was installed **through phone's main, top level
account** from Google Play (as opposed to a secondary or tertiary
personal/work/enterprise account). If it the app has not been installed
through the main account, VictorOps will not appear as an option.

If you have already set the override permission, you will be prompted
with the following message:

.. image:: /_images/spoc/VolumeOverrideFeature.png
   :alt: Success for Volume Override

   Success for Volume Override

[/ht_toggle]

[ht_toggle title=“Android 8” id=“” class=“” style=“” ]

Android Oreo version 8 and higher does not allow applications to
override native notification settings on the device. Sounds & volume
levels for notifications can be set in two places for Splunk On-Call: in
the general settings on the Android device AND within Splunk On-Call. To
ensure users still receive notifications, the **Override system
notification volume** setting within Splunk On-Call has been updated to
play an **additional** sound at MAX volume when a notification is
received. Due to limitations on Android, this sound will play
simultaneously as any sound configured for Splunk On-Call Notifications
natively in Android unless settings are adjusted to only play one sound.
Read on to learn how to set up Volume Override for Splunk On-Call on
Android.

--------------

**Volume Override (A8)**

From the Settings app, navigate to **Apps & notifications** > **App
info** > **Splunk On-Call > App Notifications**.

.. image:: /_images/spoc/Android-1.png

There are five events that generate notifications in Splunk On-Call, as
highlighted below:

.. image:: /_images/spoc/Android-Oreo-6.png

You may set unique notification settings for each event by clicking on
that category. Let's use **@Mentions** as the example. There are four
things to set:

1. Toggle **On** the main notification option
2. Change the **Importance** setting to **Urgent**
3. Change **Sound** to **None**
4. Toggle on **Override Do Not Disturb**

.. image:: /_images/spoc/Android-7@2x.png

By setting **Importance** to **Urgent** and **Sound** to **None**, you
will still receive a notification from Splunk On-Call for this event,
but the phone will not play an *overlapping* sound with the sound
produced by the Splunk On-Call app. Please check that the notifications
are enabled and that the importance is set to urgent for all five
events.

.. image:: /_images/spoc/Android-8@2x.png

--------------

**Enable Splunk On-Call to Override Do Not Disturb Permissions**

Granting Splunk On-Call paging permission to override the native Do Not
Disturb settings allows you to have your device muted for all non-paging
notifications while you sleep! The first step is to add Splunk On-Call
to your contacts. Within the Splunk On-Call app navigate to *Settings >>
Notifications* select Import Splunk On-Call contact info (vCard). Make
sure that Splunk On-Call is starred as a favorite contact in the native
Contacts app on your phone.

.. image:: /_images/spoc/Android-9@2x.png

From the Settings app, navigate to Sound > Do Not Disturb preferences >
Priority only Allows> Messages then select *From starred contacts
only*. 

.. image:: /_images/spoc/Android-10@2x.png

Repeat this for Calls on the *Priority only allows* screen in addition.

.. image:: /_images/spoc/Android-11@2x.png

Be sure when using *Do Not Disturb* that you select *Priority Only* to
allow Splunk On-Call notifications to pass through. *Do Not Disturb*
settings can be accessed by swiping down the screen twice and selecting
the *Do Not Disturb* icon. Enable this mode with the toggle switch in
the top right corner and then verify you are in Priority only.

--------------

**Override with Additional Sound**

Within the Splunk On-Call app navigate to Settings.

.. image:: /_images/spoc/Android-12@2x.png

Within each event (using **Triggered Incidents** as the example),
enabled the **Override System Notification volume** as shown below.
Select a preferred sound for that event by clicking on **Override
Sound**. With this setting enabled, Splunk On-Call will play that sound
at MAX volume when you receive a notification for that event.

.. image:: /_images/spoc/Android-13@2x.png

*REMINDER: If you have configured native settings on your Android to
also play a sound, the two sounds will play simultaneously. Refer to the
previous section for steps on how to quiet the sound produced by the
native settings on your device and to only play the sound defined in the
Splunk On-Call application.*

When you enable **Override System Notification Volume** in the Splunk
On-Call app, Splunk On-Call checks that permissions have been granted to
Splunk On-Call to override the native Do Not Disturb on your Android. If
you have not set this permission yet, you will be prompted with the
following warning:

.. image:: /_images/spoc/triggered-incidents-insufficient-system-settings-1.png

If you have already set the override permission, you will be prompted
with the following message:

.. image:: /_images/spoc/triggered-incidents-do-not-disturb-warning.png

Click *Continue* to be routed to the **Do Not Disturb Access** in your
Android Device. Make sure to turn the toggle **On** next to the
VictorOps app to give it access.

.. image:: /_images/spoc/Android_VictorOps_Native_Do_Not_Disturb_Access.png

--------------

**Push Notifications on Log Out**

Splunk On-Call has a setting to make sure that you'll receive
notifications to your phone whether or not you are logged in. Within
Splunk On-Call Settings, uncheck the box next to **Stop push
notifications on logout**. This setting must be **disabled** to ensure
that you continue to receive push notifications while you are logged out
of the app.

.. image:: /_images/spoc/Android-14@2x.png

--------------

[/ht_toggle]

[ht_toggle title=“Android 7” id=“” class=“” style=“” ]

Volume Override (A7)

**Step 1 - From Settings, select Apps**

.. image:: /_images/spoc/A7-1.png

**Step 2 - From Apps, select Splunk On-Call**

.. image:: /_images/spoc/A7-2.png

**Step 3 - From Splunk On-Call App info, select Permissions**

.. image:: /_images/spoc/A7-3.png

**Step 4 - Within App permissions, verify that both Phone and Storage
are “ON”**

.. image:: /_images/spoc/A7-4.png

**Step 5 - Return to Splunk On-Call App info, select Notifications**

.. image:: /_images/spoc/A7-5-1.png

**Step 6 - From Notifications, select Override Do Not Disturb**

.. image:: /_images/spoc/A7-6.png

How to Enable Do Not Disturb Permissions (A7)

**Step 1 - From Apps, select the gear icon in the upper right hand
corner**

.. image:: /_images/spoc/Step-1-A7-1.png

**Step 2 - From Configure apps, select Special access**

.. image:: /_images/spoc/Step-2-A7-1.png

**Step 3 - From Special access, select Do Not Disturb access**

.. image:: /_images/spoc/Step-3-A7-1.png

**Step 4 - From Do Not Disturb Access, verify that VictorOps is “ON”**

.. image:: /_images/spoc/Step-4-A7-1.png

How to set your Android to Do Not Disturb (A7)

**Step 1 - From Quick Settings, select Do not disturb:**

.. image:: /_images/spoc/step1.png

**Step 2 - From Do not disturb, select Priority only and choose between
“Until you turn this off” or a specified amount of time**

.. image:: /_images/spoc/step-2.png

How to enable notifications from the Splunk On-Call App during Do Not
Disturb (A7)

**Step 1 - From Sound, select Do not disturb**

.. image:: /_images/spoc/step1-new.png

**Step 2 - From Do not disturb, select Priority only allows**

.. image:: /_images/spoc/step2-new.png

**Step 3: From Priority only allows, change “Calls” to from starred
contacts only (only select this option if Splunk On-Call has been saved
as a starred contact, as mentioned above)**

.. image:: /_images/spoc/step3-new.png

[/ht_toggle]

[ht_toggle title=“Android 6” id=“” class=“” style=“” ]

Android 6 - Samsung (A6S)

Volume Override (A6S)

**Step 1 - From Settings, select Applications Volume Override**

**Step 2 - From Applications, select Application manager**

.. image:: /_images/spoc/2.png

**Step 3 - From Application manager, select Splunk On-Call**

.. image:: /_images/spoc/3.png

**Step 4 - From VictorOps Application info, select Permissions**

.. image:: /_images/spoc/4.png

**Step 5 - Within App Permissions, verify that both Phone and Storage
are “ON”**

.. image:: /_images/spoc/5.png

**Step 6 - Return to Splunk On-Call Application info, select
Notifications**

.. image:: /_images/spoc/6.png

**Step 7 - From App notifications, turn “ON” Set as priority**

.. image:: /_images/spoc/7.png

**How to Enable Do Not Disturb Permissions (A6S)**

**Step 1 - From Settings, select Lock screen and security**

.. image:: /_images/spoc/1-1.png

**Step 2 - From Lock screen and security, scroll to the bottom and
select Do not disturb permission**

.. image:: /_images/spoc/2-1.png

**Step 3 - From Do not disturb permission, verify that Splunk On-Call is
turned “ON”**

.. image:: /_images/spoc/3-1.png

**How to set your Android to Do Not Disturb (A6S)**

**Step 1 - From Settings, select Sounds and vibration**

.. image:: /_images/spoc/1-2.png

**Step 2 - From Sounds and vibration, select Do Not Disturb**

.. image:: /_images/spoc/2-2.png

**Step 3 - From Do not Disturb, select Allow exceptions**

.. image:: /_images/spoc/3-2.png

**Step 4 - From Allow exceptions, select Custom and then Priority app
notifications**

.. image:: /_images/spoc/4-1.png

**Step 5 - From Priority app notifications, verify that Splunk On-Call
is turned “ON”**

.. image:: /_images/spoc/5-1.png

**Android 6 - Nexus (A6N)**

**Volume Override (A6N)**

**Step 1 - From Settings, select Apps**

**Step 2 - From Apps, select Splunk On-Call**

.. image:: /_images/spoc/2-3.png

**Step 3 - From Splunk On-Call App info, select Permissions**

.. image:: /_images/spoc/3-3.png

**Step 4 - From App Permissions, verify both Phone and Storage are
“On”**

.. image:: /_images/spoc/4-2.png

**Step 5 - Go Back to App Info, select Notifications**

.. image:: /_images/spoc/5-2.png

**Step 6 - From App Notifications, turn Treat as Priority**

.. image:: /_images/spoc/6-1.png

**How to enable Do Not Disturb permissions (A6N)**

**Step 1 - From Settings, select Sound & notification**

.. image:: /_images/spoc/1-4.png

**Step 2 - From Sound & notification, Do Not Disturb access**

.. image:: /_images/spoc/2-4.png

**Step 3 - From Do Not Disturb access, make sure Splunk On-Call is
“On”**

.. image:: /_images/spoc/3-4.png

**How to set your Android to Do Not Disturb (A6N)**

**Step 1 - From the Quick Settings screen, select Do not disturb**

.. image:: /_images/spoc/12432134124.png

**Step 2 - From Do not disturb, select Priority Only**

.. image:: /_images/spoc/adgasdf.png

**How to enable notifications from the Splunk On-Call App during Do Not
Disturb (A6N)**

**Step 1 - From Settings, select Sound & notification**

.. image:: /_images/spoc/1-5.png

**Step 2 - From Sound & notification, select Do not disturb**

.. image:: /_images/spoc/2-5.png

**Step 3 - From Do not Disturb, select Priority only allows**

.. image:: /_images/spoc/3-5.png

**Step 4 - Within Priority only allows, select the types of
alerts/notification types you want to receive from the Splunk On-Call
App during Do Not Disturb**

.. image:: /_images/spoc/4-3.png

[/ht_toggle]

[ht_toggle title=“Android Huawei” id=“” class=“” style=“” ]

If you have a Huawei Android phone and are experiencing challenges
receiving push notifications, visit `this
link <https://2nwiki.2n.cz/pages/viewpage.action?pageId=68223777>`__ for
a guide to updating your notification settings.

[/ht_toggle]

--------------

Other Features
--------------

[ht_toggle title=“Ack from Locked Screen” id=“” class=“” style=“” ] One
of the Splunk On-Call notification options is a push notification to the
user's Android device.  When a user is notified in this fashion, while
their phone is idle (in lock-screen), they will have the option to
acknowledge the alert directly from the lock-screen notification without
requiring that they unlock the phone and access the application first.

.. image:: /_images/spoc/Android-Ack-from-Lock-1@2x.png

After you have acknowledged an incident, you will receive a success
notification confirming that your acknowledgment was successful.

.. image:: /_images/spoc/Android-Ack-from-Lock-2@2x.png

Acknowledgment via push notification may fail because performing the
acknowledgment action requires that your phone is able to contact our
servers via HTTP. If an acknowledgment action fails, you will receive a
subsequent push notification indicating that the acknowledgment failed
and providing an opportunity to try again.

.. image:: /_images/spoc/Android-Ack-from-Lock-3@2x.png

[/ht_toggle]

[ht_toggle title=“Alternate Push Service” id=“” class=“” style=“” ]

The Alternate Push Service allows users who are unable to receive
notifications from Google Cloud Messenger to reliably receive push
notifications. In the Android App, navigate to the *Settings* page by
clicking the three-slider icon in the far bottom-right corner:


Once here, scroll down to the *Notification Sound & Behavior* section.
Find the option for “Use Alternate Push Service” and toggle it on.

.. image:: /_images/spoc/Android-Alternative-push-notifications.png

Your device will prompt you for access to the associated permissions.
Click *Allow:*

.. image:: /_images/spoc/Android-Permissions.png

[/ht_toggle]

[ht_toggle title=“Troublehooting” id=“” class=“” style=“” ]

`Troubleshooting <https://help.victorops.com/knowledge-base/mobile-app-troubleshooting/>`__ 

[/ht_toggle]

--------------

.. |image| image:: /_images/spoc/Android-11-ss5.png
