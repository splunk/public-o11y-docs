.. _splunkplatform:

********************************************************************************
Send alert notifications to Splunk platform using Splunk Observability Cloud
********************************************************************************

.. meta::
      :description: Configure Splunk Observability Cloud to send alerts to Splunk platform when an alert condition triggers the detector and when the condition clears.

You can configure Splunk Observability Cloud to automatically send alert notifications to Splunk platform when a condition triggers the detector and when a clear condition clears the alert.

.. note::

   * To add Splunk platform as a detector alert recipient, you must have administrator access. To get this access,
     an existing administrator adds it to your user profile. See :ref:`admin-manage-users` for more information.

To send Splunk Observability Cloud alert notifications to Splunk platform, complete the following configuration tasks:

* :ref:`splunkplatform1`

* :ref:`splunkplatform2`

.. _splunkplatform1:

Step 1: Create a Splunk platform integration in Splunk Observability Cloud
=================================================================================

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`Splunk platform guided setup <https://login.signalfx.com/#/integrations/splunk-platform>`. Alternatively, you can navigate to the guided setup on your own:

   #. In the navigation menu, select :menuselection:`Data Management`.
   #. Go to the :guilabel:`Available integrations` tab, or select :guilabel:`Add Integration` in the :guilabel:`Deployed integrations` tab.
   #. In the integration filter menu, select :guilabel:`All`.
   #. In the :guilabel:`Search` field, search for :guilabel:`Splunk platform`, and select it.
   #. Select :strong:`New Integration` to display the configuration options.

#. On the :strong:`Summary` page, select :guilabel:`Next`.
#. On the :strong:`Configure connection` page, enter information into the following fields:

   .. list-table::
      :header-rows: 1
      :widths: 25 75

      * - :strong:`Field`
        - :strong:`Description`

      * - Name
        - Give your integration a unique and descriptive name. For information about the downstream use of this name, see :new-page-ref:`About naming your integrations <naming-note>`.

      * - URL
        - Enter...

      * - HEC token
        - ...

#. Select :guilabel:`Next`.
#. On the :strong:`Customize message` page, you see the default template for a Splunk platform integration. You can customize your payload to make sure responders have the context needed to resolve the issues.
#. Select :guilabel:`Next`.
#. Review your integration and select :guilabel:`Save`.

.. _splunkplatform2:

Step 2: Add a Splunk platform integration as a detector alert recipient in Observability Cloud
=====================================================================================================================

To add a Splunk platform integration as a detector alert recipient in Splunk Observability Cloud:

#. Create or edit a detector that you want to configure to send alert notifications using your Splunk platform integration.

   For more information about working with detectors, see :ref:`create-detectors` and :ref:`subscribe`.

#. In the :strong:`Alert recipients` step, select :strong:`Add Recipient`.
#. Select :strong:`Splunk platform` and then select the name of the Splunk platform integration you want to use to send alert notifications. This is the integration name you created in :ref:`splunkplatform1`.
#. Activate and save the detector.

Splunk Observability Cloud sends an alert notification to Splunk platform when the detector triggers or clears an alert.


