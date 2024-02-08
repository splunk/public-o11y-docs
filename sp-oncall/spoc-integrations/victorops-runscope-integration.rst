[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported: N/A (SaaS)**

**VictorOps Version Required: Getting Started, Essentials,** or
**Full-Stack** -- Full Stack is required for adding alert annotations.

**What you need to know:**  Annotating the links provided by DataDog to
your incidents requires use of the Rules Engine (Enterprise only
feature)

[/ht_toggle]

`Runscope <https://www.runscope.com/>`__ allows you to log, monitor and
measure your API usage to solve API problems fast. The following steps
will walk you through the integration process. You can also refer to
Runscope's documentation on this integration
`here <https://www.runscope.com/docs/api-testing/victorops>`__.

**In VictorOps**
================

In VictorOps, select **Settings** *>>* **Alert Behavior** *>>*
**Integrations** *>>* **Runscope** |image

If the integration has not yet been enabled, click the “*Enable
Integration*” button to generate your endpoint URL as seen below. **Copy
this key** to your clipboard.

..image:: /_images/spoc/api_key@2x.png

**In Runscope**
===============

Select API tests from the tab at the top of the UI and then **select the
Test** you want to add the VictorOps integration to. In the below
example we have selected “test”.

..image:: /_images/spoc/rs_test@2x.png

From within the test select **Edit** from the side bar and then navigate
to **Integrations** and then click **View All Services**.

..image:: /_images/spoc/test_edit_integrations@2x.png

Find the **VictorOps** integration and select “*Connect VictorOps*”.

..image:: /_images/spoc/connect_vo@2x.png

Paste in your **API
Key** and `Routing Key <https://help.victorops.com/knowledge-base/reroute-an-incident/>`__\ **.** Make
sure to select “*Automatically resolve incidents when test passes*” and
to set the **Notification Threshold** to 1. Finish by clicking “*Connect
Account*” and you're done!

..image:: /_images/spoc/vo_rs_config@2x.png

Recommended Rules Engine Rules
==============================

*Note that this added feature requires Full Stack features, as it makes
use of the Rules Engine.*

In the alert details of Runscope alerts are several URLs which can
quickly link a paged user to the test in question. These alerts can be
made readily available by surfacing them as
`annotations <https://help.victorops.com/knowledge-base/transmogrifier-annotations/>`__.
The following alert rule will yield alerts of the form shown in the
screenshot. For convenience, you can copy and paste the below
information.

When **monitoring_tool** matches **Runscope**

*Annotate the alert with:*

**URL** - **Go to Test Run** - **${{test_run_url}}**

**URL** - **Go to Trigger - ${{trigger_url}}**

**URL** - **Go to Test - ${{test_url}}**

..image:: /_images/spoc/transmog@2x.png

Now your alerts will look like this!

..image:: /_images/spoc/sample-Alert@2x.png

.. |image| image:: /_images/spoc/integrations.png
