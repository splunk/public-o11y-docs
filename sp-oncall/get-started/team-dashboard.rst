.. _team-dashboard:

************************************************************************
Splunk On-Call Team dashboard
************************************************************************

.. meta::
   :description: Splunk On-Call system requirements, including browsers, mobile support, and incident requirements.



The Splunk On-Call Team Dashboard provides a comprehensive overview of incidents. This view automatically defaults to the teams that you are a member of and allows teams to dive into the details and understand the status of alerts or incidents. 

All incidents derived from integrated monitoring tools in the incident table include  their respective logos to help you rapidly identify the source of an alert. Manually created incidents, along with incidents originating from the Email Endpoint or the REST API integrations, will remain logo free.

Information Alerts can still be found on the XXXXXXX Timeline Page.

.. image:: /_images/spoc/team-dashboard.png
    :width: 100%
    :alt: An image of the team dashboard. On-Call individuals listed on the left; Team incidents are shown in the main pane.


Filters
===========

The filters provide an easy way for you to see exactly what you are looking for and nothing else. Whether you want to filter by team or by incident state, these filters allow for you to see only what is relevant to you. You can filter the incident table first by team status (with default team associations), as well as incident state.

.. image:: /_images/spoc/team-filters.png
    :width: 100%
    :alt: Using the drop-down beside Teams, you can filter which team to display.


Incident Table
===================

Quickly identify responsible parties during a firefight by easily seeing which policies are being paged, take action on an incident (acknowledge, add responder, reroute, snooze, resolve), and see the status of incidents. You can also find annotation counts, chats, and associated alerts.

.. image:: /_images/spoc/team-incidents.png
    :width: 100%
    :alt: You can load new incidents to refresh the view.



Manual Incident Creation
----------------------------

You can create a manual incident from the team dashboard by selecting :guilabel:`Create Incident` in the top right corner.  For instructions, see XXXXXX manual-incident-creation file XXXXXX.

Incident War Rooms
----------------------------

Access Incident Details directly from the Team Dashboard by selecting the incident number link. This will expand the incident and its event history in the Incident War Room XXXXXX link to war-room file XXXXXX. 

People Table
==================

See a list of users that are on-call for the teams that you have filtered for. You can see which teams that these users are on call for, as well as selecting the user's name to take on-call or see these user's upcoming shifts.

You can navigate to the team's view below to see other user's associated with teams.

Take On-Call from another user
------------------------------------
Navigate to a user in the on-call list, and click the user's name. From here, you can take the shift from a user from the pop over.

To revert an on-call take, click the “clear take” button from the popover associated with your profile.

.. image:: /_images/spoc/take-oncall.png
    :width: 100%
    :alt: Select a user and then Take Shift to take a shift from a team member.



Status page
----------------
You can relay service status updates via statuspage.io by following these instructions XXXXXX link to victorops-statuspage-integration fiel XXXXXX

