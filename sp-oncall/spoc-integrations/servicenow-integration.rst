.. _snow-spoc:

ServiceNow bidirectional integration for Splunk On-Call
************************************************************************

.. meta::
   :description: Configure the ServiceNow bidirectional integration for Splunk On-Call

.. note::
   
   If you are upgrading from an old XML file to the new VictorOps Bidirectional Integration in the ServiceNow App store, you need to run the following script or reach out to the support team before installation: :new-page:`Script to deprecate initial VictorOps integration <https://github.com/victorops/monitoring_tool_releases/blob/master/Deprecate_Initial_VictorOps_Integration.xml>`

Use the latest Splunk On-Call to ServiceNow bidirectional integration to respond to an incident, collaborate in real time, and find faster resolutions.

The Splunk On-Call ServiceNow bidirectional integration maintains incident and ticket history but doesn't distract you during a firefight. Use the detailed incident history to conduct thorough post-incident reviews and ensure on-call incident management gets better over time. Eliminate context-switching by working in a single application, focusing on the iƒssue at hand and spending less time organizing tickets.

You can do the following with the integration:

-  Combine real-time incident response functionality with detailed ticket tracking to create a holistic system for on-call incident
   management
-  Focus on real-time response and collaboration to reduce mean time to acknowledge (MTTA) and mean time to repair (MTTR) by automatically updating ServiceNow
   tickets from Splunk On-Call
-  Centralize monitoring data, on-call schedules and alerting to improve visibility into infrastructure health and keep cross-functional teams informed during incident response
-  Conduct thorough post-incident reviews with complete records of incident history sent from Splunk On-Call to ServiceNow

Requirements
=====================

* ServiceNow versions supported: Madrid, New York, Orlando, Paris, Quebec, Rome, San Diego, Tokyo, Utah
*  ServiceNow account: Requires ServiceNow Administrative Privileges to create the application registry and an Active, Web Service Access only user with the ITIL role.
* Splunk On-Call version required: Enterprise level of service

Activate Splunk On-Call In ServiceNow
=======================================

#. Download the VictorOps application within the ServiceNow Store. See :new-page:`https://store.servicenow.com/sn_appstore_store.do#!/store/application/ad2abfc8db3ff7003e4af209af9619df`. You need HI credentials to run the GET from the ServiceNow Store.
#. The following prompt shows within Settings, select :guilabel:`Get Started`.

.. image:: /_images/spoc/VOSN_connect.png

#. The following dialog box displays with the information that you need to input within Splunk On-Call. The :guilabel:`Finish` button is only active after you have entered your credentials in Splunk On-Call.

.. image:: /_images/spoc/VOSN_connect2.png

Activate ServiceNow in Splunk On-Call
=======================================

#. Go to :guilabel:`Integrations` then :guilabel:`ServiceNow`.
#. Select :guilabel:`Enable Integration`.

   .. image:: /_images/spoc/Screen-Shot-2022-04-07-at-2.47.39-PM.png

#. Enter the credentials from your ServiceNow instance.

   .. image:: /_images/spoc/Screen-Shot-2021-02-18-at-10.39.31-AM.png

#. Select :guilabel:`Connect to ServiceNow`. After the connection has been made, return to ServiceNow and select :guilabel:`Finish` to finalize authentication.

Map incident states
----------------------

ServiceNow and Splunk On-Call use incident state mapping to stay in sync. Set up incident state mapping in Splunk On-Call. 

To edit Splunk On-Call incident states, select :guilabel:`Edit Integration` button. 

.. image:: /_images/spoc/Screen-Shot-2022-04-07-at-2.38.30-PM.png

Map ServiceNow assignment groups
----------------------------------

Upon validating credentials, map Splunk On-Call Escalation Policies to ServiceNow Assignment Groups. This mapping allows you to update the Assignment Group in ServiceNow when sending an incident from Splunk On-Call or determine where an incident goes when sent from ServiceNow.

When the mapping is set, the ServiceNow Assignment Group field is updated based on the Escalation Policy being paged. This field also updates when an incident is rerouted to another Escalation Policy. If the incident reroutes to a specific user, the assignment group is cleared. Updating an assignment group in ServiceNow doesn't affect paging behavior in Splunk On-Call.

.. image:: /_images/spoc/Screen-Shot-2022-04-07-at-1.07.56-PM.png

#. Select :guilabel:`Add Mapping` to see available choices.
#. For the ServiceNow Assignment Group, start typing in the filter box to see the different available options.

.. image:: /_images/spoc/Screen-Shot-2022-04-07-at-3.01.58-PM.png

Map users
-------------

UWhen you save the integration page  all available users are mapped across the systems based on an email match. Users are also mapped when you take action on
an incident.

Update ServiceNow Assigned To field from Splunk On-Call
-----------------------------------------------------------

The Assigned To field in ServiceNow is populated with the first user to acknowledge an incident. If the Splunk On-Call incident goes back to a triggered state, the next person to acknowledge populates the field.

.. image:: /_images/spoc/VOSNAssignedTo.png

Link incidents
--------------------

You can open and view the ServiceNow ticket by selecting the ServiceNow Incident Number in the side panel of the Splunk On-Call incident view.

.. image:: /_images/spoc/Screen-Shot-2022-04-07-at-2.44.14-PM.png

When Splunk On-Call sends an incident to ServiceNow
-------------------------------------------------------

To complete the integration you need to create an alert rule.

#. Go to :guilabel:`Settings` then :guilabel:`Alert` then :guilabel:`Rules Engine`.
#. Add a rule which defines a matching condition to send Splunk On-Call incidents to ServiceNow. See :ref:`rules-engine-matching-conditions`. For example, to send all critical incidents to ServiceNow, use: When ``message_type`` matches ``CRITICAL`` using ``Wildcard`` Set ``ServiceNow_Integration`` to new value ``true``. This example also includes resolution field information to enable auto-resolution of incidents to ServiceNow.

.. image:: /_images/spoc/SNOWrule1.png

.. _map-spoc-snow:

Map fields from Splunk On-Call to ServiceNow
--------------------------------------------------

Preconfigured fields that are immediately available are: 
* close_code
* close_notes
* work_notes
* short_description
* description
* state
* assignment_group
* assigned_to
* resolved_by

You can set all the preconfigured fields using the rules engine using the followig syntax: ``ServiceNowField_victorops\_<field_name>``. 

The following fields are automatically handled by the integration mapping:

* assignment_group 
* state, work_notes
* short_description
* description
* assigned_to
* resolved_by

Mandatory custom fields
^^^^^^^^^^^^^^^^^^^^^^^^^^

To dynamically assign the value based on an alert field in Splunk On-Call, use the following syntax" ``${{victorops_field_name}}``. See :ref:`rules-engine-variable` for more tips on dynamic assignment.

Only some fields are preconfigured with the VictorOps app, so mapping additional fields in ServiceNow requires additional configuration.

#. In ServiceNow, use the filter navigator to search for "x_splu2_victorops_incident_import.list".
#. In the table with some empty fields, select :guilabel:`New`. All active fields display.
#. Select :guilabel:`Menu` then look :guilabel:`Configure` then :guilabel:`Form Layout`.
#. Create a new import table field for the field name to use in the rules engine. For example, "VictorOps caller id" requires the following syntax: ``ServiceNowField_u_victorops_caller_id`` for the rule.
   #. Under :guilabel:`Create New Field`, add the name of the field you want to map. Keep the same format that you see in the :guilabel:`Selected`` column: VictorOps <name of field>.
   #. Change the Field Length to :guilabel:`Medium`.
   #. Select guilabel:`Add`. The field is added to the Selected column. 
   #. Select :guilabel:`Save`. 
#. Go back to the filter navigator to search for "Transform Maps", under :guilabel:`System Import Sets`. 
#. Then look for "VictorOps Incident", you can use the search box inside the Table Transform Maps page.
#. Open the :guilabel:`VictorOps Incident`` table transform map, then scroll to :guilabel:`Field Maps`.
#. Select :guilabel:`Mapping assist` on the :guilabel:`Field Maps`` tab.
#. On the Mapping Assist page, you are 3 boxes. The first box is your :guilabel:`Source Fields`. The next box is the mapping for the fields. The final box is the :guilabel:`Target Fields`. 
   #. First, search the :guilabel:`Source Field`` for the name of the field you created. Select it and then select the Add arrow.
   #. Next, do the same thing for the :guilabel:`Target Field`. Find and assign the Target Field you want to match with and add it to the Field Map box.
   #. Last, make sure the 2 fields are mapped,in the :guilabel:`Field Map` field. 
   #. Select :guilabel:`Save`.

Now you can use the Splunk On-Call alert rules engine to supply the field values with the same syntax as before: set ``ServiceNowField_<field_name>`` to new value ``<value>``.

In the following example image, the field value on the Splunk On-Call import table in ServiceNow is ``victorops_custom_field``.

.. image:: /_images/spoc/snowRuleEx10-2.png

.. note:: 
   If the field name in ServiceNow contains capital letters, replace them with lower case letters when creating the alert rule in Splunk On-Call. For example, A custom ServiceNow Field ``Test Field`` becomes ``ServiceNowField_test_field`` in the Alert Rule.

Set logic to send incidents and fields to Splunk On-Call
--------------------------------------------------------------

ServiceNow automaticallys sends the following fields to Splunk On-Call:

* assigned_to
* assignment_group
* caller_id
* category
* description
* number
* priority
* short_description
* state
* subcategory
* sys_id

To include more fields, add custom fields separated by a comma and they will be available in the alert payload within Splunk On-Call.

Use Incident Rules to create custom logic that allows you to set logic as to when incidents are sent from ServiceNow to Splunk On-Call
automatically.

.. image:: /_images/spoc/VOSN_conditions.png

Manually send incidents from ServiceNow to Splunk On-Call
-------------------------------------------------------------

If the incident rules have not been met, you can still send the incident with required information including assignment group, by selecting the button :guilabel:`Send to VictorOps` to manually send an incident to Splunk On-Call.

.. image:: /_images/spoc/VOSN_manual.png

Splunk On-Call and ServiceNow CMDB
=========================================

The VictorOps app can interact with the ServiceNow CMDB by setting any cmdb item field which exists on the incidents table. You can interact with these fields by leveraging the Splunk On-Call alert rules engine and the ServiceNow transform map. See :ref:`map-spoc-snow`

Troubleshooting
=========================

Permissions error message
------------------------------

If you receive a message that reads: "ServiceNow is connected, but you do not have the proper permissions for the integration to work." The app configures the service user with the roles we expect are needed for out of box configurations of ServiceNow. It is very common for additional roles to be required that are unique to your instance of ServiceNow. You need to identify the subset of roles that are required by your instance and add them to the service user account. One easy way to identify if this is the case, is to temporarily add the admin role since it inherits all other roles. Then test the
integration. If everything works as expected, there is some role or subset of roles that need to be identified and added.

API time out message
-----------------------

If you get a message in my Splunk On-Call incidents and timeline that "ServiceNow API call timed out." Splunk On-Call waits 10 seconds for a response from ServiceNow before dropping the attempted request. Many times, ServiceNow queues the API call, but the link between VictorOps incident and ServiceNow incident is not established because Splunk On-Call did not receive the response in time. To speed up the requests, apply an index in ServiceNow on the field ``x_splu2_victorops_victorops_incident`` on the incidents table.
