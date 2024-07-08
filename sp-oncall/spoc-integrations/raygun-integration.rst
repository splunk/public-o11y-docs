Raygun integration for Splunk On-Call
**********************************************************

Raygun gives developers meaningful insights into problems affecting
their applications. Discover issues - Understand the problem - Fix
things faster. This integration between VictorOps and Raygun allows you
to send all your Raygun alerts into the VictorOps timeline so the right
person gets notified and you can collaborate with your team.

**In VictorOps**
----------------

In VictorOps, select **Settings** *>>* **Alert Behavior** *>>*
**Integrations** *>>* **Raygun** |image1|

If the integration has not yet been enabled, click the “Enable
Integration” button to generate your endpoint URL as seen below.  Be
sure to replace the “$routing_key” section with the actual routing key
you intend to use. (To view or configure route keys in VictorOps,
click *Alert Behavior >> Route Keys*)

 

.. image:: /_images/spoc/Raygun-final.png

**In Raygun**
-------------

Select **Integrations** from the left side bar. 

.. image:: /_images/spoc/Raygun-Inte@2x.png

Select the **VictorOps** icon.

.. image:: /_images/spoc/Raygun-VO-App@2x.png

Select the **Setup** tab and then enter in your VictorOps API key and
Routing Key.

.. image:: /_images/spoc/Raygun4.png
   :alt: raygun4

   raygun4

Make sure to **Test** the integration, this will send an alert into your
VictorOps timeline.

Finally select **Save Changes** and you are done!

If you have any questions please reach out to support@victorops.com.

.. |image1| image:: /_images/spoc/Integration-ALL-FINAL.png
