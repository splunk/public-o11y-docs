.. _admin-manage-teams:

*********************************************************
Create and manage teams in Splunk Observability Cloud
*********************************************************

.. meta::
   :description: Learn how to manage teams in Splunk Observability Cloud.

.. toctree::
   :hidden:

   Manage teams <manage-membership>
   Manage team landing pages <configure-page>
   Manage team notifications <team-notifications>
   Link detectors and dashboards to teams <associate-team>

Use Splunk Observability Cloud teams to coordinate teamwork. Perform the following tasks to set up your teams and provide team members with resources that can help streamline their teamwork.

.. raw:: html

  <embed>
    <h2>Organize users with teams</h2>
  </embed>

As a Splunk Observability Cloud administrator, use teams to organize users by functional area, then you can connect users in a particular area to the detectors and dashboard groups that they're most interested in. For example, here are examples of some teams based on functional areas:

  * Security: Teams who monitor hardware and software security
  * Hardware operations: Teams who add, replace, or fix computer hardware
  * DevOps: Teams responsible for maintaining system uptime
  * Infrastructure IT: Teams who manage user access to systems

In these areas, each team might monitor specific metrics related to their functional area, or they might monitor a general set of metrics for the specific systems they manage, or both.

For example, your security team might focus on metrics that indicate login failures, because these failures indicate attempts to break into systems. You might also have several DevOps teams, each of which monitors CPU temperature and network response time metrics for the systems they manage.

To learn more about creating and managing teams, see :ref:`admin-manage-team-membership`.

.. raw:: html

  <embed>
    <h3>Link teams to relevant Observability Cloud features and content</h3>
  </embed>

You can link teams to relevant dashboard groups and detectors, giving them focused access to the information they use the most.

To learn more about linking teams to dashboard groups and detectors, see :ref:`admin-team-notifications`.

.. raw:: html

  <embed>
    <h3>Set up team landing pages to provide a handy location for team resources</h3>
  </embed> 

A team landing page provides a customizable text area that you can use to provide useful information for the team. The team landing page also provides access to any dashboard groups and detectors that you linked to the team.

To learn more about team landing pages, see :ref:`admin-configure-page`.

.. raw:: html

  <embed>
    <h3>Create team notifications</h3>
  </embed> 


Define team notifications to help ensure that your team receives the alerts it needs to stay informed.

To learn more about team notifications, see :ref:`admin-team-notifications`.
