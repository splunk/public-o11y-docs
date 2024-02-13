.. _Icinga-spoc:

Icinga integration for Splunk On-Call
**********************************************************

.. meta::
    :description: Configure the Icinga integration for Splunk On-Call.

To process Splunk On-Call alert in Icinga you can add an Icinga contact to a contact group (often the admin contact group though this can vary depending on your configuration). The contact mechanism for the Splunk On-Call contact is a simple shell script that spools the alert details to a file on disk. When an alert is fired and Icinga invokes the contact script, the details are in /var/nagios. There is also a long-running forwarding bash script that monitors /var/nagios for new files and posts the data in those files to Splunk On-Call over HTTPS. Icinga monitors this forwarding script and, if it stops for any reason, the Icinga service check attempts to restart it. In the event that this forwarding script is unable to successfully send alerts to Splunk On-Call for a time, it falls back to sending an email version of the alert.

If you prefer not to install the plugin you can also send Icinga alerts through email. See :ref:`email-generic-spoc`.

Requirements
================

* Icinga versions 2.x and lower 
* Splunk On-Call Versions: Getting Started, Essentials, or Full-Stack

Turn on the integration and generate an API key
====================================================

Go to :guilabel:`Settings` then :guilabel:`Alert Behavior` then :guilabel:`Integrations` then :guilabel:`Icinga` and select :guilabel:`Enable Integration` to generate your configuration values for Icinga. You use the API key that displays after turning on the integration in a later configuration step.

.. image:: /_images/spoc/KB-icinga-service-api-key.png
   :alt:  Icinga integration in the alert behavior settings in Splunk On-Call

Configure the plugin
==========================

The plugin files are in /opt/victorops/nagios_plugin. There is a Icinga configuration file called victorops.cfg in /opt/victorops/nagios_plugin/nagios_conf. The configuration file contains all configuration for the plugin. 

Make the following customizations to the victorops.cfg file:

* Add your company ID.
* Add your API key.
* Add your Icinga host name.

Install the plugin
=====================

Depending on your system you might need to use sudo with these commands.

.. tabs::

   .. tab:: deb install

      1. Run the following command:

         .. code-block::

            wget https://github.com/victorops/monitoring_tool_releases/releases/download/victorops-nagios-1.4.20/victorops-nagios_1.4.20_all.deb

      2. Run the following command:

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

If you install from the DEB or RPM packages, the installer puts the plugin files in /opt/victorops/nagios_plugin and creates the logging and alert directories.

Modify your Nagios configuration file
========================================

The plugin sends alerts to Splunk On-Call with a shell script that requires the Nagios/Icinga environment macros. 

1. To turn on this Icinga functionality, open /etc/nagios/nagios.cfg (or icinga.cfg, actual path might vary).
2. Find the enable_environment_macros directive and set it equal to 1: ``enable_environment_macros=1``. If the enable_environtment_macros directive doesn't exist, add it to the config file.
3. In the nagios.cfg file, add a directive that tells Icinga where to find your Splunk On-Call configuration file. For example, adjust the following directive to use your unique file path: ``cfg_file=/usr/local/nagios/etc/victorops.cfg``.

Modify your VictorOps configuation file
========================================

The VictorOps configuration file defines where to route the Icinga alert, amongst other variables.

1. Move victorops.cfg to your Icinga configuration directory:
   
   .. code-block::

      mv /opt/victorops/nagios_plugin/nagios_conf/victorops.cfg
      /usr/local/nagios/etc

2. Open the victorops.cfg file and configure the following required values in both the VictorOps_Contact_Settings (~line 20) contact and VictorOps_Service_Settings (~line 40) service object definitions.

   Required configuration settings:

   .. list-table::       
      :header-rows: 1
      :widths: 26 37 37
      :width: 100%
      
      * - Setting
        - Location
        - Description
      * - ``_VO_ORGANIZATION_ID``
        - Line 24 in ``VictorOps_Contact_Settings`` and line 44 in ``VictorOps_Service_Settings`` approximately
        - The slug for your Splunk On-call organization. To find your slug, go to your timeline in Splunk On-Call and look at the URL. Your ``_VO_ORGANIZATION_ID`` is the string that follows ``/client/``. 
      * - ``_VO_ORGANIZATION_KEY``
        - Line 25 and 26 in ``VictorOps_Contact_Settings`` approximately
        - The API key that was created when you turned on the integration.
      * - 
        - Line 51 in ``VictorOps_Service_Settings`` approximately
        - This value is in the ``VictorOps_Service_Settings`` service object definition. It is the name of your Icinga host, as defined to Icinga. It turns on the heartbeat and command check services.

   Optional configuration settings:

   .. list-table::       
      :header-rows: 1
      :widths: 26 37 37
      :width: 100%
      
      * - Setting
        - Location
        - Description
      * -  ``_VO_MONITOR_NAME`` 
        - Line 24 in ``VictorOps_Contact_Settings`` and line 46 in ``VictorOps_Service_Settings`` approximately
        - Identifies the Icinga instance to Splunk On-Call and might be blank. If you are using multiple Icinga servers in your architecture, distinguish them with unique IDs in this field.
      * - ``_VO_CONTACTEMAIL`` 
        - Line 32 in ``VictorOps_Contact_Settings`` approximately
        - A backup email address to send alerts to. If the plugin is unable to relay alerts to Splunk On-Call, an alert email is sent to this address. Include an email-SMS gateway in this list. You can configure multiple addresses by separating them with spaces and enclosing the whole thing in single quotes, for example: ``'me@mydomain.com you@mydomain.com him@mydomain.com 3035551212@vtext.com'``
      * -  ``_VO_MAX_SEND_DELAY`` 
        - Line 36 in ``VictorOps_Contact_Settings`` approximately
        - The maximum amount of time (in seconds) that alerts are allowed to remain in the queue before the alert is sent to the contact email.

3. For CentOS systems, add the following line to /opt/victorops/nagios_plugin/bin/utils

.. code-block:: 
   
   DEBUG_FILE=/dev/null

Configure additional services
========================================

These 4 services appear on the Icinga server in the Icinga dashboard. If you want to turn on alerts for these service, edit their service definitions in victorops.cfg.

Splunk On-Call alert forwarder
--------------------------------

This is a process check for the long-running script. If this service goes critical, it create an email alert (since normal alert forwarding can't work when this service is down).

Splunk On-Call heartbeat
--------------------------------

The victorops.cfg file defines a service to send heartbeat info to Splunk On-Call. This service is turned on by default. This service helps you to determine whether your plugin is working correctly, even if there are no alerts generated by Icinga. 

Splunk On-Call command poll (acknowledge back)
--------------------------------------------------

This service polls Splunk On-Call for commands to run on your Icinga server. This service is turned off by default. The purpose is to allow commands issued at Splunk On-Call to be relayed to your Icinga monitor. At this time, the only commands allowed by this service are host and service acknowledgements.
See :ref:`ack-back`.

Splunk On-Call status resync (manual/auto)
----------------------------------------------

This service can send a complete Icinga status to Splunk On-Call. It can be used in the event that Splunk On-Call gets out of sync with your Icinga system. This might happen, for example, if you had notifications disabled in Icinga for a time. It requires cURL be installed on the Icinga host. There are 2 options, manual and auto. The manual option can only be invoked manually in the Icinga console. The auto option runs automatically, but is turned off and commented out by default. At this time, this is a preview feature.

Verify your installation
==============================

After you install and configure the plugin, you can verify functionality by using Icinga to send a custom notification for a service you defined. The alert should be received by Splunk On-Call and appear in your company timeline. The contact script and alert forwarder write logs in /var/log/victorops. If the plugin doesn't seem to be working correctly, check these logs for errors.

.. _Icinga-routing-incidents:

Routing incidents to multiple teams
=======================================

With the Nagios/Icinga plugin for Splunk On-Call, the routing key sent to Splunk On-Call is the name of whatever contact group contains the Splunk On-Call contact. If you want Icinga to route various incidents to multiple teams in Splunk On-Call, you need to create a unique contact, and unique contact group (with the 1 contact as the sole member) for each routing key you want to use in Splunk On-Call. You can set up routing keys in Splunk On-Call under :guilabel:`Settings` then :guilabel:`Alert Behavior` then :guilabel:`Routing Keys`.

In the following example, assume there are 3 teams in Splunk On-Call that you want to receive incidents from Icinga. The teams are DevOps, SRE, and Database.

1. Define a contact for each team, using the ``VictorOps_Contactsettings`` setting defined in victorops.cfg.
   
   Devops contact:

   .. code-block:: bash
      
      define contact{
      use            VictorOps_Contact
      name           VictorOps_devops
      contact_name   VictorOps_devops
      alias          VictorOps_devops
      }

   SRE contact:

   .. code-block:: bash
      
      define contact{
      use            VictorOps_Contact
      name           VictorOps_sre
      contact_name   VictorOps_sre
      alias          VictorOps_sre
      }

   Database contact:

   .. code-block:: bash
      
      define contact{
      use            VictorOps_Contact
      name           VictorOps_database
      contact_name   VictorOps_database
      alias          VictorOps_database
      }

2. Define a unique contact group for each of the contacts defined above and add those contacts as the sole member, respectively. The value used in the alert to Splunk On-Call is derived from the ``contactgroup_name``, so make sure that these names match the values you want to use in Splunk On-Call or change the routing_keys in Splunk On-Call to match the names you define here.

   Devops contact group:

   .. code-block:: bash
      
      define contactgroup{
      contactgroup_name         devops ## This is the routing_key value of the alert to Splunk On-Call
      alias                     VictorOps DevOps contact group
      members                   VictorOps_devops
      }

   SRE contact group:

   .. code-block:: bash
      
      define contactgroup{
      contactgroup_name         sre ## This is the routing_key value of the alert to Splunk On-Call
      alias                     VictorOps SRE contact group
      members                   VictorOps_sre
      }

   Database contact group:

   .. code-block:: bash
      
      define contactgroup{
      contactgroup_name         database ## This is the routing_key value of the alert to Splunk On-Call
      alias                     VictorOps Database contact group
      members                   VictorOps_database
      }

3. Add the contact groups to their appropriate check commands so they arrive with the correct routing key, which is the contactgroup_name. You can add the VictorOps contact to as many contact_groups as you like and you can also add the VictorOps contact to specific services.

Avoid Centos 5 timeouts
===========================

You need to link the timeout command to a directory that is in the path. 

1. Create the symlink.

   .. code-block:: bash

      ln -s /usr/share/doc/bash-3.2/scripts/timeout /usr/bin/timeout

2. Make it executable:

   .. code-block:: bash

      chmod 755 /usr/share/doc/bash-3.2/scripts/timeout

.. _Icinga-2:

Icinga version 2 configuration
===================================

After going through the preceeding installation instructions for Icinga (or `Nagios <https://help.victorops.com/knowledge-base/victorops-nagios-integration/>`__), use the following steps to add the VictorOps plugin to your Icinga 2 instance.

You can find these steps in the README.md file in /opt/victorops/nagios_plugin/icinga2_conf

#. Make a copy of the victorops.conf file and add it to /opt/victorops/nagios_plugin/icinga2_conf and give it a new name, for example: victorops.myorg.conf.
#. Edit the following configuration details in your new file:
    #. (Required) Set your organization ID and service API key to the values shown on the Splunk On-Call Icinga integration page.
       
       .. code-block:: bash
          
          const VictorOps_ORGANIZATION_ID = "my-org" 
          const VictorOps_ORGANIZATION_KEY = "5913e634-XXXX-XXXX-XXXX-a7500d926a44"
    #. (Required) Set at least 1 fall back email address in case the plugin is unable to contact Splunk On-Call.  

       .. code-block:: bash
          
          const VictorOps_CONTACTEMAIL = "alex@buttercupgames.com"
    #. (Optional) Turn on acknowledge back.

       .. code-block:: bash
          
          const VictorOps_enable_cmd_poll = true
    #. (Optional) Give your Icinga 2 host a distinct name for Splunk On-Call. You need this if you have multiple Icinga hosts.

       .. code-block:: bash
          
          const VictorOps_MONITOR_NAME = “icinga2.myorg.com”
#. Create a symlink between the Icinga2 config director and your new config file:

   .. code-block:: bash

      ln -­s /opt/victorops/nagios_plugin/icinga2_conf/victorops.myorg.conf/etc/icinga2/conf.d/victorops.myorg.conf

#. Restart Icinga 2.

After Icinga restarts, you see 3 VictorOps services as shown in the following image.

.. image:: /_images/spoc/icinga2.png
   :alt: 3 VictorOps services in Icinga

Routing configuration for Incinga version 2
------------------------------------------------

The default user and notification apply configuration sends all host and service alerts to Splunk On-call through the Splunk On-Call user. If you want to use Splunk On-Call routing keys, create a user for each routing key and create notification rules to those users. For example, to send an alert to Splunk On-Call with the routing key "devops", create a user object named "devops", and apply a notification rule that imports a notify­victorops template to that user:

Example routing configuration:

.. code-block:: bash

   object User "devops" {
    import "generic­user"
    display_name = "devops"
   }
   apply Notification "notify­devops­service" to Service {
      import "notify­victorops­service"
      users = ["devops"]
      assign where match("*load*", service.name)
   }
   apply Notification "notify­devops­host" to Service {
      import "notify­victorops­host"
      users = ["devops"]
      assign where match("*.production.myorg.com", host.name)
   }
