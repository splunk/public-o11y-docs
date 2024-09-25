.. _servicenow:

**************************************************************************
Send alert notifications to ServiceNow using Splunk Observability Cloud
**************************************************************************

.. meta::
      :description: Configure Splunk Observability Cloud to send alerts to ServiceNow when a detector alert condition is met and when the condition clears.

You can configure Splunk Observability Cloud to automatically send alert notifications to ServiceNow when a detector alert condition is met and when the alert clears.

To send Splunk Observability Cloud alert notifications to ServiceNow, complete the following configuration tasks:

* :ref:`servicenow1`

* :ref:`servicenow2`

  You must be a ServiceNow administrator to complete this task.

* :ref:`servicenow3`

  You must be a Splunk Observability Cloud administrator to complete this task.

* :ref:`servicenow4`

.. _servicenow1: 

Step 1: Choose the type of ServiceNow issue for your integration
=================================================================================

Before you set up the integration, choose a ServiceNow issue type from the following table:

 .. list-table:: 
      :header-rows: 1
      :width: 100

      * - Issue type
        - Role required
        - ServiceNow endpoint
      * - Problem
        - ``user_admin``, ``itil``
        - ``/api/now/v2/table/problem``
      * - Incident
        - ``user_admin``, ``itil``
        - ``/api/now/v2/table/incident``
      * - Event
        - None
        - ``/api/global/em/jsonv2``

Make note of the role and receiving endpoint that corresponds to your issue type before proceeding with :ref:`servicenow2`.

.. note:: The ``user_admin`` role is used to verify that ServiceNow has successfully created a Problem or Incident. The ``itil`` role is used to create Problems and Incidents when alerts are sent. 

.. _servicenow2:

Step 2: Create a ServiceNow user for your Splunk Observability Cloud integration
=================================================================================

In this step, you create a ServiceNow user that you can use to receive alert notifications from Splunk Observability Cloud. You must be a ServiceNow administrator to complete this task.

If you have an existing ServiceNow user that you want to use to receive alert notifications, the user has the roles assigned that correspond to your issue type, and you know the user ID and password, you can skip to :ref:`servicenow2`.

To set up a ServiceNow user for your Splunk Observability Cloud integration:

#. Log in to ServiceNow.

#. In the left navigation panel, scroll to :strong:`User Administration` and select :strong:`Users`.

#. Select :strong:`New`.

#. Enter :strong:`User ID`, :strong:`First name`, and :strong:`Last name` values that clearly communicate that the user is associated with Splunk Observability Cloud notifications. Make note of the :strong:`User ID` value for use in subsequent steps.

#. Enter a :strong:`Password` value. Make note of this value for use in :ref:`servicenow3`.

#. Select the :strong:`Active` check box.

#. Select :strong:`Submit`.

#. Find your new user by either searching for the user ID or doing a reverse chronological sort on the :strong:`Created` column. Select the user ID to open the user information window. Scroll down and select the :strong:`Roles` tab. Select :strong:`Edit`.

#. In the :strong:`Collection` search field, enter the roles for the issue type you chose in :ref:`servicenow1`, for example, ``user_admin``. Select the role and select :strong:`>` to move it the :strong:`Roles List` panel.

#. Select :strong:`Save`. The new roles display on the :strong:`Roles` tab for the user.


.. _servicenow3:

Step 3: Create a ServiceNow integration in Splunk Observability Cloud
=================================================================================

You must be a Splunk Observability Cloud administrator to complete this task.

To create a ServiceNow integration in Splunk Observability Cloud:

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`ServiceNow guided setup <https://login.signalfx.com/#/integrations/integrations/servicenow>`. Optionally, you can navigate to the guided setup on your own:

   #. In the left navigation menu, select :menuselection:`Data Management`.

   #. Go to the :guilabel:`Available integrations` tab, or select :guilabel:`Add Integration` in the :guilabel:`Deployed integrations` tab.

   #. In the integration filter menu, select :guilabel:`All`.

   #. In the :guilabel:`Search` field, search for :guilabel:`ServiceNow`, and select it.

   #. Select :strong:`New Integration` to display the configuration options.

#. By default, the name of the integration is :strong:`ServiceNow`. Give your integration a unique and descriptive name. For information about the downstream use of this name, see :new-page-ref:`About naming your integrations <naming-note>`.
#. In the :strong:`Username` field, enter the user ID from ServiceNow in :ref:`servicenow2`.
#. In the :strong:`Password` field, enter the password from ServiceNow in :ref:`servicenow2`.
#. In the :strong:`Instance Name` field, enter your ServiceName instance name. For example, the instance name must use the format ``example.service-now.com``. Do not include a leading ``https://`` or a trailing ``/``. Additionally, you cannot use local ServiceNow instances.

   To troubleshoot potential blind server-side request forgeries (SSRF), Splunk Observability Cloud has included ``\*.service-now.com`` on an allow list. As a result, if you enter a domain name that is rejected by Splunk Observability Cloud, contact :ref:`support` to update the allow list of domain names.

#. Select :strong:`Incident`, :strong:`Problem`, or :strong:`Event` to indicate the issue type you want the integration to create in ServiceNow. If necessary, you can create a second integration using the other issue type. This lets you create an incident issue for one detector rule and a problem issue for another detector rule. The following table shows the roles required to create each issue type:

#. :strong:`Save`.

#. If Splunk Observability Cloud can validate the ServiceNow username, password, and instance name combination, a :strong:`Validated!` success message displays. If an error displays instead, make sure that the values you entered match the values in ServiceNow.


.. _servicenow4:

Step 4: Add a ServiceNow integration as a detector alert recipient in Splunk Observability Cloud
=================================================================================================

To add a ServiceNow integration as a detector alert recipient in Splunk Observability Cloud:

#. Create or edit a detector that you want to configure to send alert notifications using your ServiceNow integration.

    For more information about working with detectors, see :ref:`create-detectors` and :ref:`subscribe`.

#. In the :strong:`Alert recipients` step, select :strong:`Add Recipient`.

#. Select :strong:`ServiceNow` and then select the name of the ServiceNow integration you want to use to send alert notifications. This is the integration name you created in :ref:`servicenow3`.

#. Activate and save the detector.

Splunk Observability Cloud sends an alert notification to create an incident in ServiceNow when the detector triggers an alert. When the alert clears, it sends a notification that sets the incident state to :strong:`Resolved`.

For :strong:`Incident` and :strong:`Problem` issues, the ServiceNow integration sets the :strong:`Impact` and :strong:`Urgency` fields on the ServiceNow issue based on the Splunk Observability Cloud alert severity (see :ref:`severity`). When you clear alerts for :strong:`Problem` and :strong:`Incident` issues, Splunk Observability Cloud marks them as :strong:`Resolved`.

The following table shows the Splunk Observability Cloud severity for :strong:`Incident` and :strong:`Problem` issues:

.. list-table::
   :header-rows: 1

   * - :strong:`Splunk Observability Cloud severity`
     - :strong:`ServiceNow Impact and Urgency fields`

   * - Critical
     - 1

   * - Major or Minor
     - 2

   * - Warning or Info
     - 3


For :strong:`Event` issues, the ServiceNow integration sets the :strong:`Severity` of the issue based on the Splunk Observability Cloud alert severity (see :ref:`severity`). The :strong:`Event` integration also creates an event whenever an alert is sent or cleared.

The following table shows the Splunk Observability Cloud severity for :strong:`Event` issues:

.. list-table::
   :header-rows: 1

   * - :strong:`Splunk Observability Cloud severity`
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