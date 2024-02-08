WhatsUp Gold is network monitoring reimagined with advanced
visualization features for faster decisions, intuitive workflows for
improved productivity and the industry's most flexible licensing
approach for a superior return on your investment.  The following guide
will walk you through this integration.

**In VictorOps**
----------------

From the VictorOps web portal, select **Settings**, then **Alert
Behavior**, then **Integrations**.

..image/_images/spoc/settings-alert-behavior-integrations-e1480978368974.png

Select the **WhatsUp Gold** integration option.

..image/_images/spoc/Integrations_-_VictorOps_Test-1.png

Click **Enable Integration**.

..image/_images/spoc/Integrations_-_VictorOps_Test-10.png

Copy the **Service Email** to your clipboard and make sure to replace
“$routing_key” with the appropriate route you want to use.

..image/_images/spoc/Integrations_-_VictorOps_Test-11.png

In WhatsUp Gold
---------------

From the WhatsUp Gold web interface, select **Settings**, then **Actions
& Alerts**, then **Actions and Policies**.

..image/_images/spoc/screen_shots_for_WUG2017_-_nate_victorops_com_-_VictorOps_Mail.png

From the “Actions and Policies” page, click **+** to add a new action to
your “Action Library”.

..image/_images/spoc/Fwd__screen_shots_for_WUG2017_-_dscott_victorops_com_-_VictorOps_Mail-1.png

Select **E-mail Action**.

..image/_images/spoc/no_subject__-_dscott_victorops_com_-_VictorOps_Mail.png

Enter “VictorOps CRITICAL” in the “Name:” field and paste the email
address on your clipboard into the “Mail to:” field.

..image/_images/spoc/Capture_4_PNG.png

Scroll to the bottom of the window and select the “Mail Content” tab,
then add “Is Critical” to end of the “Subject:” field, then
click **OK**.

..image/_images/spoc/Fwd__screen_shots_for_WUG2017_-_dscott_victorops_com_-_VictorOps_Mail-2.png

Repeat the last 4 steps, entering “VictorOps RECOVERY” instead of
“VictorOps CRITICAL” in the “Name:” field and adding “Is Recovery”
instead of “Is Critical” in the “Subject:” field.

..image/_images/spoc/Fwd__screen_shots_for_WUG2017_-_dscott_victorops_com_-_VictorOps_Mail-3.png

Click **+** under “Action Policies”.

..image/_images/spoc/Fwd__screen_shots_for_WUG2017_-_dscott_victorops_com_-_VictorOps_Mail-4.png

Enter “VictorOps” into the “Policy name” field, then click **Add…**.

..image/_images/spoc/Fwd__screen_shots_for_WUG2017_-_dscott_victorops_com_-_VictorOps_Mail-9.png

Select **VictorOps CRITICAL** from the “Select an action from the Action
Library:” dropdown menu, then select **Down** from the “Execute the
action on the following state change:” dropdown menu, then click **OK**.

..image/_images/spoc/Capture_13__1__PNG.png

Repeat the last two steps, selecting **VictorOps RECOVERY** instead
of **VictorOps CRITICAL** with  from the “Select an action from the
Action Library:” dropdown menu and selecting **Up** instead
of **Down** from the “Execute the action on the following state change:”
dropdown menu.

Click **OK** in the “New Action Policy” window.

..image/_images/spoc/Fwd__screen_shots_for_WUG2017_-_dscott_victorops_com_-_VictorOps_Mail-8.png

You have completed setting up this integration.  If you have any
questions, please contact `VictorOps
support <mailto:Support@victorops.com?Subject=WhatsUp%20Gold%20VictorOps%20Integration>`__.
