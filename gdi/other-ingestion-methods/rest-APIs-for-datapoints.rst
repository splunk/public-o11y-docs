.. _rest-api-ingest:

**************************************************************
Observability Cloud REST APIs for sending data points
**************************************************************

.. meta::
   :description: Use a REST API to send data points to Splunk Infrastructure Monitoring.

Although you commonly send data to Splunk Infrastructure Monitoring by using an integration or SDK library, you can also use the API. Infrastructure Monitoring persists incoming data for further use.

To experiment with Infrastructure Monitoring, start by sending data, as shown in the following `curl` command:

.. code-block:: bash

   $ curl --request POST \
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

Notes for sending custom metrics with a REST API
================================================

In the code block above, replace <ORG_TOKEN> with an org token for your organization. In the user interface, an org token is called an access token. To learn how to obtain an org token, see the user documentation topic :new-page:`Manage access tokens <https://docs.signalfx.com/en/latest/admin-guide/tokens.html#manage-access-tokens>`.

When you send a request, use the endpoint specific to your realm. Replace <REALM> with the name of your realm, which you can find on your profile page in the user interface. To learn more, see :new-page:`Realms in endpoints <https://dev.splunk.com/observability/docs/realms_in_endpoints>`.
