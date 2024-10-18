.. _dotcom-spoc:

Dotcom monitor integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Dotcom monitor integration for Splunk On-Call.

This guide provides instructions on how to activate the alerting integration between Dotcom monitor and Splunk On-Call. The Splunk On-Call integration with dotcom monitor creates an incident in the Splunk On-Call timeline whenever a Dotcom monitor alert is triggered.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

Configuration
=========================

1.  Log in to Dotcom monitor portal.
2.  Select :guilabel:`Configure`, :guilabel:`Alert Templates`, :guilabel:`Create Template`.

   |image1|

   |image2|

3.  Delete the prepopulated content in the Alert Template and enter the following information for the :guilabel:`Error Source`, :guilabel:`Test Source` and :guilabel:`Uptime Source` fields:

   +-----------------------------------+-----------------------------------+
   | Name                              | Name entered here                 |
   +===================================+===================================+
   | Email Subject                     | N/A                               |
   +-----------------------------------+-----------------------------------+
   | Email Reply-tp                    | Email entered here                |
   +-----------------------------------+-----------------------------------+
   | Type                              | Txt                               |
   +-----------------------------------+-----------------------------------+
   | Error Source                      | {“message_type”:”c                |
   |                                   | ritical”,”monitoring_tool”:”Dotco |
   |                                   | m-Monitor”,”state_message”:”Error |
   |                                   | occurred during the device        |
   |                                   | monitoring at                     |
   |                                   | <%Monitor_DateTime%> Monitoring   |
   |                                   | location:<%Locatio                |
   |                                   | n%>”,”entity_id”:”<%Site_Name%>”} |
   +-----------------------------------+-----------------------------------+
   | Test Source                       | {“message_type”:”                 |
   |                                   | critical”,”monitoring_tool”:”Dotc |
   |                                   | om-Monitor”,”state_message”:”Test |
   |                                   | message”,”entity_id”:”Test        |
   |                                   | message”}                         |
   +-----------------------------------+-----------------------------------+
   | Uptime Source                     | {“message_type”:”re               |
   |                                   | covery”,”monitoring_tool”:”Dotcom |
   |                                   | -Monitor”,”state_message”:”Device |
   |                                   | <%Site_Name%> detected to be back |
   |                                   | online at <%Monitor_DateTime%>    |
   |                                   | from monitoring location:         |
   |                                   | <%Locatio                         |
   |                                   | n%>”,”entity_id”:”<%Site_Name%>”} |
   +-----------------------------------+-----------------------------------+

   .. image:: /_images/spoc/DM-3-final-1.png

4.  Select :guilabel:`Update` to save your Alert Template.

5.  Select :guilabel:`Configure / Alert Templates` from the menu and then select the newly created Splunk On-Call Alert. Get your Template ID from the URL field and save it, as you need later.

   |image3|

6.  In Splunk On-Call, as an Admin user, select :guilabel:`Integrations`, :guilabel:`Dotcom-Monitor`.

7.  If the integration isn't active, select :guilabel:`Enable Integration` to generate your endpoint URL. Make sure to replace the ``$routing_key`` section with the routing key you intend to use.

   |image4|

8.  Create or edit a team and add the users who should receive alerts. Add an escalation policy. Note that routing keys appear after you've completed the routing key configuration.

   |image5|

9.  Add a routing key using the :guilabel:`Add Key`, named curl. Then add the escalation policy. Set the Default Routing Policy.

   |image6|

12. Go back into Dotcom monitor and edit your device. Navigate to the :guilabel:`Alert Options` section and select the custom script file. Add the following value into the :guilabel:`Custom Script` field:

   ``Url_PostExecutor.cs “<Service API Endpoint/Routing Key>” “<Template ID>”``

   For example:

   ``Url_PostExecutor.cs “https://alert.victorops.com/integrations/generic/20131114/alert/aa57b71c-8374-48ef-a649-fe15ed19a88ff/CURL” “1416”``

   .. image:: /_images/spoc/Screen-Shot-2018-01-12-at-1.25.27-PM.png

13. Select :guilabel:`Update` to save this configuration.

Test the integration
==========================

1. Select :guilabel:`Send test alert`. The screenshot shows how to initiate the send of your test alert.

   |image7|

2. Go back to your Splunk On-Call account and make sure that you are viewing the Timeline. Check if the alert has been received.

   |image8|

.. |image1| image:: /_images/spoc/DM-1-final-1.png
.. |image2| image:: /_images/spoc/DM-2-final-2.png
.. |image3| image:: /_images/spoc/DM-url-skitch.png
.. |image4| image:: /_images/spoc/Dotcom-Monitor-VO2-8-final.png
.. |image5| image:: /_images/spoc/Screen-Shot-2018-01-12-at-1.46.46-PM.png
.. |image6| image:: /_images/spoc/Screen-Shot-2018-01-12-at-1.13.51-PM.png
.. |image7| image:: /_images/spoc/Screen-Shot-2018-01-12-at-1.31.35-PM.png
.. |image8| image:: /_images/spoc/Screen-Shot-2018-01-12-at-1.34.17-PM.png
