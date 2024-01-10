.. _hana:

SAP HANA
========

.. meta::
   :description: Use this Splunk Observability Cloud integration for the SAP HANA monitor. See benefits, install, configuration, and metrics

The
:ref:`Splunk Distribution of OpenTelemetry Collector <otel-intro>`
uses the :ref:`Smart Agent receiver <smartagent-receiver>` with the
``hana`` monitor type to get metrics from an SAP Hana database.

This integration is available on Kubernetes, Linux, and Windows.

Benefits
--------

.. include:: /_includes/benefits.rst

Prequisites
-----------

A monitoring user requires SELECT access to the relevant monitoring views. Before configuring the SAP HANA monitor type, run the following SQL script to create a monitoring role and apply it to a monitoring user:

.. code-block:: SQL

   --Create the user
   CREATE RESTRICTED USER otel_monitoring_user PASSWORD <password>;

   --Enable user login
   ALTER USER otel_monitoring_user ENABLE CLIENT CONNECT;

   --Create the monitoring role
   CREATE ROLE OTEL_MONITORING;

   --Grant permissions to the relevant views
   GRANT CATALOG READ TO OTEL_MONITORING;
   GRANT SELECT ON SYS.M_BACKUP_CATALOG TO OTEL_MONITORING;
   GRANT SELECT ON SYS.M_BLOCKED_TRANSACTIONS TO OTEL_MONITORING;
   GRANT SELECT ON SYS.M_CONNECTIONS TO OTEL_MONITORING;
   GRANT SELECT ON SYS.M_CS_ALL_COLUMNS TO OTEL_MONITORING;
   GRANT SELECT ON SYS.M_CS_TABLES TO OTEL_MONITORING;
   GRANT SELECT ON SYS.M_DATABASE TO OTEL_MONITORING;
   GRANT SELECT ON SYS.M_DISKS TO OTEL_MONITORING;
   GRANT SELECT ON SYS.M_HOST_RESOURCE_UTILIZATION TO OTEL_MONITORING;
   GRANT SELECT ON SYS.M_LICENSES TO OTEL_MONITORING;
   GRANT SELECT ON SYS.M_RS_TABLES TO OTEL_MONITORING;
   GRANT SELECT ON SYS.M_SERVICE_COMPONENT_MEMORY TO OTEL_MONITORING;
   GRANT SELECT ON SYS.M_SERVICE_MEMORY TO OTEL_MONITORING;
   GRANT SELECT ON SYS.M_SERVICE_REPLICATION TO OTEL_MONITORING;
   GRANT SELECT ON SYS.M_SERVICE_STATISTICS TO OTEL_MONITORING;
   GRANT SELECT ON SYS.M_SERVICE_THREADS TO OTEL_MONITORING;
   GRANT SELECT ON SYS.M_SERVICES TO OTEL_MONITORING;
   GRANT SELECT ON SYS.M_VOLUME_IO_TOTAL_STATISTICS TO OTEL_MONITORING;
   GRANT SELECT ON SYS.M_WORKLOAD TO OTEL_MONITORING;
   GRANT SELECT ON _SYS_STATISTICS.STATISTICS_CURRENT_ALERTS TO OTEL_MONITORING;

   --Add the OTEL_MONITOR role to the monitoring user
   GRANT OTEL_MONITORING TO otel_monitoring_user;

Installation
------------

.. include:: /_includes/collector-installation.rst

Configuration
-------------

.. include:: /_includes/configuration.rst

Example
~~~~~~~

To activate this integration, add the following to your Collector
configuration:

.. code:: yaml

   receivers:
     smartagent/hana:
       type: hana
       ... # Additional config

See additional configuration options:

.. code:: yaml

   receivers:
     smartagent/hana:
       type: hana
       host: myhost.hana.us.hanacloud.ondemand.com
       port: <sap_hana_port>
       username: <username>
       password: <password>

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers: [smartagent/hana]

Configuration settings
~~~~~~~~~~~~~~~~~~~~~~

The following table shows the configuration options for this
integration:

.. list-table::
   :widths: 18 18 18 18
   :header-rows: 1

   - 

      - Option
      - Required
      - Type
      - Description
   - 

      - ``tlsServerName``
      - no
      - ``string``
      - ``ServerName`` to verify the host name. This option defaults to
         ``Host`` if not specified.
   - 

      - ``insecureSkipVerify``
      - no
      - ``bool``
      - Controls whether a client verifies the server's certificate
         chain and host name. The default value is ``false``.
   - 

      - ``rootCAFiles``
      - no
      - ``list of strings``
      - Path to root certificate (optional)

Metrics
-------

These are the metrics and dimensions available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/hana/metadata.yaml"></div>

Notes
~~~~~

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
