.. _apm-create-data-links-terraform-batch:

**************************************************************************************
Create a batch of global data links to Splunk AppDynamics tiers with a Node.js script
**************************************************************************************

.. meta::
   :description: Learn how to use a Node.js script to create a batch of global data links to Splunk AppDynamics tiers.

.. note::
    You can only create a global data link from a Splunk APM inferred service to a Splunk AppDynamics tier if the tier is monitored by a Splunk AppDynamics SaaS environment.

    This method can only be used to create global data links for inferred services that do not have existing global data links. If your inferred service already has an existing global data link, :ref:`use the UI <apm-create-gdl-to-appd>` to create additional global data links.

When a transaction goes through a service monitored by Splunk APM as well as a tier monitored by Splunk AppDynamics, the service monitored by Splunk APM is considered an inferred service.

Create a global data link to link a Splunk APM inferred service to a Splunk AppDynamics tier. When you view the inferred service in Splunk APM, you can select the data link to navigate to the tier in the Splunk AppDynamics user interface.

You can programmatically create global data links to Splunk AppDynamics tiers with a CSV file and Splunk Node.js script, which generates and runs a Terraform script that creates the data links. This process does not require running Terraform commands.

Prerequisites
=================

To create a global data link to a Splunk AppDynamics tier using the Node.js script, you need:

* A Splunk Observability Cloud account with the admin role. 
* Node.js version 20.18.1 or higher.
* The latest version of Terraform.

Create a batch of global data links
======================================

To create a batch of global data links:

#. Create a CSV file to define the data links you want to create. The CSV file must match the following format, which uses three columns to denote the OllyInferredServiceName, AppDLinkLabel, and AppDLink: 
    .. image:: /_images/apm/apm-data-links/appd-data-links-sample-csv.png
        :width: 100%
        :alt: This image shows a sample file for creating a batch of global data links to Splunk AppDynamics.

    - For OllyInferredServiceName, enter the Splunk APM inferred service name.
    - For AppDLinkLabel, enter a label for the data link. This label appears in the Splunk O11y user interface.
    - For AppDLink, enter the Splunk AppDynamics tier URL.
        To obtain the tier URL, navigate to the tier in the Splunk AppDynamics UI and copy the URL from the browser. Ensure that you capture the entire URL and that it contains the controller URL, application ID, and application component.

#. Download the Node.js script from the :new-page:`Splunk GitHub repository <https://github.com/splunk/appd-centric-batch-data-link-creator>`. The Node.js script uses the CSV file as an input to generate and run a Terraform script that creates the data links.

#. To install the dependencies in the Node.js script package, run: 
    .. code-block:: none

        npm install

#. To run the Node.js script, run:
    .. code-block:: none

        node createAppDLinkTerraformScript.js <csv-file-path> <o11y-api-url> <o11y-auth-token>

    - For <csv-file-path>, enter the file path to the CSV file you created.
    - For <o11y-api-url>, enter the API URL for your Splunk Observability Cloud environment. To obtain it, navigate to Splunk Observability Cloud and select your profile in the header. Select :guilabel:`My Profile`, then :guilabel:`Organizations`, and copy the :guilabel:`API Endpoint`.
    - For <o11y-auth-token>, enter your Splunk Observability Cloud API access token. To obtain it, navigate to Splunk Observability and select your profile in the header. Select :guilabel:`My Profile`, then :guilabel:`Show User API Access Token`, and copy the API access token.

    This command creates the following files in the Terraform directory:
        - appDDataLink.tf: The Terraform configuration file, which contains the Splunk Observability Cloud environment details and the data links from the CSV file.
        - appDLink_Plan.tf: The Terraform plan file, which contains the list of changes that Terraform will make. 
        - terraform.tfstate: The Terraform state file, which contains the list of resources that Terraform successfully created.

#. To verify that the global data links were successfully created, use one of the following methods:
    #. View the output of the command. Sample output for a successful execution: ``Apply complete! Resources: 3 added, 0 changed, 0 destroyed``.
    #. View the terraform.tfstate file in the Terraform directory, which contains the list of created resources.
    #. View the global data links in the UI. In the Splunk Observability Cloud main menu, select :guilabel:`Settings` then :guilabel:`Global Data Links`. Search the page for the AppDLinkLabel names that you specified in the CSV file.

#. To troubleshoot errors, view the APPD_LINK_TF_LOGS.log file in the Terraform directory. The log file is organized by the timestamp that the Node.js script executed the Terraform script.

Next steps
============

To access global data links in the user interface, see :ref:`apm-access-gdl-service`.

To delete all global data links using Terraform, see :ref:`apm-delete-data-links-terraform`.