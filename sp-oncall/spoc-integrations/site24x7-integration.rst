.. _site247-spoc:

Site 24x7 integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Site 24x7 integration for Splunk On-Call.

Site 24x7 allows you to monitor websites remotely and receive alerts if your website becomes unavailable. This integration uses a Site 24x7 Third-Party Integration and the Splunk On-Call Site24x7 Integration endpoint.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Enterprise


Splunk On-Call configuration
====================================

Retrieve your Site 24x7 endpoint URL from :guilabel:`Integrations`, :guilabel:`Site 24/7`.

.. image:: /_images/spoc/site-247.png
   :alt: Site 24x7 integrationº

Select the Site 24x7 icon, activate the integration, then copy the URL to your clipboard.

.. image:: /_images/spoc/Site24x7-2@2x.png
   :alt: Copy URL from integration

Remember to replace the ``$routing_key`` with the Splunk On-Call routing key you want to use. See :ref:`spoc-routing-keys`.


Site 24x7 configuration
====================================

From the 24x7 portal, select :guilabel:`Admin`, :guilabel:`Third-Party Integration`, :guilabel:`Actions`, :guilabel:`Webhooks`.

.. image:: /_images/spoc/Nav@2x.png
   :alt: Webhooks configuration screen

In the Webhooks configuration screen, fill in the values as follows and then click :guilabel:`Save`.


.. list-table::
    :widths: 50 50
    :width: 100%
    :header-rows: 1

    * - Field name
      - Value

    * - Integration name 
      - ``victorops``
    * - Hook URL
      - ``<url_from_victorops_account>``
    * - HTTP Method
      - ``POST``
    * - Post as JSON
      - ``true``
    * - Send Incident Parameters
      - ``true``
    * - Send Custom Parameters
      - ``true``
    * - Custom parameters
      - 
          .. code-block::
            
             {
                 "message_type": "critical",
                 "monitoring_tool": "Site24x7",
                 "state_message": "$INCIDENT_REASON",
                 "entity_display_name": "$INCIDENT_REASON",       "entity_id":"$MONITORNAME"
              }
    * - Integration level
      - All Monitors

.. image:: /_images/spoc/site24x7-2.png

Auto Resolve Configuration
--------------------------

You need a rules engine rule for site 24x7 incidents to resolve in Splunk On-Call when the monitor status is ``UP``. The rule is configured to state:

``When status matches UP using wildcard, set message_type to RECOVERY``

.. image:: /_images/spoc/Alert_Rules_Engine-votest-manoj.png

Notify Splunk On-Call only on select monitors
---------------------------------------------

To only notify Splunk On-Call on select monitors, change the Integration from :guilabel:`All Monitors` to :guilabel:`Monitors`.
