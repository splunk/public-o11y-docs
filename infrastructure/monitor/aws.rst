.. _infrastructure-aws:

**********************************
Monitor Amazon Web Services
**********************************

.. meta::
   :description: The Splunk Infrastructure Monitoring AWS integration imports AWS metrics, metadata, and logs from AWS CloudWatch. This information helps you monitor your AWS resources and the applications that are using those resources.

.. toctree::
   :hidden:

   Monitor AWS <aws-infra-monitor>
   Supported Amazon services <https://docs.splunk.com/Observability/gdi/get-data-in/integrations.html#amazon-web-services>
   Available AWS metadata <aws-infra-metadata>
   
Infrastructure Monitoring imports data, logs, and metadata, including tags and other properties, for the following :ref:`AWS services <aws-integrations>`.

To monitor AWS resources:

1. Set up the Infrastructure Monitoring AWS integration. To learn more see :ref:`get-started-aws`.
2. Next, check how to :ref:`monitor AWS with Infrastructure Monitoring <aws-infra-monitor>`.
3. Refer to the AWS official documentation for a list of the available AWS metrics and other data, or check :ref:`the metadata Observablity Cloud provides <aws-infra-metadata>`.

.. _aws-infra-otel:

.. raw:: html

   <embed>
      <h3>Monitor AWS with the OpenTelemetry Collector<a name="aws-infra-otel" class="headerlink" href="#aws-infra-otel" title="Permalink to this headline">¶</a></h3>
   </embed>

You can also use the Splunk Distribution of OpenTelemetry Collector (OTel) to import AWS metrics and metadata. OTel offers much more customization than you have available with the AWS integration, so you might want to use OTel when you want to see metrics at a finer resolution or when you need more control over the metrics you import.

You can only use the Collector when you have direct control over the applications installed on an AWS instance, such as AWS Elastic Compute Cloud (EC2). Some other AWS services require you to use Infrastructure Monitoring AWS integration and AWS CloudWatch. As a result, you might need to use both the AWS integration and OTel.

To learn how to install OTel, see :ref:`opentelemetry-resources`.