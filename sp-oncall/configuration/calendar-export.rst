Export your Splunk On-Call **Team** or **Personal** calendar to your
favorite calendar app using these easy steps.

From Splunk On-Call
===================

Team Calendar
-------------

To get your team’s calendar, select **Teams,** click on your team
highlighted in blue, then **On-Call** **Schedule**. Then locate and
select the upside-down triangle button to the very right of the team
name to open the Calendar view.

|image1| |image2|

Under each Team’s calendar you will see a **Team Calendar** link. Select
the “Copy to clipboard” button to automatically copy the URL.

.. image:: images/Calendar-Export.png

--------------

Personal Calendar
-----------------

To get your personal calendar;

**Global Admins:** select **Users** from the top navigation bar and then
select your username. Under **Personal Calendar** you will see a link
generated. Select the “Copy Token” button to copy the URL.

**Normal Users:** Select “**Your Name**” on the top right and then click
“**Profile**”. Under **Personal Calendar** you will see a link
generated. Select the “Copy Token” button to copy the URL.

.. image:: images/Personal-Calender-Copy-to-Clipboard.png

 

Calendars
=========

**Note:** Events imported from an .ics to an existing calendar become
part of that calendar and will have to be individually removed. Because
of this, we recommend importing the file to a calendar of its own, which
can be deleted or disabled as a whole if needed.

Google Calendar
---------------

**Important note about Splunk On-Call calendars and Google:**  When
changes are made to your schedules and escalation policies in Splunk
On-Call, those changes are immediately written to the .ics calendar file
in our system, and are thus are immediately available to calendar tools.
 However, this process is a *pull* only operation, whereby Google
Calendar must actively reach out to VictorOps to retrieve the most
recent version of the calendar at the provided URL.  Google calendar
tends to perform this action infrequently, and at seemingly random
intervals.  The refresh rate cannot be configured (or known) by Google
users.  For this reason, changes made to your schedules in Splunk
On-Call may not be reflected in Google for up to as many as 20 - 30
hours after changes are made in Splunk On-Call.  If you need to force a
refresh, please refer to the *Force Refresh* work-around documented
below.

**Import Splunk On-Call Calendar to Google**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

At the top of your list of calendars on the left hand menu, click the
“**+**” symbol next to *Add a coworker’s calendar* and choose **From
URL**\ \_.\_

.. image:: images/Add-calendar.png

 

Paste in the Team or Personal calendar URL you copied from Splunk
On-Call, then select **Add Calendar**\ \_.\_

.. image:: images/URL.png

You should now see the newly added calendar in the *Other calendars*
section of the left-hand menu.

**Force Refresh of Google Calendar**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As explained above, Google does not allow users to control the refresh
rate for imported calendars, therefore you may find it necessary to
force a refresh with the following work-around, if you need to see the
changes reflected now.

In Google Calendar, locate your Splunk On-Call calendar and click the
three dots to locate **Settings**\ \_.\_

.. image:: images/Click-the-three-settings.png

 

Select **unsubscribe** from the bottom of the calendar settings
page\_.\_

.. image:: images/Unsubscribe-button.png

Now follow the directions above to add a calendar by URL, only this
time, you will append the following query string to the end of the
Splunk On-Call-provided calendar .ics URL.

**?nocache**

The resulting URL should appear like this example:

https://portal.victorops.com/api/v1/org/<*your organization
name*>/team/<*your- team
name*>/calendar/24B13BBABXXXXXXXXXXXXXXX1E203D11.ics?nocache

This will cause Google to contact that URL and pull the latest version
of the .ics file, including your most recent changes, instead of loading
the cached version.  However, it is important to note that this only
forces a refresh ONE time, after which the new URL (including the
nocache statement) will now be cached.  In order to perform this
operation a second time, you will have to increment the nocache
statement with a number each time (?nocache1, ?nocache2, ?nocache3
etc.).

--------------

Outlook
-------

**Subscribe to a calendar**

1. On the Outlook navigation bar, click the App Launcher |Select the app
   launcher| , and then click **Calendar**.
2. Under the **Outlook Calendar** navigation bar, click the **New** down
   arrow, and click **Add calendar**.\ |Add a calendar|
3. Click **From internet**, and in the **Link to the calendar** box,
   type or copy and paste the web address of the calendar.\ |Link to a
   calendar online|
4. In the **Calendar name** box, enter a name for the linked calendar.
5. Click **Save**.

--------------

iCal
----

1. Choose **File** > **New Calendar Subscription**. |image3|
2. Enter the specific Team or Personal calendar’s web address from
   Splunk On-Call, then click **Subscribe**.
3. Enter a name for the calendar in the Name field, then click the
   adjacent pop-up menu and choose a color. |image4|
4. Click the Location pop-up menu, then choose an account for the
   subscription. If you choose your iCloud account, the calendar is
   available on all your computers and devices that are set up with
   iCloud. If you choose On My Mac, the calendar is saved on your
   computer.
5. To get the calendar’s event attachments or alerts, deselect the
   appropriate checkboxes.
6. Click the Auto-refresh pop-up menu, then choose how often to update
   the calendar.
7. To prevent alerts from appearing for this calendar, select “Ignore
   alerts.”
8. Click **OK**. To make changes later, click the name of the calendar,
   then choose Edit > Get Info.

.. |image1| image:: images/Calendar-expand-1.png
.. |image2| image:: images/Calendar-Expand-2.png
.. |Select the app launcher| image:: images/59e80410-ffd0-4bc0-8aa8-3779ec876d8d.png
.. |Add a calendar| image:: images/c990288c-cbff-4c0a-b1e3-362f3897136f.png
.. |Link to a calendar online| image:: images/1fc473c7-f2b8-4183-a957-e285582a90bb.png
.. |image3| image:: images/New-Calendar-Subscription.png
.. |image4| image:: images/Settings-for-new-calendar-subscription.png
