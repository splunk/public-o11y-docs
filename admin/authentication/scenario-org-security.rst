
.. _scenario-security:

*********************************************************************************************************
Scenario: Wei maintains a secure organization with many teams and users using Splunk Observability Cloud
*********************************************************************************************************

.. meta::
   :description: Scenario: Wei maintains a secure organization with many teams and users using Splunk Observability Cloud.


Buttercup Games, a fictitious game company, recently refactored its e-commerce site to go cloud native. The site uses microservices for the application architecture and containers for the underlying infrastructure.

In this scenario, you learn how Wei, a site reliability engineering (SRE) manager, performs the following tasks using Splunk Observability Cloud to keep their organization secure and minimize unintentional changes.

Enhance team security with access restrictions and tokens
====================================================================================

Kai, the on-call SRE, informs Wei that the uptime for the Buttercup Games site has dropped significantly in the past hour and that customers haven't been able to access the website. However, Wei hasn't received any alerts related to the drop in system uptime.

#. Wei logs in to Splunk Observability Cloud on their laptop to investigate. They go to the alert list to check the alert configurations and notice that the relevant uptime detector has been muted.
#. Wei goes on to check the detector history in the :guilabel:`Detector Info` tab and sees that the most recent edit was made by someone not on their SRE team. Wei realizes the person might have accidentally muted the detector when they were viewing the detector.
#. During their investigation, Wei also notices that write permission for the uptime detector is default, which means anyone in the organization can make changes to it.

Before editing write permissions for the detector, Wei uses team management in Splunk Observability Cloud to make the process more convenient.

#. To avoid having to add the same list of users to permission lists for all dashboards and detectors, and to account for future team expansion, Wei first creates a team in Splunk Observability Cloud that consists of only SREs in charge of monitoring uptime alerts.
#. Wei wants to prevent other users from joining their team without approval, so they turn on access restrictions for teams in their organization.
#. Since the SREs need to create and delete detectors, Wei generates a token for their team to be able to manage detectors using the API. Specifically, Wei chooses only the :strong:`API` authorization scope for the token to preserve security.

Learn more
--------------------

- For more information on how to create teams, see :ref:`admin-create-team`.
- For more information on how to turn on team access restrictions, see :ref:`admin-team-controls`.
- For more information on how to generate tokens, see :ref:`create-access-token`.

Limit who can edit a detector
=============================================================

#. Wei navigates back to the muted uptime detector to unmute it.
#. Now that Wei has a secure team configuration, they are ready to add only the team they created to the detector permission list.

From now on, only Wei and their teammates can make further changes to uptime detectors.

Learn more
--------------------

For more information on setting up detector permissions, see :ref:`detector-manage-permissions`.

Prevent people on other teams from viewing and changing your dashboards
====================================================================================

#. Wei knows that users can link detectors to charts in Infrastructure Monitoring, so they select :guilabel:`Detector actions > Info` to see if the uptime detector is linked to any charts.
#. Wei sees that the detector is linked to a chart in the error budget dashboard, which belongs to their team's dashboard group.
#. To make sure that the chart won't be accidentally changed like the detector, Wei navigates to the dashboard group and edits the permissions, so that only their team can make changes to the dashboard group, but the rest of the organization can still view it.
#. Wei applies the same permission settings to other detectors and dashboard groups owned by their team.

Learn more
--------------------

- For more information on dashboard and dashboard group permissions, see :ref:`dashboard-manage-permissions`.
- For more information on linking detectors to charts, see :ref:`linking-detectors`.

Summary
====================================================================================

Using team access restrictions, limited tokens, and customized permissions for detectors, dashboard groups, and dashboards, Wei was able to reinforce security for their team as well as their organization in Splunk Observability Cloud. Wei's use of these features also prevents accidental changes from happening in the future.
