.. _jenkins-delivery-spoc:

Jenkins Delivery Insights integration for Splunk On-Call
**********************************************************

.. meta::
    :description: Configure the Jenkins Delivery Insights integration for Splunk On-Call.

Jenkins is an open-source automation server written in Java. Jenkins helps to automate the machine part of software development process, with continuous integration and facilitating technical aspects of continuous delivery.

.. note:: For information on the standard integration for Jenkins, see :ref:`jenkins-spoc`.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

This integration requires the JenkinsNotification plugin. Make sure you have this plugin before you continue.

Turn on the integration
==========================

In Splunk On-Call, select :guilabel:`Settings`, :guilabel:`Alert Behavior`, :guilabel:`Integrations`, and then select :guilabel:`Jenkins Integration (Build Systems)`.

.. image:: /_images/spoc/800x320@2x.png
   :alt: Turn on the integration

If the Delivery Insights endpoint integration isn't active, select :guilabel:`Enable` to generate your endpoint destination URL. Copy the URL to your clipboard.

Jenkins configuration
=======================

Add Splunk On-Call Delivery Insights to the job of your choice by selecting :guilabel:`Configure`.

.. image:: /_images/spoc/alert-core__Jenkins_.jpg
   :alt: Configure menu in Jenkins

Under :guilabel:`Job Notifications`, select :guilabel:`Add Endpoint`.

.. image:: /_images/spoc/benchmark-pull-requests_Config__Jenkins_.jpg
   :alt: Add endpoint button location

Paste your Jenkins endpoint in the URL field, then select :guilabel:`Add Endpoint`. Make sure to save your configurations and you are done.

.. image:: /_images/spoc/benchmark-pull-requests_Config__Jenkins_-1.jpg
   :alt: Configuration screen in Jenkins

Your Jenkins build information appears from the timeline with quick links to bring you to the event.

.. image:: /_images/spoc/Timeline_-_Splunk On-Call_Events-2.jpg
   :alt: Jenkins information in the timeline

