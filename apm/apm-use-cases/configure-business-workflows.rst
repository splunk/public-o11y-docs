.. _configure-business-workflows:

Scenario: Wei configures Business Workflows to track business KPIs
*******************************************************************************

.. meta::
    :description: This Splunk APM scenario describes how to configure APM Business Workflows.

Executives at Buttercup Games set three new business KPIs: the percentage of successful checkout requests, the P90 latency of logins, and Failed Customer Interactions (FCI). To measure these KPIs, Wei, the director of site reliability engineering and an administrator of Splunk APM, wants to configure the KPIs as Business Workflows. 

These are the steps Wei takes to configure Business Workflows:

#. :ref:`configure-business-workflows-checkout-rule`
#. :ref:`configure-business-workflows-login-rule`
#. :ref:`configure-business-workflows-dashboards`

.. _configure-business-workflows-checkout-rule:

Wei creates a business workflow rule for the checkout service
================================================================

Wei wants to monitor the percentage of successful checkout requests by tracking end-to-end traces that include the checkout service. Using the guided setup in Splunk APM, Wei creates a service rule that targets the ``checkoutservice``. Wei specifies the :guilabel:`Source of Workflow Name` as ``matched service:endpoint`` for correlating traces by endpoints.

..  image:: /_images/apm/apm-use-cases/ConfigureWorklowsCheckoutRule.png
    :width: 75%
    :alt: This screenshot shows the rule setup for a service workflow rule. 

.. _configure-business-workflows-login-rule:

Wei creates a business workflow rule for the login service
================================================================

Wei creates another service rule that targets the ``loginservice`` for the P90 latency of logins KPI. This time, Wei sets the :strong:`Source of Workflow Name` as ``Tag Value`` and selects the ``Operation`` tag for correlating traces with the login operation.

..  image:: /_images/apm/apm-use-cases/ConfigureWorkflowsLoginRule.png
    :width: 75%
    :alt: This screenshot shows the rule setup for a service workflow rule. that uses a tag value for correlating traces. 

.. _configure-business-workflows-dashboards:

Wei monitors business KPIs using Business Workflow dashboards and charts
===========================================================================

Now that Wei has created these rules, Splunk APM automatically groups all relevant traces and generates dashboards and charts with Troubleshooting MetricSets for configured Business Workflows that Wei can monitor to measure relevant business KPIs.

Learn more
=============

For details about rules for configuring Business Workflows, see :ref:`apm-create-workflow-rule`.
