.. _zenoss-spoc:

Zenoss integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Zenoss integration for Splunk On-Call.

Zenoss is a free and open-source application, server, and network management platform. The Splunk On-Call Zenoss plugin is a set of scripts that queue event triggers or notifications and forwards them to Splunk On-Call servers for processing. Queuing of notifications is done in-band as Zenoss runs the notification command, and forwarding is done out-of-band by a long-running process.

The forwarding process can retry sending the notification, and if the send fails for any reason, for an extended period of time (1 minute by default), it falls back to sending an email to a configured address.

The package is available as an RPM, DEB or tarball, and can be installed using yum or apt-get by adding Splunk On-Call to your package sources.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

The integration supports Zenoss 5.x only.

Python is required on the server, which is also a requirement of the Zenoss server.

curl is also required on the server.


Layout
==================

The main package files are installed to /opt/victorops/zenoss_plugin.

Notifications are queued in /var/victorops/zenoss-alerts.

Logs are written in /var/log/victorops.

Symbolic links are created in the Zenoss libexec (/opt/zenoss/libexec) for some of the files in /opt/victorops/zenoss_plugin/bin.

Installation
==================

.. note:: Depending on your system you might need to prepend ``sudo`` to the following commands.

DEB package
-----------------

1. Download the .deb package using wget:

   .. code-block:: shell

      wget https://github.com/victorops/monitoring_tool_releases/releases/download/victorops-zenoss-0.22.44/victorops-zenoss_0.22.44_all.deb

1. Unpack the file:

   .. code-block:: shell

      dpkg -i <path_to_file>

   If you don't want to use dpkg you can also use apt:

   .. code-block:: shell

      sudo apt install <path_to_file>

RPM package
---------------

1. Download the .rpm package using wget:

   .. code-block:: shell

      wget https://github.com/victorops/monitoring_tool_releases/releases/download/victorops-zenoss-0.22.44/victorops-zenoss-0.22.44-1.noarch.rpm

2. Install the package:

   .. code-block:: shell

      rpm -i <path_to_file>


Configuration
========================

If you install from the DEB or RPM packages, the installer puts the plugin files in their location in /opt/victorops/zenoss_plugin. Additionally, 2 directories are created, /var/victorops/zenoss-alerts and /var/log/victorops, for
notification queuing and logging, respectively.

Once installed, the package requires configuration by running the /opt/victorops/zenoss_plugin/bin/configure.sh script. The configuration script connects to the Zenoss server. To use it you need to provide a Zenoss admin user ID and password. The script prompts you to get both credentials.

Additionally, you need to provide your organization slug and Zenoss alert key to the configure.sh script. These are found on your Zenoss integration page in Splunk On-Call. You can also provide an email address as the fallback contact in the event that sending a notification to Splunk On-Call fails. To do so, edit the /opt/victorops/zenoss_plugin/conf/local.zenoss.conf file and add your email after ``export FAILSAFE_EMAIL_TO``.

Configuration elements
----------------------------

The configure.sh script connects to the Zenoss server and, using the Zenoss API, adds several elements required to forward notifications to Splunk On-Call. These are:

-  Two Zenoss triggers
-  A Zenoss notification that contains both a command and clear command


Escalation routing
============================

Any incidents created by notifications sent to Splunk On-Call are processed on the default route. To change the routing, modify the notification commands for the :guilabel:`VictorOpsNotify Notification` and put your Splunk On-Call routing key after ``VO_ROUTING_KEY=``.

1. Select :guilabel:`Events` and then :guilabel:`Triggers`.

   |zenoss1|

2. Select :guilabel:`Notification` and then :guilabel:`VictorOpsNotify`:

.. image:: /_images/spoc/Zenoss2.png
   :alt: Select notification

3. Select :guilabel:`Content` and put the desired routing key after :guilabel:`VO_ROUTING_KEY=`:

.. image:: /_images/spoc/Zenoss3.png
   :alt: Add routing key

How notifications are handled
------------------------------

The action to notify Splunk On-Call saves the notification details to a file on disk. Within a couple seconds, the forwarder process sends the details to Splunk On-Call, where the normal alert processing is performed.

If forwarding the details is unsuccessful, the timestamp of the details is checked, and if the details are old (1 minute by default), the details are instead sent to the backup email address you provided at configuration time.

.. |zenoss1| image:: /_images/spoc/Zenoss1.png
