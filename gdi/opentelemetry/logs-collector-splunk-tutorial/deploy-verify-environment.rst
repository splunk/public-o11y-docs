.. _deploy-verify-environment:

*****************************************
Part 3: Deploy and verify the environment
*****************************************

Now that you've configured the necessary services, the Collector components, and the Splunk instance, learn how to deploy and verify the log collection pipeline. For an overview of the tutorial, see :ref:`about-logs-collector-splunk-tutorial`.

Deploy the log collection services
==================================

The next step is to run the ``docker-compose.yml`` file that you created in Part 1.

.. note::

   Prior to deploying the services in the ``docker-compose.yml`` file, MacOS users with Silicon chips must run ``export DOCKER_DEFAULT_PLATFORM=linux/amd64``, as there is no ``arm64`` version of the ``splunk/spunk`` image.

#. From inside a terminal, navigate to the ``log-collection`` directory.

#. Start the log collection services defined in the ``docker-compose.yml`` file:

   .. note::

      The splunk service can take from 1 to 2 minutes to start.

   .. code-block:: bash

      docker-compose up -d

   Expected output:

   .. code-block:: bash

      [+] Running 5/5
      ✔ Network docker-tutorial_default  Created                                                                                                               0.0s
      ✔ Container splunk                 Healthy                                                                                                              77.1s
      ✔ Container otelcollector          Started                                                                                                              77.2s
      ✔ Container logging2               Started                                                                                                              77.5s
      ✔ Container logging1               Started                                                                                                              77.5s

Verify the log collection pipeline
==================================

It is important to verify that everything works as expected. Follow these steps to verify that the Collector gathered the logs and sent them to the Splunk service.

#. Open a web browser and navigate to :samp:`http://localhost:18000`.

#. Log in to the Splunk Web interface using the following credentials:

   * Username: ``admin``
   * Password: ``changeme``

#. In the left-side navigation menu, select :guilabel:`Search & Reporting`.

#. In the search bar, query the ``index1`` index using ``index=index1`` to view the logs from the ``logging1`` service:

   .. image:: /_images/gdi/logs-collector-splunk-tutorial/splunk-web-ui-index1.png
      :width: 100%
      :alt: A view of the search result for the index1 index.

   Only the logs from the ``logging1`` service are stored in the ``index1`` index.

#. In the search bar, query the ``index2`` index using ``index=index2`` to view the logs from the ``logging2`` service:

   .. image:: /_images/gdi/logs-collector-splunk-tutorial/splunk-web-ui-index2.png
      :width: 100%
      :alt: A view of the search result for the index2 index.

   Only the logs from the ``logging2`` service are stored in the ``index2`` index.

#. To terminate the log collection environment, stop the running services with Docker Compose:

   .. code-block:: bash

      docker-compose down

   Expected output:

   .. code-block:: bash

      [+] Running 5/5
      ✔ Container logging2               Removed                                                                                                              10.3s
      ✔ Container logging1               Removed                                                                                                              10.3s
      ✔ Container otelcollector          Removed                                                                                                               0.2s
      ✔ Container splunk                 Removed                                                                                                              10.9s
      ✔ Network docker-tutorial_default  Removed                                                                                                               0.1s

This completes the tutorial. You configured a multicontainer environment that uses the Collector to process container logs and send them to a Splunk Enterprise server.

Learn more
==========

* For production-scale Splunk Enterprise deployments, see the `Splunk Operator for Kubernetes <https://github.com/splunk/splunk-operator>`__ GitHub repository.
* For other examples of how the Collector can integrate with Splunk Enterprise, see the `Splunk OpenTelemetry Collector <https://github.com/signalfx/splunk-otel-collector/tree/main/examples>`__ GitHub repository.