.. _jenkins:

Jenkins
=======

.. meta::
   :description: Use this Splunk Observability Cloud integration for the Jenkins monitor. See benefits, install, configuration, and metrics

The :ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>`
uses the :ref:`Smart Agent receiver <smartagent-receiver>` with the
``jenkins`` monitor type to collect metrics from Jenkins instances by
hitting the following endpoints:

-  Job metrics with the ``../api/json`` endpoint.
-  Codahale or Dropwizard JVM metrics with the
   ``metrics/<MetricsKey>/..`` endpoint.

This integration is only available on Kubernetes and Linux.

.. note:: The Jenkins integration requires Jenkins version 1.580.3 or higher and the :new-page:`Jenkins Metrics plugin <https://plugins.jenkins.io/metrics/>`.

Benefits
--------

.. include:: /_includes/benefits.rst

Installation
------------

.. include:: /_includes/collector-installation-linux.rst

Configuration
-------------

.. include:: /_includes/configuration.rst

Example
~~~~~~~

To activate this integration, add the following to your Collector
configuration:

.. code:: yaml

   receivers:
     smartagent/jenkins:
       type: collectd/jenkins
       ...  # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/jenkins]

Sample YAML configurations
~~~~~~~~~~~~~~~~~~~~~~~~~~

See the following sample YAML configurations:

.. code:: yaml

   receivers:
     smartagent/jenkins:
       type: collectd/jenkins
       host: 127.0.0.1
       port: 8080
       metricsKey: reallylongmetricskey

Sample YAML configuration with specific enhanced metrics included:

.. code:: yaml

   receivers:
     smartagent/jenkins:
       type: collectd/jenkins
       host: 127.0.0.1
       port: 8080
       metricsKey: reallylongmetricskey
       includeMetrics:
       - "vm.daemon.count"
       - "vm.terminated.count"

Sample YAML configuration with all enhanced metrics included:

.. code:: yaml

   receivers:
     smartagent/jenkins:
       type: collectd/jenkins
       host: 127.0.0.1
       port: 8080
       metricsKey: reallylongmetricskey
       enhancedMetrics: true

Configuration settings
~~~~~~~~~~~~~~~~~~~~~~

The following table shows the configuration options for this monitor:

.. list-table::
   :widths: 18 18 18 18
   :header-rows: 1

   - 

      - Option
      - Required
      - Type
      - Description
   - 

      - ``pythonBinary``
      - no
      - ``string``
      - Path to a python binary used to execute the Python code. If not
         set, a built-in runtime will be used. Can include arguments to
         the binary as well.
   - 

      - ``host``
      - **yes**
      - ``string``
      - 
   - 

      - ``port``
      - **yes**
      - ``integer``
      - 
   - 

      - ``path``
      - no
      - ``string``
      - 
   - 

      - ``metricsKey``
      - **yes**
      - ``string``
      - Key required for collecting metrics. The access key located at
         ``Manage Jenkins > Configure System > Metrics > ADD.`` If
         empty, select ``Generate``.
   - 

      - ``enhancedMetrics``
      - no
      - ``bool``
      - Whether to activate enhanced metrics (**default:** ``false``)
   - 

      - ``includeMetrics``
      - no
      - ``list of strings``
      - Used to activate individual enhanced metrics when
         ``enhancedMetrics`` is set to ``false``
   - 

      - ``username``
      - no
      - ``string``
      - User with security access to Jenkins
   - 

      - ``apiToken``
      - no
      - ``string``
      - API Token of the user
   - 

      - ``useHTTPS``
      - no
      - ``bool``
      - Whether to activate HTTPS. (**default:** ``false``)
   - 

      - ``sslKeyFile``
      - no
      - ``string``
      - Path to the keyfile
   - 

      - ``sslCertificate``
      - no
      - ``string``
      - Path to the certificate
   - 

      - ``sslCACerts``
      - no
      - ``string``
      - Path to the ca file
   - 

      - ``skipVerify``
      - no
      - ``bool``
      - Skip SSL certificate validation (**default:** ``false``)

Metrics
-------

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/collectd/jenkins/metadata.yaml"></div>


Notes
~~~~~

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
