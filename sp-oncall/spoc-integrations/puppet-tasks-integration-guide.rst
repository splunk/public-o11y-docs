.. _puppettasks-spoc:

Puppet Tasks integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Puppet Tasks integration for Splunk On-Call.

The Splunk On-Call and Puppet Tasks integration allows teams to identify and quickly take action around infrastructure
incidents. Send alerts into Splunk On-Call so teams can collaborate around the fix for the incident, then use Puppet Tasks to run actions that help resolve problems within your remote infrastructure. DevOps and IT teams can maintain a speedy software development and CI/CD pipeline while continuing to drive reliability with the Splunk On-Call and Puppet Tasks integration.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Enterprise

The integration supports Puppet Enterprise 2018.1.1 and higher.

Activate Puppet Tasks in Splunk On-Call
======================================================

From the Splunk On-Call web portal, select :guilabel:`Settings`, :guilabel:`Alert Behavior`, :guilabel:`Integrations`. Find and select :guilabel:`Puppet Tasks`.

.. image:: /_images/spoc/voNav@2x.png
   :alt: Activate puppet tasks integration

Capture the API Key from the URL String:

.. image:: /_images/spoc/voPuppet@2x.png
   :alt: Capture Puppet Tasks api key

Configure Puppet Tasks in Splunk Enterprise
======================================================

Go to :guilabel:`Puppet Tasks for Actionable Alerts in Splunk Enterprise`, :guilabel:`Configuration`, :guilabel:`Add-on Setting`, and enter your Splunk On-Call Token.

.. image:: /_images/spoc/splPupNav@2x.png
   :alt: Configure Puppet Tasks in Splunk Enterprise

Create a Splunk On-Call incident
======================================================

Within Splunk Enterprise, go to the :guilabel:`Alerts` tab, set up a search for a critical event, and specify the type of notification you would like to pass to Splunk On-Call. Configure the action using the following values:

-  Severity: ``CRITICAL``
-  Host: ``certname``

   .. image:: /_images/spoc/splPupAlert@2x.png
      :alt: Trigger alert in Splunk On-Call

Upon triggering this alert, you should see a corresponding alert in your Splunk On-Call timeline.

.. image:: /_images/spoc/voAlert@2x.png
   :alt: Puppet Tasks Alert in Splunk On-Call
