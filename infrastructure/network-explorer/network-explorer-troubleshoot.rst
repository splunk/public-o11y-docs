
.. _network-explorer-troubleshoot:


*******************************************************
Troubleshoot Network Explorer
*******************************************************

.. meta::
    :description: Troubleshooting guide for metrics and metadata issues in Network Explorer


Network Explorer isn't showing metrics as expected
====================================================================================

When Network Explorer experiences data issues, you might see the following:

- Very limited or no TCP metrics and HTTP metrics.
- No workloads, or only workloads for ``containerd`` and ``kubelet``.

Causes
----------------

Your ``kubelet`` and ``containerd`` cgroup drivers might be not be the same value.

Solution
----------------

Check the cgroup drivers of your ``kubelet`` and ``containerd`` to make sure that they match. Both of them have to be either ``cgroupfs`` or ``systemd``. For more information, see the :new-page:`Kubernetes documentation <https://kubernetes.io/docs/setup/production-environment/container-runtimes/#cgroup-drivers>` on cgroup drivers.


You don't see Kubernetes metadata in Network Explorer metrics
====================================================================================

Your Network Explorer metrics are not generated with Kubernetes metadata.

Causes
----------------

* Your Kubernetes collector is turned off.
    
    The Kubernetes collector is turned off if you see the following:

        .. code-block:: yaml            
            
            k8sCollector:
              enabled: false

* If your Kubernetes collector is turned on, you can determine the root cause based on the logs for the ``k8s-watcher`` and ``k8s-relay`` containers in the ``k8s-collector`` pod.

    #. Run the following command to find your ``k8s-collector`` pod name.
        
        .. code-block:: bash            
            
            kubectl get pods

    #. Run the following commands to retrieve the logs for the containers.

        .. code-block:: bash

            kubectl logs <POD_NAME> -c k8s-watcher
            kubectl logs <POD_NAME> -c k8s-relay 

        This is an example error message from the logs. In this case, the service account token is not available.
            
            .. code-block:: bash
                
                Error: open /var/run/secrets/kubernetes.io/serviceaccount/token: no such file or directory
     
    .. note:: On initial startup, the ``k8s-watcher`` tries to connect to the ``k8s-relay``. If the ``k8s-relay`` has not yet come up, you might see the following set of error messages.
            
            .. code-block:: bash

                Error: rpc error: code = Unavailable desc = connection error: desc = "transport: Error while dialing dial tcp [::1]:8712: connect: connection refused"

            These messages are expected and you can ignore them.


Solution
----------------

* If your Kubernetes collector is turned off, you need to turn it on by setting ``k8sCollector.enabled`` to ``true`` in the Network Explorer values file.

    .. code-block:: yaml            
    
        k8sCollector:
            enabled: true

* For other errors, see the :new-page:`Kubernetes documentation <https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#use-the-default-service-account-to-access-the-api-server>` for more information on configuring the service account for the pod to turn on communication with the API server.






