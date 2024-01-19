.. _post-incident-review:

************************************************************************
About the Splunk On-Call Post Incident Review
************************************************************************

.. meta::
   :description: Learn how to manually take an on-call shift from someone in real-time. Ideal for unexpected absences from work when you're on-call.


The *Post-Incident Review Report* from Splunk On-Call allows you to gain
historical insight on events surrounding a particular incident or range
of time, so the next time a similar situation arises, you have a
documented account of how you solved the problem. We believe it's
important to not just catalog what happened in an incident, but to
analyze the event in its entirety, and define actionable steps that help
a team and/or organization dive deeper into the data.

Creating a Post Incident Review Report
--------------------------------------

To create a Post-Incident Review Report, access the Splunk On-Call web
portal, and then click on *Reports.*

Select the *Post-Incident Reviews* option and click *New Report*. Enter
a title and click *Create Report*.

Configuring Post Incident Review Reports
----------------------------------------

Once you've created a *New Report*, you'll enter the main report
configuration page where you'll be able to provide and define context
for your team about the effects of an incident. Here you'll give the
report a title, set a date range, limit or share editing privileges, and
select whether or not an incident impacted customers. You may even
create detailed *Action Items* to serve as guidelines for future
incident management. Gather and add action items so that your team can
take steps to learn from the current incident and improve your response
in the future.

Currently, the report date-range data return is limited to four-month
increments. Once the Report range is defined, all timeline events that
occurred during that period will populate in the report builder.

Narrowing the Scope of Post Incident Review Reports
---------------------------------------------------

You may filter by Message Types including System Actions and Chat
Messages, or by Routing Keys.

.. figure:: images/Create-A-Post-Incident-Review_Filters.png
   :alt: Post Incident Review screen, Filters highlighted showing
   Message Types and Routing Keys options.

   Post Incident Review screen, Filters highlighted showing Message
   Types and Routing Keys options.

You may hide any alert, action, or post by selecting the “**–**” button
on the left side of the report builder.

Additionally, you may add notes to any alert, action, or post by
selecting the note pad and pencil icon just to the right of the “**–**”
button. These notes will appear beneath the specific event card where
the notation is assigned to help form a high-level analysis of what
happened during an incident or event.

.. figure:: images/Create-A-Post-Incident-Review_Add-Hide.png
   :alt: VictorOps incident with - and edit buttons left and right side
   by side highlighted.

   VictorOps incident with - and edit buttons left and right side by
   side highlighted.

*Please Note:  The summary field and timeline notes support the markdown
library
described *\ `HERE <https://guides.github.com/features/mastering-markdown/>`__\ *.*

By selecting Alert Payload you may reveal the fields and values
associated with a particular incident card.

Annotations via the `Alert Rules
Engine <https://help.victorops.com/knowledge-base/transmogrifier-annotations/>`__
will also surface in the Post-Incident Report.

Once your Post-Incident Review Report is complete, click *Save* in the
top right corner. After the report is created it can be printed, turned
into a PDF, or opened again for further editing.
