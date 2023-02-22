.. _download-mobile:

*****************************************************
Download Splunk Observability Cloud for Mobile
*****************************************************

.. meta::
  :description: See requirements, download Splunk Observability Cloud for Mobile on iOS and Android, and authenticate.

You can download Splunk Observability Cloud for Mobile from the Apple App Store or the Google Play store.

====================================================
Requirements
====================================================

To use Splunk Observability Cloud for Mobile you must be a Splunk Observability Cloud user.  

See the following tables for the minimum hardware and software requirements for Splunk Observability Mobile.


iOS requirements
--------------------
.. list-table::
   :header-rows: 1
   :widths: 50, 50 

   * - :strong:`Component`
     - :strong:`Minimum requirement`

   * - iOS version
     - iOS 13 or later 
     

   * - Hardware
     - iPhone 6s, 6s Plus, or later
    

Android requirements
------------------------
.. list-table::
   :header-rows: 1
   :widths: 50, 50 

   * - :strong:`Component`
     - :strong:`Minimum requirement`

   * - Android version
     - Android 7 or later
     

   * - Hardware
     - Any Android phone or tablet device


Other devices might work with Splunk Observability Cloud for Mobile on iOS and Android but have not been certified as compatible by Splunk.

============================================================
Download Splunk Observability for Mobile from the App Store
============================================================

#. On your mobile device, launch the App Store.
#. Enter :strong:`“Splunk Observability Cloud”` in the search bar. 
#. Tap the Splunk Observability Cloud Mobile app.
#. Tap :strong:`Get`.
#. Confirm the download with your Apple ID to install Splunk Observability Cloud for Mobile on your device.


====================================================================
Download Splunk Observability for Mobile from the Google Play store
====================================================================

#. On your mobile device, launch the Google Play store.
#. Enter :strong:`“Splunk Observability Cloud”` in the search bar.
#. Tap the Splunk Observability Cloud Mobile app.
#. Download Splunk Observability Cloud for Mobile.

.. note:: Due to Chinese network restrictions, you can't access the Splunk Observability Cloud for Mobile app from the iOS App Store or the Google PlayStore if you are in mainland China and have a device that is on a Chinese network carrier.

==========================================================
User Authentication in Splunk Observability for Mobile
==========================================================

After you download Splunk Observability Cloud for Mobile, you have a variety of authentication methods to choose from in order to access your Splunk Observability Cloud instances. 

#. Launch Splunk Observability Cloud on your mobile device.
#. Select your realm or enter a custom URL.
   When your Observability Cloud admin set up Single Sign On (SSO), they created a custom URL for your organization. The URL must be a subdomain of signalfx.com. An example of a custom URL is https://your_org.signalfx.com. The :strong:`Enter Custom URL` field is prepopulated with ``signalfx.com``. Enter the custom portion before ``signalfx.com``.
   .. image:: /_images/mobile/CustomURL-iOS.png
   :width: 99%
   :alt: This image shows the Custom URL field when logging in to Splunk Observability Cloud on iOS.
#. Choose from :strong:`User Credentials`, :strong:`Google`, or :strong:`SSO`.