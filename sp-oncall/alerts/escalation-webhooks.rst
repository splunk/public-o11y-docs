.. _escalation-webhooks:

************************************************************************
Using webhooks in escalation policies
************************************************************************

.. meta::
   :description: Use webhooks to specify callbacks from Splunk On-Call escalation policies to your applications.

Webhooks are a way to specify callbacks from Splunk On-Call to your own applications, and can be added to your teams' escalation policies in order to receive incident details and process them however
you wish. For more detail about escalation policies, see :ref:`team-escalation-policy`.

Some examples of how these could be used:

-  Automatically bounce a server process when there's an incident related to it.
-  Integrate Splunk On-Call incidents into your own service dashboard.
-  Keep a status page up-to-date with outages

Webhook content type: application/x-www-form-urlencoded

Get started
====================

To get started, from the Splunk On-Call timeline navigate to :guilabel:`Integrations` and
select Webhooks.

.. image:: /_images/spoc/webhooks-2.png
    :width: 100%
    :alt: On the integrations page, select webhooks.


.. image:: /_images/spoc/webhooks-3.png
    :width: 100%
    :alt: On the integrations page, select webhooks.


You are prompted for a Name and URL for the webhook.  Once submitted, an Auth Code will be generated.

Authenticating Webhook Requests
----------------------------------------

When you create a webhook, we generate a secure, random authentication token. POST requests are signed with this key, so you can verify the incoming request, to make sure that it actually came from Splunk On-Call.

In order to authenticate that the POST requests are arriving to your application from Splunk On-Call complete these steps:

1. Create a string with the URL of the webhook, exactly how it appears in Splunk On-Call; this includes trailing slashes.
2. Sort the request's POST variables alphabetically by key.
3. Append each POST variable's key and value to the URL string, with no delimiter.
4. Create a binary hash of the resulting string with MAC-SHA1, using the webhook's authentication key.
5. Base64 encode the binary signature.
6. Compare the output with the key X-VictorOps-Signature in the request - if it matches, the request originated from Splunk On-Call (formerly VictorOps).

--------------

SSL Certificate Chain Verification
-----------------------------------------

If your webhook uses a secure connection (i.e. the URL starts with “https://”), the receiving endpoint must use a valid SSL certificate
signed by a recognized Certificate Authority.

This recommendation was implemented based on :new-page:`SSL Labs Best Practices <https://www.ssllabs.com/projects/best-practices/index.html>`.

Webhook Escalation Steps
----------------------------

When a webhook is part of a team's escalation policy, your service will receive an HTTP POST request when the incident is escalated. The request will contain the following information:

POST Body:

-  Incident: the identifier of the incident in Splunk On-Call.
-  Summary: a short description of the incident.
-  Message: a message about the incident.

HTTP Headers

-  X-Victorops-Signature: a signature based on the auth key of the webhook in Splunk On-Call (formerly VictorOps).

Once there is a webhook, it can be added to an escalation policy.

.. image:: images/Add-execute-webhook-to-ep.png

Difference between Escalation and Custom Outgoing Webhooks
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

More information on Custom Outgoing Webhooks can be found
`HERE <https://help.victorops.com/knowledge-base/custom-outbound-webhooks/>`__.

**Sample Scala Code for Reference**
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

import javax.crypto.Mac import javax.crypto.spec.SecretKeySpec import
javax.xml.bind.DatatypeConverter def generateSignature(key: String, url:
String, postData: Map[String, String]) = { val contents =
postData.toList.sorted.foldLeft(url) { case (s, (key, value)) =>
s”\ :math:`s`\ key$value” } val mac = Mac.getInstance(“HmacSHA1”)
mac.init(new SecretKeySpec(key.getBytes, “HmacSHA1”))
DatatypeConverter.printBase64Binary(mac.doFinal(contents.getBytes(“utf-8”)))
}

--------------
