.. _instr-troubleshooting:

*****************************************************************
Troubleshoot your instrumentation
*****************************************************************

If you have instrumented an application but are not seeing the relevant data in Splunk APM, use the following guidelines to troubleshoot your instrumentation. The examples given are specific to Java, but this approach is applicable independent of the runtime.

1. Make sure the application on the relevant runtime is active. Traces can only be captured from the inbound traffic to the application. 
2. Verify that the runtime to which you attached the instrumentation agent has started. For Java, you can run ``jps -lvm`` in the command line to list all active Java processes. The output of the command is the list of the JVMs currently running in the machine. Make sure the JVM in question appears among them. If not, the JVM failed to start, and you should check the JVM or application logs to find the cause of the problem.
3. Verify that the instrumentation is applied to the runtime. This again is specific to the runtime. For Java, you can confirm that the ``javaagent`` was correctly attached in the configuration by exposing the following:

::

    me@my-precious:~$ jps -lvm
    24910 root.war -Xmx512m -ea 
    -javaagent:/otel/splunk-otel-javaagent.jar 
    -Dotel.resource.attributes="service.name=billing,environment=test"

    24914 jdk.jcmd/sun.tools.jps.Jps -lvm 
    -Dapplication.home=/usr/lib/jvm/jdk-11.0.10 -Xms8m 
    -Djdk.module.main=jdk.jcmd

    my-precious:~ me$


.. 

    If the output above does not contain the ``-javaagent`` section for the JVM in question, the parameter specified in the startup script was not picked up. To proceed, you should debug the startup scripts to see where the added or modified parameters are being lost.

4. Verify that the additional startup parameters are correctly passed to the runtime. You should be seeing the service name being applied correctly. For instance, the example above refers to ``service.name=billing,environment=test``.
5. If steps 1-4 reveal nothing of interest, your next step is to check the application ``stdout`` and ``stderr`` logs. Search for error messages containing ``opentelemetry``. This might reveal errors similar to the following, which exposes a misconfigured Collector endpoint:

::

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


.. 

    If you do find any errors, check the error message to solve the problem exposed. If you're in doubt, contact Splunk support at observability-support@splunk.com.

6. The last step is to increase the logging verbosity of the agent by turning on the debug logging. To do so, pass the ``-Dotel.javaagent.debug=true`` startup parameter to the runtime. Note that debug logging is verbose and resource-intensive. Enable debug logging only when needed and disable it when problems are solved.

If the steps above don't help you instrument the service, contact observability-support@splunk.com for further assistance. 