About VictorOps and Microsoft Teams
-----------------------------------

Create incidents in VictorOps and communicate to resolve them through
Microsoft Teams. Through `Outgoing
Webhooks <https://help.victorops.com/knowledge-base/custom-outbound-webhooks/>`__
*(an Enterprise level feature)*, VictorOps can link up with Microsoft
Teams, allowing you to work through incidents via your communication
tool of choice. VictorOps and `Microsoft
Teams <https://products.office.com/en-us/microsoft-teams/group-chat-software>`__ work
together to provide conversations and content when you need it, where
you need it. In one place, your on-call engineers can easily collaborate
while accessing the incident management tools and information they need
to remediate site issues.

**Seamless Cross-Platform Communication**

-  Set on-call rotations in VictorOps and communicate in real-time via
   Microsoft Teams
-  Integrate monitoring and alerting tools in VictorOps to notify your
   team of incidents and communicate through Microsoft Teams and/or
   VictorOps to resolve issues
-  VictorOps' incident timeline seamlessly integrates with Microsoft
   Teams to provide an environment for system visibility and team
   collaboration

The following integration guide will walk you through the different
options currently available with Microsoft Teams and VictorOps

--------------

Single Channel Configuration
----------------------------

*Note: If you want to send specific alerts to different channels skip to
the* `Multi-Channel Configuration <#multi-channel-anchor>`__ *section
below.*

Enabling VictorOps in Microsoft Teams [single-channel]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Adding The VictorOps Tab [single-channel]**

First, select the channel you want to have access to VictorOps
incidents. Select the **+** symbol at the top of the channel.

.. image:: /_images/spoc/General__VictorOps____Microsoft_Teams.png
   :alt: adding the victorops tab in microsoft teams

   adding the victorops tab in microsoft teams

Select the **Website** option.

.. image:: /_images/spoc/General__VictorOps____Microsoft_Teams-1.png
   :alt: selecting website tab in microsoft teams

   selecting website tab in microsoft teams

Give the new tab a name (VictorOps for example) and then paste in the
URL for your VictorOps web instance. The URL will be like:
https://portal.victorops.com/client/**your_account_name**

.. image:: /_images/spoc/General__VictorOps____Microsoft_Teams-2.png
   :alt: naming your website in microsoft teams for victorops

   naming your website in microsoft teams for victorops

Save the new tab and then login to VictorOps. After logging in you can
remove the People Pane and Timeline display from the upper right hand
corner of the UI giving you a clear view of just your incidents.

.. image:/_images/spoc/MT-FINAL.png

Now you can access the full VictorOps web interface right from Microsoft
Teams. Next we will setup `Outbound
Webhooks <https://help.victorops.com/knowledge-base/custom-outbound-webhooks/>`__
to send VictorOps incident alerts into Microsoft Teams.

Send Alerts Into The Channel [single-channel]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Select the channel **Setting** (three dots) then **Connectors**.

.. image:: /_images/spoc/General__VictorOps____Microsoft_Teams-4.png
   :alt: send alerts into the channel for victorops microsoft teams

   send alerts into the channel for victorops microsoft teams

Search for “Incoming Webhook” and then **Add** a new one.

.. image:: /_images/spoc/General__VictorOps____Microsoft_Teams-5.png
   :alt: search for incoming webhooks in microsoft teams

   search for incoming webhooks in microsoft teams

Give the webhook a name (VictorOps for example) and upload an image for
the integration. At the bottom of this article is a `VictorOps
logo <#logo>`__ you may use. Then select **Create**.

.. image:: /_images/spoc/General__VictorOps____Microsoft_Teams-6.png
   :alt: name and create victorops webhook in microsoft teams

   name and create victorops webhook in microsoft teams

A URL will be generated. Copy this URL to your clipboard then
select **Done**.

.. image:: /_images/spoc/General__VictorOps____Microsoft_Teams-7.png
   :alt: url generation for victorops webhook in microsoft teams

   url generation for victorops webhook in microsoft teams

Next we will go into VictorOps and create the `Outbound
Webhooks <https://help.victorops.com/knowledge-base/custom-outbound-webhooks/>`__
to send to Microsoft Teams.

Connect Microsoft teams in VictorOps [single-channel]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Create Outbound Webhook [single-channel]**

From the main timeline select **Integrations** then **Outgoing
Webhooks** then **Add Webhook**.

.. image:/_images/spoc/FINAL-Int-OW.png

Fill out the fields like so:

Event: select **Any-Incident**

Method: select **POST**

Content Type: select **application/json**

To: paste in your Microsoft Teams webhook URL that you copied to your
clipboard.

Payload: Replace your Org Slug below (see bold), and paste in the
following payload:
``{ "title": "VictorOps Alert: ${{ALERT.entity_display_name}} is ${{ALERT.message_type}}", "text": "${{ALERT.state_message}} Link if you want [here](https://portal.victorops.com/client/**YOUR_ORG_SLUG**#/incident/${{STATE.INCIDENT_NAME}}) or check the tab" }``
Description: Optional.

Lastly, hit **Save** and you are done.

..image:: /_images/spoc/Outgoing-Webhook.png

Now whenever an incident is generated in VictorOps you will see it come
into your Microsoft Teams channel and then be able to ack and resolve it
from the Microsoft Teams - VictorOps Tab.

If you have any questions, please contact `VictorOps
support <mailto:Support@victorops.com?Subject=Microsoft%20Teams%20VictorOps%20Integration>`__.

Multi-Channel Configuration
---------------------------

Enable VictorOps in Microsoft Teams [multi-channel]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Adding The VictorOps Tab [multi-channel]**

First, select the channels you want to have access to VictorOps
incidents. Select the **+** symbol at the top of the channel.

.. image:: /_images/spoc/General__VictorOps____Microsoft_Teams.png
   :alt: select the channels you want to have access to VictorOps
   incidents

   select the channels you want to have access to VictorOps incidents

Select the **Website** option.

.. image:: /_images/spoc/General__VictorOps____Microsoft_Teams-1.png
   :alt: Select the Website option.

   Select the Website option.

Give the new tab a name (VictorOps for example) and then paste in the
URL for your VictorOps web instance. The URL will be like:
https://portal.victorops.com/client/**your_account_name**

.. image:: /_images/spoc/General__VictorOps____Microsoft_Teams-2.png
   :alt: Give the new tab a name (VictorOps for example)

   Give the new tab a name (VictorOps for example)

Save the new tab and then login to VictorOps. After logging in you can
remove the People Pane and Timeline display from the upper right hand
corner of the UI giving you a clear view of just your incidents.

..image:: /_images/spoc/MT-FINAL.png

Now you can access the full VictorOps web interface right from Microsoft
Teams. Repeat these steps for all the channels you want to have access
to VictorOps incidents.

Next we will setup Microsoft Teams Webhooks to receive VictorOps
incident alerts .

Send Alerts Into Different Channels [multi-channel]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For every channel you want to receive incident alerts from VictorOps,
you will need to create a Connector. The specification of which alerts
go to which channel will be done on the VictorOps side in the next
section.

Select the channel **Setting** (three dots) then **Connectors**.

.. image:: /_images/spoc/General__VictorOps____Microsoft_Teams-4.png
   :alt: Select the channel Setting (three dots) then Connectors

   Select the channel Setting (three dots) then Connectors

Search for “Incoming Webhook” and then **Add** a new one.

.. image:: /_images/spoc/General__VictorOps____Microsoft_Teams-5.png
   :alt: Give the webhook a name

   Give the webhook a name

Give the webhook a name (VictorOps for example) and upload an image for
the integration. At the bottom of this article is a `VictorOps
logo <#logo>`__ you may use. Then select **Create**.

.. image:: /_images/spoc/General__VictorOps____Microsoft_Teams-6.png
   :alt: Give webhook a name and create webhook

   Give webhook a name and create webhook

A URL will be generated. Copy this URL to your clipboard then
select **Done**.

.. image:: /_images/spoc/General__VictorOps____Microsoft_Teams-7.png
   :alt: copy url to clipboard and click done

   copy url to clipboard and click done

Connecting Microsoft Teams in VictorOps [multi-channel]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Create Rules Engine Rules [multi-channel]**

You will need to create one Rules Engine rule for each channel you want
to route specific alerts to. Each of the Webhook URLs you generated in
Microsoft Teams have a key that defines that channel.

The channel key can be found in the URL after
“/IncomingWebhook/**your_key_here**/” Here is an example using a
“Database” and “DevOps” channel.

Database Link:

https://outlook.office.com/webhook/12345abc-250a-1234-a123-a123b4c56789@12a3bc4d-1111-1a2c-1234-1ab23c456de7/IncomingWebhook/**aaaa1111111111a11a1aaa111a11aa1a1**/1ab23c45-123a-456b-ab212-1234a567890bc

Database Channel Key: **aaaa1111111111a11a1aaa111a11aa1a1**

DevOps Link:

https://outlook.office.com/webhook/12345abc-250a-1234-a123-a123b4c56789@12a3bc4d-1111-1a2c-1234-1ab23c456de7/IncomingWebhook/**b222bbbbbbb22222222bbbbb2bb222b2**/1ab23c45-123a-456b-ab212-1234a567890bc

DevOps Channel Key: **b222bbbbbbb22222222bbbbb2bb222b2**

In this example we will be using the Rules Engine to add the channel key
to the URL based on the `Routing
Key <https://help.victorops.com/knowledge-base/routing-keys/>`__ of the
alert. To create the rule go to **Settings** then **Alert** **Rules
Engine**.

..image:: /_images/spoc/NEW-Settings.png

Select **Add a Rule**\ |image

Set the rule to match when “routing_key” matches “database” and then set
a transformation where “team_key” matches the Channel key from Microsoft
Teams “aaaa1111111111a11a1aaa111a11aa1a1”.

..image:: /_images/spoc/NEW_MT-Rules-1.png

Repeat the previous step for as many channels as you need.

..image:: /_images/spoc/2-Rules.png

This will create an alert field every time the rule is matched so you
can direct specific alerts to the associated channels. Now instead of
the full URL you copied from Microsoft Teams your URLs will look like
so:

Database Link:

https://outlook.office.com/webhook/12345abc-250a-1234-a123-a123b4c56789@12a3bc4d-1111-1a2c-1234-1ab23c456de7/IncomingWebhook/**${{ALERT.team_key}}**/1ab23c45-123a-456b-ab212-1234a567890bc

DevOps Link:

https://outlook.office.com/webhook/12345abc-250a-1234-a123-a123b4c56789@12a3bc4d-1111-1a2c-1234-1ab23c456de7/IncomingWebhook/**${{ALERT.team_key}}**/1ab23c45-123a-456b-ab212-1234a567890bc

These URLs will be used in the next section that goes over the Outbound
Webhooks.

**Create Outbound Webhooks [multi-channel]**

From the main timeline select **Integrations** then **Outgoing
Webhooks** then **Add Webhook**.

..image:: /_images/spoc/FINAL-Int-OW.png

Fill out the fields like so:

Event: select **Any-Incident**

Method: select **POST**

Content Type: select **application/json**

To: paste in your Microsoft Teams webhook URL with the proper **Channel
Key** fields added from the `previous step <#channel_key>`__.

Payload: Replace your account name below, and paste in the following
payload:
``{ "title": "VictorOps Alert: ${{ALERT.entity_display_name}} is ${{ALERT.message_type}}", "text": "${{ALERT.state_message}} Link if you want [here](https://portal.victorops.com/client/**YOUR_ACCOUNT_NAME**#/incident/${{STATE.INCIDENT_NAME}}) or check the tab" }``
Description: Optional.

Lastly, hit **Save** and you are done.

..image:: /_images/spoc/Outgoing-Webhook.png

Now whenever an incident is generated in VictorOps you will see it come
into your Microsoft Teams channel and then be able to ack and resolve it
from the Microsoft Teams - VictorOps Tab.

If you have any questions, please contact `VictorOps
support <mailto:Support@victorops.com?Subject=Microsoft%20Teams%20VictorOps%20Integration>`__.

 

 

 

 

--------------

**Logo:**

..images/5Yp_4_1e_400x400.png

.. |image1| _images/spoc/Alert-Rules.png
