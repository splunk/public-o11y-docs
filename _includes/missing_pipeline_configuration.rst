**You're getting a “2021-10-19T20:18:40.556Z info
builder/receivers_builder.go:112 Ignoring receiver as it is not used by
any pipeline {”kind”: “receiver”, “name”: “” error message**

This error happens when a component (receiver, processor, or exporter)
has been configured, but is not used in a receiver pipeline. For
example, the following error message tells you that the
``smartagent/http`` receiver is configured, but that it is not used by
any pipeline:

.. code-block:: text

   “2021-10-19T20:18:40.556Z info builder/receivers_builder.go:112 Ignoring receiver as it is not used by any pipeline {"kind": "receiver", "name": "smartagent/http"

Once configured, all components must be turned on by using pipelines in
the service section. The service section is used to configure what
components are activated based on the configuration found in the
components sections of your configuration file. If a component is
configured, but not defined within the service section, then it is not
activated.

Here is a sample configuration:

.. code-block:: yaml

   service:
     pipelines:
     # Pipelines can contain multiple subsections, one per pipeline.
       traces:
       # Traces is the pipeline type.
         receivers: [otlp, jaeger, zipkin]
         processors: [memory_limiter, batch]
         exporters: [otlp, jaeger, zipkin]

See :ref:`otel-data-processing` for more information.
