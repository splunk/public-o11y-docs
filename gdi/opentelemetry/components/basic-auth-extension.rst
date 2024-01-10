.. _basic-auth-extension:

****************************
Basicauth extension
****************************

.. meta::
      :description: Use the basicauth extension to authenticate clients and servers using basic authentication. 

The ``basicauth`` extension implements both ``configauth.ServerAuthenticator`` and ``configauth.ClientAuthenticator`` to authenticate clients and servers using basic authentication. The authenticator type has to be set to ``basicauth``. 

When used to authenticate servers, if the authentication is successful, ``client.Info.Auth`` exposes the following attributes:

* ``username``: The username of the authenticated user.
* ``raw``: Raw base64 encoded credentials.

.. caution:: You can either authenticate servers or clients with the extension. If you configure both options, the extension throws an error. See more in :ref:`basic-auth-extension-settings`.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:

  - :ref:`otel-install-linux`
  - :ref:`otel-install-windows`
  - :ref:`otel-install-k8s`

2. Configure the ``basicauth`` extension as described in the next section.
3. Restart the Collector.

Sample configurations
--------------------------------------------

To activate the resource processor, add ``basicauth`` to the ``extensions`` section of your configuration file, as shown in the following example:

.. code:: yaml

  extensions:
    basicauth/server:
      htpasswd: 
        file: .htpasswd
        inline: |
          ${env:BASIC_AUTH_USERNAME}:${env:BASIC_AUTH_PASSWORD}
  
    basicauth/client:
      client_auth: 
        username: username
        password: password

  receivers:
    otlp:
      protocols:
        http:
          auth:
            authenticator: basicauth/server

  processors:

  exporters:
    otlp:
      auth:
        authenticator: basicauth/client

To complete the configuration, include the extension in any pipeline of the ``service`` section of your
configuration file. For example:

.. code:: yaml

  service:
    extensions: [basicauth/server, basicauth/client]
    pipelines:
      traces:
        receivers: [otlp]
        processors: []
        exporters: [otlp]

.. _basic-auth-lightprometheus-settings:

Configuration example: Simple Prometheus receiver
---------------------------------------------------

The following example illustrates how to configure the ``basicauth`` extension for the :ref:`simple-prometheus-receiver`:

.. code:: yaml

  receivers:
    lightprometheus/myjob:
      auth:
        authenticator: basicauth
      collection_interval: 1s
      endpoint: "http://localhost:8000/metrics"

  exporters:
    otlp:
      endpoint: "${OTLP_ENDPOINT}"
      tls:
        insecure: true

  extensions:
    basicauth:
      client_auth:
        username: foo
        password: bar

  service:
    extensions: [ basicauth ]
    pipelines:
      metrics:
        receivers: [ lightprometheus/myjob ]
        exporters: [ otlp ]

.. _basic-auth-extension-settings:

Settings
======================

The following table shows the configuration options for the ``basicauth`` extension:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/extension/basicauth.yaml"></div>

Authenticate servers or clients
--------------------------------------------

You can either authenticate servers or clients with the extension. If you configure both options, the extension throws an error.

* To configure the extension as a server authenticator, set either ``htpasswd.file`` or ``htpasswd.inline``. If you configure both, ``htpasswd.inline`` credentials takes precedence.

* To configure the extension as a client authenticator, set ``client_auth``.

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
