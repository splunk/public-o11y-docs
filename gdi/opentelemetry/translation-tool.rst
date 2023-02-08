.. _otel-translation-tool:

*************************************************************************
Configuration translation tool
*************************************************************************

.. meta::
      :description: Use this tool to convert a SignalFX Smart Agent YAML configuration file into the Splunk Distribution of OpenTelemetry Collector YAML configuration file.

Use translatesfx to translate your existing Smart Agent configuration file into a configuration that can be used by the Collector. translatesfx is a command-line tool provided by Splunk Observability Cloud. 

.. note::

   With translatesfx you can automate most of the configuration changes when migrating from the Smart Agent to the Splunk OpenTelemetry Collector. Evaluate and test any configuration produced by translatesfx carefully before releasing it into production environments.

There are two approaches to using translatesfx, from the command line or from the GUI.

From the command line
=====================================

To run the tool from the command line, download the executables from the :new-page:`releases page <https://github.com/signalfx/splunk-otel-collector/releases>`. The executables are also contained in the RPM, MSI, and Debian packages as well as the Docker images (version 0.36.1 and higher).

The translatesfx command requires a Smart Agent configuration file as the first argument, and accepts a directory as the optional second argument, which is the working directory used by any Smart Agent `#from` file expansion directives. The translatesfx command uses this working directory to resolve any relative paths to files referenced by any `#from` directives at runtime.

.. code-block:: none

   % translatesfx <sfx-file> [<file expansion working directory>]

If this working directory argument is omitted, translatesfx expands relative file paths using the current working directory:

.. code-block:: none

   % translatesfx path/to/sfx/<config-filename>.yaml
   % translatesfx /etc/signalfx/sa-config.yaml

When translatesfx runs, it sends the translated Collector configuration to the standard output. To write the contents to disk, redirect this output to a new Collector configuration file:

.. code-block:: none

   % translatesfx /etc/signalfx/sa-config.yaml > /etc/signalfxotel-config.yaml

From the GUI
=====================================

#. Access the Smart Agent configuration converter at :new-page:`https://bossofopsando11y.com/configurator/saconverter <https://bossofopsando11y.com/configurator/saconverter>`. This tool is translatesfx with a GUI.
#. Paste your Smart Agent configuration in the :menuselection:`Smart Agent YAML` section of the GUI.

The corresponding translated Collector configuration file is populated in the OpenTelemetry YAML section.

.. image:: /_images/gdi/3886-sa-configuration-tool.png
   :width: 99%
   :alt: View your translated configuration file. 
