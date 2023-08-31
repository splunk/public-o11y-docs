.. _aws-privatelink:

*********************************************************************
Connect to AWS securely using PrivateLink 
*********************************************************************

.. meta::
  :description: Connect to AWS using PrivateLink.

You can use AWS PrivateLink to secure your traffic from your AWS environment to your Observability Cloud environment without exposing it to the Internet. 

AWS PrivateLink connects your Virtual Private Cloud (VPC) to your AWS services, treating them as if they were in your VPC. You can create and use VPC endpoints to securely access AWS services, and control the specific API endpoints and sites. To learn more, see AWS private link documentation at :new-page:`https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html <https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html>`.

.. image:: /_images/gdi/aws-privatelink-schema.png
  :width: 80%
  :alt: AWS Private Link schema.

Prerequisites
==================================================

To connect Observability Cloud to AWS using PrivateLink, make sure you have:

* An active AWS account.
* Basic understanding of VPC concepts and networking principles.

PrivateLink availability and service name
==================================================

Availability of PrivateLink Across AWS Regions
--------------------------------------------------

.. list-table::
  :header-rows: 1
  :width: 100
  :widths: 20, 20, 20, 20, 20

  * - AWS region
    - Ingest endpoint URL
    - API endpoint URL
    - Backfill endpoint URL
    - Stream endpoint URL

  * - ap-southeast-2
    - :new-page:`private-ingest.au0.signalfx.com <http://private-ingest.au0.signalfx.com/>`
    - :new-page:`private-api.au0.signalfx.com <http://private-api.au0.signalfx.com/>`
    - :new-page:`private-backfill.au0.signalfx.com <http://private-backfill.au0.signalfx.com/>`
    - :new-page:`private-stream.au0.signalfx.com <http://private-stream.au0.signalfx.com/>`

  * - ap-southeast-2
    - Ingest endpoint URL
    - API endpoint URL
    - Backfill endpoint URL
    - Stream endpoint URL


Step 1: Create a VPC endpoint
--------------------------------------------------


Configure AWS PrivateLink with VPC peering configured
=================================================================



Let's examine a scenario where the customer's source region is ap-south-1(the region generating their data), and their destination region is us-east-1 (where the customer has established a VPC connection). The customer intends to transmit data to o11y's us-east-1 region.

In this context, it is advisable to establish a VPC Endpoint within the customer's destination region us-east-1. Activating PrivateLink within this region offers a secure and private channel to access AWS services available in the customer's source region ap-south-1. This arrangement ensures that communication between the two VPCs occurs through an internal network, removing the necessity of routing traffic over the public internet.

Through the implementation of PrivateLink in the customer's destination region, a seamless and secure linkage is established between the two regions. This enhancement bolsters data integrity and security, aligning with the goal of optimizing inter-region communication while upholding stringent data protection standards.

Learn more at AWS official documentation :new-page:`Two VPCs peered together <https://docs.aws.amazon.com/vpc/latest/peering/peering-configurations-full-access.html#two-vpcs-full-access>`.

Step 1: Create a VPC endpoint
--------------------------------------------------

To create a VPC endpoint, follow these steps:

1. Log in to the AWS Management Console, and open :guilabel:`Amazon VPC service` within the specific region where you intend to set up PrivateLink.

  * If you have a VPC peering configuration, keep in mind the destination region of VPC peering.

2. On the left-hand navigation pane, select :guilabel:`Endpoints`.

3. Select :guilabel:`Create Endpoint`, and then :guilabel:`Other endpoint` services.

4. Verify the service name. To do so, work with your Splunk support team to:

  * Enable PrivateLink support for your AWS account in the specific realm.
  * Get your PrivateLink service name for your Observability realm.
  * Include your customer account numbers in the allow list of the Observability realm VPC endpoint.

5. Select the VPC in which you want to create the endpoint. Make sure the default VPC's region is the same as the region in which you're creating the endpoint.

6. Choose the subnet(s) within the VPC where the endpoint will reside. Make sure to select the subnets from all the availability zones.

7. Set the IP address type to ``IPv4``.

8. Specify the security group(s) controlling inbound and outbound traffic for the endpoint, and set the outbound rule for the selected security group(s) open for port ``443``.

.. image:: /_images/gdi/aws-privatelink-secgroups.png
    :width: 80%
    :alt: Specify security groups that control traffic.

9. Review the configuration details and select :guilabel:`Create Endpoint`.

Step 2: Use a VPC endpoint
--------------------------------------------------

#. Identify the endpoint service associated with the VPC endpoint you established.
#. Test your application or service to ensure it successfully accesses the AWS service through the VPC endpoint.

Step 3: Manage your VPC endpoints
--------------------------------------------------

You can list, modify, tag, or delete your VPC endpoints.

List endpoints
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To see your endpoints, follow these steps:

#. Log in to the AWS Management Console and open the :guilabel:`Amazon VPC service` in the specific region where you set up PrivateLink.
#. On the left-hand navigation pane, select :guilabel:`Endpoints`.
#. You'll see a list of all VPC endpoints available in your AWS account.

Modify endpoints
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To modify endpoints, follow these steps:

#. Log in to the AWS Management Console and open the :guilabel:`Amazon VPC service`.
#. On the left-hand navigation pane, select :guilabel:`Endpoints`.
#. Select the VPC endpoint you want to modify.
#. Select :guilabel:`Actions`, and then :guilabel:`Modify Endpoint`. 
#. Update the necessary configuration settings, and save.

.. :note:: Make sure to enable the private DNS names under :guilabel:`Modify private DNS name settings`.

Tag endpoints
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To tag endpoints, follow these steps:

#. Log in to the AWS Management Console and open the :guilabel:`Amazon VPC service`.
#. On the left-hand navigation pane, select :guilabel:`Endpoints`.
#. Select the VPC endpoint you want to tag.
#. Select :guilabel:`Actions`, and then :guilabel:`Add/Edit Tags`. 
#. Add the desired tags, and save.

Delete endpoints
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To delete endpoints, follow these steps:

#. Log in to the AWS Management Console and open the :guilabel:`Amazon VPC service`.
#. On the left-hand navigation pane, select :guilabel:`Endpoints`.
#. Select the VPC endpoint you want to delete.
#. Select :guilabel:`Actions`, and then :guilabel:`Delete Endpoint`.
#. Confirm the deletion when prompted.

Next steps
================

After you connect Splunk Observability Cloud with AWS, you can use Observability Cloud to track a series of metrics and analyze your AWS data in real time. 

- See the AWS official documentation for a list of the available AWS resources.
- See :ref:`how to leverage data from integration with AWS <aws-post-install>` for more information.

Troubleshooting
==================

.. include:: /_includes/troubleshooting-steps.rst
