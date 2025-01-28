.. _apm-delete-data-links-terraform:

*********************************************
Delete all global data links with Terraform
*********************************************

.. meta::
   :description: An overview of how to use Terraform to delete all global data links created with Terraform.

Use Terraform to programmatically delete all global data links that you created with Terraform. This process deletes all of the global data links in the terraform.tf.state file in the Terraform directory.

Prerequisites
===============

To delete global data links with Terraform, you need:

* A Splunk Observability Cloud account with the admin role. 
* The latest version of Terraform.
* Global data links created with Terraform, either with the :ref:`Node.js script<apm-create-data-links-terraform-batch>` or the :ref:`Terraform file<apm-create-data-links-terraform-file>`.

Delete all global data links with Terraform
=============================================

To delete all global data links that you created with Terraform:

#. View the terraform.tf.state file in the Terraform directory. Confirm that you want to delete all of the data links in the file.

#. Obtain the API access token from the Splunk Observability Cloud UI:
    #. In Splunk Observability Cloud, select your user profile in the header. Then, select :guilabel:`My Profile`.
    #. Select :guilabel:`Show User API Access Token`.
    #. Copy the API access token.

#. Open your terminal and navigate to the Terraform directory. Run:
     .. code-block:: none

        terraform destroy -var=”signalfx_auth_token=<api-access-token>” -var=”signalfx_api_url=https://api.<realm>.signalfx.com”
    
    - For <api-access-token>, enter the API access token you obtained in the previous step.
    - For <realm>, enter your Splunk Observability Cloud realm. To obtain your realm, navigate to the Splunk Observability Cloud user interface and view the browser URL, which is in the format api.<realm>.signalfx.com.

#. View the UI to confirm that the data links were deleted:
    #. In the Splunk Observability Cloud main menu, select :guilabel:`Settings` then :guilabel:`Global Data Link`.
    #. Search for the names of the data links you created.
        - If you used the :ref:`Node.js script method <apm-create-data-links-terraform-batch>`, search for the AppDLinkLabel values that you specified in the .csv file.
        - If you used the :ref:`Terraform file method <apm-create-data-links-terraform-file>`, search for the name values that you specified in the Terraform configuration file.
