:orphan:

.. _auto-pause:

************************************************************************
Auto-Pause and High Alert lag settings
************************************************************************

.. meta::
   :description: About the user role in Splunk On-Call.


What is Auto-Pause?
==============================

Auto-Pause is a security event that occurs when your On-Call instance has reached a total of 5,000 or more active incidents, defined as incidents that are in a Triggered or Acknowledged state. When Auto-Pause is triggered, all alert processing is halted and we begin to queue all incoming alerts to the instance. Alert Lag may soon follow due to this backlog. If your instance exceeds the 5,000 active incident threshold and Auto-Pause is triggered, communication with On-Call Support will be
required to re-enable your account.

What is High Alert Lag?
==============================

High Alert Lag occurs when alerts are sent from a monitoring tool to your On-Call instance at a rate faster than our system can process them. This can happen without an organization being paused and can be caused by alerts that don't create incidents, like a mass of INFO or RESOLVED alerts. Our alert processing limit is 150 alerts per minute (2 alerts per second).

What Causes Auto-Pause and Alert Lag?
============================================================

Both Auto-Pause and Alert Lag are often a symptom of a repeating loop sending alerts from the monitoring tool upstream of Splunk On-Call, and we ask for you to investigate that tool as a potential cause of the
issue. Auto-Pause specifically can also be triggered because too many alerts have piled up without being resolved, independent of an alert storm. Following best practices for incident management can help you
avoid reaching these states.

Best Practices:
==============================


Hygiene
-----------

- Practice the art of taking action on your incidents and Resolving them as soon as possible.
-  Perform periodic checks of active (Triggered or Acknowledged) incidents in the Timeline's :ref:`incident-pane`, which allows you to take action on individual incidents or resolve/acknowledge them all at once.

Settings
-------------

-  If maintaining old incidents manually is not realistic for your organization, it might be useful to enable the :ref:`Auto-resolve <auto-resolve>` feature on your instance. This will allow you to set active incidents to resolve after a specified period of time.
-  If you have many alerts coming in that don't necessarily need to page anyone, you can use the :ref:`Alert Rules Engine <alert-rules-engine>` to transform them into Info alerts, which will appear on the timeline for tracking but not trigger an incident.

onfiguration
---------------

-  Get into the practice of sending system RESOLVE messages from your monitoring tools, in addition to the messages that create incidents. You can link these alerts by making sure they have an equivalent :strong:`entity_id`.
-  Configuring your tools to make sure alerts for a single related event are associated will not only help with tracking but can also be extremely helpful in protecting you from Auto-Pause in the  midst of an alert storm. This is done by leveraging our `alert aggregation <spoc-alert-aggregation>`to reduce the number of active incidents in an organization, which will use the :strong:`entity_id` field to allow for related alerts to roll up under an initial triggered incident, rather than creating new ones for each message.

-  If setting :strong:`entity_id`in your monitoring tool is not an option, you can also leverage the :ref:`Alert Rules Engine <alert-rules-engine>` to manually set this field by matching on another related condition specific to the incidents you want to aggregate. For details, see :ref:`rules-engine-matching-conditions`.

-  While alert aggregation can prevent you from Auto-Pause, it won't prevent you from Alert Lag. Even a single incident can cause this state if many alerts are being aggregated under it. If possible,  audit your monitoring tools to limit alerting to less than 150 messages per minute.

How to Get Out Of Auto-Pause
--------------------------------

As soon as your organization reaches a state of Auto-Pause, you'll receive an email from the Splunk On-Call Support team letting you know about the event. If you've been contacted about this, it is likely
because you are a Global Admin of the respective instance, a Team Admin of the team with most of the incidents coming in, or are currently on-call.

The first step for you will be to identify the reason for the high amount of active incidents and resolve it. After that, all or most of the active incidents will need to be resolved within the organization, which can be done by either the Support team or on your own. 

Once we can confirm that an alert storm is no longer occurring, and all active incidents are resolved, there are two options to re-enable alerting:

1. We can drop the queue of alerts waiting to be processed and unpause the instance. This is our recommendation but will result in missed alerts.
2. We can unpause the instance and process alerts that have been queued up. This will allow them to go into your timeline, but will likely cause alert lag and another auto-pause event quickly, due to the sheer volume of potential alerts.

After deciding which option will be right for your organization,  let the Support Engineer that contacted you know what you'd like to do. They will take the appropriate actions (clear backlog with permission, resolve all incidents with permission, etc.), and notify you when your
alerting has been re-enabled.
