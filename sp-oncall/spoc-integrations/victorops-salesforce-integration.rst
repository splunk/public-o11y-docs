This integration is for Salesforce service cloud users with access to
the developer tools. The integration triggers an incident in VictorOps
upon the creation of a case in Salesforce and then resolves it when the
case is closed. The following is a step-by-step walkthrough of how to
configure the integration.

[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported:** SaaS product; for further reference please see
`Salesforce
Editions <https://help.salesforce.com/articleView?id=overview_edition.htm&type=0&language=en_US&release=208.5>`__
documentation.

**Splunk On-Call Versions Required:** Getting Started, Essentials, or
Full-Stack

**What you need to know:** This integration is for Salesforce service
cloud users with access to the developer tools. The integration triggers
an incident in VictorOps upon the creation of a case in Salesforce and
then resolves it when the case is closed. This Splunk On-Call
integration makes use of our REST API and requires that you've
implemented Salesforce with your infrastructure.

[/ht_toggle]

--------------

Configuration in Splunk On-Call
-------------------------------

In Splunk On-Call navigate to *Integrations* and select the
Salesforce icon from the list of available integrations.

On the resulting page, click *Enable Integration*. This will reveal
the **Service API Endpoint.** Copy this endpoint. Ensure that you
replace “$routing_key” with the appropriate routing key that you intend
to use for this integration.

--------------

**Configuration in Salesforce**
-------------------------------

In order to make a POST request to a remote site from Salesforce you
need to add *http://alert.victorops.com* as a remote site. On the left
side toolbar of the Admin page, look for *Security >> Remote Site
Settings >> New Remote Site*

You can also use the Quick Find search tool and type Remote Site
Settings.

..image/_images/spoc/Screen-Shot-2022-04-22-at-1.20.08-PM.png

--------------

**The Apex Code**
-----------------

There are five bits of Apex code utilized to accomplish this
integration, all of which are contained in `this GitHub
Repository <https://github.com/victorops/monitoring_tool_releases/tree/master/VictorOps-salesforce>`__.

The VictorOpsTimeLine class contains the logic to both parse the JSON
and make the HTTP POST request. There are also two triggers (one for
CRITICAL alerts and one for RECOVERY), both require a test class in
order to be pushed to production.

**Configuration**
-----------------

Before adding the code to Salesforce you will need to grab your
**api_key** and appropriate **routing_key** to the POST request endpoint
URL found in the VictorOpsTimeLine class on line 14. If you would like
to add any custom fields to the code you will need to include them as an
additional data.put in the VictorOpsTimeLine class and in all instances
of VictorOpsTimeLine.caseToVictor which is in every class and trigger.

-  First thing you want to add are the three Apex Classes. On the left
   hand side bar look for Custom Code >>Apex Classes. You can also
   search for Apex Classes in the Quick Find tool.

   -  Once on the Apex Classes page, use the New button to add each one
      of the classes.
   -  Make sure you add all three, starting with `VictorOpsTimeLine Apex
      Class <https://github.com/victorops/monitoring_tool_releases/blob/master/VictorOps-salesforce/VictorOpsTimeLine%20Apex%20Class>`__
      then `VO Alert Test
      Class <https://github.com/victorops/monitoring_tool_releases/blob/master/VictorOps-salesforce/VO%20Alert%20Test%20Class>`__
      and `Resolve Case Test
      Class <https://github.com/victorops/monitoring_tool_releases/blob/master/VictorOps-salesforce/Resolve%20Case%20Test%20Class>`__.

..image/_images/spoc/Screen-Shot-2022-04-22-at-1.32.38-PM.png

-  Secondly, you will want to add the **Triggers**.

   -  For that, Look for the **Object Manager** tab next to the **Home**
      tab, click on that to go to the page.
   -  Once in the Object Manager Page look for the **Case** object.

..image/_images/spoc/Screen-Shot-2022-04-22-at-1.45.38-PM.png

-  Once you open the Case Object page, look on the left side
   for **Triggers**.
-  Open the Triggers page and look for the **New** button on the right
   side. Add the code from the Github page. Make sure you delete any
   code that was there before when you first open it.
-  Make sure you add both `VO Alert Apex
   Trigger <https://github.com/victorops/monitoring_tool_releases/blob/master/VictorOps-salesforce/VO%20Alert%20Apex%20Trigger>`__
   and `Resolve Case Apex
   Trigger <https://github.com/victorops/monitoring_tool_releases/blob/master/VictorOps-salesforce/Resolve%20Case%20Apex%20Trigger>`__.

..image/_images/spoc/Screen-Shot-2022-04-22-at-1.51.53-PM.png

 

Once you add all the Apex Classes and Triggers into your Salesforce
Sandbox you can deploy it as a ‘change set' or use the Force IDE. More
information regarding deploying Apex code to production can be found
`here <https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_deploying.htm>`__.
