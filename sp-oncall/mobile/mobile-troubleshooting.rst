
.. _mobile-troubleshoot:


************************************************************************
Troubleshooting the Splunk On-Call Mobile App
************************************************************************

.. meta::
   :description: Troubleshooting tips for Splunk On-Call mobile app.


Android
===============

Delete and Restore Splunk On-Call manually
----------------------------------------------------------

1. Navigate to :guilabel:`Settings`, then set the :guilabel:`Back up and Restore` option to off.
2. Under :guilabel:`Settings`, select :guilabel:`Storage`, then :guilabel:`Apps`.
3. Select the :guilabel:`Splunk On-Call app`, then select :guilabel:`Clear cache and data`.
4. In :guilabel:`Settings`, select :guilabel:`Storage` then :guilabel:`Other`. Select :guilabel:`Explore`, then :guilabel:`Downloads`, and select :guilabel:`Delete anything Splunk On-Call`
5. In :guilabel:`Settings`, select :guilabel:`Storage` and then :guilabel:`Other`. Next select :guilabel:`Notifications` and then :guilabel:`Delete` to delete the following files:

   * Splunk On-Call Sharp.wav
   * Splunk On-Call Siren.wav
   * Splunk On-Call Soothing.wav
   * Splunk On-Call Wap.wav

6. Under :guilabel:`Settings`, :guilabel:`Apps` and then :guilabel:`Splunk On-Call` select the kebab in upper right hand corner and choose :guilabel:`Uninstall for all users`. Verify that:
   

   * Double check in Android the Splunk On-Call contact has been
      removed if not remove manually
   * Double check sound notifications to verify Splunk On-Call sound
      settings has been removed

7. Reinstall the Splunk On-Call app from Google Play Store

Delete and Restore Splunk On-Call using Android File Transfer
-----------------------------------------------------------------------

1. If using a Mac, download the Android File Transfer app from :new-page:`https://www.android.com/filetransfer/`.
2. Plug into computer.
3. Pull down from the top of your the Phone screen to show the Android Notification Center
4. Look for USB for charging - Touch for more options then click it
5. You now will see a list showing: Charging only, Transfer files (MTP), Transfer photos (PTP) and MIDI (Choose Transfer files MTP)
6. Once the files open, delete the following:

   1. victorops.vcf
   2. Notifications > Splunk On-Call Sharp.wav
   3. Notifications > Splunk On-Call Siren.wav
   4. Notifications > Splunk On-Call Soothing.wav
   5. Notifications > Splunk On-Call Wap.wav
   6. Download > victorops.vcf

7. Unplug phone from computer and open to the Android Phone settings
8. Under :guilabel:`Settings`, :guilabel:`Apps` and then :guilabel:`Splunk On-Call` select the kebab in upper right hand corner and choose :guilabel:`Uninstall for all users`.

   * Double check in phone contacts the Splunk On-Call contact has been removed, if not remove manually
   * Double check sound notifications to verify Splunk On-Call sound settings has been removed, if not remove manually

9. Reinstall app from Google Play Store



Intermittent Push Notifications
---------------------------------------

If push notifications tend to only work for a short time after logging in or reinstalling the app, a couple settings to check are Adaptive Battery and Data Saver.

Both of these settings can limit and restrict applications and notifications, please ensure Splunk On-Call is exempt from these settings.


iOS
==========

Reset your Mobile Device in Splunk On-Call:

From your mobile device: 
1. Log out of the mobile app (Click the settings icon (gear)) 
2. Delete the mobile app from your device entirely.

From the web UI: 

3. Log in to your account and access your personal profile (Click your username in the top right corner and select “Your
profile”) 
4. Delete the device from your contact methods. You do not need to remove any phone numbers associated with the device, just the
device itself.

From the mobile device:
5. Re-install the Splunk On-Call Mobile app
1. Log in to the Splunk On-Call app.

This process will redo the device association process and often clears up any issues with the app.
