Riemann aggregates events from your servers and applications with a
powerful stream processing language.  The following guide will walk you
through this integration.

In VictorOps
============

From the VictorOps web portal, select **Settings** >> **Alert
Behavior** >> **Integrations**

..image images/Integration-ALL-FINAL.png

Select the **Riemann** integration option.

..image images/Riemann-final.png

Copy the **Service API Key** to the clipboard.

..image images/Riemann-2-final.png

In Riemann
==========

In the Riemann configuration file (“etc/riemann.config” for example),
add the following code to configure Riemann to send alerts to VictorOps.
 Make sure to use your API key from the “In VictorOps” section and the
actual routing key you intend to use.

(let [vo (victorops “1394aab4-XXXXX-XXXX-XXXX-XXXXXXXXXXXX”
“Sample_route”)] (streams (changed-state (where (state “info”) (:info
vo)) (where (state “warning”) (:resolve vo)) (where (state “critical”)
(:critical vo)) (where (state “ok”) (:recovery vo)))))

Restart Riemann from your Riemann directory in the command line.

$ bin/riemann etc/riemann.config

Alerts from Riemann should now appear in VictorOps as they are
generated.  To test that the integration is working properly, manually
trigger an alert in Riemann with the following steps (assumes you have
installed riemann-client as detailed in the `Riemann
Quickstart <http://riemann.io/quickstart.html>`__).

Start irb from the command line in your Riemann directory.

$ irb -r riemann/client

Enter these two commands into the irb prompt.

irb> r = Riemann::Client.new irb> r << { host: “www1”, service: “http
req”, metric: 2.53, state: “critical”, description: “Request took 2.53
seconds.”, tags: [“http”]}

Confirm that the alert is displayed in your VictorOps timeline.

..image images/Timeline_-_vops_davetesting-1.png

You have completed setting up this integration.  If you have any
questions, please contact `VictorOps
support <mailto:Support@victorops.com?Subject=Riemann%20VictorOps%20Integration>`__.
