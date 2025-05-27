.. _aws-privatelink:

*********************************************************************
Private Connectivity using AWS PrivateLink
*********************************************************************

.. meta::
  :description: Connect to AWS using PrivateLink.

You can use Amazon Web Services (AWS) PrivateLink to secure your metric and traces traffic from your AWS environment to your Splunk Observability Cloud environment without exposing it to the internet. 

AWS PrivateLink connects your Virtual Private Cloud (VPC) to the AWS-hosted services that you use, treating them as if they were in your VPC. You can create and use VPC endpoints to securely access AWS-hosted services and control the specific API endpoints and sites. To learn more, see the AWS PrivateLink documentation at :new-page:`What is AWS PrivateLink? <https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html>`.

.. note:: 
  
  To send logs to Splunk Observability Cloud, use :ref:`lo-connect-landing`. 
  
  To send logs with AWS PrivateLink see :new-page:`Private connectivity in Splunk Cloud Platform <https://docs.splunk.com/Documentation/SplunkCloud/latest/Security/Privateconnectivityenable>`.

Prerequisites
==================================================

To connect Splunk Observability Cloud to AWS using AWS PrivateLink, you need the following:

* An active AWS account.
* A basic understanding of VPC concepts and networking principles.

Connect different accounts within or across regions
==============================================================

You can use AWS PrivateLink to connect different accounts in the same AWS region. The following diagram shows an overview of how AWS PrivateLink for Splunk Observability Cloud works: 

.. image:: /_images/gdi/AWS_PL_region1.jpg  
  :width: 80%
  :alt: AWS Private Link schema.

.. _aws-privatelink-endpoint-types:

AWS PrivateLink types of endpoint
==================================================

You can use any of these endpoints with AWS PrivateLink:

* Ingest endpoint. Use the Ingest endpoint to send data points directly from your applications to Splunk Observability Cloud. Data sent using the Ingest API is handled in the same manner as data gathered by Splunk Observability Cloud through other methods, such as integrations with :ref:`AWS cloud services <get-started-aws>`.

* API endpoint. Use the API endpoint to allow applications to communicate with each other by sending and receiving data. These endpoints serve as the points of interaction with different components like charts, dashboards, dashboard groups... 

* Stream endpoint. Use the Stream endpoint for continuous, real-time transmission of observability data such as logs, metrics, or traces. This endpoint is key for monitoring and analyzing system performance, identifying issues quickly, and maintaining overall system health.

.. _aws-privatelink-regions-names:

AWS PrivateLink availability and service name
==================================================

See the following sections for information on the available AWS source account regions, AWS PrivateLink endpoint URLs and service names for each AWS region.

.. _aws-source-regions:

AWS source account regions
--------------------------------------------------

See the following list for the supported AWS source account regions. Your AWS account region must be one of these regions:

    * US East (N. Virginia)	``us-east-1``
    * US East (Ohio)	``us-east-2``
    * US West (N. California)	``us-west-1``
    * US West (Oregon)	``us-west-2``
    * Africa (Cape Town)	``af-south-1``
    * Asia Pacific (Hong Kong)	``ap-east-1``
    * Asia Pacific (Hyderabad)	``ap-south-2``
    * Asia Pacific (Jakarta)	``ap-southeast-3``
    * Asia Pacific (Melbourne)	``ap-southeast-4``
    * Asia Pacific (Mumbai)	``ap-south-1``
    * Asia Pacific (Osaka)	``ap-northeast-3``
    * Asia Pacific (Seoul)	``ap-northeast-2``
    * Asia Pacific (Singapore)	``ap-southeast-1``
    * Asia Pacific (Sydney)	``ap-southeast-2``
    * Asia Pacific (Tokyo)	``ap-northeast-1``
    * Canada (Central)	``ca-central-1``
    * Canada West (Calgary)	``ca-west-1``
    * Europe (Frankfurt)	``eu-central-1``
    * Europe (Zurich)	``eu-central-2``
    * Europe (Ireland)	``eu-west-1``
    * Europe (London)	``eu-west-2``
    * Europe (Paris)	``eu-west-3``
    * Europe (Milan)	``eu-south-1``
    * Europe (Stockholm)	``eu-north-1``
    * Middle East (Bahrain)	``me-south-1``
    * Middle East (UAE)	``me-central-1``
    * South America (São Paulo)	``sa-east-1``

.. _aws-privatelink-endpoint-urls:

AWS PrivateLink endpoint URLs
--------------------------------------------------

.. list-table::
  :header-rows: 1
  :width: 100
  :widths: 10, 10, 20, 20, 20, 20

  * - Splunk Observability Cloud realm
    - AWS region
    - Ingest endpoint URL
    - API endpoint URL
    - Backfill endpoint URL
    - Stream endpoint URL

  * - jp0
    - AWS AP Tokyo (ap-northeast-1)
    - :new-page:`private-ingest.jp0.signalfx.com <http://private-ingest.jp0.signalfx.com/>`
    - :new-page:`private-api.jp0.signalfx.com <http://private-api.jp0.signalfx.com/>`
    - Coming soon
    - :new-page:`private-stream.jp0.signalfx.com <http://private-stream.jp0.signalfx.com/>`

  * - au0
    - AWS AP Sydney (ap-southeast-2)
    - :new-page:`private-ingest.au0.signalfx.com <http://private-ingest.au0.signalfx.com/>`
    - :new-page:`private-api.au0.signalfx.com <http://private-api.au0.signalfx.com/>`
    - Coming soon
    - :new-page:`private-stream.au0.signalfx.com <http://private-stream.au0.signalfx.com/>`

  * - eu1
    - AWS EU Frankfurt (eu-central-1)
    - :new-page:`private-ingest.eu1.signalfx.com <http://private-ingest.eu1.signalfx.com/>`
    - :new-page:`private-api.eu1.signalfx.com <http://private-api.eu1.signalfx.com/>`
    - Coming soon
    - :new-page:`private-stream.eu1.signalfx.com <http://private-stream.eu1.signalfx.com/>`

  * - eu0
    - AWS EU Dublin (eu-west-1)
    - :new-page:`private-ingest.eu0.signalfx.com <http://private-ingest.eu0.signalfx.com/>`
    - :new-page:`private-api.eu0.signalfx.com <http://private-api.eu0.signalfx.com/>`
    - Coming soon
    - :new-page:`private-stream.eu0.signalfx.com <http://private-stream.eu0.signalfx.com/>`

  * - eu2
    - AWS EU London (eu-west-2)
    - :new-page:`private-ingest.eu2.signalfx.com <http://private-ingest.eu2.signalfx.com/>`
    - :new-page:`private-api.eu2.signalfx.com <http://private-api.eu2.signalfx.com/>`
    - Coming soon
    - :new-page:`private-stream.eu2.signalfx.com <http://private-stream.eu2.signalfx.com/>`

  * - us0
    - AWS US East Virginia (us-east-1)
    - :new-page:`private-ingest.us0.signalfx.com <http://private-ingest.us0.signalfx.com/>`
    - :new-page:`private-api.us0.signalfx.com <http://private-api.us0.signalfx.com/>`
    - Coming soon
    - :new-page:`private-stream.us0.signalfx.com <http://private-stream.us0.signalfx.com/>`

  * - us1
    - AWS US West Oregon (us-west-2)
    - :new-page:`private-ingest.us1.signalfx.com <http://private-ingest.us1.signalfx.com/>`
    - :new-page:`private-api.us1.signalfx.com <http://private-api.us1.signalfx.com/>`
    - Coming soon
    - :new-page:`private-stream.us1.signalfx.com <http://private-stream.us1.signalfx.com/>`

.. _aws-privatelink-service-names:

AWS PrivateLink service names
--------------------------------------------------

.. list-table::
  :header-rows: 1
  :width: 100
  :widths: 10, 10, 20, 20, 20, 20

  * - Splunk Observability Cloud realm
    - AWS region
    - Ingest endpoint service name
    - API endpoint service name
    - Backfill endpoint service name
    - Stream endpoint service name

  * - jp0
    - AWS AP Tokyo (ap-northeast-1)
    - com.amazonaws.vpce.ap-northeast-1.vpce-svc-086c8167a74323e5a
    - com.amazonaws.vpce.ap-northeast-1.vpce-svc-06e1951072fcabaaa
    - Coming soon
    - com.amazonaws.vpce.ap-northeast-1.vpce-svc-0aebd0dfe769cc20b

  * - au0
    - AWS AP Sydney (ap-southeast-2)
    - com.amazonaws.vpce.ap-southeast-2.vpce-svc-01e4e31c294754b6e
    - com.amazonaws.vpce.ap-southeast-2.vpce-svc-0d1d69a0b1bf003cd
    - Coming soon
    - com.amazonaws.vpce.ap-southeast-2.vpce-svc-006a9808c3bf97fc1

  * - eu1
    - AWS EU Frankfurt (eu-central-1)
    - com.amazonaws.vpce.eu-central-1.vpce-svc-0163ebbf011db95fa
    - com.amazonaws.vpce.eu-central-1.vpce-svc-063722bf4a2e858a3
    - Coming soon
    - com.amazonaws.vpce.eu-central-1.vpce-svc-022080c55adaeac78

  * - eu0
    - AWS EU Dublin (eu-west-1)
    - com.amazonaws.vpce.eu-west-1.vpce-svc-01c194b2265ecb86e
    - com.amazonaws.vpce.eu-west-1.vpce-svc-07b08296ff84e17a0
    - Coming soon
    - com.amazonaws.vpce.eu-west-1.vpce-svc-0d036df6dbc6ddadb

  * - eu2
    - AWS EU London (eu-west-2)
    - com.amazonaws.vpce.eu-west-2.vpce-svc-0f7427a7b9ef925b0
    - com.amazonaws.vpce.eu-west-2.vpce-svc-0719f35de75c08514
    - Coming soon
    - com.amazonaws.vpce.eu-west-2.vpce-svc-0bc5b13127f2916ce

  * - us0
    - AWS US East Virginia (us-east-1)
    - com.amazonaws.vpce.us-east-1.vpce-svc-0336437d577075951
    - com.amazonaws.vpce.us-east-1.vpce-svc-089b68950f5be1c22
    - Coming soon
    - com.amazonaws.vpce.us-east-1.vpce-svc-0c7d803ea7ebe3157

  * - us1
    - AWS US West Oregon (us-west-2)
    - com.amazonaws.vpce.us-west-2.vpce-svc-06376c4a9be288ee9
    - com.amazonaws.vpce.us-west-2.vpce-svc-0da2bbb45fa4c3a6b
    - Coming soon
    - com.amazonaws.vpce.us-west-2.vpce-svc-0d78b8dec1a837389

.. _aws-privatelink-configure-vpc:

Configure your AWS PrivateLink VPC endpoints
=================================================================

Follow these steps to create, use, and manage your AWS PrivateLink VPC endpoint:

* :ref:`aws-privatelink-step1`
* :ref:`aws-privatelink-step2`
* :ref:`aws-privatelink-step3`
* :ref:`aws-privatelink-step4`

.. _aws-privatelink-step1:

Step 1: Request to add your AWS Account ID to the allow list
--------------------------------------------------------------------

Reach out to :ref:`Splunk Customer Support <support>` with the following information to include your AWS Account ID to the allow list:

* AWS Account ID

* Endpoint type
  
  * Ingest
  * API
  * Stream

* AWS source account region: It must be one of the regions listed in :ref:`aws-source-regions`.

* Splunk Observability AWS account region: It must be one of the regions listed in :ref:`aws-privatelink-service-names`.

.. note::

    * If you're setting up same-region PrivateLink connectivity, your AWS source account region is the same as the Splunk Observability AWS account region.

    * If you're setting up cross-region PrivateLink connectivity, your AWS source account region is different from the Splunk Observability AWS account region.

.. caution:: If your workloads are deployed in AWS regions not listed in :ref:`aws-source-regions`, then cross-region PrivateLink connectivity is not supported. In such cases, you should consider setting up VPC peering as described in :ref:`aws-privatelink-vpc-peering`.

.. _aws-privatelink-step2:

Step 2: Verify your AWS Account ID is added to the allow list
--------------------------------------------------------------------

.. caution:: Wait for Splunk Customer Support's confirmation that your AWS Account ID was added to the allow list before performing these steps. Support might take up to 24 hours.

To verify your AWS Account ID has been allowed, follow these steps:

1. Log in to the AWS Management Console and open the :guilabel:`Amazon VPC service` in the specific region where you intend to set up AWS PrivateLink.

2. On the left navigation pane, navigate to :guilabel:`PrivateLink and Lattice > Endpoints`.

3. Select :guilabel:`Create endpoint`, then :guilabel:`Endpoint services that use NLBs and GWLBs`. 

4. Under :guilabel:`Service Settings`, enter the :guilabel:`Service Name` based on the AWS region where you're configuring the VPC endpoint. Identify the appropriate service name using the :ref:`AWS PrivateLink service names table <aws-privatelink-service-names>`.

5. If you are setting up cross-region PrivateLink connectivity, check the :guilabel:`Enable Cross Region endpoint` checkbox. Based on the service name you used in point 4, select the appropriate Splunk Observability region.

.. image:: /_images/gdi/AWS_PL_region3.png
  :width: 80%
  :alt: Verify account.

.. caution:: If you are setting up PrivateLink connectivity in the same region do not check the Enable Cross Region endpoint checkbox.

6. Select :strong:`Verify Service`.

  * If you see the "Service name verified" message, proceed with :ref:`aws-privatelink-step3`. 

  * If you see the "Service name could not be verified" error message, your account ID is not yet allowed for the given service name. Reach out to Splunk Customer Support to check the status of your request from :ref:`aws-privatelink-step1`. 

.. _aws-privatelink-step3:

Step 3: Create a VPC endpoint
--------------------------------------------------

To create a VPC endpoint, follow these steps:

1. Under :guilabel:`Network settings` select the VPC where the endpoint will reside.

.. caution:: Under :guilabel:`Additional settings` do not select :guilabel:`Enable DNS name` at this point. Select this option after the VPC endpoint has been successfully created in :ref:`aws-privatelink-step4`.

2. Under :guilabel:`Subnets` select the subnet(s) where the endpoint will reside.

3. Under :guilabel:`Security groups` select the security group(s) controlling traffic for the endpoint. Make sure to set the outbound rule to HTTPS protocol and the ``443`` port.

4. Select :guilabel:`Create endpoint`.

.. _aws-privatelink-step4:

Step 4: Modify the endpoint to activate a Private DNS Name
----------------------------------------------------------------

To enable Private DNS Name, follow these steps:

#. Log in to the AWS Management Console.
#. Navigate to the :guilabel:`Amazon VPC service` in the region where you have created the VPC endpoint.
#. On the left navigation pane, select :guilabel:`Endpoints`.
#. Select the VPC endpoint you want to modify.
#. Under the :guilabel:`Actions` dropdown, select :guilabel:`Modify private DNS name`.
#. Under :guilabel:`Modify private DNS name settings`, check the :guilabel:`Enable private DNS names > Enable for this endpoint` checkbox.
#. Select :guilabel:`Save Changes`.

Delete a VPC endpoint
--------------------------------------------------

You can list, modify, tag, or delete your VPC endpoints.

To delete an endpoint, follow these steps:

#. Log in to the AWS Management Console and open the :guilabel:`Amazon VPC service`.
#. On the left navigation pane, select :guilabel:`Endpoints`.
#. Select the VPC endpoint you want to delete.
#. Confirm the deletion when prompted.

.. _aws-privatelink-vpc-peering:

Use AWS PrivateLink with VPC peering 
==========================================================================

If the workloads that you're monitoring with Splunk Observability Cloud are not in the :ref:`aws-source-regions` list, follow the steps below:

1. In your AWS account, either use an existing VPC or create a new VPC in one of Splunk Observability's AWS account regions mentioned in the :ref:`aws-privatelink-service-names`.

2. Set up AWS VPC peering between the regions where the workloads are being monitored and the region where the VPC used in step 1 is located.

3. Follow :ref:`aws-privatelink-configure-vpc` to activate the AWS PrivateLink endpoint connection from the region where the VPC used in step 1 is located.

Learn more about VPC Peering in the AWS documentation at :new-page:`Two VPCs peered together <https://docs.aws.amazon.com/vpc/latest/peering/peering-configurations-full-access.html#two-vpcs-full-access>`.

Use AWS PrivateLink with the OpenTelemetry Collector 
==========================================================================

To use AWS PrivateLink URLs in your Collector instance, update the necessary variables in your Collector configuration to point to the given endpoint type: 

.. list-table::
  :header-rows: 1
  :width: 100
  :widths: 20, 40, 40

  * - Endpoint type
    - Endpoint URL
    - Example

  * - Metric ingest endpoint
    - ``private-ingest.<realm>.signalfx.com``
    - ``private-ingest.us0.signalfx.com``

  * - Traces ingest endpoint
    - ``private-ingest.<realm>.signalfx.com/v2/trace``
    - ``private-ingest.us0.signalfx.com/v2/trace``

  * - API endpoint URL
    - ``http://private-api.<realm>.signalfx.com``
    - ``http://private-api.us0.signalfx.com``


See all PrivateLink URLs at :ref:`aws-privatelink-endpoint-urls`.

For information about the Collector's environment variables see :ref:`collector-env-var`.

.. _aws-privatelink-support:

.. raw:: html

   <div class="include-start" id="report-issue.rst"></div>

.. include:: /_includes/report-issue.rst

.. raw:: html

   <div class="include-stop" id="report-issue.rst"></div>



