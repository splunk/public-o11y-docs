.. _webhook:

*************************************************************************
Send alert notifications to a webhook using Splunk Observability Cloud
*************************************************************************

.. meta::
      :description: Configure Observability Cloud to send alerts to a webhook when an alert condition triggers the detector and when the condition clears.

You can configure Splunk Observability Cloud to automatically send alert notifications to a webhook when a condition
triggers the detector and when a clear condition clears the alert.

.. note::

   * To add a webhook as a detector alert recipient, you must have administrator access. To get this access,
     an existing administrator adds it to your user profile. See :ref:`request-admin` for more information.
   * If your webhook endpoint fails to respond to a detector notification, Observability Cloud retries the
     notification for up to 24 hours. If your endpoint still doesn't respond, you don't receive the notification.

To send Observability Cloud alert notifications to a webhook, complete the following configuration tasks:

* :ref:`webhook1`

* :ref:`webhook2`

* :ref:`webhook3`

.. _webhook1:

Step 1: Create a webhook
===========================

Create a webhook that listens for and receives Observability Cloud alert notification requests.

Your webhook must use a secure (HTTPS) connection and must support Transport Layer Security (TLS) 1.2 or higher.

To help secure your webhook, establish a shared secret string. When you create the webhook notification integration,
you enter this string in one of the input fields. Observability Cloud uses the string as part of a cryptographic
algorithm that generates a unique message code for your notification. Observability Cloud then inserts
the code in the header of the outgoing webhook notification request. When your code receives the request, use the same
algorithm, including the shared secret string, to generate a code. If the codes are identical, the
the request to your webhook is secure and valid.

To learn more about the shared secret string, the cryptographic algorithm, and the message code, see the
:new-page:`Webhook integrations <https://dev.splunk.com/observability/docs/integrations#Webhook-integration>` section in
the :emphasis:`Splunk Observability Cloud Developers Guide`.

Your webhook must return a HTTP ``200 OK`` response code immediately after you receive the request.
If Observability Cloud does not receive a 200 response code within a certain time frame, it retries the request.

Observability Cloud sends the webhook notification request to your webhook using these settings:

* HTTP verb: ``POST``
* Media Type: ``Content-Type: application/json``
* HTTP request headers: Include the parameters described in :ref:`webhookrequest`.

In :ref:`webhook2`, you need to provide the following information about your webhook:

* URL: The URL for your webhook endpoint.
* Shared secret: See the description at the start of this step.
* Header parameters: Array of key-value pairs that you want to pass to your webhook code.
  Observability Cloud puts this array in the ``X-SFX-Signature`` parameter in the HTTP request header. Use this array
  to pass values that are part of the Observability Cloud webhook request body.

.. _webhookrequest:

Observability Cloud webhook request body fields
--------------------------------------------------------

Observability Cloud provides the following parameters in a JSON object in its request body.

For request body examples, see :ref:`webhookexamples`.

.. list-table::
   :header-rows: 1
   :widths: 25 10 70

   * - :strong:`Field`
     - :strong:`Format`
     - :strong:`Description`

   * - ``detector``
     - string
     - Name of the detector that triggered the alert

   * - ``detectorUrl``
     - string
     - URL of the detector, including a parameter that selects the incident that led to the notification.

   * - ``detectorId``
     - string
     - ID of the detector

   * - ``description``
     - string
     - (Optional) Description of the detector

   * - ``imageUrl``
     - string
     - URL of the alert preview image

   * - ``incidentId``
     - string
     - Unique identifier for this alert notification

   * - ``eventType``
     - string
     - Unique identifier for the version of the detector that sent the notification

   * - ``rule``
     - string
     - Name of the detector rule that triggered the alert

   * - ``severity``
     - string
     - Severity level of the rule

   * - ``runbookUrl``
     - string
     - (Optional) Runbook URL you specified for the detector rule

   * - ``tip``
     - string
     - (Optional) Tip you specified for the detector rule

   * - ``messageTitle``
     - string
     - Notification title you specified for the detector rule

   * - ``messageBody``
     - string
     - Notification message you specified for the detector rule

   * - ``detectOnCondition``
     - string
     - Trigger expression for the rule, in SignalFlow format. Includes the metrics, dimensions, functions, and so forth.

   * - ``detectOffCondition``
     - string
     - (Optional) Clear expression for the rule, in SignalFlow format. Includes the metrics, dimensions, functions,
       and so forth.

   * - ``status``
     - string
     - Kept for backwards compatibility. Use ``statusExtended`` to receive more information.
       This is the state of the incident. Valid values are ``anomalous``
       (the detector triggered an alert) and ``ok``
       (the detector stopped triggering an alert, or the detector clear conditions triggered a clear).

   * - ``statusExtended``
     - string
     - This is the state of the incident. The value is one of the following:

       - ``anomalous``: The detector triggered an alert.
       - ``ok``: The detector stopped triggering an alert or the detector clear conditions triggered a clear.
       - ``manually resolved``: A user resolved the alert in the user interface, or resolved the alert using the API.
       - ``stopped`` A user edited or deleted the detector that triggered the incident.

   * - ``timestamp``
     - string
     - Time the event occurred, in ISO 8601 format

   * - ``inputs``
     - array
     - Map of the inputs involved in this rule. For more information, see :ref:`webhookinputs`.

   * - ``sf_schema``
     - integer
     - This is the schema version for this event. The value is always ``2``.


.. _webhookinputs:

``inputs`` array
^^^^^^^^^^^^^^^^^^^

The Observability Cloud webhook request includes an ``inputs`` array. Each object in the array has the name of the program variable to which it's bound.
If it isn't bound to a program variable, the name uses the pattern ``_S0``, ``_S1``, and so forth.

Each input object contains the following elements:

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - :strong:`Element`
     - :strong:`Description`

   * - ``key``
     - (Optional) A map of the dimensions of the input signal. If the detector condition doesn't use dimensions, this
       element is empty. If the input is a static value rather than a comparison against scalar values, the element is
       not present.

   * - ``value``
     - Value of the input when the detector triggered or cleared the alert

   * - ``fragment``
     - (Optional) This is the fragment of the SignalFlow program that represents the input.
       This element might not be present for some detectors or for static, anonymous inputs.


.. _webhookexamples:

Observability Cloud webhook request examples
--------------------------------------------------------

This section provides examples of the JSON request body that Observability Cloud can send to a webhook.

.. include:: /_includes/realm-note.rst

The following JSON is the request body for a webhook alert notification from a detector that alerts when memory
use reaches or exceeds 90% for 10 minutes.

.. code-block:: json

    {
     "sf_schema": 2,
     "detector": "Memory usage detector",
     "detectorUrl": "https://app.<REALM>.signalfx.com/#/detector/ABCDEFGHIJK/edit",
     "description": "A detector that alerts when memory usage exceeds 90% for 10 minutes",
     "incidentId": "BCDEFGHIJKL",
     "eventType": "exceedMemoryUse",
     "rule": "Running out of memory",
     "severity": "Minor",
     "description": "Memory has reached 90% of maximum for 10 minutes",
     "detectOnCondition": "when(A > 90, '10m')",
     "detectOffCondition": "when(A < 90, '15m')",
     "status": "ok",
     "statusExtended": "ok",
     "imageUrl": "https://org.<YOUR_REALM>.signalfx.com/#/chart/abCDefGHij",
     "timestamp": "2023-02-08T19:43:30Z",
     "inputs": {
       "_S1": {
         "dimensions": {
           "host": "i-346235qa",
           "plugin": "o11y-metadata"
         },
         "value": 96.235234634345,
         "fragment": "data('memory.utilization')"
       }
     }
    }

This is the request body for a webhook alert notification from a detector that alerts when host latency is greater than
the data center latency and the data center latency is greater than 40 ms.

.. code-block:: json

    {
      "sf_schema": 2,
      "detector": "My detector",
      "detectorUrl": "https://app.<REALM>.signalfx.com/#/detector/<id>/edit",
      "incidentId": "<id>",
      "eventType": "<event-type>",
      "rule": "My detector rule",
      "severity": "Critical",
      "description": "Latency of host myserver is 43.4, over a datacenter-wide latency of 42.9",
      "status": "anomalous",
      "statusExtended": "anomalous",
      "imageUrl": "https://org.<REALM>.signalfx.com/#/chart/abCDefGHij",
      "timestamp": "20122-10-25T21:19:38Z",
      "detectOnCondition": "when(a > b and b > 40)",
      "inputs": {
         "a": {
            "key": {
               "host": "myserver",
               "dc": "us-west-1"
            },
            "value": 43.4,
            "fragment": "data('latency').p99(by=['host', 'dc'])"
         },
         "b": {
            "key": {
               "dc": "us-west-1"
            },
            "value": 42.9,
            "fragment": "data('latency').p99(by='dc')"
         },
         "_S2": {
            "value": 40,
            "fragment": "40"
         }
      }
    }


.. _webhook2:

Step 2: Create a webhook integration in Observability Cloud
=================================================================================

You must be an Observability Cloud administrator to complete this task.

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`Webhook guided setup <https://login.signalfx.com/#/integrations/webhook>`. Optionally, you can navigate to the guided setup on your own:

    #. In the navigation menu, select :menuselection:`Data Management`.
 
    #. Select :guilabel:`Add Integration`.

   #. In the integration filter menu, select :guilabel:`All`.

   #. In the :guilabel:`Search` field, search for :guilabel:`Webhook`, and select it.

   #. Select :strong:`New Integration` to display the configuration options.

#. Enter a name for this integration. Give your integration a unique and descriptive name. For information about the downstream use of this name, see :new-page-ref:`About naming your integrations <naming-note>`.
#. In the :strong:`URL` field, enter the webhook URL you created in :ref:`webhook1`.
#. In the :strong:`Shared Secret` field, enter the shared secret you established in :ref:`webhook1`.
#. In the :strong:`Headers` section, enter any header parameters required by the webhook you created in :ref:`webhook1`.
#. Select :strong:`Save`.
#. If Observability Cloud validates the URL, shared secret, and headers you provided for your webhook,
   a :strong:`Validated!` success message appears. If you see an error message, make sure that the values you entered
   match the values you defined in :ref:`webhook1`.


.. _webhook3:

Step 3: Add a webhook integration as a detector alert recipient in Observability Cloud
=================================================================================================

To add a webhook integration as a detector alert recipient in Observability Cloud:

#. Create or edit a detector that you want to configure to send alert notifications using your webhook integration.

   For more information about working with detectors, see :ref:`create-detectors` and :ref:`subscribe`.

#. In the :strong:`Alert recipients` step, select :strong:`Add Recipient`.

#. Select :strong:`Webhook` and then select the name of the webhook integration you want to use to send alert
   notifications. This is the integration name you created in :ref:`webhook2`.

#. Activate and save the detector.

Splunk Observability Cloud sends an alert notification to the webhook when the detector triggers or clears an alert.
