.. _instr-troubleshooting:

*****************************************************************
Troubleshoot your instrumentation
*****************************************************************

If you have instrumented an application but are not seeing the relevant data in Splunk APM, use the following guidelines to troubleshoot your instrumentation.

Language-specific troubleshooting
============================================

- :ref:`common-java-troubleshooting`
- :ref:`common-python-troubleshooting`
- :ref:`common-nodejs-troubleshooting`
- :ref:`common-dotnet-troubleshooting`
- :ref:`common-go-troubleshooting`
- :ref:`common-ruby-troubleshooting`

General troubleshooting
============================================

#. If you aren’t seeing your instrumented APM service endpoints, verify that the ``span.kind`` tag is being set correctly. For instance, client spans should have ``span.kind = CLIENT`` and server spans should have ``span.kind = SERVER``. To learn more about ``span.kind``, see the tracing API specification on GitHub: :new-page:`https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/api.md#spankind <https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/api.md#spankind.>`.

#. Make sure the application for the relevant runtime is active. Traces can only be captured from the inbound traffic to the application.

#. Check that the runtime to which you attached the instrumentation agent has started. For example, for Java you can run ``jps -lvm`` in the command line to list all active Java processes. The output of the command is the list of the JVMs currently running in the machine. Make sure the JVM in question appears among them. If not, the JVM failed to start, and you should check the JVM or application logs to find the cause of the problem.

#. Check that the instrumentation is applied to the runtime. For example, for Java you can confirm that the ``javaagent`` was correctly attached in the configuration by exposing the following:

    .. code-block:: shell

        me@my-application:~$ jps -lvm
        24910 root.war -Xmx512m -ea
        -javaagent:/otel/splunk-otel-javaagent.jar
        -Dotel.resource.attributes="service.name=billing,environment=test"

        24914 jdk.jcmd/sun.tools.jps.Jps -lvm
        -Dapplication.home=/usr/lib/jvm/jdk-11.0.10 -Xms8m
        -Djdk.module.main=jdk.jcmd

        my-application:~ me$

    If the output above doesn't contain the ``-javaagent`` section for the JVM in question, the parameter specified in the startup script was not picked up. To proceed, debug the startup scripts to see where the added or modified parameters are being lost.

#. Check that the additional startup parameters are correctly passed to the runtime. When the parameters are passed correctly, the service name appears in the value of ``service.name``. For instance, the example above refers to ``service.name=billing,environment=test``.

If steps 1-5 don't help you with your problem, enable debugging mode for the instrumentation, then check the ``STDOUT`` and ``STDERR`` logs. Search for error messages containing the term ``opentelemetry``. These error message might reveal problems similar to the following example, which exposes a misconfigured Collector endpoint:

    .. code-block:: bash

        2021-03-24 13:01:28.597  INFO 1 --- [           main]
        o.hibernate.annotations.common.Version   : HCANN000001: Hibernate
        Commons Annotations {5.1.0.Final}

        [opentelemetry.auto.trace 2021-03-24 13:01:29:072 +0000]
        [BatchSpanProcessor_WorkerThread-1] WARN
        io.opentelemetry.exporter.jaeger.thrift.JaegerThriftSpanExporter
        - Failed to export spans

        io.jaegertracing.internal.exceptions.SenderException: Could not send 16 spans

            at
        io.jaegertracing.thrift.internal.senders.HttpSender.send(HttpSender.java:69)

        ... stacktrace cut for brevity ...

            at
        io.jaegertracing.thrift.internal.senders.HttpSender.send(HttpSender.java:67)

        2021-03-24 13:01:29.831  INFO 1 --- [           main]
        org.hibernate.dialect.Dialect            : HHH000400: Using
        dialect: org.hibernate.dialect.MySQL57Dialect

If the preceding steps don't help you resolve your instrumentation issues, contact :ref:`support`.
