.. _otel-commands:

********************************************************************************************
Splunk Distribution of OpenTelemetry Collector commands reference
********************************************************************************************

.. meta::
  :description: The most commonly used commands for the Splunk Distribution of OpenTelemetry Collector.

The following table lists all the commands and their usage in context of the Splunk Distribution of OpenTelemetry Collector. Select a command for a more detailed description and syntax examples.

.. list-table::
  :header-rows: 1
  :widths: 20 80

  * - Command
    - Usage
  * - :ref:`otel-delete`
    - Delete the Splunk Distribution of OpenTelemetry Collector Helm chart repository
  * - :ref:`otel-install`
    - Deploy the Splunk Distribution of OpenTelemetry Collector Helm chart repository
  * - :ref:`otel-add`
    - Add the Splunk Distribution of OpenTelemetry Collector Helm chart repository
  * - :ref:`otel-update`
    - Update the Splunk Distribution of OpenTelemetry Collector Helm chart repository
  * - :ref:`otel-journalctl`
    - Check the collector logs on the host
  * - :ref:`otel-k8s-config`
    - Modify Kubernetes configurations
  * - :ref:`otel-k8s-create`
    - Create a Kubernetes resource
  * - :ref:`otel-k8s-delete`
    - Delete a Kubernetes resource
  * - :ref:`otel-k8s-describe`
    - Check Kubernetes system configurations
  * - :ref:`otel-k8s-edit`
    - Edit a Kubernetes resource. Use this command for initial configuration, effective configuration, and checking the status of the collector.
  * - :ref:`otel-k8s-exec`
    - Execute a command in a Kubernetes container
  * - :ref:`otel-k8s-get`
    - Display one or many resources running on Kubernetes
  * - :ref:`otel-k8s-logs`
    - Check logs in a Kubernetes container
  * - :ref:`otel-restart`
    - Restart the collector on the host
  * - :ref:`otel-start`
    - Start the collector on the host
  * - :ref:`otel-status`
    - Check the collector status on the host (Linux only)   
  * - :ref:`otel-stop`
    - Stop the collector on the host


.. _otel-delete:

helm delete
========================================================
Description
-----------------

Delete the Splunk Distribution of OpenTelemetry Collector Helm chart repository.

Syntax
-----------------

.. code-block:: bash

   helm delete splunk-otel-collector

.. _otel-install:

helm install
========================================================
Description
-----------------

Deploy the Splunk Distribution of OpenTelemetry Collector Helm chart repository.

Syntax
-----------------

.. code-block:: bash

   helm install splunk-otel-collector \
   --set="splunkRealm=$REALM" \
   --set="splunkAccessToken=$ACCESS_TOKEN" \
   --set="clusterName=<MY-CLUSTER>" \
   --set="logsEnabled=false" \
   --set="environment=$<MY-ENV>" \
   splunk-otel-collector-chart/splunk-otel-collector \
   -f ~/workshop/k3s/otel-collector.yaml

You can also set Helm values as arguments using a YAML file. For example, after creating a YAML file named my_values.yaml, run the following command to deploy the Helm chart:

.. code-block:: bash
  
   helm install my-splunk-otel-collector --values my_values.yaml splunk-otel-collector-chart/splunk-otel-collector

.. _otel-add:

helm repo add
========================================================
Description
-----------------

Add the Splunk Distribution of OpenTelemetry Collector Helm chart repository.

Syntax
-----------------

.. code-block:: bash

   helm repo add splunk-otel-collector-chart https://signalfx.github.io/splunk-otel-collector-chart

   # Use these two commands together to add and update the repository at the same time
   helm repo add splunk-otel-collector-chart https://signalfx.github.io/splunk-otel-collector-chart && helm repo update 


.. _otel-update:

helm repo update
========================================================
Description
-----------------

Update the Splunk Distribution of OpenTelemetry Collector Helm chart repository.

Syntax
-----------------

.. code-block:: bash

   helm repo update https://signalfx.github.io/splunk-otel-collector-chart

.. _otel-journalctl:

journalctl
============================================
Description
-----------------

Check the collector logs on the host.

Syntax
------------------

.. code-block:: bash

   journalctl -u splunk-otel-collector -f
   tail -100 /var/log/messages

Optional arguments
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Argument
     - Description
   * - ``-f``
     - Show new log entries as they are added
   * - ``tail -100``
     - Retrieve the last 100 lines of logs from the log file
   * - ``-u``
     - Show messages for the specified systemd unit UNIT (such as a service unit), or for any of the units matched by PATTERN
   * - ``/var/log/messages``
     - File where the log messages are displayed from
    
.. _otel-k8s-config:

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


.. _otel-k8s-create:

kubectl create 
========================================================
Description
------------

Create a Kubernetes resource from a file. Accepted file formats are JSON and YAML. See the Kubectl Reference Documentation for a full list of subcommands and optional arguments.

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

.. _otel-k8s-delete:

kubectl delete
============================================
Description
-----------------

Delete a Kubernetes resource from a source file. See the Kubectl Reference Documentation for a full list of subcommands and optional arguments.

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

.. _otel-k8s-describe:

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

.. _otel-k8s-edit:

kubectl edit 
============================================
Description
--------------

Edit a resource running on a Kubernetes container.

Syntax
---------------

.. code-block:: bash

   kubectl edit cm <name>
   kubectl edit ds <name>


Optional arguments
^^^^^^^^^^^^^^^^^^^^^^^

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

.. _otel-k8s-exec:

kubectl exec 
============================================
Description
------------------

Execute a command in a Kubernetes container.

Syntax
------------------

.. code-block:: bash

   kubectl exec -it <container/pod> -- curl <commands>

   # Examples

   # Initial configuration
   kubectl exec -it my-splunk-otel-collector-agent-hg4gk -- curl http://localhost:55554/debug/configz/initial

   # Effective configuration
   kubectl exec -it my-splunk-otel-collector-agent-hg4gk -- curl http://localhost:55554/debug/effective

   # Check status of the collector
   kubectl exec -it <your-agent-pod> -- curl localhost:55679/debug/tracez | lynx -stdin
   kubectl exec -it splunk-otel-collector-agent-f4gwg -- curl localhost:55679/debug/tracez | lynx -stdin


Optional arguments
^^^^^^^^^^^^^^^^^^^^^^^^^

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Argument
     - Description
   * - ``-it``
     - Your agent pod
   * - ``-- curl``
     - Any additional ``curl`` commands

.. _otel-k8s-get:

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


.. _otel-k8s-logs:

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

.. _otel-restart:

restart
============================================
Description
--------------

Restart the collector on the host. If the Fluentd service is installed, you can also restart it using ``sudo systemctl restart td-agent``.

Syntax
----------------

.. code-block:: bash

   sudo systemctl restart splunk-otel-collector

.. _otel-start:

start
============================================
Description
--------------

Start the collector on the host. If the Fluentd service is installed, you can also start it using ``sudo systemctl start td-agent``.

Syntax
---------------

.. code-block:: bash

   sudo systemctl start splunk-otel-collector

.. _otel-status:

status 
============================================
Description
--------------

Check the status of the collector on the host. Only available for :new-page:`Linux <https://github.com/signalfx/splunk-otel-collector/blob/main/docs/getting-started/linux-installer.md>`.

Additionally, you can use the :new-page:`Health Check extension <https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/healthcheckextension/README.md>`, which activates to probe an HTTP url to check the status of the OpenTelemetry Collector.

Syntax
---------------

.. code-block:: bash

   sudo systemctl status splunk-otel-collector

.. _otel-stop:

stop
============================================
Description
--------------

Stop the collector on the host. If the Fluentd service is installed, you can also stop it using ``sudo systemctl stop td-agent``.

Syntax
---------------

.. code-block:: bash

   sudo systemctl stop splunk-otel-collector
