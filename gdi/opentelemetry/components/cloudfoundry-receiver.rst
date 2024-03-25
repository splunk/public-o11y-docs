.. _cloudfoundry-receiver:

****************************
Cloud Foundry receiver
****************************

.. meta::
      :description: Connects to the Reverse Log Proxy (RLP) gateway of Cloud Foundry to extract metrics.

The Cloud Foundry receiver allows the Splunk Distribution of the OpenTelemetry Collector to connect to the Reverse Log Proxy (RLP) gateway of Cloud Foundry and extract metrics. The supported pipeline type is ``metrics``. See :ref:`otel-data-processing` for more information.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of the OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the receiver as described in the next document.
3. Restart the Collector.

Sample configuration
--------------------------------

To activate the receiver, add ``cloudfoundry`` to the ``receivers`` section of your configuration file, as in the following sample configurations. See :ref:`cloudfoundry-receiver-settings` for more details.

.. code-block:: yaml

  receivers:
    cloudfoundry:

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your
configuration file:

.. code:: yaml

  service:
    pipelines:
      metrics:
        receivers: [cloudfoundry]

Configuration settings
--------------------------------

The receiver has the following configuration options:

* ``rlp_gateway.endpoint``. :strong:`Required`. URL of the RLP gateway, typically ``https://log-stream.<cf-system-domain>``.
* ``rlp_gateway.tls.insecure_skip_verify``. ``false`` by default. Whether to skip TLS verify for the RLP gateway endpoint.
* ``rlp_gateway.shard_id``. Metrics are load balanced among receivers that use the same shard ID, therefore use this if there are multiple receivers which must both receive all the metrics instead of them being balanced between them.
* ``uaa.endpoint``. :strong:`Required`. URL of the UAA provider, typically ``https://uaa.<cf-system-domain>``.
* ``uaa.tls.insecure_skip_verify``. ``false`` by default. Whether to skip TLS verify for the UAA endpoint.
* ``uaa.username``. :strong:`Required`. Name of the UAA user.
* ``uaa.password``. :strong:`Required`. Password of the UAA user.


The ``rlp_gateway`` configuration section also inherits configuration options from :ref:`HTTP Client Configuration <https://github.com/open-telemetry/opentelemetry-collector/tree/main/config/confighttp#client-configuration>`.

Configuration examples
--------------------------------------------

See this sample config:

.. code:: yaml

  receivers:
    cloudfoundry:
      rlp_gateway:
        endpoint: "https://log-stream.sys.example.internal"
        tls:
          insecure_skip_verify: false
        shard_id: "opentelemetry"
      uaa:
        endpoint: "https://uaa.sys.example.internal"
        tls:
          insecure_skip_verify: false
        username: "otelclient"
        password: "changeit"

See also:

.. code:: yaml

  cloudfoundry/one:
    rlp_gateway:
      endpoint: "https://log-stream.sys.example.internal"
      shard_id: "otel-test"
      timeout: "20s"
      tls:
        insecure_skip_verify: true
    uaa:
      endpoint: "https://uaa.sys.example.internal"
      username: "admin"
      password: "test"
      tls:
        insecure_skip_verify: true

.. code:: yaml

  cloudfoundry/invalid:
    rlp_gateway:
      endpoint: "https://[invalid"
      shard_id: "otel-test"
      timeout: "20s"
      tls:
        insecure_skip_verify: true
    uaa:
      endpoint: "https://uaa.sys.example.internal"
      username: "admin"
      password: "test"
      tls:
        insecure_skip_verify: true

Authenticate the RLP gateway
===============================

Add the Oauth2 token as the ``Authorization`` header to authenticate the RLP gateway. To obtain an OAuth2 token, make a request to the UAA component, which acts as the OAuth2 provider. You can specify the URL in the ``uaa_url`` configuration option, typically ``https://uaa.<cf-system-domain>`` is used. 

.. note:: To use UAA you must have the ``client_credentials`` and ``refresh_token`` authorized grant types, and ``logs.admin`` authority.

The following is an example sequence of commands to create the UAA user using the ``uaac`` command line utility:

* ``uaac target https://uaa.<cf-system-domain>``
* ``uaac token client get identity -s <identity-user-secret>``
* ``uaac client add <uaa_username> --name opentelemetry --secret <uaa_password> --authorized_grant_types client_credentials,refresh_token --authorities logs.admin``

UAA authentication uses a username and password/secret combination. You can set the ``<uaa_username>`` and ``<uaa_password>`` above to anything as long as they match the values you provide to the receiver configuration. 

The admin account, which has the permissions to create new clients, can have a different name on different setups. The value of ``--name`` is not used for receiver configuration.

.. _cloudfoundry-receiver-settings:

Settings
======================

The following table shows the configuration options for the Cloud Foundry receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/cloudfoundry.yaml"></div>

Metrics
======================

All metrics are either gauges or sums. For more information, see :ref:`data-model`. Reported metrics are grouped under an instrumentation library named ``otelcol/cloudfoundry``. 

Metric names are specified by Cloud Foundry, and the origin name is prepended to the metric name with the ``.`` separator. Learn more at :new-page:`Cloud Foundry Component Metrics <https://docs.cloudfoundry.org/running/all_metrics.html>`.

Attributes
--------------------------------------------------------------------------

All the metrics have the following attributes:

* ``origin``: Origin name as documented by Cloud Foundry.
* ``source``: For applications, the GUID of the application, otherwise equal to origin.

For Cloud Foundry or Tanzu Application Service deployed in BOSH, the following attributes are also present, using their canonical BOSH meanings:

* ``deployment``: BOSH deployment name.
* ``index``: BOSH instance ID (GUID).
* ``ip``: BOSH instance IP.
* ``job``: BOSH job name.

For metrics originating with rep origin name, specific to applications, the following attributes are present:

* ``instance_id``: Numerical index of the application instance. It's also present for ``bbs origin``, where it matches the value of index.
* ``process_id``: The process ID (GUID). For a process of the type ``web``, which is the main process of an application, this is equal to ``source_id`` and ``app_id``.
* ``process_instance_id``: The unique ID of a process instance. Treat it as an opaque string.
* ``process_type``: Process type. Each application has exactly one process of type ``web``, but many have any number of other processes.

On TAS/PCF versions 2.8.0 or higher and cf-deployment versions v11.1.0 or higher, the following additional attributes are present for application metrics: ``app_id``, ``app_name``, ``space_id``, ``space_name``, ``organization_id``, and ``organization_name``. They provide the GUID and name of the application, space and organization respectively.

More attributes might be available since the receiver passes on whatever attributes the gateway provides.

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst

