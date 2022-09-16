.. _rest-api-ingest:

**************************************************************
Observability Cloud REST APIs for sending data points
**************************************************************

.. meta::
  :description: Use a REST API to send data points to Splunk Infrastructure Monitoring.

On top of sending data to Splunk Infrastructure Monitoring by using an integration or SDK library, you can also use the API. Infrastructure Monitoring persists incoming data for further use.

Learn more in the developer documentation. For instance, see :new-page:`how to send data points <https://dev.splunk.com/observability/docs/datamodel/ingest/>` using the API, or :new-page:`how to send metrics <https://dev.splunk.com/observability/reference/api/ingest_data/latest#endpoint-send-metrics>`. 

Start sending data using the API
=====================================

Start experimenting with Infrastructure Monitoring by sending data using the following `curl` command:

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

In Observability Cloud UI, an org token is called an access token. To learn how to obtain an org token, see :ref:`admin-org-tokens`. 

When you send a request, use the endpoint specific to your realm. Replace ``<REALM>`` with the name of your realm, which you can find on your profile page in the user interface. To learn more, see :new-page:`Realms in endpoints <https://dev.splunk.com/observability/docs/realms_in_endpoints>`.
