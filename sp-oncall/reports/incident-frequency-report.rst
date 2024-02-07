
.. _incident-frequency:


************************************************************************
Splunk On-Call Mobile App Settings
************************************************************************

.. meta::
   :description: About the user roll in Splunk On-Call.


Incident Frequency Report
-------------------------

[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported: Enterprise** 

**What you need to know: The goal of our Incident Frequency Report is to
give your team the data and context around incidents to be proactive in
your incident management response.**

[/ht_toggle]

While the Splunk On-Call Timeline gives you the real-time firehose to
give your team full context during a firefight, our *Incident Frequency
Report* allows your team to analyze the flow of incidents after the
fact. Allowing you to go upstream to solve the incident causing the
problem in your system.

To access the Incident Frequency Report (IFR) navigate to Reports >>
Incident Frequency.

--------------

Team Filtering
--------------

Get a holistic overview of all incidents coming into Splunk On-Call by
selecting the \_A\__ll\_ drop-down, or take a deep dive into individual
teams to uncover specific problem areas affecting your team.

 images/IFR-Team-Filter.jpg

--------------

Segmenting
----------

Identifying the problem causing area is hard to pin down, so we give you
the ability to identify flapping alerts, the parts of your platform that
need attention, and the information to understand from where your
incidents are coming. We give you four options to segment your
incidents: integrations, host, service, or route key.

 images/IFR-Segmenting.jpg

--------------

Date Range & Bucketing
----------------------

See how incident trends impact your team on a daily, weekly, or monthly
basis. It's up to you how granular your scope can be.

. images/IFR-Display.jpg

--------------

Table View & Hover State
------------------------

The table view will adjust to match the top 15 most frequent incidents
associated with the selected segment filter.

To see the *Hover State*, hover over any position on the graph, and a
pop-up will give you information for that given period of time. By
clicking on that hover state, the table below will focus on the selected
time period to highlight what happened during a specific period of time
dependent on your time bucketing selection. You can reset the table view
by clicking the *reset* button. Note: Hover state selection will not
affect the contents of the CSV. To segment the CSV by a specific date
range, adjust the date range rules.

 images/IFR-Hover.jpg

--------------

CSV Download
------------

The data delivered in the CSV will always reflect the date range and
team segmenting designed in the setting views. Changing the segment by
filters and date range bucketing will have no effect on the contents of
the download.

Things to note about the CSV
----------------------------

-  Timestamps are at millisecond granularity
-  CSV is sorted by Incident ID in descending order

CSV File Column Headings
~~~~~~~~~~~~~~~~~~~~~~~~

When downloading the Incident Frequency CSV file you can expect to find
the following columns to include the unit of time/timezone that the
incident is recorded in. Time related column headings will appear in
this format as of 12/16/2019.

.. raw:: html

   <table width="343">

.. raw:: html

   <tbody>

.. raw:: html

   <tr>

.. raw:: html

   <td>

Time to Acknowledge (seconds)

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr>

.. raw:: html

   <td>

Time to Resolve (seconds)

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr>

.. raw:: html

   <td>

Incident Start Time (UTC)

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr>

.. raw:: html

   <td>

Acknowledge Time (UTC)

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr>

.. raw:: html

   <td>

Resolve Time (UTC)

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   </tbody>

.. raw:: html

   </table>

[table id=8 /]

 

https://help.victorops.com/knowledge-base/incident-fields-glossary/#glossary-of-fields
