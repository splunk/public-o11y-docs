:orphan:

.. _deploy-grafana-helm:

.. include:: /private-preview/splunk-plugin-for-grafana/toc.rst

****************************************************************
Deploy the Splunk plugin for Grafana on the Grafana Helm chart
****************************************************************

Use the following high-level steps to deploy the Splunk plugin for Grafana on the Grafana Helm chart:

#. Ensure that you meet the :ref:`prerequisites <grafana-plugin-prerequisites-helm>`.
#. :ref:`grafana-plugin-install-helm`.
#. :ref:`grafana-add-new-data-source-helm`.
#. :ref:`grafana-import-default-dashboard-helm`.

.. _grafana-plugin-prerequisites-helm:

Prerequisites
===============

To deploy and configure the Splunk plugin for Grafana, ensure that:

* Your environment meets the requirements to install Grafana. See :new-page:`Install Grafana <https://grafana.com/docs/grafana/latest/setup-grafana/installation/#install-grafana>`.
* You have the Grafana permissions to add a data source and import default dashboards. The required permission level may vary depending on your Grafana settings. 
* You have a Splunk Observability Cloud access token. See :new-page:`Create and manage organization access tokens using Splunk Observability Cloud <https://docs.splunk.com/observability/en/admin/authentication/authentication-tokens/org-tokens.html>`.
    Only Splunk Observability Cloud admins can create and grant access to access tokens.

.. _grafana-plugin-install-helm:

Install a new Grafana instance and deploy the Splunk plugin
=============================================================

To deploy the plugin on the Grafana Helm chart:

#. Download the plugin from :new-page:`https://voc.splunk.com/preview/grafana_plugin`.

#. Install the :new-page:`Grafana Helm chart <https://github.com/grafana/helm-charts/tree/main/charts/grafana>`. The Splunk plugin is compatible with Grafana versions 10.4.0-11.2.x.

#. Make the following changes to the values.yaml file:
    #. In the ``env`` section, add an environment variable to allow an unsigned plugin. If you self-signed the plugin, you can skip this skip.
        .. code-block:: yaml

            env:
            
                GF_PLUGINS_ALLOW_LOADING_UNSIGNED_PLUGINS: cisco-splunko11y-datasource
    
    #. In the ``plugins`` section, enter the plugin ZIP path:
        .. code-block:: yaml

            plugins:

                - https://<s3-bucket-path>/grafana-plugin-23.1.0-21.zip;cisco-splunko11y-datasource

    #. In the ``datasources`` section, configure the data source:
        .. code-block:: yaml

            datasources:

              # Splunk Observability Cloud plugin

              datasources.yaml:

                apiVersion: 1

                datasources:
                    
                - name: cisco-splunko11y-datasource

                    type: cisco-splunko11y-datasource
                        
                    isDefault: true

                    editable: true

                    version: 1

                    jsonData:

                      realm: <splunk-o11y-realm>

                      apiKey: <splunk-o11y-access-token>

        - To obtain your ``realm``, navigate to the Splunk Observability Cloud user interface and reference the browser URL, which is in the format <realm>.signalfx.com.

        - To obtain your ``apiKey``, navigate to the Splunk Observability Cloud user interface. From the main menu, select :guilabel:`Settings` and then :guilabel:`Access Tokens`. Select your access token and copy the :guilabel:`Token Secret`.

#. To upgrade the Helm chart with the updates that you made to the values.yaml file, run:
        .. code-block:: none

            helm upgrade <test-release> grafana/grafana -f values.yaml
        
        For <test-release>, enter your preferred release name.
    
#. To expose the service on an external IP, run:
        .. code-block:: none

            kubectl expose service <grafana-service-name> --target-port 3000 --name <external-service-name> --external-ip <external-IP> --port 80

#. To access Grafana by using an external IP, enter the following URL in your browser:
        .. code-block:: none

            http://<external-IP>/login

#. To verify that the data source was created:
        #. In the Grafana main menu, select :guilabel:`Connections` and then :guilabel:`Data sources`.
        #. Verify that your data source appears in the list.

.. _grafana-add-new-data-source-helm:

(Optional) Add a new data source to Grafana
=============================================

To add a new data source with the Grafana user interface:

#. Launch the Grafana UI by entering the following URL in your browser:
        .. code-block:: none

            http://<external-IP>/login

#. In the Grafana main menu, select :guilabel:`Connections` and then :guilabel:`Data sources`.
#. Select :guilabel:`Add new data source`.
#. Search for :guilabel:`Cisco-SplunkO11y-Datasource` and select the plugin.
#. Enter your :guilabel:`Realm`.
    To obtain your realm, navigate to the Splunk Observability Cloud user interface and reference the browser URL, which is in the format <realm>.signalfx.com.
#. Enter your :guilabel:`API Key`.
    To obtain your API key, navigate to the Splunk Observability Cloud user interface. From the main menu, select :guilabel:`Settings` and then :guilabel:`Access Tokens`. Select your organization access token and copy the :guilabel:`Token Secret`.
#. (Optional) To set this data source as the default data source, toggle :guilabel:`Default` on.
#. Select :guilabel:`Save & exit`.

.. _grafana-import-default-dashboard-helm:

Import default dashboard
==========================

Default dashboards monitor and visualize your Splunk Observability Cloud data on Grafana. The Splunk plugin includes the O11y Basic dashboard, which monitors application performance monitoring data.

To import the default dashboard:

#. Launch the Grafana UI by entering the following URL in your browser:
        .. code-block:: none

            http://<external-IP>/login

#. In the Grafana main menu, select :guilabel:`Connections` and then :guilabel:`Data sources`.
#. Select your Splunk Observability Cloud data source.
#. Select the :guilabel:`Dashboards` tab.
#. On the :guilabel:`O11y Basic Dashboard` row, select :guilabel:`Import`.
#. To view or edit the dashboard and its underlying queries:
    #. In the Grafana main menu, select :guilabel:`Dashboards`.
    #. Select :guilabel:`O11y Basic Dashboard`.
        The default realm used for the dashboard is us0. To change the realm, select the settings gear icon on the dashboard. Select :guilabel:`Links`, then :guilabel:`O11y Traces Page`, and update the :guilabel:`URL` for your realm.

Next steps
============

Learn how to :ref:`Configure the Splunk plugin for Grafana <configure-grafana-plugin>`.