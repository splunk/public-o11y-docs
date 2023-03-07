.. _oracledb:

Oracle Database receiver
****************************

.. meta::
      :description: Use this Splunk Observability Cloud integration for the OracleDB / Oracle Database monitor. See benefits, install, configuration, and metrics">

The Splunk Distribution of OpenTelemetry Collector provides this
integration as the Oracle Database receiver. The receiver connects to an
Oracle Database instance and obtains metrics such as physical reads, CPU
time, and others.

Installation
=======================

Follow these steps to deploy the integration:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   
   - :ref:`otel-install-windows`
   
   - :ref:`otel-install-k8s`

2. Configure the receiver as described in the next section.
3. Restart the Collector.

Create a database user for this monitor
-------------------------------------------

To create an Oracle Database user for this monitor, run the following
commands:

.. code:: sql

    -- Create user and set a password
    CREATE USER <username> IDENTIFIED BY <password>;

Depending on which metrics you collect, you might need to assign the
following permissions to the database user:

-  ``GRANT SELECT ON V_$SESSION TO <username>;``
-  ``GRANT SELECT ON V_$SYSSTAT TO <username>;``
-  ``GRANT SELECT ON V_$RESOURCE_LIMIT TO <username>;``
-  ``GRANT SELECT ON DBA_TABLESPACES TO <username>;``
-  ``GRANT SELECT ON DBA_DATA_FILES TO <username>;``

Configuration
=======================

To activate this monitor in the Splunk Distribution of OpenTelemetry
Collector, make sure that the configuration contains the following:

.. code:: yaml

   receivers:
     oracledb:
       # Refer to Oracle Go Driver go_ora documentation for full connection string options
       datasource: "oracle://<user>:<password>@<host>:<port>/<database>"

To add more than one instance of Oracle Database, add as many entries of
the ``oracledb`` receiver as needed. For example:

.. code:: yaml

   receivers:
     oracledb/aninstance:
       # Refer to Oracle Go Driver go_ora documentation for full connection string options
       datasource: "oracle://<user>:<password>@<host>:<port>/<database>"
     
     oracledb/anotherinstance:
       # Refer to Oracle Go Driver go_ora documentation for full connection string options
       datasource: "oracle://<user>:<password>@<host>:<port>/<database>"

To complete the monitor activation, you must also include the
``oracledb`` receiver item in a ``metrics`` pipeline. To do this, add
the receiver item to the ``service`` > ``pipelines`` > ``metrics`` >
``receivers`` section of your configuration file. For example:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers:
           - oracledb

Configuration options
--------------------------------

The following table shows the configuration options:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/oracledb.yaml"></div>

Metrics
=======================

The following attributes, resource attributes, and metrics are available.

.. raw:: html

  <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/oracledbreceiver.yaml"></div>

Activate or deactivate metrics
---------------------------------

You can activate or deactivate specific metrics by setting the value of the
``enabled`` option to ``true`` or ``false``.

The following example deactivates the ``oracledb.executions`` metric and
activated the ``oracledb.sessions.usage`` metric:

.. code:: yaml

   receivers:
     oracledb:
       datasource: "oracle://otel:password@localhost:51521/XE"
       metrics:
         oracledb.executions:
           enabled: false
         oracledb.sessions.usage:
           enabled: true

Get help
=======================

.. include:: /_includes/troubleshooting-components.rst
