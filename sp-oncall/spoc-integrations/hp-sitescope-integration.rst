.. _hp-sitescope-spoc:

HP SiteScope integration for Splunk On-Call
**************************************************

.. meta::
    :description: Configure the HP SiteScope integration for Splunk On-Call.

SiteScope monitors more than 100 different target types for critical health and performance characteristics. You can also extend your monitoring environment by creating your own monitor types and customizing existing monitors. The following guide walks you through this integration.


Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise


Splunk On-Call configuration
====================================

From the Splunk On-Call web portal, select :guilabel:`Integrations`. From the resulting list of integration options, select :guilabel:`HP SiteScope`.

Copy the :guilabel:`Service Email` to the clipboard. Make sure to replace the ``$routing_key`` section with the routing key you want to use. See :ref:`routing-keys`.


HP SiteScope configuration
====================================

On the SiteScope server, add 3 files with the following names and contents in the templates.mail directory.

Filename: :guilabel:`Splunk On-Call_CRITICAL`

.. code-block::
   
   [Subject: <siteScopeHost>/<groupID>/<name>/<alert::name> CRITICAL]

   This alert is from SiteScope at <newSiteScopeURL>

   Monitor: <groupID>:<name>
   Tags: <tag>
   Group: <group>
   Status: <state>
   Sample #: <sample>

   Time: <time>

   ---------------------- Detail ----------------------

   <mainParameters>

   <mainStateProperties>

Filename: :guilabel:`Splunk On-Call_WARNING`

.. code-block::

   [Subject: <siteScopeHost>/<groupID>/<name>/<alert::name> WARNING]

   This alert is from SiteScope at <newSiteScopeURL>

   Monitor: <groupID>:<name>
   Tags: <tag>
   Group: <group>
   Status: <state>
   Sample #: <sample>

   Time: <time>

   ---------------------- Detail ----------------------

   <mainParameters>

   <mainStateProperties>

Filename: :guilabel:`Splunk On-Call_RECOVERY`

.. code-block::

   [Subject: <siteScopeHost>/<groupID>/<name>/<alert::name> RECOVERY]

   This alert is from SiteScope at <newSiteScopeURL>

   Monitor: <groupID>:<name>
   Tags: <tag>
   Group: <group>
   Status: <state>
   Sample #: <sample>

   Time: <time>

   ---------------------- Detail ----------------------

   <mainParameters>

   <mainStateProperties>

Configure alert action
------------------------------

From the HP SiteScope web interface, right-click on the context tree, then select :guilabel:`New`, :guilabel:`Alert`.

.. image:: /_images/spoc/SiteScope_new_alert.png
   :alt: New alert

Enter :strong:`Splunk On-Call` in the **Name** field and **Splunk On-Call Alerts** in the **Alert description** field.

Check **SiteScope** in the guilabel:`Alert Targets` section. In the :guilabel:`Alert Actions` section, select :guilabel:`New Alert Action`.

.. image:: /_images/spoc/SiteScope_VO_alert_settings.png
   :alt: Configure new alert

Select :guilabel:`Email` in the :guilabel:`Action Type` list.

.. image:: /_images/spoc/SiteScope_action_type.png
   :alt: Select email

Enter **Error Action** in the :guilabel:`Action name` field. Paste the email address into the :guilabel:`Addresses` field.

Select :guilabel:`Splunk On-Call_CRITICAL` from the template menu and :guilabel:`Error` in the status trigger section, then select :guilabel:`OK`.

.. image:: /_images/spoc/SiteScope_error_action.png
   :alt: Configure status trigger

Configure warning action
------------------------------

In the :guilabel:`Alert Actions` section, select :guilabel:`New Alert Action`.

.. image:: /_images/spoc/SiteScope_repeat_new_alert_action.png
   :alt: New alert

Select :guilabel:`Email` in the :guilabel:`Action Type` list.

.. image:: /_images/spoc/SiteScope_action_type.png
   :alt: Select email

Enter :guilabel:`Warning Action` in the :guilabel:`Action name` field. Paste the email address into the :guilabel:`Addresses` field.

Select :guilabel:`Splunk On-Call_WARNING` from the template menu and :guilabel:`Warning` in the :guilabel:`Status Trigger` section, then select :guilabel:`OK`.

.. image:: /_images/spoc/SiteScope_warning_action.png
   :alt: Configure warning action

Configure recovery action
------------------------------

In the :guilabel:`Alert Actions` section, select :guilabel:`New Alert Action`.

.. image:: /_images/spoc/SiteScope_repeat_new_alert_action-1.png
   :alt: New action

Select :guilabel:`Email` in the :guilabel:`Action Type` list.

.. image:: /_images/spoc/SiteScope_action_type.png
   :alt: Select action type

Enter :guilabel:`Recovery Action` in the :guilabel:`Action name` field. Paste the email address into the :guilabel:`Addresses` field.

Select :guilabel:`Splunk On-Call_RECOVERY` from the template menu, then check :guilabel:`Mark this action to close alert`.

Select :guilabel:`Good` in the :guilabel:`Status Trigger` section, then select :guilabel:`OK`.

.. image:: /_images/spoc/SiteScope_recovery_action.png
   :alt: Configure recovery action

Select :guilabel:`OK`.

.. image:: /_images/spoc/SiteScope_settings_ok.png
   :alt: Confirm settings

Test the integration
------------------------------

Select :guilabel:`Splunk On-Call` from the alert list, then select :guilabel:`Test`.

.. image:: /_images/spoc/SiteScope_test.png
   :alt: Test the integration

Select :guilabel:`OK`.

.. image:: /_images/spoc/SiteScope_test_exec.png
   :alt: Test execution

You should see a confirmation that the email alerts were successfully sent to your Splunk On-Call email address. Select :guilabel:`OK` to confirm.

.. image:: /_images/spoc/SiteScope_confirm.png
   :alt: Confirm test results

Alerts now appear in your Splunk On-Call timeline.

