BMC TrueSight Pulse integration for Splunk On-Call
**********************************************************

[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported: N/A (SaaS)**

**VictorOps Version Required:** Starter, Growth, or Enterprise

[/ht_toggle]

BMC TrueSight Pulse (formerly
`Boundary <http://www.boundary.com/>`__) is a one stop shop for all of
your metrics. It provides easy-to-use alarms, which will be triggered
when the monitored metric goes above (or below) the defined threshold.
Each alarm can be connected to one or more “Actions”, so users can be
notified when an alarm status changes.

BMC TrueSight Pulse users can now send their alerts to Splunk On-Call
using an “Action”. The following steps walk through the implementation
process.

In Splunk On-Call
-----------------

From the main timeline select **Integrations** *>>* **BMC Truesight
Pulse.**

If the integration has not yet been enabled, click the “Enable
Integration” button.  Copy the “Service API Key” to your clipboard.

.. image:: /_images/spoc/Integration-BMC-page-final.png

--------------

In BMC Truesight Pulse
----------------------

First, add the Splunk On-Call “Action” to your BMC Truesight Pulse
account. Click “Settings” on left toolbar to open the dialog and go to
Actions tab. Click on the “Add Action” button and select “VictorOps” on
the next screen and click “Add”.\ 

 |bmc1| image |bmc2| image

Give the “Action” a name, paste in your API key, select the severity
level and add your Routing Key. Now hit save and you are done setting up
the VictorOps “Action”. 

|bmc5|

Now you can use the VictorOps action with
any of your BMC Truesight Pulse Alarms.

`Boundary
Documentation <https://help.boundary.com/hc/en-us/articles/202425491>`__

.. |bmc1| image:: /_images/spoc/BMC1.png
.. |bmc2| image:: /_images/spoc/BMC2.png
.. |bmc5| image:: /_images/spoc/BMC5.png
