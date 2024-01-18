
.. _user-role:

************************************************************************
IP address and egress filtering
************************************************************************

.. meta::
   :description: About the user roll in Splunk On-Call.



Security
============

Security is a big concern with many of our customers and has led some to introduce egress filtering at their firewalls. This type of filtering controls outgoing connections from the customer network to ensure that their systems can only talk to approved destinations.

We use CloudFlare for DDoS mitigation, application firewalling and attack detection, so customers connecting to the Splunk On-Call platform are actually connecting to a Cloudflare proxy server. This means that customer egress filters must allow connections to all of Cloudflare's IP ranges in addition to Splunk On-Call's ranges. Egress IP ranges are listed at :new-page:`https://www.cloudflare.com/ips <https://www.cloudflare.com/ips/>`.

Future platform enhancements on our roadmap will mean that public IP addresses for the Splunk On-Call platform will see additions, deletions and changes over time. Therefore we have some suggestions for working with Splunk On-Call:

Awareness
=============

Splunk On-Call does not represent that our current public IP addressing is immutable or guaranteed not to change. Our public IP addresses may change at any time due to architecture changes, new features and
enhancements, and failover events. Customers connecting to Splunk On-Call should therefore always use DNS hostnames rather than hardcoded IP addresses to make connections.

Egress Strategy
===================

If egress filtering is a must, consider carving out an exception for servers that must communicate with Splunk On-Call. For most customers, this amounts to one or two monitoring servers. If such servers are
allowed to make port 443 connections to any destination, it should alleviate any issues. Strict certificate checking will ensure that your server is not connecting to an unknown entity.

Ingress Strategy
====================

In the event you have firewalls that block Splunk On-Call webhooks, you can allowlist our IP address 34.208.78.175. 

.. note:: Our IP address is subject to change.
