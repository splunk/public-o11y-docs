.. _rules-engine-matching-conditions:

Matching conditions for the Rule Engine
***************************************************

.. meta::
    :description: Matching conditions determine when a rule is applied. You can choose any field that exists within the payload of an alert and match on a specific value for that field using a direct match, wildcard matching, or by using a regular expression.

Matching conditions determine when a rule is applied. You can choose any field that exists within the payload of an alert and match on a specific value for that field using a direct match, wildcard matching, or by using a regular expression.

By default, the Rules Engine only uses wildcard matching. If you want to turn on regular expressions, contact Splunk On-Call support.

Requirements
==================

This feature is available in the following versions of Splunk On-Call:

- Enterprise

Field names
==================

When viewing an incident in the timeline, field names are on the left and values are on the right:

.. image:: images/spoc/Alert-Rules-Engine-Matching-Conditions_Field-Values.png
   :alt: VictorOps fields with field of entity_display name as 'This is an incident' highlighted.

In the previous example, the field of interest is the ``entity_display_name`` field and the value that matters is the phrase ``This is an incident!``. The matching condition is the following:

.. image:: images/spoc/Alert-Rules-Engine-Matching-Conditions_When-Matches.png
   :alt: Alert Rules Engine, when entity_display_name matches *this is an incident* wildcard match set.

Wildcard matching
============================

Rules can match an alert field value using a simplified wildcard syntax to match some or all of the string. The asterisk character (``*``) matches 0 or more characters and you can use it anywhere in the match pattern.

Wildcard examples
----------------------

.. list-table::
   :header-rows: 1
   :widths: 20 40 40
   :width: 100%

   * - :strong:`Phrase`
     - :strong:`Matches`
     - :strong:`Does Not Match`

   * - ``*.mydomain.tld``
     - ``www.mydomain.tld`` |br| ``www.subdomain.mydomain.tld`` |br| ``db778.mydomain.tld``
     - ``mydomain.tld`` |br| ``x.mydomain.tld/with/a/long/path/suffix.html``

   * - ``db-*.*``
     - ``db-123.foobar.baz`` |br| ``db-abc123.bazfoo.bar``
     - ``db000.barfoo.baz`` |br| ``db-123``

   * - ``*db-mydomain*``
     - ``123 db-mydomain abc``|br| ``foo-db-mydomain-bar``
     - ``db123-mydomain`` |br| ``db.mydomain``

.. _rules-engine-regex:

Matching with regular expressions
======================================

Regular expressions are characters that define search patterns. To set a rule to use regular expressions, change the menu option to :menuselection:`RegEx Match`. If you don't see the option, contact support to turn on the advanced configuration.

.. note:: Regular expression rules are subject to timeout and automatic deactivation in the event the crafted expression poses a risk to the stability of your Splunk On-Call instance.

The following limitation apply:

-  Compatible with Java regular expressions.
-  Expressions are currently limited to 128 characters.
-  Add ``(?si)`` to the beginning of your regular expression to match multiline input in a non-case-sensitive way.
-  As the previous technique matches the entire input string, you might need to add ``.*`` at the beginning and at the end of your regular expression.

Regular expression examples
------------------------------

.. list-table::
   :header-rows: 1
   :widths: 20 40 40
   :width: 100%

   * - :strong:`Phrase`
     - :strong:`Matches`
     - :strong:`Does Not Match`

   * - ``^\d+(\.\d+)?``
     - ``2`` |br| ``2.4`` |br| ``50`` |br| ``5.125``
     - ``b2.4`` |br| ``version 2.4``

   * - ``^\d{3}-\d{3}-\d{4}$``
     - ``123-123-1234`` |br| ``111-222-3333``
     - ``number: 123-123-1234`` |br| ``123-123-1234 US``

   * - ``\w{2,}``
     - ``ab`` |br| ``abc`` |br| ``abcd`` |br| ``123abcd`` |br| ``abcd123``
     - ``1`` |br| ``a1`` |br| ``1a``

   * - ``c(at|ar)?``
     - ``cat`` |br| ``car`` |br| ``catalyst`` |br| ``carbon`` |br| ``a la carte``
     - ``chart`` |br| ``clark``

Boolean logic
===================================

You can use disjunction logic (``OR``) by replicating a rule with a different matching condition.

A set of sequential rules, when ordered correctly, can achieve basic ``AND`` logic in the Rules Engine. As with scope limiting rules, the first rule must create a new field which can be acted upon by a subsequent rule.

AND logic example
-------------------------------

In the following example, you want to capture ``disk space`` from the ``entity_id`` field, as well as the name ``stage-db-26`` from the ``host_name`` field to convert these alerts to ``INFO`` events only when both conditions are met.

The matching condition for the first rule catches the first desired phrase and use variable expansion to import the value of the second field into a newly declared field.

.. image:: images/spoc/Alert-Rules-Engine-Matching-Conditions_And-Logic.png
   :alt: VictorOps Alert Rules Engine, when entity_id matches *disk space* set new_matching_field to ${{host_name}}

The matching condition for the second rule, which you must position below the first rule, checks the newly declared field for the value ``stage-db-26`` and takes the appropriate action.

.. image:: images/spoc/Alert-Rules-Engine-Matching-Conditions_And-Logic-2.png
   :alt: VictorOps Alert Rules Engine, when new_matching_field matches *stage-db-26* set message_type to INFO
