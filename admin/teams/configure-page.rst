.. _admin-configure-page:

**********************************
Team landing pages
**********************************

.. meta::
   :description: Learn how to view and configure a team landing page.

Every team has an associated landing page that contains information relevant
to team members. A landing page brings together dashboard groups and alerts
triggered by detectors that are linked to the team. The landing page has the
following sections:

* A customizable text section to provide helpful information to team members.
  In this section, you can use Markdown-formatted text.
* A count of active alerts from detectors linked to the team, grouped by severity.
* Links to one or more dashboard groups linked to the team.

Anyone can view the landing page for any team.

.. _view-team-landing-page:

View a team landing page
============================================================================

You can view team landing pages in different ways:

* To see the landing page for any team, follow these steps:

  #. From the main menu, select :menuselection:`Organization Settings > Teams`.
  #. Click the name of a team to see its landing page.

* To see the landing page for your team if you belong to only one team, follow these steps:

  #. From the main menu, select :menuselection:`Organization Settings > Dashboards`.
  #. Your team landing page appears.

* To see the landing pages for your teams if you belong to more than one team, follow these steps:

  #. From the main menu, select :menuselection:`Organization Settings > Dashboards`.
     Observability Cloud displays all the dashboards to which you have access.
  #. On the navigation bar, a tab appears for each team you belong to.
  #. For the team landing page you want to see, click the tab that has the team name.
  #. The team landing page for that team appears.

.. _use-team-landing-page:

Use a team landing page
============================================================================

Use a team landing page as your starting point for monitoring important data.

To review alerts associated with a detector linked to the team, follow these steps:

#. To see all active alerts, click :guilabel:`Team Alerts`. The Alerts page for the team appears.
   You see all active alerts for detectors that are linked to the team.
#. To see all active alerts for a specific severity level , click the severity.
   The Alert page for the team appears. You see active alerts for detectors that are linked to
   the team, filtered by the severity level you selected.
#. To see a list of active alerts for each detector linked to the team,
   click :guilabel:`Team Detectors`. The Alert page for the team appears,
   listing the name of the detector that issued each alert.

To learn more about linking content and teams, see Link Detectors and Dashboard Groups to a Team.

.. _edit-landing-page-text:

Edit the landing page text
============================================================================

The text area identified by the team name contains text and links that provide
documentation for the team and its links. One way to use it is to
describe the team’s purpose and provide links to relevant wiki pages or runbooks.

The descriptive text supports standard Markdown, including links that use the
following format:

``[link](url)``.

If you're a team member, you can edit the text by following these steps:

#. Click :guilabel:`Edit Description`.
#. Enter your changes in the edit box.
#. Click :guilabel:`Save`.

A user with administrative access can edit the text of any team landing page.