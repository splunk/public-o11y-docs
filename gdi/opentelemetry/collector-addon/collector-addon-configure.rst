.. _collector-addon-configure:

*********************************************************************************************
Configure the Technical Add-on for the Splunk OpenTelemetry Collector
*********************************************************************************************

.. meta::
   :description: Configure the Technical Add-on for the Splunk Distribution of the OpenTelemetry Collector.

.. toctree::
   :maxdepth: 5
   :hidden:

To configure the OpenTelemetry Collector within the Add-on, follow these steps:

#. Create a new configuration file in YAML format for the Collector. See more at :ref:`otel-configuration`.
#. Edit the default version of your inputs.conf file to point to the new configuration file.
#. Restart the Splunk Universal Forwarder.

Activate trace collection
============================================================================================================================================

The Splunk Add-on for the OpenTelemetry Collector does not perform automatic tracing. 

To configure the Splunk Add-on for OpenTelemetry Collector to receive traces from your applications, see :ref:`get-started-application`.

.. _collector-addon-configure-multiple:

Manage multiple Collectors
============================================================================================================================================

If your configuration uses more than one Collector, consider the following best practices:

* Deploy different agent_config.yaml files to different hosts. For example, a version of the add-on with MySQL Receiver enabled, and a different version of the add-on with MS SQL Server Receiver enabled will work best when deployed on different hosts.

* Deploy the same files to every host, then point to another agent_config.yaml file in inputs.conf in the splunk_config_dir or splunk_config_yaml properties.

* Deploy the same instance of the Splunk Add-on for the OpenTelemetry Collector to all hosts, then deploy another instance of the add-on that does not contain binaries and only contains a YAML file with a specific receiver enabled. In this case, the YAML file from the second add-on instance will supersede the YAML from the first add-on instance on a particular host.

* Designate one instance of the Splunk Add-on for the OpenTelemetry Collector as your default Collector, tailor it to your needs, and then create variants of the add-on using a different name. Then deploy each variant to a different server class.


