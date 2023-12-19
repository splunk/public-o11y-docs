.. _infrastructure-aws:

**********************************
Monitor Amazon Web Services
**********************************

.. meta::
   :description: The Splunk Infrastructure Monitoring AWS integration imports AWS metrics, metadata, and logs from AWS CloudWatch. This information helps you monitor your AWS resources and the applications that are using those resources.

.. toctree::
   :hidden:

   aws-infra-import.rst
   Monitor AWS <aws-infra-monitor>
   aws-infra-costs.rst
   Supported Amazon services <https://docs.splunk.com/Observability/gdi/get-data-in/integrations.html#amazon-web-services>
   Available AWS metadata <aws-infra-metadata>
   
Infrastructure Monitoring imports data, logs, and metadata, including tags and other properties, for the following :ref:`AWS services <aws-integrations>`.

To monitor AWS resources:

1. Set up the Infrastructure Monitoring AWS integration. To learn more see :ref:`get-started-aws`.
2. Next, check how to :ref:`monitor AWS with Infrastructure Monitoring <aws-infra-monitor>`.
3. Refer to the AWS official documentation for a list of the available AWS metrics and other data, or check :ref:`the metadata Observablity Cloud provides <aws-infra-metadata>`.

.. _aws-data:

.. raw:: html

   <embed>
      <h2>About AWS data<a name="aws-data" class="headerlink" href="#aws-data" title="Permalink to this headline">¶</a></h2>
   </embed>

See the AWS official documentation for a list of the available AWS metrics and other data, or see :ref:`the metadatada Observability Cloud provides <aws-infra-metadata>` for AWS.

By default, Observability Cloud brings in data from all :ref:`supported AWS services <aws-integrations>` associated with your account, with :ref:`certain limitations <aws-data-limits>`. To manage the amount of data to import, see :ref:`specify-data-metadata`.

.. _aws-namespaces:

.. raw:: html

   <embed>
      <h3>AWS namespaces</h3>
   </embed>

Observability Cloud imports AWS namespace metadata using the dimension ``namespace``. For most AWS services, the namespace name has the form ``"AWS/<NAME_OF_SERVICE>"``, such as "AWS/EC2" or "AWS/ELB". To select a metric time series (MTS) for an AWS metric when the metric has the same name for more than one service, such as ``CPUUtilization``, use the ``namespace`` dimension as a filter.

To control the amount of data you import, specify the namespaces you want to import as well as the data you want to import or exclude from each namespace. For more information, see :ref:`specify-data-metadata`.

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

You can track the degree of OpenTelemetry enablement in your AWS integrations by going to :guilabel:`Data Management > AWS`.

..  image:: /_images/gdi/aws-collector-insights.jpg
   :width: 100%
   :alt: Amount of AWS entities with the Collector installed.

Select the :guilabel:`OpenTelemetry Enabled` button to see whether the Collector is installed on each AWS EC2 instance. This will help you identify the instances that still need to be instrumented. For instances that are successfully instrumented, you can see which version of the Collector is deployed.