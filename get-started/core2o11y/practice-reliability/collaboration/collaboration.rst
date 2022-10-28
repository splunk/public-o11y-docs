.. _collaboration-collaboration:

***********************************************************************************
Collaborate on observability within and across teams
***********************************************************************************

.. meta::
   :description: This page provides an overview of how Observability Cloud helps team members collaborate with each other and other teams by sharing dashboards, queries, business workflows, and through alerting.


SREs, developers, operations, and other teams efficiently collaborate in Splunk Observability Cloud by sharing dashboards and queries, and by sending notifications. For more on notifications and alerting, see :ref:`toil-reduction-toil-reduction`.  

Observability Cloud teams and alerting
===================================================================================
The primary means of collaborating on observability and reliability across teams is by setting up Observability Cloud teams. Teams serve as a secure way to organize users by functional area. Teams also let you control access and permissions to all objects, dashboards, and queries in Observability Cloud. Observability Cloud offers enterprise-grade management with :ref:`token and access control <admin-tokens>`. 

Once you have organized users into teams by funcitonal area, you can connect users in a particular area to detectors and dashboard groups that they are most interested in. See :ref:`admin-manage-teams` to learn more about how you can use Observability Cloud teams to facilitate collaboration within and across functional teams. Organize your Observability Cloud teams structure to reduce toil by configuring alerts to notify only the most relevant teams. See :ref:`toil-reduction-alerts` for more information. For an example of increasing security while reducing toil, see :ref:`use-case-security`.

Splunk APM 
===================================================================================
You can facilitate collaboration across product, strategy, and sales teams with Splunk APM. When you :ref:`configure Business Workflow rules <apm-create-workflow-rule>`, APM tracks business Key Performance Indicators (KPIs) as well as Service Level Indicators (SLIs) . See :ref:`monitor-business-workflows` for an example of how to use APM to track business KPIs and collaborate across departments.

To learn how to set up APM to correlate with business KPIs, see :ref:`apm-workflows`

Splunk Log Observer Connect
===================================================================================
You can 
:ref:`sSave and share Log Observer Connect queries <logs-save-share>` across observability teams when you create a valuable query that might be useful for other team members or other teams. See :ref:`logs-queries` to learn the many different ways you can query logs without a query language in Log Observer Connect.

Splunk Real User Monitoring (RUM)
===================================================================================
When you set up alerts to monitor RUM browser data, iOS RUM data, or manually instrumented Android applications, you can :ref:`alert directly on RUM data <rum-alerts>`. Use Observability Cloud teams to send notifications to relevant teams. See :ref:`admin-team-notifications` to learn how.

To learn more about the kind of RUM data you can collect and alert on, see :ref:`get-started-rum`.