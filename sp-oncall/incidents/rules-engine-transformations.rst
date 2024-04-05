.. _rules-engine-transf:

************************************************************************
Alert Rules Engine: Transformations
************************************************************************

.. meta::
   :description: About the user roll in Splunk On-Call.


Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Enterprise

All users have the ability to reach out to Splunk On-Call support at any time with questions.

Live Chat: If you are logged into your Splunk On-Call instance, you will have the ability to Live Chat with the Splunk On-Call Support team.



An alert rule transformation is a way to change alert data before it arrives at your VictorOps timeline. Typing the name of an existing field into the rules engine's :guilabel:`alert field` box, allows you to overwrite that field with a new value of your choosing.

Transformation actions can also add entirely new fields to an alert. This can be accomplished by typing the desired name of the field
into the :guilabel:`alert field` section and assigning a value.



Transformation uses
===================


Changing the routing key
------------------------

You can change the routing key of a particular set of alerts. If you set up an integration to send all alerts to your *Database* team, but you want a particular subset of incidents related to a specific host (*db03*) to go to the :guilabel:`Development` team (routing_key = devs), try the following:

   **When** entity_id **matches** *db03\* **using** Wildcard Match

   **Set** routing_key **to** devs


Adding a new alert field
------------------------

In order to add a new field to an alert, you must first create a matching condition. For example, if every time a certain monitoring tool sends an alert you'd like to add a new field, you would would create a matching condition that states:

   **When** monitoring_tool **matches** your_tool **using** Wildcard Match

Add a new unique field to an alert by setting a **new_field_name** (or a name of your choosing), this will automatically create a new field. The value of the new field can be set anything you want. It would look similar to:

   **Set** new_field_name **to** value of new field

If you'd like the value of the new field to dynamically pull the contents of an existing field, use this syntax:

**${{current_field_name}}**.


Muting noisy alerts
-------------------

Some alerts can be distracting and cause unnecessary paging in your account. By transforming the :guilabel:`message_type` field to INFO these noisy alerts can be muted. You can create the matching condition for whatever field the noisy alerts have in common. For example, if the every time the state_message included the word `spam` you wanted the message_type to be INFO you would create the following rule:

   **When** state_message **matches** *spam* **using** Wildcard match

   **Set** message_type **to** INFO



Timestamp-based muting
---------------------------

To leverage timestamps to mute or adjust alerts use the Regex method and a chained rule. We recommend scoping the rule with a chain to only affect alerts for a specific routing_key or monitoring_tool.

The following example will transform alerts to the teamA routing_key to INFO type on Thursday, Saturday, and Sunday UTC.

   Rule 1:

   **When** routing_key **matches** teamA **using** Wildcard

   **Set** teamA **to a new value** ${{Alert_received_week_time_utc}}

   Rule 2:

   **When** teamA **matches** \\d\*-W\\d\*-[467].* **using** RegEx

   **Set** message_type **to new value** INFO

Our alert_received_week_time_utc field is a ISO8601 week date formatted timestamp. For example, 2020-W10-3TT17:38:32Z is the form
YEAR-WEEK-DAY-TIME and the days are expressed 1-7 for Monday-Sunday. You may want to augment the example regular expression to account for timezone differences from UTC.

Below is an example of a rule that will only capture alerts that come in between 8 am and 12 pm UTC no matter the year, week, day of the week, or minutes of the hour. In the below case, we're only wanting to capture alerts between 8 am and 12 pm UTC, for that reason, we've broken down the rule as follows:

   **When** Alert_received_time_utc **matches** .*T(0[8-9]|1[0-1]):.\*

   **Set** message_type **to** INFO


Change the appearance of incidents and notifications
---------------------------------------------------------

By using variable expansion  and transformations, you can alter alert fields. An example is changing the display name on an alert card. The display name field is called the :guilabel:`entity_display_name`. If you'd like to change this field to display another field, you would configure a rule like the following:

   **When** entity_display_name **matches** * **using** Wildcard

   **Set** entity_display_name **to** ${{field_you_choose}}


Combining multiple different alerts into one single incident
--------------------------------------------------------------------

To aggregate multiple alerts into one single incident, first find a value to match which associates multiple different incidents. Then,
transform the entity_id field to a set value. By pre-determining the entity_id, VictorOps will automatically aggregate the alerts.

   **When** entity_id **matches** disk* **using** Wildcard Match

   **Set** entity_id **to** Disk Problems

This rule will take any alert that has an entity_id that starts with disk and transform the entity_id to Disk Problems.



Transform or create fields with RegEx
---------------------------------------------

When dealing with text, there may be information you want to extract via RegEx capture groups. By using RegEx capture groups (contained in parenthesis  **( )** ), you can add new alert fields or transform existing ones. This is similar to using wildcard matching.

In this example, we use RegEx to look for “error” or “ERROR” in the subject field, then set the message_type to INFO as above to mute the noisy alert.

   **When** subject **matches** ^((?!error|ERROR).)*$ **using** RegEx

   **Set** message_type **to** INFO

For additional information on how to annotate alerts, see :ref:`rules-engine-annot`.


For help with AND/OR logic, see :ref:`rules-engine-matching-conditions`.`
