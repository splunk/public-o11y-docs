[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported:** Icinga 2.x and below (**Extra steps required for
Icinga 2- see below**)

**VictorOps Version Required: Getting Started, Essentials,** or
**Full-Stack**

**What you need to know:**  Routing incidents from Icinga to multiple
teams in VictorOps requires additional configuration.  (See “Routing”
below)  There are also special instructions below for avoiding timeouts
when using Centos 5.

[/ht_toggle]

--------------

**Icinga Plugin**
=================

`(click here if you are using Icinga 2) <#Icinga2>`__

VictorOps alert processing is implemented as an Icinga contact that is
added to a contact group (often ‘admins', but that will depend on your
individual configuration).

The contact mechanism for the VictorOps contact is a simple shell script
that spools the alert details to a file on disk. When an alert is fired,
and Icinga invokes the contact script, the details wind up in
``/var/nagios``.

There is a long-running bash script that monitors /var/nagios for new
files and posts the data in those files to VictorOps over HTTPS. This
forwarding script is monitored by Icinga itself, and if it stops for any
reason, the Icinga service check will attempt to restart it.

In the event that this forwarding script is unable to successfully send
alerts to VictorOps for a time, it will fall back to sending an email
version of the alert. The target address for this fallback alert is
configurable (`see below <#backup-email>`__).

If you prefer not to install the plugin you can also `send Icinga alerts
via
email <https://help.victorops.com/knowledge-base/victorops-generic-email-endpoint/>`__.

--------------

**Layout**
----------

The plugin files are installed to ``/opt/victorops/nagios_plugin``.
There is a Icinga configuration file called **victorops.cfg** in
``/opt/victorops/nagios_plugin/nagios_conf``. This file contains all
configuration for the plugin. After you've added your company ID, API
key and Icinga host name, copy it to your Icinga configuration
directory.

--------------

**Installation**
~~~~~~~~~~~~~~~~

Depending on your system you may need to use sudo with these commands.

**deb** install

1. Execute

   wget
   https://github.com/victorops/monitoring_tool_releases/releases/download/victorops-nagios-1.4.20/victorops-nagios_1.4.20_all.deb

2. Execute

   dpkg -i <path_to_file>

   If you don't want to use dpkg you can also use

   sudo apt install <path_to_file>

**rpm** install

1. Execute

   wget
   https://github.com/victorops/monitoring_tool_releases/releases/download/victorops-nagios-1.4.20/victorops-nagios-1.4.20-1.noarch.rpm

2. Execute

   rpm -i <path_to_file>

--------------

**Configuration**
~~~~~~~~~~~~~~~~~

 

If you install from the DEB or RPM packages, the installer will put the
plugin files in the location **/opt/victorops/nagios_plugin** and create
the logging and alert directories.

After installation, you'll need to move the victorops.cfg file to your
Icinga configuration directory, and modify both the icinga.cfg and
victorops.cfg files.

**Modify nagios.cfg**
'''''''''''''''''''''

Sending alerts to VO is done via a shell script that requires the
Nagios/Icinga environment macros. To enable this Icinga functionality,
open /etc/nagios/nagios.cfg (or icinga.cfg, actual path may vary) and
find the enable_environment_macros directive. Make sure this is set to:

enable_environment_macros=1

If this directive does not exist, add it to the config file.

Still within the nagios.cfg file, add this line which tells Icinga where
to find your VictorOps Configuration file. *Using your unique file
path,* this line should read something similar to:

cfg_file=/usr/local/nagios/etc/victorops.cfg

**Modify victorops.cfg**
''''''''''''''''''''''''

This file defines where the Icinga alert will route to (more info in
*Routing Incidents* section below), amongst other variables.

Move victorops.cfg to your Icinga configuration directory using

mv /opt/victorops/nagios_plugin/nagios_conf/victorops.cfg
/usr/local/nagios/etc

Open up the victorops.cfg file itself, and configure the following
values as both the VictorOps_Contact_Settings (~line 20) contact and
VictorOps_Service_Settings (~line 40) service object definitions:

-  \_VO_ORGANIZATION_ID (~line 24 & 44) (case sensitive)

   -  This is your org slug. It can be found by accessing VictorOps
      Timeline and then looking at the URL.  The \_VO_ORGANIZATION_ID
      will be the string that appears after ‘/client/'.  An example can
      be found below, where ‘my-company' is the \_VO_ORGANIZATION_ID

..image images/Timeline_-_Ops_Learning-1.jpg

-  \_VO_ORGANIZATION_KEY (~line 25 & 26)

   -  Can be found In VictorOps by following *Settings >> Alert Behavior
      >> Integrations >> Icinga*.  It will be listed as ‘Service API
      Key'

To generate a Service API Key, in VictorOps navigate to *Integrations >>
Icinga*\ **.**

If the integration has not yet been enabled, click the “Enable
Integration” button to generate your configuration values as seen here:
|image

Also required:

(~Line 51)

This value is in the ``VictorOps_Service_Settings`` (line 40) service
object definition. It is the name of your Icinga host, as defined to
Icinga. It enables the heartbeat and command check services `discussed
below <#additional-services>`__.

-  Additional configuration options:

-  ``_VO_MONITOR_NAME`` (~line 24 & 46)

This identifies the Icinga instance to VictorOps and may be left blank.
If you are using multiple Icinga servers in your architecture, you
should distinguish them with unique IDs in this field.

 

-  ``_VO_CONTACTEMAIL`` (~line 32)

A backup email address to send alerts to. If for any reason the plugin
is unable to relay alerts to VictorOps, an alert email will be sent to
this address. We recommend including an email-SMS gateway in this list.
You may configure multiple addresses by separating them with spaces and
enclosing the whole thing in single quotes:

``'me@mydomain.com you@mydomain.com him@mydomain.com 3035551212@vtext.com'``

 

-  ``_VO_MAX_SEND_DELAY`` (~line 36)

The maximum amount of time (in seconds) that alerts will be allowed to
remain in the queue before the alert is sent to the contact address
above.

Additionally, for CentOS systems, add the following line 
to **/opt/victorops/nagios_plugin/bin/utils**

DEBUG_FILE=/dev/null

 

--------------

**Additional services**
=======================

These four services will appear on the Icinga server in the Icinga
dashboard. By default, notifications for these services are disabled. If
you wish to enable alerts for them,  edit their service
definitions in victorops.cfg.

 

VictorOps Alert Forwarder
-------------------------

This is a process check for the long-running script described above. If
this service goes critical, it will raise an alert via email (since
normal alert forwarding can't work when this service is down).

 

VictorOps Heartbeat
-------------------

The victorops.cfg file defines a service to send heartbeat info to
VictorOps. This service is enabled by default, and can be helpful in
determining whether your plugin is working correctly, even if there are
no alerts being generated by Icinga. Though today this service is just
collecting info, it will eventually be used to generate alerts at
VictorOps if your Icinga server seems to be malfunctioning or down.

 

VictorOps Command Poll (Ack-Back)
---------------------------------

This service will poll VictorOps for commands to execute on your Icinga
server. This service is disabled by default. The purpose is to allow
commands issued at VictorOps to be relayed to your Icinga monitor. At
this time, the only commands allowed by this service are host and
service acknowledgements.
`Learn more. <https://help.victorops.com/knowledge-base/ack-back/>`__

 

VictorOps Status Resync (manual/auto)
-------------------------------------

This service can send a complete Icinga status to VictorOps. It can be
used in the event that VictorOps gets out of sync with your Icinga
system. This might happen, for example, if you had notifications
disabled in Icinga for a time. It requires cURL be installed on the
Icinga host. There are two flavors, manual and auto. As you might guess,
the manual flavor can only be invoked manually (via the Icinga console).

The auto version will run automatically, but is disabled (and commented
out) by default. At this time, this is something of an experimental
feature, so automatic execution is not recommended.

--------------

**Verifying the installation**
==============================

After installing and configuring the plugin, you can verify
functionality by using Icinga to send a custom notification for some
service you have defined. The alert should be received by VictorOps and
appear in your company timeline.

The contact script and alert forwarder write logs in
**/var/log/victorops**. If the plugin does not seem to be working
correctly, check these logs for errors.

--------------

**Routing Incidents**
=====================

With the Nagios/Icinga plugin for VictorOps, the routing key sent to
VictorOps is the name of whatever contact group contains the VictorOps
contact.  If you would like Icinga to be able to route various incidents
to multiple teams in VictorOps, you will need to create a unique
contact, and unique contact group (with the one contact as the sole
member) for each routing key you wish to use in VictorOps.  (Routing
keys can be set up in VIctorOps by clicking *Settings>> Alert Behavior
>> Routing Keys*).

In the below example, assume there are 3 teams in VictorOps that will be
receiving incidents from Icinga. (DevOps, SRE, & Database)

First, define a contact for each team, using the VictorOps_Contact
settings defined in victorops.cfg:

define contact{ use            VictorOps_Contact name          
VictorOps_devops contact_name   VictorOps_devops alias        
 VictorOps_devops }

define contact{ use            VictorOps_Contact name          
VictorOps_sre contact_name   VictorOps_sre alias          VictorOps_sre
}

define contact{ use            VictorOps_Contact name          
VictorOps_database contact_name   VictorOps_database alias        
 VictorOps_database }

Next, define a unique contact group for each of the contacts defined
above and add those contacts as the sole member, respectively.  The
value used in the alert to VictorOps is derived from the
contactgroup_name, so make sure that these names match the the values
you wish to  use in VictorOps (or change the routing_keys in VictorOps
to match the names you define here)

define contactgroup{ contactgroup_name         devops ## <<This will be
the routing_key value of the alert to VictorOps alias                  
  VictorOps DevOps contact group members                  
VictorOps_devops }

define contactgroup{ contactgroup_name         sre alias                
    VictorOps SRE contact group members                   VictorOps_sre
}

define contactgroup{ contactgroup_name         database alias          
          VictorOps Database contact group members                  
VictorOps_database }

Finally, add the contact groups to their appropriate check commands, and
they will arrive with the correct routing key
(contactgroup_name). *Note: you may add the VictorOps contact to as many
“contact_groups” as you like, and you may also add the VictorOps contact
to specific services.*

--------------

**Avoid Centos 5 Timeouts**
===========================

You will need to link the timeout command to a directory that's in the
path. First, create the symlink:

ln -s /usr/share/doc/bash-3.2/scripts/timeout /usr/bin/timeout

Then make it executable:

chmod 755 /usr/share/doc/bash-3.2/scripts/timeout

 

--------------

Icinga 2
========

After going through the above installation instructions for Icinga
(or `Nagios <https://help.victorops.com/knowledge-base/victorops-nagios-integration/>`__),
use the following guide to add the VictorOps plugin to your Icinga 2
instance.

**Note: The following information can all be found in a README.md file
in ``/opt/victorops/nagios_plugin/icinga2_conf``**

1. Make a copy of the **victorops.conf** and add it
   to ``/opt/victorops/nagios_plugin/icinga2_conf`` and give it a new
   name (something like **victorops.myorg.conf** perhaps).

2. Edit victorops.myorg.conf according to the details below.

3. Create a symlink between the Icinga2 config director and your edited
   config file:

   ln -­s /opt/victorops/nagios_plugin/icinga2_conf/victorops.myorg.conf
   /etc/icinga2/conf.d/victorops.myorg.conf

4. Restart Icinga 2.

Once restarted, you should see 3 VictorOps services appear:

.. figure:: images/icinga2.png
   :alt: icinga2

   icinga2

**Configuration details**

In the **victorops.myorg.conf** file that you create, set the following
values:

**Required:**

1. Set your organization ID (i.e. your *organization slug*) and service
   API key to the values shown on the VictorOps Icinga integration page:

   const VictorOps_ORGANIZATION_ID = “my-org” const
   VictorOps_ORGANIZATION_KEY = “5913e634-XXXX-XXXX-XXXX-a7500d926a44”

2. Set a “failsafe” email address or two in the unlikely event that the
   plugin is unable to contact VictorOps for some reason:

   const VictorOps_CONTACTEMAIL = “me@myorg.com 2122422335@txt.att.net”

**Optional:**

1. Enable “ack-back” if desired:

   const VictorOps_enable_cmd_poll = true

2. Give your Icinga 2 host a distinct name to VictorOps: **Note:** you'd
   only really need this if you have multiple Icinga hosts.

 

const VictorOps_MONITOR_NAME = “icinga2.myorg.com”

**Routing Configuration:**

The default user and notification apply configuration will send all host
and service alerts to VictorOps via the VictorOps user. If you wish to
use VictorOps routing keys, create a user for each routing key, and
create appropriate notification apply rules to those users. For example,
to send an alert to VictorOps with the routing key “devops”, create a
user object named “devops”, and apply a notification rule that imports a
notify­victorops template to that user:

 

object User “devops” {     import “generic­user”     display_name =
“devops” } apply Notification “notify­devops­service” to Service {    
import “notify­victorops­service”     users = [“devops”]     assign where
match(“\*load\*”, service.name) } apply Notification “notify­devops­host”
to Service {     import “notify­victorops­host”     users = [“devops”]    
assign where match(“\*.production.myorg.com”, host.name) }

.. | image:: /_images/KB-icinga-service-api-key.png
