[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported: Enterprise**

**VictorOps Version Required: N/A SaaS**

[/ht_toggle]

The matching condition will determine when this rule should be applied.
You can choose any field that exists within the payload of an alert and
match on a specific value for that field using a direct match, wildcard
matching, or by using a regular expression.

By default the Rules Engine is only enabled for wildcard matching. If
you would like to enable the advanced configuration for use with RegEx
please contact `Splunk On-Call
Support <https://help.victorops.com/knowledge-base/important-splunk-on-call-support-changes-coming-nov-11th/>`__.

When viewing an incident in the timeline, field names are on the left
and values are on the right:

.. figure:: images/Alert-Rules-Engine-Matching-Conditions_Field-Values.png
   :alt: VictorOps fields with field of entity_display name as “This is
   an incident” highlighted.

   VictorOps fields with field of entity_display name as “This is an
   incident” highlighted.

In the above example, the field of interest is the entity_display_name
field and the value that matters is the phrase “This is an incident!”.
The matching condition, therefore, is the following (wildcard matching
used in this example, hence the “**\***” asterisks).

.. figure:: images/Alert-Rules-Engine-Matching-Conditions_When-Matches.png
   :alt: VictorOps Alert Rules Engine, when entity_display_name matches
   *this is an incident* wildcard match set.

   VictorOps Alert Rules Engine, when entity_display_name matches *this
   is an incident* wildcard match set.

--------------

**Wildcard Matching**
---------------------

Rules can match on an alert field value using a simplified wildcard
syntax to match some or all of the string. The asterisk “**\***”
character matches 0 or more characters and can be used anywhere in the
match pattern.

**Wildcard Examples:**
----------------------

[table id=wildcard /]

--------------

**Matching with Regular Expressions (RegEx)**
---------------------------------------------

Regular expressions are characters that define search patterns. To set a
rule to use regex, simply change the drop down option to “RegEx Match”.
If you do not see the option, please reach out to support to enable the
advanced configuration. Due to the diverse nature of RegEx, the rules
are subject to timeout and automatic disabling in the event the crafted
expression poses a risk to the stability of your VictorOps instance.

Some limitations to keep in mind:

-  Expressions are currently limited to 128 characters
-  There is a strong chance you will want to add **(?si)** to the
   beginning of your regex to match multiline input in a
   non-case-sensitive way.
-  This will have to match the entire input string, so you may need to
   put **.\*** on the beginning and end of your regex.
-  Compatible with Java regular expressions
-  We recommend using a RegEx validator like `RegEx
   Planet <https://www.regexplanet.com/advanced/java/index.html>`__ to
   ensure proper syntax

**Regular Expression Example**
------------------------------

[table id=regex_match /]

--------------

**AND / OR Logic**
------------------

OR logic can be achieved by simply replicating a rule with a different
matching condition.

Using a set of sequential rules, when ordered correctly, can achieve
basic AND logic in the Rules Engine.  As with scope limiting rules, the
first rule must create a new field which can be acted upon by a
subsequent rule.

**AND Logic Example**
^^^^^^^^^^^^^^^^^^^^^

Let’s say you want to catch the phrase “disk space” from the
*entity_id*  field **AND** the name “stage-db-26” from the *host_name* 
field to convert these alerts to INFO events only when **both** these
conditions are met.

The matching condition for the first rule will catch the first desired
phrase and use variable expansion to import the value of the second
field into a newly declared field.

.. figure:: images/Alert-Rules-Engine-Matching-Conditions_And-Logic.png
   :alt: VictorOps Alert Rules Engine, when entity_id matches *disk
   space* set new_matching_field to ${{host_name}}

   VictorOps Alert Rules Engine, when entity_id matches *disk space* set
   new_matching_field to ${{host_name}}

The matching condition for the second rule (MUST BE POSITIONED BELOW THE
FIRST RULE!) checks the newly declared field for the value “stage-db-26”
and takes the appropriate action.

.. figure:: images/Alert-Rules-Engine-Matching-Conditions_And-Logic-2.png
   :alt: VictorOps Alert Rules Engine, when new_matching_field matches
   *stage-db-26* set message_type to INFO

   VictorOps Alert Rules Engine, when new_matching_field matches
   *stage-db-26* set message_type to INFO
