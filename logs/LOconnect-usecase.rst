.. _logs-LOconnect-usecase:

************************************************************************************************************************
Use case: Troubleshoot workflow failures with Log Observer Connect
************************************************************************************************************************


.. meta::
  :description: Troubleshoot problems in a workflow using Log Observer Connect.

Buttercup Games, a fictitious company, runs an e-commerce site to sell its products. They recently refactored their site to use a cloud-native approach with a microservices architecture and Kubernetes for the infrastructure.

Buttercup Games site reliability engineers and service owners collaborate to monitor and maintain the site to ensure that people have a great experience when they visit. Buttercup Games chose a cloud-native approach because it facilitates observability. Splunk Observability Cloud is their observability solution. Buttercup Games uses Splunk Observability Cloud to find and solve problems that cause outages or failures in purchases from their online store.

In the past hour, the number of purchases on the Buttercup Games site dropped significantly and the checkout completion rate is too low. Aisha, an SRE, and Deepu, a service owner, perform the following tasks with Splunk Log Observer Connect and other views in Splunk Observability Cloud to identify and troubleshoot the root cause of the problem with the purchase workflow:

1. :ref:`which-logs-matter`

2. :ref:`conduct-initial-analysis`

3. :ref:`find-log-patterns` 

4. :ref:`narrow-your-hypothesis`

5. :ref:`test-your-hypothesis`

6. :ref:`identify-and-remediate`


.. _which-logs-matter:

Determine which logs matter
========================================================================================================================
1. Aisha opens the service map in Splunk Application Performance Monitoring (APM). To find out why the checkout completion rate is so low, she selects the :strong:`/cart/checkout` business workflow on the service map. The service map now shows Aisha the dependency interactions among the full set of services backing the :strong:`/cart/checkout workflow`.

    .. image:: /_images/logs/service-map.png
        :width: 70%
        :alt: This screenshot shows a service map in Splunk APM displaying the paymentservice as the source of root errors.


    Aisha sees that :strong:`paymentservice` has the highest number of downstream errors that are contributing to a degraded experience for the workflow. Splunk APM identifies the issues as root cause errors. Aisha selects :strong:`paymentservice`. Splunk Observability Cloud displays details about the service’s errors and latency.
    Splunk Observability Cloud also surfaces Related Content tiles that provide access to relevant data in other areas of the application. For example, Aisha can look at the health of the Kubernetes cluster where :strong:`paymentservice` is running or she can examine logs being issued by the :strong:`paymentservice`. 

    .. image:: /_images/logs/related-content.png
        :width: 100%
        :alt: This screenshot shows a service map in Splunk APM providing access to two Related Content tiles: K8s clusters for paymentservice and Logs for paymentservice.

2. Aisha decides to look at the log details. She selects the Related Content tile, :strong:`Logs for paymentservice`. Log Observer Connect opens, and Aisha’s view is automatically narrowed to display only logs from :strong:`paymentservice`. Log Observer Connect displays :strong:`paymentservice` logs that were sent in to Splunk Cloud Platform. Log Observer Connect does not ingest the logs, but displays the logs from their storage in Splunk Cloud Platform. 

    Because Aisha first tracked the workflow problems in Splunk APM, she was able to narrow her search down to only logs coming from :strong:`paymentservice`. Now Aisha can use Log Observer Connect to analyze the logs. 


.. _conduct-initial-analysis:

Conduct initial analysis of logs
========================================================================================================================
Aisha can query the :strong:`paymentservice` logs in Log Observer Connect’s codeless UI where she can filter and aggregate the logs without needing to know the SPL query language.

1. Looking through the incoming logs in the logs table, Aisha sees some error logs, so she selects one to see more details in a structured view. In the log details view on the right, Aisha notices the error message: ``Failed payment processing through ButtercupPayments: Invalid API Token (test-20e26e90-356b-432e-a2c6-956fc03f5609)``.

    .. image:: /_images/get-started/error-log.png
        :width: 100%
        :alt: This screenshot shows the details of an error log in Splunk Log Observer, including the error severity and an error message.

Aisha decides to see if other logs have the same error message. If she can find a pattern, she can figure out what is causing the trouble.


.. _find-log-patterns:

Find log patterns
========================================================================================================================
1. Aisha opens a few other logs to see if others have the same error message. Several of the logs Aisha opens have the same error message: ``Failed payment processing through ButtercupPayments: Invalid API Token (test-20e26e90-356b-432e-a2c6-956fc03f5609)``. 

    Aisha notes that all of the invalid API tokens start with “test”. Aisha hypothesizes that a team pushed the current version, v350.10, live with a test token that doesn’t work in production.

2. To double-check her hypothesis, Aisha selects the error message and selects :strong:`Add to filter`` to show only the logs that contain the same error message.


.. _narrow-your-hypothesis:

Narrow the hypothesis
========================================================================================================================

1. Next, Aisha wants to group the logs by version to see if the group of logs that contain the test API token are on multiple versions. She changes the :strong:`Group by` field to :strong:`version`. 

    Now Aisha can see that all logs that contain the test API token are on version v350.10.

    .. image:: /_images/logs/group-by-version.png
        :width: 100%
        :alt: This screenshot shows the Log Observer page with events filtered down by the error message and grouped by a version of version 350.10. All of the logs that display are error logs.

    Aisha is pretty confident that she has isolated the problem to logs containing the error message: ``Failed payment processing through ButtercupPayments: Invalid API Token (test-20e26e90-356b-432e-a2c6-956fc03f5609)`` in only the most recent version, v350.1. Now she wants to test her hypothesis.


.. _test-your-hypothesis:

Test the hypothesis
========================================================================================================================

1. To be sure, Aisha selects the eye icon for the message filter value to temporarily exclude the filter. Now there are logs that show up for version v350.9 too, but they don’t include the error message. Aisha can now correlate all of the logs containing the test token error message, and no logs that don't contain the error message, to version v350.10.

    
.. _identify-and-remediate:

Identify the root cause and remediate
========================================================================================================================

1. Her exploration in Log Observer Connect convinces Aisha that the test API token in v350.10 is the most likely source of the failures to complete payment. Aisha rolls back the Buttercup Games code from the problematic v350.10 to v350.9.

2. Aisha notifies Deepu about the invalid API token, which is a test token. Deepu replaces the test token with a token that works in production.


Summary
========================================================================================================================
When Buttercup Games' e-commerce site began having a slow checkout completion rate and saw a drop in the number of purchases, a site reliability engineer, Aisha, looked at the :strong:`/cart/checkout` business workflow on the Splunk APM service map. She saw that APM identified the :strong:`paymentservice` as the root cause of errors. Aisha decided to look into the log details by linking from APM to related logs through the Related Content bar. 

In Log Observer Connect, Aisha noticed that several logs coming from :strong:`paymentservice` had the same error. The common error messages indicated that the API token started with “test”. She figured that the test token was the problem. She ruled out other possible problems by filtering and aggregating logs. She correlated the suspicious test token error message with only logs in v350.10.

Consulting with Deepu, the :strong:`paymentservice` owner, they agreed that the test API token was the likely cause of the problem. Aisha rolled back the code to the previous version because v350.9 logs did not contain the test token error message. Then Deepu replaced the test token with a token that works in production. 

After the fix, users were able to complete checkout and make purchases from the Buttercup Games e-commerce site. To prevent similar problems in the future, Aisha decided to create a detector to alert her team when tokens contain "test". The alert and detector will notify Aisha's and Deepu's teams before customers attempt to make purchases that will fail.


Learn more
========================================================================================================================

* For details on business workflows, see :ref:`apm-workflows`.

* For details on using Related Content, see :ref:`get-started-relatedcontent`.

* For details on Log Observer Connect queries, see :ref:`logs-queries`.

* For details on aggregating logs, seel :ref:`logs-aggregations`.

* For details on alerts and detectors, see :ref:`create-detectors`.