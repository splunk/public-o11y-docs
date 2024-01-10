.. _rest-api-ingest:

****************************************************************************
Send metrics, traces, and events using Splunk Observability Cloud REST APIs  
****************************************************************************

.. meta::
  :description: Use a REST API to send data points to Splunk Observability Cloud.

You can use the REST API to send telemetry directly to Splunk Observability Cloud. See :new-page:`Send data points <https://dev.splunk.com/observability/docs/datamodel/ingest/>` and :new-page:`Send traces, metrics, and events <https://dev.splunk.com/observability/reference/api/ingest_data/latest#endpoint-send-metrics>` in the developer documentation.

Start sending data using the API
=====================================

Start experimenting by sending data using the following `curl` command:

.. code-block:: bash

  curl --request POST \
    --header "Content-Type: application/json" \
    --header "X-SF-TOKEN: <ORG_TOKEN>" \
    --data \
    '{
        "gauge": [
            {
                "metric": "memory.free",
                "dimensions": { "host": "server1" },
                "value": 42
            }
        ]
    }' \
    https://ingest.<REALM>.signalfx.com/v2/datapoint

Send custom metrics using the API
------------------------------------------------------

To send custom metrics, replace ``<ORG_TOKEN>`` with an org token for your organization in the code block provided as an example. 

in Splunk Observability Cloud UI, an org token is called an access token. To learn how to obtain an org token, see :ref:`admin-org-tokens`. 

When you send a request, use the endpoint specific to your realm. Replace ``<REALM>`` with the name of your realm, which you can find on your profile page in the user interface. To learn more, see :new-page:`Realms in endpoints <https://dev.splunk.com/observability/docs/realms_in_endpoints>`.

Return codes
=====================================

The REST APIs return the following codes:

.. list-table::
  :header-rows: 1
  :widths: 25 15 60
  :width: 100%

  * - :strong:`API`
    - :strong:`Return code`
    - :strong:`Description`

  * - :new-page:`Send Traces, Metrics and Events <https://dev.splunk.com/observability/reference/api/ingest_data/latest#endpoint-send-metrics>`
    - ``200``
    - Successful data ingest.

  * - :new-page:`Send Traces, Metrics and Events <https://dev.splunk.com/observability/reference/api/ingest_data/latest#endpoint-send-metrics>`
    - ``400``
    - | Bad request. 
      | This can happen if the JSON was not well-formed, if you specified a data point outside of one of the metric type arrays, or if you forgot to specify a metric name for a data point.

  * - :new-page:`Send Traces, Metrics and Events <https://dev.splunk.com/observability/reference/api/ingest_data/latest#endpoint-send-metrics>`
    - ``401``
    - | Unauthorized. 
      | The ingest token specified in the X-SF-TOKEN header in the request doesn't have authorization to send data points to the organization.