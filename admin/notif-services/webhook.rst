.. _webhook:

*************************************************************************
Send alert notifications to a Webhook using Splunk Observability Cloud
*************************************************************************

.. meta::
      :description: Configure Observability Cloud to send alerts to a Webhook when an alert condition triggers the detector and when the condition clears.

You can configure Splunk Observability Cloud to automatically send alert notifications to a Webhook when a condition triggers the detector and when a clear condition clears the alert.

.. note::

   * To add a Webhook as a detector alert recipient, you must have administrator access. To get this access,
     an existing administrator adds it to your user profile. See :ref:`admin-manage-users` for more information.
   * If your Webhook endpoint fails to respond to a detector notification, Observability Cloud retries the
     notification for up to 24 hours. If your endpoint still doesn't respond, you don't receive the notification.

To send Observability Cloud alert notifications to a Webhook, complete the following configuration tasks:

* :ref:`webhook1`

* :ref:`webhook2`

* :ref:`webhook3`

.. _webhook1:

Step 1: Create a Webhook
===========================

Create a Webhook that listens for and receives Observability Cloud alert notification requests.

Your Webhook must use a secure (HTTPS) connection and must support Transport Layer Security (TLS) 1.2 or higher.

To help secure your Webhook, establish a shared secret string. When you create the Webhook notification integration,
you enter this string in one of the input fields. Observability Cloud uses the string as part of a cryptographic
algorithm that generates a unique message code for your notification. Observability Cloud then inserts
the code in the header of the outgoing Webhook notification request. When your code receives the request, use the same
algorithm, including the shared secret string, to generate a code. If the codes are identical, the
the request to your Webhook is secure and valid.

To learn more about the shared secret string, the cryptographic algorithm, and the message code, see the
:new-page:`Shared secret <https://dev.splunk.com/observability/docs/integrations/webhook_integration_overview/#Shared-secret>` section in
the :emphasis:`Splunk Observability Cloud Developers Guide`.

Your Webhook must return a HTTP ``200 OK`` response code immediately after you receive the request.
If Observability Cloud does not receive a 200 response code within a certain time frame, it retries the request.

.. _webhook2:

Step 2: Create a Webhook integration in Observability Cloud
=================================================================================

You must be an Observability Cloud administrator to complete this task.

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`Webhook guided setup <https://login.signalfx.com/#/integrations/webhook>`. Alternatively, you can navigate to the guided setup on your own:

   #. In the navigation menu, select :menuselection:`Data Management`.
   #. Select :guilabel:`Add Integration`.
   #. In the integration filter menu, select :guilabel:`All`.
   #. In the :guilabel:`Search` field, search for :guilabel:`Webhook`, and select it.
   #. Select :strong:`New Integration` to display the configuration options.

#. On the :strong:`Summary` page, select :guilabel:`Next`.
#. On the :strong:`Configure connection` page, enter information into the following fields:

    .. list-table::
      :header-rows: 1
      :widths: 25 75

      * - :strong:`Field`
        - :strong:`Description`

      * - Name
        - Give your integration a unique and descriptive name. For information about the downstream use of this name, see :new-page-ref:`About naming your integrations <naming-note>`.

      * - URL
        - Enter the Webhook URL you created in :ref:`webhook1`.

      * - Method
        - Select an HTTP method from the dropdown menu.
      
      * - Shared secret
        - Enter the shared secret you established in :ref:`webhook1`.
      
      * - Headers
        - (Optional) Enter any HTTP header and value you want to add to HTTP requests sent to the Webhook's external site.

#. Select :guilabel:`Next`.
#. On the :strong:`Customize message` page, you see the default payload for a Webhook integration. You can customize your payload to make sure responders have the context needed to resolve the issues.

   For a full list of supported variables and examples, see :new-page:`Integrate Webhook <https://dev.splunk.com/observability/docs/integrations/webhook_integration_overview>` in the :emphasis:`Splunk Observability Cloud Developers Guide`.

#. Select :guilabel:`Next`.
#. Review your integration and select :guilabel:`Save`.


.. _webhook3:

Step 3: Add a Webhook integration as a detector alert recipient in Observability Cloud
=================================================================================================

To add a Webhook integration as a detector alert recipient in Observability Cloud:

#. Create or edit a detector that you want to configure to send alert notifications using your Webhook integration.

   For more information about working with detectors, see :ref:`create-detectors` and :ref:`subscribe`.

#. In the :strong:`Alert recipients` step, select :strong:`Add Recipient`.
#. Select :strong:`Webhook` and then select the name of the Webhook integration you want to use to send alert notifications. This is the integration name you created in :ref:`webhook2`.
#. Activate and save the detector.

Splunk Observability Cloud sends an alert notification to the Webhook when the detector triggers or clears an alert.
