.. _admin-configure-page:

********************************************************************
Manage team landing pages in Splunk Observability Cloud
********************************************************************

.. meta::
   :description: Learn how to view and configure an associated landing page that contains information relevant to team members.

Every team has an associated landing page that contains information relevant
to team members. A landing page brings together dashboard groups and alerts
triggered by detectors that are linked to the team. The landing page has the
following sections:

* A customizable text section to provide helpful information to team members. In this section, you can use Markdown-formatted text.

* A count of active alerts from detectors linked to the team, grouped by severity.

* Links to one or more dashboard groups linked to the team.

Anyone can view the landing page for any team.


.. _view-team-landing-page:

View a team landing page
============================================================================

You can view team landing pages in different ways.

To see the landing page for any team, follow these steps:

#. Log in to Splunk Observability Cloud.

#. In the left navigation menu, select :menuselection:`Settings > Teams`.

#. A table of current teams appears in the main panel.

#. Select a team name to see its landing page.

To see the landing page for your team, follow these steps:

#. Log in to Splunk Observability Cloud.

#. In the left navigation menu, select :menuselection:`Dashboards`.

#. In the :guilabel:`My Teams` area, select a team name to see its team landing page.


.. _use-team-landing-page:

Use a team landing page
============================================================================

Use a team landing page as your starting point for monitoring important data.

To review alerts associated with a detector linked to the team, follow these steps:

#. To see all active alerts, select :guilabel:`Team Alerts`. The Alerts page for the team appears. You see all active alerts for detectors linked to the team.

#. To see all active alerts for a specific severity level, select the severity. The Alert page for the team appears. You see active alerts for detectors linked to the team, filtered by the severity level you selected.

#. To see a list of active alerts for each detector linked to the team, select :guilabel:`Team Detectors`. The Alert page for the team appears, listing the name of the detector that issued each alert.

To learn more about linking teams to detectors and dashboard groups, see :ref:`admin-associate-team`,


.. _edit-landing-page-text:

Edit the landing page text
============================================================================

A team landing page provides a text area where you can provide team documentation and useful links. For example, you can use this area to describe the team's purpose and provide links to relevant wiki pages or runbooks.

The text area supports standard Markdown, including links that use the following format:

``[link](url)``.

To learn about which roles can edit landing page text, see :ref:`about-team-roles`.

To edit landing page text, follow these steps:

#. Select :guilabel:`Edit Description`.

#. Enter your changes in the edit box.

#. Select :guilabel:`Save`.
