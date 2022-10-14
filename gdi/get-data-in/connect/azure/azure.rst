.. _get-started-azure:

**************************************************************
Connect to Azure and send data to Splunk Observability Cloud
**************************************************************

.. meta::
  :description: Connect your Microsoft Azure account to Splunk Observability Cloud.

.. toctree::
  :hidden:

  azure-metrics
  azure-logs-ingestion

Splunk Observability Cloud provides an integration with Microsoft Azure, lets you travel through Azure entities, and includes built-in dashboards to help you monitor Azure services. See the list of :ref:`available Azure services <azure-integrations>`.

After you connect your Azure account to Observability Cloud, you can do the following:

- Import Azure metrics, traces, and metadata.
- Use Observability Cloud tools to monitor your Azure services.
- Filter Azure monitoring results using tags or dimensions such as ``region`` and ``host name``.

.. raw:: html

  <embed>
    <h2>Azure integration prerequisites<a name="azure-integration-prereqs" class="headerlink" href="#azure-integration-prereqs" title="Permalink to this headline">¶</a></h2>
  </embed>

Successful integration requires administrator privileges for the following:

- Your organization in Splunk Observability Cloud.
- Creating a new Azure Active Directory application.

To learn more about these privileges, see the Azure documentation for registering a new app.

.. raw:: html

  <embed>
    <h2>Prepare Azure for the integration<a name="prep-azure-integration" class="headerlink" href="#prep-azure-integration" title="Permalink to this headline">¶</a></h2>
  </embed>

To prepare Microsoft Azure to connect with Splunk Observability Cloud: 

#. Create an Azure Active Directory application.
#. Specify subscriptions and set subscription permissions.

You also have the option of connecting to Azure through the Observability Cloud API. For details, see :new-page:`Integrate Microsoft Azure Monitoring with Splunk Observability Cloud <https://dev.splunk.com/observability/docs/integrations/msazure_integration_overview/>` in the Splunk developer documentation.

.. raw:: html

  <embed>
    <h3>Create an Azure Active Directory application<a name="prep-ms-app" class="headerlink" href="#prep-ms-app" title="Permalink to this headline">¶</a></h3>
  </embed>

Follow these steps to create a new Azure Active Directory application:

  #. In your Azure portal, navigate to :menuselection:`Azure Active Directory`, and register your new app. Observability Cloud does not use this information, but you need to provide it in order to create an app on Azure.
  #. The Azure portal displays a summary about the application. Save the following information to use when you create your Azure integration in Observability Cloud:
      * :guilabel:`Display name`
      * :guilabel:`Application (client) ID`
      * :guilabel:`Directory (tenant) ID`
      * :guilabel:`Object ID`
  #. Select :guilabel:`Certificates & settings`. The Certificate is your public key, and the client secret is your password.
  #. Create a client secret by providing a description and setting the duration to the longest possible interval, then select :guilabel:`Save`. Save the client secret, you need it to create your Azure integration in Observability Cloud.

Repeat these steps for each subscription you want to monitor.

.. raw:: html

  <embed>
    <h3>Specify subscriptions and set subscription permissions<a name="prep-ms-subs" class="headerlink" href="#prep-ms-subs" title="Permalink to this headline">¶</a></h3>
  </embed>

Set your subscription permissions:

  #. In the Azure portal, look for your :guilabel:`Subscriptions`.
  #. Find a subscription you want to monitor, and select the subscription name.
  #. Navigate to :menuselection:`Access control (IAM)`, select :menuselection:`Add`, then select :menuselection:`Add role assignment`.
  #. On the :guilabel:`Add role assignment page`, perform the following steps:
      * From the :guilabel:`Role` drop-down list, select :menuselection:`Monitoring Reader`.
      * Leave the :guilabel:`Assign access to` drop-down list unchanged.
      * In the :guilabel:`Select` text box, start entering the name of the Azure application you just created. The Azure portal automatically suggests names as you type. Enter the application name, and :guilabel:`Save`.

Repeat these steps for each subscription you want to monitor.

.. raw:: html

  <embed>
    <h2>Connect to Azure<a name="connect-to-azure" class="headerlink" href="#connect-to-azure" title="Permalink to this headline">¶</a></h2>
  </embed>

From Splunk Observability Cloud, connect to Azure by following these steps:

  #. In the left navigation menu, select :menuselection:`Data Management`, and select :guilabel:`Add Integration` to open the Integrate Your Data page.
  #. In the integration filter menu, go to :guilabel:`By Use Case`, and select the :guilabel:`Monitor Infrastructure` use case.
  #. Select the :guilabel:`Microsoft Azure` tile to open the Microsoft Azure guided setup.
  #. To start configuring the connection to Azure, select :guilabel:`New Integration`.
  #. In the text boxes for Splunk Infrastructure Monitoring setup, enter the following information:
      * :guilabel:`Name`: Unique name for this connection to Azure. The name field helps you create multiple connections to Azure, each with its own name.
      * :guilabel:`Directory ID`: Azure Directory ID you saved in a previous step.
      * :guilabel:`App ID`: The Azure app (client) ID you saved in a previous step.
      * :guilabel:`Client Secret`: The client secret (password) you saved in a previous step.
  #. Select the type of Azure connection you created in the previous steps:
      * :guilabel:`Azure Government` for an Azure Government instance.
      * :guilabel:`Azure` for all other Azure connections.
  #. Select the rate at which you want Splunk Observability Cloud to poll Azure for metric data, with 1 minute (default) as the minimum unit, and 10 minutes as the maximum unit. For example, a value of 300 polls metrics once every 5 minutes. Poll rate is expressed in seconds.       
  #. Optional: Use the :guilabel:`Add Tag` button to create a tag if you want to monitor only tagged data sources, filling out the ``tag name`` and ``tag value`` fields separately to create a tag pair.
  #. :guilabel:`Save`. Observability Cloud saves the connection details and attempts to validate the integration. A :ok:`Validated!` message confirms that the integration was successful.

Splunk Observability Cloud begins receiving metrics from Azure for the subscriptions and services that you specified in the Observability Cloud settings for your Azure connection.

.. note:: Splunk is not responsible for data availability, and it can take up to several minutes (or longer, depending on your configuration) from the time you connect until you start seeing valid data from your account. 

.. raw:: html

  <embed>
    <h3>Connect to Azure using the Splunk Observability Cloud API<a name="connect-to-azure-using-API" class="headerlink" href="#connect-to-azure-using-API" title="Permalink to this headline">¶</a></h3>
  </embed>

You can use the Splunk API to integrate Azure with Splunk Observability Cloud.

For instructions on how to connect to Azure through the API, see :new-page:`Integrate Microsoft Azure monitoring with Splunk Observability Cloud <https://dev.splunk.com/observability/docs/integrations/msazure_integration_overview/>` in the Splunk developer documentation.

.. note:: Azure tag filtering configured through the UI applies an ``OR`` operator to the ``name:value`` pairs that you specify in separate fields. Values for ``tag name`` and ``tag value`` are what you anticipate for monitored data sources. To apply more complex rules not governed exclusively by the OR operator, connect to Azure through the Observability Cloud API and modify the contents of the ``resourceFilterRules`` field there.

.. raw:: html

  <embed>
    <h3>Install the Splunk Distribution of OpenTelemetry Collector<a name="install-splunk-otel-collector" class="headerlink" href="#install-splunk-otel-collector" title="Permalink to this headline">¶</a></h3>
  </embed>

If you installed Azure while going through the Quick Start guide, continue by installing the :new-page:`Splunk Distribution of OpenTelemetry Collector <https://docs.splunk.com/Observability/gdi/opentelemetry/resources.html>`.

The Azure integration provides an Azure mode for the :new-page:`navigator <https://docs.splunk.com/Observability/infrastructure/navigators/navigators.html#nav-Splunk-Infrastructure-Monitoring-navigators>`, and includes :new-page:`default dashboards <https://docs.splunk.com/Observability/infrastructure/navigators/azure.html#use-default-dashboards-to-monitor-azure-services>` to help you monitor Microsoft Azure services.

You can also connect to Azure and the subscriptions and services running on it by using the Splunk Distribution of OpenTelemetry Collector. To learn more, see :ref:`otel-intro`.

The Collector offers a higher degree of customization than the Azure integration, and you might prefer it if you want to see metrics at a resolution lower than one minute, or when you need fine-grained control over the filtering of what metrics are sent.

.. raw:: html

  <embed>
    <h2>Next steps<a name="next-azure-steps" class="headerlink" href="#next-azure-steps" title="Permalink to this headline">¶</a></h2>
  </embed>

To validate your setup, examine the details of your Azure integration as displayed in the list at the end of the setup page.

* For details about the metrics provided by a GCP integration, see :ref:`azure-metrics`.
* To send logs from GCP to Observability Cloud, follow the instructions in :ref:`ingest-azure-log-data`.
* Learn about :ref:`our Azure Infrastructure Monitoring options <infrastructure-azure>`. 
