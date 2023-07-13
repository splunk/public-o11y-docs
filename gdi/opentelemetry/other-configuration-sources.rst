.. _otel-other-configuration-sources:

******************************************************************
Other configuration sources (Alpha/Beta)
******************************************************************

.. meta::
      :description: Configure these optional components to retrieve data from specific configuration sources. After retrieving the data, you can then insert the data into your Splunk Distribution of OpenTelemetry Collector configuration.

In addition to the Collector packages and Fluentd, the following components can be configured:

* :ref:`Environment variable (Alpha) <env-variable-config-source>`
* :ref:`etcd2 (Alpha) <etcd2-config-source>`
* :ref:`Include config source (Beta) <include-config-source>`
* :ref:`Vault (Alpha) <vault-config-source>`
* :ref:`Zookeeper (Alpha) <zookeeper-config-source>`

.. note::

   :strong:`Alpha` and :strong:`Beta` refer to configurations that might not be stable and might be limited in their capabilities. These configurations can change without notice.   
   
   While in the alpha stage, breaking changes might be introduced in a new release. 

.. _env-variable-config-source:

Environment variable (Alpha)
===================================
Use the environmental variable configuration source instead of direct references to environment variables in the configuration to inject YAML fragments or to have default values in case the selected environment variable is undefined. See :new-page:`Environment Variable Config Source (Alpha) <https://github.com/signalfx/splunk-otel-collector/blob/main/internal/configsource/envvarconfigsource/README.md>` in GitHub to copy the configuration YAML file.

.. _etcd2-config-source:

etcd2 (Alpha)
===============
Use the etcd2 configuration source to retrieve data from etcd2 and inject it into your configuration. See :new-page:`etcd2 configuration source (Alpha) <https://github.com/signalfx/splunk-otel-collector/tree/main/internal/configsource/etcd2configsource>` in GitHub to copy the configuration YAML file.

.. _include-config-source:

Include config source (Beta)
================================

Use the include configuration source to inject :new-page:`Go templates <https://pkg.go.dev/text/template>` or plain files into the configuration. The configuration source can be used to insert scalar data or complete YAML sections. See :new-page:`Include Config Source (Beta) <https://github.com/signalfx/splunk-otel-collector/tree/main/internal/configsource/includeconfigsource>` in GitHub to copy the configuration YAML file.

.. _vault-config-source:

Vault (Alpha)
==================
Use the Vault configuration source to retrieve data from Vault and inject it into your configuration YAML. This configuration supports these features:

* Dynamic secrets
* Key-value version 1 lease hints
* Key-value version 2 metadata polling

See :new-page:`Vault configuration source (Alpha) <https://github.com/signalfx/splunk-otel-collector/tree/main/internal/configsource/vaultconfigsource>` in GitHub to copy the configuration YAML.

.. _zookeeper-config-source:

Zookeeper (Alpha)
====================
Use the Zookeeper configuration source to retrieve data from Zookeeper and inject it into your configuration. See :new-page:`Zookeeper configuration source (Alpha) <https://github.com/signalfx/splunk-otel-collector/tree/main/internal/configsource/zookeeperconfigsource>` in GitHub to copy the configuration YAML file.
