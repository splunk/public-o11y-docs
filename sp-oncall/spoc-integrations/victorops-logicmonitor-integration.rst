.. _logicmonitor-legacy:

*******************************************************************************
LogicMonitor legacy integration for Splunk On-Call
*******************************************************************************

**This integration has been updated and all accounts setting up new
LogicMonitor integrations should instead refer to** `this
page <https://help.victorops.com/knowledge-base/victorops-logicmonitor2-integration/>`__\ *\ *\ **.
Legacy LogicMonitor integrations will not be affected by this change.**

LogicMonitor can replace multiple monitoring solutions – it allows you
to monitor everything in your datacenter: servers (physical, virtual, or
cloud based), applications (web, mail, database, virtualization, etc),
networking gear, storage arrays, load balancers, UPS, etc, using a
single web portal.

The VictorOps integration with LogicMonitor will create an Incident in
the VictorOps timeline whenever an Alert is created in LogicMonitor.

 

1. From the LogicMonitor UI Under **Setting** select **Alert Settings**,
   click **Other Alert Settings**, then **Custom Alert Delivery
   Methods**.
2. Add a new **Custom Alert Delivery Method** then give it a name and
   description.
3. Fill out the parameters like the example bellow. Make sure to switch
   out the Alert Key with your LogicMonitor Key found on the
   integrations page in VictorOps by enabling the LogicMonitor
   Integration. The routing key should also be replaced with the
   appropriate routing key for these incidents.

 

+-----------------------------------+-----------------------------------+
| Name                              | Value                             |
+===================================+===================================+
| HTTP Method                       | HTTP POST                         |
+-----------------------------------+-----------------------------------+
| URL                               | htt                               |
|                                   | ps://alert.victorops.com/integrat |
|                                   | ions/logicmonitor/20140401/**YOUR |
|                                   | ALERT KEY HERE**/**YOUR ROUTING   |
|                                   | KEY HERE**                        |
+-----------------------------------+-----------------------------------+
| Username                          | N/A                               |
+-----------------------------------+-----------------------------------+
| Password                          | N/A                               |
+-----------------------------------+-----------------------------------+
| Alert Data                        |                                   |
+-----------------------------------+-----------------------------------+

ADMIN=##ADMIN##

ALERTID=##ALERTID##

ALERTTYPE=##ALERTTYPE##

ALERTSTATUS=##ALERTSTATUS##

CMDLINE=##CMDLINE##

DATAPOINT=##DATAPOINT##

DATASOURCE=##DATASOURCE##

DPDESCRIPTION=##DPDESCRIPTION##

DSIDESCRIPTION=##DSIDESCRIPTION##

DURATION=##DURATION##

EVENTCODE=##EVENTCODE##

EXITCODE=##EXITCODE##

FACILITY=##FACILITY##

GENERALCODE=##GENERALCODE##

HOST=##HOST##

INSTANCE=##INSTANCE##

LEVEL=##LEVEL##

LOGFILE=##LOGFILE##

MESSAGE=##MESSAGE##

SOURCENAME=##SOURCENAME##

SPECIFICCODE=##SPECIFICCODE##

STARTEPOCH=##STARTEPOCH##

STDERR=##STDERR##

STDOUT=##STDOUT##

THRESHOLD=##THRESHOLD##

TRAPOID=##TRAPOID##

TYPE=##TYPE##

VALUE=##VALUE##

\| \| Data Format \| plain text \|
