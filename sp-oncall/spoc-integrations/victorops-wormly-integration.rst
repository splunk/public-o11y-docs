Wormly offers server monitoring, website monitoring and uptime
monitoring to keep you online and performing fast. The integration
between Wormly and VictorOps utilizes the generic email endpoint to send
alerts from Wormly into the VictorOps timeline. Below is a short guide
explaining how to set up this simple integration.

 

1. From the Wormly UI select ‘Alerts' and then ‘Contacts' |image
2. Next select ‘+ Create New Contact' and click on the Email contact
   type. Then enter a name for the contact (VictorOps Timeline for
   example). |image2|
3. In VictorOps, select *Settings >> Alert Behavior >> Integrations >>
   Wormly*\ **.** |image3|\ If the integration has not yet been enabled,
   click the “Enable Integration” button to generate your endpoint URL
   as seen below.  Be sure to replace the “$routing_key” section with
   the actual routing key you intend to use. (To view or configure route
   keys in VictorOps, click *Alert Behavior >> Route Keys*)\ |image4|
4. Copy the email string and make sure to put in the appropriate routing
   key after the ‘+' sign so that all Wormly alerts are sent to the
   right teams. |image5|
5. Paste the email address into the Email field in Wormly and click Send
   Test. You should get a result like the one pictured here. |image6|
6. Hit ‘Update' and you are done.

.. |image image:: /_images/wormly-integration@2x.png
.. |image2| image:: /_images/wormly-2@2x.png
.. |image3| image:: /_images/Integrations@2x.png
.. |image4| image:: /_images/Integrations_-_VictorOps_Demo_7.png
.. |image5| image:: /_images/wormly-3@2x.png
.. |image6| image:: /_images/800x320@2x-1.png
