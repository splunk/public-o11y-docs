.. _install-k8s-addon-eks:

*******************************************************************************
Splunk Distribution of the OpenTelemetry Collector as an AWS EKS Add-on 
*******************************************************************************

.. meta::
    :description: Kubernetes via the EKS Add-on installation

Amazon Elastic Kubernetes Service (EKS) is a managed container service to run and scale Kubernetes applications in the Amazon Web services (AWS) cloud. Splunk Observability Cloud provides an EKS Add-on available in the AWS marketplace that allows you to seamlessly deploy the Splunk Distribution of the OpenTelemetry Collector to Amazon EKS clusters to track EKS performance by namespace, cluster, pod or organizational concepts such as team or application. 

For more information, read the official AWS documentation at :new-page:`Amazon EKS add-ons <https://docs.aws.amazon.com/eks/latest/userguide/eks-add-ons.html>`.

.. note::

    This Add-on is different from the Add-ons for the Splunk Platform. Refer to :new-page:`Splunk Supported Add-ons <https://docs.splunk.com/Documentation/AddOns>` for more information. 

Benefits
=============================================================================================

The "Splunk Distribution of the OpenTelemetry Collector" Amazon EKS Add-on:

* Provides simplified installation, configuration and management of Amazon EKS clusters. 
* Includes the latest security patches, bug fixes, and are validated by AWS to work with Amazon EKS. 

Limitations
=============================================================================================

While the Add-on deployment approach offers numerous advantages, be aware of these limitations:

* The EKS Add-on integration doesn't support Helm hooks and Helm subcharts. Consequently, certain features that rely on these capabilities are unavailable, such as:

    * The Collector Secret Validation feature is unavailable as it uses a Helm hook.
    * Operator-based Auto-Instrumentation is unsupported since it relies on subcharts for deploying necessary components.

* With the EKS Add-on, you can only deploy one instance of the Splunk Distribution of the OTel Collector per EKS cluster. Take into account this limitation when planning for scale and redundancy.

Install the EKS Add-on with secure token handling
=============================================================================================

To install the EKS Add-on "Splunk Distribution of the OpenTelemetry Collector" follow these steps:

* :ref:`addon-aws-eks-one`
* :ref:`addon-aws-eks-two`
* :ref:`addon-aws-eks-three`
* :ref:`addon-aws-eks-four`
* :ref:`addon-aws-eks-five`
* :ref:`addon-aws-eks-six`

.. _addon-aws-eks-one:

Step 1: Subscribe to the EKS Add-on in the AWS Marketplace
------------------------------------------------------------

In your AWS Marketplace, ensure that:

* You have sufficient permissions in your AWS account to enable this Add-on.
* Complete the subscription process in the AWS console. Go to the :new-page:`AWS Marketplace Page <https://aws.amazon.com/marketplace/pp/prodview-sjdb4tw5uy47k>` to add the EKS add-on "Splunk Distribution of the OpenTelemetry Collector" to your AWS account.

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
* ``splunkObservability.realm``. Splunk realm to send telemetry data to. The default is ``us0``. See more in our developer portal :new-page:`realms docs <https://dev.splunk.com/observability/docs/realms_in_endpoints/>`.

.. _addon-aws-eks-three:

Step 3: Add the Add-on to your EKS clusters
------------------------------------------------------------

Follow the steps outlined in the Amazon EKS User Guide to add an Add-on using ``eksctl``, the AWS Management Console, or the AWS CLI.

Find the Amazon EKS User Guide at :new-page:`Managing Amazon EKS add-ons <https://docs.aws.amazon.com/eks/latest/userguide/managing-add-ons.html#creating-an-add-on>`.

.. _addon-aws-eks-four:
.. _addon-aws-eks-secure-token-one:

Step 4: Configure the Add-on with improved security
------------------------------------------------------------

To configure the "Splunk Distribution of the OTel Collector" EKS Add-on, prepare a YAML file tailored to your Splunk set-up, replacing placeholder values with your specific configuration details. 

.. caution:: For security reasons, avoid including tokens or any sensitive data in the configuration file, as EKS Add-on configurations are exposed within the EKS web console.

For ``splunkPlatform``:

.. code-block:: yaml

    splunkPlatform:
        endpoint: http://localhost:8088/services/collector
    clusterName: <EKS_CLUSTER_NAME>
    cloudProvider: aws
    distribution: eks

    secret:
        create: false
        name: splunk-otel-collector
        validateSecret: false

For ``splunkObservability``:

.. code-block:: yaml

    splunkObservability:
        realm: <REALM>
    clusterName: <EKS_CLUSTER_NAME>
    cloudProvider: aws
    distribution: eks

    secret:
        create: false
        name: splunk-otel-collector
        validateSecret: false

.. note:: For more specific configuration information, see :ref:`otel-install-k8s`.

.. _addon-aws-eks-secure-token-two:
.. _addon-aws-eks-five:

Step 5: Add your secret and deploy
------------------------------------------------------------

Deploy the secret into the Splunk monitoring namespace by applying a YAML file, or by using the kubectl command.

YAML file
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To deploy the secret, utilize a distinct Kubernetes secret YAML file, separate from the Add-on configuration YAML. The file can be named `splunk-otel-collector-secret.yaml`. This file contains sensitive tokens and can be deployed securely using the following command: `kubectl apply -f splunk-otel-collector-secret.yaml`.

Here is a template for the `splunk-otel-collector-secret.yaml` file:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: splunk-otel-collector
  namespace: splunk-monitoring
type: Opaque
data:
  splunk_observability_access_token: <YOUR_ACCESS_TOKEN> # Replace with your actual access token
  splunk_platform_hec_token: <YOUR_HEC_TOKEN>  # Add this line only if using with splunkPlatform

kubectl command
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To create secrets, use kubectl command:

For ``splunkPlatform``:

.. code-block:: yaml

    kubectl create secret generic splunk-otel-collector \
        --from-literal=splunk_platform_hec_token=<YOUR_HEC_TOKEN> \
        -n splunk-monitoring

Replace ``<YOUR_HEC_TOKEN>`` with your actual Splunk Platform HEC token.

For ``splunkObservability``:

.. code-block:: yaml

    kubectl create secret generic splunk-otel-collector \
        --from-literal=splunk_observability_access_token=<YOUR_ACCESS_TOKEN> \
        -n splunk-monitoring

Replace ``<YOUR_ACCESS_TOKEN>`` with your actual Splunk Observability Cloud access token.

.. _addon-aws-eks-six:
.. _addon-aws-eks-secure-token-three:

Step 6: Wait for the Collector
------------------------------------------------------------

After adding the secret, allow some time for the Collector to detect your secret and start running successfully.

.. _addon-aws-eks-non-secure:

Install the EKS Add-on without secure token handling
=============================================================================================

Alternatively, you can install the EKS Add-on with lower levels of security, without deploying a secret.

.. caution:: For security reasons, avoid including tokens or any sensitive data in the configuration file, as EKS Add-on configurations are exposed within the EKS web console.

Prepare a YAML file tailored to your Splunk set-up as follows.    

For ``splunkPlatform``:

.. code-block:: yaml

    splunkPlatform:
        endpoint: http://localhost:8088/services/collector
        token: <YOUR_HEC_TOKEN>
    clusterName: <EKS_CLUSTER_NAME>
    cloudProvider: aws
    distribution: eks

Replace ``<YOUR_HEC_TOKEN>`` with your actual Splunk Platform HEC token, and replace ``<EKS_CLUSTER_NAME>`` with your actual EKS cluster's name.

For ``splunkObservability``:

.. code-block:: yaml

    splunkObservability:
        accessToken: <YOUR_ACCESS_TOKEN>
        realm: <REALM>
    clusterName: <EKS_CLUSTER_NAME>
    cloudProvider: aws
    distribution: eks

Replace ``<YOUR_ACCESS_TOKEN>`` and ``<REALM>`` with your actual Splunk Observability Cloud access token within the corresponding realm, and replace ``<EKS_CLUSTER_NAME>`` with your actual EKS cluster's name.

.. note:: For more specific configuration information, see :ref:`otel-install-k8s`.