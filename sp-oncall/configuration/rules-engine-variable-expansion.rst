.. _rules-engine-variable:

************************************************************************
Rules engine variable expansion
************************************************************************

.. meta::
   :description: About the user roll in Splunk On-Call.



The Rules Engine can pull the content of an alert field into the rule,
thus allowing users to dynamically update any annotation or
transformation with data from the alert. This can be done using the
payload field with the
syntax: **:math:`{{field\_name}}**. Or it can be done by using a regular expression (RegEx) capture group with the syntax: **`\ {{\\n}}**
where n is the number of the capture group.

.. raw:: html

   <script type="text/javascript" id="vidyard_embed_code_znfhWYmy79yKBm42hZ8oAi" src="//play.vidyard.com/znfhWYmy79yKBm42hZ8oAi.js?v=3.1.1&amp;type=inline&amp;width=640&amp;height=360"></script>

**Variable Expansion Via Payload Field**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Pull the name of the affected host from the alert and add it into the
   URL link for your wiki documentation. (The field in the alert
   containing this information is **host_name**)

.. figure:: images/000261.png
   :alt: VariableExpansion1

   VariableExpansion1

-  Turn an image link provided by the monitoring tool into an
   annotation.

.. figure:: images/000262.png
   :alt: VariableExpansion2

   VariableExpansion2

-  Combine multiple fields into the **state_message** so your users get
   more information in their notifications, without losing the original
   information in that field.  (Assuming the field you want to include
   is **error_message**)

.. figure:: images/000264.png
   :alt: TransformExample3

   TransformExample3

**Variable Expansion Via RegEx Capture Group**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Regular expression capture groups are defined within parenthesis. You
can use these capture groups for variable expansion the same way as
payload fields. The only difference is the need to reference the value
with the capture group number as seen below.

.. image:: images/rule_expansion_edit.png

“([^\\n]+)” captures one or more characters that are not a new line
character.
