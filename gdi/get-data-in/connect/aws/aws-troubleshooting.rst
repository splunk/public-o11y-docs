.. _aws-troubleshooting:

************************************
Troubleshoot your AWS integration
************************************

.. meta::
   :description: Resolve AWS policy, permission conflicts, and other issues in Splunk Observability Cloud.

If you experience difficulties when connecting Splunk Observability Cloud to your Amazon Web Services (AWS) account or using the platform, read on to troubleshoot common issues. See :ref:`aws-ts-metric-streams` for issues specific to Metric Streams. 

If issues persist, you can also contact :ref:`support`.  

.. caution:: Splunk is not responsible for data availability, and it can take up to several minutes (or longer, depending on your configuration) from the time you connect until you start seeing valid data from your account. 

.. _aws-ts-valid-connection:

Error validating your AWS connection
=========================================

The automatic attempt to validate a connection that you just configured fails, so there is no connection between Splunk Observability Cloud and your AWS account.

Cause
^^^^^^

The connection might fail due to invalid Identity Access Management (IAM) policy used by your AWS integration.

If you use the AWS Organizations' :new-page:`Service control policies <https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html>` or :new-page:`Permission boundaries for IAM entities <https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html>`, they 
might impact the AWS IAM policy you're using to connect to Splunk Observability Cloud. 

Solution
^^^^^^^^^

Ensure all :ref:`aws-required-permissions` are included in your IAM policy.

Also review the AWS Organizations' policies and boundaries you're using.

.. _aws-ts-cloud:

Splunk Observability Cloud doesn't work as expected
====================================================

Features or tools within Splunk Observability Cloud do not work as expected.

Cause
^^^^^^

When a feature in Splunk Observability Cloud does not work as expected after connecting to AWS, it's likely that permissions for that feature in the AWS IAM policy are absent or blocking implementation. For example, ``ec2:DescribeRegions`` is used to detect which AWS regions are active in your account. Without that permission, or if no region is specified, then system settings default to AWS standard regions. To avoid unexpected issues, it's better to populate the regions field. See more at :ref:`AWS authentication and supported regions <aws-regions>`.

Metrics collection also depends on the the permissions you set. 

Solution
^^^^^^^^^

Review your :ref:`IAM policy <review-aws-iam-policy>` to ensure it includes the permissions needed for the metrics or other data that you intend to collect.

Once integrated with your Amazon Web Services account, Splunk Observability Cloud can gather CloudWatch metrics, CloudWatch Metric Streams, or service logs stored in Amazon S3 buckets, and service tag and property information. But leveraging the full power of the integration requires all included permissions.

.. _aws-ts-namespace-metrics:

Metrics and tags for a particular namespace are not displayed
==================================================================================

Metrics and tags for a particular namespace are not displayed as expected.

Causes
^^^^^^^^

If you use the AWS Organizations' :new-page:`Service control policies <https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html>` or :new-page:`Permission boundaries for IAM entities <https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html>`, they 
might impact the AWS IAM policy you're using to connect to Splunk Observability Cloud. 

If you modified the default IAM policy while setting up an integration between Splunk Observability Cloud and AWS, then your IAM policy does not list namespaces that were removed as not needed for the original integration, and as a result, Splunk Observability Cloud ignores metrics for those namespaces.

Solution
^^^^^^^^^

Review the AWS Organizations' policies and boundaries you're using.

Also, to ensure that you can see the metrics you expect to monitor, perform the following steps:

   #. Review the default IAM policy shown in :ref:`Connect to AWS using the Splunk Observability Cloud API <get-configapi>` to find the entry for the namespace you want.
   #. Add the missing entry to your AWS IAM file. For more information, search for "Editing IAM policies" in the AWS Identity and Access Management documentation.

.. _aws-ts-metric-discrepancy:

Discrepancies between AWS Cloudwatch and Splunk Observability Cloud metrics 
==========================================================================================

You observe discrepancies between AWS Cloudwatch and Splunk Observability Cloud metrics. 

There can be two main causes for metric discrepancies:

Cause 1: Metrics are not stable
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Some CloudWatch metrics are not stable, which means that the initial metric value published by CloudWatch might get updated after some time. Since Splunk Observability Cloud never fetches the same datapoint twice, this might result in value discrepancies. 

Solution 1
^^^^^^^^^^^^^^^^^^

You can configure selected namespaces to ignore a number of the most recent datapoints, typically 1 or 2, to mitigate this issue. To implement these configuration changes contact :ref:`support`.  

Cause 2: Charts are plotted using different time series
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

AWS Cloudwatch and Splunk Observability Cloud might be using a different set of time series to plot charts. 

Solution 2
^^^^^^^^^^^^^^^^^^

Some AWS Cloudwatch metrics are reported with various sets of dimensions, so ensure you're using the same set of data in both AWS Cloudwatch and Splunk Observability Cloud. 

.. _aws-ts-legacy-check-status:

Status check metrics are missing 
=====================================================

Metrics related to status check are missing.

Cause
^^^^^^

By default, status check metrics are not activated to reduce AWS CloudWatch cost and Splunk Observability Cloud system usage.

Solution
^^^^^^^^^

Activate status metrics for your integration. 

To do so, follow these steps:

1. Get the integration object from the API:

.. code-block:: none

   curl --request GET https://api.<realm>.signalfx.com/v2/integration?type=AWSCloudWatch&offset=0&limit=50&orderBy=-lastUpdated
   --header "X-SF-TOKEN:" \
   --header "Content-Type:application/json" > integration.json

You'll get something similar to:

.. code-block:: 

   {
      "count": 2,
      "results": [
         {
            "authMethod": "ExternalId",
            "created": 1674862496869,
            "createdByName": null,
            "creator": "E-tkECKAsAA",
            "customCloudWatchNamespaces": null,
            "enableAwsUsage": true,
            "enableCheckLargeVolume": true,
            "enabled": false,
            "externalId": "fyprhjmtpxttxwqhotep",
            "id": "integration-id",
            "importCloudWatch": true,
            "largeVolume": false,
            "lastUpdated": 1674862497253,
            "lastUpdatedBy": "E-tkECKAsAA",
            "lastUpdatedByName": "John Smith",
            "name": "AWS Dev",
            "pollRate": 300000,
            "regions": [ "us-east-1", "us-east-2", "us-west-1", "us-west-2" ],
            "roleArn": null,
            "services": [],
            "sfxAwsAccountArn": "arn:aws:iam::134183635603:root",
            "syncCustomNamespacesOnly": false,
            "syncLoadBalancerTargetGroupTags": false,
            "type": "AWSCloudWatch"
         },
         {
            "authMethod": "ExternalId",
            "created": 1522297476849,
            "createdByName": null,
            "creator": "CGa4fY-AoAA",
            "customCloudWatchNamespaces": null,
            "enableAwsUsage": true,
            "enableCheckLargeVolume": false,
            "enabled": true,
            "externalId": "uoejtvhsjnbcbdbfvbhg",
            "id": "DZTsWRwAkAA",
            "importCloudWatch": false,
            "largeVolume": false,
            "lastUpdated": 1671440367214,
            "lastUpdatedBy": "CGa4fY-AoAA",
            "lastUpdatedByName": "John Doe",
            "name": "AWS Prod",
            "pollRate": 300000,
            "regions": [ "us-east-1", "us-east-2", "us-west-1", "us-west-2" ],
            "roleArn": "arn:aws:iam::123456789012:role/splunk-o11y-role",
            "services": [],
            "sfxAwsAccountArn": "arn:aws:iam::134183635603:root",
            "syncCustomNamespacesOnly": false,
            "type": "AWSCloudWatch"
         }
      ]
   }

2. Modify the integration file as explained in steps 3 and 4.
3. Remove the fields below from the call, as these will be populated automatically:  

.. code-block:: none 

   ``created``   
   ``createdByName``
   ``creator``
   ``lastUpdated``
   ``lastUpdatedBy``
   ``lastUpdatedByName``

4. Include ``ignoreAllStatusMetrics``, set to ``false``, in the integration. It will look like this:

.. code-block:: 
   :emphasize-lines: 12

   {
      "authMethod": "ExternalId",
      "customCloudWatchNamespaces": null,
      "enableAwsUsage": true,
      "enableCheckLargeVolume": true,
      "enabled": false,
      "externalId": "fyprhjmtpxttxwqhotep",
      "id": "integration-id",
      "ignoreAllStatusMetrics": false,
      "importCloudWatch": true,
      "largeVolume": false,
      "name": "AWS Dev",
      "pollRate": 300000,
      "regions": [ "us-east-1", "us-east-2", "us-west-1", "us-west-2" ],
      "roleArn": null,
      "services": [],
      "sfxAwsAccountArn": "arn:aws:iam::134183635603:root",
      "syncCustomNamespacesOnly": false,
      "syncLoadBalancerTargetGroupTags": false,
      "type": "AWSCloudWatch"
   }

5. Update the integration object above using the API:

.. code-block:: none

   curl --request PUT https://api.<realm>.signalfx.com/v2/integration/<integration-id>
   --header "X-SF-TOKEN:" \
   --header "Content-Type:application/json" \
   --data "@integration.json" 

6. ``StatusCheckFailed`` is always ignored but now you can combine the other two status check metrics, ``StatusCheckFailed_Instance`` and ``StatusCheckFailed_System``, to obtain status information. 

   For more on AWS status check metrics, see the official AWS documentation.
