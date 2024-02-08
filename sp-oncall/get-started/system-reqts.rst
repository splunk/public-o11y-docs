.. _system-reqts:

************************************************************************
Splunk On-Call system requirements
************************************************************************

.. meta::
   :description: Splunk On-Call system requirements, including browsers, mobile support, and incident requirements.



Web Application
=========================

The Splunk On-Call web application supports the following browsers:

Google Chrome (latest version)
Mozilla Firefox (latest version)
Microsoft Internet Explorer 11
Microsoft Edge (latest version)
Safari (latest version)
Please note: Custom browser extensions may interfere with web-client performance.

.. In the future, Splunk On-Call will support the Chromium version of Microsoft Edge, and eventually, discontinue support for IE11.

For IP and Egress filtering, see :ref:`egress-filtering-cloudfare`.

Mobile Application
========================

For full mobile functionality, Splunk On-Call recommends keeping up to date with the latest versions of the mobile app for iOS (Apple App Store) and Android (Google Play Store).

Splunk On-Call supports Android devices running Android 6 or newer. Splunk On-Call no longer supports the mobile app for Android versions 5 and below.

Incident Requirements
=============================

A JSON POST request is required to send an alert payload to the Splunk On-Call timeline. For required field variables, see :ref:`incident-fields-glossary`.

