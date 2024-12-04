.. _arista-cloudvision-spoc:

Arista CloudVision for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Arista CloudVision integration for Splunk On-Call.

CloudVision is Arista’s modern, multi-domain management platform that leverages cloud networking principles to deliver a simplified NetOps experience. Unlike traditional domain-specific management solutions, CloudVision enables zero-touch network operations with consistent operations enterprise-wide, helping to break down the complexity of siloed management approaches.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise


Splunk On-Call configuration
==============================

From the Splunk On-Call web portal select :guilabel:`Integrations`, :guilabel:`Prometheus`. Select  the :guilabel:`Prometheus` integration and copy the :guilabel:`Service API Endpoint` to your clipboard.

CloudVision configuration
============================

In Arista CloudVision, navigate to :guilabel:`Events`, :guilabel:`Notification Configuration`, :guilabel:`Platforms`.  Scroll down to the :guilabel:`VictorOps` section and paste the Service API Endpoint you'd previously copied in the :guilabel:`VictorOps API Key` field.  Leave the :guilabel:`VictorOps URL` field blank.

Next, configure this Platform in a Receiver.  Navigate to :guilabel:`Events`, :guilabel:`Notification Configuration`, :guilabel:`Receivers` and click :guilabel:`Add Receivers`.  Type the receiver's name in the :guilabel:`Receiver Name` field and click the :guilabel:`Add Configuration` drop-down menu.  

Select the :guilabel:`VictorOps` option in the following table, including the :guilabel:`routing key` you would like to notify in Splunk On-Call.  For more information on routing keys or instructions on creating a new one, see :ref:`spoc-routing-keys`.  If required, select the :guilabel:`Send alert when events are resolved` checkbox.

Next, configure Rules to define when the Receiver is used.  Navigate to :guilabel:`Events`, :guilabel:`Notification Configuration`, :guilabel:`Rules` and click :guilabel:`Add Rules`.  Fill out the appropriate settings and select the :guilabel:`VictorOps` receiver.  

For additional information, please reference the Arista CloudVision documentation at https://www.arista.com/en/cg-cv/cv-accessing-events#task_zxl_5yv_klb.
