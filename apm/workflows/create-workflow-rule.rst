.. _apm-create-workflow-rule:

*********************************
Configure Business Workflow rules
*********************************

.. Metadata updated: 1/23/23

.. meta::
   :description: Learn how Business Workflow rules make trace behavior in transaction processing explicit and transparent.

Business Workflow rules use span tags to make trace behavior in transaction processing explicit and transparent.

You can create rules that correlate traces from a specific service or from multiple services that include the same global span tag. You must be an administrator to configure Business Workflow rules.

The Business Workflow page includes the following system-generated rule by default: “All traces will be associated with workflows that are identified by the initiating operations of those traces.” This is the only default rule. You cannot edit the default rule, but you can disable it.

Configure a rule
================

To configure a new rule from Splunk APM, follow these steps. There is a difference between enabling a rule and applying it. The enable/disable switch affects an individual rule by turning it on or off. After you modify one or more rules, you then use buttons that act on the entire rule set to save or discard those changes. Changes are not applied unless you save them.

1. Go to :strong:`Data Configuration > Business Workflow`.

2. Select :strong:`New Rule`.

3. Select one of the following options from the :strong:`Rule Type` drop-down:

   .. list-table::
      :header-rows: 1
      :widths: 20, 80

      * - :strong:`Option`
        - :strong:`Description`
      
      * - Global Tag
        - Define workflows based on the value of a global tag in spans associated with a trace. This correlates traces that contain spans with the global tag.

      * - Service
        - Define workflows based on traces that include a service you specify. When a trace matches the rule, you also see a specified tag value or endpoint associated with the trace for the service.

3. Select a :strong:`Target Global Tag` or :strong:`Target Service` according to the :strong:`Rule Type` you selected.

   :strong:`Target Global Tag` prompts you to select an indexed global tag. When you select a tag, the rule correlates all traces with the global tag. The rule name is based on the global tag you select.

   :strong:`Target Service` prompts you to select a service and specify the :strong:`Source of Workflow Name`, which is extra metadata to view about the workflow. You can select to correlate traces for a service by an endpoint for the initiating span or a span tag value.

4. Select :strong:`Create` to save your changes and create the rule.

5. View the list of rules to confirm the rule you just created is enabled. 

6. By default, the newest rule has the highest priority. This means Splunk APM applies the new rule before applying any other rules. If there are other rules you want to apply first, adjust the priority of the new rule.

7. Select :strong:`Save Changes` to apply the new rule and priority list.

When to keep or disable the default rule
========================================

If the initiating operation of a trace is granular enough to capture meaningful workflows, for example with API calls, then the default rule is useful because it groups related traces by their initiating operation, which is different from other initiating operations.

In systems where many traces have the same initiating operations, for example because there is a gateway in place, then you might want to extract the Business Workflow name from a service other than the initiating operation. In this case, you can use either the ``service: endpoint`` or ``service name`` for a Business Workflow.

Rule behavior and limits
========================

To reduce the likelihood of partial rule changes generating unexpected results, changes to rules accumulate throughout a single computing session and applied all together when you select :strong:`Apply Changes`. Change encompasses all of the following:

- Creating rules

- Editing rules

- Deleting or disabling rules

The Business Workflow configuration UI displays rules numbered in continuous sequence 1 to ``n``, regardless of whether those rules are active or not. Because each trace belongs to only one workflow rule, priority matters. When multiple rules can apply to the same trace, that trace is matched to the highest priority rule. Rule creation and configuration is governed by the following properties:

- The limit on the number of rules you can have is 99.

- You can turn a rule on or off using its toggle switch without affecting the content of the rule.

- Using the directional arrows in the UI to move a rule up or down in the list changes the rule priority relative to other rules. Rules at the beginning of the list have higher priority than rules at the end of the list.

- For the ``Matched service:endpoint`` naming rule, if a trace contains multiple endpoints of the service, the earliest service endpoint span is used for the workflow name.

- For the ``Tag value`` naming rule, if the service appears in multiple spans within a trace with various values of the selected tag, the earliest occurrence is used for the workflow name.