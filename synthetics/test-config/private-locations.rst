.. _private-locations:

***************************
Private locations
***************************


.. meta::
    :description: Run synthetic tests from private locations such as internal sites, private web applications, or private networks.


.. toctree::
   :maxdepth: 1


A private location is a name you create in Splunk Synthetic Monitoring to represent a custom location from which you can run synthetic tests. The name you give to a private location allows you to specify that name in a synthetic test's :guilabel:`Locations` field. To run synthetic tests from private locations, you must also set up one or more private runners within the private location to do the actual communication with your test targets and with Splunk Synthetic Monitoring.  


Use cases for private locations
====================================

Private locations provide a way for you to find, fix, and prevent performance problems in internal applications in any environment, inside or outside of your firewalls. You can use private locations to run tests earlier in your development cycle against internal sites or applications that aren't available to the public. You can also use private locations to test public endpoints from locations that aren't included in the :ref:`list of Splunk Synthetic Monitoring public locations <public-locations>`. 

To summarize, here are sample use cases for private locations:

* Test private applications that aren't exposed to the public.
* Test pre-production applications which don't have public staging sites.
* Gain a higher level of flexibility by giving Splunk Synthetic Monitoring access to applications.
* Test from locations not currently supported by Splunk Synthetic Monitoring's public locations.


Set up a new private location
=====================================

Follow these steps to set up a new private location:

1. In Splunk Synthetic Monitoring, select the settings gear icon, then :guilabel:`Private locations`.  
2. Select :guilabel:`+ Add` and add a name. 
3. Follow the steps in the guided setup to set up one or more private runners for that private location. 
4. Save your private location. 


What you can do with your private location ID 
------------------------------------------------------------

Each private location has a corresponding private location ID. With this ID, you can:

* Build charts or dashboards
* Search for metrics by private location
* Refer to your private location ID if you're interacting with the Splunk Synthetics Monitoring APIs. 

Manage your tokens
--------------------------------
It is your responsibility to update and manage your tokens. Tokens are valid for one year. For added security, create a secret environment variable for your token in Docker. Consider creating a second token to provide coverage before your first token expires. You are not notified of expiring tokens.

Assess the health of a private location
---------------------------------------------------------

A private location's health depends on three factors:

.. list-table::
  :header-rows: 1
  :widths: 20 40 40 

  * - :strong:`Factor`
    - :strong:`Description`
    - :strong:`Solution`
  * - Active runner
    - At least one runner is actively checking in.
    - If no runners are checking in, set up new runners for the private location. 
  * - Used in tests
    - The private location is currently being used in one or more tests.
    - If you need to delete a private location, you need to first delete it from all tests.
  * - Clear queue
    - The queue for a given location is being cleared periodically and is not backed up.
    - If the queue is backed up, add new runners to the private location.


Troubleshoot queue length and latency
---------------------------------------------------

If both the queue latency and length increase over time, then add more runners to improve performance. 

If your queue latency increases but your queue length doesn't, try these troubleshooting methods:

* Check to see if a step is delaying the rest of the test.
* Investigate whether you have the sufficient resources to run private location runners on your machines.

The maximum number of runs in a queue is 100,000. 

Any runs older than one hour are removed from the queue. 


Private runners
=====================================

A private runner queries Splunk Synthetic Monitoring for tests configured to run in its inherent private location, performs the test's steps on your private target, and reports the results back to Splunk Synthetic Monitoring. Because a private runner must have access to your private target, it is a Docker image which you deploy on your own infrastructure, within your own internal network. See :ref:`private-locations`. 

If you deploy multiple private runners on behalf of a single private location, they can process that location's test queue faster. Splunk Synthetic Monitoring doesn't track how many private runners you've deployed for a given private location. It's up to you to manage your own fleet of private runners. 


Requirements for private runners 
-------------------------------------

.. list-table::
  :header-rows: 1
  :widths: 20 80 

  * - :strong:`Requirement`
    - :strong:`Description`
  * - Docker
    - 
        * The Docker container requires the host have the ifb kernel module installed. 
        * The Docker container needs outbound internet access; however it doesn't need inbound access.  
  * - Allowlist
    - 
        * ``runner.<realm>.signalfx.com`` 
        * ``*.signalfx.com`` 
        * ``*.amazonaws.com``
        * ``quay.io/signalfx``
        * ``quay.io/v2``
  * - Operating system   
    -  Linux, Windows, or macOS


For optimal performance when running browser tests:

* Linux
* 2.3 GHz Dual-Core Intel Xeon (or equivalent) processor
* 8 GB RAM, 2 cores




Supported platforms
--------------------------------------------------------------

-  Docker
-  Docker Compose
-  AWS ECS
-  Docker for Mac or Windows
-  Helm
-  Kubernetes
-  OpenShift
-  Podman
-  Podman for MacOS or Windows
-  ARM64 machines on AWS and GCP


Browser compatibility
--------------------------------------------------------------

The private runner uses a headless browser to run the browser tests. The private runner Docker image for AMD64 architecture contains the Chrome browser, and the private runner Docker image for ARM64 architecture contains the Chromium browser, because Chrome is unavailable for ARM64. Chrome and Chromium versions might not be the same.

To find the browser type and version, look at the labels ``browser-type`` and ``browser-version`` in the Docker image. You can find these labels either at http://quay.io/ or in the output of the following commands:

.. code:: shell

  docker pull quay.io/signalfx/splunk-synthetics-runner:latest
  docker inspect -f '{{ index .Config.Labels "browser-type" }}' quay.io/signalfx/splunk-synthetics-runner:latest
  docker inspect -f '{{ index .Config.Labels "browser-version" }}' quay.io/signalfx/splunk-synthetics-runner:latest


Security
--------------------------------------------------------------

The Docker image is based on a Debian image which some vulnerability scanners might incorrectly flag as having a common vulnerability and exposure (CVE). To verify the presence and the severity of any CVE, look at the :new-page:`Debian Security Tracker <https://security-tracker.debian.org/tracker/>` to verify its status in Debian. For example, :new-page:`quay.io <http://quay.io/>` (the Docker repository that hosts the published private runner Docker images) reports CVE-2023-45853 as a critical severity vulnerability but the Debian Security Tracker describes the status of https://security-tracker.debian.org/tracker/CVE-2023-45853 and explains why it's marked as ignored by the Debian security team.

Required container permissions
--------------------------------------------------------------

This section outlines the minimum requirements for the container on which the private runner Docker image is running.

Minimum container permissions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The container must have the following permissions at a minimum. The private runner Docker image already has these permissions set up by default, so if you don't change the container runtime user, you don't need to take any action:

-  Read and write access to the application's home or working directory (usually this is ``/home/pptruser/``)

-  Read and write access to ``/tmp`` (the system grants this permission to all users by default)

.. note::
  Don't set the container's root filesystem to read-only (the ``readOnlyRootFilesystem`` flag), because this prevents the container from starting up.


Optional permissions for custom CA certificates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If the tests you send to the private runner need to use a custom CA certificate for API and uptime tests, the container must support privilege escalation in an init container, which adds the custom certificate to the runner's system CA certificates. To allow privilege escalation, set ``containers.securityContext.allowPrivilegeEscalation`` to ``true``:

.. code:: yaml

  containers:
    securityContext:
      allowPrivilegeEscalation: true

To verify that the container allows privilege escalation, see if it runs the ``sudo`` command.

Optional permissions for network shaping
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If the tests you send to the private runner need to simulate different network throughputs, the Docker container must support privilege escalation along with the ``NET_ADMIN`` capability (for network shaping).

.. code:: yaml

  containers:
    securityContext:
      capabilities:
        add:
        - NET_ADMIN
      allowPrivilegeEscalation: true

If you see the following warning message sudo: unable to send audit message: Operation not permitted, also add the ``AUDIT_WRITE`` capability:

.. code:: yaml

  containers:
    securityContext:
      capabilities:
        add:
        - NET_ADMIN
        - AUDIT_WRITE
      allowPrivilegeEscalation: true

Required container resources
--------------------------------------------------------------

The Docker container on which you deploy the private runner must have the following resources.

Increase the resources allocated to the private runner's pod when you see:

-  Browser crashes or errors

-  Log messages indicating that there are errors spawning the browser

Minimum container resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

-  CPUs: 1

-  Memory: 2GB

Recommended container resources
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

-  CPUs: 2

-  Memory: 8GB

Resource intensive tests
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The CPU and memory required for each test are heavily dependent on the test being executed. If the tests you send to the private runner are resource-intensive browser tests such as those listed below, the Docker container must have at least the recommended resources instead of the minimum resources.

-  Loading complex webpages with high resolution images or complex JavaScript

-  Media playback such as video streaming

-  Heavy JavaScript execution such as extensive DOM manipulations or memory hogging

-  Loading and interacting with large data sets (for example, sorting, filtering, or searching operations)

-  Uploading or downloading large files

These are only some examples of resource-intensive browser tests; your test cases may vary.


Private runners on Docker
--------------------------------------------------------------


Install a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Start your container using the Docker run command and the following flags:

.. code:: shell

  docker run --cap-add NET_ADMIN \
  -e "RUNNER_TOKEN=YOUR_TOKEN_HERE" \
  quay.io/signalfx/splunk-synthetics-runner:latest

Upgrade a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Manual upgrades
###################################

To upgrade the Docker image manually, follow these steps:

#. Pull the latest image:

   .. code:: shell
    
    docker pull http://quay.io/signalfx/splunk-synthetics-runner:latest

#. Stop the running container:

   .. code:: shell
    
    docker stop <container_id_or_name>

#. Remove the old container:

   .. code:: shell
    
    docker rm <container_id_or_name>

#. Start a new container with the updated image:

   .. code:: shell
    
    docker run --cap-add NET_ADMIN -e "RUNNER_TOKEN=YOUR_TOKEN_HERE" http://quay.io/signalfx/splunk-synthetics-runner:latest


Automatic upgrades
###################################

.. _watchtower-automation-1:

You can automate the upgrade of the private location Docker images by using an automated upgrade solution such as :new-page:`Watchtower <https://github.com/v2tec/watchtower>`, a third party open-source Docker container that connects to remote Docker repositories on a schedule and checks for updates. This section explains how to use Watchtower, but if your operations team already has a mechanism established for deploying updates to Docker images you can use your existing mechanism without making any configuration changes to the private runner. The best practice is to run your upgrade automation at least once every 24 hours. Failing to update the private runner to the latest available image may result in inconsistent data and loss of functionality.

When Watchtower finds an updated image, it instructs your Docker host to pull the newest image from the repository, stop the container, and start it again. It also ensures that environment variables, network settings, and links between containers are intact. 

On your Docker host, launch the Watchtower container from command line:

.. code:: shell

   docker run -d \
   --name watchtower \
   -v /var/run/docker.sock:/var/run/docker.sock \
   v2tec/watchtower --label-enable --cleanup

Using the ``label-enable`` flag ensures that only containers with the correct label, like the Splunk private runner, are auto-updated.

There are additional options available in the :new-page:`Watchtower documentation <https://github.com/v2tec/watchtower#options>` that you can explore, including auto-cleanup of old images to ensure that your Docker host does not hold onto outdated images.

.. note::
  For Watchtower to issue commands to the Docker host, it requires the ``docker.sock`` volume or TCP connection, which provides Watchtower with full administrative access to your Docker host. If you are unable to provide Watchtower with this level of access, you can explore other options for automating updates.

Uninstall a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. List all containers:

   .. code:: shell
    
    docker ps -a

#. Remove a stopped container by ID or name:

   .. code:: shell
    
    docker rm <container_id_or_name>

#. Force-remove a running container:

   .. code:: shell
    
    docker rm -f my_running_container


Private runners on Docker Compose
--------------------------------------------------------------

The private runner should work on all the latest versions of Docker Compose.

.. _install-a-private-runner-1:

Install a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Create a ``docker-compose.yml`` file with the following definition:

   .. code:: yaml
    
    version: '3'
    services:
      runner:
        image: quay.io/signalfx/splunk-synthetics-runner:latest
        environment:
          RUNNER_TOKEN: YOUR_TOKEN_HERE
        cap_add:
          - NET_ADMIN
        restart: always

#. Run the following command to start the container:

   .. code:: shell
    
    docker-compose up

.. _upgrade-a-private-runner-1:

Upgrade a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. _manual-upgrades-1:

Manual upgrades
###################################

To upgrade the Docker image manually, follow these steps:

#. Navigate to the directory containing your ``docker-compose.yml``

   .. code:: shell
    
    cd /path/to/your/docker-compose-file

#. Pull the latest images:

   .. code:: shell
    
    docker-compose pull

#. Recreate containers with the updated images:

   .. code:: shell
    
    docker-compose up -d

.. _automatic-upgrades-1:

Automatic upgrades
###################################

You can automate the upgrade process by using your CI/CD pipelines or by using :ref:`Watchtower <watchtower-automation-1>`.

.. _uninstall-a-private-runner-1:

Uninstall a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Navigate to your project directory:

   .. code:: shell
    
    cd /path/to/your/docker-compose-directory

#. Run the docker-compose down command:

   .. code:: shell
    
    docker-compose down

Private runners on Docker for Mac or Windows
--------------------------------------------------------------

.. _install-a-private-runner-2:

Install a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Install Docker. For steps, see the docs to install Docker Community Edition for :new-page:`Mac <https://docs.docker.com/desktop/install/mac-install/>` or for :new-page:`Windows <https://docs.docker.com/desktop/install/windows-install/>`.

#. Start your Docker container with the following flags:

   .. code:: shell
    
    docker run -e "DISABLE_NETWORK_SHAPING=true" \
    -e "RUNNER_TOKEN=YOUR_TOKEN_HERE" \
    quay.io/signalfx/splunk-synthetics-runner:latest

.. _upgrade-a-private-runner-2:

Upgrade a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. _manual-upgrades-2:

Manual upgrades
###################################


To upgrade the Docker image manually, follow these steps:

#. Pull the latest image:

   .. code:: shell
    
    docker pull http://quay.io/signalfx/splunk-synthetics-runner:latest

#. Stop the running container:

   .. code:: shell
    
    docker stop <container_id_or_name>

#. Remove the old container:

   .. code:: shell
    
    docker rm <container_id_or_name>

#. Start a new container with the updated image:

   .. code:: shell
    
    docker run --cap-add NET_ADMIN -e "RUNNER_TOKEN=YOUR_TOKEN_HERE" \
    http://quay.io/signalfx/splunk-synthetics-runner:latest

.. _automatic-upgrades-2:

Automatic upgrades
###################################

You can automate the upgrade of the private location Docker images by using an automated upgrade solution such as
`Watchtower <https://github.com/v2tec/watchtower>`, a third party open source Docker container that connects to remote Docker repositories on a schedule and checks for updates. This section explains how to use Watchtower, but if your operations team already has a mechanism established for deploying updates to Docker images you can use your existing mechanism without making any configuration changes to the private runner. The best practice is to run your upgrade automation at least once every 24 hours. Failing to update the private runner to the latest available image may result in inconsistent data and loss of functionality.

When Watchtower finds an updated image, it instructs your Docker host to pull the newest image from the repository, stop the container, and start it again. It also ensures that environment variables, network settings, and links between containers are intact.

On your Docker host, launch the Watchtower container from the command line:

.. code:: shell

    docker run -d \
    --name watchtower \
    -v /var/run/docker.sock:/var/run/docker.sock \
    v2tec/watchtower --label-enable --cleanup

Using the ``label-enable`` flag ensures that only containers with the correct label, like the Splunk private runner, are be auto-updated.

There are additional options available in the `Watchtower documentation <https://github.com/v2tec/watchtower#options>` that you can explore, including auto-cleanup of old images to ensure that your Docker host does not hold onto outdated images.

.. note::
   In order for Watchtower to issue commands to the Docker host, it requires the ``docker.sock`` volume or TCP connection, which provides Watchtower with full administrative access to your Docker host. If you are unable to provide Watchtower with this level of access you can explore other options for automating updates.

.. _uninstall-a-private-runner-2:

Uninstall a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To upgrade the Docker image manually, follow these steps:

#. List all containers:

   .. code:: shell
    
    docker ps -a

#. Remove a stopped container by ID or name:

   .. code:: shell
    
    docker rm <container_id_or_name>

#. Force-remove a running container:

   .. code:: shell
    
    docker rm -f my_running_container

Private runners on AWS ECS
--------------------------------------------------------------

.. _install-a-private-runner-3:

Install a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. In your AWS ECS console, go to :guilabel:`Task definitions`.

#. Select :guilabel:`Create new task definition with JSON` from the yellow dropdown menu.

#. Copy the following JSON and paste it into the console:

   .. code:: json

     {
      "requiresCompatibilities": [
      "EC2"
      ],
      "containerDefinitions": [
          {
              "name": "splunk-synthetics-runner",
              "image": "quay.io/signalfx/splunk-synthetics-runner:latest",
              "memory": 7680,
              "cpu": 2048,
              "essential": true,
              "environment": [
                {
                    "name": "RUNNER_TOKEN",
                    "value": "YOUR_TOKEN_HERE"
                }
              ],
              "linuxParameters": {
                    "capabilities": {
                      "add": ["NET_ADMIN"]
                    }
              }
          }
      ],
      "volumes": [],
      "networkMode": "none",
      "memory": "7680",
      "cpu": "2048",
      "placementConstraints": [],
      "family": "splunk-synthetics"
    }

#. Select :guilabel:`Save` to close the JSON input panel.

#. Select :guilabel:`Create` to create the task.

#. Create a service in your cluster using the :guilabel:`splunk-synthetics-runner`. For steps, see the    :new-page:`AWS <https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-service.html>` documentation.

.. _upgrade-a-private-runner-3:

Upgrade a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Manual upgrades
###################################

You can upgrade the runner by using the forceNewDeployment option. This shuts down the existing container and brings up a new container by pulling the latest image from the repository.

Automatic upgrades
###################################

You can automate the upgrade of the private location Docker images by using an automated upgrade solution such as :new-page:`Watchtower <https://github.com/v2tec/watchtower>`, a third party open source Docker container that connects to remote Docker repositories on a schedule and checks for updates. This section explains how to use Watchtower, but if your operations team already has a mechanism established for deploying updates to Docker images you can use your
existing mechanism without making any configuration changes to the private runner. The best practice is to run your upgrade automation at least once every 24 hours. Failing to update the private runner to the latest available image may result in inconsistent data and loss of functionality.

When Watchtower finds an updated image, it instructs your Docker host to pull the newest image from the repository, stop the container, and start it again. It also ensures that environment variables, network settings, and links between containers are intact.

To use Watchtower with Amazon's Elastic Container Service, you need to create a task definition for it. For example, here is a sample task definition that you can run as a DAEMON within your cluster.

.. code:: json

  {
    "requiresCompatibilities": [
      "EC2"
    ],
    "containerDefinitions": [
      {
        "command": [
          "--label-enable",
          "--cleanup"
        ],
        "name": "watchtower",
        "image": "v2tec/watchtower:latest",
        "memory": "512",
        "essential": true,
        "environment": [],
        "linuxParameters": null,
        "cpu": "256",
        "mountPoints": [
          {
            "readOnly": null,
            "containerPath": "/var/run/docker.sock",
            "sourceVolume": "dockerHost"
          }
        ]
      }
    ],
    "volumes": [
      {
        "name": "dockerHost",
        "host": {
          "sourcePath": "/var/run/docker.sock"
        },
        "dockerVolumeConfiguration": null
      }
    ],
    "networkMode": null,
    "memory": "512",
    "cpu": "256",
    "placementConstraints": [],
    "family": "watchtower"
  }

.. _uninstall-a-private-runner-3:

Uninstall a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Open the console at https://console.aws.amazon.com/ecs/v2.

#. From the navigation bar, select the region that contains your task definition.

#. In the navigation pane, select :guilabel:`Task definitions`.

#. On the :guilabel:`Task definitions` page, select the task definition family that contains one or more revisions that you want to deregister.

#. On the :guilabel:`Task definition name` page, select the revisions to delete, and then select :guilabel:`Actions` and :guilabel:`Deregister`.

#. Verify the information in the :guilabel:`Deregister` window, and then select :guilabel:`Deregister` to finish.


Private runners deployed with Helm
--------------------------------------------------------------


.. _install-a-private-runner-4:

Install a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For Helm deployments, you can either use the latest image and pullPolicy or a tagged image.

To install the chart with the release name my-splunk-synthetics-runner, run the following commands. For more information, see https://github.com/splunk/synthetics-helm-charts/tree/main/charts/splunk-synthetics-runner#installing-the-chart:

.. code:: shell

  helm repo add synthetics-helm-charts https://splunk.github.io/synthetics-helm-charts/
  helm repo update
  helm install my-splunk-synthetics-runner synthetics-helm-charts/splunk-synthetics-runner \
  --set=synthetics.secret.runnerToken=YOUR_TOKEN_HERE \
  --set synthetics.secret.create=true 


.. _upgrade-a-private-runner-4:

Upgrade a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run the helm upgrade command:

.. code:: shell

  helm upgrade my-splunk-synthetics-runner synthetics-helm-charts/splunk-synthetics-runner --reuse-values

If you're upgrading to an image that has major version change, you must also upgrade your Helm chart.

.. _uninstall-a-private-runner-4:

Uninstall a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run the helm uninstall command:

.. code:: shell

  helm uninstall my-splunk-synthetics-runner

Private runners on Kubernetes
--------------------------------------------------------------

.. _install-a-private-runner-5:

Install a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Create a Kubernetes Secret with the runner token:

   .. code:: shell
    
    kubectl create secret generic runner-token-secret \
    --from-literal=RUNNER_TOKEN=YOUR_TOKEN_HERE

#. Create the deployment YAML:

   .. code:: yaml

    apiVersion: apps/v1
    kind: Deployment
    metadata:
     name: splunk-o11y-synthetics-runner
    spec:
      replicas: 3
      selector:
        matchLabels:
          app: splunk-o11y-synthetics-runner
      template:
        metadata:
          labels:
            app: splunk-o11y-synthetics-runner
        spec:
          containers:
            - name: splunk-o11y-synthetics-runner
              image: quay.io/signalfx/splunk-synthetics-runner:latest
              imagePullPolicy: Always
              env:
                - name: RUNNER_TOKEN
                  valueFrom:
                    secretKeyRef:
                      name: runner-token-secret
                      key: RUNNER_TOKEN
              securityContext:
                capabilities:
                  add:
                    - NET_ADMIN
                allowPrivilegeEscalation: true
              resources:
                limits:
                  cpu: "2"
                  memory: 8Gi
                requests:
                  cpu: "2"
                  memory: 8Gi


#. Apply the Deployment YAML:

   .. code:: shell
    
    kubectl apply -f deployment.yaml

.. _upgrade-a-private-runner-5:

Upgrade a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run the kubectl apply command:

.. code:: shell
  
  kubectl apply -f deployment.yaml


Since you're using the latest tag with ``imagePullPolicy: Always``, you don't need to make changes to the deployment.yaml file. Reapplying the deployment pulls the latest image.

.. _uninstall-a-private-runner-5:

Uninstall a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run the kubectl delete command:

.. code:: shell
   
   kubectl delete -f deployment.yaml

Private runners on OpenShift
--------------------------------------------------------------

.. _install-a-private-runner-6:

Install a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Create a OpenShift Secret with the runner token:

   .. code:: shell
    
    oc create secret generic runner-token-secret --from-literal=RUNNER_TOKEN=YOUR_TOKEN_HERE

#. Create the deployment YAML:

   .. code:: yaml
    
    apiVersion: apps/v1
    kind: Deployment
    metadata:
     name: splunk-o11y-synthetics-runner
    spec:
      replicas: 3
      selector:
        matchLabels:
          app: splunk-o11y-synthetics-runner
      template:
        metadata:
          labels:
            app: splunk-o11y-synthetics-runner
        spec:
          containers:
            - name: splunk-o11y-synthetics-runner
              image: quay.io/signalfx/splunk-synthetics-runner:latest
              imagePullPolicy: Always
              env:
                - name: RUNNER_TOKEN
                  valueFrom:
                    secretKeyRef:
                      name: runner-token-secret
                      key: RUNNER_TOKEN
              securityContext:
                capabilities:
                  add:
                    - NET_ADMIN
                allowPrivilegeEscalation: true
              resources:
                limits:
                  cpu: "2"
                  memory: 8Gi
                requests:
                  cpu: "2"
                  memory: 8Gi

#. Apply the deployment YAML:

    .. code:: shell
      
      oc apply -f deployment.yaml

.. _upgrade-a-private-runner-6:

Upgrade a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run the oc apply command:

.. code:: shell
   
   oc apply -f deployment.yaml

Since you're using the latest tag with ``imagePullPolicy: Always``, you don't need to make changes to the ``deployment.yaml`` file. Reapplying the deployment pulls the latest image.

.. _uninstall-a-private-runner-6:

Uninstall a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Run the oc delete command:

.. code:: shell
   
   oc delete -f deployment.yaml

Private runners on Podman
--------------------------------------------------------------

.. _install-a-private-runner-7:

Install a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Start your container using the Podman run command and the following flags.

.. code:: shell
   
   podman run --cap-add NET_ADMIN -e "RUNNER_TOKEN=YOUR_TOKEN_HERE" \
   quay.io/signalfx/splunk-synthetics-runner:latest

.. _upgrade-a-private-runner-7:

Upgrade a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Pull the latest image:

   .. code:: shell
    
    podman pull http://quay.io/signalfx/splunk-synthetics-runner:latest

#. Stop the running container:

   .. code:: shell
    
    podman stop <container_id_or_name>

#. Remove the old container:

   .. code:: shell
    
    podman rm <container_id_or_name>

#. Start a new container with the updated image:

   .. code:: shell
    
    podman run --cap-add NET_ADMIN -e "RUNNER_TOKEN=YOUR_TOKEN_HERE" \
    http://quay.io/signalfx/splunk-synthetics-runner:latest

.. _uninstall-a-private-runner-7:

Uninstall a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. List all containers:

   .. code:: shell
    
    podman ps -a

#. Remove a stopped container by ID or name:

   .. code:: shell
    
    podman rm <container_id_or_name>

3. Force remove a running container:

   .. code:: shell
    
    podman rm -f my_running_container


Private runners on Podman for MacOS or Windows
--------------------------------------------------------------

.. _install-a-private-runner-8:

Install a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code:: shell
   
   podman run -e "DISABLE_NETWORK_SHAPING=true" -e "RUNNER_TOKEN=YOUR_TOKEN_HERE" \
   quay.io/signalfx/splunk-synthetics-runner:latest

.. _upgrade-a-private-runner-8:

Upgrade a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Pull the latest image:

   .. code:: shell
    
    podman pull http://quay.io/signalfx/splunk-synthetics-runner:latest

#. Stop the running container:

   .. code:: shell
    
    podman stop <container_id_or_name>

#. Remove the old container:

   .. code:: shell
    
    podman rm <container_id_or_name>

#. Start a new container with the updated image:

   .. code:: shell
    
    podman run --cap-add NET_ADMIN -e "RUNNER_TOKEN=YOUR_TOKEN_HERE" http://quay.io/signalfx/splunk-synthetics-runner:latest

.. _uninstall-a-private-runner-8:

Uninstall a private runner
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. List all containers:

   .. code:: shell
    
    podman ps -a

#. Remove a stopped container by ID or name:

   .. code:: shell
    
    podman rm <container_id_or_name>

#. Force remove a running container:

   .. code:: shell
    
    podman rm -f my_running_container


Private runners on ARM64 machines on AWS and GCP
--------------------------------------------------------------

There are no special instructions to install or upgrade a Docker image running on an ARM64-based machine. You can deploy this image manually with Docker or Docker Compose, deploy it to Kubernetes hosted on AWS EKS, GCP GKE, self-hosted, or deploy it on AWS ECS.

The Docker manifest contains information about available platforms and links to the correct images. So, for example, when you run the command docker run http://quay.io/signalfx/splunk-synthetics-runner:latest
Docker downloads the correct image based on the architecture of your machine.

Troubleshoot a private runner
--------------------------------------------------------------

Docker health check
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


The private location Docker image utilizes the Docker health check to communicate when its container has entered an unhealthy state. The container state is healthy if the private runner is able to authenticate with the API and has successfully fetched a synthetics test in the last 30 minutes. If the container state is unhealthy, try the following
troubleshooting tips in this order: 

#. Check the logs of the container to see if there is an authentication error. If there is, confirm that you specified the correct value for the ``RUNNER_TOKEN`` environment variable at pod startup.

#. Restart the container.

Automatically restart unhealthy Docker containers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


If you plan on running a private location for an extended period of time, it can be helpful to allow the container to automatically restart in the event that it becomes unhealthy.

To automatically restart the container you must add ``--restart unless-stopped`` and ``-e ALWAYS_HEALTHY=true`` to the pod startup command (``docker run`` or ``podman run`` and so on). The ``ALWAYS_HEALTHY=true`` environment variable  terminates the Docker container as soon as it fails a health check. This option works on any Docker restart policy.

.. code:: shell
   
   docker run --restart unless-stopped -e ALWAYS_HEALTHY=true --cap-add NET_ADMIN \
   -e "RUNNER_TOKEN=YOUR_TOKEN_HERE" \
   quay.io/signalfx/splunk-synthetics-runner:latest





Working with Docker 
-------------------------------------

Follow these steps to limit logging in Docker:

#. Create a file in a directory like this: ``/etc/docker/daemon.json``.

#. In the file, add: 

   .. code:: json

    {
      "log-driver": "local",
      "log-opts": {
        "max-size": "10m",
        "max-file": "3"
      }
    }

#. Restart your docker service: ``sudo systemctl docker.service restart``.


Add certificates
-------------------------------------

Splunk Synthetic Monitoring supports injecting custom root CA certificates for Uptime tests running from your private locations. Client keys and certificates aren't supported at this time. 

#. Create a folder called ``certs`` on your host machine and place the CA Certificate (in CRT format) in the folder.

#. Add the certs folder as a volume to the container ``(-v ./certs:/usr/local/share/ca-certificates/my_certs/)``.

#. Modify the command you use when launching the container to update the CA Certificate cache before starting the agent binary ``(bash -c "sudo update-ca-certificates && bundle exec bin/start_runner)``.


For example, here is what a command might look like after you modify it to fit your environment:  

.. code:: shell

    docker run -e "RUNNER_TOKEN=<insert-token>" --volume=`pwd`/certs:/usr/local/share/ca-certificates/my_certs/ quay.io/signalfx/splunk-synthetics-runner:latest bash -c "sudo update-ca-certificates && bundle exec bin/start_runner"


.. note::
  Custom root CA certificates aren't supported for Browser tests. Browser tests require SSL/TLS validation for accurate testing. Optionally, you can deactivate SSL/TLS validation for Browser tests when necessary.


Configure proxy settings for a private runner
---------------------------------------------------------

In environments where direct internet access is restricted, you can route synthetic test traffic through a proxy server by configuring the following environment variables:

* ``http_proxy``: Specifies the proxy server for HTTP traffic.

    * Example: ``export http_proxy="http://proxy.example.com:8443"``

* ``https_proxy``: Specifies the proxy server for HTTPS traffic.

    * Example: ``export https_proxy="http://proxy.example.com:8443"``

* ``no_proxy``: Specifies a comma-separated list of domains or IP addresses that should bypass the proxy.

    * Example: ``export no_proxy="localhost,127.0.0.1,.internal-domain.com"``

For example, here is what a command might look like after you modify it to fit your environment:


.. code:: shell

    docker run --cap-add NET_ADMIN -e "RUNNER_TOKEN=*****" -e "no_proxy=.signalfx.com,.amazonaws.com,127.0.0.1,localhost" -e "https_proxy=http://172.17.0.1:1234" -e "http_proxy=http://172.17.0.1:1234" quay.io/signalfx/splunk-synthetics-runner:latest

    
In this example:

``http_proxy`` and ``https_proxy`` are set to route traffic through a proxy at ``http://172.17.0.1:1234``.

``no_proxy`` is configured to bypass the proxy for local addresses and specific domains like .signalfx.com and .amazonaws.com.

Ensure that these variables are correctly configured to comply with your network policies. This setup allows the synthetic tests to communicate securely and efficiently in a controlled network environment.

When using a private runner, it's important to correctly configure the proxy settings to avoid issues with browser-based tests. Follow these steps when setting up the environment of the private runners:

#. Ensure proper no_proxy setup:
   
   When configuring ``no_proxy`` always include the following addresses:
   
     - ``127.0.0.1`` (for localhost communication)
     - ``localhost`` (for resolving local tests)
   
   These addresses ensure that internal services and tests run correctly without routing through a proxy, preventing potential failures.

#. Understand Dockerfile defaults:
   
   By default, the private runner sets the ``no_proxy`` variable in the Dockerfile to include ``127.0.0.1``. If you override ``no_proxy``, you must ensure that ``127.0.0.1`` and ``localhost`` are still present, or browser tests may fail.


.. note:: 
  Lower case variable names take precedence and are best practice.

