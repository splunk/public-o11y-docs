.. _practice-reliability-collaboration:

***********************************************************************************
Collaborate on observability within and across teams
***********************************************************************************

.. meta::
   :description: This page provides an overview of how Observability Cloud helps team members collaborate with each other and other teams by sharing dashboards, queries, business workflows, and through alerting.


You can scale your system's observability through collaboration. Site Reliability Engineers (SREs), developers, operations, and other teams can efficiently collaborate in Splunk Observability Cloud by sharing dashboards, queries, and detectors, which you can configure to send notifications to the appropriate teams or users. By using Observability Cloud's tools for collaborating, your teams can exponentially expand their reach and scale the reliability of your systems quickly.

Observability Cloud dashboards
===================================================================================
The most common way of collaborating within and among teams in Observability Cloud is by sharing dashboards. See :ref:`dashboards <dashboards>`. Well-designed dashboards can provide useful and actionable insight into your system at a glance. 

Allow a group of people in your organization to access a set of dashboards by creating a dashboard group. See :ref:`dashboard-group`. You can see, grant, or revoke permissions to a dashboard group. To learn how, see :ref:`dashboard-manage-permissions`. You can also share individual dashboards. See :ref:`dashboard-share-clone-mirror` for more information.

Observability Cloud teams and alerting
===================================================================================
A primary means of organizing collaboration on observability and reliability across teams is by setting up Observability Cloud teams. Teams serve as a secure way to organize users by functional area. Teams also let you control access and permissions to all objects, dashboards, and queries in Observability Cloud. Observability Cloud offers enterprise-grade management with token and access control. See:ref:`admin-tokens`. 

After you organize users into teams by functional area, you can connect users in a particular area to detectors and dashboard groups that they are most interested in. See :ref:`admin-manage-teams` to learn more about how you can use Observability Cloud teams to facilitate collaboration within and across functional teams. Organize your Observability Cloud teams structure to reduce toil by configuring detectors to notify only the most relevant teams. For an example of increasing security while reducing toil, see :ref:`scenario-security`.

Splunk APM 
===================================================================================
You can facilitate collaboration across product, strategy, and sales teams with Splunk APM. When you configure Business Workflow rules, APM tracks business key performance indicators (KPIs) as well as service level indicators (SLIs). See :ref:`apm-create-workflow-rule` for more information. See :ref:`monitor-business-workflows` for an example of how to use APM to track business KPIs and collaborate across departments.

To learn how to set up APM to correlate with business KPIs, see :ref:`apm-workflows`.

Splunk Log Observer Connect
===================================================================================
You can save and share Log Observer Connect queries across observability teams when you create a valuable query that might be useful for other team members or other teams. To learn more, see :ref:`logs-save-share`. See :ref:`logs-queries` to learn the different ways you can query logs without a query language in Log Observer Connect.

Splunk Real User Monitoring (RUM)
===================================================================================
When you set up detectors to monitor RUM browser data, iOS RUM data, or manually instrumented Android applications, you can alert directly on RUM data. See :ref:`rum-alerts` for more information. Use Observability Cloud teams to send notifications to relevant teams. See :ref:`admin-team-notifications` to learn how to send and edit notifications.

To learn more about the kind of RUM data you can collect and alert on, see :ref:`get-started-rum`.