.. _otel_deployments:

****************************************************************************************************
Other Collector deployment tools and options: ECS/EC2, Fargate, Nomad, PFC
****************************************************************************************************

.. meta::
    :description: Options for deploying the Splunk Distribution of the OpenTelemetry Collector: ECS/EC2, Fargate, Nomad, PFC.

.. toctree::
    :maxdepth: 4
    :titlesonly:
    :hidden:

    Amazon ECS EC2 <deployments-ecs-ec2.rst>
    Amazon Fargate <deployments-fargate.rst>
    Fargate scenario: Monitor Java app <deployments-fargate-java.rst>
    Nomad <deployments-nomad.rst>
    Pivotal Cloud Foundry <deployments-pivotal-cloudfoundry.rst>

Use the following deployment and configuration management tools to automate the installation of Collector:

* :ref:`deployments-ecs-ec2`

* :ref:`deployments-fargate`

  *  See also :ref:`deployments-fargate-java`

* :ref:`deployments-nomad`

* :ref:`deployments-pivotal-cloudfoundry`

See also the install options available for each platform:

* :ref:`collector-kubernetes-intro` and :ref:`otel-install-k8s`
* :ref:`collector-linux-intro` and :ref:`otel-install-linux`, including instructions on how to deploy using Ansible, Chef, Puppet and Salt
* :ref:`collector-windows-intro` and :ref:`otel-install-windows`, including instructions on how to deploy using Ansible, Chef and Puppet
