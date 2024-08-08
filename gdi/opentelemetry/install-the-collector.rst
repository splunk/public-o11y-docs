.. _otel-install-platform:
.. _otel-configuration:
.. _otel-understand-use:

***********************************************************************************
Get started: Understand and use the Collector  
***********************************************************************************

.. meta::
      :description: Describes platform-specific installation information for the Splunk Distribution of OpenTelemetry Collector. Also covers how to configure the Splunk Distribution of OpenTelemetry Collector. There are a variety of default configuration files available, as well additional components that can be configured.

.. toctree::
    :maxdepth: 4
    :titlesonly:
    :hidden:

    Deployment modes <deployment-modes.rst>
    other-configuration-sources.rst
    data-processing.rst
    tags.rst
    collector-how-to.rst
    Remove data pre-ingest <configure-remove.rst>    
    environment-variables.rst
    Internal metrics <metrics-internal-collector.rst>
    logs-collector-splunk-tutorial/about-logs-collector-splunk-tutorial.rst    

For a quick overview of the Collector, see :ref:`otel-intro`.  

Get started with the available options to install, deploy, and configure the Splunk Distribution of the OpenTelemetry Collector. Next, learn how to use the Collector.

* See :ref:`collector-architecture` for compatible CPU architectures and operating systems. 
* See :ref:`otel-deployment-mode` for information on the two deployment modes for the Collector: :ref:`host monitoring (agent) mode <collector-agent-mode>`, and :ref:`data forwarding (gateway) mode <collector-gateway-mode>`.

.. raw:: html

  <embed>
    <h2>Install the Collector using packages and deployment tools<a name="collector-package-install" class="headerlink" href="#collector-package-install" title="Permalink to this headline">¶</a></h2>
  </embed>

The Splunk Distribution of OpenTelemetry Collector is supported on Kubernetes, Linux, Windows, and Mac. Use one of the following packages to gather data for Splunk Observability Cloud:

* :ref:`collector-kubernetes-intro`
* :ref:`collector-linux-intro`
* :ref:`collector-windows-intro`
  
See also :ref:`other deployment tools and options <otel_deployments>`.

.. _collector-verify-docker:

.. raw:: html

  <embed>
    <h3>Verify the Docker image of the Collector<a name="collector-verify-docker" class="headerlink" href="#collector-verify-docker" title="Permalink to this headline">¶</a></h2>
  </embed>

Docker images of the Collector are automatically signed.

If you need to verify and trust your software package, use the following public key to verify the Docker images of the Collector for versions 0.93 or higher:

.. code-block::

  -----BEGIN PUBLIC KEY-----
  MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAnQi0COAQC5XgALFAyTW3
  JXiHvXJLIFKK+LKS8iVo0Ec2tsABJ5usp5yCYTENJHoS1fLC5XcY5nyM4fqxjWJK
  3FqDa/inWkryNgpW8Mx5LhjGiIxiBiMnONFh0cZNctbQ7mNTBZgisiwThDTOovtW
  660MCCeZdPAMdSHaDym7GWAQi1tVWMioI2r9s5DUbwbzK5z9z/HZuX9Su2KJxxG6
  TagdZB6EyhkdyV/LR1ud5R/5P2ouRt/DpIj/iSRnkTV28wDRSf//QR75SiyDW2zo
  ph5MmkD88H5aTw22cJ35sFo3S+NLxakrQZzyH1G4oY6vpQ8h0hMYJ9zAJZxA/kzN
  mLZ/V4QVj8tkJaj7igcOKpfatQUu7n6HapCLhoNAcrnDskf23V4PxUJ+MIAN2vwP
  SUMTI2rKrEPpilAKup4l7EsxX2Dm73umh/xyWaKlpw8kAsB9dLuSj3gnh/k3SX6q
  wWkQASkbjBRe+iPrkVcRNfOvIHp/bg8kd5q4JwEIDh4x/JEf/l6zLpEar8hh2dSW
  VbbHBd5Xo9Ge5BjwXOcoDhvUQqNJdLBJruhvhn7Ogy5Paw5TGhdawfjxT2yXeqbE
  Juv6qdo/mSimkpR8lkQT7OsfAQbCPeyFvZKb22hXj6tCTVJncwCJLe/FBdXJhRep
  Y6NEdmKZLGodXv4zLNVr7SkCAwEAAQ==
  -----END PUBLIC KEY-----

For older Collector versions, use this public key: 

.. code-block::

  -----BEGIN PUBLIC KEY-----
  MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAw+sL4Mx2Ip9AxTSp7Iw2
  k69tlJ8RqYNngJyecOLLiQkubgIQdnAkQurTfCPCuCHChvGGw3WCV617oJR25D0h
  NzOvS9wIXc1mEdsHCFbOuAVnJ7GLALmci6sR09jPiQnl2X58+edI/2g6j77G1Lz3
  B/aOK4p70Ro2TTE6Xj6XACeLkAZGu1W3UQfrJiYkGz4PovWMyeF2J88RcwrrdOLn
  i5iFeLR5EL8TtoQCXUyqJFpuXpBkLbMedrpZAODqBcg3iwfeACcguO2X1cCWFXM+
  ubN1fzf2c+WrO3sg8io1cHTctX2GG+9r7DbqRuo0Ejj2D0fTi/JoVBCTXNxn2Drg
  L86Y5+mtpUN+MlnzZRFEbCqN2fC9CO1LlriD+3NKAuW7OVM10S/+eHApUQi1Ao5A
  ABfjRxHWn2SISC5pmgYDeg90Lf0BTjX2+qn1HuJXDZUyD1XEeXedqE+/m9mgEU2s
  uYOqk6ecD/qowv2gvkwd742XvfpZhaMCdehtVJwB5HLAv4VtQQYLECgMrqipAALy
  bAExcAb0i16mMJi2QCPh44BrzcLQW/SZxYr9sg3IQXWBE84XbuzSyHJwBjvyxgf5
  2+TlQ3bUY73ssOe/WV3FAdDHh0ekQdOKO4plPPMXmdYCH2dY5ji5bunY+kKHayT7
  pqX7nYPWHh4c2RvHkE3Tth8CAwEAAQ==
  -----END PUBLIC KEY-----

Images are signed using ``cosign``. To verify them:

#. Save the public key to a file. For example, ``cosign.pub``.
#. Run the following command:

.. code-block:: 

  cosign verify --insecure-ignore-tlog --key cosign.pub quay.io/signalfx/splunk-otel-collector:<collector-version>

.. _otel-config-options:

.. raw:: html

  <embed>
    <h2>Configure the Collector: Config files, auto-config, and other configuration sources<a name="otel-config-options" class="headerlink" href="#otel-config-options" title="Permalink to this headline">¶</a></h2>
  </embed>

Use these configurations to change the default settings in each Collector package:

* Kubernetes: :ref:`Helm configuration <otel-kubernetes-config>`, :ref:`advanced config <otel-kubernetes-config-advanced>`, and :ref:`log config <otel-kubernetes-config-logs>`
* :ref:`otel-linux-config`
* :ref:`otel-windows-config`

.. note:: Splunk Observability Cloud offers several options for no-hassle automatic discovery and configuraiton. Learn more at :ref:`discovery_mode`.

.. _otel-config-multiple-files:

.. raw:: html

  <embed>
    <h3>Use multiple configuration files<a name="otel-config-multiple-files" class="headerlink" href="#otel-config-multiple-files" title="Permalink to this headline">¶</a></h2>
  </embed>

To define multiple config files simultaneously use:

.. code-block::

  ./otelcol --config=file:/path/to/first/file --config=file:/path/to/second/file

.. _otel-config-additional-components:

.. raw:: html

  <embed>
    <h3>Additional configuration sources<a name="otel-config-additional-components" class="headerlink" href="#otel-config-additional-components" title="Permalink to this headline">¶</a></h3>
  </embed>

You can also use these additional :ref:`configuration sources <otel-other-configuration-sources>`:

* :ref:`Environment variable (Alpha) <env-variable-config-source>`
* :ref:`etcd2 (Alpha) <etcd2-config-source>`
* :ref:`Include config source (Beta) <include-config-source>`
* :ref:`Vault (Alpha) <vault-config-source>`
* :ref:`Zookeeper (Alpha) <zookeeper-config-source>`

.. _otel-config-logs:

.. raw:: html

  <embed>
    <h2>Collect logs <a name="otel-config-logs" class="headerlink" href="#otel-config-logs" title="Permalink to this headline">¶</a></h2>
  </embed>

To collect logs with the Splunk Distribution of the OpenTelemetry Collector:

* In Kubernetes environments, native OpenTelemetry log collection is supported by default. See more at :ref:`kubernetes-config-logs`.
* For Linux and Windows environments (physical hosts and virtual machines), use the Universal Forwarder to send logs to the Splunk platform. See more at :ref:`collector-with-the-uf`.

.. note:: If you have a Log Observer entitlement or wish to collect logs for the target host, install and enable Fluentd in your Collector instance. 

.. raw:: html

  <embed>
    <h3>Collect logs using Fluentd <a name="otel-fluentd-artifacts" class="headerlink" href="#otel-fluentd-artifacts" title="Permalink to this headline">¶</a></h2>
  </embed>

The Collector can capture logs using Fluentd, but this option is deactivated by default.

Common sources such as filelog, journald, and Windows Event Viewer are included in the installation. The following table describes the artifacts in the Fluentd directory:

.. list-table::
  :widths: 25 75
  :header-rows: 1

  * - Configuration
    - Description
  * - fluent.conf or td-agent.conf
    - These are the main Fluentd configuration files used to forward events to the Collector. The file locations are ``/etc/otel/collector/fluentd/fluent.conf`` on Linux and ``C:\opt\td-agent\etc\td-agent\td-agent.conf`` on Windows. By default, these files configure Fluentd to include custom Fluentd sources and forward all log events with the ``@SPLUNK`` label to the Collector.
  * - conf.d
    - This directory contains the custom Fluentd configuration files. The location is ``/etc/otel/collector/fluentd/conf.d`` on Linux and ``\opt\td-agent\etc\td-agent\conf.d`` on Windows. All files in this directory ending with the .conf extension are automatically included by Fluentd, including ``\opt\td-agent\etc\td-agent\conf.d\eventlog.conf`` on Windows.
  * - splunk-otel-collector.conf
    - This is the drop-in file for the Fluentd service on Linux. Use this file to override the default Fluentd configuration path in favor of the custom Fluentd configuration file for Linux (fluent.conf).

The following is a sample configuration to collect custom logs:

.. code-block:: xml

  <source>
    @type tail
    @label @SPLUNK
    <parse>
      @type none
    </parse>
    path /path/to/my/custom.log
    pos_file /var/log/td-agent/my-custom-logs.pos
    tag my-custom-logs
  </source>

To learn more about the Fluentd receiver, see :ref:`fluentd-receiver`.

.. raw:: html

  <embed>
    <h2>Use the Collector<a name="collector-use-index" class="headerlink" href="#collector-use-index" title="Permalink to this headline">¶</a></h2>
  </embed>

.. include:: /_includes/collector-works.rst

See also the following documents to understand how the Collector works, and how to use it:

* :ref:`otel-tags`
* :ref:`collector-how-to`
* :ref:`configure-remove`

.. raw:: html

  <embed>
    <h3>Components and services of the Collector<a name="collector-components-index" class="headerlink" href="#collector-components-index" title="Permalink to this headline">¶</a></h3>
  </embed>

.. include:: /_includes/collector-components.rst

.. raw:: html

  <embed>
    <h2>Collector variables and internal metrics<a name="collector-internal" class="headerlink" href="#collector-internal" title="Permalink to this headline">¶</a></h2>
  </embed>

The Collector operates using these environmental variables and internal metrics:

* :ref:`collector-env-var`
* :ref:`metrics-internal-collector`
