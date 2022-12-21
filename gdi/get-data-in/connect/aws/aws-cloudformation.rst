.. _aws-cloudformation:

*********************************************************************
Using CloudFormation templates
*********************************************************************

.. meta::
  :description: CloudFormation templates.

Decide which CloudFormation template to use depending on your deployment method (for example, per AWS region or per AWS account) and integration type (for example, logs only, metric streams only, or both). Even if you don't intend to use both logs and metrics, you can safely deploy a CloudFormation template, since unused infrastructure doesn't generate costs.

From the :strong:`CloudFormation templates` table, select the QuickLink for a template with support for metric streams or logs. The QuickLink automatically opens the AWS Management Console in the last region you used, but you may select any other region in the AWS Management Console.

If the prepopulated CloudFormation template does not meet your needs, create required resources using CloudFormation manually by following these steps:

1. Select the :strong:`Hosted template link` to download and modify the template you choose.
2. In the :strong:`Quick Create stack` dialog box for the selected template, enter the access token for your organization.
3. Select :strong:`Create stack`.
4. Use an API call to enable CloudWatch Metric Streams. To learn more, see :ref:`enable-cw-metricstreams`.

You can optionally use AWS CloudFormation StackSets to work simultaneously across multiple AWS regions after configuring the StackSet prerequisites for self-managed permissions. For more details, see Amazon Web Services documentation to configure StackSet prerequisites.

:strong:`CloudFormation templates`

Select the QuickLink for a template which supports Metric Streams or logs, it will open the AWS Management Console in the last region that you used.

.. list-table::
  :header-rows: 1
  :widths: 15, 15, 20, 25, 25

  * - Supports Log collection
    - Supports Metric Streams
    - Deployment type
    - QuickLink
    - Hosted template 

  * - Yes
    - Yes
    - Once per account (using StackSets)
    - Deploy this :new-page:`QuickLink <https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?templateURL=https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_all_features.yaml>`
    - :new-page:`Hosted template <https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_all_features.yaml>`

  * - Yes
    - Yes
    - In each region
    - Deploy :new-page:`this QuickLink <https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?templateURL=https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_all_features_regional.yaml>` in every region 
    - :new-page:`Hosted template <https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_all_features_regional.yaml>`

  * - Yes
    - No
    - Once per account (using StackSets)
    - Deploy this :new-page:`QuickLink <https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?templateURL=https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_logs.yaml>`
    - :new-page:`Hosted template <https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_logs.yaml>`

  * - Yes
    - No
    - In each region
    - Deploy :new-page:`this QuickLink <https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?templateURL=https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_logs_regional.yaml>` in every region
    - :new-page:`Hosted template <https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_logs_regional.yaml>`

  * - No
    - Yes
    - Once per account (using StackSets)
    - Deploy this :new-page:`QuickLink <https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?templateURL=https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_metric_streams.yaml>`
    - :new-page:`Hosted template <https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_metric_streams.yaml>`

  * - No
    - Yes
    - In each region
    - Deploy :new-page:`this QuickLink <https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?templateURL=https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_metric_streams_regional.yaml>` in every region
    - :new-page:`Hosted template <https://o11y-public.s3.amazonaws.com/aws-cloudformation-templates/release/template_metric_streams_regional.yaml>`


