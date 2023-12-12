.. _migrate-apm-custom-reporting: 

Migrate APM custom reporting to OpenTelemetry Java Agent 2.0
*************************************************************************

.. meta:: 
   :description: Steps to migrate your APM custom reporting to support update to version 2.0 of Splunk OpenTelemetry Java agent.

Version 2.0 of the Splunk Distribution of OpenTelemetry Java agent includes breaking changes to HTTP semantic conventions. While the release of version 2.0 is to be determined, you can migrate to affected attributes in advance of updating so you can ensure your Splunk APM experience is minimally affected.

If you continue to use deprecated OTel attributes, the following aspects of custom reporting in APM are affected by updating to version 2.0 of the Splunk Distribution of OpenTelemetry Java agent:

* Tag Spotlight
* Custom charts and dashboards that you created
* Detectors

.. _http-semantic-convention-changes:

HTTP semantic convention changes
===================================

The following table covers the current HTTP OpenTelemetry (OTel) attributes that changed from version 1.0 to version 2.0 in the Splunk Distribution of OpenTelemetry Java agent.

.. note::
   Until the release of version 2.0 of the OpenTelemetry Java agent, this list is subject to change.

.. list-table:: 
   :header-rows: 1

   * - Version 1.0 OTel attribute
     - Version 2.0 OTel attribute
     - Why the change
   * - ``http.method``
     - ``http.request.method``
     - Updated for consistent namespacing.
   * - ``http.status_code``
     - ``http.response.status_code``
     - Updated for consistent namespacing.
   * - ``http.request_content_length``
     - ``http.request.body.size``
     - Updated for consistent namespacing.
   * - ``http.response_content_length``
     - ``http.response.body.size``
     - Updated for consistent namespacing.
   * - ``http.url``
     - ``url.full``
     - Updated to avoid separate fields for various URL types and simplify telemetry correlation across different URL types like \ftp://, \ssh://, \file://, \data://, and so on.
   * - ``http.target``
     - ``url.path`` and ``url.query``
     - Updated to avoid separate fields for various URL types and simplify telemetry correlation across different URL types like \ftp://, \ssh://, \file://, \data://, and so on.
   * - ``http.scheme``
     - ``url.scheme``
     - Updated to avoid separate fields for various URL types and simplify telemetry correlation across different URL types like \ftp://, \ssh://, \file://, \data://, and so on.
   * - ``http.client_ip``
     - ``client.address``
     - Updated to reflect the latest attribute definition.

Assess if you're affected by updating
=========================================

To determine if your APM experience is affected by the update, check whether you are indexing the affected OTel attributes as custom tags in Splunk APM:

.. note:: 
   The HTTP method attribute is stored as a system tag by default in Splunk Observability Cloud. You don't need to index the HTTP method attribute to use it as a Troubleshooting MetricSet (TMS) or Monitoring MetricSet (MMS).

#. Go to :guilabel:`Settings`, then :guilabel:`APM MetricSets`. You must have the admin role to access APM MetricSets. 
#. Cross-reference the tags indexed in the APM MetricSets list with the list of new OTel attributes. See :ref:`http-semantic-convention-changes`.
    #. If 1 or more affected tags are listed on the APM MetricSets page, determine if each tag is indexed as only a Troubleshooting MetricSet (TMS) or as a Monitoring MetricSet (MMS) as well. Then, see the :ref:`migration-steps` section for more information.
    #. If you are not indexing any of the affected tags, you do not need to take action to migrate tags. Ensure you use the new HTTP conventions going forward. 

.. _migration-steps: 

Migration steps
===================

If you determine that you need to migrate, follow these steps:

#. :ref:`time-your-update`
#. :ref:`Index the new attributes as tags to generate Troubleshooting Metric Sets (TMS) or Monitoring Metric Sets (MMS).<index-new-attributes>`
#. :ref:`Update your charts and dashboards to use the new indexed tags.<update-charts-dashboards>`
#. :ref:`Update your APM detectors to use the new indexed tags.<update-detectors>`
#. :ref:`(Optional) Delete MetricSets that use the deprecated attributes as tags.<delete-old-tags>`

.. _time-your-update: 

Time your update
-----------------------

As of August 7, 2023, Splunk APM began populating the new attributes of raw trace data. However, TMS and MMS for these new attributes have not been created. you need to create TMS and MMS in order to receive any data. To prepare for the update you need to index the new attributes as tags so custom TMS and MMS begin receiving data for reporting. For TMS, which are used in Tag Spotlight, plan to index the new data at least 8 days in advance of the update. For MMS, which are used in dashboard charts and detectors, you'll need to update the SignalFlow for charts and dashboards to filter for both the old and new tags to prevent gaps in data. 

.. _index-new-attributes: 

Index the new attributes as tags to generate Troubleshooting Metric Sets (TMS) or Monitoring Metric Sets (MMS)
----------------------------------------------------------------------------------------------------------------

.. note:: 
   The HTTP method attribute is stored as a system tag by default in Splunk Observability Cloud. You don't need to index the HTTP method attribute to use it as a Troubleshooting MetricSet (TMS) or Monitoring MetricSet (MMS).

For each affected tag you are indexing, generate its new corresponding tag as an APM MetricSet.

#. Go to :guilabel:`Settings`, then :guilabel:`APM MetricSets`. You must have the admin role to access APM MetricSets. 
#. Create a new APM MetricSet using the OTel attribute as a tag and set it as a TMS. See :ref:`apm-index-span-tags` for steps to generate TMS. 
#. If the old tag was also used as an MMS, configure the new tag as an MMS. See :ref:`cmms` for steps to generate MMS.
#. Use the new tag name going forward. See :ref:`update-charts-dashboards` and :ref:`update-detectors`.

.. _update-charts-dashboards: 

Update your charts and dashboards to use the new indexed tags
-----------------------------------------------------------------

To update charts or dashboards that reference the deprecated attributes as tags, follow these steps.

#. For each affected chart, select :guilabel:`Chart actions`, then :guilabel:`Open`.
#. Go to the plot builder and edit the filter to change the reference to both the new tag names. Or, if you need to see data from the old tags, select :guilabel:`View SignalFlow` to edit the ``filter()`` function to reference both the old and the new tags.

Example SignalFlow that uses both old and new tags:

.. code:: 

   A = data('service.request.count', filter=filter('sf_dimensionalized', 'true') and filter('sf_service', 'adservice') and (filter('http_response_status_code', '200') or filter('http_status_code', '200')) and filter('sf_error', 'false')).publish(label='A')

.. _update-detectors: 

Update your detectors to use the new indexed tags
-------------------------------------------------------

To update your detectors, follow these steps.

#. Go to :guilabel:`Alerts & Detectors`, then :guilabel:`Detectors`.
#. For each affected detector, select the detector, then select :guilabel:`Signals`.
#. Change the filter to reference the new tag names. Or, if you need to use data from the old tags in your detectors, change the reference in the SignalFlow to both the old and the new tags. 

Example SignalFlow that uses both old and new tags:

.. code:: 

   A = data('service.request.count', filter=filter('sf_dimensionalized', 'true') and filter('sf_service', 'adservice') and (filter('http_response_status_code', '200') or filter('http_status_code', '200')) and filter('sf_error', 'false')).publish(label='A')

.. _delete-old-tags: 

(Optional) Delete MetricSets that use the deprecated attributes as tags
----------------------------------------------------------------------------

After you have updated your charts, dashboards, and detectors to use the new attributes and have confirmed that all are working as expected and have determined that you no longer need to reference or use any data from the deprecated tags, you can delete the tags that use the deprecated attributes. Deleting the tags that use the deprecated attributes reduces your organization's cardinality and also reduces potential user confusion.

If, however, you need historical data, you can choose to maintain MetricSets that reference the deprecated attributes until your new tags populate with the data your organization needs.

#. Go to :guilabel:`Settings`, then :guilabel:`APM MetricSets`. You must have the admin role to access APM MetricSets. 
#. Select :guilabel:`Delete the MetricSet configuration` (trash can icon) to delete the tag and the corresponding MetricSets.

After you delete the MetricSets that use the old attributes, use only the new tags for future reporting.