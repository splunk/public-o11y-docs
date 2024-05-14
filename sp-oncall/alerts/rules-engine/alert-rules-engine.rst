:orphan:

.. _alert-rules-engine:

************************************************************************
Splunk On-Call Alert Rules Engine
************************************************************************

.. meta::
   :description: The Splunk On-Call Alert Rules Engine is a rules engine that allows you to set certain conditions, and trigger custom actions when those conditions are met.


.. toctree::
    :hidden:

    rules-engine-managing-rules
    rules-engine-annotations
    rules-engine-matching-conditions
    rules-engine-stop-flag
    rules-engine-transformations
    rules-engine-variable-expansion


Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Enterprise



What is the Splunk On-Call Alert Rules Engine?
==============================================

The Alert Rules Engine is a powerful tool that allows you to deliver helpful information and useful resources to your users at the same moment they are notified of the problem, as well as customize the
behavior of your incidents. It is a rules engine that allows you to set certain conditions, and trigger custom actions when those conditions are met.

Getting paged for a non-critical issue? You can use the Alert Rules engine to make sure that nobody gets paged for alerts that are not actionable.

Want to attach remediation documentation directly to notifications so your users can immediately start solving the problem without having to dig around? The Alert Rules Engine allows you to attach image links and other URLs directly to your notifications.

Here is an example of a typical incident, untouched by the alert rules engine:

.. image:: /_images/spoc/rules-1.png
    :width: 100%
    :alt: Full disk error.


Here is an example of an incident that has been annotated with useful information and resources using the Alert Rules Engine:

.. image:: /_images/spoc/rules-2.png
    :width: 100%
    :alt: Incident with annotations.

Notice the addition of a graphical representation of the problem, links to run-book documentation, triage notes, the post incident review for the last time this problem occurred, and a one-touch option to open a new ticket in Jira.

In other words, the alert rules engine is designed to give you the information and tools you need, when you really need them.

Add a rule
===================

#. To get started, navigate to :guilabel:`settings`, then :guilabel:`Alert rules engine`. This is where you will create all of your Alert Rules Engine rules. 
#. To create a new rule select :guilabel:`Add a Rule`. This brings you to the rule creation window. The top portion sets the matching condition (When should this rule be applied), while everything below defines the actions to be taken.

.. image:: /_images/spoc/rules-3.png
    :width: 100%
    :alt: Define actions to be taken.
