.. _apm-workflows:

*****************************************
Correlate traces to track workflows
*****************************************

.. meta::
   :description: Correlate logically-related traces with Business Workflows in Splunk Observability Cloud.

.. toctree::
   :hidden:

   create-workflow-rule
   example-business-workflow

Configure Business Workflow rules to group logically-related traces by services or global tags. Business Workflows generate Monitoring and Troubleshooting MetricSets for traces that fit Business Workflow rules. Monitor performance indicators on transactions with dashboards and alerts. You can also filter your Troubleshooting view to display only transactions for specific Business Workflows.

You must be an administrator to configure Business Workflows.

Follow these steps to configure Business Workflow rules to track related traces in Splunk APM. For more information about configuring and managing rules, see :ref:`apm-create-workflow-rule`. Check out an example configuration :ref:`here <apm-example-business-workflow>`.

1. Create or change a workflow rule.

2. Enable the workflow rule.

3. Set the priority of the rule relative to any other rules.

4. Save your changes to the workflow rule set.