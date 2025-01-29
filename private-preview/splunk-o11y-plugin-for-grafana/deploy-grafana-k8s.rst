:orphan:

.. _deploy-grafana-k8s:

.. include:: /private-preview/splunk-o11y-plugin-for-grafana/toc.rst
    :start-after: :orphan:

***********************************************************************
Deploy the Splunk Observability Cloud plugin for Grafana on Kubernetes
***********************************************************************

Use the following high-level steps to deploy the Splunk Observability Cloud plugin for Grafana on Kubernetes:

#. Ensure that you meet the :ref:`prerequisites <grafana-plugin-prerequisites-k8s>`.
#. :ref:`grafana-plugin-install-k8s`.
#. :ref:`grafana-add-new-data-source-k8s`.
#. :ref:`grafana-import-default-dashboard-k8s`.

.. _grafana-plugin-prerequisites-k8s:

Prerequisites
===============

To deploy and configure the Splunk Observability Cloud plugin for Grafana, ensure that:

* Your Kubernetes cluster is running.
* Your environment meets the requirements to install Grafana. See :new-page:`Install Grafana <https://grafana.com/docs/grafana/latest/setup-grafana/installation/#install-grafana>`.
* You have the Grafana permissions to add a data source and import default dashboards. The required permission level may vary depending on your Grafana settings. 
* You have a Splunk Observability Cloud access token. See :new-page:`Create and manage organization access tokens using Splunk Observability Cloud <https://docs.splunk.com/observability/en/admin/authentication/authentication-tokens/org-tokens.html>`.
    Only Splunk Observability Cloud admins can create and grant access to access tokens.

.. note::
    By default, the Splunk Observability Cloud plugin for Grafana is unsigned. To optionally self-sign the private plugin, see :new-page:`Sign a plugin <https://grafana.com/developers/plugin-tools/publish-a-plugin/sign-a-plugin>`. If you don’t self-sign the plugin, you’ll need to set an environment variable during installation.

.. _grafana-plugin-install-k8s:

Install a new Grafana instance and deploy the Splunk plugin
=============================================================

To deploy the plugin on Kubernetes:

#. Download the plugin from :new-page:`https://voc.splunk.com/preview/grafana_plugin`.
    If you’re unable to access this link, contact your Splunk account team representative.

#. Create a Docker file by referring to the following sample file. Edit the Grafana image version, environment variables, and file paths as needed for your environment.
    - The Splunk plugin is compatible with Grafana versions 10.4.0-11.2.x.
    - If you self-signed the plugin, remove the GF_PLUGINS_ALLOW_LOADING_UNSIGNED_PLUGINS environment variable.

    .. code-block:: none

        FROM grafana/grafana-oss:11.2.5

        ENV GF_PLUGINS_ALLOW_LOADING_UNSIGNED_PLUGINS="cisco-splunko11y-datasource" \

            GF_PATHS_PLUGINS="/usr/share/grafana/grafana-plugins" \

            GF_SERVER_ROOT_URL="%(protocol)s://%(domain)s:%(http_port)s/grafanaplugin/" \

            GF_SERVER_SERVE_FROM_SUB_PATH="true"

        WORKDIR /usr/share/grafana

        USER root

        RUN mkdir -p /usr/share/grafana/grafana-plugins

        COPY cisco-splunko11y-datasource /usr/share/grafana/grafana-plugins/cisco-splunko11y-datasource

        EXPOSE 3000

        USER grafana

        WORKDIR /

        ENTRYPOINT [ "/run.sh" ]

#. Extract cisco-splunko11y-datasource.zip in the same directory where you created the Docker file.

#. To log in to Docker, run:
    .. code-block:: none

        docker login

#. To build the Docker image, run:
    .. code-block:: none

        docker build -t <imageName>:<tagName>
    
    You can use any values for <imageName> and <tagName>. Example command: ``$ docker build -t dockerusr/cisco-splunko11y-datasource:v1``

#. To push the image to Docker, run:
    .. code-block:: none

        docker push <imagePath/><imageName>:<tagName>

    Example command: ``docker push dockeruser/cisco-splunko11y-datasource:v1``

#. To verify that the image successfully pushed to Docker, run:
    .. code-block:: none

            docker images

#. Create a deploy.yaml file with the following contents:
    .. code-block:: yaml

        apiVersion: apps/v1
        kind: Deployment
        metadata:
        name: splunk-grafana
        namespace: default
        spec:
        replicas: 1
        selector:
            matchLabels:
            app: splunk-grafana
        template:
            metadata:
            name: splunk-grafana
            labels:
                app: splunk-grafana
            spec:
            containers:
            - name: grafana-plugin-container
                image: docker.io/<imageName>:<tagName>
                ports:
                - name: grafana
                containerPort: 3000
                volumeMounts:
                - mountPath: /etc/grafana/provisioning/datasources
                name: splunk-basic-cm
                readOnly: false
            volumes:
            - name: splunk-basic-cm
                configMap:
                defaultMode: 420
                name: splunk-basic-cm
        ---

        apiVersion: v1
        kind: Service
        metadata:
        name: splunk-grafana-service
        namespace: default
        spec:
        selector:
            app: splunk-grafana
        type: NodePort 
        ports:
        - port: 3000
            targetPort: 3000
            nodePort: 32001

    The ``port`` number in the sample file refers to the default Grafana port. The sample file creates a ``nodePort`` service. If the ``nodePort`` service is not supported in your deployment environment, configure a :new-page:`ClusterIP service <https://kubernetes.io/docs/concepts/services-networking/cluster-ip-allocation/>` and expose the service.

#. To deploy the file, run:
    .. code-block:: none

        kubectl create -f deploy.yaml

.. _grafana-add-new-data-source-k8s:

Send Splunk Observability Cloud data to Grafana
=================================================

Use one of the following methods to send Splunk Observability Cloud data to Grafana:

* :ref:`grafana-add-new-data-source-k8s-ui`
* :ref:`grafana-add-new-data-source-k8s-configmap`

.. _grafana-add-new-data-source-k8s-ui:

Add a data source with the Grafana user interface
---------------------------------------------------

To add a new data source with the Grafana user interface:

#. Launch the Grafana UI by entering the following URL in your browser:
        .. code-block:: none

            http://<host-name>/<IP-address>:<port>
    
    For <port>, use the port you specified in the deploy.yaml file. For example, \http://10.46.40.67:32001/.
#. In the Grafana main menu, select :guilabel:`Connections` and then :guilabel:`Data sources`.
#. Select :guilabel:`Add new data source`.
#. Search for :guilabel:`Cisco-SplunkO11y-Datasource` and select the plugin.
#. Enter your :guilabel:`Realm`.
    To obtain your realm, navigate to the Splunk Observability Cloud user interface and reference the browser URL, which is in the format <realm>.signalfx.com.
#. Enter your :guilabel:`API Key`.
    To obtain your API key, navigate to the Splunk Observability Cloud user interface. From the main menu, select :guilabel:`Settings` and then :guilabel:`Access Tokens`. Select your organization access token and copy the :guilabel:`Token Secret`.
#. (Optional) To set this data source as the default data source, toggle :guilabel:`Default` on.
#. Select :guilabel:`Save & exit`.

.. _grafana-add-new-data-source-k8s-configmap:

Add a data source with a configuration map
-------------------------------------------

To programmatically add a data source using a configuration map YAML file:

#. Create a data source configuration map named config_basic.yaml with the following content:
    .. code-block:: yaml

        apiVersion: v1
        kind: ConfigMap
        metadata:
        name: splunk-basic-cm
        namespace: default
        data:
        grafana.yaml: |-
        {
            "apiVersion": 1,
            "datasources": [
            {
            "editable": true,
            "name": "Splunk Observability Cloud",
            "type": "cisco-splunko11y-datasource",
            "orgId": 1,
            "isDefault":true,
            "jsonData":{
                "realm":"<splunk-o11y-realm>",
                "apiKey":"<splunk-o11y-access-token>"
            },
            "version": 1,
            }]
            }
    
    - To obtain your ``realm``, navigate to the Splunk Observability Cloud user interface and reference the browser URL, which is in the format <realm>.signalfx.com.

    - To obtain your ``apiKey``, navigate to the Splunk Observability Cloud user interface. From the main menu, select :guilabel:`Settings` and then :guilabel:`Access Tokens`. Select your organization access token and copy the :guilabel:`Token Secret`.

#. To create the configuration map, run:
    .. code-block:: none

        kubectl create -f config_basic.yaml

#. To update the deployment, run:
    .. code-block:: none

        kubectl rollout restart deployment my-deployment splunk-grafana

#. To verify that the data sources were created:
    #. Launch the Grafana UI by entering the following URL in your browser:
            .. code-block:: none

                http://<host-name>/<IP-address>:<port>
    
        For <port>, use the port you specified in the deploy.yaml file. For example, \http://10.46.40.67:32001.
    #. In the Grafana main menu, select :guilabel:`Connections` and then :guilabel:`Data sources`. Verify that your data source appears in the list.

.. _grafana-import-default-dashboard-k8s:

Import default dashboard
==========================

Default dashboards monitor and visualize your Splunk Observability Cloud data on Grafana. The Splunk plugin includes the O11y Basic dashboard, which monitors application performance monitoring data.

To import the default dashboard:

#. Launch the Grafana UI by entering the following URL in your browser:
        .. code-block:: none

            http://<host-name>/<IP-address>:<port>

    For <port>, use the port you specified in the deploy.yaml file. For example, \http://10.46.40.67:32001.
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

Learn how to :ref:`Configure the Splunk Observability Cloud plugin for Grafana <configure-grafana-plugin>`.