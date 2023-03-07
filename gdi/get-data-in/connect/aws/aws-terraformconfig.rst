.. _terraform-config:

**************************************
Connect to AWS using Splunk Terraform
**************************************

.. meta::
  :description: Use Splunk Terraform to connect Splunk Observability Cloud to AWS.


If you use Terraform to turn Observability Cloud APIs into declarative configuration files and don't want to configure your system manually through guided setup, use the Splunk Terraform provider to connect Splunk Observability Cloud (SOC) to AWS.

The HashiCorp Configuration Language (HCL) underlying Terraform supports automation. Although you can apply one configuration file to multiple cloud service providers, this topic explains how to connect your system to Observability Cloud using the Terraform registry for AWS integration from the ``splunk-terraform/signalfx`` provider.

As with other connection options, Terraform uses the Splunk Observability REST API endpoints. See :new-page:`Integrate AWS monitoring with Splunk Observability Cloud <https://dev.splunk.com/observability/docs/integrations/aws_integration_overview/>` for examples.

.. note:: To use CloudWatch Metric Streams or retrieve logs from AWS services, you need to deploy additional resources on your AWS account using one of the :ref:`CloudFormation templates <aws-cloudformation>` provided by Splunk. Also, review your :ref:`AIM policy <review-aws-iam-policy>` to ensure all the required actions are available to Splunk Observability Cloud.

Configure AWS ingest using Terraform
======================================

Required roles
-------------------------------------------

To connect to AWS using Terraform you need to create the following roles:

- Amazon Resource Name (ARN) associated with your external ID
- AWS Identity Access Management (IAM) role for CloudWatch Metric Streams
- AWS IAM role that enables Kinesis Firehose to write to an Amazon S3 bucket

.. _terraform-aws-tokens:

Required tokens
-------------------------------------------

You might need up to three tokens:

Observability Cloud user API access token (mandatory)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To obtain your :ref:`user API access token <admin-api-access-tokens>`: 

#. Go to Observability Cloud and select :guilabel:`Settings`.
#. Select your avatar or name on the top to access your :guilabel:`Personal information`. Your user API access token is available on the right corner.

Observability Cloud org token 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To obtain your :ref:`org token <admin-org-tokens>`, you have two options:

* Go to Observability Cloud. In :guilabel:`Settings`, select :guilabel:`Access tokens`.
* Use the :new-page:`Splunk Observability Cloud API <https://dev.splunk.com/observability/reference/api/org_tokens/latest#endpoint-retrieve-tokens-using-query>` to retrieve the name of the token.

AWS token
^^^^^^^^^^^^^^^^^^^^^

Retrieve your AWS token in the AWS IAM console.

Configure the connection
-------------------------------------------

.. note:: Terraform documentation identifies Splunk Observability Cloud as SignalFx or the ``signalfx_aws_integration``.

To configure an AWS connection through Terraform, perform the following steps:

1. Go to :new-page:`Terraform's Registry <https://registry.terraform.io/>` and look for ``signalfx`` in the search box. You'll find the ``SignalFx`` provider site with docs, the available resources, and the compatible data sources. 

2. Copy the ``Use provider`` code to add ``SignalFx`` in the ``required_providers`` block of ``main.tf`` in your configuration file. It looks similar to:

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
        # Configuration options
      }

3. Create an external account ID and an AWS IAM role. Copy and modify the example syntax provided in the documentation section of Terraform Registry's SignalFx page. You'll need this to use the ``signalfx_aws_external_integration`` resource. 
  
4. Configure :ref:`your tokens <terraform-aws-tokens>` in the following Terraform resources: 

  * :strong:`Required`. Paste you user API access token in the ``auth_token`` field in the provider config file. This is required to authenticate Terraform requests to Observability Cloud's API. 
  * Optionally, you can add your org token in the ``namedToken`` field in the ``signalfx_aws_integration`` resource. This allows you to see how much traffic is coming from the integration it identifies, if you use different tokens per integration.
  * Optionally, if you're using Security Token authentication, paste your AWS token in the ``signalfx_aws_token_integration`` resource token/key fields. 

6. Add AWS as a data source as described in :guilabel:`Data Source: signalfx_aws_services`. 

.. note:: For more Terraform syntax examples, see the blog entry :new-page:`Manage Your Splunk Infrastructure as Code Using Terraform <https://www.splunk.com/en_us/blog/partners/manage-your-splunk-infrastructure-as-code-using-terraform.html>`. For examples of how to configure through the Observability Cloud API, see :ref:`Connect to AWS using the Splunk Observability Cloud API <get-configapi>`.

Next steps
===========

After you connect Splunk Observability Cloud with AWS, you can use Observability Cloud to track a series of metrics and analyze your AWS data in real time. See :ref:`how to leverage data from integration with AWS <aws-post-install>` for more information.
