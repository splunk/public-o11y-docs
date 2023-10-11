The Splunk On-Call and `Big Panda <https://www.bigpanda.io/>`__
integration allows you to surface incidents from your Big Panda account
in Splunk On-Call.

[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

-  Any level Splunk On-Call Account and Global or Alert Admin
   permissions
-  Ability to create Big Panda Notification Webhooks

[/ht_toggle]

In Splunk On-Call
-----------------

To start, navigate to the integrations tab in On-Call and select the Big
Panda Integration. Next click “Enable Integration” and a new REST
endpoint will be generated for your org.

In Big Panda
------------

Follow this guide to create a notification webhook for the alert you’d
like to send to On-Call in Big Panda:
https://docs.bigpanda.io/reference/webhook

When you get to the point where you need to put in an endpoint that Big
Panda will send the payload to, put in the endpoint from the On-Call Big
Panda integration page with your desired routing_key filled in.

Once this is saved you should now receive incidents in On-Call from the
webhook notification that was just configured in Big Panda!
