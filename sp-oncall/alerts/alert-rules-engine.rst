.. _alert-rules-engine:

************************************************************************
The Splunk On-Call Alert Rules Engine
************************************************************************

.. meta::
   :description: About the user roll in Splunk On-Call.


What is the Splunk On-Call Alert Rules Engine?
==============================================

The Alert Rules Engine is
an `Enterprise <https://victorops.com/pricing>`__ service level feature.

The Alert Rules Engine is a powerful tool that allows you to deliver
helpful information and useful resources to your users at the same
moment they are notified of the problem, as well as customize the
behavior of your incidents.  It is, essentially, a rules engine that
allows you to set certain conditions, and trigger custom actions when
those conditions are met.

Getting paged for a non-critical issue?  You can use the Alert Rules
Engine to make sure that nobody gets paged for alerts that are not
actionable.

Want to attach remediation documentation directly to notifications so
your users can immediately start solving the problem without having to
dig around?  The Alert Rules Engine allows you to attach image links and
other URLs directly to your notifications.

Here is an example of a typical incident, untouched by the Alert Rules
Engine:

.. image:: images/1.jpg

Here is an example of an incident that has been annotated with useful
information and resources using the Alert Rules Engine:

.. image:: images/3.jpg

Notice the addition of a graphical representation of the problem, links
to run-book documentation, triage notes, the post incident review for
the last time this problem occurred, and a one-touch option to open a
new ticket in Jira.

In other words, the Alert Rules Engine is designed to give you the
information and tools you need, when you really need them.

**Getting Started**
===================

To get started, navigate to settings, then alert rules engine. This is
where you will create all of your Alert Rules Engine rules. To create a
new rule select “Add a Rule”.

 

.. image:: images/Screen_Shot_2020-11-10_at_3_09_54_PM.png

This brings you to the rule creation window below. The top portion sets
the matching condition (When should this rule be applied), while
everything below defines the actions to be taken.

.. image:: images/Rules-Engine-Capability.png
