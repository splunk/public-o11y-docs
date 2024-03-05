.. _rust-requirements:

***************************************************
Rust instrumentation compatibility and requirements
***************************************************

.. meta:: 
    :description: Make sure you've met these requirements before instrumenting a Rust application.

The OpenTelemetry instrumentation for Rust requires the following components:

* Rust
* Cargo. See :new-page:`https://doc.rust-lang.org/cargo/`

Additionally, you need to install the Splunk Distribution of OpenTelemetry Collector. The following distributions are available:

* :ref:`Linux <collector-linux-intro>`
* :ref:`Kubernetes <collector-kubernetes-intro>`
* :ref:`Windows <collector-windows-intro>`

After installing the Collector, make sure that you have an instance of the Collector running in your environment.