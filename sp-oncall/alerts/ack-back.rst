.. _ack-back:

************************************************************************
Ack-Back for Nagios
************************************************************************

.. meta::
   :description: About enabling ack-back for Nagios or Icinga in Splunk On-Call.


Enabling Ack-Back is an option for Nagios/Icinga (explained below) along with :ref:`zabbix-spoc`. In this topic, Nagios and Icinga can be used interchangeably.


Ack-Back is an optional feature that informs your Nagios instance when someone acknowledges its alerts in Splunk On-Call. Note that you must be using the :ref:`Nagios <nagios-spoc>` integration to enable this feature.

Ack-Back is implemented as a Nagios service called “VictorOps Command Poll”. It retrieves acknowledgement commands from Splunk On-Call for
executing locally to Nagios. Enabling Ack-Back is a matter of enabling active checks of the Splunk On-Call Command Poll service.

Find the service definition in the victorops.cfg file:

``define service 
active_checks_enabled   0 
use    VictorOps_Service 
service_description    VictorOps Command Poll 
check_command    check_victorops_cmds ...``

Set the value of the active_checks_enabled setting to 1 and reload Nagios.

Note: in some cases GCI/Admin access for the Splunk On-Call user is required for ack-back to function properly.
