[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Required: Phantom Implemented Environment**

**Splunk On-Call Version Required: Starter, Growth,** or **Enterprise**

[/ht_toggle]

The Phantom platform combines security infrastructure orchestration,
playbook automation, and case management capabilities to integrate your
team, processes and tools together.

The Splunk On-Call (formerly VictorOps) integration with Phantom makes
use of our REST API and requires that you've implemented Phantom in your
environment. The following is a brief walkthrough on how to enable and
configure the integration.

--------------

**In Splunk On-Call**
---------------------

Phantom integrates with the Splunk On-Call REST Endpoint to trigger,
update, or resolve incidents in Splunk On-Call.

In Splunk On-Call navigate to **Integrations** *>>* **Phantom**

If the integration has not yet been enabled, click the **Enable
Integration** button. Copy the integration URL somewhere useful.

You will also need to copy your Splunk On-Call **API Key** and **API
ID** by navigating to  **Integrations** *>>* **API**

These three variables are necessary to configure a Splunk On-Call asset
in Phantom.

--------------

**In Phantom**
--------------

Download the Splunk On-Call (formerly VictorOps) rpm package by
navigating to **Phantom Apps**, search or scroll for **VictorOps** and
press the green **Download** button. Depending on your version of
Phantom, the VictorOps app may already be installed.

.. image:: /_images/spoc/Apps_for_Phantom_edit.png

From within the Phantom UI, navigate to **Apps** >> **Install App** and
drop the .rpm package in the available window. Keep in mind, VictorOps
may already be available in the **Unconfigured Apps** section. You can
check by searching VictorOps in the available search bar.

.. image:: /_images/spoc/Phantom_Apps_Install_edit.png

Next, navigate to **Apps** >> **Unconfigured Apps** >> **VictorOps** >>
**Configure New Asset**.

.. image:: /_images/spoc/phantom_configure_new_asset.png

It will open on the **Asset Info** tab, fill in any **Asset name** and
**Asset description**.

.. image:: /_images/spoc/asset_config_1.png

Then hit the **Asset Settings** tab to fill in the **API ID**, **API
Key**, and **Endpoint URL** copied earlier from VictorOps then hit
**Save**.

.. image:: /_images/spoc/asset_config2.png

Once Saved, the option to **Test Connectivity** will be available and if
everything is configured correctly, you will get a success message
similar to below.

.. image:: /_images/spoc/test_connectivity_2.png

At this point, you are successfully integrated and can configure the
VictorOps asset to perform actions according to applicable playbooks.

**Supported Actions**
---------------------

create incident - Create an incident on Splunk On-Call (formerly
VictorOps) update incident - Update timeline of an existing incident in
Splunk On-Call list teams - Get list of teams configured on Splunk
On-Call list users - Get list of users configured on Splunk On-Call list
incidents - Get list of incidents on Splunk On-Call list oncalls - Get
all on-call users/teams on Splunk On-Call list policies - Get list of
policies configured on Splunk On-Call list routing - Get list of routing
keys and associated teams on Splunk On-Call
