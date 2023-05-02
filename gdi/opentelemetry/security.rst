.. _otel-security:

***********************************************************
Security guidelines, permissions, and dependencies
***********************************************************

.. meta::
      :description: Security landing. Describes how to ensure that the Splunk Distribution of OpenTelemetry Collector is secure.

The Splunk Distribution of OpenTelemetry Collector defaults to operating in a secure manner, but is configuration driven, so you need at least a basic understanding of architecture and functionality to manage security. See :ref:`collector-architecture` and :ref:`otel-deployment-mode` for more information.

.. caution:: Do not report security vulnerabilities by using public GitHub issue reports. See :new-page:`Report a Security Vulnerability <https://www.splunk.com/en_us/product-security/report.html>` to report security issues.

Security guidelines
=====================

For end users
---------------------------------
Follow these guidelines when using the Collector.

Configure the Collector
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
1. Activate the minimum required components in the configuration.
2. Ensure that sensitive configuration information is stored securely.

Set permissions 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
1. Do not not run Collector as root or admin user.
2. Configure require privileged access for components as necessary.

Configure receivers and exporters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
1. Use encryption and authentication.
2. Make sure configuration parameters are modified properly to reduce security risks.

Configure processors
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
1. Configure obfuscation or scrubbing of sensitive metadata.
2. Configure all recommended processors.

Configure extensions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Do not expose sensitive health or telemetry data.

For developers
---------------------------------
Follow these general guidelines:

* Get the configuration information from the Collector configuration file.
* Use configuration helper functions.

Configure the Collector
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
1. Use the central configuration file.
2. Use configuration helpers.

Set permissions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
1. Minimize privileged access.
2. Document what requires privileged access and why.

Configure receivers and exporters
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
1. Configure receivers and exporters to default to encrypted connections.
2. Configure receivers and exporters to use helper functions. See :new-page:`exporter helper <https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/exporterhelper/README.md>` in GitHub for more information. 

Configure extensions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Configure extensions to not expose sensitive health or telemetry data by default.

General configuration
===========================

The Collector binary does not contain an embedded or default configuration, so you need to specify a configuration file before you start it. The configuration file passed to the Collector must be validated prior to loading. If an invalid configuration is detected, the Collector must fail to start as a protective mechanism.

The configuration drives the Collector's behavior, and care must be taken to ensure that the configuration only activates the minimum set of capabilities and, as such, exposes the minimum set of required ports. See :ref:`otel-exposed-endpoints` for more information. In addition, any incoming or outgoing communication must leverage TLS and authentication.

The Collector keeps the configuration in memory, but where the configuration is loaded from at start time depends on the packaging used. For example, in Kubernetes secrets and ConfigMaps can be used, but in Docker, the image embeds the configuration in the container where is it not stored in an encrypted manner by default.

The configuration might contain the following sensitive information:

* Authentication information such as API tokens
* TLS certificates including private keys

Sensitive information must be stored securely such as on an encrypted file system or secret store. Environment variables can be used to handle sensitive and non-sensitive data, as the Collector must support environment variable expansion. See :new-page:`Configuration Environment Variables <https://opentelemetry.io/docs/collector/configuration/#configuration-environment-variables>` for more information.

More information on configuring OpenTelemetry components is provided in the following sections.

Permissions
------------------------
The Collector supports running as a custom user and must not be run as a root or admin user. For the majority of use cases, the Collector does not require privileged access to function. Some components might require privileged access; be careful when activating these components. Collector components might also require external permissions including network access or RBAC.

More information about permissions is provided in the following sections.

Receivers and exporters
------------------------------------------------
Receivers and exporters can be either push-based or pull-based. In either case, the connection must be established over a secure and authenticated channel. Unused receivers and exporters must be deactivated to minimize the attack vector of the Collector. An attack vector is a pathway or method used by a hacker to illegally access a network or computer in an attempt to exploit system vulnerabilities.

Receivers and exporters might expose buffer, queue, payload, and worker settings by using configuration parameters. If these settings are available, end users can carefully modify the default values. Improperly setting these values might expose the Collector to additional attack vectors including resource exhaustion.

It is possible that a receiver might require the Collector to run in a privileged mode to operate, which could be a security concern.

Developers must use encrypted connections (by using the ``insecure: false`` configuration setting), and receiver and exporter helper functions.

Processors
------------------------
Processors function between receivers and exporters, and they are responsible for processing the data in some way. From a security perspective, they are useful in the following ways.

.. _rec-processor-config:

Recommended configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Processors are not activated by default. Depending on the data source, you might activate multiple processors. Processors must be activated for every data source, and not all processors support all data sources.

Keep in mind that the order of processors matters. The order in each section below is the best practice. Refer to the individual processor documentation for more information.

Traces

1. ``memory_limiter`` processor
2. Any sampling processors
3. Any processor relying on sending source from context (for example, ``k8sattributes``)
4. ``batch`` processor
5. All other processors

Metrics

1. ``memory_limiter`` processor
2. Any processor relying on sending source from context (for example, ``k8sattributes``)
3. All other processors

Scrubbing sensitive data
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
It is common for to use the Collector to scrub sensitive data before exporting it to a back end. This is especially important when sending the data to a third-party back end. Configure the Collector to obfuscate or scrub sensitive data before exporting.

Safeguards around resource utilization
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In addition, processors offer safeguards around resource utilization. The ``batch`` and ``memory_limiter`` processors help ensure that the Collector is resource efficient and does not run out of memory when overloaded. At a minimum, activate these two processors on every defined pipeline. See ref:`rec-processor-config` for more information.

Extensions
----------------------
While receivers, processors, and exporters handle telemetry data directly, extensions typically serve different needs, as described in the following sections.

Health and telemetry
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The initial extensions provided health check information, Collector metrics and traces, and the ability to generate and collect profiling data. When activated with their default settings, all of these extensions except the health check extension are only accessibly locally to the Collector. Proceed with caution when configuring these extensions for remote access, as sensitive information might be exposed as a result.

Forwarding
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
A forwarding extension is typically used when some telemetry data not natively supported by the Collector needs to be collected. For example, the ``http_forwarder`` extension can receive and forward HTTP payloads. Forwarding extensions are similar to receivers and exporters, so the same security considerations apply.

Observers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
An observer is capable of performing service discovery of endpoints. Other components such as receivers can subscribe to these extensions to be notified of endpoints coming or going. Observers can require certain permissions to perform service discovery. For example, the ``k8s_observer`` requires certain RBAC permissions in Kubernetes, while the ``host_observer`` requires the Collector to run in privileged mode.

Subprocesses
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Extensions can also be used to run subprocesses, which can be useful for collection mechanisms that cannot natively be run by the Collector (for example, FluentBit). Subprocesses expose a completely separate attack vector that would depend on the subprocess itself. In general, care should be taken before running any subprocesses alongside the Collector.

Dependencies
=============================

The Splunk Distribution of OpenTelemetry Collector relies on a variety of external :new-page:`dependencies <https://github.com/signalfx/splunk-otel-collector/network/dependencies>`. These dependencies are monitored by :new-page:`Dependabot <https://docs.github.com/en/code-security/supply-chain-security/configuring-dependabot-security-updates>`. Dependencies are :new-page:`checked daily <https://github.com/signalfx/splunk-otel-collector/blob/main/.github/dependabot.yml>` and associated pull requests are opened automatically. 

Upgrade to the :new-page:`latest release <https://github.com/signalfx/splunk-otel-collector/releases>` to ensure that you have the latest security updates. If a security vulnerability is detected for a dependency of this project, it might be due to one of the following reasons:

* You are running an older release.
* A new release with the updates has not been released.
* The updated dependency has not been merged likely due to some breaking change (in this case, we will actively work to resolve the issue and open a tracking GitHub issues with details).
* The dependency has not released an updated version with the patch.