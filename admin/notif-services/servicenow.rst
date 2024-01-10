.. _servicenow:


**************************************************************************
Send alert notifications to ServiceNow using Splunk Observability Cloud
**************************************************************************

.. meta::
      :description: Configure Observability Cloud to send alerts to ServiceNow when a detector alert condition is met and when the condition clears.

You can configure Splunk Observability Cloud to automatically send alert notifications to ServiceNow when a detector alert condition is met and when the alert clears.

To send Observability Cloud alert notifications to ServiceNow, complete the following configuration tasks:

* :ref:`servicenow1`

  You must be a ServiceNow administrator to complete this task.

* :ref:`servicenow2`

   You must be an Observability Cloud administrator to complete this task.

* :ref:`servicenow3`


.. _servicenow1:

Step 1: Create a ServiceNow user for your Observability Cloud integration
=================================================================================

In this step, you create a ServiceNow user that you can use to receive alert notifications from Observability Cloud. You must be a ServiceNow administrator to complete this task.

If you have an existing ServiceNow user that you want to use to receive alert notifications, the user has the :strong:`web_service_admin` and :strong:`itil` roles assigned, and you know the user ID and password, you can skip to :ref:`servicenow2`.

To set up a ServiceNow user for your Observability Cloud integration:

#. Log in to ServiceNow.

#. In the left navigation panel, scroll to :strong:`User Administration` and select :strong:`Users`.

#. Select :strong:`New`.

#. Enter :strong:`User ID`, :strong:`First name`, and :strong:`Last name` values that clearly communicate that the user is associated with Splunk Observability Cloud notifications. Make note of the :strong:`User ID` value for use in subsequent steps.

#. Enter a :strong:`Password` value. Make note of this value for use in :ref:`servicenow2`.

#. Select the :strong:`Active` check box.

#. Select :strong:`Submit`.

#. Find your new user by either searching for the user ID or doing a reverse chronological sort on the :strong:`Created` column. Select the user ID to open the user information window. Scroll down and select the :strong:`Roles` tab. Select :strong:`Edit`.

#. In the :strong:`Collection` search field, enter :strong:`web_service_admin`. Select the :strong:`web_service_admin` role and select :strong:`>` to move it the :strong:`Roles List` panel.

#. Similarly, in the :strong:`Collection` search field, search for :strong:`itil`. Select the :strong:`itil` role and select :strong:`>` to move it the :strong:`Roles List` panel.

#. Select :strong:`Save`. :strong:`web_service_admin` and :strong:`itil` display on the :strong:`Roles` tab for the user, possibly along with other additional roles.


.. _servicenow2:

Step 2: Create a ServiceNow integration in Observability Cloud
=================================================================================

You must be an Observability Cloud administrator to complete this task.

To create a ServiceNow integration in Observability Cloud:

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`ServiceNow guided setup <https://login.signalfx.com/#/integrations/integrations/servicenow>`. Optionally, you can navigate to the guided setup on your own:

   #. In the left navigation menu, select :menuselection:`Data Management`.

   #. Select :guilabel:`Add Integration`.

   #. In the integration filter menu, select :guilabel:`All`.

   #. In the :guilabel:`Search` field, search for :guilabel:`ServiceNow`, and select it.

   #. Select :strong:`New Integration` to display the configuration options.

#. By default, the name of the integration is :strong:`ServiceNow`. Give your integration a unique and descriptive name. For information about the downstream use of this name, see :new-page-ref:`About naming your integrations <naming-note>`.
#. In the :strong:`Username` field, enter the user ID from ServiceNow in :ref:`servicenow1`.
#. In the :strong:`Password` field, enter the password from ServiceNow in :ref:`servicenow1`.
#. In the :strong:`Instance Name` field, enter your ServiceName instance name. For example, the instance name must use the format ``example.service-now.com``. Do not include a leading ``https://`` or a trailing ``/``. Additionally, you cannot use local ServiceNow instances.

   To troubleshoot potential blind server-side request forgeries (SSRF), Observability Cloud has included ``\*.service-now.com`` on an allow list. As a result, if you enter a domain name that is rejected by Observability Cloud, contact :ref:`support` to update the allow list of domain names.

#. Select :strong:`Incident`, :strong:`Problem`, or :strong:`Event` to indicate the issue type you want the integration to create in ServiceNow. If necessary, you can create a second integration using the other issue type. This lets you create an incident issue for one detector rule and a problem issue for another detector rule.

#. :strong:`Save`.

#. If Observability Cloud can validate the ServiceNow username, password, and instance name combination, a :strong:`Validated!` success message displays. If an error displays instead, make sure that the values you entered match the values in ServiceNow.


.. _servicenow3:

Step 3: Add a ServiceNow integration as a detector alert recipient in Observability Cloud
=================================================================================================

..
  once the detector docs are migrated - this step may be covered in those docs and can be removed from these docs. below link to :ref:`detectors` and :ref:`receiving-notifications` instead once docs are migrated

To add a ServiceNow integration as a detector alert recipient in Observability Cloud:

#. Create or edit a detector that you want to configure to send alert notifications using your ServiceNow integration.

    For more information about working with detectors, see :ref:`create-detectors` and :ref:`subscribe`.

#. In the :strong:`Alert recipients` step, select :strong:`Add Recipient`.

#. Select :strong:`ServiceNow` and then select the name of the ServiceNow integration you want to use to send alert notifications. This is the integration name you created in :ref:`servicenow2`.

#. Activate and save the detector.

Observability Cloud sends an alert notification to create an incident in ServiceNow when the detector triggers an alert. When the alert clears, it sends a notification that sets the incident state to :strong:`Resolved`.

For :strong:`Incident` and :strong:`Problem` issues, the ServiceNow integration sets the :strong:`Impact` and :strong:`Urgency` fields on the ServiceNow issue based on the Observability Cloud alert severity (see :ref:`severity`).

The following table shows the Observability Cloud severity for :strong:`Incident` and :strong:`Problem` issues:

.. list-table::
   :header-rows: 1

   * - :strong:`Observability Cloud severity`
     - :strong:`ServiceNow Impact and Urgency fields`

   * - Critical
     - 1

   * - Major or Minor
     - 2

   * - Warning or Info
     - 3


For :strong:`Event` issues, the ServiceNow integration sets the :strong:`Severity` of the issue based on the Observability Cloud alert severity (see :ref:`severity`).

The following table shows the Observability Cloud severity for :strong:`Event` issues:

.. list-table::
   :header-rows: 1

   * - :strong:`Observability Cloud severity`
     - :strong:`ServiceNow Severity field`

   * - Clear
     - 0

   * - Critical
     - 1

   * - Major
     - 2

   * - Minor
     - 3

   * - Warning
     - 4

   * - Info
     - 5