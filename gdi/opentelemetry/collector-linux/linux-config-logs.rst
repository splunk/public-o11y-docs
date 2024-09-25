.. _otel-install-linux-logs:
.. _linux-config-logs:

***************************************************************
Collect logs for the Collector for Linux
***************************************************************

.. meta::
  
  :description: Describes how to collect logs for the Splunk Distribution of OpenTelemetry Collector for Linux.

Use the Universal Forwarder to send logs to the Splunk platform. See more at :ref:`collector-with-the-uf`.

Fluentd is turned off by default. If you already installed Fluentd on a host, re-install the Collector without Fluentd using the ``--without-fluentd`` option. 

.. _fluentd-manual-config-linux:

Collect Linux logs with Fluentd
===========================================================================

If you have a Log Observer entitlement or want to collect logs for the target host with Fluentd, use the ``--with-fluentd`` option to also install Fluentd when installing the Collector. For example:

.. code-block:: bash

   curl -sSL https://dl.signalfx.com/splunk-otel-collector.sh > /tmp/splunk-otel-collector.sh && \
   sudo sh /tmp/splunk-otel-collector.sh --with-fluentd --realm $SPLUNK_REALM -- $SPLUNK_ACCESS_TOKEN

When turned on, the Fluentd service is configured by default to collect and forward log events with the ``@SPLUNK`` label to the Collector, which then sends these events to the HEC ingest endpoint determined by the ``--realm <SPLUNK_REALM>`` option. For example, ``https://ingest.<SPLUNK_REALM>.signalfx.com/v1/log``.

The following Fluentd plugins are also installed:

* ``capng_c`` for activating Linux capabilities.
* ``fluent-plugin-systemd`` for systemd journal log collection.

Additionally, the following dependencies are installed as prerequisites for the Fluentd plugins:

.. tabs:: 

  .. tab:: Debian-based systems

    * build-essential
    * libcap-ng0
    * libcap-ng-dev
    * pkg-config

  .. tab:: RPM-based systems

    * Development Tools
    * libcap-ng
    * libcap-ng-devel
    * pkgconfig

You can specify the following parameters to configure the package to send log events to a custom Splunk HTTP Event Collector (HEC) endpoint URL:

* ``--hec-url <URL>``
* ``--hec-token <TOKEN>``

HEC lets you send data and application events to a Splunk deployment over the HTTP and Secure HTTP (HTTPS) protocols. See :new-page:`Set up and use HTTP Event Collector in Splunk Web <https://docs.splunk.com/Documentation/Splunk/8.2.1/Data/UsetheHTTPEventCollector>`.

The main Fluentd configuration is installed to ``/etc/otel/collector/fluentd/fluent.conf``. Custom Fluentd source configuration files can be added to the ``/etc/otel/collector/fluentd/conf.d`` directory after installation.

Note the following:

* In this directory, all files with the .conf extension are automatically included by Fluentd.
* The td-agent user must have permissions to access the configuration files and the paths defined within.
* By default, Fluentd is configured to collect systemd journal log events from ``/var/log/journal``.

After any configuration modification, run ``sudo systemctl restart td-agent`` to restart the td-agent service.

If the td-agent package is upgraded after initial installation, you might need to set the Linux capabilities for the new version by performing the following steps for td-agent versions 4.1 or higher:

#. Check for the activated capabilities:

   .. code-block:: bash

      sudo /opt/td-agent/bin/fluent-cap-ctl --get -f /opt/td-agent/bin/ruby
      Capabilities in `` /opt/td-agent/bin/ruby`` ,
      Effective:   dac_override, dac_read_search
      Inheritable: dac_override, dac_read_search
      Permitted:   dac_override, dac_read_search

#. If the output from the previous command does not include ``dac_override`` and ``dac_read_search`` as shown above, run the following commands:

   .. code-block:: bash

      sudo td-agent-gem install capng_c
      sudo /opt/td-agent/bin/fluent-cap-ctl --add "dac_override,dac_read_search" -f /opt/td-agent/bin/ruby
      sudo systemctl daemon-reload
      sudo systemctl restart td-agent


