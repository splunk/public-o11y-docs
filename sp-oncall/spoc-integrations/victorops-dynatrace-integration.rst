**Note: this integration is for the tool formerly known as Ruxit.** 

Dynatrace monitors your applications, so you don't have to.
Dynatrace automatically monitors your applications, analyzes problems,
and notifies you when something goes wrong.

The following will walk you through the process to integrate your
Dynatrace notifications with VictorOps.

**In VictorOps**
----------------

In VictorOps, select *Settings >> Alert Behavior >> Integrations >>
Dynatrace*\ **.** |image

If the integration has not yet been enabled, click the “Enable
Integration” button to generate your endpoint URL as seen below.  Be
sure to replace the “$routing_key” section with the actual routing key
you intend to use. (To view or configure route keys in VictorOps,
click *Alert Behavior >> Route Keys*)

..image images/Integrations_-_VictorOps_Demo_20.png

 

**In Dynatrace**
----------------

From the Dynatrace home screen, select the *Settings* option from the
toolbar:

.. figure:: images/dyna2.png
   :alt: dyna2

   dyna2

From the *Settings* menu, under the *Integration* section,
choose *Problem notifications* and click on *Set up notifications*.

.. figure:: images/dyna3.png
   :alt: dyna3

   dyna3

Choose the VictorOps integration.

.. figure:: images/dyna4.png
   :alt: dyna4

   dyna4

Give the integration a name and paste in the API key and the desired
routing key from VictorOps, then click *Save.*

.. figure:: images/dyna5.png
   :alt: dyna5

   dyna5

.. |image1 images/settings-alert-behavior-integrations-e1480978368974.png
