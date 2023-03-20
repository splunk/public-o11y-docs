.. _services-impact-business-workflows:

******************************************************************
Track how services impact Business Workflows
******************************************************************

.. meta::
    :description: This Splunk APM use case describes how to use APM service map and breakdown feature to investigate how services impact Business Workflow.

Kai, a site reliability engineer at Buttercup Games, wants to know how the application's microservices impact business KPIs at Buttercup Games. 

To track how microservices impact business KPIs, Kai takes the following steps:

#. Kai reviews the APM Overview
#. Kai opens the service map to find services with root-cause errors
#. Kai breaks down the services to see error details by workflow


Kai reviews the APM Overview
=================================

Kai opens the :strong:`APM Overview`, which generates charts of all services and Business Workflows by error rate or latency and highlights the top services and Business Workflows. Kai finds that two Business Workflow, which track business KPIs at Buttercup games, have abnormal error rates. 

..  image:: /_images/apm/apm-use-cases/business-workflows-services-01.png
    :width: 99%
    :alt: This screenshot shows the APM Overview page, which has charts of latency and requests/errors of all Business Workflows.

Kai opens the service map to find services with root-cause errors
====================================================================

Kai selects the :strong:`Explore` card to open the service map. Kai selects nodes with red dots that indicate services with root-cause errors. In this case, :strong:`paymentservice` and :strong:`checkoutservice` nodes are showing root-case errors. 

Kai breaks down the services by workflow to see error details by workflow
============================================================================

Kai uses the :strong:`Breakdown` menu to break down each service by :strong:`Workflow` and selects each workflow node to see charts that provide error and latency details. Kai discovers that the :strong:`paymentservice` contributes the errors for :strong:`PaymentService/Charge` and :strong:`frontend/chart/checkout` workflows, and the :strong:`checkoutservice` doesn't impact any Business Workflows. Kai sends this information to the payment service owner to resolve the errors impacting overall business KPIs.

..  image:: /_images/apm/apm-use-cases/business-workflows-services-02.png
    :width: 75%
    :alt: This screenshot shows charts and numerical data of the requests, errors, and root causes in the Business Workflow node.

Summary
=========

Kai used Business Workflows to monitor and isolate services that impact business KPIs at Buttercup Games. 

Learn more
=============

For information about business workflows, see :ref:`apm-workflows`.