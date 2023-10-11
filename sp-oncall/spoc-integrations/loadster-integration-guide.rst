[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported: N/A (SaaS)**

**VictorOps Version Required:** Getting Started, Essentials, or
Full-Stack

[/ht_toggle]

Loadster is a cloud-hybrid load testing solution for high-performance
websites and applications. Load test your sites to find bottlenecks,
improve stability, and optimize user experience.

**In VictorOps**
----------------

From the main timeline select **Integrations >> 3rd Party Integrations
>> Loadster.**

If the integration has not yet been enabled, click the “Enable
Integration” button.  Copy the “Service API Key” to your clipboard.

Once you have copied the API key to your clipboard, click
on **Settings** *>>* **Routing Keys** page to find your routing key
configuration.  Decide which routing_key will be used with this
integration and make sure it is associated to the correct escalation
policy/policies.  (You may need to create a new key)

**In Loadster**
---------------

From the main dashboard, click on the profile icon in the upper
righthand corner and then click *Integrations.*

Scroll down to VictorOps and click *Enable VictorOps*.

Next, enter the Service API Key you’d copied and (optionally) the
routing key you’d like to direct these Loadster alerts to.

**Testing the Loadster integration**
------------------------------------

Now that the integration is enabled, each time one of your Loadster
monitors fails, an incident will be created in VictorOps. Incidents
usually show up in VictorOps within a minute or two. When the same
Loadster monitor recovers, the incident will be resolved in VictorOps.

You can test this by creating a Loadster monitor that points to an
invalid location, submits invalid data, or is otherwise broken.
