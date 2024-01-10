.. _smart-agent-commands:

********************************************************************************************
SignalFx Smart Agent commands reference
********************************************************************************************

.. meta::
  :description: The most commonly used commands for the SignalFx Smart Agent.

This topic provides commonly used commands for the Smart Agent.

.. note:: The SignalFx Smart Agent has reached End of Support. While the agent can capture and export telemetry to Splunk Observability Cloud, Splunk no longer provides any support, feature updates, security, or bug fixes. Such requests are not bound by any SLAs.

  To see commonly used commands for the Splunk Distribution of OpenTelemetry Collector, see :ref:`otel-commands`.

The standard ports for the Smart Agent are 9080 and 8095. The default configuration is stored in /etc/signalfx/agent.yaml. 

.. note::
  When you deploy the agent as a DaemonSet on Kubernetes clusters, the agent configuration is managed by the ConfigMap of the agent.

The following table lists all the commands and their usage in context of the Smart Agent. Click a command for a more detailed description and syntax examples.

.. list-table::
  :header-rows: 1
  :widths: 20 80

  * - Command
    - Usage
  * - :ref:`sa-delete`
    - Delete the Smart Agent Helm chart repository
  * - :ref:`sa-install`
    - Deploy the Smart Agent Helm chart repository
  * - :ref:`sa-add`
    - Add the Smart Agent Helm chart repository
  * - :ref:`sa-update`
    - Update the Smart Agent Helm chart repository
  * - :ref:`sa-journalctl`
    - Check the agent logs on the host
  * - :ref:`sa-k8s-config`
    - Modify Kubernetes configurations
  * - :ref:`sa-k8s-create`
    - Create a Kubernetes resource
  * - :ref:`sa-k8s-delete`
    - Delete a Kubernetes resource
  * - :ref:`sa-k8s-describe`
    - Check Kubernetes system configurations
  * - :ref:`sa-k8s-edit`
    - Edit a Kubernetes resource
  * - :ref:`sa-k8s-exec`
    - Execute a command in a Kubernetes container
  * - :ref:`sa-k8s-get`
    - Display one or many resources running on Kubernetes
  * - :ref:`sa-k8s-logs`
    - Check logs in a Kubernetes container
  * - :ref:`sa-restart`
    - Restart the agent on the host
  * - :ref:`sa-start`
    - Start the agent on the host
  * - :ref:`sa-status`
    - Check the status of the agent on the host
  * - :ref:`sa-status-endpoints`
    - Check the endpoints set on the agent
  * - :ref:`sa-stop`
    - Stop the agent on the host
  * - :ref:`sa-tap-dps`
    - Tail metric data points being sent to the host

.. _sa-delete:

helm delete
========================================================
Description
-----------------

Delete the Smart Agent Helm chart repository.

Syntax
-----------------

.. code-block:: bash

   helm delete signalfx-agent

.. _sa-install:

helm install
========================================================
Description
-----------------

Deploy the Smart Agent Helm chart repository.

Syntax
-----------------

.. code-block:: bash

   helm install \
   --set signalFxAccessToken=$ACCESS_TOKEN \
   --set clusterName=<MY-CLUSTER> \
   --set kubeletAPI.url=https://localhost:10250 \
   --set signalFxRealm=$REALM  \
   --set traceEndpointUrl=https://ingest.$REALM.signalfx.com/v2/trace \
   --set gatherDockerMetrics=false \
   signalfx-agent signalfx/signalfx-agent \
   -f ~/workshop/k3s/values.yaml

.. _sa-add:

helm repo add
========================================================
Description
-----------------

Add the Smart Agent Helm chart repository.

Syntax
-----------------

.. code-block:: bash

   helm repo add signalfx https://dl.signalfx.com/helm-repo

   # Use these two commands together to add and update the repository at the same time
   helm repo add signalfx https://dl.signalfx.com/helm-repo && helm repo update 

.. _sa-update:

helm repo update
========================================================
Description
-----------------

Update the Smart Agent Helm chart repository.

Syntax
-----------------

.. code-block:: bash

   helm repo update https://dl.signalfx.com/helm-repo

.. _sa-journalctl:

journalctl
========================================================
Description
-----------------

Check the agent logs on the host.

Syntax
-----------------

.. code-block:: bash

   journalctl -u signalfx-agent | tail -f
   tail -f /var/log/signalfx-agent.log

Optional arguments
^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Argument
     - Description
   * - ``-u``
     - Show messages for the specified systemd unit UNIT (such as a service unit), or for any of the units matched by PATTERN 
   * - ``tail -f``
     - Display the last part of a file. The ``-f`` option causes tail to not stop when	end of file is reached, but rather to wait for additional data to	be appended to the input. The ``-f`` option is ignored if the standard input is a pipe, but not if it is a FIFO.

.. _sa-k8s-config:

kubectl config 
============================================
Description
---------------

Modify Kubernetes configurations using subcommands. See the Kubectl Reference Documentation for a full list of subcommands and optional arguments.

Syntax
---------------

.. code-block:: bash

   kubectl config [subcommand]

   # Examples
   
   # Show kubeconfig settings
   kubectl config view 

   # Save namespace for all subsequent kubectl commands in context
   kubectl config set-context --current --namespace=ggckad-s2

   # Get the password for the e2e user
   kubectl config view -o jsonpath='{.users[?(@.name == "e2e")].user.password}' 

   # Display the first user
   kubectl config view -o jsonpath='{.users[].name}'

   # Get a list of users 
   kubectl config view -o jsonpath='{.users[*].name}'

   # Display list of contexts 
   kubectl config get-contexts 

   # Display the current-context
   kubectl config current-context 

   # Set the default context to my-cluster-name
   kubectl config use-context my-cluster-name 

   # Add a new user to your kubeconfig that supports basic authorization
   kubectl config set-credentials kubeuser/foo.kubernetes.com --username=kubeuser --password=kubepassword 

   # Set a context utilizing a specific username and namespace
   kubectl config set-context gce --user=cluster-admin --namespace=foo \ && kubectl config use-context gce 

.. _sa-k8s-create:
   
kubectl create 
========================================================
Description
------------

Create a resource from a file. Accepted file formats are JSON and YAML. See the Kubectl Reference Documentation for a full list of subcommands and optional arguments.

Syntax
------------

.. code-block:: bash

   sudo kubectl create -f <file-name>

   # Examples

   # Use the subcommand configmap to create a ConfigMap from a source file 
   sudo kubectl create configmap <map-name> --from-file=<file path> 
   
Optional arguments
^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Argument
     - Description
   * - ``-f``
     - The source file to create a resource
   * - ``--from-file``
     - Path to the source file to create a ConfigMap
   * - ``<map-name>``
     - Name of the ConfigMap

.. _sa-k8s-delete:

kubectl delete
============================================
Description
-----------------

Delete a resource from a source file. See the Kubectl Reference Documentation for a full list of subcommands and optional arguments.

Syntax
-------------------

.. code-block:: bash

   sudo kubectl delete -f <file-name>

Optional arguments
^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Argument
     - Description
   * - ``-f``
     - The source file to delete a resource

.. _sa-k8s-describe:

kubectl describe
========================================================
Description
-------------------

Check Kubernetes system configurations.

Syntax
-------------------

.. code-block:: bash

   kubectl describe -n <namepsace> pod <pod-name>

Optional arguments
^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Argument
     - Description
   * - ``-n``
     - Namespace to check the configurations
   * - ``pod``
     - Pod to check the configurations

.. _sa-k8s-edit:

kubectl edit 
========================================================
Description
--------------

Edit a resource running on a Kubernetes container.

Syntax
---------------

.. code-block:: bash

   kubectl edit cm <name>
   kubectl edit ds <name>


Optional arguments
^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Argument
     - Description
   * - ``cm``
     - Specify the item you want to modify is a ConfigMap
   * - ``ds``
     - Specify the item you want to modify is a DaemonSet
   * - ``<name>``
     - Name of the resource you want to modify

.. _sa-k8s-exec:

kubectl exec 
========================================================
Description
-------------

Execute a command in a Kubernetes container.

Syntax
-------------

.. code-block:: bash

   kubectl exec <signalfx-agent-PODNAME> -- signalfx-agent status

Optional arguments
^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Argument
     - Description
   * - ``<signalfx-agent-PODNAME>``
     - Name of the pod
   * - ``-- signalfx-agent status``
     - Check the status of the agent

.. _sa-k8s-get:

kubectl get 
========================================================
Description
----------------

Display one or many resources running on Kubernetes.

Syntax
----------------

.. code-block:: bash

   kubectl get pods -n <namespace>
   kubectl get configmap
   kubectl get ds

Optional arguments
^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Argument
     - Description
   * - ``configmap``
     - Display the ConfigMap
   * - ``ds``
     - Display the DaemonSet
   * - ``-n``
     - Namespace
   * - ``pods``
     - List all pods in process status output format

.. _sa-k8s-logs:

kubectl logs 
============================================
Description
-------------------

Check logs in a Kubernetes container.

Syntax
--------------------

.. code-block:: bash

   sudo kubectl logs <pod-name | type/name> -l <label> -f -c <container-name>

   # Examples

   # Return snapshot logs from pod nginx with only one container
   kubectl logs nginx 

   # Return snapshot logs from pod nginx with multiple containers
   kubectl logs nginx --all-containers=true 

   # Return snapshot logs from all containers in pods defined by label app=nginx
   kubectl logs -l app=nginx --all-containers=true 

   # Return snapshot of previous terminated ruby container logs from pod web-1
   kubectl logs web-1 -p -c ruby 

   # Begin streaming the logs of the ruby container in pod web-1
   kubectl logs web-1 -f -c ruby 

   # Begin streaming the logs from all containers in pods defined by label app=nginx
   kubectl logs -f -l app=nginx --all-containers=true 

   # Display only the most recent 20 lines of output in pod nginx
   kubectl logs nginx --tail=20

   # Show all logs from pod nginx written in the last hour
   kubectl logs nginx --since=1h 

   # Show logs from a kubelet with an expired serving certificate
   kubectl logs nginx --insecure-skip-tls-verify-backend 

   # Return snapshot logs from first container of a job named hello
   kubectl logs job/hello 

   # Return snapshot logs from container nginx-1 of a deployment named nginx
   kubectl logs deployment/nginx -c nginx-1 


Optional arguments
^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Argument
     - Description
   * - ``--all-containers`` 
     - If true, get all containers' logs in the pod(s). Default value is ``false``
   * - ``-c``
     - The container where the logs are displayed from
   * - ``-f``
     - Show new log entries as they are added
   * - ``--insecure-skip-tls-verify-backend``
     - Skip verifying the identity of the kubelet that logs are requested from. Use this when you want to get logs from a kubelet with an expired serving certificate
   * - ``-l``
     - A label to filter on
   * - ``-p``
     - If true, show the logs for the previous instance of the container in a pod if it exists. Default value is ``false``
   * - ``--since``
     - Get only the latest logs within the specified time duration
   * - ``--tail``
     - Number of most recent log lines to show

.. _sa-restart:

restart
========================================================

Description
--------------

Restart the agent on the host.

Syntax
--------------

.. code-block:: bash

   sudo systemctl restart signalfx-agent

.. _sa-start:

start
========================================================

Description
---------------

Start the agent on the host.

Syntax
---------------

.. code-block:: bash

   sudo systemctl start signalfx-agent

.. _sa-status:

status
========================================================

Description
--------------

Check the status of the agent on the host.

Syntax
--------------

.. code-block:: bash

   sudo signalfx-agent status
   service signalfx-agent status
   systemctl signalfx-agent status

.. _sa-status-endpoints:

status endpoints
========================================================
Description
---------------

Check the endpoints set on the agent.

Syntax
----------------

.. code-block:: bash

   signalfx-agent status endpoints

.. _sa-stop:

stop
========================================================

Description
-------------

Stop the agent on the host.

Syntax
--------------

.. code-block:: bash

   sudo systemctl stop signalfx-agent

.. _sa-tap-dps:

tap-dps
========================================================

Description
---------------

Tail metric data points being sent to the host.

Syntax
--------------

.. code-block:: bash

   signalfx-agent tap-dps -h
   signalfx-agent tap-dps -metric 'jenkins_*'

Optional arguments
^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Argument
     - Description
   * - ``-h``
     - Get more information about the command
   * - ``-metric 'jenkins_*``
     - Description here
