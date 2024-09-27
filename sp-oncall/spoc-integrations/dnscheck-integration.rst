.. _dnscheck-spoc:

DNSCheck integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the DNSCheck integration for Splunk On-Call.

DNS Check allows you to easily monitor, share and troubleshoot DNS records. The DNSCheck.co integration can create and resolve incidents in Splunk On-Call (formerly VictorOps) based on the results of DNS record checks, giving DNS Check users greater visibility and awareness of DNS related issues so they can resolve problems faster.

Incidents are created automatically based on the alerting configuration in DNS Check. Issues resolved in Splunk On-Call are automatically resolved in DNS Check.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

Splunk On-Call configuration
====================================

Select :guilabel:`Integrations`, :guilabel:`DNSCheck`.

Within the DNSCheck integration page, select :guilabel:`Enable Integration`.

.. image:: /_images/spoc/Integration-DNS-Enable-final.png
   :alt: Activate integration

This generates the API Key you need to provide in DNS Check. Copy the API Key.

DNS Check configuration
====================================

Select the user icon in :guilabel:`Notification Options`.

|dsn3|

Next, activate Splunk On-Call notifications and insert the Splunk On-Call
API Key copied from Splunk On-Call Integration Settings in the previous section.

nclude a routing key if desired and save.

.. image:: /_images/spoc/DSN4.png
   :alt: Save configuration

To add a routing key, see :ref:`spoc-routing-keys`.

.. |dsn3| image:: /_images/spoc/DSN3.png
