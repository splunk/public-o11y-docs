Statuscake integration for Splunk On-Call
**********************************************************

StatusCake delivers accurate global website monitoring for tens of
thousands of customers. No false positives, industry leading support and
a ground breaking feature set. The VictorOps integration with StatsCake
allows you to send alerts into the VictorOps timeline. The following
will walk you through these easy to set up integration.

**In VictorOps**
----------------

From the main timeline select **Settings** >> **Alert
Behavior** >> **Integrations**

.. image:: /_images/spoc/Integration-ALL-FINAL.png

Select the **StatusCake** integration.

.. image:: /_images/spoc/StatusCake-final.png

Copy the entire REST Endpoint URL to your clipboard.

.. image:: /_images/spoc/StatusCake-2-final.png

**In StatusCake**
-----------------

From the main web app, select **Integrations** in the left sidebar, then
select VictorOps from the drop down menu, enter in your REST Endpoint
URL and give it an Alias. Finally select “ADD NEW 3RD PARTY NOTIFICATION
SERVICE”.

.. image:: /_images/spoc/StatusCake4.png
   :alt: statuscake4

   statuscake4

You can then test the integration, and an info message will be sent into
the VictorOps timeline.

.. image:: /_images/spoc/StatusCake5.png
   :alt: statuscake5

   statuscake5

.. image:: /_images/spoc/StatusCake6.png
   :alt: statuscake6

   statuscake6

You're done. If you have any questions please contact `VictorOps
support <mailto:support@victorops.com?Subject=StatusCake%20VictorOps%20Integration>`__.
