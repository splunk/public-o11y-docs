.. _migrate-apm-custom-reporting: 

Migrate APM custom reporting to OpenTelemetry Java Agent 2.0
*****************************************************************

.. meta:: 
   :description: The agent of the Splunk Distribution of OpenTelemetry Java replaces the deprecated SignalFx Java Agent. To migrate to the Splunk Java OTel agent, follow these instructions.

Version 2.0 of the agent of the Splunk Distribution of OpenTelemetry Java includes breaking changes to http semantic conventions. 

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
