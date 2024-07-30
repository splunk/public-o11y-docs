.. _otel-install-linux-tools:
.. _install-linux-tools:

****************************************************************
Install the Collector for Linux using deployment tools
****************************************************************

.. meta::
      :description: Describes how to install the Splunk Distribution of the OpenTelemetry Collector for Windows using deployment tools.

.. toctree::
  :maxdepth: 4
  :hidden:

  Ansible for Linux <deployments-linux-ansible.rst>
  Chef for Linux <deployments-linux-chef.rst>    
  Puppet for Linux <deployments-linux-puppet.rst>
  Salt for Linux <deployments-linux-salt.rst>

The Splunk Distribution of the OpenTelemetry Collector for Linux is a package that provides integrated collection and
forwarding for all data types. Read on to see how to install it using several deployment tools.

.. note:: 
  
  The Splunk Distribution of the OpenTelemetry Collector comes with a default configuration, as detailed in :ref:`linux-config-ootb`. To modify this configuration, refer to :ref:`otel-linux-config`.

Alternatively, you can also install the Collector for Linux:

* Using the installer script. See :ref:`otel-install-linux`. 
* Manually. See :ref:`otel-install-linux-manual`.

.. _install-linux-tools-prereqs:

.. raw:: html

  <embed>
    <h2>Prerequisites<a name="install-windows-tools-prereqs" class="headerlink" href="#install-windows-tools-prereqs" title="Permalink to this headline">¶</a></h2>
  </embed>

.. include:: /_includes/requirements/collector-linux.rst

.. _linux-deployments:

.. raw:: html

  <embed>
    <h2>Available deployment tools<a name="install-linux-tools-prereqs" class="headerlink" href="#install-linux-tools-prereqs" title="Permalink to this headline">¶</a></h2>
  </embed>

The following deployment and configuration management tools for the Splunk Distribution of the OpenTelemetry Collector are available:

.. list-table::       
  :header-rows: 1
  :widths: 20 80
  :width: 100%

  * - Name
    - Description

  * - :strong:`Amazon ECS EC2` (Prometheus only)
    - Splunk provides a task definition to deploy the Splunk Distribution of the OpenTelemetry Collector to ECS EC2. The task definition is a text file, in JSON format, that describes one or more containers that form your application. See :ref:`deployments-ecs-ec2` for the installation instructions.

  * - :strong:`Amazon Fargate` (Prometheus only, no EKS)
    - Splunk provides a guided setup to deploy the Splunk Distribution of the OpenTelemetry Collector on Amazon Fargate as a sidecar (additional container) to Amazon ECS tasks. See :ref:`deployments-fargate` for the installation instructions.

  * - :strong:`Ansible`
    - Use Splunk's Ansible role to install the package configured to collect data (metrics, traces, and logs) from Linux machines and send it to Splunk Observability Cloud. See :ref:`deployment-linux-ansible` for the instructions to download and customize the role.

  * - :strong:`Chef`
    - Use Splunk's cookbook to install the Collector with Chef. See :ref:`deployments-linux-chef` for the installation instructions.

  * - :strong:`Heroku`
    - The Splunk OpenTelemetry Connector for Heroku is a buildpack for the Splunk Distribution of the OpenTelemetry Collector. The buildpack installs and runs the Splunk OpenTelemetry Connector on a Dyno to receive, process and export metric and trace data for Splunk Observability Cloud. See :ref:`heroku` for the steps to install the buildpack.

  * - :strong:`Nomad`
    - Use Nomad to deploy the Collector. See :ref:`deployments-nomad` for the installation instructions.

  * - :strong:`Pivotal Cloud Foundry`
    - You can use one of these three options to deploy the Collector with Pivotal Cloud Foundry (PCF):
      
        - Collector standalone deployment
        - Collector as a sidecar to your app
        - Tanzu Tile

      See more in :ref:`deployments-pivotal-cloudfoundry`.

  * - :strong:`Puppet`
    - Use Splunk's Puppet module to install and configure the package. A module is a collection of resources, classes, files, definition, and templates. To learn how to download and customize the module, see :ref:`deployment-linux-puppet`.

  * - :strong:`Salt`
    - Use Salt to deploy the Collector. For more information, see :ref:`deployments-linux-salt`.

.. note:: See also :ref:`otel_deployments`.

See more in :ref:`deployments-pivotal-cloudfoundry`.

.. raw:: html

  <embed>
    <h2>Next steps<a name="install-linux-next" class="headerlink" href="#install-linux-next" title="Permalink to this headline">¶</a></h2>
  </embed>

.. include:: /_includes/gdi/collector-linux-next-steps.rst











