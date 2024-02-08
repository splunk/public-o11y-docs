Pingometer is a service that monitors the uptime, downtime, and
performance of websites. The following guide will walk you through the
necessary steps to integrate your Pingometer alerts with VictorOps.

**In VictorOps:**
-----------------

In VictorOps, select **Settings** *>>* **Alert Behavior** *>>*
**Integrations** *>>* **Pingometer** |image

If the integration has not yet been enabled, click the “Enable
Integration” button to generate your endpoint URL as seen below.  Be
sure to replace the “$routing_key” section with the actual routing key
you intend to use. (To view or configure route keys in VictorOps,
click *Alert Behavior >> Route Keys*)

..image images/Pingometer-final.png

**In Pingometer:**
------------------

From the main Dashboard select **Account.**

.. figure:: images/Pingometer3-.png
   :alt: pingometer3

   pingometer3

From the Account page select **Extras.**

.. figure:: images/Pingometer4-.png
   :alt: pingometer4

   pingometer4

Near the bottom of the page find the “VICTOROPS” option and
select **Manage.**

.. figure:: images/Pingometer5-.png
   :alt: pingometer5

   pingometer5

Paste in your VictorOps API key that you have copied to your clipboard,
and set the status to **ON**.

.. figure:: images/Pingometer6.png
   :alt: pingometer6

   pingometer6

Alerts can then be routed to specific teams in VictorOps based on the
different “Monitors” in Pingometer. To do so, select **Monitors** and
then hit the dropdown next to the monitor you want to use and
select **Edit.**

.. figure:: images/Pingometer7.png
   :alt: pingometer7

   pingometer7

Select **Advanced**

.. figure:: images/Pingometer8.png
   :alt: pingometer8

   pingometer8

Near the bottom you will have an option to enter your `VictorOps Routing
Key <http://victorops.force.com/knowledgebase/articles/Getting_Started/Incident-Routing/>`__ 

.. figure:: images/Pingometer9.png
   :alt: pingometer9

   pingometer9

Hit submit and you are done!

.. |image image:: /_images/Integration-ALL-FINAL.png
