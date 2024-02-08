Litabot integration for Splunk On-Call
**********************************************************

Please note: This is **not** an officially supported integration.

This Lita adapter allows your bot to join your VictorOps timeline by
leveraging the VictorOps Hubot Integration Endpoint. You can then
address Lita with timeline chat messages in the usual way:

::

   @lita karma worst

` <https://github.com/civichacker/lita-victorops#installation>`__\ Installation
-------------------------------------------------------------------------------

You may install LitaBot according to these instructions:
https://github.com/civichacker/lita-victorops

Add lita-victorops to your Lita instance's Gemfile:

gem “lita-victorops”

` <https://github.com/civichacker/lita-victorops#configuration>`__\ Configuration
---------------------------------------------------------------------------------

` <https://github.com/civichacker/lita-victorops#required>`__\ Required
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  ``token`` (String) – Your Lita instance will need a login key to
   connect to VictorOps. You key is available at the “Hubot” link of
   your VictorOps Integrations page.

` <https://github.com/civichacker/lita-victorops#example>`__\ Example
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Lita.configure do \|config\| config.robot.mention_name = ‘lita'
config.robot.adapter = “victorops” config.adapters.victorops.token =
ENV[‘VICTOROPS_TOKEN'] end
