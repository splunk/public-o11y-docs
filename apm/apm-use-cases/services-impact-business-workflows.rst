.. _services-impact-business-workflows:

******************************************************************
Track how services impact Business Workflows
******************************************************************

.. meta::
    :description: A Splunk APM use cases describes how to use APM service map and Breakdown feature to investigate how services impact Business Workflow

Kai, a site reliability engineer at Buttercup Games, wants to know how the application's microservices contribute errors or latency to Business Workflows, which track business KPIs at Buttercup Games. 

Kai first wants to know if any Business Workflows have errors. Kai opens the :strong:`APM Overview`, which generates charts of all services and Business Workflows by error rate or latency and highlights the top services and Business Workflows:

..  image:: /_images/apm/apm-use-cases/business-workflows-services-01.png
    :width: 99%
    :alt: This screenshot shows the APM Overview page, which has charts of latency and requests/errors of all Business Workflows.

Kai finds that two workflows have abnormal error rates. Kai selects the :strong:`Explore` window to open the service map. Kai clicks nodes with red dots that indicate services with root cause error rates. In this case, :strong:`paymentservice` and :strong:`checkoutservice` nodes are having issues. Kai uses the :strong:`Breakdown` menu to break down each service by :strong:`Workflow` and selects each workflow node to see charts that provide error and latency details:

..  image:: /_images/apm/apm-use-cases/business-workflows-services-02.png
    :width: 75%
    :alt: This screenshot shows charts and numerical data of the requests, errors, and root causes in the Business Workflow node.

Kai discovers that the :strong:`paymentservice` contributes the errors for :strong:`PaymentService/Charge` and :strong:`frontend/chart/checkout` workflows, and the :strong:`checkoutservice` doesn't impact any Business Workflows. Kai sends this information to the payment service owner to resolve the errors impacting overall business KPIs.

:strong:`Learn more`

For details about business workflows, see :ref:`apm-workflows`.