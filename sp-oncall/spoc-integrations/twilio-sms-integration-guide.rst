Twilio phone integration for Splunk On-Call
**********************************************************

This guide will help you set up your Twilio phone number to allow SMS
messages to create incidents in Splunk On-Call.

In Splunk On-Call
~~~~~~~~~~~~~~~~~

Navigate to the Integrations Tab and under *3rd Party Integrations*
enable the Twilio Integration. Copy the API key to your clipboard for
late.

Next, click on the API tab and make sure the API ID and KEY have been
enabled.

In Twilio
~~~~~~~~~

First, you will need to purchase a Twilio phone number.

Once a number has been purchased in Twilio, the next step is to set up
the SMS function.

Under Functions > Functions (Classic) > List, click “Add a New
Function”. Name the Function Splunk-On-Call-SMS and name the path
SpOC-SMS.

Under Configuration, the Event should be “Incoming Messages” and the
code should be pasted from below:

**NOTE: next to got.post be sure to replace the
{VICTOROPS_TWILIO_SERVICE_API_KEY}/${ROUTING_KEY}** 

const qs = require(‘qs'); const got = require(‘got'); const \_ =
require(‘lodash');

exports.handler = function(context, event, callback) { const
{ROUTING_KEY, VICTOROPS_TWILIO_SERVICE_API_KEY} = context;
console.log(\`${ROUTING_KEY} ${VICTOROPS_TWILIO_SERVICE_API_KEY}\`);

var got = require(‘got');

let twiml = new Twilio.twiml.MessagingResponse(); twiml.message({ to:
event.From }, ‘Incident Created');

var alert = { monitoring_tool: ‘Twilio', message_type: ‘critical',
entity_display_name: \`${event.Body}\`, state_message: \`From
${event.From} – :math:`{event.Body}\`, entity\_id: \``\ {event.From}\`
};

console.log(alert);

got.post(\`https://alert.victorops.com/integrations/generic/20131114/alert/**:math:`{VICTOROPS\_TWILIO\_SERVICE\_API\_KEY}/`\ {ROUTING_KEY}**\ \`,
{ body: alert, headers: { ‘accept': ‘application/json', ‘Content-Type':
‘application/json' }, json: true }).then(function(response) {
console.log(response.body); callback(null, twiml);

}).catch(function(error) { console.log(error); callback(error); }); };

Save the Function.

Next, under Functions > Functions (Classic) > Configure check the box to
Enable ACCOUNT_SID and AUTH_TOKEN. Then set up the Environment Variable
and Dependencies.

**NOTE: if you already have Live Call Routing set up with Environment
Variables and Dependencies skip this step and keep your current
configuration.** 

Environment Variables:

.. raw:: html

   <table style="height: 96px;" width="605">

.. raw:: html

   <tbody>

.. raw:: html

   <tr>

.. raw:: html

   <td style="width: 345px;">

VICTOROPS_API_ID

.. raw:: html

   </td>

.. raw:: html

   <td style="width: 244px;">

\*******\*

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr>

.. raw:: html

   <td style="width: 345px;">

VICTOROPS_API_KEY

.. raw:: html

   </td>

.. raw:: html

   <td style="width: 244px;">

\********\*

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr>

.. raw:: html

   <td style="width: 345px;">

VICTOROPS_TWILIO_SERVICE_API_KEY

.. raw:: html

   </td>

.. raw:: html

   <td style="width: 244px;">

\***************\*

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   </tbody>

.. raw:: html

   </table>

Dependencies:

.. raw:: html

   <table id="tablepress-16-no-2" class="tablepress tablepress-id-16" style="height: 192px;" width="389">

.. raw:: html

   <tbody>

.. raw:: html

   <tr class="row-1">

.. raw:: html

   <td class="column-1" style="width: 140px;">

xmldom

.. raw:: html

   </td>

.. raw:: html

   <td class="column-2" style="width: 233px;">

0.1.27

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr class="row-2">

.. raw:: html

   <td class="column-1" style="width: 140px;">

lodash

.. raw:: html

   </td>

.. raw:: html

   <td class="column-2" style="width: 233px;">

4.17.10

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr class="row-3">

.. raw:: html

   <td class="column-1" style="width: 140px;">

fs

.. raw:: html

   </td>

.. raw:: html

   <td class="column-2" style="width: 233px;">

0.0.1-security

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr class="row-4">

.. raw:: html

   <td class="column-1" style="width: 140px;">

twilio

.. raw:: html

   </td>

.. raw:: html

   <td class="column-2" style="width: 233px;">

3.6.3

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr class="row-5">

.. raw:: html

   <td class="column-1" style="width: 140px;">

got

.. raw:: html

   </td>

.. raw:: html

   <td class="column-2" style="width: 233px;">

9.6.0

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr class="row-6">

.. raw:: html

   <td class="column-1" style="width: 140px;">

util

.. raw:: html

   </td>

.. raw:: html

   <td class="column-2" style="width: 233px;">

0.11.0

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   </tbody>

.. raw:: html

   </table>

Save the configuration.

Next, set up your phone number to be able to receive SMS messages. Under
Messages, under *Configure with* select “Webhooks, TwiML, …”, under *A
message comes in* select “Function”, under *Service* select”default”,
and under *Function Path* select “/SpOC-SMS”.

Save the properties.

Test by sending an SMS to your Twilio phone number. Make sure whoever
might get paged for the test is aware they will receive a test Splunk
On-Call incident.
