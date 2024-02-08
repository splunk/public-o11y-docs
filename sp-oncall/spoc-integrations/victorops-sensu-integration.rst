Sensu integration for Splunk On-Call
**********************************************************

[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**VictorOps Version Required:** Getting Started, Essentials, or
Full-Stack

[/ht_toggle]

The Sensu integration uses a dedicated Sensu endpoint key to send alerts
into the VictorOps timeline. Below are the necessary parts and some
relevant Sensu docs.

--------------

**In VictorOps**
================

Navigate to your VO instance's Integrations page by
clicking *Integrations*. From the resulting list of integrations, select
the Sensu integration.

From here, click the ‘Enable Integration' button to have a Sensu API
Endpoint generated for you. Copy this Service API Endpoint to your
clipboard, ensuring that your replace the ‘$routing_key' piece at the
end of the API Endpoint to a valid routing_key. Alerts from this
configuration will route through this key. For more information on
routing_keys, please see `this Knowledge Base
article <https://help.victorops.com/knowledge-base/routing-keys/>`__.

--------------

**VictorOps.json**
------------------

Edit *Line 18* in the following config file so that it contains your
Sensu API Endpoint you just copied instead of
“https://alert.victorops.com/integrations/generic/SOMETHIHNG/alert/UUID”
and place it in **/etc/sensu/conf.d** then, download the VictorOps
handler and the integration is complete!

{ “handlers”: { “victorops”: { “type”: “pipe”, “command”:
“/etc/sensu/handlers/victorops.rb” } }, “checks”: { “tmp_check”: {
“description”: “check that /tmp exists”, “handler”: “victorops”,
“command”: “ls /tmp”, “interval”: 30, “subscribers”: [ “all_servers” ] }
}, “victorops” : { “api_url”:
“https://alert.victorops.com/integrations/generic/SOMETHIHNG/alert/UUID”,
“routing_key” : “everyone” } }

--------------

**VictorOps Handler**
---------------------

#!/usr/bin/env ruby #!/usr/bin/env ruby # This handler creates and
resolves victorops incidents # # Released under the same terms as Sensu
(the MIT license); see LICENSE # for details. # Downloaded from: #
https://help.victorops.com/knowledge-base/victorops-sensu-integration/#

require ‘rubygems' if RUBY_VERSION < ‘1.9.0' require ‘sensu-handler'
require ‘uri' require ‘net/http' require ‘net/https' require ‘json'

class VictorOps < Sensu::Handler def handle config =
settings[‘victorops'] incident_key = @event[‘client'][‘name'] + ‘/' +
@event[‘check'][‘name']

description = @event[‘check'][‘notification'] description \||=
[@event[‘client'][‘name'], @event[‘check'][‘name'],
@event[‘check'][‘output']].join(' : ‘) host = @event['client'][‘name']
entity_id = incident_key state_message = description begin
Timeout.timeout(10) do

::

      case @event\['action'\]
      when 'create'
        case @event\['check'\]\['status'\]
        when 1
          message\_type = 'WARNING'
        else
          message\_type = 'CRITICAL'
        end
      when 'resolve'
         message\_type = 'RECOVERY'
      end

      payload = Hash.new
      payload\[:message\_type\] = message\_type
      payload\[:state\_message\] = state\_message.chomp
      payload\[:entity\_id\] = entity\_id
      payload\[:host\_name\] = host
      payload\[:monitoring\_tool\] = 'sensu'

      # Add in client data
      payload\[:check\] = @event\['check'\]
      payload\[:client\] = @event\['client'\]

      uri   = URI("#{config\['api\_url'\].chomp('/')}/#{config\['routing\_key'\]}")
      https = Net::HTTP.new(uri.host, uri.port)

      https.use\_ssl = true

      request      = Net::HTTP::Post.new(uri.path)
      request.body = payload.to\_json
      response     = https.request(request)

      if response.code == '200'
        puts "victorops -- #{@event\['action'\].capitalize}'d incident -- #{incident\_key}"
      else
        puts "victorops -- failed to #{@event\['action'\]} incident -- #{incident\_key}"
        puts "victorops -- response: #{response.inspect}"
      end
    end

rescue Timeout::Error puts ‘victorops – timed out while attempting to' +
@event[‘action'] + ' a incident – ' + incident_key end end end

--------------

**Sensu Documentation**
~~~~~~~~~~~~~~~~~~~~~~~

`Sensu documentation on
Handlers <https://sensuapp.org/docs/0.29/reference/handlers.html#handler-definition-specification>`__
