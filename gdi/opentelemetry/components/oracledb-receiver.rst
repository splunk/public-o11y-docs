.. _oracledb:

****************************
Oracle Database receiver
****************************

.. meta::
      :description: The Oracle Database receiver allows the Splunk Distribution of OpenTelemetry Collector to collect metrics from Oracle Database by connecting to it.

The Oracle Database receiver allows the Splunk Distribution of OpenTelemetry Collector to collect metrics from Oracle Database. The receiver connects to an Oracle Database instance and obtains metrics such as the number of physical reads, cumulative CPU
time, and others. The supported pipeline type is ``metrics``. See :ref:`otel-data-processing` for more information.

Get started
======================

Follow these steps to configure and activate the component:

1. Deploy the Splunk Distribution of OpenTelemetry Collector to your host or container platform:
   
   - :ref:`otel-install-linux`
   - :ref:`otel-install-windows`
   - :ref:`otel-install-k8s`

2. Configure the Oracle Database receiver as described in the next section.
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

Sample configurations
----------------------

To activate the Oracle Database receiver, add ``oracledb`` to the ``receivers`` section of your
configuration file, as shown in the following example:

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

To complete the configuration, include the receiver in the ``metrics`` pipeline of the ``service`` section of your
configuration file. For example:

.. code:: yaml

   service:
     pipelines:
       metrics:
         receivers:
           - oracledb

Settings
======================

The following table shows the configuration options for the Oracle Database receiver:

.. raw:: html

   <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/oracledb.yaml"></div>

Metrics
=======================

The following metrics, resource attributes, and attributes, are available.

.. raw:: html

   <div class="metrics-component" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/metric-metadata/oracledbreceiver.yaml"></div>

.. include:: /_includes/activate-deactivate-native-metrics.rst

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst