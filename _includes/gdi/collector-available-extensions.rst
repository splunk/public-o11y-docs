.. list-table::
   :widths: 25 75
   :header-rows: 1
   :width: 100%

   * - Name
     - Description
   * - :ref:`basic-auth-extension` (``basicauth``)
     - Implements both ``configauth.ServerAuthenticator`` and ``configauth.ClientAuthenticator`` to authenticate clients and servers using basic authentication. The authenticator type has to be set to ``basicauth``.      
   * - :ref:`docker-observer-extension` (``docker_observer``)
     - Detects and reports container endpoints discovered through the Docker API. Only containers that are in the state of ``Running`` and not ``Paused`` emit endpoints.
   * - :ref:`ecs-observer-extension` (``ecs_observer``)
     - Uses the ECS and EC2 API to discover Prometheus scrape targets from all running tasks and filter them based on service names, task definitions, and container labels. Only compatible with the Prometheus receiver.
   * - :ref:`ecstask-observer-extension` (``ecs_task_observer``)
     - Detects and reports container endpoints for the running ECS task of which your Collector instance is a member.
   * - :ref:`file-storage-extension` (``file_storage``)
     - Persists state to the local file system. Requires read and write access to a diectory.
   * - :ref:`health-check-extension` (``health_check``)
     - Activates an HTTP URL that can be probed to check the status of the OpenTelemetry Collector. You can also use this extension as a liveness or readiness probe on Kubernetes.
   * - :ref:`http-forwarder-extension` (``http_forwarder``)
     - Accepts HTTP requests and optionally adds headers and forwards them. The RequestURIs of the original requests are preserved by the extension. 
   * - :ref:`host-observer-extension` (``host_observer``) 
     - Looks at the current host for listening network endpoints. Uses the /proc file system and requires the ``SYS_PTRACE`` and ``DAC_READ_SEARCH`` capabilities so that it can determine what processes own the listening sockets. See :ref:`receiver-creator-receiver` for more information.
   * - :ref:`kubernetes-observer-extension` (``k8s_observer``)
     - Uses the Kubernetes API to discover pods running on the local node. See :ref:`receiver-creator-receiver` for more information.
   * - :ref:`memory-ballast-extension` (``memory_ballast``)
     - ``memory_ballast`` is deprecated. If you're using this extension, see :ref:`how to update your configuration <collector-upgrade-memory-ballast>`.
   * - :ref:`oauth2client-extension` (``oauth2client``)
     - Provides OAuth2 Client Credentials flow authenticator for HTTP and gRPC based exporters. 
   * - :ref:`pprof-extension` (``pprof``)
     - Activates the golang ``net/http/pprof`` endpoint, which is used to collect performance profiles and investigate issues with a service.
   * - :ref:`smartagent-extension` (``smartagent``) 
     - Provides a mechanism to set configuration options that are applicable to all instances of the Smart Agent receiver. Allows to migrate your existing Smart Agent configuration to the Splunk Distribution of OpenTelemetry Collector. 
   * - :ref:`zpages-extension` (``zpages``) 
     - Activates an extension that serves zPages, an HTTP endpoint that provides live data for debugging different components.