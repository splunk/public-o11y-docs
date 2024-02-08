 

[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported: On Premise and SaaS versions**

**VictorOps Version Required:** Starter, Growth, or Enterprise

[/ht_toggle]

AppDynamics focuses on managing the performance and availability of
applications across cloud computing environments as well as inside the
data center.

The AppDynamics integration with Splunk On-Call allows AppDynamic users
to utilize Splunk On-Call as an “Alerting Extension” within AppDynamics.
The “Alerting Extension” enables AppDynamics to post events and custom
alerts into the Splunk On-Call Timeline. The payload of the alert
includes valuable information related to the alert including a link to
AppDynamics for a thorough diagnosis of the event.

**On Premise Version**
----------------------

In Splunk On-Call
~~~~~~~~~~~~~~~~~

Navigate to the AppDynamics integration page by visiting *Integrations
>> AppDynamics*.

If the integration has not yet been enabled, click the *Enable
Integration* button.  Copy the “Service API Key” to your clipboard.

..image/_images/spoc/1-API-Key.png

In AppDynamics
~~~~~~~~~~~~~~

 

1. Download the VictorOps Alerting Extension zip from [`AppDynamics
   Exchange] <http://community.appdynamics.com/t5/AppDynamics-eXchange/idb-p/extensions>`__

2. Unzip the victorops-alert.zip file into
   <CONTROLLER_HOME_DIR>/custom/actions/ . You should have
   <CONTROLLER_HOME_DIR>/custom/actions/victorops-alert created.

3. Check if you have custom.xml file in
   <CONTROLLER_HOME_DIR>/custom/actions/ directory. If yes, add the
   following xml to the element

   ::

           victorops-alert

           victorops-alert.sh

   If you don't have custom.xml already, create one with the below xml
   content:``<custom-actions>``

   ::

             victorops-alert

             victorops-alert.sh

             <!--victorops-alert.bat--

4. Update the config.yaml file in
   <CONTROLLER_HOME_DIR>/custom/actions/victorops-alert

   #VictorOps Org Key voOrganizationKey: “YOUR_SERVICE_API_KEY_HERE”

   #VictorOps Routing Key voRoutingKey: “YOUR_ROUTING_KEY_HERE”

   #scheme used (http/https) protocol: “https”

   #VictorOps host voAlertHost: “alert.victorops.com”

   #VictorOps url path voAlertUrlPath:
   “/integrations/generic/20131114/alert”

   #http timeouts connectTimeout: 10000 socketTimeout: 10000

   #control level of details in VO alert showDetails: false

5. Installing Custom Actions: To create a Custom Action, first refer to
   the following topics in the AppDynamics docs:

   -  `[Creating custom
      action] <http://docs.appdynamics.com/display/PRO14S/Custom+Actions>`__
   -  `[Build an Alerting
      Extension] <http://docs.appdynamics.com/display/PRO14S/Build+an+Alerting+Extension>`__

   Now you are ready to use this extension as a custom action. In the
   AppDynamics UI, go to Alert & Respond ⇨ Actions. Click Create Action.
   Select *Custom Action* and click *OK*. In the drop-down menu, you can
   find the action called ‘victorops-alert'.

--------------

**SaaS Version**
----------------

AppDynamics gives you real-time insight from your apps using Application
Performance Management–how they're being used, how they're performing,
where they need help. The following guide will walk you through the
Splunk On-Call integration with the AppDynamics SaaS-based model, if you
are using the hosted solution please see the documentation here:
`AppDynamics
Integration <https://help.victorops.com/knowledge-base/victorops-appdynamics-integration/>`__.

.. _in-splunk-on-call-1:

In Splunk On-Call
~~~~~~~~~~~~~~~~~

Navigate to the AppDynamics integration page by visiting *Integrations
>> AppDynamics*.

If the integration has not yet been enabled, click the *Enable
Integration* button.  Copy the *Service API Key* to your clipboard.

|image
~~~~~~~~

In AppDynamics

From the main web portal select *Alert & Respond* then *HTTP Request
Templates* and then *New*\ **.**

..image/_images/spoc/AppDynamics-1@2x.png

 

Give the Template a name (Splunk On-Call Test in below example).

..image/_images/spoc/AppDynamics-2@2x.png

Set a *Custom Templating Variable* with a field name of *message_type*
and a value of *WARNING*.

Under *Request* *URL* set the *Method* to *POST*.

Paste in your Splunk On-Call *Service API Key* into the box labeled *Raw
URL* using the following format:
 https://alert.victorops.com/integrations/generic/20131114/alert/YOUR_SERVICE_API_KEY_HERE/YOUR_ROUTING_KEY_HERE

Example: (Assuming a routing_key value of “app-monitoring”)
*https://alert.victorops.com/integrations/generic/20131114/alert//app-monitoring*

.. image:: /_images/spoc/saas4-1.png
   :alt: saas4

   saas4

No custom headers are required.

Under *Payload* select the *MIME Type* of \_application/\_json.

Paste the following payload into the box in AppDynamics:

#foreach(${eventList} in ${fullEventsByTypeMap.values()})

  #foreach(${event} in ${eventList})

    #if ($event.eventType == “POLICY_OPEN_CRITICAL”)

          #set ( $message_type = “CRITICAL” )

    #elseif ($event.eventType == “POLICY_UPGRADED”)

          #set ( $message_type = “CRITICAL” )

    #elseif ($event.eventType == “ERROR”)

          #set ( $message_type = “CRITICAL” )

    #elseif ($event.eventType == “APPLICATION_ERROR”)

          #set ( $message_type = “CRITICAL” )

    #elseif ($event.eventType == “POLICY_CLOSE_WARNING”)

          #set ( $message_type = “RECOVERY” )

    #elseif ($event.eventType == “POLICY_CLOSE_CRITICAL”)

         #set ( $message_type = “RECOVERY” )

    #elseif ($event.eventType == “POLICY_CANCELED_CRITICAL”)

         #set ( $message_type = “RECOVERY” )

    #else

          #set ( $message_type = “WARNING” )

    #end

{

    “message_type”:“${message_type}”,

    “entity_id”:“${latestEvent.incident.id}”,

    “state_message”:“${event.eventMessage}”,

    “alert_url”:“${event.deepLink}”,

    “ad_event_type”:“${event.eventType}”,

    “monitoring_tool”:“AppDynamics”

}

  #end

#end

Under *Response Handling Criteria* set the *Failure Criteria* status
code to **400** and the *Success Criteria* status code to **200.** 

Make sure to **uncheck** the box for *Expected Payload* for both items.

.. image:: /_images/spoc/saas6.png
   :alt: saas6

   saas6

At the bottom of the page, make any changes to the settings you would
like and then select **Save** and **Test.** 

.. image:: /_images/spoc/saas7.png
   :alt: saas7

   saas7

When testing, add an Event Type Trigger with a count of 1 and hit **Run
Test**.

.. image:: /_images/spoc/saas8.png
   :alt: saas8

   saas8

Check your VictorOps timeline to make sure you get the associated alert.

.. image:: /_images/spoc/saas9.png
   :alt: saas9

   saas9

You can now use the VictorOps HTTP Request Template with any of your
alerts in AppDynamics. If you have any questions please `contact us at
support <https://help.victorops.com/knowledge-base/important-splunk-on-call-support-changes-coming-nov-11th/>`__.

.. |image1/_images/spoc/1-API-Key-1.png
