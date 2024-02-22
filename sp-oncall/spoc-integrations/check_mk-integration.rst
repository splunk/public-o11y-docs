Checkmk integration for Splunk On-Call
**********************************************************


Requirements
================

* Checkmk versions supported: Checkmk Raw, Checkmk Enterprise
* Splunk On-Call version required: Starter, Growth, Enterprise

.. note:: The Splunk On-Call plugin for CheckMK is only compatible with the legacy Nagios Core CheckMK. The plugin is not compatible with the new CheckMK Micro Core (CMC).

Configure Splunk On-Call
===================================

1. Go to :guilabel:`Integrations` then :guilabel:`Generic REST endpoint`.
2. Copy the :guilabel:`REST endpoint URL` to your clipboard.

Obtain your organization ID and key
----------------------------------------

You also need your Splunk On-Call organization ID and keys to complete your CheckMK configuration. 

To obtain your organization ID, go to Splunk On-Call timeline. Your organization ID is the end of the URL. For example, if the URL is ``https://portal.victorops.com/client/buttercup-games`` then the organization ID is ``buttercup-games``.

You can find your organization key by selecting the Nagios integration in Splunk On-Call. From the timeline select :guilabel:`Integrations` then :guilabel:`Nagios/Nagios XI`.

Configure CheckMK
==========================

1. Create a notification in CheckMK
2. For the *Notification Method* select the *VictorOps* option.
3. Input the REST endpoint URL from Splunk On-Call in the *VictorOPS REST URL* textbox (with *REST Endpoint* *URL* selected in the dropdown

.. image:: /_images/spoc/0checkmk.png

See :new-page:`https://docs.checkmk.com/latest/en/notifications_victorops.html` for more information on integrating and testing.

Legacy CheckMK (Nagios Core) plugin installation
=====================================================

Depending on your system you might need to use sudo with these commands.

.. tabs::

   .. tab:: deb install

      1. Run the following command:

         .. code-block::

            wget
   https://github.com/victorops/monitoring_tool_releases/releases/download/victorops-nagios-1.4.20/victorops-nagios_1.4.20_all.deb

      1. Run the following command:

         .. code-block::

            dpkg -i <path_to_file>

         If you don't want to use dpkg you can also run the following:

         .. code-block::
            
            sudo apt install <path_to_file>

   .. tab:: rpm install

      1. Run the following command:

         .. code-block::

            wget
   https://github.com/victorops/monitoring_tool_releases/releases/download/victorops-nagios-1.4.20/victorops-nagios-1.4.20-1.noarch.rpm

      2. Run the following command

         .. code-block::

            rpm -i <path_to_file>

Configure CheckMK
-------------------

1. Run the following command with your site name to create copies of Nagios and environment configuration files and create symlinks to them in the site Nagios directory:

``/opt/victorops/nagios_plugin/omd_check_mk/install.sh <yoursitename>``

2. Run this command to edit the configuration files:

``vi /opt/victorops/nagios_plugin/conf/env.<yoursitename>.sh``

3. Update the file, setting the values you previously obtained for your organization ID and organization key. You can also specify a fail-safe email and monitor name. 

4. If your localhost is not configured as "localhost" in your Nagios instance, you need to edit /opt/victorops/nagios_plugin/nagios_conf/victorops..cfg to change the service hostname on ~line 52. Run the following command to edit the configuration file:

``vi /opt/victorops/nagios_plugin/nagios_conf/victorops.mysite.cfg``

5. Verify the Nagios configuration

``/omd/sites/;/bin/nagios -v /omd/sites//tmp/nagios/nagios.cfg``

6. Restart your omd instance. The Splunk On-Call services show on your Nagios host dashboard. Splunk On-Call services also appear on the Checkmk service status for the host. You can look for logs in /var/log/victorops.

7. Next, you need to configure the contact settings from the Checkmk console. Start by selecting *Users*.

.. image:: /_images/spoc/checkmk2.png
   :alt: checkmk2

   checkmk2

8. Make a *New User*.

.. image:: /_images/spoc/checkmk3.png
   :alt: checkmk3

   checkmk3

9. Configure the user. Email is required even though no emails are sent. Disable logins for this user and add the user to a contact group.

.. image:: /_images/spoc/checkmk4.png
   :alt: checkmk4

10. Enable notifications for the user and configure the notification method for “VictorOps” and “Call with the following parameters” as pictured here.

.. image:: /_images/spoc/check_mk-user-setttings@2x.png

11. Disable flapping and downtime events for hosts and services, as follows (VictorOps does not currently represent these states):

.. image:: /_images/spoc/check_mk-user-settings2@2x.png

12.   Send a test notification using the “send custom notification” features of either Checkmk or Nagios. The VictorOps Forwarder service does not notify through the usual mechanisms, though, so avoid sending custom notifications with that service.
