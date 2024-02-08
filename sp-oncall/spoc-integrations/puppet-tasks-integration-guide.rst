About VictorOps and Puppet Tasks
--------------------------------

The VictorOps and `Puppet
Tasks <https://puppet.com/docs/puppet/5.3/puppet_tasks.html>`__ integration
allows teams to identify and quickly take action around infrastructure
incidents. Send alerts into VictorOps so teams can collaborate around
the fix for the incident, then use Puppet Tasks to run actions that help
resolve problems within your remote infrastructure. DevOps and IT teams
can maintain a speedy software development and CI/CD pipeline while
continuing to drive reliability with the VictorOps and Puppet Tasks
integration.

Combine the visibility and collaboration of VictorOps with the
capability to quickly automate and run commands with Puppet Tasks.

Alert, Collaborate, and Remediate Critical Incidents

-  Allow VictorOps to digest critical alerts from remote infrastructure,
   then leverage Puppet Tasks to initiate actions to remediate incidents
-  Centralize on-call incident management functionality–on-call
   scheduling, alert routing, and escalations–with actionable incident
   response and collaboration
-  Work cross-functionally to communicate about infrastructure errors
   and alerts
-  Automate alerting and on-call response workflows and run commands
   through remote infrastructure to efficiently resolve incidents and
   keep track of incident history

[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported: Puppet Enterprise 2018.1.1+**  or newer

**VictorOps Subscription Required:** **Full-Stack**

**Local Machine:** None

[/ht_toggle]

**Enable Puppet Tasks in VictorOps**
------------------------------------

From the VictorOps web portal, select **Settings** >> **Alert
Behavior**, >> **Integrations**. Find and select **Puppet Tasks**.

.. image:: /_images/spoc/voNav@2x.png
   :alt: enable puppet tasks integration in victorops

   enable puppet tasks integration in victorops

**Capture the API Key from the URL String:**

.. image:: /_images/spoc/voPuppet@2x.png
   :alt: capture puppet tasks api key

   capture puppet tasks api key

**Configure Puppet Tasks in Splunk Enterprise**
-----------------------------------------------

Navigate to **Puppet Tasks for Actionable Alerts in Splunk Enterprise**
>> **Configuration** >> **Add-on Setting**  >> Input VictorOps Token

.. image:: /_images/spoc/splPupNav@2x.png
   :alt: Configure puppet tasks in splunk enterprise

   Configure puppet tasks in splunk enterprise

**Create a VictorOps Incident**
-------------------------------

Within Splunk Enterprise, go to the Alerts Tab, set up a search for a
critical event, and specify the type of notification you would like to
pass to VictorOps. Configure the action using the following values:

-  Severity: CRITICAL
-  Host: :math:`certname`

.. image:: /_images/spoc/splPupAlert@2x.png
   :alt: Trigger alert in VictorOps via puppet tasks

   Trigger alert in VictorOps via puppet tasks

Upon triggering this alert, you should see a corresponding alert in your
VictorOps timeline.

.. image:: /_images/spoc/voAlert@2x.png
   :alt: puppet tasks alert in victorops

   puppet tasks alert in victorops
