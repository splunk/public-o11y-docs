.. _k8s-java-view-apm:

********************************************
Part 3: View your data in Splunk APM
********************************************

Before you can view data in Splunk Application Performance Monitoring (APM), ensure that the application is active and generating data. Send requests to the application through ``cURL`` or interact with the application's UI to generate activity.

Follow these steps to start viewing your data:

#. Navigate to the Splunk Observability Cloud home page.
#. Select :guilabel:`APM`.
#. Search for the name of your service, :guilabel:`spring-petclinic`, in the APM search bar. It might take a few minutes for your service to appear in APM.

The ``spring-petclinic`` service appears in the search results:

.. image:: /_images/get-started/k8s-java-metrics-tutorial/spring-petclinic-search.png
    :width: 100%
    :alt: The Spring Petclinic service appears as a search result in the APM page.

Next, select the service. A page with detailed APM data opens:

.. image:: /_images/get-started/k8s-java-metrics-tutorial/spring-petclinic-apm.png
    :width: 100%
    :alt: A view of the Splunk APM data for the Spring Petclinic service.

Congratulations! You've now successfully deployed and instrumented a Java application in Kubernetes, and you can now see your data in Splunk APM.