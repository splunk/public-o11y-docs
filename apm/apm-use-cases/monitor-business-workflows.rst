.. _monitor-business-workflows:

**********************************************************************
Monitor Business Workflows to measure business KPIs
**********************************************************************

.. meta::
    :description: A Splunk APM use cases describes how to use monitor Business Workflows using the dashboard

Wei, the director of site reliability engineering at Buttercup Games, monitors Business Workflows to make sure their error rates are in the normal range. 

Wei first wants to understand the overall performance of all Business Workflows. Wei opens the Splunk APM Business Workflows dashboard and selects :strong:`Workflows Overview`, which shows the line chart and the list view with top workflows by each troubleshooting metric. Wei finds that the :strong:`paymentservice:PaymentService/Charge` workflow has the highest error rate in the past 15 minutes: 


..  image:: /_images/apm/apm-use-cases/monitor-business-workflows-01.png
    :width: 99%
    :alt: This screenshot shows the Workflows Overview of all Business Workflows on the dashboard.

|br|

Wei wants to further analyze the workflows with abnormal error rate. Wei selects :strong:`Workflows Details` and enters the :strong:`paymentservice:PaymentService/Charge` workflow in the :strong:`Workflow` field. Wei can see statistics and charts of the workflow requests, latency, and error rate:

..  image:: /_images/apm/apm-use-cases/monitor-business-workflows-02.png
    :width: 99%
    :alt: This screenshot shows the Workflows Details of the paymentservice:PaymentService/Charge workflow on the dashboard.

|br|

Wei finds that the :strong:`Workflow Error Rate` of the :strong:`paymentservice:PaymentService/Charge` workflow in the past five minutes is 100%, which is a major threat to the payment business KPI set by the company executives. Based on the Business Workflows configuration naming rules, Wei can tell that the :strong:`paymentservice:PaymentService/Charge` workflow is connected to the payment service. Wei notifies Deepu, the payment service owner, to resolve the problem.

:strong:`Learn more`

For details about business workflows, see :ref:`apm-workflows`.