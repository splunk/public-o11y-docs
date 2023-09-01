.. _migrate-apm-custom-reporting: 

Migrate APM custom reporting to OpenTelemetry Java Agent 2.0
*****************************************************************

.. meta:: 
   :description: Steps to migrate your APM custom reporting to support upgrade to version 2.0 of Splunk OpenTelemetry Java agent.

Version 2.0 of the agent of the Splunk Distribution of OpenTelemetry Java includes breaking changes to http semantic conventions. If you want to upgrade to version 2.0, you'll need to consider these breaking changes.

HTTP semantic convention changes
===================================

The following table covers the http attributes that changed from version 1.0 to version 2.0 in the agent of the Splunk Distribution of OpenTelemetry Java.

.. list-table:: 
   :header-rows: 1

   * - Version 1.0 attribute
     - Version 2.0 attribute
   * - ``http.method``
     - ``http.request.method``
   * - ``http.status_code``
     - ``http.response.status_code``
   * - ``http.request_content_length``
     - ``http.request.body.size``
   * - ``http.response_content_length``
     - ``http.response.body.size``
   * - ``http.url``
     - ``url.full``
   * - ``http.target``
     - ``url.path`` and ``url.query``
   * - ``http.scheme``
     - ``url.scheme``
   * - ``http.client_ip``
     - ``http.forwarded.for``

Considerations before upgrading
===================================

If you use any of the affected attributes in custom reporting in APM you'll need to follow the migration steps before upgrading to Version 2.0 of the agent of the Splunk Distribution of OpenTelemetry Java . Custom reporting in APM includes the following:

* Tag Spotlight
* Custom charts and dashboards, that is, charts and dashboards you create. Built-in APM dashboards will be unaffected.
* Detectors 

Time your upgrade
-------------------

As of August 7, 2023, Splunk APM began populating the new attributes with data. Thirteen months of data was also backfilled into these new attributes on this date. Because the data is automatically migrated, you can complete the following migration steps and then upgrade whenever the timing is right for your organization. 

Migration steps
===================

#. Index the new attributes as tags to generate either Troubleshooting Metric Sets (TMS) or Monitoring Metric Sets (MMS).
   #. TMS are used in the service map and Tag Spotlight. See :ref:`apm-index-span-tags` for steps to generate TMS.
   #. MMS are used in the APM landing page and the dashboards. See :ref:`cmms` for steps to generate MMS.
#. Update your charts and dashboards to use the new indexed tags. See :ref:`dashboard-create-customize` and :ref:`create-charts`.
#. Create new detectors to use the new indexed tags. See :ref:`apm-alerts` for steps to create an APM detector. 
#. (Optional) Once you have updated your charts, dashboards, and detectors to use the new tags and have confirmed that all are working as expected you will likely want to unindex the old tags. 

