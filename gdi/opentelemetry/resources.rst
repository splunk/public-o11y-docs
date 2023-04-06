.. _opentelemetry-resources:

*********************************************************************************
Overview of the Splunk Distribution of OpenTelemetry Collector
*********************************************************************************

.. meta::
   :description: Resources for using the Splunk Distribution of OpenTelemetry Collector: Architecture, Components, Monitoring, Security, Troubleshooting.

This page provides an overview of the resources available for using the Splunk Distribution of OpenTelemetry Collector. To learn more, see :ref:`otel-collector-use-case`.

.. _otel-using:

Get started
====================

The following table describes everything you need to start using the Collector:

.. list-table::
  :widths: 25 75
  :header-rows: 1

  *   - Resource
      - Description
  *   - Access token
      - Use an access token to track and manage your resource usage. Where you see ``<access_token>``, replace it with the name of your access token. See :ref:`admin-org-tokens`.
  *   - Realm
      - A realm is a self-contained deployment that hosts organizations. You can find your realm name on your profile page in the user interface. Where you see ``<REALM>``, replace it with the name of your organization's realm. See :new-page:`realms <https://dev.splunk.com/observability/docs/realms_in_endpoints/>`.   
  *   - Agent or Gateway mode
      - In Agent mode, the Collector runs with the application or on the same host as the application. In Gateway mode, one or more collectors run a standalone service, for example, a container or deployment. See :ref:`otel-deployment-mode`.
  *   - Ports and endpoints
      - Check exposed ports to make sure your environment doesn't have conflicts and that firewalls are configured. You can change the ports in the Collector configuration. See :ref:`otel-exposed-endpoints`.

See also :ref:`otel-requirements`.

Install and configure the Collector
==========================================

Learn how to install, deploy, upgrade or uninstall the Collector in :ref:`otel-install-platform`.

This distribution is supported on and packaged for a variety of platforms, including:

- Kubernetes: :ref:`Helm <helm-chart>` and :ref:`YAML <resource-yaml-manifests>`.
- Linux: :ref:`installer script <linux-scripts>`, :ref:`Ansible <deployment-linux-ansible>`, :ref:`Puppet <deployment-linux-puppet>`, :ref:`Heroku <linux-heroku>`, and :ref:`manual <linux-manual>` (including DEB/RPM packages, Docker, and binary).
- Windows: :ref:`installer script <windows-script>`, :ref:`Ansible <deployment-windows-ansible>`, :ref:`Puppet <deployment-windows-puppet>`, and :ref:`manual <otel-install-windows-manual>` (including MSI with GUI and PowerShell).

After you've installed the Collector, see :ref:`otel-configuration` and :ref:`otel-other-configuration-sources`.

.. _otel-monitoring:

Monitor the Collector
=============================================

The default configuration automatically scrapes the Collector's own metrics and sends the data using the ``signalfx`` exporter. A built-in dashboard provides information about the health and status of Collector instances. In addition, logs are automatically collected for the Collector and Journald processes.

The Collector also offers zPages, which provide in-process web pages that display collected data from the process that they're attached to. zPages are useful for in-process diagnostics without having to depend on any back end to examine traces or metrics.

Troubleshooting
=============================================

See :ref:`Troubleshooting <otel-troubleshooting>` to resolve common issues using the OpenTelemetry Collector and the Splunk Distribution of OpenTelemetry Collector.
