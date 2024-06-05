.. _collector-config-tutorial-troubleshoot:

*************************************************************
Part 3: Troubleshoot common Collector configuration issues
*************************************************************

In part 1 and 2 of the tutorial, you installed the Collector and learned how to edits and apply its configuration using a code editor. See :ref:`about-collector-configuration-tutorial` for an overview of the tutorial.

A Collector configuration might fail to apply for numerous reasons, including wrong formatting and invalid configuration values.

In the third and last part of this tutorial, you are going to edit the initial sample.yaml configuration file to generate and fix issues on your own, as well as use diagnostic techniques.


Fix indentation issues
====================================

Indentation issues are one of the most common causes of Collector configuration issues. Try for yourself by opening the sample.yaml file you created in Part 1 and adding the following snippet under receivers:

.. code-block:: yaml

   receivers:
   syslog:
   # Rest of the configuration

Save the file and run ``otelcol validate --config=sample.yaml``. See the resulting Collector output:

.. code-block:: bash

   Error: failed to get config: cannot unmarshal the configuration: 1 error(s) decoding:

   * '' has invalid keys: syslog
   2024/02/19 18:17:36 main.go:89: application run finished with error: failed to get config: cannot unmarshal the configuration: 1 error(s) decoding

To fix this, indent the ``syslog`` receiver line with 2 spaces, so that the whole section reads like the following:

.. code-block:: yaml

   receivers:
     syslog:
     otlp:
       protocols:
         grpc:
           endpoint: "${SPLUNK_LISTEN_INTERFACE}:4317"
         http:
           endpoint: "${SPLUNK_LISTEN_INTERFACE}:4318"

Save the file and run ``otelcol validate --config=sample.yaml`` again. Check that your configuration doesn’t throw an error.


Check the pipelines in the configuration
=========================================

The Collector doesn't throw an error if you define a receiver but don't use it elsewhere in the configuration. This is often a cause of perplexity when data doesn't appear in the back end.

Currently, if you run the Collector, you won't see data appear because of the pipeline missing the new receiver. To fix this, add the ``syslog`` receiver to the pipelines section of sample.yaml configuration file.

The complete file after the edit is as follows:

.. code-block:: yaml

   extensions:
     health_check:
       endpoint: "${SPLUNK_LISTEN_INTERFACE}:13133"

   receivers:
     syslog:
     otlp:
       protocols:
         grpc:
           endpoint: "${SPLUNK_LISTEN_INTERFACE}:4317"
         http:
           endpoint: "${SPLUNK_LISTEN_INTERFACE}:4318"

   processors:
     batch:

   exporters:
     otlp:
       endpoint: "${SPLUNK_GATEWAY_URL}:4317"
       tls:
         insecure: true

   service:
     pipelines:
       traces:
         receivers:
         - otlp
         processors:
         - batch
         exporters:
         - otlp
       logs:
         receivers:
         - syslog
         exporters:
         - otlp
     extensions: [health_check]

If you add a component to a pipeline without defining it first, the Collector also throws an error. Try by deleting ``syslog:`` under the ``receivers`` section and validating the configuration again. You will get an error similar to the following example:

.. code-block:: bash

   Error: service::pipelines::logs: references receiver "syslog" which is not configured
   2024/02/19 18:37:42 main.go:89: application run finished with error: service::pipelines::logs: references receiver "syslog" which is not configured


Verify the Collector status with the health check extension
==============================================================

Now, try verifying that the Collector is online. The health check extension provides a local URL that you can open to verify the status of the Collector. The Splunk Distribution of OpenTelemetry Collector activates this extension by default.

In your Linux machine, open the following URL in the browser to check the status of the Collector service: ``http://localhost:13133``. If everything is running as expected, you get a message similar to the following:

.. code-block:: json

   {
      "status": "Server available",
      "upSince": "2020-11-11T04:12:31.6847174Z",
      "uptime": "49.0132518s"
   }


Monitor your collectors using the built-in dashboard
=======================================================

After you've checked the Collector status, you can use the built-in dashboard in Splunk Observability Cloud to monitor the status of all the collectors you've deployed. The dashboard uses telemetry sent by the Prometheus receiver in the ``metrics/internal`` pipeline.

To access the Collector built-in dashboard, follow these steps:

#. Log in to Splunk Observability Cloud.
#. Select :guilabel:`Dashboards` on the left navigation menu.
#. Use the search bar or browse the page to locate the OpenTelementry Collector tile.
#. Select the link in the tile to access the built-in dashboard.

For more information on the Collector dashboard, see :ref:`collector-builtin-dashboard`.


Generate a report for customer support
===============================================

When all troubleshooting actions fail, you can still gather information for customer support.

The Splunk Distribution of OpenTelemetry Collector includes a script that collects system information and bundle it in a file that you can send to customer support.

From the /etc/otel/collector directory, run the splunk-support-bundle.sh script in your command-line interface. You will get an output similar to the following example in your terminal:

.. code-block:: yaml

   INFO: Creating temporary directory...
   INFO: Checking for commands...
   INFO: Getting configuration...
   INFO: Getting status...
   INFO: Getting logs...
   WARN: Permission denied to directory (/var/log/td-agent).
   INFO: Getting metric information...
   INFO: Getting zpages information...
   INFO: Getting host information...
   INFO: Creating tarball...
   INFO: Support bundle available at: /tmp/splunk-support-bundle-1708263625.tar.gz
         Please attach this to your support case

Send the tar file to customer support with an explanation of the issue. The information in the file will help the support engineers in reproducing the issue on their test environments.


Learn more
====================================

This completes the tutorial. After installing and configuring the Collector, you've practiced all the basic ways of troubleshooting Collector configuration issues.

To learn more about concepts in this tutorial, see the following topics:

- :ref:`otel-deployment-mode`
- :ref:`otel-commands`
- :ref:`otel-data-processing`
- :ref:`otel-troubleshooting`
- :ref:`collector-builtin-dashboard`
