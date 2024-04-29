.. _aws-cloudwatch-spoc:

AWS CloudWatch integration for Splunk On-Call
**************************************************

.. meta::
    :description: Configure the AWS CloudWatch integration for Splunk On-Call.


The Splunk On-Call (formerly VictorOps) and AWS Cloudwatch integration allows you to forward AWS Cloudwatch alerts into Splunk On-Call to notify the correct on-call users. Create on-call schedules, rotations, and escalation policies in Splunk On-Call, then route AWS alerts based on those parameters.

When events meet predetermined monitoring criteria, AWS sends an alert notification. Then, in the Splunk On-Call timeline, users can route and escalate critical alert data to the correct people. With the Splunk On-Call and AWS integration, on-call responders can collaborate in real-time around system data to reduce MTTA/MTTR and resolve incidents faster.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

This guide assumes that you've already set up CloudWatch to send alarms to a queue in SNS and that you're receiving
them through some other means, such as email. If you need more information on how to create a new alarm see Amazon's official documentation.

.. note:: This integration works with Amazon CloudWatch only. SNS messages sent from other Amazon services fail if sent directly to your CloudWatch endpoint in Splunk On-Call.

Turn on AWS Cloudwatch in Splunk On-Call
=============================================

In Splunk On-Call, select :guilabel:`Integrations`, :guilabel:`AWS CloudWatch`.

If the integration has not yet been activated, select :guilabel:`Enable Integration` to generate your endpoint URL. Be sure to replace the ``$routing_key`` section of your new endpoint with the routing key you want to use. If no routing key is included as part of the endpoint URL, the subscription isn't confirmed. See :ref:`spoc-routing-keys` for more information.

You can point multiple SNS subscriptions to the same AWS CloudWatch endpoint in Splunk On-Call. The subscription isn't confirmed if it hits a different endpoint.

Linking Splunk On-Call in AWS Simple Notification Service (SNS)
=======================================================================

From the main AWS Management Console, navigate to your SNS control panel.

.. image:: /_images/spoc/CW4-SNS@2x.png
   :alt: AWS console

From the SNS dashboard, select :guilabel:`Topics` and then select :guilabel:`Create topic`.

.. image:: /_images/spoc/CW5-Topics@2x.png
   :alt: Create a topic

Select :guilabel:`Standard` for Type. :guilabel:`Name` your Topic. Then, select :guilabel:`Create Topic`.

.. image:: /_images/spoc/Screen-Shot-2021-11-09-at-8.41.25-PM.png
   :alt: Create a topic

After you've created your Splunk On-Call related Topic, create a :guilabel:`Subscription` to the new Topic you created.

.. image:: /_images/spoc/CW-7@2x.png
   :alt: Create subscription

Define the protocol type as :guilabel:`HTTPS`, paste in the custom endpoint with the desired routing key.

.. image:: /_images/spoc/CW-9@2x.png
   :alt: Define the protocol type

When your subscription is confirmed, select :guilabel:`Publish Message`.

.. image:: /_images/spoc/CW-10@2x-1.png
   :alt: Publish message

Test the integration
=================================

In the :guilabel:`Publish message` page, add the following payload to the :guilabel:`Message` box. Do not change the formatting. Changes to the payload, including changes to the granularity of ``StateChangeTime`` to microseconds or nanoseconds, result in the failure of Cloudwatch incident delivery to Splunk On-Call.

.. code-block::

   {“AlarmName”:“VictorOps - CloudWatch Integration TEST”,“NewStateValue”:“ALARM”,“NewStateReason”:“failure”,“StateChangeTime”:“2017-12-14T01:00:00.000Z”,“AlarmDescription”:“VictorOps
   - CloudWatch Integration TEST”}

.. image:: /_images/spoc/CW-13-Publish-Message-body@2x-1.png
   :alt: Publish message to topic

After you've published a message to a topic with the required Splunk On-Call payload, a green bar shows a success message in CloudWatch.

.. image:: /_images/spoc/CW-11-green-success-bar@2x.png
   :alt: Success message in CloudWatch

Navigate back to Splunk On-Call to see the new incident created.

.. image:: /_images/spoc/Screen-Shot-2019-09-03-at-9.59.45-AM.png
   :alt: New incident created

To send in a ``RECOVERY`` to Splunk On-Call, replace the ``Alarm`` variable in the field ``NewStateValue`` to ``OK`` in the provided payload and publish the message again:

.. code-block:: text

   “NewStateValue”:“OK”

Auto-recovery alarms from CloudWatch
===========================================

Cloudwatch is where you set the alerts that triggers the event that sends Splunk On-Call an incident.

.. image:: /_images/spoc/Screen-Shot-2021-11-10-at-5.09.41-PM.png
   :alt: Alarms section

When setting up the alarm, or if you are editing one that you have already, the second step is to configure the actions for the notifications. Make sure you set two different trigger notifications, one for ``In Alarm`` and another for ``OK``.

Set the first notification as ``In Alarm``. Then make sure you tie this notification to the topic you just created in SNS. Select :guilabel:`Add Notification` after that.

.. image:: /_images/spoc/Screen-Shot-2021-11-10-at-5.19.09-PM.png
   :alt: Add notificaiton

Set the second notification as ``OK``. Make sure again you set the right topic. Select :guilabel:`Next` or :guilabel:`Update Alarm` at the end of the page.

.. image:: /_images/spoc/Screen-Shot-2021-11-10-at-5.22.01-PM.png
   :alt: Set second notification

If the ``In-Alert`` event that triggered in AWS resolves itself, it sends an ``OK`` or Recovery alert to Splunk On-Call, resolving the incident in Splunk On-Callº.

Required and custom fields
=====================================

For advanced users looking to tailor their Cloudwatch integration, there are a few mandates which must be considered. Alerts reaching the Cloudwatch alerting endpoint need to have a basic form. There are 3 fields which must be present within the message sent from CloudWatch:

1. :guilabel:`AlarmName`: This field can be any string and maps to the ``entity_id``. Since the ``entity_id`` is the field used to link different alerts together, maintain a consistent naming convention for each incident.
2. :guilabel:`NewStateValue`: This field, populated by Cloudwatch, can be either ``ALARM``, triggering a critical incident, or ``OK``, resolving an incident.
3. :guilabel:`StateChangeTime`: This field, also populated by Cloudwatch, maps to the timestamp used in Splunk On-Call.

Additionally, you can add custom fields to any message payload so long as the required 3 fields are present and valid.
