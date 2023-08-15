.. _otel-translation-tool:
.. _translatefx:

*************************************************************************
Configuration translation rules and tool
*************************************************************************

.. meta::
      :description: Use this tool to convert a SignalFX Smart Agent YAML configuration file into the Splunk Distribution of OpenTelemetry Collector YAML configuration file.

``translatesfx`` is a command-line tool provided by Splunk Observability Cloud that helps you translate your existing Smart Agent YAML configuration file into a configuration that can be used by the Collector.  

.. caution::

   With ``translatesfx`` you can automate most of the configuration changes when migrating from the Smart Agent to the Splunk OpenTelemetry Collector. Evaluate and test any configuration produced by ``translatesfx`` carefully before releasing it into production environments.

Configuration translation rules
==========================================================================

To transform a Smart Agent configuration file into a Collector config file, you need to map the original parameters using the Collector's :ref:`configuration syntax <otel-configuration>`.  

See the samples below:

Original Smart Agent config
------------------------------------------------------------

.. code-block::

   signalFxAccessToken: {"#from": "env:SFX_ACCESS_TOKEN"}
   ingestUrl: {"#from": "ingest_url", default: "https://ingest.signalfx.com"}
   apiUrl: {"#from": "api_url", default: "https://api.signalfx.com"}
   traceEndpointUrl: {"#from": 'trace_endpoint_url', default: "https://ingest.signalfx.com/v2/trace"}

   intervalSeconds: 10
         
   logging:
      level: info
         
   monitors:
      - {"#from": "monitors/*.yaml", flatten: true, optional: true}
      - type: memory            
      

Collector config output
------------------------------

.. code-block::      
      
   receivers:
      smartagent/cpu:
         type: cpu
      smartagent/load:
         type: load
      smartagent/memory:
         type: memory
   exporters:
      signalfx:
         access_token: ${SFX_ACCESS_TOKEN}
            realm: us1
   service:
     pipelines:
       metrics:
         receivers:
           - smartagent/cpu
           - smartagent/load
           - smartagent/memory
         exporters:
           - signalfx

.. note::

   Learn more in :new-page:`the GitHub documentation <https://github.com/signalfx/splunk-otel-collector/tree/main/cmd/translatesfx>` on ``translatefx``.

Use the configuration translation tool
==========================================================================

There are two approaches to using ``translatesfx``, either from the command line or from the GUI.

From the command line
------------------------------

To run the tool from the command line, download the executables from the :new-page:`releases page <https://github.com/signalfx/splunk-otel-collector/releases>`. The executables are also contained in the RPM, MSI, and Debian packages as well as the Docker images (version 0.36.1 and higher).

The ``translatesfx`` command requires a Smart Agent configuration file as the first argument, and accepts a directory as the optional second argument, which is the working directory used by any Smart Agent `#from` file expansion directives. The ``translatesfx`` command uses this working directory to resolve any relative paths to files referenced by any `#from` directives at runtime.

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
------------------------------

#. Access the Smart Agent configuration converter at :new-page:`https://bossofopsando11y.com/configurator/saconverter <https://bossofopsando11y.com/configurator/saconverter>`. 
#. Paste your Smart Agent configuration in the :menuselection:`Smart Agent YAML` section of the GUI.

The corresponding translated Collector configuration file is populated in the OpenTelemetry YAML section.

.. image:: /_images/gdi/3886-sa-configuration-tool.png
   :width: 80%
   :alt: View your translated configuration file. 

