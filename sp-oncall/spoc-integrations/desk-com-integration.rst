.. _deskcom-spoc:

Desk.com integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Desk.com integration for Splunk On-Call.

Desk.com is an online customer service software and support ticket help desk application for small business and fast-growing companies. The following documentation walks you through the steps to create a custom Splunk On-Call application within Desk.com.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise


Splunk On-Call configuration
====================================

In Splunk On-Call, select :guilabel:`Integrations`, :guilabel:`Desk.com`.

If the integration isn't active, select :guilabel:`Enable Integration` to generate your endpoint URL. Make sure to replace the ``$routing_key`` section with the routing key you want to use. See :ref:`spoc-routing-keys`.

.. image:: /_images/spoc/Integration-Desk-final.png
   :alt: Activate the Desk integration

Desk.com configuration
====================================

Select the menu icon and then :guilabel:`Admin`.

.. image:: /_images/spoc/desk2.png
   :alt: Select the menu icon and then Admin

On the admin page select :guilabel:`Apps`, then find :guilabel:`Custom Action` and select :guilabel:`Install`.

.. image:: /_images/spoc/desk3.png
   :alt: Select install

Next select :guilabel:`Install Custom Action`.

.. image:: /_images/spoc/desk4.png
   :alt: Custom action installation

Accept the terms, then give the action a name. Set the authentication method to :menuselection:`None`, paste in your Post URL that you copied from Splunk On-Call in the first step, then make sure the action is set to ``Active``. Select :guilabel:`Create` to finish.

.. image:: /_images/spoc/desk5.png
   :alt: Create action

On the next screen, select :guilabel:`Add Action`.

.. image:: /_images/spoc/desk6.png
   :alt: Add action

Give the action a name. Select :menuselection:`POST a JSON string to a URL` as the action type. Paste the following JSON snippet:

```json
{ "entity_id":"{{case.id}}", "message_type":"CRITICAL", "state_message":"New Case: {{case.id}} about {{case.subject}}", "Case Description":"{{case.description}}", "Case Priority":"{{case.priority}}", "Customer":"{{case.customer}}", "Case Email":"{{case.emails}}", "alert_url":"{{case.direct_url}}" }
```

Then select :guilabel:`Add Action`.

.. image:: /_images/spoc/desk7.png
   :alt: Add action

Next, add the action to a :guilabel:`Case Created` rule. To do this, select :guilabel:`Cases`, then under :guilabel:`Rules` select :guilabel:`Case Created` and finally :guilabel:`Add Rule`.

.. image:: /_images/spoc/desk8.png
   :alt: Add rule

Give the rule a name then select :guilabel:`Add`.

.. image:: /_images/spoc/desk9.png
   :alt: Adding the rule

Add any Condition you might need. Set the :guilabel:`Rule Actions` field to :guilabel:`Trigger an App Action`, then select the Splunk On-Call action you previously created. Select :guilabel:`Update`.

.. image:: /_images/spoc/desk10.png
   :alt: Update the rule action

If you want to create an action and rule for when the case is closed or resolved, follow the previous steps and use the following JSON snippet:

```json
{ "entity_id":"{{case.id}}", "message_type":"RECOVERY", "state_message":"New Case: {{case.id}} about {{case.subject}}", "Case Description":"{{case.description}}", "Case Priority":"{{case.priority}}", "Customer":"{{case.customer}}", "Case Email":"{{case.emails}}", "alert_url":"{{case.direct_url}}" }
```
