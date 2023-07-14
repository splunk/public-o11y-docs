.. _allow-services:

*****************************************************************
Allow Splunk Observability Cloud services in your network
*****************************************************************

.. meta::
      :description: Options for securing your implementation, including proxies and allow lists for URLs and domains.    

A number of different services make up Splunk Observability Cloud. If your organization has stringent networking security policies that apply to sending data to third parties, use one of the following methods to ensure network access to Splunk Observability Cloud services:

- :ref:`simple-http-proxy`
- :ref:`otel-connector`

.. note:: If you write to http://domain/path, the request must happen on port 80. Similarly, if you write to https://domain/path, the request must happen on port 443. If you want to use a different port, you must use http[s]://domain:port/path

.. _simple-http-proxy:

Use a simple HTTP/HTTPS proxy
================================

If you can get out to the internet using a proxy, then using an HTTP/HTTPS proxy is your simplest option.

Ensure that you give the proxy the ability to resolve the network names and make outbound HTTP/HTTPS network connections to the URLs listed in :ref:`allow-urls` or the domains listed in :ref:`allow-domains`.

.. _otel-connector:

Use the Splunk Distribution of OpenTelemetry Collector
=======================================================================

Use the :new-page:`Splunk Distribution of OpenTelemetry Collector <https://docs.splunk.com/Observability/gdi/opentelemetry/deployment-modes.html>` in data forwarding (gateway) mode. You can forward metrics locally to the Splunk Distribution of OpenTelemetry Collector, which serves as your local store-and-forward service for telemetry.

Ensure that you give the Splunk Distribution of OpenTelemetry Collector the ability to resolve the network names and make outbound HTTPS network connections to the URLs listed in :ref:`allow-urls` or the domains listed in :ref:`allow-domains`. Verify also the list of :ref:`exposed ports and endpoints <otel-exposed-endpoints>`.

.. _configure-proxy-collector:

Configure proxy settings for the Collector
----------------------------------------------

You might have to configure proxy settings for two separate actions:

- Download the Collector files, either through the installer script or manually.
- Allow the Collector to send telemetry through the inline or transparent proxy.

To configure proxy settings, set one of the following environment variables according to your needs and following the best practices for your environment and platform:

- ``HTTP_PROXY``: The HTTP proxy address
- ``HTTPS_PROXY``: The HTTPS proxy address
- ``NO_PROXY``: If you have a proxy, this option sets addresses that don't use the proxy

The following examples show how to set the ``HTTP_PROXY`` and ``HTTPS_PROXY`` environment variable for hosts and containers:

.. tabs::

   .. code-tab:: bash Linux (Systemd)

      # Add proxy settings to the environment for the installer script

      cat <<EOF | sudo tee -a /etc/environment
      NO_PROXY=<address,anotheraddress>
      HTTP_PROXY=http://<proxy.address:port>
      HTTPS_PROXY=http://<proxy.address:port>
      EOF

      # You might need to restart your shell session at this point.

      # Add proxy configuration to the service-proxy.conf
      # file in /etc/systemd/system/splunk-otel-collector.service.d/

      sudo mkdir -p /etc/systemd/system/splunk-otel-collector.service.d/

      cat <<EOF | sudo tee -a /etc/systemd/system/splunk-otel-collector.service.d/service-proxy.conf
      [Service]
      Environment="NO_PROXY=<address,anotheraddress>"
      Environment="HTTP_PROXY=http://<proxy.address:port>"
      Environment="HTTPS_PROXY=http://<proxy.address:port>"
      EOF

      # Reload systemd and splunk-otel-collector service afterwards

      sudo systemctl daemon-reload
      sudo systemctl restart splunk-otel-collector

   .. code-tab:: shell Windows

      # Set proxy settings for Collector communications

      [Environment]::SetEnvironmentVariable(“http_proxy”,”http://<proxy.address:port>”,”Machine”)
      [Environment]::SetEnvironmentVariable("https_proxy","http://<proxy.address:port>","Machine")
      [Environment]::SetEnvironmentVariable("no_proxy","<address>","Machine")
      netsh winhttp set proxy "http://<proxy.address:port>"

      # Set proxy settings to download Collector files

      Set-ItemProperty -Path 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings' -name ProxyServer -Value "http://<proxy.address:port>"
      Set-ItemProperty -Path 'HKCU:\Software\Microsoft\Windows\CurrentVersion\Internet Settings' -name ProxyEnable -Value 1

   .. code-tab:: yaml Docker compose

      services:
         otelcol:
            environment:
               - HTTP_PROXY='<proxy.address:port>'
               - HTTPS_PROXY='<proxy.address:port>'

   .. code-tab:: bash Docker run

      -e HTTP_PROXY=<proxy.address:port>
      -e HTTPS_PROXY=<proxy.address:port>

   .. code-tab:: yaml Kubernetes

      env:
         - name: HTTP_PROXY
           value: '<proxy.address:port>'
         - name: HTTPS_PROXY
           value: '<proxy.address:port>'

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
