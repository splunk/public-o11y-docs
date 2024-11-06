

.. _calendar-export:

************************************************************************
Export your Splunk On-Call team or personal calendar
************************************************************************

.. meta::
   :description: Export your Splunk On-Call Team or Personal calendar to your favorite calendar app using these easy steps.


Export your Splunk On-Call Team or Personal calendar to your favorite calendar app using these easy steps.

From Splunk On-Call
=========================

Export Team Calendar
------------------------------

To get your team's calendar, select :guilabel:`Teams` then select your team highlighted in blue, and then :guilabel:`On-Call Schedule`. Then locate and select the expand button to the very right of the team
name to open the Calendar view.

.. image:: /_images/spoc/calendar-export1.png
    :width: 100%
    :alt: Select the expand button to open the Calendar view.


.. image:: /_images/spoc/calendar-export2.png
    :width: 100%
    :alt: The On-Call schedule is displayed.


Under each Team's calendar you will see a Team Calendar link. Select the :guilabel:`Copy to clipboard` button to automatically copy the URL.

.. image:: /_images/spoc/calendar-export3.png
    :width: 100%
    :alt: Select the Copy to clipboard button to copy the Team Calendar URL.



Personal Calendar
===============================

To get your personal calendar

- Global Admins: Select :menuselection:`Users` from the top navigation bar and then select your username. Under :guilabel:`Personal Calendar` you will see a generated link. Select the :guilabel:`Copy Token` button to copy the URL.

- Non-Admin Users: Select your name on the top right and then select :guilabel:`Profile`. Under :guilabel:`Personal Calendar` a link is generated. Select the :guilabel:`Copy Token` button to copy the URL.

.. image:: /_images/spoc/calendar-export4.png
    :width: 100%
    :alt: Non-admin users can access their personal calendar link in their profile.

Calendars
===============

Events imported from an .ics to an existing calendar become part of that calendar and will have to be individually removed. Because of this, we recommend importing the file to a calendar of its own, which can be deleted or disabled as a whole if needed.

Google Calendar
---------------------

.. note:: Important note about Splunk On-Call calendars and Google: When changes are made to your schedules and escalation policies in Splunk On-Call, those changes are immediately written to the .ics calendar file in our system, and are thus are immediately available to calendar tools. However, this process is a *pull* only operation, whereby Google Calendar must actively reach out to Splunk On-Call to retrieve the most recent version of the calendar at the provided URL. Google calendar tends to perform this action infrequently, and at seemingly random intervals. The refresh rate cannot be configured (or known) by Google users. For this reason, changes made to your schedules in Splunk On-Call may not be reflected in Google for up to as many as 20 - 30 hours after changes are made in Splunk On-Call. If you need to force a refresh, see :ref:`force-refresh` in a following section of this topic.

Import Splunk On-Call Calendar to Google
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

At the top of your list of calendars on the left hand menu, select the :guilabel:`Add` (+) symbol next to :guilabel:`Add a coworkers calendar` and choose :guilabel:`From URL`.

.. image:: /_images/spoc/calendar-add.png
    :width: 100%
    :alt: Add a coworker's calendar to your Google calendar.

Paste in the Team or Personal calendar URL you copied from Splunk On-Call, then select :guilabel:`Add Calendar`.

.. image:: /_images/spoc/calendar-personal.png
    :width: 100%
    :alt: Paste the copied URL and select Add Calendar.

You should now see the newly added calendar in the Other calendars section of the left-hand menu.

.. _force-refresh:

Force a refresh of Google Calendar
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Google does not allow users to control the refresh rate for imported calendars, therefore you might find it necessary to force a refresh with the following work-around, if you need to see the changes reflected immediately.

In Google Calendar, locate your Splunk On-Call calendar and select the more icon (|more|) to locate :guilabel:`Settings`.

.. image:: /_images/spoc/calendar-refresh.png
    :width: 100%
    :alt: Force a refresh from the Settings menu.

Select :guilabel:`unsubscribe` from the bottom of the calendar settings page.

.. image:: /_images/spoc/calendar-unsubscribe.png
    :width: 100%
    :alt: Unsubscribe the calendar.

Now follow the directions above to add a calendar by URL, except you will append the following query string to the end of the Splunk On-Call-provided calendar .ics URL.

:strong:`?nocache`

The resulting URL should appear like this example:

``https://portal.victorops.com/api/v1/org/<your-organization-name>/team/<your-team-name>/calendar/24B13BBABXXXXXXXXXXXXXXX1E203D11.ics?nocache``

This will cause Google to contact that URL and pull the latest version of the .ics file, including your most recent changes, instead of loading the cached version. However, it is important to note that this only forces a refresh once, after which the new URL (including the nocache statement) will now be cached. In order to perform this
operation a second time, you will have to increment the nocache statement with a number each time: ?nocache1, ?nocache2, ?nocache3, and so on.


Subscribe to an Outlook calendar
---------------------------------------


To subscribe to a calendar in Outlook:

#. On the Outlook navigation bar, select the App Launcher icon then select :guilabel:`Calendar`.
#. Under the :menuselection:`Outlook Calendar` navigation bar, select the :menuselection:`New` down
   arrow. Select :menuselection:`Add Calendar`.

   .. image:: /_images/spoc/calendar-outlook1.png
      :width: 100%
      :alt: Select Outlook Calendar, then New and Add Calendar.

#. Select :guilabel:`From internet`and in the :guilabel:`Link to the calendar` field enter the URL of the calendar.
   
   .. image:: /_images/spoc/calendar-outlook2.png
      :width: 100%
      :alt: Enter the URL of the calendar in the 'Link to the calendar' field.
#. In the :guilabel:`Calendar name` field enter a name for the linked calendar.
#. Select :guilabel:`Save`.



Subscribe to an iCal calendar
--------------------------------------

To subscribe to an iCal calendar:

#. Select :guilabel:`File` then :guilabel:`New Calendar Subscription`. 
   
   .. image:: /_images/spoc/calendar-ical1.png
      :width: 100%
      :alt: Select File, then New Calendar Subscription.

#. Enter the specific Team or Personal calendar's web address from Splunk On-Call, then select :guilabel:`Subscribe`.
#. Enter a name for the calendar in the Name field, then select the adjacent pop-up menu and choose a color. 
   
   .. image:: /_images/spoc/calendar-ical2.png
      :width: 100%
      :alt: Choose a name and colour for the new calendar.

#. Select the :guilabel:`Location` menu, then choose an account for the subscription. If you choose your iCloud account, the calendar is available on all your computers and devices that are set up with iCloud. If you choose :guilabel:`On My Mac` the calendar is saved on your computer.
#. To get the calendar's event attachments or alerts, deselect the appropriate checkboxes.
#. Select the :guilabel:`Auto-refresh` menu, then choose how often to update the calendar.
#. To prevent alerts from appearing for this calendar, select :guilabel:`Ignore alerts`.
#. Select :guilabel:`OK`. To make changes later, select the name of the calendar, then choose :guilabel:`Edit` then :guilabel:`Get Info`.
