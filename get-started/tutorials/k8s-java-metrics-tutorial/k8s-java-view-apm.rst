.. _k8s-java-view-apm:

********************************************
Part 3: View your data in Splunk APM
********************************************

Before you can view data in Splunk APM, ensure that your application is generating data that can be sent. Send requests and responses to the application to generate activity.

Follow these steps to start viewing your data:

#. Navigate to the Splunk Observability Cloud home page.
#. In the left navigation bar, select :guilabel:`APM`.
#. Search for the name of your service, ``spring-petclinic``, in the APM search bar. Note that it may take a few minutes for your service to appear in APM.

The ``spring-petclinic`` service should appear in the search results:

.. image:: /_images/get-started/k8s-java-metrics-tutorial/spring-petclinic-search.png
    :width: 100%
    :alt: The Spring Petclinic service appears as a search result in the APM page.

Next, select the service. A page with detailed APM data opens,

.. image:: /_images/get-started/k8s-java-metrics-tutorial/spring-petclinic-apm.png
    :width: 100%
    :alt: A view of the Splunk APM data for the Spring Petclinic service.

Congratulations, you've now successfully deployed and instrumented a Java application in Kubernetes, and you can now see your data in Splunk APM.