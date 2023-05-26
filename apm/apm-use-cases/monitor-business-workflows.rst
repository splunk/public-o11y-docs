.. _monitor-business-workflows:

Scenario: Wei monitors Business Workflows to measure business KPIs
**********************************************************************

.. meta::
    :description: This Splunk APM scenario describes how to monitor Business Workflows using the dashboard.

Wei, the director of site reliability engineering at Buttercup Games, wants to monitor Business Workflows to make sure their error rates are in the normal range. 

These are the steps Wei takes to monitor Business Workflows:

#. :ref:`monitor-business-workflows-open-dashboard`
#. :ref:`monitor-business-workflows-open-details`
#. :ref:`monitor-business-workflows-error-rate`

.. _monitor-business-workflows-open-dashboard:

Wei opens the workflow overview in the Business Workflows dashboard
===============================================================================

Wei first wants to understand the overall performance of all Business Workflows. Wei opens the Splunk APM Business Workflows dashboard and selects :guilabel:`Workflows Overview`, which shows the line chart and the list view with top workflows by each troubleshooting metric. Wei finds that the paymentservice:PaymentService/Charge workflow has the highest error rate in the past 15 minutes: 


..  image:: /_images/apm/apm-use-cases/monitor-business-workflows-01.png
    :width: 99%
    :alt: This screenshot shows the Workflows Overview of all Business Workflows on the dashboard.

.. _monitor-business-workflows-open-details:

Wei opens the workflow details in the Business Workflows dashboard
===============================================================================

Wei wants to further analyze the workflows with atypical error rate. Wei selects :strong:`Workflows Details` and enters the :strong:`paymentservice:PaymentService/Charge` workflow in the :strong:`Workflow` field. Wei can see statistics and charts of the workflow requests, latency, and error rate:

..  image:: /_images/apm/apm-use-cases/monitor-business-workflows-02.png
    :width: 99%
    :alt: This screenshot shows the Workflows Details of the paymentservice:PaymentService/Charge workflow on the dashboard.

.. _monitor-business-workflows-error-rate:

Wei notes a concerning error rate for the workflow and notifies the service owner 
===================================================================================

Wei finds that the :strong:`Workflow Error Rate` of the :strong:`paymentservice:PaymentService/Charge` workflow in the past 5 minutes is 100%, which is a major threat to the payment business KPI set by the company executives. Based on the Business Workflows configuration naming rules, Wei can tell that the :strong:`paymentservice:PaymentService/Charge` workflow is connected to the payment service. Wei notifies Deepu, the payment service owner, to resolve the problem.

Learn more
=============

For details about business workflows, see :ref:`apm-workflows`.