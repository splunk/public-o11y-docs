.. _allow-services:

*****************************************************************
Allow Splunk Observability Cloud services in your network
*****************************************************************

.. meta::
      :description: Options for securing your implementation, including proxies and allow lists for URLs and domains.    

A number of different services make up Splunk Observability Cloud. If your organization has stringent networking security policies that apply to sending data to third parties, use one of the following methods to ensure network access to Splunk Observability Cloud services:

- :ref:`simple-http-proxy`
- :ref:`otel-connector`


.. _simple-http-proxy:

Use a simple HTTP/HTTPS proxy
================================

If you can get out to the internet using a proxy, then using an HTTP/HTTPS proxy is your simplest option.

Ensure that you give the proxy the ability to resolve the network names and make outbound HTTP/HTTPS network connections to the URLs listed in :ref:`allow-urls` or the domains listed in :ref:`allow-domains`.

.. _otel-connector:

Use the Splunk Distribution of OpenTelemetry Collector
=======================================================================

Use the :new-page:`Splunk Distribution of OpenTelemetry Collector <https://docs.splunk.com/Observability/gdi/opentelemetry/deployment-modes.html>` in gateway mode. You can forward metrics locally to the Splunk Distribution of OpenTelemetry Collector, which serves as your local store-and-forward service for telemetry.

Ensure that you give the Splunk Distribution of OpenTelemetry Collector the ability to resolve the network names and make outbound HTTPS network connections to the URLs listed in :ref:`allow-urls` or the domains listed in :ref:`allow-domains`. Verify also the list of :ref:`exposed ports and endpoints <otel-exposed-endpoints>`.

.. _configure-proxy-collector:

Configure proxy settings
----------------------------------

If you need to use a proxy, set one of the following environment variables according to your needs:

- ``HTTP_PROXY``: The HTTP proxy address
- ``HTTPS_PROXY``: The HTTPS proxy address
- ``NO_PROXY``: If you have a proxy, this option sets addresses that don't use the proxy

The following examples show how to set the ``HTTP_PROXY`` and ``HTTPS_PROXY`` environment variable for hosts and containers:

.. tabs::

   .. code-tab:: powershell Windows

      $Env:HTTP_PROXY = "proxy.address:<port>"
      $Env:HTTPS_PROXY = "proxy.address:<port>"

   .. code-tab:: bash Linux

      export HTTPS_PROXY = "proxy.address:<port>"
      export HTTPS_PROXY = "proxy.address:<port>"

   .. code-tab:: yaml Docker compose

      services:
         otelcol:
            environment:
               - HTTP_PROXY='proxy.address:<port>'
               - HTTPS_PROXY='proxy.address:<port>'

   .. code-tab:: bash Docker run

      -e HTTP_PROXY=proxy.address:<port>
      -e HTTPS_PROXY=proxy.address:<port>

   .. code-tab:: yaml Kubernetes

      env:
         - name: HTTP_PROXY
           value: 'proxy.address:<port>'
         - name: HTTPS_PROXY
           value: 'proxy.address:<port>'

   .. code-tab:: yaml Ansible

      - name: Install Splunk OpenTelemetry Collector
        hosts: all
        become: 'yes'
        tasks:
          - name: Include splunk_otel_collector
            include_role:
              name: signalfx.splunk_otel_collector.collector
            vars:
              splunk_access_token: YOUR_ACCESS_TOKEN
              splunk_realm: SPLUNK_REALM
              # Set the proxy address, respectively for http_proxy and https_proxy environment variables
              # It must be a full URL like http://user:pass@10.0.0.42. Not used by Ansible itself.
              splunk_otel_collector_proxy_http: proxy.address:<port>
              splunk_otel_collector_proxy_https: proxy.address:<port>
              # Set the ip or hosts that don't use proxy settings. Only used if splunk_otel_collector_proxy_http
              # or splunk_otel_collector_proxy_https is defined. Default is localhost,127.0.0.1,::1)
              splunk_otel_collector_no_proxy): 127.0.0.1

Restart the Collector after adding these environment variables to your configuration. 

Replace the SignalFx Gateway with the Splunk Distribution of OpenTelemetry Collector
=====================================================================================================

If you are using the SignalFx Gateway, replace it with the Splunk Distribution of OpenTelemetry Collector running in :new-page:`gateway mode <https://docs.splunk.com/Observability/gdi/opentelemetry/deployment-modes.html>`.

.. _allow-urls:

URLs to allow in your network
================================

.. include:: /_includes/realm-note.rst

If your organization's networking security policies require you to individually allow services delivered over the internet, ensure that you allow the following service URLs on your network:

.. code:: shell

   \*.signalfx.com

   \*.<YOUR_REALM>.signalfx.com

If you're unable to allow all URLs as shown here, see :ref:`allow-domains`.

.. _allow-domains:

Domains to allow in your network
==================================================

If you're unable to allow all URLs as described in :ref:`allow-urls`, ensure that you allow the following domains on your network:

.. code:: shell

   # Observability Cloud API base URL (https://dev.splunk.com/observability/docs/apibasics/api_list)
   api.<YOUR_REALM>.signalfx.com

   # Splunk Observability Cloud user interface
   app.<YOUR_REALM>.signalfx.com
   customer-api.<YOUR_REALM>.signalfx.com

   # CDN for Splunk Observability Cloud files and installers
   dl.signalfx.com

   # Backfill API base URL (https://dev.splunk.com/observability/reference/api/backfill/latest)
   backfill.<YOUR_REALM>.signalfx.com

   # Data ingest API base URL (https://dev.splunk.com/observability/docs/datamodel/ingest/)
   ingest.<YOUR_REALM>.signalfx.com

   # SignalFlow API base URL (https://dev.splunk.com/observability/reference/api/signalflow/latest)
   stream.<YOUR_REALM>.signalfx.com

   # RUM ingest endpoint 
   rum-ingest.<YOUR_REALM>.signalfx.com/v1/rum
   
   # For td-agent/Fluentd on Linux and Windows
   packages.treasuredata.com
   
   # For DEB/RPM collector packages
   splunk.jfrog.io 
   
.. note:: For more information, see the :new-page:`Endpoint Summary <https://dev.splunk.com/observability/docs/apibasics/api_list>` topic in the Observability Cloud Developer Guide.
