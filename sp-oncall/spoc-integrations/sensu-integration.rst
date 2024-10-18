.. _sensu-spoc:

Sensu integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Sensu integration for Splunk On-Call.

The Sensu integration uses a dedicated Sensu endpoint key to send alerts into the Splunk On-Call timeline. The following instructions contain the necessary parts and some relevant Sensu docs.


Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise


Splunk On-Call configuration
================================

Go to :guilabel:`Integrations` and select :guilabel:`Sensu`, then select :guilabel:`Enable Integration` to generate the API endpoint URL. Copy the service API endpoint to your clipboard and replace the ``$routing_key`` piece at the
end of the API endpoint with a valid routing key. See :ref:`spoc-routing-keys`.

Edit the Splunk On-Call.json file
====================================

Edit line 18 in the following config file so that it contains the service API endpoint you copied:

.. code-block:: json
   :emphasize-lines: 18

   {
   "handlers": {
      "victorops": {
         "type": "pipe",
      "command": "/etc/sensu/handlers/victorops.rb"
      }
   },
   "checks": {
      "tmp_check": {
         "description": "check that /tmp exists ",
         "handler": "victorops",
         "command": "ls /tmp",
         "interval": 30,
         "subscribers": [ "all_servers" ]
      }
   },
   "victorops" : {
      "api_url": "<integration_service_api_endpoint>",
      "routing_key" : "everyone"
      }
   }

Place the file inside the etc/sensu/conf.d directory.

Download the Splunk On-Call handler to complete the integration.

Splunk On-Call Handler
=============================

.. code-block:: ruby

   #!/usr/bin/env ruby
   #!/usr/bin/env ruby
   # This handler creates and resolves victorops incidents
   #
   # Released under the same terms as Sensu (the MIT license); see LICENSE
   # for details.
   # Downloaded from:
   # https://help.victorops.com/knowledge-base/victorops-sensu-integration/#
   
   require 'rubygems' if RUBY_VERSION < '1.9.0'
   require 'sensu-handler'
   require 'uri'
   require 'net/http'
   require 'net/https'
   require 'json'
   
   class VictorOps < Sensu::Handler
   def handle
      config = settings['victorops']
      incident_key = @event['client']['name'] + '/' + @event['check']['name']
   
      description = @event['check']['notification']
      description ||= [@event['client']['name'], @event['check']['name'], @event['check']['output']].join(' : ')
      host = @event['client']['name']
      entity_id = incident_key
      state_message  = description
      begin
      Timeout.timeout(10) do
   
         case @event['action']
         when 'create'
            case @event['check']['status']
            when 1
            message_type = 'WARNING'
            else
            message_type = 'CRITICAL'
            end
         when 'resolve'
            message_type = 'RECOVERY'
         end
   
         payload = Hash.new
         payload[:message_type] = message_type
         payload[:state_message] = state_message.chomp
         payload[:entity_id] = entity_id
         payload[:host_name] = host
         payload[:monitoring_tool] = 'sensu'
   
         # Add in client data
         payload[:check] = @event['check']
         payload[:client] = @event['client']
   
         uri   = URI("#{config['api_url'].chomp('/')}/#{config['routing_key']}")
         https = Net::HTTP.new(uri.host, uri.port)
   
         https.use_ssl = true
   
         request      = Net::HTTP::Post.new(uri.path)
         request.body = payload.to_json
         response     = https.request(request)
   
         if response.code == '200'
            puts "victorops -- #{@event['action'].capitalize}'d incident -- #{incident_key}"
         else
            puts "victorops -- failed to #{@event['action']} incident -- #{incident_key}"
            puts "victorops -- response: #{response.inspect}"
         end
      end
      rescue Timeout::Error
      puts 'victorops -- timed out while attempting to ' + @event['action'] + ' a incident -- ' + incident_key
      end
   end
   end

For more information, see :new-page:`Sensu documentation on Handlers <https://sensuapp.org/docs/0.29/reference/handlers.html#handler-definition-specification>`.

