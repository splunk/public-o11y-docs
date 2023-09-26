**You're getting a “bind: address already in use” error message**

If you see an error message such as “bind: address already in use”,
another resource is already using the port that the current
configuration requires. This resource could be another application, or a
tracing tool such as Jaeger or Zipkin.

You can modify the configuration to use another port. You can modify any
of these endpoints or ports:

-  Receiver endpoint
-  Extensions endpoint
-  Metrics address (if port 8888)

If you see this error message on Kubernetes and you're using Helm
charts, modify the configuration by updating the chart values for both
configuration and exposed ports.
