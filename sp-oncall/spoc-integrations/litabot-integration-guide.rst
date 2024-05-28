.. _litabot-integration-spoc:

Litabot integration for Splunk On-Call
**********************************************************

.. meta:: 
   :description: Congifure the Litabot integration for Splunk On-Call.

.. note:: This is not an officially supported integration.

The Lita adapter allows your bot to join your Splunk On-Call timeline by
leveraging the Splunk On-Call Hubot Integration Endpoint. You can then
address Lita with timeline chat messages using the following command:

.. code-block:: bash

   @lita karma worst

Installation
--------------

You can install LitaBot with these instructions:
:new-page:`https://github.com/civichacker/lita-victorops`.

After installation, add ``lita-victorops`` to your Lita instance's Gemfile:

.. code-block:: bash

   gem “lita-victorops”

Configuration
-------------------

To use Lita, add the Splunk On-Call integration to your application code.

Required components
~~~~~~~~~~~~~~~~~~~~~~

``token`` (String): Your Lita instance requires a login key to
connect to Splunk On-Call. You key is available at the "Hubot" link of
your Splunk On-Call Integrations page.

Example
~~~~~~~~~~~~~~~~~

.. code-block:: ruby

   Lita.configure do |config| 
      config.robot.mention_name = 'lita'
      config.robot.adapter = 'victorops'
      config.adapters.victorops.token = ENV['VICTOROPS_TOKEN'] 
   end
