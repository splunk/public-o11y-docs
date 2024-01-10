.. _terraform-config:

************************************************************
Connect your cloud services using Splunk Terraform
************************************************************

.. meta::
  :description: Use Splunk Terraform to connect Splunk Observability Cloud to AWS, GCP, or Azure.


If you use Terraform to turn Splunk Observability Cloud APIs into configuration files and don't want to configure your system manually through guided setup, use ``splunk-terraform/signalfx``, the Splunk Terraform provider, to connect Splunk Observability Cloud to AWS, Azure, or GCP.

The HashiCorp Configuration Language underlying Terraform supports automation. Although you can apply one configuration file to multiple cloud service providers, this topic explains how to connect a single service to Splunk Observability Cloud using the Terraform Registry.

As with other connection options, Terraform uses the Splunk Observability REST API endpoints. For examples, see: 

* :new-page:`Integrate AWS monitoring with Splunk Observability Cloud <https://dev.splunk.com/observability/docs/integrations/aws_integration_overview/>` 
* :new-page:`Integrate Azure monitoring with Splunk Observability Cloud <https://dev.splunk.com/observability/docs/integrations/msazure_integration_overview>` 
* :new-page:`Integrate GCP monitoring with Splunk Observability Cloud <https://dev.splunk.com/observability/docs/integrations/gcp_integration_overview>` 

Requirements
======================================

See the requirements for each cloud services provider:

* :ref:`AWS prerequisites <aws-integration-prereqs>`
* :ref:`Azure prerequisites <azure-integration-prereqs>`
* :ref:`GCP prerequisites <gcp-prerequisites>`

.. note:: To use CloudWatch Metric Streams or retrieve logs from AWS services, you need to deploy additional resources on your AWS account using one of the :ref:`CloudFormation templates <aws-cloudformation>` provided by Splunk. Also, review your :ref:`IAM policy <review-aws-iam-policy>` to ensure all the required actions are available to Splunk Observability Cloud.

.. _terraform-aws-tokens:
.. _terraform-tokens:

Required tokens
-------------------------------------------

You might need these Splunk tokens to configure Terraform:

Splunk Observability Cloud user API access token (mandatory)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To obtain your :ref:`user API access token <admin-api-access-tokens>`: 

#. Go to Splunk Observability Cloud and select :guilabel:`Settings`.
#. Select your avatar or name on the top to access your :guilabel:`Personal information`. Your user API access token is available on the right corner.

Splunk Observability Cloud org token 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To obtain your :ref:`org token <admin-org-tokens>`, you have two options:

* Go to Splunk Observability Cloud. In :guilabel:`Settings`, select :guilabel:`Access tokens`.
* Use the :new-page:`Splunk Observability Cloud API <https://dev.splunk.com/observability/reference/api/org_tokens/latest#endpoint-retrieve-tokens-using-query>` to retrieve the name of the token.

Configure Terraform to connect to your cloud services
==============================================================

.. note:: Terraform documentation identifies Splunk Observability Cloud as SignalFx. Integrations are therefore called ``signalfx_aws_integration``, ``signalfx_azure_integration``, and ``signalfx_gcp_integration``.

To configure a connection through Terraform, perform the following steps:

1. Go to :new-page:`Terraform's Registry <https://registry.terraform.io/>` and look for ``signalfx`` in the search box. You'll find ``splunk-terraform``'s ``signalFx`` provider site with docs, the available resources, and the compatible data sources. 

2. Copy the ``Use provider`` code to add ``SignalFx`` in the ``required_providers`` block of main.tf in your configuration file. It looks similar to:

    .. code-block:: none

      terraform {
        required_providers {
          splunk = {
            source = "splunk-terraform/signalfx"
            version = "6.22.0"
          }
        }
      }

      provider "signalfx" {
        auth_token = "${var.signalfx_auth_token}"
      }

      # Add resources
      resource "signalfx_dasboard" "default" {
        # ...
      }        

3. :strong:`Required`. Paste you user API access token in the ``auth_token`` field in the provider config file. You can also set it using the ``SFX_AUTH_TOKEN`` environment variable. This is required to authenticate Terraform requests to Splunk Observability Cloud's API. 

4. Configure the required additional resources, which are Terraform's infrastructure objects.

  * For AWS, you need the ``signalfx_aws_integration`` resource. You can add your org token in the ``namedToken`` field to see how much traffic is coming from the integration it identifies, if you use different tokens per integration.
    
    * If you're authenticating using the IAM policy and ARN roles, see ``signalfx_aws_external_integration``. Copy and modify the example syntax provided in the documentation section of Terraform Registry's SignalFx page and use it to :ref:`authenticate in AWS <aws-authentication>`.
    * If you're using AWS Security Token authentication, paste your AWS token in the ``signalfx_aws_token_integration`` resource token/key fields. 

  * For Azure, use the ``signalfx_azure_integration`` resource.

  * For GCP, use the ``signalfx_gcp_integration`` resource.

5. Add your cloud service as a data source, as described in: :guilabel:`Data Source: signalfx_aws_services`, :guilabel:`Data Source: signalfx_azure_services`, or :guilabel:`Data Source: signalfx_gcp_services`. Data sources allow Terraform to use information defined outside of Terraform, defined by another separate Terraform configuration, or modified by functions.  

.. note:: For more Terraform syntax examples, see the blog entry :new-page:`Manage Your Splunk Infrastructure as Code Using Terraform <https://www.splunk.com/en_us/blog/partners/manage-your-splunk-infrastructure-as-code-using-terraform.html>`. For examples of how to configure through the Splunk Observability Cloud API, see :ref:`Connect to AWS using the Splunk Observability Cloud API <get-configapi>`.

Next steps
===============

After you connect Splunk Observability Cloud with your cloud services provider: 

* See :ref:`how to leverage data from integration with AWS <aws-post-install>` for more information on how you can use Splunk Observability Cloud to track a series of metrics and analyze your AWS data in real time. 
* See :ref:`next steps for Azure <next-azure-steps>`.
* See :ref:`next steps for GCP <next-gcp-steps>`.

