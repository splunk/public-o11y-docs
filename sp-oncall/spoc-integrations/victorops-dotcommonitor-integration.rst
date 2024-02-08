[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported: N/A (SaaS)**

**VictorOps Version Required: Starter, Growth,** or **Enterprise**

[/ht_toggle]

Dotcom is a powerful SaaS based Load Testing and Monitoring Suite, used
by thousands of customers around the world. Businesses have realized
that reliable services are essential for succeeding in global markets.
At dotcom monitor they help customers identify and eliminate performance
hotspots pre-production and monitor their business applications 24 / 7
on production. For quick error resolution, they provide powerful
alerting features such as the integration to Splunk On-Call. This helps
to reduce MTTR and brings issues quickly at your fingertips.

This guideline provides a step by step description on how to enable the
alerting integration between dotcom monitor and Splunk On-Call. The
Splunk On-Call integration with dotcom monitor creates an Incident in
the Splunk On-Call Timeline whenever a dotcom monitor alert is
triggered. The following is a quick walkthrough on how to set up the
integration.

 

1.  Login to dotcom monitor portal. From the dotcom monitor UI select
    **Configure** ==> **Alert Templates**  ==> **+ Create
    Template**\ |image\ |image2|

2.  Delete the pre-populated content in the Alert Template (seen in the
    picture below) and instead enter the following information for the
    **Error Source**, **Test Source** and **Uptime Source** fields,
    within this New Template:

    .. raw:: html

       <table class="api-fields">

    .. raw:: html

       <tbody>

    .. raw:: html

       <tr>

    .. raw:: html

       <td colspan="1" rowspan="1">

    Name

    .. raw:: html

       </td>

    .. raw:: html

       <td colspan="1" rowspan="1">

    Name entered here

    .. raw:: html

       </td>

    .. raw:: html

       </tr>

    .. raw:: html

       <tr>

    .. raw:: html

       <td colspan="1" rowspan="1">

    Email Subject

    .. raw:: html

       </td>

    .. raw:: html

       <td colspan="1" rowspan="1">

    N/A

    .. raw:: html

       </td>

    .. raw:: html

       </tr>

    .. raw:: html

       <tr>

    .. raw:: html

       <td colspan="1" rowspan="1">

    Email Reply-tp

    .. raw:: html

       </td>

    .. raw:: html

       <td colspan="1" rowspan="1">

    Email entered here

    .. raw:: html

       </td>

    .. raw:: html

       </tr>

    .. raw:: html

       <tr>

    .. raw:: html

       <td colspan="1" rowspan="1">

    Type

    .. raw:: html

       </td>

    .. raw:: html

       <td colspan="1" rowspan="1">

    Txt

    .. raw:: html

       </td>

    .. raw:: html

       </tr>

    .. raw:: html

       <tr>

    .. raw:: html

       <td colspan="1" rowspan="1">

    Error Source

    .. raw:: html

       </td>

    .. raw:: html

       <td colspan="1" rowspan="1">

    {“message_type”:“critical”,“monitoring_tool”:“Dotcom-Monitor”,“state_message”:“Error
    occurred during the device monitoring at <%Monitor_DateTime%>
    Monitoring location:<%Location%>”,“entity_id”:“<%Site_Name%>”}

    .. raw:: html

       </td>

    .. raw:: html

       </tr>

    .. raw:: html

       <tr>

    .. raw:: html

       <td colspan="1" rowspan="1">

    Test Source

    .. raw:: html

       </td>

    .. raw:: html

       <td colspan="1" rowspan="1">

    {“message_type”:“critical”,“monitoring_tool”:“Dotcom-Monitor”,“state_message”:“Test
    message”,“entity_id”:“Test message”}

    .. raw:: html

       </td>

    .. raw:: html

       </tr>

    .. raw:: html

       <tr>

    .. raw:: html

       <td colspan="1" rowspan="1">

    Uptime Source

    .. raw:: html

       </td>

    .. raw:: html

       <td colspan="1" rowspan="1">

    {“message_type”:“recovery”,“monitoring_tool”:“Dotcom-Monitor”,“state_message”:“Device
    <%Site_Name%> detected to be back online at <%Monitor_DateTime%>
    from monitoring location: <%Location%>”,“entity_id”:“<%Site_Name%>”}

    .. raw:: html

       </td>

    .. raw:: html

       </tr>

    .. raw:: html

       </tbody>

    .. raw:: html

       </table>

    ..image/_images/spoc/DM-3-final-1.png

3.  Click on the **Update** button to save your Alert Template.

4.  Select **Configure / Alert Templates** from the menu and then select
    the newly created Splunk On-Call Alert. Get your Template ID from
    the URL field (number between id= and & –> 1416 in this example). We
    will need the Template ID in Step 8.\ |image3|

5.  In Splunk On-Call, as an Admin user, select **Integrations** *>>*
    **Dotcom-Monitor**

6.  If the integration has not yet been enabled, click the “Enable
    Integration” button to generate your endpoint URL as seen below.  Be
    sure to replace the “$routing_key” section with the actual routing
    key you intend to use. (To view or configure route keys in Splunk
    On-Call, click *Alert Behavior >> Route Keys*)\ |image4|

7.  Create or edit a Team and add the Users who should receive alerts.
    Add an escalation policy and please note that routing keys will
    appear after you've completed the routing key
    configuration.\ |image5|

8.  Add a routing key using the “Add Key”, named curl. Then add the
    escalation policy (your team which should receive the alert). Set
    the Default Routing Policy (your team which should receive not
    mapped alerts).\ |image6|

9.  Going back into dotcom monitor and Edit your device. Navigate to the
    Alert Options section and select the custom Script file checkbox.
    Add the following value into the Custom Script text box:

    .. raw:: html

       <table>

    .. raw:: html

       <tbody>

    .. raw:: html

       <tr>

    .. raw:: html

       <td class="s27">

    .. container::

       .. container::

       Url_PostExecutor.cs “Service API Endpoint/Routing Key” “Template
       ID”

       .. container::

    .. raw:: html

       </td>

    .. raw:: html

       </tr>

    .. raw:: html

       </tbody>

    .. raw:: html

       </table>

    Get your Service API Endpoint from Splunk On-Call Portal as shown in
    step 5

    Get your routing key from Splunk On-Call Portal as shown in step 7

    Get your Template ID from Dotcom monitor portal as shown in step 4

    .. raw:: html

       <table>

    .. raw:: html

       <tbody>

    .. raw:: html

       <tr>

    .. raw:: html

       <td>

    .. container::

    .. container::

       .. raw:: html

          <p class="p1">

       Sample Custom Script file we've used in this showcase:

       .. raw:: html

          </p>

       .. raw:: html

          <p class="p1">

       Url_PostExecutor.cs
       “https://alert.victorops.com/integrations/generic/20131114/alert/aa57b71c-8374-48ef-a649-fe15ed19a88ff/CURL”
       “1416”

       .. raw:: html

          </p>

       .. container::

    .. raw:: html

       </td>

    .. raw:: html

       </tr>

    .. raw:: html

       </tbody>

    .. raw:: html

       </table>

    ..image/_images/spoc/Screen-Shot-2018-01-12-at-1.25.27-PM.png

10. Click on the button **Update** to save this configuration.

11. Click on the Send test alert. The screenshot below shows how to
    initiate the send of your test alert.\ |image7|

12. Go back into your Splunk On-Call account and make sure that you are
    viewing the Timeline. Check if the alert has been received. Below is
    a screenshot showing that the alert has been received.
    |image8|\ Congratulations! You've successfully sent your first alert
    from Dotcom monitor to Splunk On-Call!

.. |image1/_images/spoc/DM-1-final-1.png
.. |image2/_images/spoc/DM-2-final-2.png
.. |image3/_images/spoc/DM-url-skitch.png
.. |image4/_images/spoc/Dotcom-Monitor-VO2-8-final.png
.. |image5/_images/spoc/Screen-Shot-2018-01-12-at-1.46.46-PM.png
.. |image6/_images/spoc/Screen-Shot-2018-01-12-at-1.13.51-PM.png
.. |image7|/_images/spoc/Screen-Shot-2018-01-12-at-1.31.35-PM.png
.. |image8images/Screen-Shot-2018-01-12-at-1.34.17-PM.png
