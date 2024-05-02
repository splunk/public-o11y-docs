:orphan:

.. _stakeholders:

************************************************************************
Stakeholder role
************************************************************************

.. meta::
   :description: About the stakeholder roll in Splunk On-Call.


During a major incident, it is often necessary to keep internal stakeholders up to speed while allowing incident responders to work on the problem without distraction. The Stakeholder role allows teams to send paging notifications to Stakeholders with notifications to specific incidents.

For detailed role information, see :ref:`user-roles-permissions`.

Adding a Stakeholder to Splunk On-Call
===================================================

Stakeholders are a limited user role and cannot take actions within the platform. Stakeholder users can receive paging notifications and have limited access to the On-Call platform. Although all users can receive stakeholder messages, only stakeholder users are offered a discount, with access to the incident Stakeholder timeline and user profile.

Please contact Splunk On-Call Support to enable this feature in your account and your sales representative or Splunk On-Call Billing to purchase stakeholder licenses.

Sending a Stakeholder Message
---------------------------------

In Splunk On-Call, you may send messages to Stakeholders and Users from the incident UI and the API. Messages may be sent to individual users or teams via SMS or Email notification.

.. image:: /_images/spoc/stakeholder-message.png
      :width: 99%
      :alt: Within an incident you can send a message to stakeholders.

To POST updates on incidents to your Stakeholder users via the API, see the sendMessage call found in the :new-page:`API documentation` <https://portal.victorops.com/api-docs/#!/Stakeholders/post_api_public_v1_stakeholders_sendMessage>.

Stakeholders Notifications
-----------------------------------

Stakeholders can receive notifications via SMS or email depending on the preference set in individual user profiles. These messages include a link to the web interface and Stakeholder message history.

Stakeholder Experience
------------------------------

Stakeholders may follow a notification link to see incident-specific updates. They may also choose their preferred method of notification.

.. image:: /_images/spoc/stakeholders-experience.png
      :width: 99%
      :alt: Stakeholders can view incident updates.

.. image:: /_images/spoc/stakeholder-experience2.png
      :width: 99%
      :alt: Stakeholders can choose their preferred notification methods in their profile.

