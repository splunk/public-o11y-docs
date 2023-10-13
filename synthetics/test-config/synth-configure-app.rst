.. _synth-configure-app:

*******************************************************************************
Configure your site to accommodate synthetic tests
*******************************************************************************

.. meta::
    :description: Information about the settings you need to configure for your application or site in order to receive traffic from Splunk Synthetic Monitoring.

There are a couple of configurations you might need to set up for your application or webpage to receive traffic from Splunk Synthetic Monitoring.

Allow Splunk Synthetic Monitoring IP addresses
================================================

Splunk Synthetic Monitoring runs synthetic tests from a set of dedicated IP addresses. To ensure your internal network or web application firewall (WAF) does not block this traffic, place these IP addresses on your browser or site's allow list. 

See :ref:`public-locations` for the list of Splunk Synthetic Monitoring IP addresses, and then refer to your internal network's documentation for instructions on how to add them to your allow list. 

Exclude Splunk Synthetic Monitoring from analytics
===================================================
If you use a web analytics tool to monitor traffic on your website or application, you might want to exclude Splunk Synthetic Monitoring IP addresses from being counted as traffic. 

To do so, filter Splunk Synthetic Monitoring IP addresses in the settings of your web analytics tool. See :ref:`public-locations` for the list of IP addresses, and then refer to your analytics tool's documentation for instructions on how to filter them. 

