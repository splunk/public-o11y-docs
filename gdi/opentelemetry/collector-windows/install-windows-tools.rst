.. _otel-install-windows-tools:
.. _install-windows-tools:

****************************************************************
Install the Collector for Windows using deployment tools
****************************************************************

.. meta::
      :description: Describes how to install the Splunk Distribution of OpenTelemetry Collector for Windows using deployment tools.

.. toctree::
  :maxdepth: 4
  :titlesonly:

The Splunk Distribution of the OpenTelemetry Collector for Windows is a package that provides integrated collection and
forwarding for all data types. You can install it using the following deployment tools:

* :ref:`windows-ansible`
* :ref:`windows-chef`
* :ref:`windows-nomad`
* :ref:`windows-puppet`

Alternatively, you can also install the Collector for Windows:

* Using the installer script. See :ref:`otel-install-windows`. 
* Using MSI. See :ref:`otel-install-windows-msi`. 
* Manually. See :ref:`otel-install-windows-manual`.

Prerequisites
==========================

.. include:: /_includes/requirements/collector-windows.rst

.. _windows-ansible:

Ansible
===============================

Splunk provides an Ansible role that installs the package configured to collect data (metrics, traces, and logs) from Windows machines and send that data to Splunk Observability Cloud. See :ref:`deployment-windows-ansible` for the instructions to download and customize the role.

.. _windows-chef:

Chef 
===============================

Splunk provides a cookbook to install the Collector using Chef. See :ref:`deployments-chef` for the installation instructions.

.. _windows-nomad:

Nomad 
===============================

Use Nomad to deploy the Collector. To learn how to install Nomad, see :ref:`deployments-nomad`.

.. _windows-puppet:

Puppet
===============================

Splunk provides a Puppet module to install and configure the package. A module is a collection of resources, classes, files, definition, and templates. To learn how to download and customize the module, see :ref:`deployment-windows-puppet`.

Next steps
==================================

After you have installed the package, see:

* :ref:`windows-config-ootb`.
* :ref:`otel-windows-config`.
* :ref:`collector-how-to`.
* :ref:`use-navigators-imm`.
* View logs and errors in the Windows Event Viewer. Search for "view logs and errors" on :new-page:`Microsoft documentation site <https://docs.microsoft.com/en-us/>` for more information.











