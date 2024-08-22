.. _infrastructure-aws:

**********************************
Monitor Amazon Web Services
**********************************

.. meta::
   :description: The Splunk Infrastructure Monitoring AWS integration imports AWS metrics, metadata, and logs from AWS CloudWatch. This information helps you monitor your AWS resources and the applications that are using those resources.

.. toctree::
   :hidden:

   Manage AWS data import <aws-infra-import.rst>
   Monitor AWS <aws-infra-monitor>
   aws-infra-costs.rst
   Supported Amazon services <https://docs.splunk.com/observability/en/gdi/integrations/cloud-aws.html#cloud-aws>
   Available AWS metadata <aws-infra-metadata>
   
Splunk Observability Cloud's Infrastructure Monitoring imports data, logs, and metadata, including tags and other properties, for the following :ref:`AWS services <aws-integrations>`.

To monitor AWS resources:

1. Set up the Infrastructure Monitoring AWS integration. To learn more see :ref:`get-started-aws`.
2. :ref:`aws-infra-import`.
3. Next, learn how to :ref:`monitor AWS with Splunk Observability Cloud <aws-infra-monitor>`.
4. Finally, check :ref:`aws-infra-costs`.
5. Refer to the AWS official documentation for a list of the available AWS metrics and other data, or see :ref:`the metadata Observablity Cloud provides <aws-infra-metadata>`.

.. _aws-data:

.. raw:: html

   <embed>
      <h2>About AWS data<a name="aws-data" class="headerlink" href="#aws-data" title="Permalink to this headline">¶</a></h2>
   </embed>

See the AWS official documentation for a list of the available AWS metrics and other data, or see :ref:`the metadatada Splunk Observability Cloud provides <aws-infra-metadata>` for AWS.

By default, Splunk Observability Cloud brings in data from all :ref:`supported AWS services <aws-integrations>` associated with your account, with :ref:`certain limitations <aws-data-limits>`. To manage the amount of data to import, see :ref:`specify-data-metadata`.

.. _aws-unique-id:

.. raw:: html

   <embed>
      <h3>Uniquely identifying AWS instances</h3>
   </embed>

The AWS instance ID is not a unique identifier. To uniquely identify an AWS instance, you need to concatenate the ``instanceId``, ``region``, and ``accountID`` dimension values, separated by underscores "\_", as in ``instanceId_region_accountID``.

To construct the identifier manually, first get the specified values for each of your instances. For example, you can
use the following ``cURL`` command:

.. code-block:: none

   curl http://<INSTANCE_URL>/latest/dynamic/instance-identity/document

Here's an example JSON response from the ``cURL`` command:

.. code-block:: json

   {
      "devpayProductCodes" : null,
      "privateIp" : "10.1.15.204",
      "availabilityZone" : "us-east-1a",
      "version" : "2010-08-31",
      "accountId" : "134183635603",
      "instanceId" : "i-a99f9802",
      "billingProducts" : null,
      "instanceType" : "c3.2xlarge",
      "pendingTime" : "2015-09-02T16:45:40Z",
      "imageId" : "ami-2ef44746",
      "kernelId" : null,
      "ramdiskId" : null,
      "architecture" : "x86_64",
      "region" : "us-east-1"
   }

From the response, copy the values for ``instanceId``, ``region``, and ``accountId``. Concatenate them with
underscores as separators, and use the resulting string identifier as the value for the ``sfxdim\_AWSUniqueId`` dimension.

.. _sfx-aws-metrics:

.. raw:: html

   <embed>
      <h3>Organization metrics related to AWS</h3>
   </embed>

Infrastructure Monitoring also sends a set of metrics for AWS related to errors and service calls for your organization. These metrics all start with ``sf.org.num.aws``. For more information, see :ref:`org-metrics`.

.. _aws-infra-otel:

.. raw:: html

   <embed>
      <h2>Monitor AWS with the OpenTelemetry Collector<a name="aws-infra-otel" class="headerlink" href="#aws-infra-otel" title="Permalink to this headline">¶</a></h2>
   </embed>

You can also use the Splunk Distribution of OpenTelemetry Collector to import AWS metrics and metadata. The Collector offers much more customization than you have available with the AWS integration, so you might want to use it when you want to see metrics at a finer resolution or when you need more control over the metrics you import. 

You can only use the Collector when you have direct control over the applications installed on an AWS instance, such as AWS Elastic Compute Cloud (EC2). Some other AWS services require you to use Infrastructure Monitoring AWS integration and AWS CloudWatch. As a result, you might need to use both the AWS integration and OTel.

To learn more, see :ref:`otel-intro`.

.. raw:: html

   <embed>
      <h3>Track OpenTelemetry enablement</h3>
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