.. _aws-privatelink:

*********************************************************************
Connect to AWS securely using Private Link 
*********************************************************************

.. meta::
  :description: Connect to AWS using Private Link.

You can use AWS Private Link to secure your traffic from your AWS environment to your Observability Cloud environment without exposing it to the Internet. 

AWS Private Link connects your Virtual Private Cloud (VPC) to your services, treating them as if they were in your VPC. You can control the specific API endpoints, sites, and services you can reach from your VPC. To learn more, see AWS private link documentation at :new-page:`https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html <https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html>`.

.. image:: /_images/gdi/aws-privatelink-schema.png
  :width: 80%
  :alt: AWS Private Link schema.

Prerequisites
==================================================

To connect Observability Cloud to AWS using Private Link, make sure you have:

* An active AWS account.
* Basic understanding of VPC concepts and networking principles.

Step 1: Create a VPC endpoint
==================================================

To create a VPC endpoint, follow these steps:

1. Log in to the AWS Management Console, and open :guilabel:`Amazon VPC service`.

2. On the left-hand navigation pane, select :guilabel:`Endpoints`.

3. Select :guilabel:`Create Endpoint`, and then :guilabel:`Other endpoint` services.

4. Verify the service name. To do so, work with your Splunk support team to:

  * Enable private link support for your AWS account.
  * Get your private link service name for your Observability realm.

5. Select the VPC in which you want to create the endpoint. Make sure the default VPC's region is the same as the region in which you're creating the endpoint.

6. Choose the subnet(s) within the VPC where the endpoint will reside. Make sure to select the subnets from all the availability zones.

7. Set the IP address type to ``IPv4``.

8. Specify the security group(s) controlling inbound and outbound traffic for the endpoint, and set the outbound rule for the selected security group(s) open for port ``443``.

.. image:: /_images/gdi/aws-privatelink-secgroups.png
    :width: 80%
    :alt: Specify security groups that control traffic.

9. Review the configuration details and select :guilabel:`Create Endpoint`.

Step 2: Use a VPC endpoint
==================================================

#. Identify the endpoint service associated with the VPC endpoint.
#. Test your application or service to ensure it successfully accesses the AWS service through the VPC endpoint.

Step 3: Manage your VPC endpoints
==================================================

You can list, modify, tag, or delete your VPC endpoints.

List endpoints
--------------------------------------------------

To see your endpoints, follow these steps:

#. Log in to the AWS Management Console and open the :guilabel:`Amazon VPC service`.
#. On the left-hand navigation pane, select :guilabel:`Endpoints`.
#. You'll see a list of all VPC endpoints available in your AWS account.

Modify endpoints
--------------------------------------------------

To modify endpoints, follow these steps:

#. Log in to the AWS Management Console and open the :guilabel:`Amazon VPC service`.
#. On the left-hand navigation pane, select :guilabel:`Endpoints`.
#. Select the VPC endpoint you want to modify.
#. Select :guilabel:`Actions`, and then :guilabel:`Modify Endpoint`. 
#. Update the necessary configuration settings, and save.

.. :note:: Make sure to enable the private DNS names under :guilabel:`Modify private DNS name settings`.

Tag endpoints
--------------------------------------------------

To tag endpoints, follow these steps:

#. Log in to the AWS Management Console and open the :guilabel:`Amazon VPC service`.
#. On the left-hand navigation pane, select :guilabel:`Endpoints`.
#. Select the VPC endpoint you want to tag.
#. Select :guilabel:`Actions`, and then :guilabel:`Add/Edit Tags`. 
#. Add the desired tags, and save.

Delete endpoints
--------------------------------------------------

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
