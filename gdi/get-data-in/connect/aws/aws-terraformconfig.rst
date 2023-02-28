.. _terraform-config:

**************************************
Connect to AWS using Splunk Terraform
**************************************

.. meta::
  :description: Use Splunk Terraform to connect Splunk Observability Cloud to AWS.


If you use Terraform to turn Observability Cloud APIs into declarative configuration files and do not want to configure your system manually through guided setup, you can use the Terraform Provider for Splunk, also called Splunk Terraform, to connect Splunk Observability Cloud to Amazon Web Services (AWS).

The HashiCorp Configuration Language (HCL) underlying Terraform supports automation. Although you can apply one configuration file to multiple cloud service providers, this topic explains how you connect your system to Observability Cloud using the Terraform registry for AWS integration from the ``splunk-terraform/signalfx`` provider.

Connecting Splunk Observability Cloud to AWS through the Terraform provider involves creating the following roles:

- Amazon Resource Name (ARN) associated with your external ID
- AWS Identity Access Management (IAM) role for CloudWatch Metric Streams
- AWS IAM role that activates Kinesis Firehose to write to an Amazon S3 bucket

As with other connection options, Terraform uses the Splunk Observability REST API endpoints. See :new-page:`Integrate AWS monitoring with Splunk Observability Cloud <https://dev.splunk.com/observability/docs/integrations/aws_integration_overview/>` for examples.

.. note:: To use CloudWatch Metric Streams or retrieve logs from AWS services, you need to deploy additional resources on your AWS account using one of the :ref:`CloudFormation templates <aws-cloudformation>` provided by Splunk. Also, review your :ref:`AIM policy <review-aws-iam-policy>` to ensure all the required actions are available to Splunk Observability Cloud.

Configure AWS ingest using Terraform
======================================

To configure an AWS connection through Terraform, perform the following steps:

1. Use your web browser to open the Terraform registry for AWS integration. See :strong:`signalfx_aws_integration` at :new-page:`https://registry.terraform.io/providers/splunk-terraform/signalfx/latest/docs/resources/aws_integration <https://registry.terraform.io/providers/splunk-terraform/signalfx/latest/docs/resources/aws_integration>` for the applicable Terraform resource page.

2. Add the Splunk provider to the ``required_providers`` code block of ``main.tf`` in your configuration file as follows:

    .. code-block:: none

      terraform {
        required_providers {
          splunk = {
            source = "splunk/splunk"
            version = "1.0.0"
          }
        }
      }

3. Create an external account ID and an AWS IAM role by copying and modifying the example syntax on the on the applicable Terraform registry page at :new-page:`https://registry.terraform.io/providers/splunk-terraform/signalfx/latest/docs/resources/aws_integration <https://registry.terraform.io/providers/splunk-terraform/signalfx/latest/docs/resources/aws_integration>`.

  Terraform documentation identifies Splunk Observability Cloud as SignalFx or the ``signalfx_aws_integration``.

4. Use the Splunk Observability Cloud API to specify the name of the org token to be used for data ingestion in the ``namedToken:"<name of token>"`` field. Supplying a value for ``namedToken`` lets you see how much traffic is coming from the integration it identifies.

5. Add data sources as described in :guilabel:`Data Source: signalfx_aws_services`. See :new-page:`https://registry.terraform.io/providers/splunk-terraform/signalfx/latest/docs/data-sources/aws_services <https://registry.terraform.io/providers/splunk-terraform/signalfx/latest/docs/data-sources/aws_services>` in the SignalFx provider section of the Terraform website for details.

.. note:: For more Terraform syntax examples, see the blog entry :new-page:`Manage Your Splunk Infrastructure as Code Using Terraform <https://www.splunk.com/en_us/blog/partners/manage-your-splunk-infrastructure-as-code-using-terraform.html>`. For examples of how to configure through the Observability Cloud API, see :ref:`Connect to AWS using the Splunk Observability Cloud API <get-configapi>`.

Next steps
===========

After you connect Splunk Observability Cloud with AWS, you can use Observability Cloud to track a series of metrics and analyze your AWS data in real time. See :ref:`how to leverage data from integration with AWS <aws-post-install>` for more information.
