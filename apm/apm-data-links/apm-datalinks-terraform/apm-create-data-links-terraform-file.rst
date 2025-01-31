.. _apm-create-data-links-terraform-file:

*****************************************************************************
Create global data links to Splunk AppDynamics tiers with a Terraform file
*****************************************************************************

.. meta::
   :description: Learn how to use a Terraform configuration file to create global data links to Splunk AppDynamics tiers.

.. note::
    You can only create a global data link to a Splunk AppDynamics tier if the tier is monitored by a Splunk AppDynamics SaaS environment.

Create a global data link to link a Splunk APM inferred service to a Splunk AppDynamics tier. When you view the inferred service in Splunk APM, you can select the data link to navigate to the tier in the Splunk AppDynamics user interface.

You can programmatically create global data links to Splunk AppDynamics tiers with a Terraform configuration file.

.. note::
    This method can only be used to create global data links for inferred services that do not have existing global data links. If your inferred service already has an existing global data link, :ref:`use the UI <apm-create-gdl-to-appd>` to create additional global data links.

Prerequisites
=================

To create a global data link to a Splunk AppDynamics tier using the Node.js script, you need:

* A Splunk Observability Cloud account with the admin role. 
* The latest version of Terraform.

Create data links with a Terraform configuration file
========================================================

To create data links with a Terraform configuration file:

#. In the Terraform directory, create a Terraform configuration file named <file-name>.tf with the following contents:
    .. code-block:: terraform

        # Specify the Terraform provider and version
        terraform {
        required_providers {
            signalfx = {
            source  = "splunk-terraform/signalfx"
            version = "~> <current-splunk-terraform-provider-version>"
            }
        }
        }

        # The following variable blocks can also be located in a variables.tf file in the same directory
        variable "signalfx_auth_token" {
        description = "The user API access authentication token for your org"
        type        = string
        default     = ""
        }
        variable "signalfx_api_url" {
        description = "The API URL of your org"
        type        = string
        default     = ""
        }

        # Configure the Splunk Observability Cloud provider
        provider "signalfx" {
        auth_token = "${var.signalfx_auth_token}"
        api_url = "${var.signalfx_api_url}"
        }

    - For ``version``, enter the current Splunk Observability Cloud Terraform provider version. To check the latest version, see :new-page:`Releases <https://github.com/splunk-terraform/terraform-provider-signalfx/releases>`. This value must be 9.6.0 or higher.
    - (Optional) Add arguments as needed for your configuration. For more information on the supported arguments, see :new-page:`Splunk Observability Cloud provider <https://registry.terraform.io/providers/splunk-terraform/signalfx/latest/docs#arguments>` in the Terraform documentation.

#. Add the :new-page:`signalfx_data_link <https://registry.terraform.io/providers/splunk-terraform/signalfx/latest/docs/resources/data_link>` resource to the Terraform file:
    .. code-block:: none

        # A link to a Splunk AppDynamics service
        resource "signalfx_data_link" "<data-link-id>" {
        property_name        = "sf_service"
        property_value       = "<splunk-inferred-service-name>"

        target_appd_url {
            name        = "<data-link-ui-label>"
            url         = "<https://www.example.saas.appdynamics.com/#/application=1234&component=5678>"
        }
        }

    - For <data-link-id>, enter an identifier for the data link. This value is only visible in the Terraform file and must be unique for each data link. For example, you can use my_data_link_appd_1 or my_data_link_appd_2.
    - For ``property_name``, use ``sf_service``.
    - For ``property_value``, enter the Splunk APM inferred service name.
    - For ``name``, enter a label for the data link. This label appears in the Splunk Observability Cloud user interface.
    - For ``URL``, enter the Splunk AppDynamics tier URL.
        To obtain the tier URL, navigate to the tier in the Splunk AppDynamics UI and copy the URL from the browser. Ensure that you capture the entire URL and that it contains the controller URL, application ID, and application component.

#. Repeat the previous step for each data link to a Splunk AppDynamics tier you want to create. The following example displays a Terraform configuration file with multiple data links to Splunk AppDynamics tiers:
    .. code-block:: terraform

        # Specify the Terraform provider and version
        terraform {
        required_providers {
            signalfx = {
            source  = "splunk-terraform/signalfx"
            version = "~> 9.6.0"
            }
        }
        }

        # The following variable blocks can also be located in the variables.tf file in the same directory
        variable "signalfx_auth_token" {
        description = "The user API access auth token for your org"
        type        = string
        default     = ""
        }
        variable "signalfx_api_url" {
        description = "The API URL of your org"
        type        = string
        default     = ""
        }

        # Configure the Splunk Observability Cloud provider
        provider "signalfx" {
        auth_token = "${var.signalfx_auth_token}"
        api_url    = "${var.signalfx_api_url}"
        }
        # If your organization uses a custom URL, replace api_url with:
        # custom_app_url = "https://myorg.signalfx.com"

        # A link to a Splunk AppDynamics service
        resource "signalfx_data_link" "my_data_link_appd_1" {
        property_name        = "sf_service"
        property_value       = "placed_orders"

        target_appd_url {
            name        = "appd_url_placed_orders"
            url         = "https://www.example.saas.appdynamics.com/#/application=1234&component=5678"
        }
        }

        # A link to a Splunk AppDynamics service
        resource "signalfx_data_link" "my_data_link_appd_2" {
        property_name        = "sf_service"
        property_value       = "returned_orders"

        target_appd_url {
            name        = "appd_url_returned_orders"
            url         = "https://www.example.saas.appdynamics.com/#/application=4321&component=8765"
        }
        }

#. In the working directory with your Terraform configuration file, run the following command to initialize the directory:
    .. code-block:: none

        terraform init

#. To set your signalfx_auth_token and signalfx_api_url variables and generate a preview of the changes that Terraform will make, run:
    .. code-block:: none

        terraform plan -var="signalfx_auth_token=<api-access-token>" -var="signalfx_api_url=https://api.<realm>.signalfx.com" -out=<plan-file-name>
        
    - For <api-access-token>, enter your Splunk Observability Cloud API access token. To obtain it, navigate to Splunk Observability and select your profile in the header. Select :guilabel:`My Profile`, then :guilabel:`Show User API Access Token`, and copy the API access token.
    - For <realm>, enter your Splunk Observability Cloud realm. To obtain your realm, navigate to Splunk Observability Cloud and select your profile in the header. Select :guilabel:`My Profile`, then :guilabel:`Organizations`, and copy the :guilabel:`Realm`.
    - For <plan-file-name>, enter your desired name for the plan file that Terraform will create for the changes.

#. Use the output to review the changes. To run the changes and create a terraform.tf.state file that lists the resources that Terraform created:
    .. code-block:: none

        terraform apply "<plan-file-name>"

#. To verify that the global data links were successfully created, use one of the following methods:
    - View the output of the command. Sample output for a successful execution: ``Apply complete! Resources: 3 added, 0 changed, 0 destroyed``.
    - View the terraform.tfstate file in the Terraform directory, which contains the list of created resources.
    - View the global data links in the UI. In the Splunk Observability Cloud main menu, select :guilabel:`Settings` then :guilabel:`Global Data Link`. Search the page for the data link name that you specified in the Terraform file.

Next steps
=============

To access global data links in the user interface, see :ref:`apm-access-gdl-service`.

To delete all global data links using Terraform, see :ref:`apm-delete-data-links-terraform`.

