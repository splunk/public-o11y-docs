.. _deadman-snitch:

**********************************************************
Dead Man's Snitch integration for Splunk On-Call
**********************************************************

The Dead Man's Snitch integration allows your snitches to automatically trigger incidents within Splunk On-Call.

Enable the integration
======================

#. In Splunk On-Call, select :menuselection:`Integrations` then :menuselection:`Dean Man's Snitch`.
#. Select :menuselection:`Enable` to generate your endpoint destination URL. 
#. Copy the Service API endpoint to your clipboard.

.. image:: /_images/spoc/kb-dms-copy-API-endpoint.png

In Dead Man's Snitch
====================

In Dead Man's Snitch, navigate to the integrations page and select to add VictorOps.

.. image:: /_images/spoc/kb-dms-integrations-add-vo.png

Paste the copied REST Endpoint into the Integration URL. Replace ``$routing_key`` with the desired routing key, then save. For example, assuming a ``$routing_key`` value of “database”:

………36437/**$routing_key**    ==>   ……..36437/**database**

.. image:: /_images/spoc/kb-dms-integration-url.png

You'll be redirected back to the integrations page where your routing
key appears as a Configured Integration. Snitches will now automatically
trigger incidents within On-Call. Test the integration with fake
incidents to make sure it works.

.. image:: /_images/spoc/kb-dms-integration-confirm.png

