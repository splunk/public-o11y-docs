.. _filtering-options:

************************************************************************
Filtering options
************************************************************************

.. meta::
   :description: Splunk On-Call offers several methods to customize the interface to view only what is relevant. Filtering is done on a 'by user' basis.


Filtering is a useful tool to isolate only the messages, notifications and incidents which concern the user. Splunk On-Call offers several methods to customize the interface to view only what is relevant. Filtering is done on a 'by user' basis.

Timeline Filtering:
========================

To filter your timeline: 

#. In the main Timeline select the filters icon.

* Here you will see two tabs with the the options to filter by Routing Keys and Message Types. The Routing Keys filter allows you to filter the timeline to see only Incidents that are associated to your Routing Key teams.

* The Message Types filter allows you to filter the timeline by message type, so that you can selectively view Alerts, Chats, System Actions, and Delivery Insights. Here you can uncheck the messages you would like to exclude from your timeline.

Incident Filtering:
-------------------

You have 3 main tabs in the Incident Pane:

* All Incidents - This tab shows all incidents being ingested by the Splunk On-Call Platform (Not user or team specific).

* * Your Incidents- This tab shows all incidents you are being paged for, have acknowledged, or resolved.

Teams Incidents - This tab shows all incidents your Team is being paged for, has acknowledged, or resolved.

People Pane Filtering:
----------------------

People Pane allows you to filter by Teams or by Users along with a custom search:

* Under the :guilabel:`Teams` tab you can filter by :guilabel:`Your On-call`, :guilabel: `Your Teams`, or :guilabel: `All Teams`. Selecting :guilabel:`Schedule` under the team name provides a hot link to that teams schedule. 
* Under the :guilabel: `Users` tab you can filter by On-call, Engaged, Teammates, or All Users. 
    * On-call users are denoted by the orange and black oak leaf to the right of their name. 
    * Engaged users are denoted by a bright green circle to the left of their name. This shows who has been active in the platform over the past 10 minutes.

Main Page Filtering:
--------------------

* Within the Timeline, you have 3 panes; People, Timeline, and Incidents. You can filter these panes under the :guilabel: `Customize View` button on the top right of the page. 
* When you click on People, Timeline, or Incidents, it will hide that pane. 
* When Hiding the Timeline and People Panes, the Incident Pane is reactive, and it moves from a Card View to a Table View. From here you can sort by incident number, description, and date. This gives you an organized high-level view of the incidents in your organization.
