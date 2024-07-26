.. _splunk-enterprise-receiver:

*******************************
Splunk Enterprise receiver
*******************************

.. meta::
      :description: The Splunk Enterprise receiver enables you to ingest performance metrics describing the operational status of your Splunk Enterprise deployment.

The Splunk Enterprise receiver is a pull based tool which enables you to ingest performance metrics describing the operational status of your Splunk Enterprise deployment to an appropriate observability tool. The receiver uses several different data sources, including the introspection API endpoint, to gather these metrics and serializes results from ad-hoc searches. For more information, see the :new-page:`REST API Reference Manual <https://docs.splunk.com/Documentation/Splunk/9.1.1/RESTREF/RESTintrospect>` in Splunk docs.

The supported pipeline type is ``metrics``. See :ref:`otel-data-processing` for more information.

.. caution:: This receiver targets those responsible for the maintenance and care of a Splunk Enterprise deployment, and aims to leverage OpenTelemetry and observability toolsets. Be careful when enabling the receiver, since running searches can effect your Splunk Enterprise Deployment and introspection might fail to report for Splunk Cloud deployments. 

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the Splunk Enterprise receiver as described in the next section.
3. Restart the Collector.

Sample configuration
--------------------------------

To activate the Splunk Enterprise receiver, add ``splunkenterprise`` to the ``receivers`` section of your configuration file: 

.. code-block:: yaml

  receivers:
    splunkenterprise:

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your configuration file:

.. code:: yaml

  service:
    pipelines:
      metrics:
        receivers: [splunkenterprise]

Configuration options
-----------------------

The following settings are required:

* ``basicauth``. A configured stanza for the ``basicauthextension``. Learn more at :ref:`basic-auth-extension`.

* ``auth``.  No default. String name referencing your auth extension.

* ``endpoint``. No default. Your Splunk Enterprise host's endpoint.

The following settings are optional:

* ``collection_interval``. ``10m`` by default.  The time between scrape attempts.

* ``timeout``. ``60s`` by default. The time the scrape function will wait for a response before returning an empty value.

The following applies to the Splunk Enterprise receiver configuration:

* Omitting any of the mandatory settings might cause your receiver to fail to compile or result in 4/5xx return codes during scraping.

* Set these parameters for each Splunk instance type (indexer, search head, or cluster master) from which you wish to pull metrics from. 
  
  * Currently only one instance type is accepted per configured receiver instance. Therefore, if you have three different "indexer" type instances to pull metrics you need to configure three different ``splunkenterprise`` receivers, one for each indexer node.

Configuration example
--------------------------------

See the following configuration example for the Splunk Enterprise receiver: 

.. code-block:: yaml

  extensions:
    basicauth/indexer:
        client_auth:
            username: admin
            password: securityFirst
    basicauth/cluster_master:
        client_auth:
            username: admin
            password: securityFirst

  receivers:
    splunkenterprise:
        indexer:
            auth: 
              authenticator: basicauth/indexer
            endpoint: "https://localhost:8089"
            timeout: 45s
        cluster_master:
            auth: 
              authenticator: basicauth/cluster_master
            endpoint: "https://localhost:8089"
            timeout: 45s

  exporters:
    logging:
      loglevel: info

  service:
    extensions: [basicauth/indexer, basicauth/cluster_master]
    pipelines:
      metrics:
        receivers: [splunkenterprise]
        exporters: [logging]

Metrics
======================

The following metrics, resource attributes, and attributes are available.

.. note:: The SignalFx exporter excludes some available metrics by default. Learn more about default metric filters in :ref:`list-excluded-metrics`.

.. raw:: html

  <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/splunkenterprisereceiver.yaml"></div>

.. include:: /_includes/activate-deactivate-native-metrics.rst

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
