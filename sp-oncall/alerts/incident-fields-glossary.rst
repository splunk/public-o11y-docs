
.. _incident-fields-glossary:


*******************************************
Incident fields Glossary
********************************************
.. meta::
   :description: Details about the fields in an incident.

`Click here to skip to the Glossary of Fields <#glossary-of-fields>`__

Incidents in your Splunk On-Call timeline function like a simple table with two columns: the field name, and the value of that field. Field
names can be defined in two ways: 
- Automatically by Splunk On-Call, 
- By the integrated monitoring tool, or 
- Created by a Rules Engine rule. 

This makes an exhaustive list of all potential fields nearly impossible. However, certain fields are always present. These fields are defined and explained below, how their values affect the behavior of an incident, and how the Rules engine can be used to manipulate those fields.


Anatomy of an Incident
===========================

When viewing an incident in the timeline, it appears as an abbreviated version, displaying only a few fields that summarize the event:
* The incident origin (monitoring tool)
* message_type critical*)
* entity_display_name (Tune Squad Deployed)
* incident number (#10) 
* state_message (Someone hit the red button)
* timestamp. 
  
It is not possible to configure which fields are displayed here, however, you can use the Rules engine to transform these fields. 

.. image:: /_images/spoc/incident-anatomy.png
    :width: 50%
    :alt: A 404 error message stating "Could not find crede


By selecting the incident number, you can view the alert details. The alert details include all the payload fields.


Important fields
--------------------------------

Message-type and entity_id are two important fields.

``message_type``
^^^^^^^^^^^^^^^^^

The ``message_type`` field is the one required field in Splunk On-Call. All other fields would be filled in automatically. ``message_type`` determines the behavior of the alert when it arrives.

Possible values:

- CRITICAL: Opens a new incident, which will set off an escalation policy and result in users being paged.
- WARNING: May open a new incident depending on configuration in :guilabel:`Settings`, :guilabel:`Alert Configuration`, then :guilabel:`Create incidents for entities in [xxxxxxx] state`. Otherwise, it will post information to the timeline without creating an incident or triggering any escalation policies.
- INFO: Displays an entry in the timeline, without opening an incident. An INFO value cannot trigger escalation or paging.
- ACKNOWLEDGEMENT: Moves the incident from a triggered to acknowledged state and stops the escalation and paging.
- RECOVERY or OK: Resolves the incident and also stops escalation and paging if still active.

.. note:: If an alert is received with a different value in the ``message_type`` field than these recognized ones, it will be accepted as
an INFO severity alert.

``entity_id``
^^^^^^^^^^^^^^^^^^^^^

This field serves as the central identity of an incident. It is used to recognize related events and must remainconsistent throughout the life-cycle of the incident. This field is how the Splunk On-Call platform knows that a particular recovery message applies to a particular open incident. 

When an incident is unresolved, in a triggered or acknowledged state, and another critical message arrives with the same ``entity_id`` the new message will be rolled up into the existing incident without creating a new incident. This works great for preventing duplicate notifications for the same problem, but users must also be careful not to leave an incident unresolved for too long or they risk missing a separate occurrence of the same problem. If not provided, this field will be auto-filled with a random String value.

User  or Monitor Defined Fields
----------------------------------

``routing_key``
^^^^^^^^^^^^^^^^^^^^
This field controls the routing of incidents to specific teams. Routing keys can be created and assigned to a team, or
teams, from the :guilabel:`Settings`, then :guilabel:`Routing Keys` page.An incident can only have one single ``routing_key`` associated with it.

``entity_display_name``
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Often times, the ``entity_id`` of an incident can be long and full of jargon. Setting the ``entity_display_name`` will change how the incident appears in the timeline because it is the serves as the title of the incident. This field is also read aloud during phone call notifications, which gives users an opportunity to simplify and customize the message without affecting the life-cycle of the incident.

``state_message``
^^^^^^^^^^^^^^^^^^^^^^^
The ``state_message`` field is meant to contain a moreverbose description of the problem. It can also contain URL links. When using an email endpoint integration, the body of the email will become the state_message field.

``hostname`` 

If there is a ``hostname`` field with a value in the payload, we will display it after the ``entity_display_name`` in the incident card.


.. image:: /_images/spoc/incident-hostname.png
    :width: 100%
    :alt: The hostname, if provided, displays on the incident card.

``custom_fields``
^^^^^^^^^^^^^^^^^^^^^^^^
Users can add as many custom fields with custom names to an incident as they wish. This can be done by manually adding
the fields to the HTTP POST request, or by using the Rules engine to create a new field.

Glossary of Fields
=======================

The standard character limit for most payload fields is 1024. Notable exceptions are state_message (20480) and entity_id (512).

.. list-table::
  :widths: 25,25,25,25

  * - :strong:`Field name`
    - :strong:`Possible values`
    - :strong:`Purpose``
    - :strong:`Common rules engine use`

  * - :strong:`ack_author`
    - Username	
    - Displays the user who has acknowledged this incident. Remains blank if incident is unacknowledged.	
    - Not for use with Rules Engine.

  * - :strong:`ack_message`
    - Acknowledgement method	
    - Displays the method used to acknowledge or is left blank.	
    - Not for use with Rules Engine

  * - :strong:`agent`
    - Any	
    - Field for specific legacy integrations.	
    - Not for use with Rules Engine.

  * - :strong:`alert_type`
    - Any
    - Field for specific legacy integrations.	
    - Not for use with Rules Engine.

  * - :strong:`api_key`
    - Long String value	
    - Displays the REST Endpoint key your organization uses to reach Splunk On-Call. Each org only has 1.	
    - Should not be altered with the Rules Engine, but can be used for a rule that matches all integrations using the REST endpoint.

  * - :strong:`entity_display_name``
    - Any	
    - More succinct, intuitive name for incident that does not affect the entity_id. Defaults to entity_id if not explicitly defined. 
       - This field is read aloud during phone call notifications. 
       - This field is displayed in email, SMS, and push notifications (Push and SMS truncated for length)	
    - Can be changed to make the name of the incident more succinct and intuitive without affecting the behavior of the incident.

  * - :strong:`entity_id`
    - Any
    - Central identifier for incident.	
    - Can be altered to combine or separate incidents.

  * - :strong:`entity_is_host`
    - Boolean	
    - Indicates whether the entity reporting the issue is also the host.
    - Not for use with Rules Engine.

  * - :strong:`entity_state`
    - Same as ``message_type``	
    - Current state of monitored entity (May be different from message_type with certain integrations)	
    - Not for use with Rules Engine.

  * - :strong:`eventType`
    - Any	
    - Field for specific legacy integrations.	
    - Not for use with Rules Engine.

  * - :strong:`host_name`
    - Any
    - Displays the affected host.
    - Match on this field to control incidents related to a specific host. Change the ``routing_key`` to the team responsible for this host or quiet alerts matching this host by transforming the message_type field to "INFO".
 
  * - :strong:`message_type`
    - CRITICAL	
    - Opens a new incident	
    - Change field to this value to always open an incident. This useful with legacy email integrations.

  * - :strong:`message_type`
    - WARNING	
    - May open a new incident depending on configuration (Settings>>Integrations)	Behavior controlled by options chosen in :guilabel:`Settings`, then :guilabel:`Integration` and :guilabel:`Create incidents for entities in [ ] state`.
  
  * - :strong:`message_type`
    - ACKNOWLEDGEMENT	
    - Moves incident from Triggered to Acknowledged and stops escalation and paging.	
    - Change field to this value prevent paging, send incident straight to acknowledged state.

  * - :strong:`message_type`
    - INFO	
    - Posts info to timeline without creating a new incident.	
    - Change field to this value to quiet a noisy alert tp prevent it from opening a new incident and paging.
  
  * - :strong:`message_type`
    - RECOVERY or OK	
    - Resolves incident and stops escalation and paging.	
    - Change field to this value to resolve an incident. This is useful with legacy email integrations.


  * - :strong:`monitor_name`
    - Any	
    - Name of specific monitor, if there are multiple, or message sender (email).	
    - Match on this field to control alerts from a specific monitor.

  * - :strong:`monitoring_tool`
    - Any	
    - Displays the monitoring tool that triggered the incident.
    - Match on this field to control all alerts from a specific monitoring tool.
  

  * - :strong:`NOTIFICATIONTYPE`
    - String	
    - Legacy field created for Nagios integrations	.
    - Not for use with Rules Engine.
  
  * - :strong:`routing_key`
    - Any (defined by user)
    - Used to direct incidents to a specific team.	
    - Use a transformation to alter the routing key and send the incident to a different team.
  
  * - :strong:`sender`
    - Any	
    - Field for specific legacy integrations.
    - Not for use with Rules Engine.
  

  * - :strong:`SERVICESTATE`
    - Any
    - Field for specific legacy integrations.	
    - Not for use with Rules Engine.
  
  * - :strong:`state_message`
    - Any	
    - Large field used for passing verbose information about the incident.
       - This field is consistently displayed in email notifications (full) and sometimes SMS, Push, or Phone call notifications (following the ``entity_display_name`` as space and character limits allow).	
       - Pull values from other fields to add more useful information to the message users receive when they are notified of a new incident.
  

  * - :strong:`state_start_time`
    - Date or Time	
    - Indicates the date and time that the problem began on the monitored host or service. 
    - Not for use with Rules Engine.

  * - :strong:`subject`
    - Any
    - Field for specific legacy integrations.	
    - Match on this field to adjust the severity of incidents
  

  * - :strong:`timestamp`
    - Date or Time	
    - When monitoring tool detected an anomoly on monitored host or service (sent by monitoring tool, or defaults to ``VO_ALERT_RCV_TIME`` if not defined).	
    - Not for use with Rules Engine
      - Actual data is in Unix time format and cannot be used for time-based rules.
  

  * - :strong:`VO_ALERT_RCV_TIME`
    - Date and time	
    - When message was received by Splunk On-Call endpoint.	
    - Not for use with Rules Engine.


  * - :strong:`VO_ALERT_TYPE`
    - String
    - Index of alert types for internal use only.	
    - Not for use with Rules Engine.
  

  * - :strong:`VO_MONITOR_TYPE`
    - Integer	
    - Index of monitor types for internal use only.	
    - Not for use with Rules Engine.
  
  * - :strong:`VO_ORGANIZATION_ID`
    - org slug	
    - Slugified version of your organization's name used internally to identify your account.	
    - Not for use with Rules Engine.
  

  * - :strong:`VO_UUID`
    - Random String	
    - Used internally by Splunk On-Call for logging.	
    - Not for use with Rules Engine.
  
