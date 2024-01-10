.. _apm-example-business-workflow:

***************************************
Example Business Workflow configuration
***************************************

.. Metadata updated: 1/23/23

.. meta::
   :description: Review an example of how you can correlate logically-related traces with Business Workflows in Splunk Observability Cloud.

Suppose you want to identify every trace that goes through ``service.example``. To do this, create a Business Workflow. The following example creates a service rule for ``service.example`` that creates workflows based on endpoints for the service. To follow along in the app, you must be an administrator.

1. Go to :strong:`Data Configuration > Business Workflow`.

2. Select :strong:`New Rule`.

3. Select ``Service`` for the :strong:`Rule Type`.

4. Select ``service.example`` for the :strong:`Target Service`.

5. Confirm that the :strong:`Source of Workflow Name` is set to ``Matched service:endpoint``. If it is not, select ``Matched service:endpoint`` from the drop-down menu.

6. Select :strong:`Create` to save your changes and create the rule.

7. View the list of rules to confirm that the rule you just created is turned on. If it is not, use the toggle next to the rule name to turn on the rule.

8. To evaluate a trace against the rule set and generate a name for the workflow, copy and paste a trace ID into the Rule Tester field. 

9. By default, the newest rule has the highest priority. This means Splunk APM applies the new rule before applying any other rules. If there are other rules you want to apply first, adjust the priority of the new rule.

10. Select :strong:`Save Changes` to apply the new rule and priority list.
