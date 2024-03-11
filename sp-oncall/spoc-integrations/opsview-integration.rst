.. _opsview-integration:

************************************************************************
VividCortex integration for Splunk On-Call
************************************************************************

.. meta::
   :description: The Splunk On-Call and Opsview integration will allow you to use Splunk On-Call as a “Notification Method” for all your alerting needs.


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

#. From the main dashboard, select :guilabel:`Settings`, then :guilabel:`Notification Methods`.

.. image:: /_images/spoc/opsview3.png
    :width: 100%


#. Select the :guilabel:`VictorOps` (Splunk On-Call) notification method.

.. image:: /_images/spoc/opsview4.png
    :width: 100%


#. Make the notification method Active, and then add your routing key in the :guilabel:`Contact Variables`, and your API key in the :guilabel:`API Key` input.

.. image:: /_images/spoc/opsview5.png
    :width: 100%

You are then able to test the integration.


.. Note:: Splunk On-Call only works with Nagios notifications, BSM notifications are not currently supported.

