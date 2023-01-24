.. _configure-business-workflows:

*******************************************************************************
Configure Business Workflows to track business KPIs
*******************************************************************************

.. Metadata updated: 1/23/23

.. meta::
    :description: This Splunk APM use case describes how to configure APM Business Workflows.

Executives at Buttercup Games set three new business KPIs: the percentage of successful checkout requests, the P90 latency of logins, and Failed Customer Interactions (FCI). To measure these KPIs, Wei, the director of site reliability engineering and an administrator of Splunk APM, wants to configure the KPIs as Business Workflows. 

Wei wants to monitor the percentage of successful checkout requests by tracking end-to-end traces that include the :strong:`checkoutservice` node. Using the guided setup in Splunk APM, Wei creates a :strong:`service` type rule that targets the :strong:`checkoutservice`. Wei specifies the :strong:`Source of Workflow Name` as ``matched service:endpoint`` for correlating traces by endpoints.

Wei creates another :strong:`service` type rule that targets the :strong:`loginservice` for the P90 latency of logins KPI. This time, Wei sets the :strong:`Source of Workflow Name` as ``Tag Value`` and selects the ``Operation`` tag for correlating traces with the login operation.

Now that Wei has created and enabled these rules, Splunk APM automatically groups all relevant traces and generates dashboards and charts with Troubleshooting MetricSets of configured Business Workflows that Wei can monitor to measure relevant business KPIs.

:strong:`Learn more`

For details about rules for configuring Business Workflows, see :ref:`apm-create-workflow-rule`.
