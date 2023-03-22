.. _LOconnect-usecase:

************************************************************************************************************************
Use case: Troubleshoot failures in online purchases with Log Observer Connect
************************************************************************************************************************


.. meta::
  :description: Troubleshoot problems in a workflow using Log Observer Connect.

Buttercup Games, a fictitious company, runs an e-commerce site to sell its products. They recently refactored their site to use a cloud-native approach with a microservices architecture and Kubernetes for the infrastructure.

Buttercup Games site reliability engineers and service owners collaborate to monitor and maintain the site to ensure that people have a great experience when they visit. Buttercup Games chose a cloud-native approach because it facilitates observability. Splunk Observability Cloud is their observability solution. Buttercup Games uses Splunk Observability Cloud to find and solve problems that cause outages or failures in purchases from their online store.

In the past hour, the number of purchases on the Buttercup Games site dropped significantly and the checkout completion rate is too low. Aisha, an SRE, and Deepu, a service owner, perform the following tasks with Splunk Log Observer Connect and other views in Splunk Observability Cloud to troubleshoot by identifying the root cause of the problem with the purchase workflow:

1. :ref:`which-logs-matter`

2. :ref:`conduct-initial-analysis`

3. :ref:`find-log-patterns` 

4. :ref:`narrow-your-hypothesis`

5. :ref:`test-your-hypothesis`

6. :ref:``


.. _which-logs-matter:

Determine which logs matter
========================================================================================================================

1. Aisha opens the service map in Splunk Application Performance Monitoring (APM). To find out why the checkout completion rate is so low, she selects the :strong:`/cart/checkout` business workflow on the service map. The service map now shows Aisha the dependency interactions among the full set of services backing the :strong:`/cart/checkout workflow`.

[apm service map pic from “Investigate the root cause of a business workflow error“ section of orig. Doc]

Aisha sees that paymentservice has the highest number of downstream errors that are contributing to a degraded experience for the workflow. Splunk APM identifies the issues as root cause errors. Aisha selects paymentservice. Splunk Observability Cloud displays details about the service’s errors and latency.
Splunk Observability Cloud also surfaces Related Content tiles that provide access to relevant data in other areas of the application. For example, Aisha can look at the health of the Kubernetes cluster where the paymentservice is running. She can also examine logs being issued by the paymentservice.

[next APM service map pic from “Investigate the root cause of a business workflow error“ section of orig. Doc]

2. Aisha decides to look at the log details. She selects the Related Content tile, Logs for paymentservice. Log Observer Connect opens, and Aisha’s view is automatically narrowed to display only logs from paymentservice. Log Observer Connect displays paymentservice logs that were sent in to Splunk Cloud Platform. Log Observer Connect does not ingest the logs, but displays the logs from their storage in Splunk Cloud Platform. Because Aisha first tracked the workflow problems in Splunk APM, she was able to narrow her search down to only logs coming from paymentservice. Now Aisha can search the paymentservice logs in Log Observer Connect’s codeless UI where she can filter and aggregate the logs without needing to know the SPL query language.


.. _conduct-initial-analysis:

Conduct initial analysis of logs
========================================================================================================================


3. Aisha sees some error logs, so she selects one to see more details in a structured view. In the log details view on the right, Aisha notices the error message: “Failed payment processing through ButtercupPayments: Invalid API Token (test-20e26e90-356b-432e-a2c6-956fc03f5609).

[1st pic from Examine error logs for meaningful messages and patterns]


.. _find-log-patterns:

Find log patterns
========================================================================================================================

4. Aisha opens a few other logs to see if others have the same error message. The first several logs Aisha opens have the same error message: “Failed payment processing through ButtercupPayments: Invalid API Token (test-20e26e90-356b-432e-a2c6-956fc03f5609). Aisha notes that all of the invalid API tokens start with “test”. It seems that a team pushed the current version, v350.10 live with a test token that doesn’t work in production.

5. To double-check her hypothesis, Aisha selects the error message and selects Add to filter to show only the logs that contain the same error message.


.. _narrow-your-hypothesis:

Narrow your hypothesis
========================================================================================================================

6. Next, Aisha wants to group the logs by version to see if the group of logs that contain the test API token are on multiple versions. She changes the Group by field from severity to version. Now Aisha can see that all logs that contain the test API token are on version v350.1.

[2nd pic from Examine error logs for meaningful messages and patterns  - showing version]


.. _test-your-hypothesis:

Test your hypothesis
========================================================================================================================

7. To be sure, Aisha selects the eye icon for the message filter value to temporarily exclude the filter. Now there are logs that show up for version v350.9 too, but they don’t include the error message.

This exploration in Log Observer Connect convinces Aisha that the test API token in v350.10 is the most likely source of the failures to complete payment. Kai notifies Deepu, the paymentservice owner about her findings.


.. _identify-and-remediate:

Identify the root cause and remediate
========================================================================================================================

Now that Aisha has used Log Observer Connect to determine where the problem is, she can roll back the bad version of the application code to immediately unblock users' checkout completion on your e-commerce. Lastly, she can ask Deepu's team to replace the incorrect token, a test token, with a token that works in production.


Summary
========================================================================================================================

Learn more
========================================================================================================================