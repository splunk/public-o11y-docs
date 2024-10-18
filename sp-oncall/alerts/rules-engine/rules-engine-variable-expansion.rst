.. _rules-engine-variable:

************************************************************************
Rules engine variable expansion
************************************************************************

.. meta::
   :description: The Rules Engine can pull the content of an alert field into the rule, thus allowing users to dynamically update any annotation or transformation with data from the alert.


The Rules Engine can pull the content of an alert field into the rule, thus allowing users to dynamically update any annotation or
transformation with data from the alert. This can be done using the payload field with the ```{{field\_name}}``. Or it can be done by using a regular expression (RegEx) capture group with the syntax:``\ {{\\n}}`` where n is the number of the capture group.



Variable Expansion Via Payload Field
========================================

-  Pull the name of thea ffected host from the alert and add it into the URL link for your wiki documentation. The field in the alert
   containing this information is `host_name`

.. image:: /_images/spoc/annotate1.png
    :width: 100%
    :alt: VariableExpansion1

-  Turn an image link provided by the monitoring tool into an annotation.

.. image:: /_images/spoc/annotate2.png
    :width: 100%
    :alt: VariableExpansion2

 
-  Combine multiple fields into the ``state_message``so your users get more information in their notifications, without losing the original information in that field. This assumes the field you want to include is ``error_message``.

.. image:: /_images/spoc/annotate3.png
    :width: 100%
    :alt: TransformExample3


Variable expansion using RegEx capture group
=================================================


Regular expression capture groups are defined within parenthesis. You can use these capture groups for variable expansion the same way as payload fields. The only difference is the need to reference the value with the capture group number as seen below.

.. image:: /_images/spoc/annotate4.png
    :width: 100%
    :alt: Using RegEx capture group.

“([^\\n]+)” captures one or more characters that are not a new line character.
