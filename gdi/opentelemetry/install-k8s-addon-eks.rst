.. _install-k8s-addon-eks:

*******************************************************************************
Splunk Distribution of the OTel Collector Add-on for AWS EKS
*******************************************************************************

.. meta::
    :description: AWS Add-on for EKS

An Add-on is a type of app that runs on Splunk Observability Cloud and provides specific capabilities to other apps, such as getting data in, mapping data, or providing saved searches and macros. An add-on is a reusable component that supports other apps across a number of different use cases, and is not typically run as a standalone app. The main benefit of using Add-ons is the ease of deployment compared to standard process to install the OpenTelemetry Collector. 

Amazon Elastic Kubernetes Service (EKS) is a managed container service to run and scale Kubernetes applications in the AWS cloud. Splunk Observability Cloud provides an Add-on available in the AWS marketplace that allows you to seamlessly connect to Amazon EKS to track EKS performance by namespace, cluster, pod or organizational concepts such as team or application. 

For more information, read the official AWS documentation at :new-page:`Amazon EKS add-ons <https://docs.aws.amazon.com/eks/latest/userguide/eks-add-ons.html>`

.. note::

    To see the Add-ons available for the Splunk Platform, refer to :new-page:`Splunk Supported Add-ons <https://docs.splunk.com/Documentation/AddOns>`. 

Benefits
=============================================================================================

The Splunk Distribution of the OTel Collector Add-on for AWS EKS: 

* Provides simplified installation, configuration and management of Amazon EKS clusters. 
* Includes the latest security patches, bug fixes, and are validated by AWS to work with Amazon EKS. 

Limitations
=============================================================================================

While the Splunk Distribution of the OTel Collector Add-on for AWS EKS offers numerous advantages, it is important to be aware of certain limitations:

* Lack of Support for Helm Hooks and Helm Subcharts:
  * The EKS add-on integration does not support Helm Hooks and Helm subcharts. Consequently, certain features that rely on these capabilities are unavailable:
    * Collector Secret Validation: This feature is not available as it utilizes a Helm hook.
    * Operator-based Auto-Instrumentation: This is not supported due to its dependency on subcharts for deploying necessary components.
* Single Instance Deployment:
  * Currently, only one instance of the Splunk Distribution of the OTel Collector can be deployed per EKS cluster. The EKS add-ons do not yet support deploying multiple instances of add-ons. This limitation should be considered when planning for scale and redundancy.
Install the AWS EKS Add-on
=============================================================================================

To install the Splunk Distribution of the OpenTelemetry Collector Add-on for AWS EKS follow these steps:

* :ref:`addon-aws-eks-one`
* :ref:`addon-aws-eks-two`
* :ref:`addon-aws-eks-three`
* :ref:`addon-aws-eks-four`
* :ref:`addon-aws-eks-five`

.. _addon-aws-eks-one:

Step 1: Subscribe to the AWS Marketplace Splunk Add-on
------------------------------------------------------------

In your AWS Marketplace, ensure that:

* You have sufficient permissions in your AWS account to enable the Splunk Add-on.
* Follow the subscription process to add the Splunk Add-on to your AWS account.

.. _addon-aws-eks-two:

Step 2: Prerequisites 
------------------------------------------------------------

Make sure you comply with the following requisites:

Credentials 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Make sure you have credentials for Splunk Observability Cloud or Splunk Platform.

Destination requirements
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For ``splunkPlatform`` (Splunk Enterprise or Splunk Cloud):

* Splunk Enterprise 8.0 or higher.
* At least one Splunk platform index to collect log data.
* An HTTP Event Collector (HEC) token and endpoint. See :new-page:`Set up and use HTTP Event Collector in Splunk Web <https://docs.splunk.com/Documentation/Splunk/8.2.0/Data/UsetheHTTPEventCollector>` and :new-page:`Scale HTTP Event Collector <https://docs.splunk.com/Documentation/Splunk/8.2.0/Data/ScaleHTTPEventCollector>`.

For ``splunkObservability``:

* ``splunkObservability.accessToken``. Your Splunk Observability org access token. See :ref:`admin-org-tokens`.
* ``splunkObservability.realm``. Splunk realm to send telemetry data to. The default is ``us0``. See :new-page:`realms <https://dev.splunk.com/observability/docs/realms_in_endpoints/>`.

.. _addon-aws-eks-three:

Step 3: Add the Splunk Add-on to AWS EKS
------------------------------------------------------------

Follow the steps outlined in the AWS EKS User Guide to add an Add-on using ``eksctl``, the AWS Management Console, or the AWS CLI.

Find the AWS EKS User guide at :new-page:`Managing Amazon EKS add-ons <https://docs.aws.amazon.com/eks/latest/userguide/managing-add-ons.html#creating-an-add-on>`.

.. _addon-aws-eks-four:

Step 4: Configure the Splunk Observability Cloud Add-on
------------------------------------------------------------

Prepare a configuration YAML file based on your destination, replacing configuration values appropriately based on your Splunk setup. 

For ``splunkPlatform``:

.. code-block:: yaml

    splunkPlatform:
        endpoint: http://localhost:8088/services/collector
        token: CHANGEME
    clusterName: my-aws-eks-cluster
    cloudProvider: aws
    distribution: eks

For ``splunkObservability``:

.. code-block:: yaml

    splunkObservability:
        accessToken: CHANGEME
        realm: us0
    clusterName: my-aws-eks-cluster
    cloudProvider: aws
    distribution: eks

For more specific configuration information, see :ref:`otel-install-k8s`.

.. _addon-aws-eks-five:

Step 5: Apply the Configuration
------------------------------------------------------------

Use the YAML file you've prepared to configure the Add-on with your chosen method: ``eksctl``, the AWS Management Console, or the AWS CLI.



