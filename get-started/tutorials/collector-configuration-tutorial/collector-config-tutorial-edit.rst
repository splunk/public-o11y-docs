.. _collector-config-tutorial-edit:

***********************************************************************
Part 2: Edit the configuration to activate a new receiver and processor
***********************************************************************

You edit the Collector configuration when you need to add new components, functionalities, or settings. For example, the Splunk Distribution of OpenTelemetry Collector includes preconfigured :ref:`otel-components` that collect metrics and prepare the Collector to export data to Splunk Observability Cloud.

In the following steps, you're going to add several components to the default Collector configuration and restart the Collector service to apply the changes. The components you're going to add are the following:

- :ref:`syslog-receiver` to collect logs over TCP.
- :ref:`filter-processor` to filter data you've collected using the receiver.

Locate the default configuration file
=======================================

Using your favorite code or text editor, open the agent_config.yaml file in ``/etc/otel/collector``. As in Part 1 you deployed the Collector in host monitoring (agent) mode, this is the configuration file you need to edit.

Take a moment to scroll through the configuration file. Notice that the agent configuration included in the Splunk distribution already contains several essential components, such as the host metrics receiver and the HEC exporter.

Add the syslog receiver
======================================

Next, add the :ref:`syslog-receiver`. Open the configuration file and add ``syslog:`` inside the ``receivers`` section:

.. code-block:: yaml

   receivers:
     syslog:

Adding an empty entry like in the previous example is sometimes enough to get started, as components often use default values. In the case of the syslog receiver, you might need to define an address and a protocol:

.. code-block:: yaml

   receivers:
     syslog:
       tcp:
         listen_address: "0.0.0.0:54526"
       protocol: rfc5424

After you've added the ``syslog`` receiver, make sure to add it to the receivers's list under ``service.pipelines``. In this case, the pipeline type is ``logs``, as syslog collect logs:

.. code-block:: yaml
   :emphasize-lines: 8

   service:
     pipelines:
     #
     # Other pipelines
     #
       logs:
         # Add syslog at the end of the list
         receivers: [fluentforward, otlp, syslog]
         processors:
         - memory_limiter
         - batch
         - resourcedetection
         exporters: [splunk_hec, splunk_hec/profiling]

Save the agent_config.yaml configuration file and continue to the next step.


Add the filter processor
====================================

Now that you've configured the Collector to receive syslog logs, you're going to add the filter processor to exclude all syslog messages with severity level 5 (informational), so that you only export more severe logs.

An example of logs that you want to filter is the following:

.. code-block:: text

   *Apr 29 03:02:42: %LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to down

In the agent_config.yaml file, locate the ``processors`` section and add the :ref:`filter-processor`. The following snippet filters logs to exclude all messages with severity level 5 or lower:

.. code-block:: yaml

      processors:
        filter/severity_text:
          logs:
            exclude:
              match_type: regexp
                severity_texts:
                - -[5-7]-

The filter processor supports multiple filter operations using regular expressions and the :new-page:`OpenTelemetry Transformation Language (OTTL) <https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/README.md>`. When configuring a processor for the first time, take some time to read its documentation.

The last step requires adding the filter processor to the same logs pipeline that requires processing:

.. code-block:: yaml
   :emphasize-lines: 13

   service:
     pipelines:
     #
     # Other pipelines
     #
       logs:
         # Add syslog at the end of the list
         receivers: [fluentforward, otlp, syslog]
         processors:
         - memory_limiter
         - batch
         - resourcedetection
         - filter/severity_text
         exporters: [splunk_hec, splunk_hec/profiling]


Save the agent_config.yaml configuration file and continue to the next step.


Restart the Collector
=====================================

To apply the configuration to the Collector running on your Linux machine, restart the Collector service:

.. code-block:: yaml

   sudo systemctl restart splunk-otel-collector

This ensures that the Collector reads the new settings and behaves accordingly.


Next step
=====================================

This completes the second part of the tutorial.

To learn how to troubleshoot common Collector configuration issues continue to :ref:`collector-config-tutorial-troubleshoot`.


Learn more
========================================

To learn more about the Collector install and components, see the following resources:

- :ref:`otel-intro`
- :ref:`otel-install-linux`

