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

Select the :guilabel:`WhatsUp Gold` integration.

.. image:: /_images/spoc/Integrations-Splunk On-Call_Test-1.png
   :alt: WhatsUp Gold integration

Select :guilabel:`Enable Integration`.

.. image:: /_images/spoc/Integrations-Splunk On-Call_Test-10.png
   :alt: Activate integration

Copy the :guilabel:`Service Email` to your clipboard and make sure to replace ``$routing_key`` with the route you want to use. See :ref:`spoc-routing-keys`.

.. image:: /_images/spoc/Integrations-Splunk On-Call_Test-11.png
   :alt: Routing key

WhatsUp Gold configuration
====================================

From the WhatsUp Gold web interface, select :guilabel:`Settings`, then :guilabel:`Actions & Alerts`, then :guilabel:`Actions and Policies`.

.. image:: /_images/spoc/screen_shots_for_WUG2017-nate_victorops_com-Splunk On-Call_Mail.png
   :alt: Actions and policies

From the :guilabel:`Actions and Policies` page, select :guilabel:`+` to add a new action to
your action library.

.. image:: /_images/spoc/Fwd__screen_shots_for_WUG2017-dscott_victorops_com-Splunk On-Call_Mail-1.png
   :alt: Add a new action

Select :guilabel:`E-mail Action`.

.. image:: /_images/spoc/no_subject-dscott_victorops_com-Splunk On-Call_Mail.png
   :alt: Email action

Enter :guilabel:`Splunk On-Call CRITICAL` in the :guilabel:`Name:` field and paste the email address on your clipboard into the :guilabel:`Mail to:` field.

.. image:: /_images/spoc/Capture_4_PNG.png
   :alt: Configure email action

Select the :guilabel:`Mail Content` tab, then add ``Is Critical`` to the end of the :guilabel:`Subject` field. Select :guilabel:`OK` to save.

.. image:: /_images/spoc/Fwd__screen_shots_for_WUG2017-dscott_victorops_com-Splunk On-Call_Mail-2.png
   :alt: Save email action

Repeat the last 4 steps, entering ``Splunk On-Call RECOVERY`` instead of ``Splunk On-Call CRITICAL`` in the :guilabel:`Name` field and adding ``Is Recovery`` instead of ``Is Critical`` in the :guilabel:`Subject` field.

.. image:: /_images/spoc/Fwd__screen_shots_for_WUG2017-dscott_victorops_com-Splunk On-Call_Mail-3.png
   :alt: Repeat steps for recovery action

Select :guilabel:`+` under :guilabel:`Action Policies`.

.. image:: /_images/spoc/Fwd__screen_shots_for_WUG2017-dscott_victorops_com-Splunk On-Call_Mail-4.png
   :alt: Action policies

Enter ``Splunk On-Call`` into the :guilabel:`Policy name` field, then select :guilabel:`Add`.

.. image:: /_images/spoc/Fwd__screen_shots_for_WUG2017-dscott_victorops_com-Splunk On-Call_Mail-9.png
   :alt: Policy name

Select :guilabel:`Splunk On-Call CRITICAL` from the :guilabel:`Select an action from the Action Library` menu, then select :guilabel:`Down` from the :guilabel:`Execute the action on the following state change` menu, then select :guilabel:`OK`.

.. image:: /_images/spoc/Capture_13__1__PNG.png
   :alt: Select an action

Repeat the last 2 steps, selecting ``Splunk On-Call RECOVERY`` instead of ``Splunk On-Call CRITICAL`` from the :guilabel:`Select an action from the Action Library` menu and selecting :guilabel:`Up` instead of :guilabel:`Down` from the :guilabel:`Execute the action on the following state change` menu.

Select :guilabel:`OK` in the :guilabel:`New Action Policy` window.

.. image:: /_images/spoc/Fwd__screen_shots_for_WUG2017-dscott_victorops_com-Splunk On-Call_Mail-8.png
   :alt: Repeat the steps for recovery
