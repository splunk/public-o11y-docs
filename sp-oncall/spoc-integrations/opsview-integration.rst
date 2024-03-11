.. _opsview-integration:

************************************************************************
VividCortex integration for Splunk On-Call
************************************************************************

.. meta::
   :description: The Splunk On-Call and Opsview integration will allow you to use VictorOps as
a “Notification Method” for all your alerting needs.


The Splunk On-Call and Opsview integration will allow you to use Splunk On-Call as a Notification Method for all your alerting needs. The following is a quick walkthrough of how to set up the Opsview integration with Splunk On-Call:

In Splunk On-Call
=========================

#. In Splunk On-Call, select :guilabel:`Settings`, then :guilabel:`Alert Behavior`.
#. Next, select :guilabel:`Alert Behavior`, then :guilabel:`Integrations`, and then :guilabel:`Opsview`.

.. image:: /_images/spoc/opsview1.png
    :width: 100%


#. If the integration has not yet been enabled, select :guilabel:`Enable Integration` to generate your endpoint URL. Be sure to replace the :strong:`$routing_key` section with the actual routing keyyou intend to use. To view or configure route keys in Splunk On-Call select :guilabel:`Alert Behavior`, then :guilabel:`Route Keys`.

.. image:: /_images/spoc/opsview2.png
    :width: 100%


In Opsview
===================

From the main Dashboard select **settings** then **Notifications
Methods.**

.. image:: /_images/spoc/OpsView2-300x128.png

Select the **VictorOps** notification method 

.. image:: /_images/spoc/OpsView3-300x127.png

Make the notification method Active, and then add your routing key in
the **Contact Variables** input, and your API key in the **API
Key** input.

.. image:: /_images/spoc/OpsView4-300x110.png

You are then able to test the integration.

And you're done!

**Note:**\ * VictorOps only works with Nagios notifications, BSM
notifications are not currently supported.*

.. |image1| image:: /_images/spoc/Integration-ALL-FINAL.png
