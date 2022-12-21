.. _get-started-aws:

************************************************************
Connect to AWS and send data to Splunk Observability Cloud
************************************************************

.. meta::
  :description: Connection planning information and links to the different ways to connect AWS to Splunk Observability Cloud

.. toctree::
  :hidden:

  Connect to AWS with our guided setup <aws-wizardconfig>
  Connect to AWS with the API <aws-apiconfig>
  Connect to AWS with Terraform <aws-terraformconfig>
  Collect logs from AWS <aws-logs>
  CloudFormation templates <aws-cloudformation>
  Next steps <aws-post-install>
  Troubleshooting <aws-troubleshooting>

To leverage the benefits of data monitoring across your infrastructure, connect Splunk Observability Cloud to AWS following these steps:

1. Verify the :ref:`prerequisites <aws-integration-prereqs>`.  
2. :ref:`Plan your integration <prep-for-aws-integration>`.
3. Choose among our :ref:`connection options <aws-connection-options-aws>`.
4. Optionally, you can :ref:`enable Metric Streams <aws-metricstreams>`.
5. Check our recommended :ref:`next steps <after-aws-integration>`.

.. note:: Check the :ref:`list of AWS integrations available in Splunk Observability Cloud <aws-integrations>`. 

You can also set the following configuration options to complete the integration:

- Select Amazon Web Services (AWS) regions to collect data from.
- Enable the ingestion of metrics through polling or streaming.
- Decide whether to process information about application logs.

Following configuration, you can use Amazon CloudWatch to import metrics and logs from supported AWS services into Splunk Observability Cloud, and analyze your data using Observability Cloud tools.

.. _aws-integration-prereqs:

.. raw:: html

  <embed>
    <h2>1. AWS integration prerequisites<a name="aws-integration-prereqs" class="headerlink" href="#aws-integration-prereqs" title="Permalink to this headline">¶</a></h2>
  </embed>

To connect AWS to Observability Cloud and integrate those platforms, you must meet the following prerequisites:

- Administrator privileges in Observability Cloud and your AWS accounts
- One of the following authentication methods:
    - An AWS IAM role and an external ID from Observability Cloud. An external ID is a random string used to establish a trust relationship between Observability Cloud and your AWS account. An external ID is automatically generated for you when you create a new AWS integration in Observability Cloud. See :new-page:`How to use an external ID when granting access to your AWS resources to a third party <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html>` in AWS documentation.
    - A secure token, which combines an access key ID and a secret access key

.. note:: 

  Observability Cloud supports all AWS regular regions, GovCloud, and China. However, the GovCloud and China regions require a secure token for access. 

.. _prep-for-aws-integration:

.. raw:: html

  <embed>
    <h2>2. Plan your integration<a name="prep-for-aws-integration" class="headerlink" href="#prep-for-aws-integration" title="Permalink to this headline">¶</a></h2>
  </embed>

Regardless of the connection option you choose, you can configure your system more efficiently if you decide beforehand what data types and sources you want.

To determine the best connection method and configuration settings, answer the following questions before you connect AWS to Splunk Observability Cloud:

- Do I want to collect metrics through API polling at specified intervals, or through CloudWatch Metric Streams? 
- Do I want to collect logs in addition to metrics? If yes, then include logs while configuring through the API or when given that option while performing a guided setup.

.. _aws-connection-options-aws:

.. raw:: html

  <embed>
    <h2>3. AWS connection options<a name="connection-options-aws" class="headerlink" href="#aws-connection-options-aws" title="Permalink to this headline">¶</a></h2>
  </embed>

You can connect Observability Cloud to AWS in several different ways. Choose the connection method that best matches your needs:

.. list-table::
  :header-rows: 1
  :widths: 50, 50

  * - :strong:`Connection option`
    - :strong:`Why use this?`

  * - Connect to AWS using the :ref:`guided setup <aws-wizardconfig>` in Splunk Observability Cloud
    - Guides you step-by-step to set up an AWS connection and default configuration in Observability Cloud. Guided setup includes links to Amazon CloudFormation templates that you can select to create needed AWS IAM roles.

  * - Connect to AWS using the :ref:`Splunk Observability Cloud API <get-configapi>`
    - Requires knowledge of POST and PUT call syntax, but includes options and automation that are not part of the guided setup. Choose this method if you want to configure many integrations at once. 

  * - Connect to AWS using :ref:`Splunk Terraform <terraform-config>`
    - Can be used if you already manage your infrastructure as code by deploying through Terraform.

See also the :new-page:`Splunk add-on for Amazon Kinesis Firehose <https://docs.splunk.com/Documentation/AddOns/latest/Firehose/ConfigureFirehose>`.

.. note:: Splunk is not responsible for data availability, and it can take up to several minutes (or longer, depending on your configuration) from the time you connect until you start seeing valid data from your account. 
  
By default, Splunk Observability Cloud will bring in data from all :ref:`supported AWS services <aws-integrations>` associated with your account. To limit the amount of data to import, see :ref:`specify-data-metadata`.

If you can't connect AWS to Observability Cloud, see :ref:`Troubleshoot your AWS connection <aws-troubleshooting>`.

.. _aws-metricstreams:

.. raw:: html

  <embed>
    <h2>4. Use Metric Streams to forward data to Splunk Observability Cloud<a name="aws-metricstreams" class="headerlink" href="#aws-metricstreams" title="Permalink to this headline">¶</a></h3>
  </embed>

Rather than polling for metrics data at specified intervals, CloudWatch Metric Streams sends metrics to a Kinesis Data Firehose stream, reducing latency. See :new-page:`Low Latency Observability Into AWS Services With Splunk <https://www.splunk.com/en_us/blog/devops/real-time-observability-splunk-cloudwatch-metric-streams.html>` in the DevOps blog for more information.

You can enable Metric Streams both with our :ref:`guided setup <aws-wizardconfig>`, or the :ref:`Splunk Observability Cloud API <get-configapi>`.

Although Metric Streams are more efficient than API polling, consider the constraints below.

.. _collection-interval-aws:

.. raw:: html

  <embed>
    <h3>Collection interval<a name="collection-interval-aws" class="headerlink" href="#collection-interval-aws" title="Permalink to this headline">¶</a></h3>
  </embed>

CloudWatch Metric Streams continually stream Amazon CloudWatch metrics as soon as they are published. In most cases, the metrics are published once per minute.

For customers currently collecting Amazon CloudWatch metrics at the default polling rate of 300 seconds (5 minutes), this difference in intervals typically increases Amazon CloudWatch usage costs.

Customers already polling at 1-minute intervals generally see a slight decrease in Amazon CloudWatch usage costs compared to Metric Streams.

.. _aws-data-limits:

.. raw:: html

  <embed>
    <h3>High data volume warning<a name="aws-data-limits" class="headerlink" href="#aws-data-limits" title="Permalink to this headline">¶</a></h3>
  </embed>

After an AWS integration is created, Observability Cloud checks if more than 100,000 metrics are fetched from CloudWatch. If this is the case, the integration gets automatically disabled, and a warning email is sent. 

This check runs just once per integration. If you enable the integration afterwards, it will work correctly. 

You can disable this check by setting the ``enableCheckLargeVolume`` field in the AWS integration to ``false`` :new-page:`using the API <https://dev.splunk.com/observability/reference/api/integrations/latest#endpoint-update-single-integration>`.

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
    <h2>5. Next steps<a name="after-aws-integration" class="headerlink" href="#after-aws-integration" title="Permalink to this headline">¶</a></h2>
  </embed>

After you're all set, we recommend the following:

* See :ref:`Leverage data from integration with AWS <aws-post-install>` for an overview of what you can do after you connect Observability Cloud to AWS.
* Learn about :ref:`our AWS Infrastructure Monitoring options <infrastructure-aws>`. You'll find instructions on how to import AWS metrics and metadata, or AWS tag and log information using namespaces and filters. 
* Refer to the AWS official documentation for a list of the available AWS metrics and other data, or read about :ref:`the metadata we provide <aws-infra-metadata>`.
* To collect traces and metrics of your AWS Lambda functions for Splunk APM, see :ref:`splunk-otel-lambda-layer`.

