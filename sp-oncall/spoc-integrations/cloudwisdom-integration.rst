.. _cloudwisdom-spoc:

CloudWisdom integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the CloudWisdom integration for Splunk On-Call.

CloudWisdom, previously known as Metricly, leverages the simple yet powerful analytics to lower cloud costs and assure
performance. Provide actionable sizing recommendations per workload by applying CloudWisdom's deep analytics to capacity utilization across all cloud computing dimensions.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise


Splunk On-Call configuration
==============================

From the Splunk On-Call web portal select :guilabel:`Integrations`, :guilabel:`CloudWisdom`. Select  the :guilabel:`CloudWisdom` integration and copy the :guilabel:`Service API Endpoint` to your clipboard.

.. image:: /_images/spoc/Screen-Shot-2020-05-20-at-11.11.52-AM.png
   :alt: CloudWisdom integration screen

Make sure to add the appropriate Routing Key to the end of the URL. For more information on routing keys or instructions on creating a new one, see :ref:`spoc-routing-keys`.

CloudWisdom configuration
============================

Follow these steps to configure CloudWisdom for Splunk On-Call.

Create a Splunk On-Call webhook notification
----------------------------------------------

1. Navigate to :guilabel:`User Settings`, :guilabel:`Notifications`.

2. Select the :guilabel:`Webhook` tab.

3. Select :guilabel:`Add Webhook`.

.. image:: /_images/spoc/Screen-Shot-2020-04-17-at-11.05.45-AM.png
   :alt: Add webhook screen

4. Complete the following fields:

   -  :guilabel:`Name`: Names the Notification
   -  :guilabel:`Enabled`: Indicates notification is active
   -  :guilabel:`URL` (found in Splunk On-Call)
   -  :guilabel:`Username` (Optional)
   -  :guilabel:`Password` (Optional)
   -  :guilabel:`Header` (Optional)
   -  :guilabel:`Payload`: Can be a default or custom template

5. Select :guilabel:`Test` and :guilabel:`Save`.

.. image:: /_images/spoc/Screen-Shot-2020-04-17-at-12.08.30-PM.png
   :alt: Fill out fields in CloudWisdom

Apply notification to a policy
---------------------------------------

1. Navigate to :guilabel:`Monitoring`, :guilabel:`Alerts`.

2. Select :guilabel:`+ New Policy` or edit an existing one. A dialog appears.

.. image:: /_images/spoc/Screen-Shot-2020-04-17-at-11.14.04-AM.png
   :alt: New policy dialog

3. Complete the policy's :guilabel:`Scope` and :guilabel:`Conditions`.

4. Navigate to :guilabel:`Notifications`, :guilabel:`Add Notification`.

5. Select :guilabel:`Webhook` as the notification type.

.. image:: /_images/spoc/Screen-Shot-2020-04-17-at-11.17.34-AM.png
   :alt: Select notification type

6. Select the Splunk On-Call webhook notification you created.

7. Complete the policy configuration and save.
