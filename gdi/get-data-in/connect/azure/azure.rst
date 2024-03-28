.. _get-started-azure:

**************************************************************
Connect to Azure and send data to Splunk Observability Cloud
**************************************************************

.. meta::
  :description: Connect your Microsoft Azure account to Splunk Observability Cloud.

.. toctree::
  :hidden:

  Azure metrics <azure-metrics>
  Send Azure logs to Splunk Platform <azure-logs-ingestion>

Splunk Observability Cloud provides an integration with Microsoft Azure, lets you travel through Azure entities, and includes built-in dashboards to help you monitor Azure services. 

See the list of :ref:`available Azure services <azure-integrations>`.

.. note:: 

  Splunk Observability Cloud supports all Azure regular regions, and Azure Government. 

After you connect your Azure account to Splunk Observability Cloud, you can do the following:

- Import Azure metrics, traces, and metadata. 
- Use Splunk Observability Cloud tools to monitor your Azure services, such as :ref:`navigators <use-navigators-imm>` and :ref:`dashboards <azure-dashboards>`.
- Filter Azure monitoring results using tags or dimensions such as ``region`` and ``host name``. When tagging, Splunk Observability Cloud only allows alphanumeric characters, and the underscore and minus symbols. Unsupported characters include ``.``, ``:``, ``/``, ``=``, ``+``, ``@``, and spaces, which are replaced by the underscore character. 
- To retrieve logs, see :ref:`ingest-azure-log-data`.

.. _azure-integration-prereqs:

.. raw:: html

  <embed>
    <h2>Azure integration prerequisites<a name="azure-integration-prereqs" class="headerlink" href="#azure-integration-prereqs" title="Permalink to this headline">¶</a></h2>
  </embed>

Successful integration requires administrator privileges for the following:

- Your organization in Splunk Observability Cloud.
- Creating a new Microsoft Entra ID (formerly Azure Active Directory) application.

To learn more about these privileges, see the Azure documentation for registering a new app.

.. raw:: html

  <embed>
    <h2>Prepare Azure for the integration<a name="prep-azure-integration" class="headerlink" href="#prep-azure-integration" title="Permalink to this headline">¶</a></h2>
  </embed>

To prepare Microsoft Azure to connect with Splunk Observability Cloud: 

#. Create a Microsoft Entra ID (formerly Azure Active Directory) application.
#. Specify subscriptions and set subscription permissions.

.. note:: You need to prepare your Microsoft Account in the Azure console. The following sections summarize the steps you need to follow. For more details, refer to the official Azure documentation.

.. raw:: html

  <embed>
    <h3>Create a Microsoft Entra ID (formerly Azure Active Directory) application<a name="prep-ms-app" class="headerlink" href="#prep-ms-app" title="Permalink to this headline">¶</a></h3>
  </embed>

Follow these steps to create a new Microsoft Entra ID application:

  #. In your Azure portal, navigate to :menuselection:`Microsoft Entra ID`, and register your new app. Splunk Observability Cloud does not use this information, but you need to provide it in order to create an app on Azure.
  #. The Azure portal displays a summary about the application. Save the following information to use when you create your Azure integration in Splunk Observability Cloud:
      * :guilabel:`Directory (tenant) ID`
      * :guilabel:`Application (client) ID`
  #. Select :guilabel:`Certificates & secrets`. The Certificate is your public key, and the client secret is your password.
  #. Create a client secret by providing a description and setting the duration to the longest possible interval, and :guilabel:`Save`. Remember the client secret, you'll need it to create your Azure integration in Splunk Observability Cloud.

.. raw:: html

  <embed>
    <h3>Specify subscriptions and set subscription permissions<a name="prep-ms-subs" class="headerlink" href="#prep-ms-subs" title="Permalink to this headline">¶</a></h3>
  </embed>

Set your subscription permissions:

  #. In the Azure portal, look for your :guilabel:`Subscriptions`.
  #. Find a subscription you want to monitor, and navigate to :menuselection:`Access control (IAM)`
  #. Select :menuselection:`Add`, then select :menuselection:`Add role assignment`.
  #. On the :guilabel:`Add role assignment page`, from the :guilabel:`Role` drop-down list, select :menuselection:`Monitoring Reader`.

Repeat these steps for each subscription you want to monitor.

.. raw:: html

  <embed>
    <h2>Connect to Azure with the guided setup<a name="connect-to-azure" class="headerlink" href="#connect-to-azure" title="Permalink to this headline">¶</a></h2>
  </embed>

From Splunk Observability Cloud, connect to Azure using the :new-page:`Microsoft Azure guided setup <https://login.signalfx.com/#/integrations/azure>`. 

Optionally, you can navigate to the guided setup on your own:

  #. In the navigation menu, select :menuselection:`Data Management > Add Integration` to open the Integrate Your Data page.

  #. In the integration filter menu, go to :guilabel:`By Use Case`, and select the :guilabel:`Monitor Infrastructure` use case.

  #. Select the :guilabel:`Microsoft Azure` tile to open the Microsoft Azure guided setup.

  #. To start configuring the connection to Azure, select :guilabel:`New Integration`.

To create the integration, enter the following information:
  
* :guilabel:`Name`: Unique name for this connection to Azure. The name field helps you create multiple connections to Azure, each with its own name.

* :guilabel:`Directory ID`: Azure Directory ID you saved in a previous step.

* :guilabel:`App ID`: The Azure app (client) ID you saved in a previous step.

* :guilabel:`Client Secret`: The client secret (password) you saved in a previous step.
  
* Select your Azure environment: 
  
  * :guilabel:`Azure Government` for an Azure Government instance.
  
  * :guilabel:`Azure` for all other Azure connections.
  
* Select the services you want to monitor. By default, all services are selected. Use the pop-up menu to narrow down to specific services.

* Select the subscriptions you want to monitor.
  
* Optional: Use the :guilabel:`Add Tag` button to create a tag if you want to monitor only tagged data sources, filling out the ``tag name`` and ``tag value`` fields separately to create a tag pair.

* Add any additional services.

* Select the rate, in seconds, at which you want Splunk Observability Cloud to poll Azure for metric data, with 60 seconds (default) as the minimum unit, and 600 seconds (10 minutes) as the maximum unit. 

  * Select if you want to import metrics and/or metadata.

.. note:: Splunk is not responsible for data availability, and it can take up to several minutes (or longer, depending on your configuration) from the time you connect until you start seeing valid data from your account. 

.. raw:: html

  <embed>
    <h2>Alternatives to connect to Azure<a name="connect-azure-other" class="headerlink" href="#connect-azure-other" title="Permalink to this headline">¶</a></h2>
  </embed>

.. raw:: html

  <embed>
    <h3>Connect to Azure using the Splunk Observability Cloud API<a name="connect-to-azure-using-API" class="headerlink" href="#connect-to-azure-using-API" title="Permalink to this headline">¶</a></h3>
  </embed>

You can use the Splunk API to integrate Azure with Splunk Observability Cloud.

For instructions on how to connect to Azure through the API, see :new-page:`Integrate Microsoft Azure monitoring with Splunk Observability Cloud <https://dev.splunk.com/observability/docs/integrations/msazure_integration_overview/>` in the Splunk developer documentation.

.. note:: Azure tag filtering configured through the UI applies an ``OR`` operator to the ``name:value`` pairs that you specify in separate fields. Values for ``tag name`` and ``tag value`` are what you anticipate for monitored data sources. To apply more complex rules not governed exclusively by the OR operator, connect to Azure through the Splunk Observability Cloud API and modify the contents of the ``resourceFilterRules`` field there.

.. raw:: html

  <embed>
    <h3>Connect to Azure using Terraform<a name="connect-azure-terraform" class="headerlink" href="#connect-azure-terraform" title="Permalink to this headline">¶</a></h3>
  </embed>

To connect using Terraform, see :ref:`terraform-config`.

.. raw:: html

  <embed>
    <h2>Install the Splunk Distribution of OpenTelemetry Collector<a name="install-splunk-otel-collector" class="headerlink" href="#install-splunk-otel-collector" title="Permalink to this headline">¶</a></h2>
  </embed>

To take advantage of the full benefits of the Splunk Observability Cloud platform, install the Splunk Distribution of the OpenTelemetry Collector. See more at :ref:`otel-intro`. 

.. raw:: html

  <embed>
    <h3>Track your OpenTelemetry enablement<a name="install-splunk-otel-collector-enablement" class="headerlink" href="#install-splunk-otel-collector-enablement" title="Permalink to this headline">¶</a></h3>
  </embed>

To track the degree of OpenTelemetry enablement in your Azure integrations: 

1. From Splunk Observability Cloud, go to :guilabel:`Data Management > Azure`.

2. Select :guilabel:`OpenTelemetry Enabled` to see whether the OTel Collector is installed on each Azure VMs or AKS cluster. This helps you identify the instances that still need to be instrumented. 

..  image:: /_images/gdi/azure-collector-insights.png
  :width: 80%
  :alt: Amount of Azure entities with the Collector installed. 

3. For OTel Collector instances that are successfully instrumented, you can see which version of the Collector is deployed.  

.. _next-azure-steps:

.. raw:: html

  <embed>
    <h2>Next steps<a name="next-azure-steps" class="headerlink" href="#next-azure-steps" title="Permalink to this headline">¶</a></h2>
  </embed>

To validate your setup, examine the details of your Azure integration as displayed in the list at the end of the setup page.

* For details about the metrics provided by an Azure integration, see :ref:`azure-metrics`.
* To send logs from Azure to Splunk, see :ref:`ingest-azure-log-data`.
* Learn about Splunk Observability Cloud's :ref:`Azure Infrastructure Monitoring options <infrastructure-azure>`. 
* To learn more about Splunk Observability Cloud's data model, refer to :ref:`data-model`.
