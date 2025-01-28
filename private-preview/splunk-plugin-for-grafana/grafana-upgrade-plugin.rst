:orphan:

.. _grafana-upgrade-plugin:

**************************************
Upgrade the Splunk plugin for Grafana
**************************************

To upgrade the Splunk plugin for Grafana:

#. Download the updated plugin file from <site>.
#. Delete the plugins/cisco-splunko11y-datasource directory.
#. Extract the updated plugin file into the plugins/cisco-splunko11y-datasource directory.
#. Restart the Grafana service.

.. note::
    After you upgrade the plugin, you must reimport the dashboards for every data source to view dashboard enhancements. See :ref:`grafana-reset-dashboards`.