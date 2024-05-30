.. _elasticsesarch-watcher-spoc:

Elasticsearch Watcher integration for Splunk On-Call
******************************************************

.. meta::
    :description: Configure the Elasticsearch Watcher integration for Splunk On-Call.

Elasticsearch is a distributed, RESTful search and analytics engine capable of solving a growing number of use cases. Watcher is a plugin
for Elasticsearch that provides alerting and notification based on changes in your data. Use the Splunk On-Call and Elasticsearch Watcher integration to alert on cluster and index events. Track network activity, monitor your infrastructure, automate and transform alerts, and communicate internally to quickly remediate any issues.

Use Elasticsearch Watcher and Splunk On-Call to set thresholds, smart alert routing, and escalation policies to notify applicable parties when they need to be notified.

You can do the following with the integration:

-  In the Splunk On-Call timeline, improve system observability by taking advantage of Elasticsearch Watcher log and cluster health monitoring data
-  Automate your alerts by setting thresholds on key metrics and notify applicable on-call incident managers to crucial problems
-  In a single pane of glass, maintain on-call schedules, set up alert routing and escalation policies, aggregate monitoring data, and collaborate with context to quickly resolve incidents

Activate Elasticsearch Watcher in Splunk On-Call
===================================================

#. From the Splunk On-Call, go to :guilabel:`Integrations` then :guilabel:`3rd Party Integrations` then :guilabel:`Elasticsearch Watcher` and select :guilabel:`*Enable Integration`. 
#. Copy the :guilabel:`Service API Key` to use in following steps.

Using Kibana with Elasticsearch
====================================

#. From the Elastic Cloud home page, go to Kibana.

   .. image:: /_images/spoc/Kibana@2x.png
      :alt: using Kibana to visualize elasticsearch

#. Log in to Kibana and go to :guilabel:`Management` then :guilabel:`Watcher` then create a new :guilabel:`Advanced Watch`.
#. Under this watch, configure the action object to look like the following. Replace ``$service_api_key`` and ``$routing_key`` with the values for your organization.

.. code-block::

   "actions": {
    "victorops": {
      "webhook": {
        "scheme": "https",
        "host": "alert.victorops.com",
        "port": 443,
        "method": "post",
        "path": "/integrations/generic/20131114/alert/$service_api_key/$routing_key",
        "params": {},
        "headers": {
          "Content-type": "application/json"
        },
        "body": "{\"message_type\": \"CRITICAL\",\"monitoring_tool\": \"Elastic Watcher\",\"entity_id\": \"{{ctx.id}}\",\"entity_display_name\": \"{{ctx.watch_id}}\",\"state_message\": \"{{ctx.watch_id}}\",\"elastic_watcher_payload\": {{#toJson}}ctx.payload{{/toJson}} }"
      }
    }
  }

Configure Elasticsearch Watcher
===========================================

#. From the command line, verify that Watcher is running on your server:

   .. code:: 
   
      curl -XGET 'http://localhost:9200/_watcher/stats?pretty'

#. You receive a response showing the watcher state is "started":

   .. code-block::

      {
      "watcher_state" : "started",
      "watch_count" : 5,
      "execution_thread_pool" : {
      "queue_size" : 0,
      "max_size" : 10
      },
      "manually_stopped" : false
      }

#. Send a PUT request to the watch API to register a new watch or update an existing watch. Replace the ``$routing_key`` with the routing key you intend to use. For more information on routing keys, see :ref:`spoc-routing-keys`. See :new-page:`Watch API PUT <https://www.elastic.co/guide/en/watcher/current/api-rest.html#api-rest-put-watch>` in Elastic documentation.
   
   
   The following example uses cURL to create a watch that sends an alert to Splunk On-Call every 60 seconds so that you can confirm the integration is working. The actions section of the JSON object configures Watcher to send alerts to Splunk On-Call, the rest of the object is where you configure the conditions that trigger the alerts to be sent. 

   .. code-block:: 

      curl -XPUT 'http://localhost:9200/_watcher/watch/cluster_health_watch' -d '{
      "trigger" : {
      "schedule" : { "interval" : "60s" }
      },
      "input" : {
      "http" : {
      "request" : {
      "host" : "localhost",
      "port" : 9200,
      "path" : "/_cluster/health"
      }
      }
      },
      "condition" : {
      "always" : {}
      },
      "actions" : {
      "victorops" : {
      "webhook" : {
      "scheme" : "https",
      "method" : "POST",
      "host" : "alert.victorops.com",
      "port" : 443,
      "path" : "/integrations/generic/20131114/alert/$service_api_key/$routing_key",
      "body" : "{\"message_type\": \"CRITICAL\",\"monitoring_tool\": \"Elastic Watcher\",\"entity_id\": \"{{ctx.id}}\",\"entity_display_name\": \"{{ctx.watch_id}}\",\"state_message\": \"{{ctx.watch_id}}\",\"elastic_watcher_payload\": {{#toJson}}ctx.payload{{/toJson}} }",
      "headers" : {"Content-type": "application/json"}
      }
      }
      }
      }'

#. Confirm that you see an alert in the Splunk On-Call timeline.
