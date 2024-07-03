.. _CheckMK-spoc:

CheckMK integration for Splunk On-Call
**********************************************************

.. meta::
    :description: Configure the CheckMK integration for Splunk On-Call.

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

* To obtain your organization ID, go to Splunk On-Call timeline. Your organization ID is the end of the URL. For example, if the URL is ``https://portal.victorops.com/client/buttercup-games`` then the organization ID is ``buttercup-games``.
* You can find your organization key by selecting the Nagios integration in Splunk On-Call. From the timeline select :guilabel:`Integrations` then :guilabel:`Nagios/Nagios XI`.

Configure CheckMK
==========================

1. Create a notification in CheckMK.
2. For the :guilabel:`Notification Method`, select :guilabel:`VictorOps`.
3. Select  :guilabel:`REST Endpoint URL` selected in the drop-down menu.
4. Enter the REST endpoint URL you copied previously from Splunk On-Call in the :guilabel:`VictorOPS REST URL` field. 

.. image:: /_images/spoc/0checkmk.png
   :alt: Configure CheckMK contact
   :width: 95%

See :new-page:`https://docs.checkmk.com/latest/en/notifications_victorops.html` for more information on integrating and testing.

Legacy CheckMK (Nagios Core) plugin installation
=====================================================

Install the plugin
----------------------

Depending on your system you might need to use sudo with these commands.

.. tabs::

   .. tab:: deb install

      1. Run the following command:

         .. code-block::

            wget https://github.com/victorops/monitoring_tool_releases/releases/download/victorops-nagios-1.4.20/victorops-nagios_1.4.20_all.deb

      1. Run the following command:

         .. code-block::

            dpkg -i <path_to_file>

         If you don't want to use dpkg you can also run the following:

         .. code-block::
            
            sudo apt install <path_to_file>

   .. tab:: rpm install

      1. Run the following command:

         .. code-block::

            wget https://github.com/victorops/monitoring_tool_releases/releases/download/victorops-nagios-1.4.20/victorops-nagios-1.4.20-1.noarch.rpm

      2. Run the following command

         .. code-block::

            rpm -i <path_to_file>

Configure CheckMK
-------------------

#. Run the following command with your site name to create copies of Nagios and environment configuration files and create symlinks to them in the site Nagios directory:

   .. code-block:: 
      
      /opt/victorops/nagios_plugin/omd_check_mk/install.sh <yoursitename>

#. Run this command to edit the configuration files:

   .. code-block:: 

      vi /opt/victorops/nagios_plugin/conf/env.<yoursitename>.sh

#. Update the file, setting the values you previously obtained for your organization ID and organization key. You can also specify a fail-safe email and monitor name. 

#. If your localhost is not configured as "localhost" in your Nagios instance, you need to edit /opt/victorops/nagios_plugin/nagios_conf/victorops..cfg to change the service hostname on ~line 52. Run the following command to edit the configuration file:
   
   .. code-block:: 

      vi /opt/victorops/nagios_plugin/nagios_conf/victorops.mysite.cfg

#. Verify the Nagios configuration

   .. code-block:: 

      /omd/sites/;/bin/nagios -v /omd/sites//tmp/nagios/nagios.cfg

#.  Restart your omd instance. The Splunk On-Call services show on your Nagios host dashboard. Splunk On-Call services also appear on the Checkmk service status for the host. You can look for logs in /var/log/victorops.

#. Next, you need to configure the contact settings from in CheckMK. Select :guilabel:`Users`.

   .. image:: /_images/spoc/checkmk2.png
      :alt: Configure CheckMK contact
      :width: 45%

#. Select :guilabel:`New User`.

   .. image:: /_images/spoc/checkmk3.png
      :alt: checkmk3
      :width: 95%

#. Configure the user. An email is required even though no emails are sent. Disable logins for this user and add the user to a contact group.

   .. image:: /_images/spoc/checkmk4.png
      :alt: Add new CheckMK user
      :width: 75%

#. Turn on notifications for the user and configure the notification method for :guilabel:`VictorOps` and :guilabel:`Call with the following parameters` as shown in the following image:

   .. image:: /_images/spoc/check_mk-user-setttings@2x.png
      :alt: Configure notification method in CheckMK
      :width: 95%

#. Disable flapping and downtime events for hosts and services, as follows. Splunk On-Call doesn't represent these states.

   .. image:: /_images/spoc/check_mk-user-settings2@2x.png
      :alt: Configure notification settings in CheckMK
      :width: 95%

#. Send a test notification using custom notifications in either CheckMK or Nagios. The Splunk On-Call forwarder service doesn't notify through the usual mechanisms, though, so avoid sending production notifications with that service.
