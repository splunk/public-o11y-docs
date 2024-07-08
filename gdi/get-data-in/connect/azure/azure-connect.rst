.. _azure-connect:

**************************************************************
Connect to Azure: Guided setup and other options 
**************************************************************

.. meta::
  :description: Connect your Microsoft Azure account to Splunk Observability Cloud: UI, API

.. toctree::
  :hidden:

For a list of supported Azure services, see :ref:`azure-integrations`.

.. note:: Splunk is not responsible for data availability, and it can take up to several minutes (or longer, depending on your configuration) from the time you connect until you start seeing valid data from your account. 

.. _connect-to-azure:
.. _azure-connect-ui:

Connect to Azure with the guided setup
============================================

From Splunk Observability Cloud, connect to Azure using the :new-page:`Microsoft Azure guided setup <https://login.signalfx.com/#/integrations/azure>`. 

Alternatively, you can navigate to the guided setup on your own:

  #. In the navigation menu, select :menuselection:`Data Management`. 
  
  #. Go to the :guilabel:`Available integrations` tab, or select :guilabel:`Add Integration` in the :guilabel:`Deployed integrations` tab.

  #. In the integration filter menu, go to :guilabel:`By Use Case`, and select the :guilabel:`Monitor Infrastructure` use case.

  #. Select the :guilabel:`Microsoft Azure` tile to open the Microsoft Azure guided setup.

  #. To start configuring the connection to Azure, select :guilabel:`New Integration`.

Next, fill in the fields as prompted by the guided setup.

1. Define your Azure connection
--------------------------------------------------------------------------------------

Complete the following parameters for your integration:

* Select your Azure environment: 
  
  * :guilabel:`Azure Government` for an Azure Government instance.
  
  * :guilabel:`Azure` for all other Azure connections.

* Select the rate, in seconds, at which you want Splunk Observability Cloud to poll Azure for metric data, with 60 seconds (default) as the minimum unit, and 600 seconds (10 minutes) as the maximum unit.

* Select if you want to import metrics and/or metadata.

* Prepare your Azure account. See :ref:`azure-prereqs`.

2. Establish your Azure connection
--------------------------------------------------------------------------------------

To create the integration, enter the following information:

* :guilabel:`Name`: Unique name for this connection to Azure. The name field helps you create multiple connections to Azure, each with its own name.

* :guilabel:`Directory ID`: Azure Directory ID you saved in a previous step.

* :guilabel:`App ID`: The Azure app (client) ID you saved in a previous step.

* :guilabel:`Client Secret`: The client secret (password) you saved in a previous step.

3. Select the data to import
--------------------------------------------------------------------------------------

Choose the data you want to send to Splunk Observability Cloud:

* Select the subscriptions you want to monitor.

* Optional: Select the services you want to monitor. By default, all services supported by Splunk Observability Cloud are selected. Use the pop-up menu to narrow down to specific services. For a list of supported Azure services, see :ref:`azure-integrations`.

* Optional: Add any additional Azure resources or services you want to monitor that are not fully supported by Splunk Observability Cloud. If you add the same resource type to both services and additional services, Splunk Observability Cloud ignores the duplication.

  * Any resource type you specify as an additional service must meet the following criteria:

    * The resource is an Azure generic resource. For resource types that have hierarchical structure, only the root resource type is a generic resource. For example, a Storage Account type can have a File Service type, and a File Service type can have a File Storage type. In this case, only Storage Account is a generic resource.

    * The resource stores its metrics in Azure Monitor. To learn more about Azure Monitor, refer to the Microsoft Azure documentation.

* Optional: Use the :guilabel:`Add Tag` button to create a tag if you want to monitor only tagged data sources, filling out the ``tag name`` and ``tag value`` fields separately to create a tag pair. Only filters containing Azure tags are allowed. Tag names are internally prefixed with ``azure_tag``, so if you're using the UI you need to supply only the Azure tag name, for example ``team`` instead of ``azure_tag_team``. When tagging, Splunk Observability Cloud only allows alphanumeric characters, and the underscore and minus symbols. Unsupported characters include ``.``, ``:``, ``/``, ``=``, ``+``, ``@``, and spaces, which are replaced by the underscore character. 

.. _connect-azure-other:

Alternatives to connect to Azure
============================================

.. _connect-to-azure-using-API:

Connect to Azure using the Splunk Observability Cloud API
--------------------------------------------------------------------------------------

You can use the Splunk API to integrate Azure with Splunk Observability Cloud. For instructions on how to connect to Azure through the API, see :new-page:`Integrate Microsoft Azure monitoring with Splunk Observability Cloud <https://dev.splunk.com/observability/docs/integrations/msazure_integration_overview/>` in the Splunk developer documentation.

Azure tag filtering configured through the UI applies an ``OR`` operator to the ``name:value`` pairs that you specify in separate fields. Values for ``tag name`` and ``tag value`` are what you anticipate for monitored data sources. To apply more complex rules not governed exclusively by the OR operator, connect to Azure through the Splunk Observability Cloud API and modify the contents of the ``resourceFilterRules`` field there.

.. _connect-azure-terraform:
    
Connect to Azure using Terraform
-------------------------------------------

To connect using Terraform, see :ref:`terraform-config`.

Next steps
============================================

After you connect your Azure account to Splunk Observability Cloud, you can do the following:

* Import Azure metrics, traces, and metadata. For details about the metrics provided by an Azure integration, see :ref:`azure-metrics`.
* Learn about Splunk Observability Cloud's :ref:`Azure Infrastructure Monitoring options <infrastructure-azure>`. 
* Use Splunk Observability Cloud tools to monitor your Azure services, such as :ref:`navigators <use-navigators-imm>` and :ref:`dashboards <azure-dashboards>`.
* To send logs from Azure to Splunk, see :ref:`ingest-azure-log-data`.
