.. _get-started-aws:

************************************************************
Connect AWS to Splunk Observability Cloud 
************************************************************

.. meta::
  :description: Connection planning information and links to the different ways to connect AWS to Splunk Observability Cloud.

.. toctree::
  :hidden:
  :maxdepth: 5

  AWS authentication and supported regions <aws-prereqs>
  Compare connection options <aws-compare-connect>
  Connect via polling <aws-connect-polling>
  Connect with Splunk-managed Metrics Streams <aws-connect-ms>
  Connect with AWS-managed Metric Streams <aws-console-ms>  
  Connect to AWS using the Splunk API <aws-apiconfig>  
  Connect to AWS with Terraform <aws-terraformconfig>
  CloudFormation and Terraform templates <aws-cloudformation>
  Send AWS logs to Splunk Platform <aws-logs>
  Next steps <aws-post-install>
  Troubleshoot your AWS integration <aws-troubleshooting>
  Troubleshoot Metric Streams <aws-ts-metric-streams>
  GetMetricStatistics API deprecation notice <aws-api-notice>
  aws-tutorial/about-aws-tutorial.rst

You have several data ingestion and connection methods when it comes to monitoring your Amazon Web Services (AWS) data in Splunk Observability Cloud. 

.. note:: If you want to send AWS data to the Splunk platform, use the Splunk add-on. Learn more at :new-page:`Splunk Add-on for AWS <https://docs.splunk.com/Documentation/AddOns/released/AWS/Description>`.

Before you start, see :ref:`aws-prereqs`, and check the :ref:`Supported AWS integrations in Splunk Observability Cloud <aws-integrations>`. 

.. _aws-connection-options:
.. _aws-ingest:
.. _aws-api-polling:
.. _aws-metricstreams:

.. raw:: html

  <embed>
    <h2>Available options to connect with AWS<a name="aws-connection-options" class="headerlink" href="#aws-connection-options" title="Permalink to this headline">¶</a></h2>
  </embed>

See a comparison of the connection options at :ref:`aws-compare-connect`, and choose the connection method that best matches your needs:

.. list-table::
  :header-rows: 1
  :width: 100%
  :widths: 50, 50

  * - :strong:`Connection option`
    - :strong:`Available at`

  * - :ref:`Polling (default) <aws-connect-polling>` 
    - Use either the Splunk Observability Cloud UI guided setup or the Splunk Observability Cloud API.

  * - :ref:`Streaming (Splunk-managed) <aws-connect-ms>` 
    - Use either the Splunk Observability Cloud UI guided setup or the Splunk Observability Cloud API.

  * - :ref:`Streaming (AWS-managed) <aws-console-ms>`
    - Connect and manage Metric Streams from the AWS console.
    
  * - :ref:`Managing your infrastructure as code (Splunk Terraform) <terraform-config>`
    - If you already manage your infrastructure as code, continue deploying through Splunk Terraform.

.. note:: If you can't connect AWS to Splunk Observability Cloud, see :ref:`Troubleshoot your AWS connection <aws-troubleshooting>`.

.. raw:: html

  <embed>
    <h3>Constraints and limitations for data polling<a name="aws-metricstreams" class="headerlink" href="#aws-metricstreams" title="Permalink to this headline">¶</a></h3>
  </embed>

There are constraints to consider in terms of high data volume and filtering.

.. _aws-data-limits:

.. raw:: html

  <embed>
    <h4>High data volume warning <a name="aws-data-limits" class="headerlink" href="#aws-data-limits" title="Permalink to this headline">¶</a></h4>
  </embed>

After you create an AWS integration, if it retrieves more than 100,000 metrics from CloudWatch, Splunk Observability Cloud automatically deactivates the integration and sends you a warning email.

This check runs once per integration. If you activate the integration afterwards, it will work correctly.

You can deactivate this check by setting the ``enableCheckLargeVolume`` field in the AWS integration to ``false`` using the API. See the :new-page:`API reference guide <https://dev.splunk.com/observability/reference/api/integrations/latest#endpoint-update-single-integration>` in the Splunk Observability developer docs.

.. _tag-filtering-aws:

.. raw:: html

  <embed>
    <h4>Tag filtering<a name="tag-filtering-aws" class="headerlink" href="#tag-filtering-aws" title="Permalink to this headline">¶</a></h4>
  </embed>

If you filter data based on tags, your costs for Amazon CloudWatch and Splunk Infrastructure Monitoring might decrease. Read more at :ref:`specify-data-metadata`.

.. include:: /_includes/gdi/aws-unsupported-chars.rst

.. raw:: html

  <embed>
    <h3>Constraints and limitations for streaming<a name="aws-metricstreams" class="headerlink" href="#aws-metricstreams" title="Permalink to this headline">¶</a></h3>
  </embed>

CloudWatch Metric Streams supports filtering by namespace and metric name but doesn't support filtering based on resource tags.

.. raw:: html

  <embed>
    <h2>Imported data<a name="aws-imported-data" class="headerlink" href="#aws-imported-data" title="Permalink to this headline">¶</a></h2>
  </embed>

By default, Splunk Observability Cloud brings in data from all supported AWS services associated with your account. See :ref:`Supported integrations in Splunk Observability Cloud <aws-integrations>`.

To manage the amount of data to import, see :ref:`aws-infra-import`.  

.. _aws-data-availability:

.. raw:: html

  <embed>
    <h2>Data availability<a name="aws-data-availability" class="headerlink" href="#aws-data-availability" title="Permalink to this headline">¶</a></h2>
  </embed>

.. caution:: Splunk Observability Cloud is not responsible for data availability. 
  
Depending on your configuration, it might take up to several minutes from the time you connect until you start seeing valid data from your account.

If you're streaming data with Metric Streams, the configured buffering settings on the Kinesis Data Firehose delivery stream determine how long it takes for data to appear.

* Buffering is expressed in maximum payload size or maximum wait time, whichever is reached first. 
* If set to the minimum values (60 seconds or 1MB) the expected latency is within 3 minutes if the selected CloudWatch namespaces have active streams.

.. raw:: html

  <embed>
    <h2>Data collection interval and costs<a name="aws-collection-interval" class="headerlink" href="#aws-collection-interval" title="Permalink to this headline">¶</a></h2>
  </embed>

In most cases, metrics are reported every minute. However, some services use a different cadence. For example, selected S3 metrics are reported on a daily basis. Check the AWS documentation to verify how often your services' metrics are reported.

Collecting Amazon CloudWatch metrics through the polling APIs at the default polling rate of 300 seconds (5 minutes) is usually cheaper than using Metric Streams. On the other hand, if you set polling intervals to 1 minute, generally you see an increase in Amazon CloudWatch usage costs compared to Metric Streams.

Learn more at :ref:`Costs for AWS monitoring <aws-costs>`.

.. _aws-collector:

.. raw:: html

  <embed>
    <h2>Install the Splunk Distribution of OpenTelemetry Collector<a name="install-splunk-otel-collector" class="headerlink" href="#install-splunk-otel-collector" title="Permalink to this headline">¶</a></h2>
  </embed>

To take advantage of the full benefits of the Splunk Observability Cloud platform, install the :ref:`Splunk Distribution of the OpenTelemetry Collector <otel-intro>`.

.. raw:: html

  <embed>
    <h3>Track your OpenTelemetry enablement<a name="install-splunk-otel-collector-enablement" class="headerlink" href="#install-splunk-otel-collector-enablement" title="Permalink to this headline">¶</a></h3>
  </embed>

To track the degree of OpenTelemetry enablement in your AWS integrations: 

1. From Splunk Observability Cloud, go to :guilabel:`Data Management > Deployed integrations > AWS`.

2. Select either the :guilabel:`AWS EC2` or :guilabel:`AWS EKS` tabs to see whether the OTel Collector is installed on each AWS EC2 instance or AWS EKS cluster. This helps you identify the instances that still need to be instrumented. 

..  image:: /_images/gdi/aws-collector-insights.jpg
  :width: 80%
  :alt: Amount of AWS entities with the Collector installed.

3. For OTel Collector instances that are successfully instrumented, you can see which version of the Collector is deployed.  

..  image:: /_images/gdi/aws-collector-insights-version.png
  :width: 80%
  :alt: Collector enablement in AWS EKS, with information on version installed

.. _aws-connection-options-more:

.. raw:: html

  <embed>
    <h2>Private connectivity<a name="aws-connection-options-more" class="headerlink" href="#aws-connection-options-more" title="Permalink to this headline">¶</a></h2>
  </embed>  

Splunk Observability Cloud also offers secured connectivity with AWS. For more information, see :ref:`aws-privatelink`.

.. _after-aws-integration:

.. raw:: html

  <embed>
    <h2>See also<a name="after-aws-integration" class="headerlink" href="#after-aws-integration" title="Permalink to this headline">¶</a></h2>
  </embed>

* For a walkthrough of tasks related to using AWS cloud services with your infrastructure, see :ref:`about-collector-configuration-tutorial`.
* See :ref:`Leverage data from integration with AWS <aws-post-install>` for an overview of what you can do after you connect Splunk Observability Cloud to AWS.
* Find instructions on how to import AWS metrics and metadata such as tags using namespaces and filters at :ref:`Monitor AWS services <infrastructure-aws>`. 
* Refer to the AWS official documentation for a list of the available AWS metrics and other data, or read about the metadata Splunk Observability Cloud can provide at :ref:`AWS CloudWatch metadata <aws-infra-metadata>`.
* To collect traces and metrics of your AWS Lambda functions for Splunk APM, see :ref:`splunk-otel-lambda-layer`.

