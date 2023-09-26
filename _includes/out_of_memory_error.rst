**The Splunk Distribution of OpenTelemetry Collector is out of memory**

If you receive high memory usage or out of memory warnings, do the
following before opening a support case:

1. Verify that you have installed the latest version of the Splunk
   Distribution of OpenTelemetry Collector for Kubernetes.

2. Add or change the ``memory_limiter`` processor in your configuration
   file. For example:

   .. code-block:: yaml

      processors:
        memory_limiter:
           ballast_size_mib: 2000
           check_interval: 5s
              # Check_interval is the time between measurements of memory usage for the  purposes of avoiding goingover the limits. 
              # The default is 0. Values below 1s are not recommended, as this can result in unnecessary CPU consumption.
           limit_mib: 4000
              # ​​Maximum amount of memory, in MiB, targeted to be allocated by the process heap.
              # The total memory usage of the process is typically about 50 MiB higher than this value.
           spike_limit_mib: 500
              # The maximum, in MiB, spike expected between the measurements of memory usage.
           ballast_size_mib: 2000
              # BallastSizeMiB is the size, in MiB, of the ballast size being used by the process.
              # This must match the value of the mem-ballast-size-mib command line option (if used).
              # Otherwise, the memory limiter does not work correctly.

3. Try to reproduce the error and collect a heap dump close to the point
   where the memory kill occurs:

   a. Add the ``pprof`` extension to the component configuration that is
      failing. Make sure you turned on this extension in a pipeline in the
      services section.
   b. Capture the output of the following commands against the
      problematic pod:

   .. code-block:: yaml

      curl http://127.0.0.1:1777/debug/pprof/goroutine?debug=2 (http://127.0.0.1:1777/debug/pprof/goroutine?debug=2)
      curl http://127.0.0.1:1777/debug/pprof/heap > heap.out

For example, if you discover that the pod lasts 5 minutes before it gets
killed:

1. Bounce the pod and collect the first set of data after the
   startup.
2. Wait 3 minutes and collect another set of data. Make sure to label
   the data accordingly.
3. Collect another set of data before the crash, if possible.

How long does it take for the pod to be killed due to memory limit?
Check the logs at the time of the issue to see if there are any obvious
repeating errors.

Gather additional support information, including your end-to-end
architecture information. See :ref:`otel-support-checklist`
