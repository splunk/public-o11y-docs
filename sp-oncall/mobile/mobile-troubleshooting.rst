
.. _mobile-troubleshoot:


************************************************************************
Troubleshooting the Splunk On-Call Mobile App
************************************************************************

.. meta::
   :description: About the user roll in Splunk On-Call.


Android
-------

**Delete and Restore Splunk On-Call manually** 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Settings > Back up and Restore toggle set to OFF
2. Settings > Storage> Apps > Splunk On-Call app > Clear cache and data
3. Settings > Storage> Other > Explore > Downloads > Delete anything
   Splunk On-Call (usually where victorops.vcf lives)
4. Settings > Storage> Other > Notifications> Delete

   1. Splunk On-Call Sharp.wav
   2. Splunk On-Call Siren.wav
   3. Splunk On-Call Soothing.wav
   4. Splunk On-Call Wap.wav

5. Settings > Apps > Splunk On-Call > kebab in upper right hand corner>
   Uninstall for all users

   1. \*Double check in Android the Splunk On-Call contact has been
      removed if not remove manually
   2. \*Double check sound notifications to verify Splunk On-Call sound
      settings has been removed

6. Reinstall app from Google Play Store

**Delete and Restore Splunk On-Call using Android File Transfer**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. If using a Mac, download the Android File Transfer app
   from https://www.android.com/filetransfer/
2. Plug into computer
3. Pull down from the top of your the Phone screen to show the Android
   Notification Center
4. Look for USB for charging - Touch for more options then click it
5. You now will see a list showing: Charging only, Transfer files (MTP),
   Transfer photos (PTP) and MIDI (Choose Transfer files MTP)
6. Once the files open, Delete

   1. victorops.vcf
   2. Notifications > Splunk On-Call Sharp.wav
   3. Notifications > Splunk On-Call Siren.wav
   4. Notifications > Splunk On-Call Soothing.wav
   5. Notifications > Splunk On-Call Wap.wav
   6. Download > victorops.vcf

7. Unplug phone from computer and open to the Android Phone settings
8. Settings > Apps > Splunk On-Call > Tap the kebab in upper right hand
   corner> Uninstall for all users

   1. \*Double check in phone contacts the Splunk On-Call contact has
      been removed, if not remove manually
   2. \*Double check sound notifications to verify Splunk On-Call sound
      settings has been removed, if not remove manually

9. Reinstall app from Google Play Store

**Delayed Push Notifications**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

These screenshots show the general steps for Android 9 devices (some
device specific instructions are listed below if the battery settings
appear slightly different on a particular user's device/OS)

From your Android Settings, find the Splunk On-Call Mobile Application

/_images/spoc/Android-Battery-Saver-1@2x.png

From the Splunk On-Call App, please select *Advanced* >> *Battery*

/_images/spoc/Android-Battery-Saver-2@2x.png

From *Battery usage* settings you'll want *Battery optimization* >> *Not
optimized* >> *All apps*

/_images/spoc/Android-Battery-Saver-3@2x.png

From here, you'll **exempt** the VictorOps App from *Battery
optimization*. Select done.

/_images/spoc/Android-Battery-Saver-4@2x.png

**Intermittent Push Notifications**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If push notifications tend to only work for a short time after logging
in or reinstalling the app, a couple settings to check are **Adaptive
Battery** and **Data Saver**.

Both of these settings can limit and restrict applications and
notifications, please ensure VictorOps is exempt from these settings.

--------------

iOS
---

**Reset your Mobile Device in Splunk On-Call:**

From your mobile device: 1. Log out of the mobile app (Click the
settings icon (gear)) 2. Delete the mobile app from your device
entirely.

**From the web UI:** 3. Log in to your account and access your personal
profile (Click your username in the top right corner and select “Your
profile”) 4. Delete the device from your contact methods (You do not
need to remove any phone numbers associated with the device, just the
device itself)

**From the mobile device:** 5. Re-install the Splunk On-Call Mobile app
1. Log in to the Splunk On-Call app.

This process will redo the device association process and often clears
up any issues with the app.
