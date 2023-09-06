.. _migrate-apm-custom-reporting: 

Migrate APM custom reporting to OpenTelemetry Java Agent 2.0
*****************************************************************

.. meta:: 
   :description: Steps to migrate your APM custom reporting to support upgrade to version 2.0 of Splunk OpenTelemetry Java agent.

Version 2.0 of the agent from the Splunk Distribution of OpenTelemetry Java includes breaking changes to HTTP semantic conventions. While the release of version 2.0 is still to be determined, this guide provides you with the migration information you need to migrate well in advance of upgrading so you can ensure your Splunk APM experience is unaffected. If you plan to upgrade to version 2.0, consider these breaking changes.

.. _http-semantic-convention-changes:

HTTP semantic convention changes
===================================

The following table covers the HTTP attributes that changed from version 1.0 to version 2.0 in the agent of the Splunk Distribution of OpenTelemetry Java.

.. list-table:: 
   :header-rows: 1

   * - Version 1.0 attribute
     - Version 2.0 attribute
     - Why the change
   * - ``http.method``
     - ``http.request.method``
     - Consistent namespacing.
   * - ``http.status_code``
     - ``http.response.status_code``
     - Consistent namespacing.
   * - ``http.request_content_length``
     - ``http.request.body.size``
     - Consistent namespacing.
   * - ``http.response_content_length``
     - ``http.response.body.size``
     - Consistent namespacing.
   * - ``http.url``
     - ``url.full``
     - Avoids separate fields for various URL types and simplifies telemetry correlation across different URL types for example, \ftp://, \ssh://, \file://, \data://, and so on.
   * - ``http.target``
     - ``url.path`` and ``url.query``
     - Avoids separate fields for various URL types and simplifies telemetry correlation across different URL types for example, \ftp://, \ssh://, \file://, \data://, and so on.
   * - ``http.scheme``
     - ``url.scheme``
     - Avoids separate fields for various URL types and simplifies telemetry correlation across different URL types for example, \ftp://, \ssh://, \file://, \data://, and so on.
   * - ``http.client_ip``
     - ``http.forwarded.for``
     - 

How to determine if your Splunk APM experience might be affected
===================================================================

There are several aspects of custom reporting in APM that will be affected if you use the deprecated tags. Custom reporting in APM includes the following:

* Tag Spotlight
* Custom charts and dashboards, that is, charts and dashboards you create. Built-in APM dashboards are unaffected.
* Detectors 

If you use any of the deprecated tags in custom reporting in APM and want to ensure your custom reporting is unaffected, follow the migration steps before upgrading to version 2.0 of the agent of the Splunk Distribution of OpenTelemetry Java. 

Assess if you will be affected by upgrading
----------------------------------------------

To determine if your APM experience will be affected by upgrading, follow these steps.

Start by determining if you are indexing the affected tags as custom tags in Splunk APM.

#. Go to :guilabel:`Settings` then :guilabel:`APM MetricSets`. You must have the admin role to access APM MetricSets. 
#. Cross-reference the list of new tags with the tags indexed in the APM MetricSets list. See :ref:`http-semantic-convention-changes`.
    #. If 1 or more affected tags are listed on APM MetricSets page, determine if each tag is indexed as just a Troubleshooting MetricSet (TMS) or as a Monitoring MetricSet (MMS) as well.
    #. If you are not indexing any of the affected tags, no migration action is needed. But do make a note to use new HTTP conventions going forward. 

Time your upgrade
========================

As of August 7, 2023, Splunk APM began populating the new attributes with data. Depending on your historical reporting needs, choose a date to upgrade that is right for your organization. You can follow the migration steps before or after upgrading, but the old tags will no longer receive new data after you upgrade.

Migration steps
===================

#. :ref:`Index the new attributes as tags to generate Troubleshooting Metric Sets (TMS) or Monitoring Metric Sets (MMS).<index-new-attributes>`
#. :ref:`Update your charts and dashboards that used the deprecated tags to use the new indexed tags.<update-charts-dashboards>`
#. :ref:`Update your APM detectors to use the new indexed tags.<update-detectors>`
#. :ref:`(Optional) Delete the old tags.<delete-old-tags>`
#. :ref:`Only use the new tags for future reporting.<new-tags-reporting>`

.. _index-new-attributes: 

Index the new attributes as tags to generate Troubleshooting Metric Sets (TMS) or Monitoring Metric Sets (MMS)
----------------------------------------------------------------------------------------------------------------

For each affected tag you are indexing, generate its new corresponding tag as an APM MetricSet.

#. Create a new APM MetricSet using the new tag name, set as a TMS. 
#. If the old tag was also used as an MMS, configure the new tag as an MMS. 
#. Use new tag name going forward. See :ref:`update-charts-dashboards` and :ref:`update-detectors`.

See :ref:`apm-index-span-tags` for steps to generate TMS. See :ref:`cmms` for steps to generate MMS.

.. _update-charts-dashboards: 

Update your charts and dashboards to use the new indexed tags
-----------------------------------------------------------------

To update charts or dashboards that reference old tags, follow these steps.

#.  For each affected chart, select :guilabel:`Chart actions` then :guilabel:`open`.
#. Go to plot builder, edit the filter to change references from the old tag to the new tag. Or, select :guilabel:`View SignalFlow` to edit the `filter()` function to reference the new tag.

See :ref:`dashboard-create-customize` and :ref:`create-charts`.

.. _update-detectors: 

Update your APM detectors to use the new indexed tags
-------------------------------------------------------

To update your APM detectors follow these steps.

#. Go to :guilabel:`Alerts & Detectors` then :guilabel:`Detectors`.
#. For each affected detector, select the detector then select :guilabel:`Signals`.
#. Change the filter to reference the new tag name.

See :ref:`apm-alerts` for steps to create an APM detector. 

.. _delete-old-tags: 

Delete MetricSets that use the old tags
----------------------------------------

After you have updated your charts, dashboards, and detectors to use the new tags and have confirmed that all are working as expected, delete the old tags.

#. Go to :guilabel:`Settings` then :guilabel:`APM MetricSets`. You must have the admin role to access APM MetricSets. 
#. Select :guilabel:`Delete the MetricSet configuration` (trash can icon) to delete the tag and the corresponding MetricSets.

.. _new-tags-reporting: 

Use the new tags for future reporting
--------------------------------------------

Only use the new tags for future reporting.