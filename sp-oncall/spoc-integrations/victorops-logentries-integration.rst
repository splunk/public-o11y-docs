Logentries offers real-time log management and analytics at any scale.
This integration allows you to send tagged Logentries alerts into
VictorOps using the `Generic Email
Endpoint <https://help.victorops.com/knowledge-base/victorops-generic-email-endpoint/>`__.

The following guide will walk you through the steps needed to implement
this integration.

**In VictorOps**
----------------

In VictorOps, select **Settings** *>>* **Alert Behavior** *>>*
**Integrations** *>>* **Logentries** |image

If the integration has not yet been enabled, click the “Enable
Integration” button to generate your endpoint URL as seen below.  Please
copy that to your clipboard and be sure to replace the “$routing_key”
section with the actual routing key you intend to use. (To view or
configure route keys in VictorOps, click *Alert Behavior >> Route Keys*)

..image images/Integrations_-_VictorOps_Demo_19.png

 

**In Logentries**
-----------------

From the main dashboard, select **Tags & Alerts** from the left sidebar.

.. figure:: images/log2.png
   :alt: log2

   log2

Either edit an existing Tag or create a new one.

When naming the Tag, append the VictorOps severity level you want for
that alert. For example appending the term “warning” will create a
warning alert in VictorOps, appending the term “critical” will create a
critical incident in VictorOps (see example below).

.. figure:: images/log3.png
   :alt: log3

   log3

Add your VictorOps email endpoint (copied from earlier steps) to the
email addresses being notified by the Logentries “Alert Tag”.

.. figure:: images/log4.png
   :alt: log4

   log4

Now whenever the search is matched, and alert will be sent to the
VictorOps timeline with the associated severity level.

.. figure:: images/log5.png
   :alt: log5

   log5

.. |image image:: images/Integration-ALL-FINAL.png
