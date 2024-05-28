.. _victorops-humio-integration:

Humio integration for Splunk On-Call
**********************************************

.. meta:: 
    :description: Configure the Humio integration for Splunk On-Call.

Requirements
========================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

Humio puts your system's data at your fingertips instantly and empowers
you to answer questions to effectively do your job.

The Humio integration with Splunk On-Call notifies you when a
specified Humio Alert query returns a result.

In Splunk On-Call
--------------------

From the main timeline, select :guilabel:`Settings` >> :guilabel:`Alert Behavior` >>
:guilabel:`Integrations` >> :guilabel:`Humio`

.. image:: /_images/spoc/Settings@2x.png
    :alt: The Splunk On-Call web interface with the "Settings" tab highlighted.

If the integration isn't yet activated, select the "Enable
Integration" button. Copy the "Service API Endpoint" to your clipboard.
Be sure to replace the "$routing_key" section with the actual routing
key you intend to use. 

.. note:: To view or configure route keys in VictorOps, select :guilabel:`Alert Behavior` >> :guilabel:`Route Keys`.

.. image:: /_images/spoc/Integrations-votest-vo2-5-kb.jpg
    :alt: The service API endpoint section with a routing key.

In Humio
---------------

From the Homepage, select the dataspace where you'd like to set up
your Splunk On-Call integration.

.. image:: /_images/spoc/dataspaces-kb.png
    :alt: The Humio web interface with a list of dataspaces. An arrow points to the "sandbox" dataspace.

Next, at the top of the screen, select :guilabel:`Alerts`.

.. image:: /_images/spoc/sandbox___Search-kb.jpg
    :alt: The top menu with an arrow pointing to the "Alerts" tab.

Then go to :guilabel:`Notifiers` >> :guilabel:`New Notifier`

.. image:: /_images/spoc/Notifier-kb.png
    :alt: The "Notifiers" section displaying information about notifiers. An arrow points to a green button stating "New Notifier".

For :guilabel:`Notification Type`, select the menu and select
:guilabel:`VictorOps`.

Give the VictorOps Notifier a name and leave the behavior of the alert
as 'critical'.

For the 'The routing key that will be used for this integration should
be included in the destination URL' field, paste in the Service API
Endpoint you'd previously copied from Splunk On-Call, making sure to swap out
the $routing_key at the end with the Splunk On-Call routing key you'd like to
use.

Finally, select :guilabel:`Create Notifier`.

.. image:: /_images/spoc/New-Notifier-kb.png
    :alt: The notifier creation menu. An arrow points to a white button stating "Create Notifier".

Next, create an Alert to use this Notifier with.

Select :guilabel:`` and then :guilabel:`New Alert`.

.. image:: /_images/spoc/Alert-kb.png
    :alt: The alerts menu displaying information about alerts. An arrow points to a green button stating "New Alert".

Next, define the criteria for notifications. In the
example, notifications appear when a 400 error occurs.

Give the alert an intuitive name, select the notifier to use
when the criteria is met, and select a
Notification Frequency, which is the maximum frequency at which Splunk
On-Call sends notifications.

You can also select 'Run' to see results for the
criteria you've defined.

Finally, ensure that you've checcked the 'Enabled' box, and select
:guilabel:`Create`.

.. image:: /_images/spoc/Alert-Creation-kb.png
    :alt: The alert creation menu. An arrow points to a white button stating "Create Alert".

You're all set. Now whenever something in Humio matches the Alert
criteria you've defined, Splunk On-Call notifies you at the
cadence you've defined with the Notification Frequency.