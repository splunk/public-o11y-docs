`OpsDash <https://www.opsdash.com/>`__ monitors your servers, services,
databases, and application metrics.  The following guide will walk you
through the steps needed to integrate the two systems.

**In VictorOps**
----------------

From the VictorOps web portal select **Settings** >> **Alert Behavior**
>> **Integrations**

.. image:: images/Integration-ALL-FINAL.png

Select the **OpsDash** integration and copy the **Service API
Endpoint** to your clipboard.

.. image:: images/OpsDash-final.png

Make sure to add the appropriate `Routing
Key <https://help.victorops.com/knowledge-base/routing-keys/>`__ to the
end of the URL.

**In OpsDash**
--------------

In Scalyr, select on the **System Settings** tab, then **expand** next
to the VictorOps Integration.

.. image:: images/OpsDash_integrations_settings.png

Next, paste the **Service API Endpoint** from the “In VictorOps” section
into the “REST URL” field and click **UPDATE**.

.. image:: images/OpsDash_integrations_REST.png

Click on the **Notifications** tab, then click **add another** under
“Notification Rules”.

.. image:: images/OpsDash_integrations_notifications.png

In the “Add New Rule” window, select **VictorOps** from the dropdown
menu, click **Add**, then click **Save**.

.. image:: images/OpsDash_integrations_rules.png

Now you can set up a test alert in OpsDash to verify that the
integration is working.  Click any source to open its dashboard.  Click
any graph.  Scroll down and click the metric you want to alert on. 
Scroll down and add alert thresholds.  Add a value that will trigger an
alert immediately.  Be sure to click save on the right hand side.

Within a minute or so, your alert should be generated in OpsDash.  If
not, you may need to adjust your threshold settings.  You should now
begin seeing OpsDash alerts in your VictorOps timeline.

If you have any questions please contact `VictorOps
Support <mailto:Support@victorops.com?Subject=OpsDash%20VictorOps%20Integration>`__.
