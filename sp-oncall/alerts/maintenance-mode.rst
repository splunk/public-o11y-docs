

.. _maintenance-mode:

************************************************************************
Maintenance mode
************************************************************************

.. meta::
   :description: About the user role in Splunk On-Call.




Maintenance Mode allows you to temporarily mute alerts in order to complete server maintenance, or other work, without disrupting members of your team with paging. Maintenance Mode can be used to help keep things quiet during alert storms.

When you start a Maintenance Mode, you have the option to mute ALL Routing Keys (this will mute all incidents globally) or mute select
Routing Key(s). If you mute only select Routing Key(s), alerting from other Routing Keys will not be interrupted so that you do not miss
critical incidents.

Only one global Maintenance Mode instance can be global at once, but multiple Maintenance Modes scoped to Routing Key(s) can be active at once. Routing Key(s) can overlap between Maintenance Modes.

Permissions
=================

Global Admins and Alert Admins will be able to start, end, and manage Maintenance Modes.

Start Maintenance Mode
==================================

To start a new Maintenance Mode, select the wrench icon in the top right corner within the incidents pane on the web UI.

You can also customize and configure your Maintenance Mode:

-  Purpose Field: Give your Maintenance Mode a name (for example. Weekly Maintenance for Web platforms”) NOTE: the Purpose field is valuable if you or your team is managing multiple active Maintenance Modes.
-  Mute Paging: Select either Mute all Routing Keys to start a global Maintenance Mode or elect Mute select Routing Key(s) if you want to select one or more Routing Keys for which paging will be muted (without disrupting paging for other Routing Keys).
-  Start Maintenance Mode: Once you've started Maintenance Mode, the modal will close and a banner will display across the top of your screen signaling to you that the feature is active. NOTE: All members of your org who are on call will receive an email notification that a new Maintenance Mode was started.

During Maintenance Mode
=============================

-  Muted Paging: Paging will be muted for any new triggered incidents for the Routing Key(s) you have selected. NOTE: Paging will continue for incidents that are already in progress.
-  Alerts and Incidents during Maintenance Mode: Alerts and incidents created during Maintenance Mode for the Routing Key(s) you have selected will continue to populate in the timeline and incident pane, but they will not page members of your team. You will notice that alerts and incidents in Maintenance Mode will look slightly different, so you can differentiate them from alerts and incidents that may be critical.

.. image:: /_images/spoc/maintenance-mode1.png
    :width: 100%
    :alt: Pages during maintenance mode will be muted.



-  Manage Maintenance Mode: Manage your maintenance modes either through Settings under the main navigation or by clicking on the button from the Maintenance Mode banner.
-  Viewing Active Maintenance Mode: The Maintenance Mode tab gives you a comprehensive view of all active Maintenance Modes with some helpful information, such as the Purpose of the Maintenance Mode, who started it, when it was started, and for which Routing Keys. You can also end a Maintenance Mode from this table.

.. image:: /_images/spoc/maintenance-mode2.png
    :width: 100%
    :alt: Pages during maintenance mode will be muted.

End Maintenance Mode
--------------------

-  End Maintenance Mode: Navigate to the Manage Maintenance Mode page either through Settings under the main navigation or by clicking on the button from the Maintenance Mode banner. Identify the Maintenance Mode you want to end, and then click on the X icon from
   the row.

.. image:: /_images/spoc/maintenance-mode3.png
    :width: 100%
    :alt: Pages during maintenance mode will be muted.

-  End Maintenance Mode Behavior:

   -  Upon ending Maintenance Mode, paging will be initiated from the beginning of the escalation policy for any triggered incidents NOTE: You may want to ack and/or resolve all incidents triggered during a Maintenance Mode before you end it in order to prevent paging.
   -  Triggered incidents with Routing Keys that are a part of other active Maintenance Modes will NOT begin to page, as those incidents are still muted until that Maintenance Mode is ended.
   -  All Maintenance Modes that are not ended manually will stay active forever, so remember to end Maintenance Mode once it has served its purpose so that you do not accidentally miss critical incidents.
   -  When you end Maintenance Mode all members of your org who are on call will receive an email notification that the Maintenance Mode was terminated.

Rules Engine Alternative
------------------------

If you require more granularity than muting paging by Routing Key, you may create a matching condition in our Rules Engine to mute paging for other metadata. For more information regarding this alternative, see :ref:`rules-engine-transf`.
