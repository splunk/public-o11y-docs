.. _get-started-aws:

************************************************************
Connect to AWS and send data to Splunk Observability Cloud
************************************************************

.. meta::
  :description: Connection planning information and links to the different ways to connect AWS to Splunk Observability Cloud.

.. toctree::
  :hidden:

  Connect to AWS with our guided setup <aws-wizardconfig>
  Connect to AWS with the API <aws-apiconfig>
  Connect to AWS with Terraform <aws-terraformconfig>
  Collect logs from AWS <aws-logs>
  CloudFormation templates <aws-cloudformation>
  Next steps <aws-post-install>
  Troubleshoot your AWS connection <aws-troubleshooting>
  Troubleshoot logs <aws-ts-logs>
  GetMetricStatistics API deprecation notice <aws-api-notice>

To leverage the benefits of data monitoring across your infrastructure, connect Splunk Observability Cloud to Amazon Web Services (AWS). Follow these steps:

1. Verify the prerequisites.
2. Plan your integration.
3. Choose your AWS connection option.
4. (Optional) Activate metric streams.

.. note:: Check the :ref:`list of AWS integrations available in Splunk Observability Cloud <aws-integrations>`. 

You can also set the following configuration options to complete the integration:

- Select the :ref:`AWS regions <aws-regions>` to collect data from.
- Activate the ingestion of metrics through polling or streaming.
- Decide whether to process information about application logs.

Following configuration, you can use Amazon CloudWatch to import metrics and logs from supported AWS services into Splunk Observability Cloud, and analyze your data using Observability Cloud tools.

.. _aws-integration-prereqs:

.. raw:: html

  <embed>
    <h2>AWS integration prerequisites<a name="aws-integration-prereqs" class="headerlink" href="#aws-integration-prereqs" title="Permalink to this headline">¶</a></h2>
  </embed>

To connect AWS to Observability Cloud you need: 

- Administrator privileges in Observability Cloud and your AWS accounts. 

- An authentication method.

.. _aws-regions:

.. raw:: html

  <embed>
    <h3>Supported AWS regions<a name="aws-regions" class="headerlink" href="#aws-regions" title="Permalink to this headline">¶</a></h3>
  </embed>

Observability Cloud supports the following regions:

* Regular

    * ``ap-northeast-1``: Asia Pacific (Tokyo)
    * ``ap-northeast-2``: Asia Pacific (Seoul)
    * ``ap-northeast-3``: Asia Pacific (Osaka)
    * ``ap-south-1``: Asia Pacific (Mumbai)
    * ``ap-southeast-1``: Asia Pacific (Singapore)
    * ``ap-southeast-2``: Asia Pacific (Sydney)
    * ``ca-central-1``: Canada (Central)
    * ``eu-central-1``: Europe (Frankfurt)
    * ``eu-north-1``: Europe (Stockholm)
    * ``eu-west-1``: Europe (Ireland)
    * ``eu-west-2``: Europe (London)
    * ``eu-west-3``: Europe (Paris)
    * ``sa-east-1``: South America (Sao Paulo)
    * ``us-east-1``: US East (N. Virginia)
    * ``us-east-2``: US East (Ohio)
    * ``us-west-1``: US West (N. California)
    * ``us-west-2``: US West (Oregon)

* Optional

    * ``af-south-1``: Africa (Cape Town)
    * ``ap-east-1``: Asia Pacific (Hong Kong)
    * ``ap-south-2``: Asia Pacific (Hyderabad)
    * ``ap-southeast-3``: Asia Pacific (Jakarta)
    * ``ap-southeast-4``: Asia Pacific (Melbourne)
    * ``eu-central-2``: Europe (Zurich)
    * ``eu-south-1``: Europe (Milan)
    * ``eu-south-2``: Europe (Spain)
    * ``me-central-1``: Middle East (UAE)
    * ``me-south-1``: Middle East (Bahrain)

* GovCloud

    * ``us-gov-east-1``: AWS GovCloud (US-East)
    * ``us-gov-west-1``: AWS GovCloud (US-West)  

* China

    * ``cn-north-1``: China (Beijing)
    * ``cn-northwest-1``: China (Ningxia)    

Notes: 

* If you want to activate a specific optional region, you need to do it before adding it to the integration. Make sure you've activated the optional regions you'll need in your AWS console first. Regular regions are activated in AWS by default.
* If you're using the :ref:`UI guided setup <aws-wizardconfig>` to create the integration, you'll be prompted to select which AWS regions you work with. 
* If you're :ref:`using the API <get-configapi>` and supply an empty list in an API call, Observability Cloud activates all regular regions. If you add the ``ec2:DescribeRegions`` permission to your AWS policy, optional regions you've activated on your AWS account are activated in Observability Cloud as well. 

.. _aws-authentication:

.. raw:: html

  <embed>
    <h3>AWS authentication methods<a name="aws-authentication" class="headerlink" href="#aws-authentication" title="Permalink to this headline">¶</a></h3>
  </embed>

In most AWS regions, use an :ref:`Identity and Access Management (IAM) policy <aws-iam-policy>`, an :ref:`AWS IAM role <aws-iam-role>`, and an external ID from Observability Cloud. 

An external ID is a random string used to establish a trust relationship between Observability Cloud and your AWS account. It's automatically generated for you when you create a new AWS integration in Observability Cloud. See :new-page:`How to use an external ID when granting access to your AWS resources to a third party <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html>` in AWS documentation.
  
For the :strong:`GovCloud or China regions`, select the option to authenticate using a secure token, which combines an access key ID and a secret access key.

.. _aws-iam-policy:

.. raw:: html

  <embed>
    <h4>Create an AWS IAM policy<a name="aws-iam-policy" class="headerlink" href="#aws-iam-policy" title="Permalink to this headline">¶</a></h4>
  </embed>

The AWS IAM policy is a JSON object to which Observability Cloud refers for permission to collect data from every supported AWS service. To create a new AWS IAM policy, follow these steps. 

#. Log into your Amazon Web Services account and look for the :guilabel:`Identity and Access Management` service.
#. Create a new policy. In the :strong:`JSON` tab, replace the placeholder JSON with the pertinent AWS IAM policy JSON. Guided setup provides this policy in the :guilabel:`Prepare AWS Account` step. See also some :ref:`policy examples <aws-api-create-policy-role>`.
#. Follow the instructions to complete the process and create the policy.

.. :note:: The default AWS IAM policy supports metrics and log collection. To learn how to add support for CloudWatch Metric Streams, see :ref:`aws-wizard-metricstreams`.

If you have any doubts, check AWS documentation.  

.. _aws-iam-role:

.. raw:: html

  <embed>
    <h4>Create an AWS IAM role<a name="aws-iam-role" class="headerlink" href="#aws-iam-role" title="Permalink to this headline">¶</a></h4>
  </embed>

After creating an AWS IAM policy, you need to assign that policy to a particular role by performing the following steps in the Amazon Web Services console:

#. Go to :strong:`Roles > Create Role` and select :strong:`Another AWS account` as the type of trusted entity.
#. Copy and paste the Account ID displayed in guided setup into the :strong:`Account ID` field.
#. Select :strong:`Require external ID`. Copy and paste the External ID displayed in the guided setup into the :strong:`External ID` field.
#. Continue with :strong:`Next: Permissions`. Under :strong:`Policy name`, select the policy you made in the previous step.
#. Follow the instructions, and name and create your new AWS IAM role.  

Creating the AWS IAM role generates the ``Role ARN`` used to establish connection with AWS. Copy the created ARN role, and paste it into the :strong:`Role ARN` field in the guided setup.

If you have any doubts, check AWS documentation.

.. _prep-for-aws-integration:

.. raw:: html

  <embed>
    <h2>Plan your integration<a name="prep-for-aws-integration" class="headerlink" href="#prep-for-aws-integration" title="Permalink to this headline">¶</a></h2>
  </embed>

Regardless of the connection option you choose, you can configure your system more efficiently if you decide beforehand what data types and sources you want.

To determine the best connection method and configuration settings, answer the following questions before you connect AWS to Splunk Observability Cloud:

- Do I want to collect metrics through API polling at specified intervals, or through CloudWatch Metric Streams? 
- Do I want to collect logs in addition to metrics? If yes, then include logs while configuring through the API or when given that option while performing a guided setup.

.. _aws-connection-options:

.. raw:: html

  <embed>
    <h2>AWS connection options<a name="connection-options-aws" class="headerlink" href="#connection-options-aws" title="Permalink to this headline">¶</a></h2>
  </embed>

You can connect Observability Cloud to AWS in several different ways. Choose the connection method that best matches your needs:

.. list-table::
  :header-rows: 1
  :widths: 35, 65

  * - :strong:`Connection option`
    - :strong:`Why use this?`

  * - Connect to AWS using the :ref:`guided setup <aws-wizardconfig>` in Splunk Observability Cloud
    - Guides you step-by-step to set up an AWS connection and default configuration in Observability Cloud. Guided setup includes links to Amazon CloudFormation templates that you can select to create needed AWS IAM roles.

  * - Connect to AWS using the :ref:`Splunk Observability Cloud API <get-configapi>`
    - Requires knowledge of POST and PUT call syntax, but includes options and automation that are not part of the guided setup. Choose this method if you want to configure many integrations at once. 

  * - Connect to AWS using :ref:`Splunk Terraform <terraform-config>`
    - Use this connection method if you already manage your infrastructure as code by deploying through Terraform.

See also the :new-page:`Splunk add-on for Amazon Kinesis Firehose <https://docs.splunk.com/Documentation/AddOns/latest/Firehose/ConfigureFirehose>`.

.. note:: Splunk is not responsible for data availability, and it can take up to several minutes (or longer, depending on your configuration) from the time you connect until you start seeing valid data from your account. 
  
By default, Splunk Observability Cloud will bring in data from all :ref:`supported AWS services <aws-integrations>` associated with your account. To limit the amount of data to import, see :ref:`specify-data-metadata`.

If you can't connect AWS to Observability Cloud, see :ref:`Troubleshoot your AWS connection <aws-troubleshooting>`.

.. _aws-metricstreams:

.. raw:: html

  <embed>
    <h2>Use Metric Streams to forward data to Splunk Observability Cloud<a name="aws-metricstreams" class="headerlink" href="#aws-metricstreams" title="Permalink to this headline">¶</a></h3>
  </embed>

Rather than polling for metrics data at specified intervals, CloudWatch Metric Streams sends metrics to a Kinesis Data Firehose stream, reducing latency. See :new-page:`Low Latency Observability Into AWS Services With Splunk <https://www.splunk.com/en_us/blog/devops/real-time-observability-splunk-cloudwatch-metric-streams.html>` in the DevOps blog for more information.

You can activate Metric Streams both with our :ref:`guided setup <aws-wizardconfig>`, or the :ref:`Splunk Observability Cloud API <get-configapi>`.

Although Metric Streams are more efficient than API polling, consider the constraints below.

.. _collection-interval-aws:

.. raw:: html

  <embed>
    <h3>Collection interval<a name="collection-interval-aws" class="headerlink" href="#collection-interval-aws" title="Permalink to this headline">¶</a></h3>
  </embed>

CloudWatch Metric Streams continually stream Amazon CloudWatch metrics as soon as they are published. In most cases, the metrics are published once per minute.

For customers currently collecting Amazon CloudWatch metrics at the default polling rate of 300 seconds (5 minutes), this difference in intervals typically increases :ref:`Amazon CloudWatch usage costs <aws-costs>`.

Customers already polling at 1-minute intervals generally see a slight decrease in Amazon CloudWatch usage costs compared to Metric Streams.

.. _aws-data-limits:

.. raw:: html

  <embed>
    <h3>High data volume warning<a name="aws-data-limits" class="headerlink" href="#aws-data-limits" title="Permalink to this headline">¶</a></h3>
  </embed>

After you create an AWS integration, Observability Cloud checks if more than 100,000 metrics are fetched from CloudWatch. If this is the case, the integration gets automatically deactivated, and a warning email is sent. 

This check runs just once per integration. If you activate the integration afterwards, it will work correctly. 

You can deactivate this check by setting the ``enableCheckLargeVolume`` field in the AWS integration to ``false`` :new-page:`using the API <https://dev.splunk.com/observability/reference/api/integrations/latest#endpoint-update-single-integration>`.

.. _tag-filtering-aws:

.. raw:: html

  <embed>
    <h3>Tag filtering<a name="tag-filtering-aws" class="headerlink" href="#tag-filtering-aws" title="Permalink to this headline">¶</a></h3>
  </embed>

CloudWatch Metric Streams do not support filtering based on resource tags. Configuration applies to individual services, and all resources that report metrics from a configured service stream those metrics. If you filter data based on tags, your costs for Amazon CloudWatch and Splunk Infrastructure Monitoring might increase.

.. caution:: Be careful when choosing tag names: Splunk Observability Cloud only allows alphanumeric characters, and the underscore and minus symbols. Unsupported characters include ``.``, ``:``, ``/``, ``=``, ``+``, ``@``, and spaces, which are replaced by the underscore character. 

.. _after-aws-integration:

.. raw:: html

  <embed>
    <h2>Next steps<a name="after-aws-integration" class="headerlink" href="#after-aws-integration" title="Permalink to this headline">¶</a></h2>
  </embed>

* See :ref:`Leverage data from integration with AWS <aws-post-install>` for an overview of what you can do after you connect Observability Cloud to AWS.
* Learn about :ref:`our AWS Infrastructure Monitoring options <infrastructure-aws>`. You'll find instructions on how to import AWS metrics and metadata, or AWS tag and log information using namespaces and filters. 
* Refer to the AWS official documentation for a list of the available AWS metrics and other data, or read about :ref:`the metadata we provide <aws-infra-metadata>`.
* To collect traces and metrics of your AWS Lambda functions for Splunk APM, see :ref:`splunk-otel-lambda-layer`.

