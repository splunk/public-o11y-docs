Jenkins is an open-source automation server written in Java. Jenkins
helps to automate the non-human part of software development process,
with continuous integration and facilitating technical aspects of
continuous delivery.

**Note:** 

-  This integration requires you have the `Jenkins
   Notification <https://plugins.jenkins.io/notification>`__ plugin
   installed. Please make sure you have this plugin before you continue.
-  There are two Jenkins integrations, this article is for the delivery
   insights integration (build systems). View the other integration
   article
   `here <https://help.victorops.com/knowledge-base/victorops-jenkins-integration/>`__.

Enable the Integration
======================

In VictorOps, click on *Settings >> Alert Behavior >> Integrations >> 
Jenkins Integration (Build Systems)* 

.. image:: images/800x320@2x.png

 

If the Delivery Insights endpoint integration has not been enabled,
click the blue *Enable* button to generate your endpoint destination
URL. Copy the URL to your clipboard.

 

.. image:: images/Integrations_-_VictorOps_Events_🔊.jpg

 

In Jenkins
==========

Add VictorOps Delivery Insights to the Job of your choice by
selecting **Configure**.

.. image:: images/alert-core__Jenkins_.jpg

 

Under “Job Notifications” select **Add Endpoint**.

 

.. image:: images/benchmark-pull-requests_Config__Jenkins_.jpg

 

Paste your Jenkins endpoint in the URL field, then select **Add
Endpoint.** Make sure to save your configurations and you are done.

 

.. image:: images/benchmark-pull-requests_Config__Jenkins_-1.jpg

 

Now you will see your Jenkins build information right from the timeline
with quick links to bring you right to the event.

 

.. image:: images/Timeline_-_VictorOps_Events-2.jpg
