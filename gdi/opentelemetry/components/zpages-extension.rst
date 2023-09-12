.. _zpages-extension:

****************************
zPages extension
****************************

.. meta::
      :description: Use the zPages extension to activate an extension that serves zPages, an HTTP endpoint that provides live data for debugging different components

The zPages extension enables an extension that serves zPages, an HTTP endpoint that provides live data for debugging different components that were properly instrumented for such. All core exporters and receivers provide some zPage instrumentation.

zPages are useful for in-process diagnostics without having to depend on any backend to examine traces or metrics.

Get started
======================

The following settings are required:

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



Exposed zPages routes
--------------------------------

The collector exposes the following zPage routes:

ServiceZ
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

ServiceZ gives an overview of the collector services and quick access to the pipelinez, extensionz, and featurez zPages. The page also provides build and runtime information.

Example URL: http://localhost:55679/debug/servicez

PipelineZ
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

PipelineZ brings insight on the running pipelines running in the collector. You can find information on type, if data is mutated and the receivers, processors and exporters that are used for each pipeline.

Example URL: http://localhost:55679/debug/pipelinez

ExtensionZ
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

ExtensionZ shows the extensions that are active in the collector.

Example URL: http://localhost:55679/debug/extensionz

FeatureZ
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

FeatureZ lists the feature gates available along with their current status and description.

Example URL: http://localhost:55679/debug/featurez

TraceZ
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The TraceZ route is available to examine and bucketize spans by latency buckets for example

(0us, 10us, 100us, 1ms, 10ms, 100ms, 1s, 10s, 1m] They also allow you to quickly examine error samples

Example URL: http://localhost:55679/debug/tracez

RpcZ
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Rpcz route is available to help examine statistics of remote procedure calls (RPCs) that are properly instrumented. For example when using gRPC

Example URL: http://localhost:55679/debug/rpcz










.. _zpages-extension-settings:

Settings
======================

The following table shows the configuration options for the zPages extension:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/extension/zpages.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
