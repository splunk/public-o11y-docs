.. _statuscast-spoc:

StatusCast integration for Splunk On-Call
******************************************

.. meta::
    :description: Configure the StatusCast integration for Splunk OnCall.

The StatusCast integration allows you to automatically create and update StatusCast incidents based on Splunk On-Call incidents. The following guide walks you through the setup process.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Enterprise

Set up outgoing webhooks in Splunk On-Call
================================================

In Splunk On-Call, navigate to :guilabel:`Integrations`, :guilabel:`Outgoing Webhooks` and select :guilabel:`Add Webhook`. This creates 2 separate outgoing webhooks as part of the setup.

.. image:: /_images/spoc/statuscast-webhooks.png
   :alt: Outgoing webhook creation dialog

Fill out the following fields:

* :guilabel:`Event`: During the setup of the first outgoing webhook, set the field to :menuselection:`Incident-Triggered`. For the second outgoing webhook, set the field to :menuselection:`Incident-Resolved`.
* :guilabel:`Method`: Set to :menuselection:`POST`.
* :guilabel:`Content Type`: Set to :menuselection:`application/json`.
* :guilabel:`To`: Set to ``https://<yourapp>.statuscast.com/webhook/victorops``. Replace ``<yourapp>`` in the URL with your status page name.
* :guilabel:`Payload`: Your payload tells StatusCast what resource is affected and what the current status is. For example:

.. code-block:: text

   {

      monitorName: "${{ALERT.monitor_name}}",
      state: "${{ALERT.entity_state}}"

   }

The monitor name corresponds to a template in StatusCast. Customize the payload values while preserving the property names listed as required. The ``monitorName`` property maps to a corresponding template in StatusCast.

Repeat the previous steps to create another outgoing webhook, this time with an :guilabel:`Event` value of :menuselection:`Incident-Resolved`.

StatusCast configuration
==================================

To complete the setup, configure your StatusCast account by following these steps:

#. Log into the administrative portal and navigate to the :guilabel:`Monitors` section. Here you can create an entry for each monitor in your Splunk On-Call account that you want StatusCast to automatically create incidents for.

#. Select :menuselection:`New Monitor` and in the :guilabel:`Choose Provider` menu select :menuselection:`Splunk On-Call`:

.. image:: /_images/spoc/statuscast-provider.png
   :alt: Provider menu

#. Enter the :guilabel:`Alert Name` for the monitor. This corresponds to the monitor name that set off an alert.

.. image:: /_images/spoc/statuscast-alertname.png
   :alt: Alert name field

#. Enter the :guilabel:`Authored by` value,  which defines who is the author of the incident. If you page is set to hide authors, they remain hidden.

.. image:: /_images/spoc/statuscast-authoredby.png
   :alt: Authored by field

Other incident settings include :guilabel:`Type`, :guilabel:`Affected components`, :guilabel:`Subject`, and :guilabel:`Message`. They reflect the same general options you get when creating an incident. For more information on this process, see :new-page:`How do I post a new incident or status <https://statuscast.com/support/post-new-incident-status/>` in the StatusCast official documentation.

With the incident settings filled out, define the workflow of the incident you are posting:

:guilabel:`Notify theses employees`: Select which employees StatusCast notifies when this type of incident gets created. You can select multiple employees.

:guilabel:`Wait time`: Amount of time StatusCast waits before creating your incident. This is used to buffer out incidents that are resolved in a matter of minutes. If your monitoring service already has this built in, you can set the value to `0`, which causes StatusCast to post the incident when it's received.

:guilabel:`Combine alerts`: When your monitoring services send out multiple requests, you can choose to combine them to prevent redundant incidents from being reported.

:guilabel:`Auto-publish`: If selected, your incident is automatically published, which notifies all subscribers. If this option is turned off, your employees need to activate the post manually, either by logging into StatusCast and activating it within the :guilabel:`Dashboard` or by replying to the notification email.

:guilabel:`Auto-close`: If selected, your incident is closed when your monitoring service sends an update. By selecting this you can also enter a :guilabel:`Closing Comment` to be posted.

After you have all the configurations set, select :guilabel:`Submit`` to save the configuration.
