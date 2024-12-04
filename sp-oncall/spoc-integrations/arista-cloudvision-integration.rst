.. _arista-cloudvision-spoc:

Arista CloudVision for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Arista CloudVision integration for Splunk On-Call.

Arista CloudVision is a multi-domain management platform that uses cloud networking principles to deliver a simplified NetOps experience. 

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise


Splunk On-Call configuration
==============================

#. From the Splunk On-Call web portal, select :guilabel:`Integrations` then :guilabel:`Prometheus`. 
#. Select  the :guilabel:`Prometheus` integration and copy the :guilabel:`Service API Endpoint` to your clipboard.

CloudVision configuration
============================

#. In Arista CloudVision, go to :guilabel:`Events` then :guilabel:`Notification Configuration` then :guilabel:`Platforms`.  
#. Scroll to the :guilabel:`VictorOps` section and paste the Service API Endpoint you previously copied in the :guilabel:`VictorOps API Key` field. Leave the :guilabel:`VictorOps URL` field blank.
#. Next, configure this platform in a receiver by going to :guilabel:`Events` then :guilabel:`Notification Configuration` then :guilabel:`Receivers`.
#. Select :guilabel:`Add Receivers`.
#. Enter the receiver name in the :guilabel:`Receiver Name` field and select :guilabel:`Add Configuration`.  
#. Select the :guilabel:`VictorOps` option in the table, including the :guilabel:`routing key` you want to notify in Splunk On-Call. For more information on routing keys or instructions on creating a new one, see :ref:`spoc-routing-keys`. If required, select the :guilabel:`Send alert when events are resolved` checkbox.
#. Next, configure rules to define when the receiver is used. Go to :guilabel:`Events` then :guilabel:`Notification Configuration` then :guilabel:`Rules` and select :guilabel:`Add Rules`. Enter the appropriate settings and select the :guilabel:`VictorOps` receiver.  

For additional information, see the Arista CloudVision documentation at :new-page:`https://www.arista.com/en/cg-cv/cv-accessing-events#task_zxl_5yv_klb`.
