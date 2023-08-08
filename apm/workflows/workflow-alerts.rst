.. _workflow-alerts:

*********************************
Create Business Workflow alerts
*********************************

.. Metadata updated: 1/23/23

.. meta::
   :description: Learn how to set up detector to alert on issues in your Business Workflows.

You can use detectors to monitor your Business Workflows for errors or latencies. Detectors send alerts to notify you of unexpected or problematic behavior before it negatively impacts application performance in your business-critical transactions. 

For workflow error rate, you can configure a detector to alert on the following conditions by default:

- Static threshold surpassed
- Sudden change

For workflow duration, you can configure a detector to alert on the following conditions by default:

- Static threshold surpassed
- Sudden change
- Historical anomaly



You can use the Create Detector wizard to fine-tune settings such as trigger threshold, trigger sensitivity, and cycle length for each of the above conditions. You can also control the alert message, set the severity, and specify alert recipients. 

Prerequisites for creating workflow alerts
============================================
You can create alerts for specific conditions in a Business Workflow if the following are true:

- At least one Business Workflow rule has been configured by a Splunk APM administrator in your Splunk Observability Cloud account.
- You're using the enterprise-level product offering.

Create a Business Workflow alert
=================================
You can use the same Create Detector guided setup to set up either service alerts or Business Workflow alerts, depending on the type of signal that you choose to monitor.
 
To create a Business Workflow alert, do the following:

1. Select the :strong:`+` icon in the top bar to open the Create New… dropdown and select :strong:`Detector`.
2. Under Detector Name in the dialog box, enter a name for your detector and select :strong:`Create Alert Rule`. The Create Detector wizard opens. 
3. Under Type, select the tile for :strong:`APM Metrics Alert Rule` and then select :strong:`Proceed to Alert Signal`. 
4. Under Environment, choose an environment from the dropdown.
5. Under Signal, select one of the following types of signals corresponding to Business Workflows:

   - Workflow Error Rate
   - Workflow Duration

6. Under Business Workflow, choose a workflow you'd like to alert on by doing any of the following:

   - Enter the Business Workflow name.
   - Choose the Business Workflow from among those in the dropdown.
   - Enter a string of characters followed by an asterisk to display all workflow names that start with that string and then select the one you'd like to alert on.

   The workflow you select is displayed as a pill in the Business Workflow column.

7. (Optional) Select :strong:`Add Filter` to add a filter to your metric.
8. (Optional) Select :strong:`Add Workflow` to expand the scope of your detector to alert on additional workflows. You can add as many workflows as needed, one at a time.
9. Select :strong:`Proceed to Alert Condition`. Continue to follow the steps in the Create Detector wizard to select your alert condition and fine-tune your alert settings based on the condition you selected, as well as set an alert message, specify alert recipients, and save your detector.