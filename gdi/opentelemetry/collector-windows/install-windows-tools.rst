.. _otel-install-windows-tools:
.. _install-windows-tools:

****************************************************************
Install the Collector for Windows using deployment tools
****************************************************************

.. meta::
      :description: Describes how to install the Splunk Distribution of the OpenTelemetry Collector for Windows using deployment tools.

.. toctree::
  :maxdepth: 4
  :hidden:

  Ansible for Windows <deployments-windows-ansible.rst>
  Chef for Windows <deployments-windows-chef.rst>  
  Puppet for Windows <deployments-windows-puppet.rst>

The Splunk Distribution of the OpenTelemetry Collector for Windows is a package that provides integrated collection and
forwarding for all data types. Read on to see how to install it using several deployment tools.

.. note:: 
  
  The Splunk Distribution of the OpenTelemetry Collector comes with a default configuration, as detailed in :ref:`windows-config-ootb`. To modify this configuration, refer to :ref:`otel-windows-config`.

  To learn how to obtain logs, see :ref:`windows-config-logs`.

Alternatively, you can also install the Collector for Windows:

* Using the installer script. See :ref:`otel-install-windows`. 
* Using MSI. See :ref:`otel-install-windows-msi`. 
* Manually. See :ref:`otel-install-windows-manual`.

.. _install-windows-tools-prereqs:

.. raw:: html

  <embed>
    <h2>Prerequisites<a name="install-windows-tools-prereqs" class="headerlink" href="#install-windows-tools-prereqs" title="Permalink to this headline">¶</a></h2>
  </embed>

.. include:: /_includes/requirements/collector-windows.rst

.. raw:: html

  <embed>
    <h2>Available deployment tools<a name="install-windows-tools-prereqs" class="headerlink" href="#install-windows-tools-prereqs" title="Permalink to this headline">¶</a></h2>
  </embed>

The following deployment tools to install the Splunk Distribution of the OpenTelemetry Collector are available:

* Use Splunk's Ansible role to install the package configured to collect data (metrics, traces, and logs) from Windows machines and send it to Splunk Observability Cloud. See :ref:`deployment-windows-ansible` for the instructions to download and customize the role.
* Use Splunk's cookbook to install the Collector with Chef. See :ref:`deployments-chef` for the installation instructions.
* Use Splunk's Puppet module to install and configure the package. A module is a collection of resources, classes, files, definition, and templates. To learn how to download and customize the module, see :ref:`deployment-windows-puppet`.

.. note:: See also :ref:`otel_deployments`.

.. raw:: html

  <embed>
    <h2>Next steps<a name="install-windows-next" class="headerlink" href="#install-windows-next" title="Permalink to this headline">¶</a></h2>
  </embed>

.. include:: /_includes/gdi/collector-windows-next-steps.rst











