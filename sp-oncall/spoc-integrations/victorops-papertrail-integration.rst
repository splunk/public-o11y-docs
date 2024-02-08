Papertrail offers frustration-free log management. Seamlessly manage
logs from apps, servers, and cloud services. The following will guide
you through the VictorOps integration with Papertrail.

**In VictorOps**
----------------

From the main timeline select **Settings** >> **Alert
Behavior** >> **Integrations**

..image:: /_images/spoc/Integration-ALL-FINAL.png

Select the **Papertrail** integration and copy the “Service API Key” to
your clipboard.

..image:: /_images/spoc/Papertrail-final.png

 

**In Papertrail**
-----------------

From the **Events** screen select **Create Alert**.

..image:: /_images/spoc/All_Systems_—_Example_Alert_—_Papertrail.png

 

Select the **VictorOps** integration option under **Monitoring &
Notifications**.

..image:: /_images/spoc/Example_Alert_—_Papertrail.png

 

Paste in your “Service API Key” into the box labeled “REST Endpoint API
Key”. In addition place in the appropriate `Routing
Key <https://help.victorops.com/knowledge-base/routing-keys/>`__ and
“Message Type”. The “Message Type” options are listed in the Papertrail
UI - “critical”, “warning”, “info”.

..image:: /_images/spoc/Create_Alert_—_Papertrail.png

Select **Create Alert** and you are done.

If you have any questions please contact `VictorOps
support <mailto:Support@victorops.com?Subject=Papertrail%20VictorOps%20Integration>`__.
