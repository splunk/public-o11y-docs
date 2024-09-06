.. _AppDynamics-spoc:

AppDynamics integration for Splunk On-Call
**********************************************************

.. meta::
    :description: Configure the AppDynamics integration for Splunk On-Call.

Use the AppDynamics integration with Splunk On-Call to utilize Splunk On-Call as an alerting extension within AppDynamics. The alerting extension enables AppDynamics to post events and custom alerts to the Splunk On-Call timeline. The payload of the alert includes information related to the alert including a link to AppDynamics for a thorough diagnosis of the event.

Requirements
==================

* AppDynamics versions supported: On Premise and SaaS versions
* Splunk On-Call version required: Starter, Growth, or Enterprise

Enable the integration in Splunk On-Call
=================================================

1. Go to :guilabel:`Integrations` then :guilabel:`AppDynamics`.
2. Select :guilabel:`Enable Integration`. 
3. Copy the :guilabel:`Service API Key` to your clipboard.

.. image:: /_images/spoc/1-API-Key.png
   :alt: AppDynamics in Splunk On-Call integrations 
   :width: 95%

Configure the AppDynamics On Premise version
=================================================

1. Download the VictorOps Alerting Extension zip from the AppDynamics Exchange: :new-page:`http://community.appdynamics.com/t5/AppDynamics-eXchange/idb-p/extensions`.
2. Unzip the victorops-alert.zip file into <CONTROLLER_HOME_DIR>/custom/actions/. Unzipping creates the following directory: <CONTROLLER_HOME_DIR>/custom/actions/victorops-alert.
3. Add the following XML to the custom actions element in the custom.xml file in the <CONTROLLER_HOME_DIR>/custom/actions/ directory:

   .. code-block:: xml

      <custom-actions>
         victorops-alert
      <!-- For Linux/Unix *.sh -->
         victorops-alert.sh
      <!-- For windows *.bat -->
         <!--<executable>victorops-alert.bat</executable>-->
      </custom-actions>

   If the custom.xml file doesn't exist in the <CONTROLLER_HOME_DIR>/custom/actions/ directory create one with the following XML:

   .. code-block:: xml

      <custom-actions>
         victorops-alert
      <!-- For Linux/Unix *.sh -->
         victorops-alert.sh
      <!-- For windows *.bat -->
         <!--victorops-alert.bat -->
      </custom-actions>

4. Update the config.yaml file in <CONTROLLER_HOME_DIR>/custom/actions/victorops-alert with your API key, routing key, protocol, and Splunk On-Call host.

   .. code-block:: yaml
      
      #VictorOps Org Key 
      voOrganizationKey: "<YOUR_SERVICE_API_KEY>"

      #VictorOps Routing Key 
      voRoutingKey: "<YOUR_ROUTING_KEY>"

      #scheme used (http/https) 
      protocol: "https"

      #VictorOps host 
      voAlertHost: "<alert.victorops.com>"

      #VictorOps url path 
      voAlertUrlPath: "</integrations/generic/20131114/alert>"

      #http timeouts 
      connectTimeout: 10000 
      socketTimeout: 10000

      #control level of details in VO alert 
      showDetails: false

5. To create a custom action, first refer to the following topics in the AppDynamics docs:

   * :new-page:`http://docs.appdynamics.com/display/PRO14S/Custom+Actions`
   * :new-page:`http://docs.appdynamics.com/display/PRO14S/Build+an+Alerting+Extension`

   To use this extension as a custom action:
   
   #. In AppDynamics, go to :guilabel:`Alert & Respond` then :guilabel:`Actions`. 
   #. Select :guilabel:`Create Action`. 
   #. Select :guilabel:`Custom Action` then :guilabel:`OK`. 
   #. In the drop-down menu, you can find the action called victorops-alert.

Configure the AppDynamics SaaS version
==========================================

1. In AppDynamics, select :guilabel:`Alert & Respond` then :guilabel:`HTTP Request Templates` then :guilabel:`New`.

   .. image:: /_images/spoc/AppDynamics-1@2x.png
      :alt: Create a new HTTP request template in AppDynamics
      :width: 95%

2. Give the Template a name. For example, Splunk On-Call Test.

3. Set a custom templating variable with a field name of message_type and a value of WARNING.

4. Under :guilabel:`Request URL` set the Method to POST.

5. Enter your :guilabel:`Raw URL` field. Use the following format: 
   
   ``https://alert.victorops.com/integrations/generic/20131114/alert/<YOUR_SERVICE_API_KEY>/<YOUR_ROUTING_KEY>``

   .. image:: /_images/spoc/AppDynamics-2@2x.png
      :alt: Configure your new HTTP request template in AppDynamics
      :width: 95%

6. No custom headers are required.

7. Under :guilabel:`Payload`, select the MIME Type of ``application/json`` and paste the following payload. This payload includes the default AppDynamics alert payload which is commented out and allows only the JSON that is required for successful ingestion to Splunk On-Call:

   .. code-block:: 

      #foreach(${eventList} in ${fullEventsByTypeMap.values()})

         #foreach(${event} in ${eventList})

            #if ($event.eventType == "POLICY_OPEN_CRITICAL")

                  #set ( $message_type = "CRITICAL" )

            #elseif ($event.eventType == "POLICY_UPGRADED")

                  #set ( $message_type = "CRITICAL" )

            #elseif ($event.eventType == "ERROR")

                  #set ( $message_type = "CRITICAL" )

            #elseif ($event.eventType == "APPLICATION_ERROR")

                  #set ( $message_type = "CRITICAL" )

            #elseif ($event.eventType == "POLICY_CLOSE_WARNING")

                  #set ( $message_type = "RECOVERY" )

            #elseif ($event.eventType == "POLICY_CLOSE_CRITICAL")

                  #set ( $message_type = "RECOVERY" )

            #elseif ($event.eventType == "POLICY_CANCELED_CRITICAL")

                  #set ( $message_type = "RECOVERY" )

            #else

                  #set ( $message_type = "WARNING" )

            #end

         {

            "message_type":"${message_type}",

            #latestEvent.incident.id is the AppDynamics incident ID for the health rule. 1 incident can include multiple events.
            "entity_id":"${latestEvent.incident.id}",
            
            #latestEvent.id is the AppDynamics event ID for the triggering HTTP action.
            "event_id":"${latestEvent.id}",

            "state_message":"${event.eventMessage}",

            "alert_url":"${event.deepLink}",

            "ad_event_type":"${event.eventType}",

            "monitoring_tool":"AppDynamics"

         }

         #end

      #end


8. Under :guilabel:`Response Handling Criteria` set the :guilabel:`Failure Criteria` status code to 400 and the :guilabel:`Success Criteria` status code to 200.

9. Uncheck :guilabel:`Expected Payload` for both failure and success criteria.

.. image:: /_images/spoc/saas6.png
   :alt: Configure response handling criteria in AppDynamics
   :width: 95%

10. At the bottom of the page, make your changes to the settings and then select :guilabel:`Save` and `Test`.

.. image:: /_images/spoc/saas7.png
   :alt: Configure settings of your HTTP request template in AppDynamics
   :width: 95%

11. To test, add an Event Type Trigger with a count of 1 and select :guilabel:`Run Test`.

.. image:: /_images/spoc/saas8.png
   :alt: Test your HTTP request template in AppDynamics
   :width: 75%

12. Check your Splunk On-Call timeline for your associated alert.

.. image:: /_images/spoc/saas9.png
   :alt: AppDynamics alert in Splunk On-Call
   :width: 75%

You can now use the Splunk On-Call HTTP Request Template with any of your alerts in AppDynamics. 
