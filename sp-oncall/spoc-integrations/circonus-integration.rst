.. _circonus:

**********************************************************
Circonus integration for Splunk On-Call
**********************************************************

.. meta::
    :description: Configure the Circonus integration for Splunk On-Call.

The Circonus integration with Splunk On-Call (formerly VictorOps) allows you to add Splunk On-Call as a Contact Group in Circonus so you can send alerts into the Splunk On-Call timeline.

:new-page:`Circonus <http://www.circonus.com/>` combines multiple monitoring, alerting, event reporting, and analytical tools into one unified solution. Use any data, in any application, from any system, and visualize it in real-time.


Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Getting Started, Growth, or Enterprise




In Splunk On-Call
===========================

In Splunk On-Call, select :menuselection:`Settings`, then :menuselection:`Integrations`. Select :guilabel:`Circonus` 

.. image:: /_images/spoc/Screenshot-2017-05-25-11.28.08.png

If the integration has not yet been enabled, select :guilabel:`Enable Integration` to generate your endpoint URL. Be sure to replace the `$routing_key`` section with the actual routing key you intend to use. It is essential that you replace what you see here with the actual routing key you intend to use. Everything after the final forward slash must be replaced with you your key.  For example,
assuming a routing_key value of `database`:

`………36437/**$routing_key**   ==>  ……..36437/database`

Set up Routing keys in Splunk On-Call by selecting :menuselection:`Settings`` then :menuselection:`Alert Behavior` and :menuselection:`Route keys`.

For more information on routing keys and best practices, see `Routing keys <routing-keys>`.



In Circonus
===========

To configure the integration in the Circonus interface:

#. From the Circonus dashboard select the drop down in the upper left-hand corner and then `Contact Groups`.

.. image:: /_images/spoc/circonus1.png
   :alt: circonus1

# Create a new :menuselection:`Contact Group`.

.. image:: /_images/spoc/circonus2.png 

#. Give it a name, select :guilabel:`Splunk On-Call` for the :menuselection:`Use Third Party` option. Select :guilabel:`OK`.


#. Copy your API key from the REST Endpoint URL on the Splunk On-Call integrations page. From the main timeline select :guilabel:`Settings`, then :guilabel:`Integrations` and :guilabel:`Circonus`, as described in the previous Splunk On-Call section.


#. Copy the API key into the box provided in Circonus. In the :guilabel:`Team` field you can define the Splunk On-Call routing key you would like to use for this integration.

If you would like further clarification on Splunk On-Call routing keys see :ref:`spoc-routing-keys`.

.. image:: /_images/spoc/circonus5.png
   :alt: circonus5



#. Adjust the alert levels and alert options so that Splunk On-Call will only creates incidents when needed.

You can send a test message, to make sure everything is configured appropriately, and an info message will be sent into the
Splunk On-Call timeline. 


Sending Acknowledgements to Circonus
----------------------------------------

To send acknowledgements back to Circonus, use Splunk On-Call's :ref:`Custom Outbound Webhooks <custom-outbound-webhooks>`.

#. Create a new outbound webhook in Splunk On-Call.

    #. From the settings page select :guilabel:`Integrations` then :guilabel:`Outgoing Webhooks` 

    #. Select :guilabel:`Add Webhook`.

    #. Complete the fields as shown. Make sure to paste in the Webhook URL from your Splunk On-Call Contact Group from Circonus into the :guilabel:`To:` field.

    .. image:: /_images/spoc/circonus3-1.png

    #. Paste in the following into the Payload field:

`{ “ALERT.alert_type”:
“:math:`{{ALERT.alert\_type}}",  "ALERT.circonus\_alert\_id": "`\ {{ALERT.circonus_alert_id}}”,
“ALERT.ack_author”: “${{ALERT.ack_author}}” }`

.. note:: If you want alerts that are Resolved using Splunk On-Call to clear the acknowledgment at Circonus (allowing the alert to be triggered again) set the Event field to `Any-Incident`. Otherwise, set it to `Incident-Acknowledged` and the acknowledgement at Circonus will expire normally (if the alert condition doesn't clear first).

   #. (Optional) When acknowledging alerts using Splunk On-Call, the alert at Circonus is acknowledged for 30 minutes by default. You can change this by adding the following option to the Webhook URL query string:

     ``?acknowledge_minutes=X``

.. note:: The Splunk On-Call team member who acks the alert must have a Circonus account that has write (Normal or Admin) access to the
account whose metric is alerting. To link the Splunk On-Call user to the Circonus user, go to the User Profile page at Circonus and enter the Splunk On-Call username.

    .. image:: /_images/spoc/circonus4-1.png
