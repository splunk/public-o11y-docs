.. _apm-workflows:

********************************************
Correlate traces to track Business Workflows
********************************************

.. Metadata updated: 1/23/23

.. meta::
   :description: Learn how to correlate logically-related traces with Business Workflows in Splunk Observability Cloud.

.. toctree::
   :hidden:

   create-workflow-rule
   example-business-workflow
   workflow-alerts

|hr|

:strong:`Available in Enterprise Edition`

|hr|


Business Workflows generate Monitoring and Troubleshooting MetricSets for traces that fit Business Workflow rules. You can configure Business Workflow rules to group logically-related traces by services or global tags, or monitor performance indicators on transactions with dashboards and alerts.

You can also filter your Troubleshooting view to display only transactions for specific Business Workflows.

You must be an administrator to configure Business Workflows.

Follow these steps to configure Business Workflow rules to track related traces in Splunk APM:

1. Create or change a workflow rule.

2. Enable the workflow rule.

3. Set the priority of the rule relative to any other rules.

4. Save your changes to the workflow rule set.

For more information about configuring and managing rules, see :ref:`apm-create-workflow-rule`. See :ref:`apm-example-business-workflow` for an example configuration. See :ref:`configure-business-workflows` for a scenario involving Business Workflows. 

For examples of monitoring and troubleshooting using Business Workflows, see :ref:`apm-scenarios-intro`.
