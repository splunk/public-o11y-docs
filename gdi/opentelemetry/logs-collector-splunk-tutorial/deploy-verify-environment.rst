.. _deploy-verify-environment:

*****************************************
Part 3: Deploy and verify the environment
*****************************************

Now that you configured the necessary services, the Collector components, and the Splunk instance, deploy and verify the log collection pipeline. For an overview of the tutorial, see :ref:`about-logs-collector-splunk-tutorial`.

Deploy the log collection services
==================================

The next step is to run the docker-compose.yml file that you created in Part 1.

#. From a terminal, navigate to the ``log-collection`` directory.

#. If you are a macOS user with a Silicon chip, you must run the following command, as there is no ``arm64`` version of the ``splunk/splunk`` image:

   .. code-block:: bash

      export DOCKER_DEFAULT_PLATFORM=linux/amd64

#. Start the log collection services defined in the ``docker-compose.yml`` file, which can take from 1 to 2 minutes to start:

   .. code-block:: bash

      docker-compose up -d

   Verify that your output matches the following example:

   .. code-block:: bash

      [+] Running 5/5
      ✔ Network docker-tutorial_default  Created                                                                                                               0.0s
      ✔ Container splunk                 Healthy                                                                                                              77.1s
      ✔ Container otelcollector          Started                                                                                                              77.2s
      ✔ Container logging2               Started                                                                                                              77.5s
      ✔ Container logging1               Started                                                                                                              77.5s

Verify the log collection pipeline
==================================

Next, verify that everything works as expected. Follow these steps to check that the Collector gathered the logs and sent them to the Splunk Enterprise service.

#. In your web browser, go to :samp:`http://localhost:18000`.

#. Log in to Splunk Web using the following credentials:

   * Username: ``admin``
   * Password: ``changeme``

#. In the left navigation menu, select :guilabel:`Search & Reporting`.

#. In the search bar, search the ``index1`` index to view the logs from the ``logging1`` service:

   .. code-block:: 

      index=index1

   The search results show that only the logs from the ``logging1`` service are stored in the ``index1`` index:

   .. image:: /_images/gdi/logs-collector-splunk-tutorial/splunk-web-ui-index1.png
      :width: 100%
      :alt: A view of the search result for the index1 index.

#. In the search bar, search the ``index2`` index to view the logs from the ``logging2`` service:

   .. code-block::

      index=index2

   The search results show that only the logs from the ``logging2`` service are stored in the ``index2`` index:

   .. image:: /_images/gdi/logs-collector-splunk-tutorial/splunk-web-ui-index2.png
      :width: 100%
      :alt: A view of the search result for the index2 index.

#. To terminate the log collection environment, stop the running services with Docker Compose:

   .. code-block:: bash

      docker-compose down

   Verify that your output matches the following example:

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