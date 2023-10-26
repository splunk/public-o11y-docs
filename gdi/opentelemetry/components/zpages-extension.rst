.. _zpages-extension:

****************************
zPages extension
****************************

.. meta::
      :description: Use the zPages extension to activate an extension that serves zPages, an HTTP endpoint that provides live data for debugging different components.

The zPages extension serves zPages, an HTTP endpoint that provides live data for debugging different components, if they were properly instrumented for such. zPages are useful for in-process diagnostics without having to depend on any backend to examine traces or metrics.

All core exporters and receivers provide some zPage instrumentation.

Get started
======================

The following settings are required to configure the extension:

* ``endpoint``. Specifies the HTTP endpoint that serves zPages. 
  
  * ``localhost:55679`` by default.
  * Use ``localhost:`` to make the ZPages extension available only locally. 
  * Use ``":"`` to make the ZPages extension available on all network interfaces.

See the full list of exposed settings in the section :ref:`zpages-extension-settings`.

Sample configurations
--------------------------------

This is a configuration example for the extension:

.. code-block:: yaml


  extensions:
    zpages:
      endpoint: "localhost:56888"

Exposed zPages routes
--------------------------------

The Collector exposes the following zPage routes:

ServiceZ
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

ServiceZ gives an overview of the Collector services, and provides quick access to the pipelinez, extensionz, and featurez zPages. The page also provides build and runtime information.

For example, :new-page:`http://localhost:55679/debug/servicez <http://localhost:55679/debug/servicez>`.

PipelineZ
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

PipelineZ brings insight on the active pipelines running in the Collector. You can find information on type, whether data is mutated, and the receivers, processors and exporters that are used for each pipeline.

For example, :new-page:`http://localhost:55679/debug/pipelinez <http://localhost:55679/debug/pipelinez>`.

ExtensionZ
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

ExtensionZ shows the extensions that are active in the Collector.

For example, :new-page:`http://localhost:55679/debug/extensionz <http://localhost:55679/debug/extensionz>`.

FeatureZ
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

FeatureZ lists the feature gates available along with their current status and description.

For example, :new-page:`http://localhost:55679/debug/featurez <http://localhost:55679/debug/featurez>`.

TraceZ
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The TraceZ route examines and sorts spans by latency buckets like 0us, 10us, 100us, 1ms, 10ms, 100ms, 1s, 10s, or 1m. They also allow you to quickly examine error samples.

For example, :new-page:`http://localhost:55679/debug/tracez <http://localhost:55679/debug/tracez>`.

RpcZ
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Rpcz route helps examine statistics of remote procedure calls (RPCs) that are properly instrumented, such as gRPC.

For example, :new-page:`http://localhost:55679/debug/rpcz <http://localhost:55679/debug/rpcz>`.

.. _zpages-extension-settings:

Settings
======================

The following table shows the configuration options for the zPages extension:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/extension/zpages.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
