.. _otel-intro:

*******************************************************************************************
Get started with the Splunk Distribution of the OpenTelemetry Collector
*******************************************************************************************

.. meta::
    :description: Install and configure the Splunk Distribution of OpenTelemetry Collector to receive, process, and export metric, trace, and log data for Splunk Observability Cloud. Splunk Observability Cloud offers a guided setup to install the Splunk Distribution of OpenTelemetry Collector. 

.. toctree::
    :maxdepth: 5
    :hidden:

    otel-requirements.rst
    components.rst
    install-the-collector.rst
    Collector for Kubernetes <collector-kubernetes/collector-kubernetes-intro.rst>
    Collector for Linux <collector-linux/collector-linux-intro.rst>
    Collector for Windows <collector-windows/collector-windows-intro.rst> 
    Splunk Add-On for OpenTelemetry Collector <collector-addon/collector-addon-intro.rst>    
    Other deployment tools: ECS EC2, Fargate, Nomad, PCF <deployments/otel-deployments.rst>  
    Automatic discovery of apps and services <discovery-mode.rst>
    Use the Universal Forwarder <collector-with-the-uf.rst>
    Monitor the Collector with built-in dashboards <collector-builtin-dashboard.rst>
    Troubleshooting <troubleshooting.rst>
    Migrate from the Smart Agent to the Collector <smart-agent/smart-agent-migration-to-otel-collector.rst>
    
Use the Splunk Distribution of the OpenTelemetry Collector to ingest, process, and export metric, trace, and log data and metadata in Splunk Observability Cloud.

Learn more about the Splunk Observability Cloud data model at :ref:`data-model`.

.. raw:: html

  <embed>
    <h2>How does the OpenTelemetry Collector work?<a name="collector-intro-how" class="headerlink" href="#collector-intro-how" title="Permalink to this headline">¶</a></h2>
  </embed>



.. raw:: html

   <div class="include-start" id="collector-works.rst"></div>

.. include:: /_includes/collector-works.rst

.. raw:: html

   <div class="include-stop" id="collector-works.rst"></div>




.. raw:: html

  <embed>
    <h3>Understand the Collector distributions<a name="collector-distros" class="headerlink" href="#collector-distros" title="Permalink to this headline">¶</a></h3>
  </embed>
    
The OpenTelemetry Collector is an open-source project that has a core version and contribution (Contrib) versions. The core version provides receivers, processors, and exporters for general use. The Contrib version provides receivers, processors, and exporters for specific vendors and use cases. 

The Splunk Distribution of the OpenTelemetry Collector is a distribution of the OpenTelemetry Collector. It sits on top of the Contrib version, and it bundles components from OpenTelemetry Core, OpenTelemetry Contrib, and other sources to provide data collection for multiple source platforms.  

.. raw:: html

  <embed>
    <h3>Why use the Splunk distribution of the Collector?<a name="collector-distros-splunk" class="headerlink" href="#collector-distros-splunk" title="Permalink to this headline">¶</a></h3>
  </embed>

.. caution::

  Splunk officially supports the Splunk Distribution of the OpenTelemetry Collector. 
  Splunk only provides best-effort support for the upstream OpenTelemetry Collector. See :ref:`using-upstream-otel` for more information.

Splunk Observability Cloud is OTel native and works with any of the Collector versions. However, Splunk can provide better support response for the Splunk distribution. Any changes to the Contrib or Base OpenTelemetry Collector are required to go through the open-source vetting process, which can take some time. If you use the Splunk version, updates and hot fixes are under Splunk control. Note that all major additions to the Splunk version of the Collector do eventually make their way into the Contrib version.

Also, the customizations in the Splunk distribution include these additional features:

* Better defaults for Splunk products
* Discovery mode for metric sources
* Automatic discovery and configuration
  
.. note:: Check out the :new-page:`Splunk Distribution of the OpenTelemetry Collector repo in GitHub <https://github.com/signalfx/splunk-otel-collector>` for more details.

.. raw:: html

  <embed>
    <h2>Data flow in the Splunk Distribution of the OpenTelemetry Collector<a name="splunk-distro-data-flow" class="headerlink" href="#splunk-distro-data-flow" title="Permalink to this headline">¶</a></h2>
  </embed>

Data flow for the Splunk Distribution of the OpenTelemetry Collector depends on your environment. See the sections for Kubernetes, and Linux and Windows.

For more information on how to configure data pipelines, :ref:`otel-data-processing`. 

.. raw:: html

  <embed>
    <h3>Data flow in the Splunk Collector for Kubernetes<a name="splunk-distro-data-flow-kubernetes" class="headerlink" href="#splunk-distro-data-flow-kubernetes" title="Permalink to this headline">¶</a></h3>
  </embed>

The Splunk Distribution of the OpenTelemetry Collector for Kubernetes ingests, manages and exports data as shown in this diagram: 

.. mermaid::
  
  flowchart LR

    accTitle: Splunk Distribution of the OpenTelemetry Collector for Kubernetes diagram.
    accDescr: The Splunk Distribution of OpenTelemetry Collector contains receivers, processors, exporters, and extensions. Receivers gather metrics and logs from infrastructure, and metrics, traces, and logs from back-end applications. Receivers send data to processors, and processors send data to exporters. Exporters send data to Splunk Observability Cloud and Splunk Cloud Platform. Front-end experiences send data directly to Splunk Observability Cloud through RUM instrumentation.

    subgraph "\nSplunk OpenTelemetry Collector for Kubernetes"
    receivers
    processors
    exporters
    extensions
    end

    Infrastructure -- "metrics, logs (native OTel)" --> receivers
    B[Back-end services] -- "traces, metrics, logs (native OTel only)" --> receivers
    C[Front-end experiences] -- "traces" --> S[Splunk Observability Cloud]

    receivers --> processors
    processors --> exporters

    exporters --> S[Splunk Observability Cloud]
    exporters --> P[Splunk Cloud Platform]
    exporters -- "metrics, logs (traces not supported)" --> U[Splunk Enterprise]

.. raw:: html

  <embed>
    <h3>Data flow in the Splunk Collector for Linux and Windows<a name="splunk-distro-data-flow-linux-windows" class="headerlink" href="#splunk-distro-data-flow-linux-windows" title="Permalink to this headline">¶</a></h3>
  </embed>

The Splunk Distribution of the OpenTelemetry Collector for Linux and Windows ingests, manages and exports data as shown in this diagram: 

.. mermaid::
  
  flowchart LR

    accTitle: Splunk Distribution of the OpenTelemetry Collector diagram.
    accDescr: The Splunk Distribution of the OpenTelemetry Collector contains receivers, processors, exporters, and extensions. Receivers gather metrics and logs from infrastructure, and metrics, traces, and logs from back-end applications. Receivers send data to processors, and processors send data to exporters. Exporters send data to Splunk Observability Cloud and Splunk Cloud Platform. Front-end experiences send data directly to Splunk Observability Cloud through RUM instrumentation.

    subgraph "\nSplunk OpenTelemetry Collector for Linux and Windows"
    receivers
    processors
    exporters
    extensions
    end

    Infrastructure -- "metrics" --> receivers
    B[Back-end services] -- "traces, metrics" --> receivers
    C[Front-end experiences] -- "traces" --> S[Splunk Observability Cloud]

    receivers --> processors
    processors --> exporters

    exporters --> S[Splunk Observability Cloud]
    exporters --> P[Splunk Cloud Platform]

.. raw:: html

  <embed>
    <h3>Collect logs <a name="otel-config-logs" class="headerlink" href="#otel-config-logs" title="Permalink to this headline">¶</a></h3>
  </embed>

To collect logs with the Splunk Distribution of the OpenTelemetry Collector:

* In Kubernetes environments, native OpenTelemetry log collection is supported by default. See more at :ref:`kubernetes-config-logs`.
* For Linux and Windows environments (physical hosts and virtual machines), use the Universal Forwarder to send logs to the Splunk platform. See more at :ref:`collector-with-the-uf`.

.. _otel-intro-enterprise:

.. raw:: html

  <embed>
    <h3>Send data to Splunk Enterprise<a name="otel-intro-enterprise" class="headerlink" href="#otel-intro-enterprise" title="Permalink to this headline">¶</a></h3>
  </embed>

If you want to send data to Splunk Enterprise using the Collector:

* For Kubernetes environments, use the Collector to send metrics and logs to Splunk Enterprise. Trace collection is not supported.
* For Linux and Windows environments (physical hosts and virtual machines), use the Universal Forwarder to send metrics and logs to the Splunk platform. See more at :ref:`collector-with-the-uf`. Alternatively, you can use the Collector to forward data to the Splunk platform, but this option is not supported at the moment.

.. _otel-intro-resources:

.. raw:: html

  <embed>
    <h2>Resources and other requirements<a name="otel-intro-resources" class="headerlink" href="#otel-intro-resources" title="Permalink to this headline">¶</a></h2>
  </embed>

To start using the Collector gather the following resources:

.. list-table::
  :widths: 25 75
  :header-rows: 1

  *   - Resource
      - Description
  *   - Access token
      - Use an access token to track and manage your resource usage. Where you see ``<access_token>``, replace it with the name of your access token. Your access token needs to have the ingest authorization scope. See :ref:`admin-org-tokens`.
  *   - Realm
      - A realm is a self-contained deployment that hosts organizations. To find your Splunk realm, see :ref:`Note about realms <about-realms>`.
  *   - Ports and endpoints
      - Check exposed ports to make sure your environment doesn't have conflicts and that firewalls are configured. You can change the ports in the Collector configuration. See :ref:`otel-exposed-endpoints`.

See also :ref:`otel-requirements` for information on:

* :ref:`otel-security`
* :ref:`otel-exposed-endpoints`
* :ref:`otel-sizing`
* :ref:`collector-architecture`

.. raw:: html

  <embed>
    <h2>Install and configure the Splunk Distribution of the OpenTelemetry Collector <a name="otel-intro-install" class="headerlink" href="#otel-intro-install" title="Permalink to this headline">¶</a></h2>
  </embed>

.. raw:: html

  <embed>
    <h3>Deployment modes<a name="collector-intro-deploy" class="headerlink" href="#collector-intro-deploy" title="Permalink to this headline">¶</a></h3>
  </embed>

You can deploy the Collector in two modes: Host monitoring (agent) or data forwarding (gateway) mode:

* In host monitoring (agent) mode, the Collector runs with the application or on the same host as the application. 
* In data forwarding (gateway) mode, one or more Collectors run a standalone service, for example, a container or deployment. 

Learn more at :ref:`otel-deployment-mode`.

.. _collector-guided-install:

.. raw:: html

  <embed>
    <h3>Guided install for the Collector<a name="collector-guided-install" class="headerlink" href="#collector-guided-install" title="Permalink to this headline">¶</a></h2>
  </embed>

Splunk Observability Cloud offers a guided setup to install the Collector:

#. Log in to Splunk Observability Cloud.
#. In the navigation menu, select :menuselection:`Data Management`.
#. Go to the :guilabel:`Available integrations` tab, or select :guilabel:`Add Integration` in the :guilabel:`Deployed integrations` tab.
#. Select one of the platforms in the :guilabel:`Splunk OpenTelemetry Collector` section.
#. Follow the step-by-step process provided in the platform's guided setup.

.. raw:: html

  <embed>
    <h3>Advanced install<a name="collector-intro-install" class="headerlink" href="#collector-intro-install" title="Permalink to this headline">¶</a></h3>
  </embed>

The Splunk Distribution of the OpenTelemetry Collector is supported on and packaged for a variety of platforms, including:

* :ref:`Collector for Kubernetes <collector-kubernetes-intro>`
* :ref:`Collector for Linux <collector-linux-intro>`
* :ref:`Collector for Windows <collector-windows-intro>`   

You can also deploy the Collector with tools such as Amazon ECS EC2, Amazon Fargate, Ansible, Nomad, PCF, or Puppet. Learn more at :ref:`otel_deployments`.

See also :ref:`otel-other-configuration-sources`.

.. _otel-monitoring:

.. raw:: html

  <embed>
    <h2>Monitor the Collector<a name="otel-monitoring" class="headerlink" href="#otel-monitoring" title="Permalink to this headline">¶</a></h2>
  </embed>

Splunk Observability Cloud offers you a wide array of monitoring features, including a built-in dashboard which provides out-of-the-box information about the health and status of your deployed OTel Collector instances. Learn more at :ref:`collector-builtin-dashboard`.

The Collector also offers a :ref:`zPages extension <zpages-extension>`, which provides live data about the Collector. zPages are useful for in-process diagnostics without having to depend on any back end to examine traces or metrics.

.. _otel-using:

.. raw:: html

  <embed>
    <h2>Available features for the Collector<a name="otel-using" class="headerlink" href="#otel-using" title="Permalink to this headline">¶</a></h2>
  </embed>

After installing the Collector, read :ref:`otel-understand-use`.  

* See how to perform common actions and tasks with the Collector at :ref:`collector-how-to`. For example, learn how to :ref:`collector-remove-data` to strip data out of your telemetry, including PII.
* Learn about automatic discovery and zero-code instrumentation (formerly zero configuration auto instrumentation) to detect telemetry data. Automatic discovery allows the Collector to automatically grab traces from your application, and add metrics for certain types of calls. See :ref:`discovery_mode`.

For more information see also:

- :ref:`otel-troubleshooting`. Try these troubleshooting techniques and learn how to open a support request.
- :ref:`otel-collector-scenario`.




