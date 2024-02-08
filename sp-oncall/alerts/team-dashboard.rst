.. _incident-review-spoc:

************************************************************************
About the Splunk On-Call Post Incident Review
************************************************************************

.. meta::
   :description: Learn how to manually take an on-call shift from someone in real-time. Ideal for unexpected absences from work when you're on-call.


Team Dashboard
==============

The Splunk On-Call Team Dashboard provides a comprehensive overview of
incidents. This view automatically defaults to the teams that you are a
member of and allows teams to dive into the details, understand the
status

All incidents derived from integrated monitoring tools in the incident
table include  their respective logos to help you rapidly identify the
source of an alert. Manually created incidents, along with incidents
originating from the Email Endpoint or the REST API integrations, will
remain logo free.

Information Alerts can still be found on the `Timeline
Page. <https://help.victorops.com/knowledge-base/timeline/>`__

|image|


Filters
-------

The filters provide an easy way for you to see exactly what you are
looking for and nothing else. Whether you want to filter by team or by
incident state, these filters allow for you to see only what is relevant
to you. You can filter the incident table first by team status (with
default team associations), as well as incident state.

image _images/spoc/Filters-scaled.jpg

Incident Table
--------------

Quickly identify responsible parties during a firefight by easily seeing
which policies are being paged, take action on an incident (acknowledge,
add responder, reroute, snooze, resolve), and see the status of
incidents. You can also find annotation counts, chats, and associated
alerts.

image: _images/spoc/Incidents-scaled.jpg

Manual Incident Creation
^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can create a manual incident from the team dashboard by selecting
“Create Incident” in the top right corner `following these
instructions <https://help.victorops.com/knowledge-base/manual-incident-creation/>`__.

Incident War Rooms
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Access *Incident Details* directly from the *Team Dashboard* by clicking
the *incident number* link—this will expand the incident and its event
history in the `Incident War
Room. <https://help.victorops.com/knowledge-base/war-room/>`__ 

People Table
------------

See a list of users that are on-call for the teams that you have
filtered for. You can see which teams that these users are on call for,
as well as clicking the user's name to take on-call or see these user's
upcoming shifts.

You can navigate to the team's view below to see other user's associated
with teams.

Take On-Call from Another User
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Navigate to a user in the on-call list, and click the user's name. From
here, you can take the shift from a user from the pop over.

To revert an on-call take, click the “clear take” button from the
popover associated with your profile.

_images/spoc/People-Table.jpg

 

 

_images/spoc/Take-On-Call.jpg

 

Status Page
~~~~~~~~~~~

You can relay service status updates via statuspage.io by `following
these
instructions. <https://help.victorops.com/knowledge-base/victorops-statuspage-integration/>`__

.. |image| image:: /_images/spoc/Screen-Shot-2020-08-18-at-9.22.05-AM.png
