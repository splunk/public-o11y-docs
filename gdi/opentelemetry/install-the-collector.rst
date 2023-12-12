.. _otel-install-platform:

***********************************************************************************
Install and deploy the Collector 
***********************************************************************************

.. meta::
      :description: Describes platform-specific installation information for the Splunk Distribution of OpenTelemetry Collector.

.. toctree::
    :maxdepth: 4
    :titlesonly:
    :hidden:

    Deployment modes <deployment-modes.rst>
    Kubernetes <install-k8s.rst>
    Add-on for AWS EKS <install-k8s-addon-eks.rst>
    Linux (script) <install-linux.rst>
    Linux (manual) <install-linux-manual.rst>    
    Windows (script) <install-windows.rst>
    Windows (manual) <install-windows-manual.rst>
    deployments/otel-deployments.rst
    otel-upgrade.rst
    uninstall-the-collector.rst

See the available options to install the Splunk Distribution of the OpenTelemetry Collector.

.. _collector-guided-install:

.. raw:: html

  <embed>
    <h2>Guided install for the Collector<a name="collector-guided-install" class="headerlink" href="#collector-guided-install" title="Permalink to this headline">¶</a></h2>
  </embed>

Splunk Observability Cloud offers a guided setup to install the Collector:

#. Log in to Splunk Observability Cloud.

#. In the navigation menu, select :menuselection:`Data Management`.
  
#. Select :guilabel:`Add Integration` to open the :guilabel:`Integrate Your Data` page.

#. Select one of the platforms in the :guilabel:`Splunk OpenTelemetry Collector` section.

#. Follow the step-by-step process provided in the platform's guided setup.

.. raw:: html

  <embed>
    <h2>Install using packages and deployment tools<a name="collector-package-install" class="headerlink" href="#collector-package-install" title="Permalink to this headline">¶</a></h2>
  </embed>

The Splunk Distribution of OpenTelemetry Collector is supported on Kubernetes, Linux, Windows, and Mac. See :ref:`collector-architecture` for compatible CPU architectures and operating systems.

Deploy one of the following packages to gather data for Splunk Observability Cloud.

* Splunk Distribution of OpenTelemetry Collector for Kubernetes or ``splunk-otel-collector-chart``. See :ref:`Install on Kubernetes <otel-install-k8s>`. 

  * You can also install the Kubernetes Operator for Auto Instrumentation. See :ref:`zero-config` for more information. 
  * If you're using AWS EKS, you can also install the Collector with the Add-On. Learn how at :ref:`install-k8s-addon-eks`. 

* Splunk Distribution of OpenTelemetry Collector for Linux or ``splunk-otel-collector``. See :ref:`Install on Linux (script) <otel-install-linux>`. 
  
  * For customized installation, see :ref:`Install on Linux (manual) <otel-install-linux-manual>`, including instructions to install using the :ref:`binary file <linux-binary-file>`.

* Splunk Distribution of OpenTelemetry Collector for Windows or ``splunk-otel-collector``. See :ref:`Install on Windows (script) <otel-install-windows>`. 
  
  *   * For customized installation, see :ref:`Install on Windows (manual) <otel-install-windows-manual>`, including instructions for the :ref:`binary file <windows-binary>`.

See also :ref:`other deployment tools and options <otel_deployments>`.

.. raw:: html

  <embed>
    <h2>Components of the Collector<a name="collector-components-index" class="headerlink" href="#collector-components-index" title="Permalink to this headline">¶</a></h2>
  </embed>

.. include:: /_includes/collector-components.rst

To learn how to configure them, see: 

* :ref:`otel-configuration`
* :ref:`otel-configuration-ootb`

