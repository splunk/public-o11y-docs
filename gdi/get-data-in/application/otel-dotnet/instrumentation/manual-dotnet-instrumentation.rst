.. _dotnet-otel-manual-instrumentation:

********************************************************************
Manually instrument .NET applications for Splunk Observability Cloud
********************************************************************

.. meta:: 
   :description: Manually instrument your .NET application to add custom attributes to spans or manually generate spans. Keep reading to learn how to manually instrument your .NET application for Observability Cloud. 

The Splunk Distribution of OpenTelementry .NET provides and registers an OpenTracing-compatible global tracer that you can use to instrument your applications manually for Splunk Observability Cloud. Custom or manual instrumentation can be helpful when you need to add custom attributes to spans, or need to generate spans manually.

.. note:: The Splunk Distribution of OpenTelementry .NET supports OpenTracing version 0.12.1 and higher.

To instrument your .NET application manually, follow these steps:

#. Add the OpenTracing dependency to your project:

   .. code-block:: xml

      <PackageReference Include="OpenTracing" Version="0.12.1" />

#. Obtain the ``OpenTracing.Util.GlobalTracer`` instance and create spans:

   .. code-block:: csharp

      using OpenTracing;
      using OpenTracing.Util;

      namespace MyProject
      {
         public class MyClass
         {
            public static async void MyMethod()
            {
               // Obtain the automatically registered OpenTracing.Util.GlobalTracer instance
               var tracer = GlobalTracer.Instance;

               // Create an active span that automatically becomes a child span of any existing span in this context
               using (IScope scope = tracer.BuildSpan("MyTracedFunctionality").StartActive(finishSpanOnDispose: true))
               {
                  var span = scope.Span;
                  span.SetTag("MyTag", "MyValue");
                  span.Log("My Log Statement");

                  var ret = await MyAppFunctionality();

                  span.SetTag("FunctionalityReturned", ret.ToString());
               }
            }
         }
      }

Manually instrument a .NET application
======================================

The automatic instrumentation provides a base you can build on by adding
your own manual instrumentation. By using both automatic and manual
instrumentation, you can better instrument the logic and functionality
of your applications, clients, and frameworks.

To create your custom traces manually, follow these steps:

1. Add the ``System.Diagnostics.DiagnosticSource`` dependency to your
   project:

   .. code:: xml

      <PackageReference Include="System.Diagnostics.DiagnosticSource" Version="7.0.0" />

2. Create an ``ActivitySource`` instance:

   .. code:: csharp

          private static readonly ActivitySource RegisteredActivity = new ActivitySource("Examples.ManualInstrumentations.Registered");

3. Create an ``Activity``. Optionally, set tags:

   .. code:: csharp

              using (var activity = RegisteredActivity.StartActivity("Main"))
              {
                  activity?.SetTag("foo", "bar1");
                  // your logic for Main activity
              }

4. Register your ``ActivitySource`` in OpenTelemetry.AutoInstrumentation
   by setting the ``OTEL_DOTNET_AUTO_TRACES_ADDITIONAL_SOURCES``
   environmental variable. You can set the value to either
   ``Examples.ManualInstrumentations.Registered`` or to
   ``Examples.ManualInstrumentations.*``, which registers the entire
   prefix.

You can see a sample console application with manual instrumentation
`here <../examples/demo/Service/Program.cs>`__.

   Note that an ``Activity`` created for
   ``NonRegistered.ManualInstrumentations`` ``ActivitySource`` is not
   handled by the OpenTelemetry Automatic Instrumentation.

Further reading:

-  `OpenTelemetry.io documentation for .NET Manual
   Instrumentation <https://opentelemetry.io/docs/instrumentation/net/manual/#setting-up-an-activitysource>`__
