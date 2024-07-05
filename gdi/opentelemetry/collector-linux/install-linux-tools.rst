.. _otel-install-linux-tools:
.. _install-linux-tools:

****************************************************************
Install the Collector for Windows using deployment tools
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

.. _install-windows-tools-prereqs:

.. raw:: html

  <embed>
    <h2>Prerequisites<a name="install-windows-tools-prereqs" class="headerlink" href="#install-windows-tools-prereqs" title="Permalink to this headline">¶</a></h2>
  </embed>

.. include:: /_includes/requirements/collector-linux.rst

.. raw:: html

  <embed>
    <h2>Available deployment tools<a name="install-linux-tools-prereqs" class="headerlink" href="#install-linux-tools-prereqs" title="Permalink to this headline">¶</a></h2>
  </embed>

The following deployment tools to install the Splunk Distribution of the OpenTelemetry Collector are available:

* Use Splunk's Ansible role to install the package configured to collect data (metrics, traces, and logs) from Linux machines and send it to Splunk Observability Cloud. See :ref:`deployment-linux-ansible` for the instructions to download and customize the role.
* Use Splunk's cookbook to install the Collector with Chef. See :ref:`deployments-linux-chef` for the installation instructions.
* Use Nomad to deploy the Collector. To learn how to install Nomad, see :ref:`deployments-nomad`.
* Use Splunk's Puppet module to install and configure the package. A module is a collection of resources, classes, files, definition, and templates. To learn how to download and customize the module, see :ref:`deployment-linux-puppet`.

.. note:: See also :ref:`otel_deployments`.
  
.. raw:: html

  <embed>
    <h2>Next steps<a name="install-linux-next" class="headerlink" href="#install-linux-next" title="Permalink to this headline">¶</a></h2>
  </embed>

NBED











