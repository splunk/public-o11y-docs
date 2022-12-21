.. _webhook:

*************************************************************************
Send alert notifications to a webhook using Splunk Observability Cloud
*************************************************************************

.. meta::
      :description: Configure Observability Cloud to send alerts to a webhook when a detector alert condition is met and when the condition clears.

You can configure Splunk Observability Cloud to automatically send alert notifications to a webhook when a detector alert condition is met and when the alert clears.

To send Observability Cloud alert notifications to a webhook, complete the following configuration tasks:

* :ref:`webhook1`

* :ref:`webhook2`

  You must be an Observability Cloud administrator to perform this task.

* :ref:`webhook3`

Note that if the target destination is not available, Observability Cloud will retry sending the notification for up to a day. After 24 hours, the notification won't be delivered.


.. _webhook1:

Step 1: Create a webhook
===========================

Create a webhook that listens for and receives Observability Cloud alert notification requests.

Your webhook must use a secure (HTTPS) connection and must support Transport Layer Security (TLS) 1.2 or higher.

To help secure your webhook, use a shared secret that Observability Cloud can provide to your webhook to confirm that its requests are friendly traffic.

Ensure that your webhook promptly returns a 200 response code after it has successfully received the request from Observability Cloud. If Observability Cloud does not receive a 200 response code within a certain timeframe, it will retry the request.

Here's some useful information about the request that will come from Observability Cloud:

* Uses the POST method

* Uses a ``content-type`` value of ``application/json``

* Includes the parameters covered in :ref:`webhookrequest`.

In :ref:`webhook2`, you'll need to provide the following information about your webhook:

* URL

* Shared secret

* Header parameter values


.. _webhookrequest:

Observability Cloud webhook request parameters
--------------------------------------------------------

Observability Cloud provides the following parameters in a JSON object in its request body.

For request body examples, see :ref:`webhookexamples`.

..
  Unless marked as optional, will O11y Cloud always send a parameter value?

.. list-table::
   :header-rows: 1
   :widths: 25 10 70

   * - :strong:`Parameter`
     - :strong:`Format`
     - :strong:`Description`

   * - ``detector``
     - string
     - Name of the detector

   * - ``detectorUrl``
     - string
     - URL of the detector, which includes a parameter to select this specific incident

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
     - (Optional) Runbook URL specified in this rule

   * - ``tip``
     - string
     - (Optional) Tip specified in this rule

   * - ``messageTitle``
     - string
     - Notification title for this rule

   * - ``messageBody``
     - string
     - Notification message for this rule

   * - ``detectOnCondition``
     - string
     - Trigger metric data and detection criteria in this rule, in SignalFlow format

   * - ``detectOffCondition``
     - string
     - (Optional) Clear metric data and detection criteria in this rule, in SignalFlow format.

   * - ``status``
     - string
     - Kept for backwards compatibility. Use ``statusExtended`` to receive more information. This is the state of the incident. Valid values include: ``anomalous`` (the alert is firing because the detect conditions are met) or ``ok`` (the alert was cleared because the detect conditions were no longer met or the clear conditions, if any, were met).

   * - ``statusExtended``
     - string
     - This is the state of the incident. Valid values include: ``anomalous`` (the alert is firing because the detect conditions are met), ``ok`` (the alert was cleared because the detect conditions were no longer met or the clear conditions, if any, were met), ``manually resolved`` (a user resolved the alert through the UI or the API), or ``stopped`` (the detector that triggered the alert was edited or deleted).

   * - ``timestamp``
     - string
     - Time the event occurred, in ISO 8601 format

   * - ``inputs``
     - array
     - Map of the inputs involved in this rule. For more information, see :ref:`webhookinputs`.

   * - ``sf_schema``
     - integer
     - This is the schema version for this event. The value is always set to ``2``.


.. _webhookinputs:

``inputs`` array
^^^^^^^^^^^^^^^^^^^

The Observability Cloud webhook request includes an ``inputs`` array. Each object in the array is named after the program variable it's bound to. If it isn't bound to a program variable, it uses a name like ``_S0``, ``_S1``, and so forth.

Each input object contains the following elements:

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - :strong:`Element`
     - :strong:`Description`

   * - ``key``
     - (Optional) This is a map of the dimensions of the input signal. This element might be empty if there are no dimensions, but this is rare. This element might not be present if the input was a static value and not a comparison against scalar values.

   * - ``value``
     - Value of the input when the alert triggered or when it cleared

   * - ``fragment``
     - (Optional) This is the fragment of the SignalFlow program that represents the input. This element might not be present for some detectors or for static, anonymous inputs.


.. _webhookexamples:

Observability Cloud webhook request examples
--------------------------------------------------------

This section provides examples of the JSON request body that Observability Cloud can send to a webhook.

.. include:: /_includes/realm-note.rst

This request provides an alert notification for a detector that alerts when memory use reaches or exceeds 90% for 10 minutes.

.. code-block:: json

    {
     "sf_schema": 2,
     "detector": "Memory usage detector",
     "detectorUrl": "https://app.<YOUR_REALM>.signalfx.com/#/detector/ABCDEFGHIJK/edit",
     "description": "A detector that alerts when memory usage exceeds 90% for 10 minutes",
     "incidentId": "BCDEFGHIJKL",
     "eventType": "foo",
     "rule": "Running out of memory",
     "severity": "Minor",
     "description": "Memory has reached 90% of maximum for 10 minutes",
     "detectOnCondition": "when(A > 90, '10m')",
     "detectOffCondition": "when(A < 90, '15m')",
     "status": "ok",
     "statusExtended": "ok",
     "imageUrl": "https://org.<YOUR_REALM>.signalfx.com/#/chart/abCDefGHij",
     "timestamp": "2016-11-08T19:43:30Z",
     "inputs": {
       "_S1": {
         "dimensions": {
           "host": "i-346235qa",
           "plugin": "signalfx-metadata"
         },
         "value": 96.235234634345,
         "fragment": "data('memory.utilization')"
       }
     }
    }

This request provides alert notifications for a detector that alerts when host latency is greater than the data center latency and the data center latency is greater than 40 ms.

.. code-block:: json

    {
      "sf_schema": 2,
      "detector": "My detector",
      "detectorUrl": "https://app.<YOUR_REALM>.signalfx.com/#/detector/<id>/edit",
      "incidentId": "<id>",
      "eventType": "<event-type>",
      "rule": "My detector rule",
      "severity": "Critical",
      "description": "Latency of host myserver is 43.4, over a datacenter-wide latency of 42.9",
      "status": "anomalous",
      "statusExtended": "anomalous",
      "imageUrl": "https://org.<YOUR_REALM>.signalfx.com/#/chart/abCDefGHij",
      "timestamp": "2016-10-25T21:19:38Z",
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

You must be an Observability Cloud administrator to perform this task.

#. Log in to Splunk Observability Cloud.
#. In the left navigation menu, select :menuselection:`Data Management`.
#. Select :guilabel:`Add Integration`.
#. In the integration filter menu, select :guilabel:`All`.
#. In the :guilabel:`Search` field, search for :guilabel:`Webhook`, and select it.
#. Click :strong:`New Integration` to display the configuration options.
#. Enter a name for this integration. Give your integration a unique and descriptive name. For information about the downstream use of this name, see :new-page-ref:`About naming your integrations <naming-note>`.
#. In the :strong:`URL` field, enter the webhook URL you created in :ref:`webhook1`.
#. In the :strong:`Shared Secret` field, enter the shared secret you created in :ref:`webhook1`.
#. In the :strong:`Headers` section, enter any header parameters required by the webhook you created in :ref:`webhook1`.
#. :strong:`Save`.
#. If Observability Cloud is able to validate the URL, shared secret, and headers you provided for your webhook, a :strong:`Validated!` success message displays. If you get an error, make sure that the values you entered match the values you defined in :ref:`webhook1`.


.. _webhook3:

Step 3: Add a webhook integration as a detector alert recipient in Observability Cloud
=================================================================================================

..
  once the detector docs are migrated - this step may be covered in those docs and can be removed from these docs. below link to :ref:`detectors` and :ref:`receiving-notifications` instead once docs are migrated

To add a webhook integration as a detector alert recipient in Observability Cloud:

#. Create or edit a detector that you want to configure to send alert notifications using your webhook integration.

    For more information about working with detectors, see :ref:`create-detectors` and :ref:`subscribe`.

#. In the :strong:`Alert recipients` step, click :strong:`Add Recipient`.

#. Select :strong:`Webhook` and then select the name of the webhook integration you want to use to send alert notifications. This is the integration name you created in :ref:`webhook2`.

#. Activate and save the detector.

Observability Cloud will send an alert notification to the webhook when an alert is triggered by the detector and when the alert clears.
