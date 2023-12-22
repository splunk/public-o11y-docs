.. _zabbix-spoc:

Zabbix integration for Splunk On-Call
*******************************************

.. meta::
    :description: Configure the Zabbix integration for Splunk On-Call.

Zabbix is an enterprise-class open source distributed monitoring solution for networks and applications.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

The integration requires Zabbix 4.2 or lower, PHP 5.3.0 or higher, and cURL. You can integrate Zabbix 5.0 and 4.4 using Zabbix webhooks.

Splunk On-Call configuration
=======================================

In Splunk On-Call, navigate to :guilabel:`Integrations`, :guilabel:`Zabbix`, then select :guilabel:`Enable Integration` and copy the :guilabel:`Service API Key` for later use.

Zabbix 5.0 using webhooks
=======================================

Although the plugin only supports versions up to 4.2, you can integrate with Zabbix 5.0 using webhooks. The behavior and layout is similar to the plugin.

The basic components you need are a Splunk On-Call Users group with a user called “Splunk On-Call Alert” assigned to it, an action called “Notify Splunk On-Call”, and a media type called “Splunk On-Call Webhook”.

Zabbix Media Type 5.0
-------------------------

To get started, download the Splunk On-Call Media Type from the Github repository: :new-page:`https://github.com/victorops/monitoring_tool_releases/blob/master/victorops-Zabbix5.0/victorops_media_type_zabbix_5.xml <https://github.com/victorops/monitoring_tool_releases/blob/master/victorops-Zabbix5.0/victorops_media_type_zabbix_5.xml>`.

After that's downloaded, go into Zabbix and navigate to your media types. Select :guilabel:`Import`.

.. image:: images/spoc/Zabbix_1.png
   :alt: Import screen

Select the XML file you downloaded earlier and select :guilabel:`Import` at the bottom of the screen. Keep the default values for importing media types as shown in the screenshot.

After the import is successful, go back to your media types. A new media type labeled “Splunk On-Call” is available.Select it and scroll down to the values ``VO_ORGANIZATION_ID`` and ``VO_ORGANIZATION_KEY`` and fill them in with your Splunk On-Call org slug and Zabbix API key respectively. You can find your org slug in the URL of your Splunk On-Call instance (https://portal.victorops.com/client/). The Zabbix API key is located in your Splunk On-Call org under :guilabel:`Integrations`, :guilabel:`Zabbix`.

.. image:: images/spoc/Zabbix2.png
   :alt: Zabbix fields

Make sure to update the media type by selecting :guilabel:`Update`.

Testing the media type itself might fail. This is because the Splunk On-Call Media Type dynamically pulls in information from the alert that is being sent to it. Test this after the Webhook is fully setup (including the following setups) with a real Zabbix alert.

Zabbix User 5.0
-------------------

Create a new user and assign it to any desired group. Then associate the user, in this case, “Splunk On-Call Alert” with the media type. Fill in the :guilabel:`Send to` section in the Media tab with an appropriate Splunk On-Call Routing
Key. You can also specify which severity of alerts is sent to Splunk On-Call here. The user needs read-write permissions so assign whatever permission level necessary.

.. image:: images/spoc/Zabbix_5_0_4.png
   :alt: Media tab

Zabbix Action 5.0
---------------------

The next step is to create the action. You can customize alerting behavior by setting the action conditions.

.. image:: images/spoc/Zabbix_5_0_5.png
   :alt: Send to Splunk On-Call

Head over to the operations tab and set up the operations and recovery operations to send a message to the Splunk On-Call user using the Splunk On-Call Media Type that you just created.

.. image:: images/spoc/Zabbix_5_0_6.png
   :alt: Operations tab

With that, your Zabbix integration is set up. To test it, create a new alert in Zabbix and check the actions section on the dashboard to see if it was successful.

.. image:: images/spoc/Zabbix_5_0_7.png
   :alt: Zabbix test

Zabbix 4.4 using webhooks 
=======================================

Although the plugin only supports versions up to 4.2, you can integrate with Zabbix 4.4 using webhooks. The behavior and layout is similar to the plugin.

The basic components you need are a Splunk On-Call Users group with a user called “Splunk On-Call Alert” assigned to it, an action called “Notify Splunk On-Call”, and a media type called “Splunk On-Call Webhook”.

Zabbix Media Type 4.4
-------------------------

To get started, create a new media type from :guilabel:`Administration`, :guilabel:`Media Types`. Under :guilabel:`Type`, select :menuselection:`Webhook` and configure the parameters to match the following screenshot:

.. image:: images/spoc/zabbix_webhook_mediatype-1.png
   :alt: Webhook media type values

Fill in the script section with the Javascript needed to construct the alert to Splunk On-Call.

.. image:: images/spoc/zabbix_webhooks_script.png
   :alt: Webhook script

You can find the javascript in the GitHub repository at :new-page:`https://github.com/victorops/monitoring_tool_releases/blob/master/VictorOps-Zabbix4.4/victorops_zabbix_webhook.js <https://github.com/victorops/monitoring_tool_releases/blob/master/VictorOps-Zabbix4.4/victorops_zabbix_webhook.js>`.

Zabbix User 4.4
-------------------

Create a new user and assign it to any desired group. Then associate the user, in this case, “Splunk On-Call Alert”,  with the media type. Fill in the :guilabel:`Send to` section with an appropriate Splunk On-Call routing key. The user needs read-write permissions so assign whatever permission level necessary.

.. image:: images/spoc/zabbix_user_mt.png
   :alt: User permissions

Zabbix Action 4.4
---------------------

Next create the action. You can customize alerting behavior by setting the action conditions. 

.. image:: images/spoc/zabbix_action_1.png
   :alt: New action in Zabbix

Then, update the :guilabel:`Operations` and :guilabel:`Recovery Operations` tabs with the appropriate JSON payload.

Place the following payloads in the :guilabel:`Default Message` section of both tabs. Then update the :guilabel:`Default Subject` to ``Incident: {ESC.HISTORY}`` on the :guilabel:`Operations` tab and ``Resolved:
{ESC.HISTORY}`` on the :guilabel:`Recovery Operations` tab.

The Javascript payload for the :guilabel:`Operations` tab is available in the GitHub repository at :new-page:`https://github.com/victorops/monitoring_tool_releases/blob/master/VictorOps-Zabbix4.4/action_trigger_operation.json <https://github.com/victorops/monitoring_tool_releases/blob/master/VictorOps-Zabbix4.4/action_trigger_operation.json>`.

The payload for the :guilabel:`Recovery Operations` tab is available in the GitHub repository at :new-page:`https://github.com/victorops/monitoring_tool_releases/blob/master/VictorOps-Zabbix4.4/action_recovery_operation.json <https://github.com/victorops/monitoring_tool_releases/blob/master/VictorOps-Zabbix4.4/action_recovery_operation.json>`.

As a last step, update the operations section on both tabs to send the notification to Splunk On-Call users through the Splunk On-Call Webhook media type. When completed, both tabs look like the following:

.. image:: images/spoc/zabbix_action_operations.png
   :alt: Action operations

Ack-Back Setup 4.4-5.x
==================================

The ack-back functionality is installed through a plugin to create the item “Splunk On-Call Command Poll”. This allow acknowledgements in Splunk On-Call to update a problem in Zabbix to an “Acknowledged” state.

deb package
--------------------------

Run the following commands:

.. code-block:: bash

   wget
   https://github.com/victorops/monitoring_tool_releases/releases/download/victorops-zabbix-0.18.3/victorops-zabbix_0.18.3-2_all.deb

   sudo dpkg -i victorops-zabbix_0.18.3-2_all.deb

From /opt/victorops/zabbix_plugin/bin run:

.. code-block:: bash

   sudo ./install

rpm package
------------------

Run the following commands:

.. code-block:: shell

   wget
   https://github.com/victorops/monitoring_tool_releases/releases/download/victorops-zabbix-0.18.3/victorops-zabbix-0.18.3-2.noarch.rpm

   sudo rpm -i victorops-zabbix-0.18.3-2.noarch.rpm

From /opt/victorops/zabbix_plugin/bin run:

.. code-block:: shell

   sudo ./install

Configuration
------------------

Rename the file local.zabbix.conf.example to local.zabbix.conf:

.. code-block:: shell

   mv /opt/victorops/zabbix_plugin/conf/local.zabbix.conf.example
   /opt/victorops/zabbix_plugin/conf/local.zabbix.conf

Then edit the file to provide an admin username and password, as well as the Zabbix Server URL for the plugin to be able to update Zabbix problems.

.. code-block:: shell

   sudo nano local.zabbix.conf

Once installed, you can configure the package by running the script:

.. code-block:: shell

   sudo /opt/victorops/zabbix_plugin/bin/configure_ackback.sh

The configuration script connects to the Zabbix server. To use it you need to provide a Zabbix admin user ID and password. The script prompts you for these.

Additionally, you need to provide your organization “slug” and Zabbix alert key to the configure_ackback.sh script. These are found on your Zabbix integration page in Splunk On-Call.

The final script to run is:

.. code-block:: shell

   sudo /opt/victorops/zabbix_plugin/bin/create_links.sh

After you've run the scripts, a new item appears on the Zabbix Server called Splunk On-Call Command Poll. Turn on this item for Zabbix to get acknowledgement statuses from Splunk On-Call.

Once this item is turned on your configuration is complete.

Zabbix 4.2 and lower using the plugin
=======================================

Splunk On-Call's Zabbix plugin is a set of scripts that queue up trigger notifications and forward them to Splunk On-Call servers for processing. The queuing up of notifications is done in-band, as Zabbix runs the notification script, and forwarding is done out-of-band by a long-running process.

The forwarding process can retry sending the notification, and if the send fails for any reason, for an extended period of time (1 minute by default), it falls back to sending an email to a configured address.

Layout
----------

The main package files are installed to /opt/victorops/zabbix_plugin. Notifications are queued in /var/victorops/zabbix-alerts. Logs are written to /var/log/victorops.

Symbolic links are created in the Zabbix alert scripts and external scripts directories.

Installation
----------------

The package is available as an RPM, DEB or tarball from GitHub: :new-page:`https://github.com/victorops/monitoring_tool_releases/releases/tag/victorops-zabbix-0.17.3 <https://github.com/victorops/monitoring_tool_releases/releases/tag/victorops-zabbix-0.17.3>`.

deb package
^^^^^^^^^^^^^^^^

Run the following commands:

.. code-block:: shell

   wget
   https://github.com/victorops/monitoring_tool_releases/releases/download/victorops-zabbix-0.17.3/victorops-zabbix_0.17.3-2_all.deb

   sudo dpkg -i victorops-zabbix_0.17.3-2_all.deb

From /opt/victorops/zabbix_plugin/bin run:

.. code-block:: shell

   sudo ./install

rpm package
---------------

Run the following commands:

.. code-block:: shell

   wget
   https://github.com/victorops/monitoring_tool_releases/releases/download/victorops-zabbix-0.17.3/victorops-zabbix-0.17.3-2.noarch.rpm

   sudo rpm -i victorops-zabbix-0.17.3-2.noarch.rpm

From /opt/victorops/zabbix_plugin/bin run:

.. code-block:: shell

   sudo ./install

Configuration
-----------------

If you install from the DEB or RPM packages, the installer puts the plugin files in their location in /opt/victorops/zabbix_plugin. Additionally, two directories are created, /var/victorops/zabbix-alerts and /var/log/victorops, for notification queuing and logging, respectively.

Once installed, the package requires configuration by running the following script:

``/opt/victorops/zabbix_plugin/bin/configure.sh``

The configuration script connects to the Zabbix server, so to use it you need to provide a Zabbix admin user ID and password. The script prompts you for these.

Additionally, you need to provide your organization “slug” and Zabbix alert key to the configure.sh script. These are found on your Zabbix integration page in Splunk On-Call. You can also provide an email address as the fallback contact in the event that sending a notification to Splunk On-Call fails.

The final script to run is /opt/victorops/zabbix_plugin/bin/create_links.sh.

Configuration elements
-------------------------------

The configuration script connects to the Zabbix server and, using the Zabbix API, adds several elements required to forward notifications to Splunk On-Call. These are:

-  A Zabbix user “Splunk On-Call Alert”
-  A Zabbix user group “Splunk On-Call Users”
-  A Zabbix media type “Notify Splunk On-Call”
-  A Zabbix action “Notify Splunk On-Call”. The action includes the specific message content required for processing and is invoked by Zabbix for any trigger in problem status, including recovery notifications.
-  A Zabbix item “Splunk On-Call forwarder” to the host “Zabbix Server” for the Splunk On-Call forwarder process. This item is an “external check” type. When Zabbix runs a check of this item, it will start the forwarder process if necessary.

Configure ack-back to Zabbix
--------------------------------

To turn on the ack-back feature for Zabbix, do the following:

1. Copy /opt/victorops/zabbix_plugin/conf/local.zabbix.conf.example to /opt/victorops/zabbix_plugin/conf/local.zabbix.conf.

2. Open /opt/victorops/zabbix_plugin/conf/local.zabbix.conf in an editor and set a user and password allowed to log in to the Zabbix console with “acknowledge” permissions:

   .. code-block:: shell

      ZABBIX_USER=admin ZABBIX_PASSWD=fooblyboo

   You might want to change the owner of the file to the Zabbix user, and set permissions to 600.

3. On the Zabbix console, navigate to the “Items” list for your Zabbix server and turn on the :guilabel:`Splunk On-Call Command Poll` item.

Configure multiple Zabbix servers
=======================================

If you want to use the Splunk On-Call integration on multiple Zabbix servers, you need to update the Zabbix Action so that it includes the ``MONITOR_NAME`` field. You must add this to both the Default and Recovery message bodies.

.. image:: images/spoc/zabbix_mult_monitors.png
   :alt: Multiple monitors

The ``MONITOR_NAME`` field must be unique for each Zabbix server that has the plugin installed.

Add the matching ``MONITOR_NAME`` value to the configuration file found at /opt/victorops/zabbix_plugin/conf/local.zabbix.conf.

The syntax of the .conf file is important. Don't use spaces nor quotes when setting the ``MONITOR_NAME`` value.

.. caution:: Changing these settings disconnects the items on the Zabbix side from the Splunk On-Call side. This means that if there are any open incidents in Splunk On-Call, they have to be manually resolved.

On the Zabbix console, navigate to the “Items” list for your Zabbix server and turn on the :guilabel:`Splunk On-Call Command Poll` item.

Routing incidents in Splunk On-Call
===========================================

Any incident created by notifications sent to Splunk On-Call is processed on the default routing rule. If you prefer to use another routing key in Splunk On-Call, you can modify the media for the Splunk On-Call Alert user and put your Splunk On-Call routing key in the :guilabel:`Send to` field.

.. image:: images/spoc/zabbix_routing_1.png
   :alt: Access the Splunk On-Call Alert user

Change the :guilabel:`Send To` to the routing key you want to use:

.. image:: images/spoc/zabbix_routing_2.png
   :alt: New Send to value

To create multiple or complex routing schemes, you might need to create new Zabbix actions, users and or media types for the routing keys involved.


Troubleshooting
=======================================

If you are seeing JSON errors on the Webhook action like the following picture, it means there is some invalid JSON characters in the item or trigger names and descriptions.

.. image:: images/spoc/jsonerror1.png
   :alt: JSON error

Uncomment lines 9, 11, 14, and 17 in the Splunk On-Call media type script to parse out quotes and new line characters. If this fails to fix your issue, you can augment the regular expression for other invalidating characters or reach out to Splunk support.

Proxy support (5.0 and higher)
-------------------------------

Uncomment line 38 to add a proxy to your Zabbix Webhook.


Notification handandling
=======================================

The action to notify Splunk On-Call saves the notification details to a file on disk. Within a couple of seconds, the forwarder process sends the details to Splunk On-Call, where the normal alert processing is performed.

If forwarding the details is unsuccessful, the timestamp of the details is checked, and if the details are old (1 minute by default), the details are instead sent to the backup email address you provided at configuration time.

If you want to shorten the payload (Default Message) sent from Zabbix to Splunk On-Call, you must leave the following minimum required fields:

.. code-block:: text 

   VO_ORGANIZATION_ID= YOUR_ORG_SLUG_HERE CONTACTEMAIL= YOUR_EMAIL_HERE
   ESC.HISTORY={ESC.HISTORY} EVENT.ACK.HISTORY={EVENT.ACK.HISTORY}
   EVENT.ACK.STATUS={EVENT.ACK.STATUS} EVENT.DATE={EVENT.DATE}
   EVENT.TIME={EVENT.TIME} HOSTNAME={HOSTNAME} HOST.NAME={HOST.NAME}
   HOST.NAME1={HOST.NAME1} TRIGGER.KEY={TRIGGER.KEY} TIME={TIME}
   TRIGGER.ID={TRIGGER.ID} TRIGGER.NAME={TRIGGER.NAME}
   TRIGGER.NSEVERITY={TRIGGER.NSEVERITY}
   TRIGGER.SEVERITY={TRIGGER.SEVERITY} TRIGGER.STATUS={TRIGGER.STATUS}

