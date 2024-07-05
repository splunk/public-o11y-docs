.. _rules-engine-stop-flag:

************************************************************************
Rules engine stop flag
************************************************************************

.. meta::
   :description: About the user roll in Splunk On-Call.




At the bottom of any rule setup window, there is an option to stop processing after the rule has been applied.

.. image:: /_images/spoc/stop-flag.png
    :width: 100%
    :alt: Option to stop processing after this rule has been applied.

   

Every alert sent to Splunk On-Call, runs through the list of rules from top to bottom before reaching the timeline. This check box allows you to stop an alert from continuing to process through subsequent rules. This has performance advantages (speeds up processing of the alert) and allows you to prevent subsequent rules from overwriting the current rule after it has acted upon the alert.
