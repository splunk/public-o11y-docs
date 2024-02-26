.. _Pingdom-spoc:

Pingdom integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Pingdom integration for Splunk On-Call.

Pingdom is a service that tracks the uptime, downtime, and performance of websites.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

Splunk On-Call configuration
=============================

In Splunk On-Call, select **Integrations** *>>* **Pingdom (Webhook)**

If the integration has not yet been enabled, click the *Enable
Integration* button to generate your endpoint URL as seen below. Be
sure to replace the "$routing_key" section with the actual routing key
you intend to use. It is essential that you replace what you see here
with the actual routing key you intend to use. Everything after the
final forward slash must be replaced with your key. For example,
assuming a routing_key value of "database":

………36437/**$routing_key** ==>  ……..36437/**database**

.. image:: /_images/spoc/Screen_Shot_2019-10-09_at_11_47_13_AM.png
   :alt: Pingdom endpoint URL example

Routing keys in Splunk On-Call can be set up and associated by clicking
on *Settings >> Route Keys.*

For more information on routing keys and best practices, see :new-page:`Routing keys in Splunk On-Call <https://help.victorops.com/knowledge-base/routing-keys/>`.


Pingdom configuration
======================

Select "Integrations" from the menu bar on the left, click the
"Integrations" option,then click "Add integration".

In the *Add Integration* window, use the drop-down menu for *Type* to
select *Webhook*. Give the webhook a name and paste in the webhook URL
provided by Splunk On-Call. Be sure to replace the "$routing_key" section
with your actual `routing
key <https://help.victorops.com/knowledge-base/routing-keys/>`__.
Finally, click *Save Integration*.

.. image:: /_images/spoc/Screen-Shot-2019-10-09-at-11.48.22-AM.png
   :alt: Add Integration window


When creating or editing checks, scroll to the bottom of the settings to
select the new integration you have just added. It is not necessary to
include any alerting actions for the webhook to function.

.. image:: /_images/spoc/Screen-Shot-2019-10-09-at-11.52.47-AM.png
   :alt: Edit Check window


Email endpoint integration
==========================

In Splunk On-Call (Email)

Navigate to **Integrations** >> **Pingdom (Email)**

.. image:: /_images/spoc/Screen-Shot-2019-10-09-at-12.56.21-PM.png
   :alt: Pingdom integrations email option


If the integration has not already been enabled, enable the integration
and copy the email endpoint.

.. image:: /_images/spoc/3rd_Party_Integrations-EMStester-3.png
   :alt: Pingdom email endpoint example


*The Routing Key* (+$routing_key) can be used to route an email endpoint-
initiated incident to a specific team or teams within Splunk. You
will want to be sure to replace $routing_key within the Email endpoint
address with a valid routing_key found within your Splunk On-Call instance.

In Pingdom (Email)

Navigate to *Users and Teams* in the side-menu of Pingdom and select
*Users*.

In the upper right corner, select '\ *Add User'*. When creating the new
Splunk On-Call user make sure to select, next to *Alert recipients*,
*Contact; can only receive alerts*.

.. image:: /_images/spoc/Screen-Shot-2019-10-09-at-12.28.04-PM-1.png
   :alt: Add user or contact menu

Next, under contact details, give your contact a name. We suggest giving
the contact a name that will be intuitive to where the alert will be
sent (that is, to Splunk). Then paste the Splunk On-Call Pingdom Email endpoint
into the contact method. Save the user by clicking *Add User*.

.. image:: /_images/spoc/Screen_Shot_2019-10-09_at_12_31_46_PM.png
   :alt: Adding a contact name

Now under Experience Monitoring, you can add your new contact to your
desired checks. You can add the user to your desired checks by editing a
check and selecting your user for '*Who to alert?*'. Once selected and
saved, this check will alert your Splunk On-Call email endpoint.

.. image:: /_images/spoc/Screen-Shot-2019-10-09-at-12.38.25-PM.png
   :alt: Associating alert checks with a new contact
