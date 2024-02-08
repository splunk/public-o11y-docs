Puppet Enterprise integration for Splunk On-Call
**********************************************************

The VictorOps and `Puppet
Enterprise <https://puppet.com/products/puppet-enterprise>`__ integration
helps you deploy reliable software faster. Puppet Enterprise helps you
automate more of the infrastructure management and software delivery
lifecycle. Then, you can automatically send alerts into VictorOps so
your team can collaborate around actionable alert context. Improve
productivity and visibility of your team while enforcing configuration
state with the VictorOps and Puppet Enterprise integration.

Move workloads to any modern infrastructure and manage deployments with
Puppet Enterprise while continuing to monitor system health, alert on
issues, and collaborate in VictorOps. Leveraging the power of the
VictorOps and Puppet Enterprise integration allows your team to focus on
innovation, not maintenance.

Manage DevOps and IT infrastructure across the entire software delivery
and incident lifecycle with the VictorOps and Puppet Enterprise
integration.

**Bolster CI/CD with Automation, Transparency, and Deeper
Collaboration**

-  Automated provisioning and infrastructure automation happens in
   Puppet Enterprise with associated intelligent alerts sent into
   VictorOps when necessary
-  Manage tasks, code, role-based access, and nodes through Puppet
   Enterprise and collaborate around related issues in VictorOps
-  Send Puppet Enterprise reports and visualizations into the VictorOps
   timeline to provide additional alert context in-line with chat
   functionality
-  Orchestrate deployments and incident remediation through automated
   processes in Puppet Enterprise while humans collaborate and maintain
   visibility in VictorOps

[ht_toggle title=“Requirements” id=“” class=“” style=“” ]

**Versions Supported: Puppet Enterprise 2018.1.1+**  or newer

**VictorOps Subscription Required:** **Full-Stack**

**Local Machine:** None

[/ht_toggle]

**Enable Puppet Enterprise in VictorOps**
-----------------------------------------

From the VictorOps web portal, select **Settings**, then **Alert
Behavior**, then **Integrations**. Find and select the **Puppet
Enterprise** integration option.

.. image:: /_images/spoc/voNav@2x.png
   :alt: Find Puppet Enterprise integration in VictorOps

   Find Puppet Enterprise integration in VictorOps

Capture the API Key from the URL String:

.. image:: /_images/spoc/PuppetEnterprise1@2x.png

**Configure Puppet Enterprise in Splunk Enterprise**
----------------------------------------------------

Navigate to **Puppet Enterprise Add-on in Splunk Enterprise** >>
**Configuration** >> **Add-on Setting**  >> Input VictorOps Token

**Creating a VictorOps Incident**
---------------------------------------------------------------------------------------------

Within Splunk Enterprise goto the Alerts Tab and setup the search and
type of notification you would like to pass to VictorOps. Configure the
action using the following values:

-  Message Type : *CRITICAL*
-  Alert Entity ID: *:math:`certname`*
-  State Message: *:math:`result.certname`*

Variables which can be used in your notification can be found
`HERE <http://docs.splunk.com/Documentation/Splunk/7.1.3/AdvancedDev/ModAlertsLog>`__.

.. image:: /_images/spoc/splPupAlert@2x-2.png
   :alt: create an incident victorops puppet enterprise variable configuration
