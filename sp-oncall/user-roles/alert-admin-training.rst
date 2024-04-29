.. _alert-admin-training:

************************************************************************
Alert Admin user training
************************************************************************

.. meta::
   :description: About the user roll in Splunk On-Call.


**NOTE:** If you are new to Splunk On-Call a great place to start is
with our User Training, found
`here <https://help.victorops.com/knowledge-base/user-training/>`__.
Once you a familiar with your User permissions, come back to this
article to learn about your increased responsibilities as an Alert
Admin.

**Your Role as an Alert Admin**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As an alert admin, you are responsible for managing alert configuration,
integrations, and their workflow.

**Your Permissions as an Alert Admin**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As an Alert Admin, your permissions are organization-wide and come with
a lot of responsibility. Proper management and upkeep of integrations
are essential to your alert workflow. Alert Admins have permission to
take the following actions: 

.. raw:: html

   <table style="height: 131px; border-color: #0a0101; background-color: #0a0101;" border="2" width="306">

.. raw:: html

   <tbody>

.. raw:: html

   <tr>

.. raw:: html

   <td style="width: 296.023px; text-align: center;">

Permissions specific to an Alert Admin

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr>

.. raw:: html

   <td style="width: 296.023px; text-align: left;">

Integration Configuration

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr>

.. raw:: html

   <td style="width: 296.023px; text-align: left;">

Management of Routing Keys & Rules

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr>

.. raw:: html

   <td style="width: 296.023px; text-align: left;">

Creation & Upkeep of Webhooks

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr>

.. raw:: html

   <td style="width: 296.023px; text-align: left;">

Maintenance Mode

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   </tbody>

.. raw:: html

   </table>

**View all** `User Roles and
Permissions! <https://help.victorops.com/knowledge-base/user-roles-and-permissions/>`__

**Your Resources as an Alert Admin**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Knowledge Base:** Splunk On-Call has an extensive `Knowledge
Base <https://help.victorops.com/>`__ that is always a good place to
start if you are unsure how something works or are in need of some tips!
There is even an entire
`Integrations <https://help.victorops.com/article-categories/integrations/>`__
section for you to check out. 

**Contact Us:** All users have the ability to reach out to Splunk
On-Call support at any time with any questions!

**1.**  **Live Chat:** If you are logged into your Splunk On-Call
instance, you will have the ability to Live Chat with the Splunk On-Call
Support team.

**2.**  **Splunk Support Portal:** You can open a Splunk On-Call support
case in the Splunk Support Portal:https://login.splunk.com/

**If you are facing any issues when trying to contact us please have a
look**
`HERE <https://help.victorops.com/knowledge-base/important-splunk-on-call-support-changes-coming-nov-11th/>`__\ **!**

**Recommendations to be a Successful Alert Admin**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. **Create Routing Keys: Routing Keys are responsible for directing the
   alerts to the correct escalation policy in order to page the correct
   on-call user. Think of these as the “postage” of each alert.** 

   **♦** **Best Practice Tip** **♦ Reach out to Team Admins to assist
   with naming conventions for Routing Keys in order to ensure that
   escalation policies and routing key names are in sync and simple to
   identify.**

2. **Enable** & Configure Integrations using the Knowledge Base
   Guides\ **:** Search for the integrations you need on the
   integrations page. If you do not see an integration listed, you can
   always use the Generic Rest Endpoint or Email integration based on
   the capabilities of your tools. Use the `Knowledge Base Integration
   Guides <https://help.victorops.com/article-categories/integrations/>`__
   to configure your integrations. 

   **♦** **Best Practice Tip** **♦ Make sure you are only sending
   critical, actionable alerts to Splunk On-Call to avoid alert fatigue
   and confusion.** 

3. **Confirm alerts are directed to the corresponding teams:** After
   configuring your integrations, make sure that incidents are routing
   and behaving properly by sending test alerts.

4. **Create Rules Engine Rules:** You can `modify
   fields <https://help.victorops.com/knowledge-base/rules-engine-transformations/>`__,
   `add
   annotations <https://help.victorops.com/knowledge-base/rules-engine-annotations/>`__,
   and redirect alerts based on certain matching conditions. The Rules
   Engine even has regex capabilities to parse out portions of fields or
   create time-based rules. **Quick video on the** `Alert Rule
   Engine <https://share.vidyard.com/watch/w2uy7LwhE9TQvZjnNRxJzi?>`__\ **!** 

5. **Configure Custom Outgoing Webhooks:** Webhooks allow you to pass
   information outside of Splunk On-Call based on actions taken within
   Splunk On-Call such as a triggered incident or a chat. When combined
   with the Rules Engine, they can be configured to conditionally fire.
   **Quick video on** `Custom Outgoing
   Webhooks <https://share.vidyard.com/watch/XuuFLua5PRJNr94aKG22xf?>`__\ **!**

6. **Maintenance mode:** If you need to perform maintenance for one of
   your integrations, you can turn on maintenance mode for a specific
   routing key or all routing keys. Maintenance mode will mute paging
   for the given period of time, and resume paging once ended. *NOTE:
   Maintenance Mode does not stop the alerts from coming into Splunk
   On-Call, just from paging the on-call users when they do come in.*

Alert Admin Checklist:
^^^^^^^^^^^^^^^^^^^^^^

image:  _images/spoc/Screen-Shot-2020-09-03-at-10.19.21-AM.png
