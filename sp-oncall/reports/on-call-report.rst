
.. _reports:


************************************************************************
Splunk On-Call On-Call review
************************************************************************

.. meta::
   :description: Learn about the On-Call report in Splunk On-Call.



Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Enterprise

All users have the ability to reach out to Splunk On-Call support at any time with questions.

Live Chat: If you are logged into your Splunk On-Call instance, you will have the ability to Live Chat with the Splunk On-Call Support team.

This topic provides a holistic overview of an individual and team's workload during a given amount of time.


The On-Call Review provides an overview of your team's workload and a granular view of an individual's workload—whether that be on-call hours (time spent as the first step in an escalation policy), or an individual's involvement for specific incidents in Splunk On-Call.

Customize the Splunk On-Call, On-Call Review
======================================================


.. image:: /_images/spoc/reports-oncall1.png
    :width: 100%
    :alt: An example of the on-call report.


Sorting
----------------

You can sort by team to show a list of users associated with a team. Note that when filtered by a specific team, this will show only
the individual's workload associated with that team. To see the full workload of an individual, please select “All” under teams, and this will present all of an individual's workload.

.. image:: /_images/spoc/reports-oncall2.png
    :width: 100%
    :alt: You can sort by team.

Date range selection
----------------------------

You can modify the specified hours associated with the report and this will be reflected in both the view portray on the page, as well as the associated CSVs.

.. image:: /_images/spoc/reports-oncall3.png
    :width: 100%
    :alt: You can sort by date range.

CSV Download for On-Call reports
--------------------------------

There are three different CSV downloads associated with this report. From the overview page, the CSV includes a list of users associated with the team including on-call hours (time spent in rotation in first step of an escalation policy), and incident involvement (engaged in any steps of incident remediation). On the user details page, there are two CSV download options: 

- breakdown of on-call hours and from where they are derived
- incident involvement including all steps in that incident.

.. image:: /_images/spoc/reports-oncall4.png
    :width: 100%
    :alt: CVS download button

CSV download for large incident On-Call reports
-------------------------------------------------------

In order to see the full list of incidents per user when there are more than twenty steps involved in an incident or over 100 incidents,  download the CSV file.
