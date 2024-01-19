
.. _reports:


************************************************************************
Splunk On-Call On-Call review
************************************************************************

.. meta::
   :description: About the user roll in Splunk On-Call.


About the Splunk On-Call, On-Call Review
----------------------------------------

[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported: Enterprise** 

**VictorOps Version Required: N/A SaaS**

**What you need to know: The goal of this review is to provide a
holistic overview of an individual and team's workload during a given
amount of time.** 

[/ht_toggle]

While being on-call can create accountability concerns and stress, this
report portrays the story of our unsung on-call heroes, and can help
make on-call suck less.

.. raw:: html

   <script type="text/javascript" id="vidyard_embed_code_magQDpWGo5rzPd8DJZm14A" src="//play.vidyard.com/magQDpWGo5rzPd8DJZm14A.js?v=3.1.1&amp;type=inline"></script>

The On-Call Review provides an overview of your team's workload and a
granular view of an individual's workload—whether that be on-call hours
(time spent as the first step in an escalation policy), or an
individual's involvement for specific incidents in Splunk On-Call.

Customize the Splunk On-Call, On-Call Review
--------------------------------------------

 

|image1|
~~~~~~~~

**Sorting**
~~~~~~~~~~~

You can sort by team to show a list of users associated with a team.
Please note that when filtered by a specific team, this will show only
the individual's workload associated with that team. To see the full
workload of an individual, please select “All” under teams, and this
will present all of an individual's workload.

.. image:: images/Sorting-On-Call-Review.png

**Date Range Selection**
~~~~~~~~~~~~~~~~~~~~~~~~

You can modify the specified hours associated with the report and this
will be reflected in both the view portray on the page, as well as the
associated CSVs.

.. image:: images/On-Call-Review-Sort-by-Date-1.png

CSV Download for On-Call Reports
--------------------------------

There are three different CSV downloads associated with this report.
From the overview page, the CSV includes a list of users associated with
the team including on-call hours (time spent in rotation in 1st step of
an escalation policy), and incident involvement (engaged in any steps of
incident remediation). On the user details page, there are two CSV
download options: breakdown of on-call hours and from where they are
derived, and also incident involvement including all steps in that
incident.

.. image:: images/Export-CSV.png

**CSV Download for Large Incident On-Call Reports**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In order to see the full list of incidents per user when there are more
than twenty steps involved in an incident or over 100 incidents, please
download the CSV file.

.. |image1| image:: images/Screen_Shot_2020-11-10_at_2_57_46_PM.png
