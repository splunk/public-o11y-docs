.. _aws-prereqs:
.. _aws-integration-prereqs:

************************************************************
AWS authentication and supported regions 
************************************************************

.. meta::
  :description: Connection planning information and links to the different ways to connect AWS to Splunk Observability Cloud.

To connect your AWS services to Spulnk Observability Cloud you need: 

- Administrator privileges in Splunk Observability Cloud and your AWS accounts. 
- :ref:`AWS authentication rights <aws-authentication>`. You can authenticate either with an :ref:`External Id (recommended) <aws-authentication>` or using a :ref:`security token <aws-authentication-token>`.

.. _aws-authentication:

Authenticate in AWS using an External Id (recommended)
============================================================

In AWS you manage access by creating policies and attaching them to IAM identities or AWS resources. A policy is a JSON object that associates an identity or resource with access permissions. When a user (in this case, your account in Splunk Observability Cloud) makes a request, AWS evaluates the associated policy and determines whether the request is allowed or denied. 

For most AWS regions, use :guilabel:`External ID` to authenticate. Follow these steps: 

* An :strong:`External ID` for Splunk Observability Cloud. An external ID is a random string used to establish a trust relationship between Splunk Observability Cloud and your AWS account. It's automatically generated for you when you create a new AWS integration in Splunk Observability Cloud. See :new-page:`How to use an external ID when granting access to your AWS resources to a third party <https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html>` in AWS documentation.
* An :ref:`Identity and Access Management (IAM) policy <aws-iam-policy>`. 
* An :ref:`AWS IAM role <aws-iam-role>`. 

.. _aws-iam-policy:

Create an AWS IAM policy
-------------------------------------------

Splunk Observability Cloud refers to an IAM policy to collect data from every supported AWS service. 

To create a new AWS IAM policy, follow these steps:

#. Log into your Amazon Web Services account and look for the :guilabel:`Identity and Access Management (IAM)` service.
#. Create a new policy. In the :strong:`JSON` tab, replace the placeholder JSON with the pertinent AWS IAM policy JSON. Guided setup provides this policy in the :guilabel:`Prepare AWS Account` step. See also some :ref:`policy examples <aws-api-create-policy-role>`.
#. Follow the instructions to complete the process and create the policy.

.. :note:: The default AWS IAM policy supports metrics and log collection. To learn how to add support for CloudWatch Metric Streams, see :ref:`aws-wizard-metricstreams`.

If you have any doubts, check AWS documentation.  

.. _aws-iam-role:

Create an AWS IAM role
-------------------------------------------

After creating an AWS IAM policy, you need to assign that policy to a particular role by performing the following steps in the Amazon Web Services console:

#. Go to :strong:`Roles`, then :strong:`Create Role`, and select :strong:`Another AWS account` as the type of trusted entity.
#. Copy and paste the Account ID displayed in guided setup into the :strong:`Account ID` field.
#. Select :strong:`Require external ID`. Copy and paste the External ID displayed in the guided setup into the :strong:`External ID` field.
#. Continue with :strong:`Next: Permissions`. Under :strong:`Policy name`, select the policy you made in the previous step.
#. Follow the instructions, and name and create your new AWS IAM role.  

Creating the AWS IAM role generates the ``Role ARN`` used to establish connection with AWS. Copy the created ARN role, and paste it into the :strong:`Role ARN` field in the guided setup.

If you have any doubts, check AWS documentation.

.. _aws-authentication-token:

Authenticate in AWS using a security token
============================================

For the :strong:`GovCloud or China regions`, select the option to authenticate using a secure token, which combines an Access key ID and Secret access key you'll create in your AWS Console.

When you're creating the new permission for your user and are prompted for an access key practice, select :guilabel:`Third-party service`.

.. _aws-regions:

Supported AWS regions
============================================

If you want to activate a specific optional region, you need to do it before adding it to the integration. Make sure you've activated the optional regions you'll need in your AWS console first. Regular regions are activated in AWS by default.

  * If you're using the :ref:`UI guided setup <aws-wizardconfig>` to create the integration, you'll be prompted to select which AWS regions you work with. 
  * If you're :ref:`using the API <get-configapi>` and supply an empty list in an API call, Splunk Observability Cloud activates all regular regions. If you add the ``ec2:DescribeRegions`` permission to your AWS policy, optional regions you've activated on your AWS account are activated in Splunk Observability Cloud as well. 

Splunk Observability Cloud supports the following AWS regions:

Regular
-------------------------------------------

* ``ap-northeast-1``: Asia Pacific (Tokyo)
* ``ap-northeast-2``: Asia Pacific (Seoul)
* ``ap-northeast-3``: Asia Pacific (Osaka)
* ``ap-south-1``: Asia Pacific (Mumbai)
* ``ap-southeast-1``: Asia Pacific (Singapore)
* ``ap-southeast-2``: Asia Pacific (Sydney)
* ``ca-central-1``: Canada (Central)
* ``eu-central-1``: Europe (Frankfurt)
* ``eu-north-1``: Europe (Stockholm)
* ``eu-west-1``: Europe (Ireland)
* ``eu-west-2``: Europe (London)
* ``eu-west-3``: Europe (Paris)
* ``sa-east-1``: South America (Sao Paulo)
* ``us-east-1``: US East (N. Virginia)
* ``us-east-2``: US East (Ohio)
* ``us-west-1``: US West (N. California)
* ``us-west-2``: US West (Oregon)

Optional
-------------------------------------------

* ``af-south-1``: Africa (Cape Town)
* ``ap-east-1``: Asia Pacific (Hong Kong)
* ``ap-south-2``: Asia Pacific (Hyderabad)
* ``ap-southeast-3``: Asia Pacific (Jakarta)
* ``ap-southeast-4``: Asia Pacific (Melbourne)
* ``eu-central-2``: Europe (Zurich)
* ``eu-south-1``: Europe (Milan)
* ``eu-south-2``: Europe (Spain)
* ``me-central-1``: Middle East (UAE)
* ``me-south-1``: Middle East (Bahrain)

GovCloud
-------------------------------------------

* ``us-gov-east-1``: AWS GovCloud (US-East)
* ``us-gov-west-1``: AWS GovCloud (US-West)  

China
-------------------------------------------

* ``cn-north-1``: China (Beijing)
* ``cn-northwest-1``: China (Ningxia)    

