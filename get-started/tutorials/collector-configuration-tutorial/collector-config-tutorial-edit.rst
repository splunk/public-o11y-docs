.. _collector-config-tutorial-edit:

***********************************************************************
Part 2: Edit the Collector configuration to add new components
***********************************************************************

You edit the Collector configuration file when you need to add new components, functionalities, or settings. For example, the Splunk Distribution of OpenTelemetry Collector includes configured Collector components that collect metrics and prepare the Collector to export data to Splunk Observability Cloud.

In the previous step, you installed the Collector and learned about the Collector configuration file. In the following steps, you will add several components to the default Collector configuration and restart the Collector service to apply the changes. You're going to add the following components:

- Syslog receiver to collect logs over TCP.
- Filter processor to filter data you've collected using the receiver.

See :ref:`about-collector-configuration-tutorial` for an overview of the tutorial.


Locate the default configuration file
=======================================

Using your favorite code or text editor, open the agent_config.yaml file in /etc/otel/collector. As in Part 1 you deployed the Collector in host monitoring mode, this is the configuration file you need to edit.

Take a moment to read through the configuration file. Notice that the agent configuration included in the Splunk distribution already contains several essential components, such as the host metrics receiver and the HEC exporter.


Add the syslog receiver
======================================

Next, add the Syslog receiver. Open the configuration file and add ``syslog:`` inside the ``receivers`` section:

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

After you've added the Syslog receiver, make sure to add it to the receivers's list under ``service.pipelines``. In this case, the pipeline type is ``logs``, since the Syslog receiver collect logs:

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

Now that you configured the Collector to receive syslog logs, you’re going to add the filter processor to exclude all syslog messages with severity level 5, or informational, so that you  export only higher severity logs.

For example, suppose you want to filter the following log:

.. code-block:: text

   *Apr 29 03:02:42: %LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/0, changed state to down

In the agent_config.yaml file, locate the ``processors`` section and add the filter processor. The following snippet filters logs to exclude all messages with severity level 5 or lower:

.. code-block:: yaml

      processors:
        filter/severity_text:
          logs:
            exclude:
              match_type: regexp
                severity_texts:
                - -[5-7]-

The filter processor supports multiple filter operations using regular expressions and the OpenTelemetry Transformation Language (OTTL). When configuring a processor for the first time, take some time to read its documentation. For more information, see :new-page:`OpenTelemetry Transformation Language (OTTL) <https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/README.md>` on GitHub.

Finally, add the filter processor to the same logs pipeline that requires processing:

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

Restarting the service ensures that the Collector reads the new settings and behaves accordingly.


Next step
=====================================

This completes the second part of the tutorial. You've edited the Collector configuration to add new components and applied the configuration to the Collector on your host.

Things might go wrong, though. To learn how to troubleshoot common Collector configuration issues continue to :ref:`collector-config-tutorial-troubleshoot`.


Learn more
========================================

To learn more about the Collector installation and components, see the following resources:

- :ref:`otel-intro`
- :ref:`otel-install-linux`

