.. _whatsupgold-spoc:

WhatsUp Gold integration for Splunk On-Call
***********************************************************

.. meta::
    :description: Configure the WhatsUp Gold integration for Splunk On-Call.

WhatsUp Gold is network monitoring reimagined with advanced visualization features for faster decisions, intuitive workflows for improved productivity and the industry's most flexible licensing approach for a superior return on your investment. The following guide walks you through this integration.


Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise


Splunk On-Call
====================================

From the Splunk On-Call web portal, select :guilabel:`Settings`, then :guilabel:`Alert Behavior`, then `Integrations`.

.. image:: /_images/spoc/settings-alert-behavior-integrations-e1480978368974.png
   :alt: Integrations screen

Select the :guilabel:`WhatsUp Gold` integration and then select :guilabel:`Enable Integration`.

Copy the :guilabel:`Service Email` to your clipboard and make sure to replace ``$routing_key`` with the route you want to use. See :ref:`spoc-routing-keys`.

WhatsUp Gold configuration
====================================

From the WhatsUp Gold web interface, select :guilabel:`Settings`, then :guilabel:`Actions & Alerts`, then :guilabel:`Actions and Policies`.

1. Select :guilabel:`+` to add a new action to your action library.

2. Select :guilabel:`E-mail Action`.

3. Enter :guilabel:`Splunk On-Call CRITICAL` in the :guilabel:`Name:` field and paste the email address on your clipboard into the :guilabel:`Mail to:` field.

4. Select the :guilabel:`Mail Content` tab, then add ``Is Critical`` to the end of the :guilabel:`Subject` field. 

5. Select :guilabel:`OK` to save.

Repeat the last 4 steps, entering ``Splunk On-Call RECOVERY`` instead of ``Splunk On-Call CRITICAL`` in the :guilabel:`Name` field and adding ``Is Recovery`` instead of ``Is Critical`` in the :guilabel:`Subject` field.

1. Select :guilabel:`+` under :guilabel:`Action Policies`.

2. Enter ``Splunk On-Call`` into the :guilabel:`Policy name` field, then select :guilabel:`Add`.

3. Select :guilabel:`Splunk On-Call CRITICAL` from the :guilabel:`Select an action from the Action Library` menu, then select :guilabel:`Down` from the :guilabel:`Execute the action on the following state change` menu.

4. Select :guilabel:`OK`.

Repeat the last 2 steps, selecting ``Splunk On-Call RECOVERY`` instead of ``Splunk On-Call CRITICAL`` from the :guilabel:`Select an action from the Action Library` menu and selecting :guilabel:`Up` instead of :guilabel:`Down` from the :guilabel:`Execute the action on the following state change` menu.

Select :guilabel:`OK` in the :guilabel:`New Action Policy` window.

