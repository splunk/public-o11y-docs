
.. _logicmonitor-spoc:

LogicMonitor integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the LogicMonitor integration for Splunk On-Call.

LogicMonitor replaces multiple monitoring solutions. It monitors everything in your datacenter: servers (physical, virtual, or cloud based), applications (web, mail, database, virtualization), networking gear, storage arrays, load balancers, UPS, etc, using a single web portal. The Splunk On-Call integration with LogicMonitor uses the REST API and requires that you have implemented LogicMonitor in your infrastructure.


Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

.. note:: To make sure incidents are resolved correctly, select static fields for the Critical and Resolved subject lines.

Splunk On-Call configuration
======================================

In Splunk On-Call, select :guilabel:`Settings`, :guilabel:`Alert Behavior`, :guilabel:`Integrations`, :guilabel:`LogicMonitor`.

If the integration is not active, select :guilabel:`Enable Integration` to generate your endpoint URL.  Make sure to replace the ``$routing_key`` section with the routing key you want to use.


LogicMonitor configuration
======================================

1. From the main dashboard select :guilabel:`Settings`, :guilabel:`Integrations` and select :guilabel:`Add`.

2. In the dialog, select :guilabel:`Custom HTTP Delivery`.

3. Fill in the following values:

   -  Name: Splunk On-Call
   -  Description: Send alert information to Splunk On-Call
   -  Select :guilabel:`Use different URLs or data formats to notify on various alert activity`.

.. image:: /_images/spoc/LogicMonitor_final@2x.png
   :alt: Filled out form in LogicMonitor

Create an alert method for each alert activity. Most of the configuration is the same except for two settings: the
alert activity and its corresponding message type defined in the post body. To do this, create separate configurations for each type of alert status.

1. HTTP Method: HTTP POST
2. URL:
   ``https://alert.victorops.com/integrations/generic/20131114/alert/YOUR_API_KEY_HERE/YOUR_ROUTING_KEY_HERE``
3. Alert Data:

   -  Select :guilabel:`Raw``
   -  Format: :guilabel:`JSON`

4. For the Alert Data paste the following message. Note that this sample assigns a value of ``CRITICAL`` to the ``message_type``:

   .. code-block::

      { “message_type”:“CRITICAL”, “state_message”:“##MESSAGE##”,
      “entity_id”:“##ALERTID##”, “monitoring_tool”:“LogicMonitor”,
      “entity_display_name”:“##LEVEL## alert on ##HOST##”,
      “GROUP”:“##GROUP##”, “START”:“##START##”,
      “DESCRIPTION”:“##SERVICEDESCRIPTION##”,
      “SERVICE_CHECKPOINT”:“##CHECKPOINT##”,
      “SERVICE_GROUP”:“##SERVICEGROUP##”,
      “CLIENT_URL”:“https://##COMPANY##.logicmonitor.com”,
      “ALERT_URL”:“##AlertDetailURL##”, “ADMIN”:“##ADMIN##”,
      “ALERTID”:“##ALERTID##”, “ALERTTYPE”:“##ALERTTYPE##”,
      “ALERTSTATUS”:“##ALERTSTATUS##”, “CMDLINE”:“##CMDLINE##”,
      “DATAPOINT”:“##DATAPOINT##”, “DATASOURCE”:“##DATASOURCE##”,
      “DPDESCRIPTION”:“##DPDESCRIPTION##”,
      “DSIDESCRIPTION”:“##DSIDESCRIPTION##”, “DURATION”:“##DURATION##”,
      “EVENTCODE”:“##EVENTCODE##”, “EXITCODE”:“##EXITCODE##”,
      “FACILITY”:“##FACILITY##”, “GENERALCODE”:“##GENERALCODE##”,
      “HOST”:“##HOST##”, “INSTANCE”:“##INSTANCE##”, “LEVEL”:“##LEVEL##”,
      “LOGFILE”:“##LOGFILE##”, “MESSAGE”:“##MESSAGE##”,
      “SOURCENAME”:“##SOURCENAME##”, “SPECIFICCODE”:“##SPECIFICCODE##”,
      “STARTEPOCH”:“##STARTEPOCH##”, “STDERR”:“##STDERR##”,
      “STDOUT”:“##STDOUT##”, “THRESHOLD”:“##THRESHOLD##”,
      “TRAPOID”:“##TRAPOID##”, “TYPE”:“##TYPE##”, “VALUE”:“##VALUE##” }

Repeat steps 1 through 4 for an alert status of Acknowledged and again for Cleared. For each, within the Alert Data change the ``message_type`` field to reflect the alert status. Map the field as follows and refer to the screenshot for clarification:

.. image:: /_images/spoc/LogicMonitor_config@2x.png
   :alt: Alert data example

Add annotations to alerts
=========================

Using the previous configuration, the alert URL and client URL are sent over as fields. To present these fields as highly accessible annotations, implement the following Rules Engine rules.

-  When ``monitoring_tool`` matches ``LogicMonitor``.

Annotate the alert with:

-  URL, View alert on LogicMonitor, ``${{ALERT_URL}}``
-  URL, Go to LogicMonitor, ``${{CLIENT_URL}}``

.. image:: /_images/spoc/Screen-Shot-2018-04-05-at-1.36.40-PM.png
   :alt: Annotation examples

After you save, direct links appears in the incident and alert cards to both URLs.

.. image:: /_images/spoc/LogicMonitor_annotation@2x.png
   :alt: Sample annotations
