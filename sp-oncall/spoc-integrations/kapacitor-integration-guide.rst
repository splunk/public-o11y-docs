.. _kapacitor-spoc:

Kapacitor integration for Splunk On-Call
*********************************************

.. meta::
    :description: Configure the Kapacitor integration for Splunk On-Call.

Kapacitor is an open source data processing framework that makes it easy to create alerts, run ETL jobs and detect anomalies. The following guide walks you through this integration.


Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise


Splunk On-Call configuration
==================================

From the Splunk On-Call web portal, select :guilabel:`Integrations`. From the resulting list of integration options, select :guilabel:`Kapacitor`, then :guilabel:`Enable Integration`.

Copy the :guilabel:`Service API Key` to the clipboard. Make sure to replace ``$routing_key`` with a valid routing key. See :ref:`spoc-routing-keys`.

Kapacitor configuration
================================

In the Kapacitor configuration file, for example kapacitor.conf, locate the ``[victorops]`` section, then set:

- ``enabled`` to ``true``
- ``api-key`` to the API key you obtained in Splunk On-Call
- ``routing-key`` to the routing key you want to use.

For example:

.. code-block:: ini

   [victorops]
      enabled = true
      api-key = "558e7ebc-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
      routing-key = "Sample_route"

Now you can chain ``.victorOps()`` and ``.routingKey()`` in the TICKscript.

The following snippet shows who to send alerts to Splunk On-Call with the routing key set to the value of
``routing-key`` in the Kapacitor configuration file:

.. code-block::

   stream
     |alert()
       .victorOps()

The following snippet shows who to send alerts to Splunk On-Call with the routing_key set to ``Another_route``:

.. code-block::

   stream
     |alert()
       .victorOps()
         .routingKey('Another_route')

If you want to send all alerts to Splunk On-Call without explicitly stating it in the TICKscript, set ``global`` to ``true`` in the ``[victorops]`` section of the Kapacitor configuration file. For example:

.. code-block:: ini

   [victorops]
      enabled = true
      api-key = "558e7ebc-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
      routing-key = "Sample_route"
      global = true

Alerts from Kapacitor appears in Splunk On-Call as they are generated.

