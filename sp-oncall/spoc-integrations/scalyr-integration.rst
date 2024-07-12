.. _scalyr-integration-spoc:

Dataset (Scalyr) integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Dataset (Scalyr) integration for Splunk On-Call.

Dataset, formerly known as Scalyr, aggregates all your server logs and metrics into a centralized system in real time. The following guide walks you through the steps needed to integrate the two systems.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

Splunk On-Call configuration
====================================

From the Splunk On-Call web portal select :guilabel:`Settings`, :guilabel:`Alert Behavior`, :guilabel:`Integrations`. Select the Dataset (Scalyr) integration and copy the service API endpoint to your clipboard.

Make sure to add the appropriate routing key to the end of the URL. See :ref:`spoc-routing-keys` for more information.

Dataset configuration
====================================

In Dataset, select :guilabel:`Alerts` then :guilabel:`Edit Alerts`.

.. image:: /_images/spoc/Scalyr_integration_alerts.png
   :alt: Location of Alerts in Dataset

Edit the Alerts configuration file to specify Splunk On-Call as the alert recipient. To do this for all Dataset alerts, create or edit an ``alertAddress`` field at the top level of the file as shown in the following snippet, using
your service API endpoint from the previous step:

.. code-block::

   {
      alertAddress: "victorops:webhookUrl=https://alert.victorops.com/integrations/generic/20131114/alert/$api_key/$routing_key",
      alerts: [
         {
            trigger: "alert expression 1",
            description: ""
         },
         {
            trigger: "alert expression 2",
            description: ""
         }
      ]
   }

To send notifications to 1 or more email addresses in addition to Splunk On-Call, list them all in ``alertAddress``:

.. code-block:: json

   "alertAddress": "victorops:webhookUrl=https://alert.victorops.com/integrations/generic/20131114/alert/$api_key/$routing_key, foo@example.com, bar@example.com",

If you only want to use Splunk On-Call for certain alerts, you can specify an ``alertAddress`` field for those alerts:

.. code-block::

   {
      alertAddress: "email@example.com",

      alerts: [
         // This alert will be sent to VictorOps
         {
            trigger: "count:1m(error) > 10",
            "alertAddress": "victorops:webhookUrl=https://alert.victorops.com/integrations/generic/20131114/alert/$api_key/$routing_key"
         },

         // This alert will send notifications to email@example.com
         {
            trigger: "mean:10m($source='tsdb' $serverHost='server1' metric='proc.stat.cpu_rate' type='user') > 50"
         }
      ]
   }

To link a whole group of alerts to Splunk On-Call, specify an appropriate ``alertAddress`` for the group.

Configuring Alerts sent to Splunk On-Call
-------------------------------------------------

Dataset sends a message to Splunk On-Call when an alert triggers. By default, the message severity is ``CRITICAL``. All ``CRITICAL`` alerts create incidents and notify users.

To change the severity, add a parameter in the endpoint URL and create a matching Rules Engine rule.

.. note::

   The Rules Engine is an Enterprise level feature only. See :ref:`alert-rules-engine` for more information.

The following example passes a payload field of ``scalyrMessageType`` with a value of ``WARNING``:

.. code-block:: text

   victorops:webhookUrl=https://alert.victorops.com/integrations/generic/20131114/alert/<unique_victorops-generated_endpoint>/<routing_key>/?scalyrMessageType=WARNING

A corresponding Rules Engine rule can match on the field of ``scalyrMessageType`` with a value of ``WARNING``, and transform the ``message_type`` field to a value of ``WARNING``. The ``message_type`` field is what tells Splunk On-Call how to treat the alert.

You can apply the same process to nearly any pertinent payload field. For more information, see :ref:`incident-fields-glossary`.

All the resolved Dataset alerts are sent with a message type of ``RECOVERY``.
