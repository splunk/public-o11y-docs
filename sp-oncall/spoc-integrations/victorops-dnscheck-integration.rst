[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported: N/A (SaaS)**

**Splunk On-Call Version Required: Starter, Growth,** or **Enterprise**

[/ht_toggle]

DNS Check enables you to easily monitor, share and troubleshoot DNS
records. The DNSCheck.co integration can create and resolve incidents in
Splunk On-Call (formerly VictorOps) based on the results of DNS record
checks, giving DNS Check users greater visibility and awareness of DNS
related issues so they can resolve problems faster.

Incidents will be created automatically based on the alerting
configuration in DNS Check. Issues resolved in Splunk On-Call will be
automatically resolved in DNS Check.

--------------

**In Splunk On-Call:**
======================

Click on **Integrations** *>>* **DNSCheck** 

Within the DNSCheck integration page, click “Enable Integration”.

..image:: /_images/spoc/Integration-DNS-Enable-final.png

This will generate the API Key you will need to provide in DNS Check.  

Copy the API Key.

--------------

In DNS Check:
=============

Click the User icon in the top-right corner >> *Notification Options*

|dsn3|\ Enable VictorOps notifications (ON) >> Insert the Splunk On-Call
API Key (copied from Splunk On-Call Integration Settings in the step
above) >> Include a routing key if desired (*dnscheck* will be the
default) >> *Save*

.. image:: /_images/spoc/DSN4.png
   :alt: dsn4

   dsn4

If a routing key is desired, they may be found in the Splunk On-Call
portal by going to *Settings* >> *Routing Keys*

For more information on routing incidents in Splunk On-Call, see
`these <https://help.victorops.com/article-categories/alert-behavior-alert-behavior/>`__
articles.

.. |dsn3| image:: /_images/spoc/DSN3.png
