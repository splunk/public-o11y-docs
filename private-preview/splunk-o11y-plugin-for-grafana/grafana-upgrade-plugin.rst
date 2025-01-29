:orphan:

.. _grafana-upgrade-plugin:

.. include:: /private-preview/splunk-o11y-plugin-for-grafana/toc.rst
    :start-after: :orphan:

**********************************************************
Upgrade the Splunk Observability Cloud plugin for Grafana
**********************************************************

To upgrade the Splunk Observability Cloud plugin for Grafana:

#. Download the updated plugin file from :new-page:`https://voc.splunk.com/preview/grafana_plugin`.
    If you’re unable to access this link, contact your Splunk account team representative.
#. Delete the plugins/cisco-splunko11y-datasource directory.
#. Extract the updated plugin file into the plugins/cisco-splunko11y-datasource directory.
#. Restart the Grafana service.

.. note::
    After you upgrade the plugin, you must reimport the dashboards for every data source to view dashboard enhancements. See :ref:`Reset a Grafana dashboard <grafana-reset-dashboards>`.