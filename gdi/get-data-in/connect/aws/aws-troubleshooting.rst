.. _aws-troubleshooting:

************************************
Troubleshoot your AWS connection
************************************

.. meta::
   :description: Resolve AWS policy and permissions conflicts in Splunk Observability Cloud.


If you experience issues when connecting Splunk Observability Cloud to your Amazon Web Services (AWS) account, they might be caused by conflicts between policies and permissions. See :ref:`aws-ts-logs` for specific log troubleshooting and :ref:`aws-ts-metric-streams` for issues specific to Metric Streams.   

.. caution:: Splunk is not responsible for data availability, and it can take up to several minutes (or longer, depending on your configuration) from the time you connect until you start seeing valid data from your account. 

.. _aws-ts-valid-connection:

Error validating AWS connection
================================

The automatic attempt to validate a connection that you just configured fails, so there is no connection between Splunk Observability Cloud and your AWS account.

Cause
^^^^^^

The connection might fail due to mismatched Identity Access Management (IAM) policies. To diagnose connection failure, check the permissions or policies you set up and compare them to the permissions that AWS requires.

Verify whether your error message looks similar to this example:

.. code-block:: none

   Error validating AWS / Cloudwatch credentials
   Validation failed for following region(s):
   us-east-1
   [ec2] software.amazon.awssdk.services.ec2.model.Ec2Exception: You are not authorized to perform this operation.

If you receive a similar error message, then the IAM policy that you created to connect AWS to Splunk Observability Cloud does not match the policy already in your AWS account.

Similarly, if your AWS account uses a service control policy (SCP) or administrative features such as ``PermissionsBoundary``, then there might be limits on which calls can be made in your organization, even if those calls are covered by your AWS IAM policy.

Solution
^^^^^^^^^

Splunk Observability Cloud uses the following calls to validate whether it can accept data from the AWS Compute Optimizer tool to support CloudWatch metric streams:

.. code-block:: none

   client.describeInstanceStatus(),
   client.describeTags(),
   client.describeReservedInstances(),
   client.describeReservedInstancesModifications()
   client.describeOrganization()

To ensure that your AWS integration works as expected, revisit your configuration choices in Splunk Observability Cloud to verify that they match the permissions policy in your AWS management console. 

A match ensures that conflicting permissions do not cause your AWS environment to block integrations. See the "Amazon CloudWatch permissions reference" in the Amazon documentation for details about the available permissions.

.. _aws-ts-cloud:

Splunk Observability Cloud doesn't work as expected
====================================================

Features or tools within Splunk Observability Cloud do not work as expected.

Cause
^^^^^^

When a feature in Splunk Observability Cloud does not work as expected after connection to AWS, then permissions for that feature in the AWS IAM policy are absent or blocking implementation. For example, ``ec2:DescribeRegions`` is used to detect which AWS regions are active in your account. Without that permission, or if no region is specified, then system settings default to AWS standard regions.

Metrics collection also depends on the the permissions you set. 

Solution
^^^^^^^^^

Review your :ref:`IAM policy <review-aws-iam-policy>` to ensure it includes the permissions needed for the metrics or other data that you intend to collect.

Once integrated with your Amazon Web Services account, Splunk Observability Cloud can gather CloudWatch metrics, CloudWatch logs, CloudWatch Metric Streams, service logs stored in Amazon S3 buckets, and service tag and property information. But leveraging the full power of the integration requires all included permissions.

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
            "regions": [],
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
            "regions": [],
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
      "regions": [],
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
