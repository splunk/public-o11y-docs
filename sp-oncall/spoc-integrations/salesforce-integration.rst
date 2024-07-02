.. _salesforce-integration-spoc:

Salesforce integration for Splunk On-Call
**********************************************************

.. meta::
   :description: Configure the Salesforce integration for Splunk On-Call.

Requirements
==========================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Essential
- Full-Stack 

This integration is for Salesforce service cloud users with access to
the developer tools. The integration triggers an incident in VictorOps
upon the creation of a case in Salesforce and then resolves it when the
case is closed. The following is a step-by-step walkthrough of how to
configure the integration.

Configuration in Splunk On-Call
-------------------------------

In Splunk On-Call, navigate to :guilabel:`Integrations` and select the
Salesforce icon from the list of available integrations.

On the resulting page, select :guilabel:`Enable Integration`. This reveals
the :guilabel:`Service API Endpoint`. Copy this endpoint and replace ``$routing_key`` with the appropriate routing key that you intend to use for this integration.

Configuration in Salesforce
-------------------------------

To make a POST request to a remote site from Salesforce, you
need to add ``http://alert.victorops.com`` as a remote site. On the left
side toolbar of the Admin page, look for :guilabel:`Security`, then :guilabel:`Remote Site Settings`, then :guilabel:`New Remote Site`.

You can also use the Quick Find search tool to search for Remote Site
Settings.

.. image:: /_images/spoc/Screen-Shot-2022-04-22-at-1.20.08-PM.png
   :alt: The quick find search tool in Salesforce. An arrow points to a button stating "Remote Site Settings".

The Apex Code
-----------------

There are five blocks of Apex code utilized to accomplish this
integration, all of which are in :new-page:`this GitHub Repository <https://github.com/victorops/monitoring_tool_releases/tree/master/VictorOps-salesforce>`.

The VictorOpsTimeLine class contains the logic to both parse the JSON
and make the HTTP POST request. There are also two triggers (one for
CRITICAL alerts and one for RECOVERY), and both require a test class before you push them to production.

Configuration
-----------------

Before adding the code to Salesforce, retrieve your
:guilabel:`api_key` and appropriate :guilabel:`routing_key` to the POST request endpoint
URL found in the VictorOpsTimeLine class on line 14. To add any custom fields to the code, include them as an
additional data.put in the VictorOpsTimeLine class and in all instances
of VictorOpsTimeLine.caseToVictor, which is in every class and trigger.


Add Apex classes
^^^^^^^^^^^^^^^^^^^^^^^^

#. In the navigation bar, look for :guilabel:`Custom Code`, then :guilabel:`Apex Classes`. You can also search for Apex Classes in the Quick Find tool.
#. Once on the Apex Classes page, use the :guilabel:`New` button to add each of the classes.
#. Add the following classes, in order:

   - :new-page:`VictorOpsTimeLine Apex Class <https://github.com/victorops/monitoring_tool_releases/blob/master/VictorOps-salesforce/VictorOpsTimeLine%20Apex%20Class>`
   - :new-page:`VO Alert Test Class <https://github.com/victorops/monitoring_tool_releases/blob/master/VictorOps-salesforce/VO%20Alert%20Test%20Class>`
   - :new-page:`Resolve Case Test Class <https://github.com/victorops/monitoring_tool_releases/blob/master/VictorOps-salesforce/Resolve%20Case%20Test%20Class>`

.. image:: /_images/spoc/Screen-Shot-2022-04-22-at-1.32.38-PM.png
   :alt: The Apex classes menu with each class added. An arrow points to a gray button stating "New".

Add triggers
^^^^^^^^^^^^^^^^^^^^^^^^

#. Add the :guilabel:`Triggers`. 
#. Look for the :guilabel:`Object Manager` tab next to the :guilabel:`Home`tab. Select it to go to the page.
#. Once in the Object Manager Page look for the :guilabel:`Case` object.

.. image:: /_images/spoc/Screen-Shot-2022-04-22-at-1.45.38-PM.png
   :alt: The object manager menu. An arrow points to an object labeled "Case".

#. Once you open the Case Object page, select for :guilabel:`Triggers`.
#. Open the Triggers page and look for the :guilabel:`New` button. Add the code from the Github page. Make sure you delete any
   code that was there before when you first open it. Add the following code:
    
    - :new-page:`VO Alert Apex Trigger <https://github.com/victorops/monitoring_tool_releases/blob/master/VictorOps-salesforce/VO%20Alert%20Apex%20Trigger>`__
    - :new-page:`Resolve Case Apex Trigger <https://github.com/victorops/monitoring_tool_releases/blob/master/VictorOps-salesforce/Resolve%20Case%20Apex%20Trigger>`__.

.. image:: /_images/spoc/Screen-Shot-2022-04-22-at-1.51.53-PM.png
   :alt: The trigger menu with voAlert and resolveCaseVO triggers.

Once you add all the Apex Classes and Triggers into your Salesforce
Sandbox you can deploy it as a 'change set' or use the Force IDE. You can find more
information regarding deploying Apex code to production can in the :new-page:`Salesforce documentation <https://www.salesforce.com/us/developer/docs/apexcode/Content/apex_deploying.htm>`.
