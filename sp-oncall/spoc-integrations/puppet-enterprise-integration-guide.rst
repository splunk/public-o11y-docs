.. _puppetenterprise-spoc:

Puppet Enterprise integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Puppet Enterprise integration for Splunk On-Call.

The Splunk On-Call and Puppet Enterprise integration helps you deploy reliable software faster. Puppet Enterprise helps you automate more of the infrastructure management and software delivery lifecycle. Then, you can automatically send alerts into Splunk On-Call so your team can collaborate around actionable alert context. Improve productivity and visibility of your team while enforcing configuration state with the Splunk On-Call and Puppet Enterprise integration.


Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Enterprise

This integration supports Puppet Enterprise 2018.1.1 and higher.


Activate Puppet Enterprise in Splunk On-Call
=================================================

From the Splunk On-Call web portal, select :guilabel:`Settings`, then :guilabel:`Alert Behavior`, then :guilabel:`Integrations`. Find and select the :guilabel:`Puppet Enterprise` integration option.

.. image:: /_images/spoc/voNav@2x.png
   :alt: Find Puppet Enterprise integration in Splunk On-Call

Capture the API Key from the URL String:

.. image:: /_images/spoc/PuppetEnterprise1@2x.png
   :alt: API key for Puppet Enteprise


Configure Puppet Enterprise in Splunk Enterprise
=================================================

Go to :guilabel:`Puppet Enterprise Add-on in Splunk Enterprise`, :guilabel:`Configuration`, :guilabel:`Add-on Setting`, :guilabel:`Input Splunk On-Call Token`.

Creating a Splunk On-Call Incident
----------------------------------------------------

Within Splunk Enterprise, go to the :guilabel:`Alerts` tab and set up the search and type of notification you want to pass to Splunk On-Call. Configure the action using the following values:

-  Message Type : ``CRITICAL``
-  Alert Entity ID: ``certname``
-  State Message: ``result.certname``

You can find the variables you can use in your notifications in :new-page:`Create custom alert actions for Splunk Cloud Platform or Splunk Enterprise <http://docs.splunk.com/Documentation/Splunk/7.1.3/AdvancedDev/ModAlertsLog>`.

.. image:: /_images/spoc/splPupAlert@2x-2.png
   :alt: create an incident Splunk On-Call puppet enterprise variable configuration
