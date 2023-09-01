.. _migrate-apm-custom-reporting: 

Migrate APM custom reporting to OpenTelemetry Java Agent 2.0
*****************************************************************

.. meta:: 
   :description: Steps to migrate your APM custom reporting to support upgrade to version 2.0 of Splunk OpenTelemetry Java agent.

Version 2.0 of the agent from the Splunk Distribution of OpenTelemetry Java includes breaking changes to HTTP semantic conventions. If you want to upgrade to version 2.0, consider these breaking changes.

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
     - Consistent namespacing avoids breaking ECS.
   * - ``http.status_code``
     - ``http.response.status_code``
     - Consistent namespacing avoids breaking ECS.
   * - ``http.request_content_length``
     - ``http.request.body.size``
     - Consistent namespacing avoids breaking ECS.
   * - ``http.response_content_length``
     - ``http.response.body.size``
     - Consistent namespacing avoids breaking ECS.
   * - ``http.url``
     - ``url.full``
     - Avoids separate fields for separate URL types and simplifies telemetry correlation across different URL types for example, ftp://, ssh://, file://, data://, and so on.
   * - ``http.target``
     - ``url.path`` and ``url.query``
     - Avoids separate fields for separate URL types and simplifies telemetry correlation across different URL types for example, ftp://, ssh://, file://, data://, and so on.
   * - ``http.scheme``
     - ``url.scheme``
     - Avoids separate fields for separate URL types and simplifies telemetry correlation across different URL types for example, ftp://, ssh://, file://, data://, and so on.
   * - ``http.client_ip``
     - ``http.forwarded.for``
     - 

How to determine if your Splunk APM experience might be affected
===================================================================

There are several aspects of custom reporting in APM that will be affected if you use the deprecated tags. Custom reporting in APM includes the following:

* Tag Spotlight
* Custom charts and dashboards, that is, charts and dashboards you create. Built-in APM dashboards will be unaffected.
* Detectors 

If you use any of the deprecated tags in custom reporting in APM and want to ensure your custom reporting is unaffected, follow the migration steps before upgrading to version 2.0 of the agent of the Splunk Distribution of OpenTelemetry Java. 

Time your upgrade
========================

As of August 7, 2023, Splunk APM began populating the new attributes with data. Depending on your historical reporting needs, choose a date to upgrade that is right for your organization. 

Migration steps
===================

#. Index the new attributes as tags to generate either Troubleshooting Metric Sets (TMS) or Monitoring Metric Sets (MMS).
    #. TMS are used in the service map and Tag Spotlight. See :ref:`apm-index-span-tags` for steps to generate TMS.
    #. MMS are used in the APM landing page and the dashboards. See :ref:`cmms` for steps to generate MMS.
#. Update your charts and dashboards that used the deprecated tags to use the new indexed tags. See :ref:`dashboard-create-customize` and :ref:`create-charts`.
#. Update your APM detectors to use the new indexed tags. See :ref:`apm-alerts` for steps to create an APM detector. 
#. (Optional) After you have updated your charts, dashboards, and detectors to use the new tags and have confirmed that all are working as expected, unindex the old tags. 
#. Only use the new tags for future reporting.

