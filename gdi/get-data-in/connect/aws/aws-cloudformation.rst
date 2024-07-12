.. _aws-cloudformation:

*********************************************************************
Available CloudFormation and Terraform templates
*********************************************************************

.. meta::
  :description: CloudFormation templates for AWS in Splunk Observability Cloud.

To create Splunk-managed Metric Streams resources you can either use :ref:`CloudFormation <aws-cloudformation-use>` or a :ref:`Terraform template <aws-terraform-use>`.

.. _aws-cloudformation-use:

Use CloudFormation to connect to Splunk Observability Cloud
========================================================================================

To use CloudFormation to connect to Splunk Observability Cloud follow these steps:

#. Install the AWS integration. Learn more at :ref:`get-started-aws`.

#. Decide which :ref:`CloudFormation template <aws-cloudformation-templates>` to use depending on your deployment method (for example, per AWS region or per AWS account) and integration type. Note that templates are only available for Metric Sreams.

  Even if you don't intend to use all options you can safely deploy any CloudFormation template since unused infrastructure doesn't generate costs.

#. Select the QuickLink for your chosen template. The QuickLink automatically opens the AWS Management Console in the last region you used, but you can select any other region in the AWS Management Console.

.. caution:: Splunk Log Observer is no longer available for new users. You can continue to use Log Observer if you already have an entitlement. To collect logs, see :ref:`aws-logs`.

.. _aws-cloudformation-templates:

Prepopulated CloudFormation templates
-------------------------------------------

These are the available prepopulated CloudFormation templates to create AWS Metric Streams resources:

.. list-table::
  :header-rows: 1
  :widths: 20, 20, 35, 35
  :width: 100

  * - Supports Metric Streams
    - Deployment type
    - QuickLink
    - Hosted template 

  * - Yes
    - Once per account (using StackSets)
    - Deploy this :new-page:`QuickLink <https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?templateURL=https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_all_features.yaml>`
    - :new-page:`Hosted template <https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_all_features.yaml>`

  * - Yes
    - In each region
    - Deploy :new-page:`this QuickLink <https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?templateURL=https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_all_features_regional.yaml>` in every region 
    - :new-page:`Hosted template <https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_all_features_regional.yaml>`

  * - No
    - Once per account (using StackSets)
    - Deploy this :new-page:`QuickLink <https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?templateURL=https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_logs.yaml>`
    - :new-page:`Hosted template <https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_logs.yaml>`

  * - No
    - In each region
    - Deploy :new-page:`this QuickLink <https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?templateURL=https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_logs_regional.yaml>` in every region
    - :new-page:`Hosted template <https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_logs_regional.yaml>`

  * - Yes
    - Once per account (using StackSets)
    - Deploy this :new-page:`QuickLink <https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?templateURL=https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_metric_streams.yaml>`
    - :new-page:`Hosted template <https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_metric_streams.yaml>`

  * - Yes
    - In each region
    - Deploy :new-page:`this QuickLink <https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?templateURL=https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_metric_streams_regional.yaml>` in every region
    - :new-page:`Hosted template <https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_metric_streams_regional.yaml>`

Custom CloudFormation templates
-------------------------------------------

If none of the prepopulated CloudFormation templates meets your needs, you might create required resources using CloudFormation manually by following these steps:

1. Select the :strong:`Hosted template link` to download and modify the template you choose.
2. In the :strong:`Quick Create stack` dialog box for the selected template, enter the access token for your organization.
3. Select :strong:`Create stack`.
4. Use an API call to activate CloudWatch Metric Streams. To learn more, see :ref:`activate-cw-metricstreams`.

You can optionally use AWS CloudFormation StackSets to work simultaneously across multiple AWS regions after configuring the StackSet prerequisites for self-managed permissions. For more details, see Amazon Web Services documentation to configure StackSet prerequisites.

.. _aws-terraform-use:

Use the Terraform template to connect to Splunk Observability Cloud
========================================================================================

Alternatively, you can also deploy Kinesis Firehose with Terraform. See the :new-page:`Terraform Setup for Creating Kinesis Firehose to Send CloudWatch Metric Stream <https://github.com/signalfx/aws-terraform-templates/tree/main>` GitHub repo.

The provided Terraform template supports Metric Streams only, and does not offer log support.

For more information on how to use Terraform to connect to AWS, see :ref:`terraform-config`.