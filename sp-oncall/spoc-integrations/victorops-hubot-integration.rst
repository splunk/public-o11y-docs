Hubot is your company's robot. Install it in your VictorOps timeline to
dramatically improve employee efficiency.

The Hubot - VictorOps Adapter allows your Hubot to join your VictorOps
timeline. You can then address Hubot with timeline chat messages in the
usual way. After giving your Hubot instance a name (just Hubot in the
example below) you can then address it from the timeline with or without
an @.

.. image:: /_images/spoc/hubot1.png
   :alt: hubot1

   hubot1

Configuration Steps
-------------------

1. In VictorOps, select **Integrations** *>>* **Hubot**

2. If the integration has not yet been enabled, click the “Enable
   Integration” button to generate your endpoint URL as seen below.  Be
   sure to replace the “$routing_key” section with the actual routing
   key you intend to use. (To view or configure route keys in VictorOps,
   click *Alert Behavior >> Route Keys*) |image

3. If you have not already, install Hubot according to these
   instructions: https://hubot.github.com/docs/

4. Install the VictorOps adapter directly from github:

   ::

      npm install git://github.com/victorops/hubot-victorops.git

5. Your Hubot will need a login key to connect to VictorOps. Your Hubot
   key is available at the “Hubot” link of your VictorOps Integrations
   page in step 1 above. Configuration of the key is in an environment
   variable:

   ::

      export HUBOT_VICTOROPS_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

6. Add the VictorOps adapter to your Hubot's dependencies in
   package.json:

   ::

      ...
      "dependencies": {
        "hubot-victorops": ">=0.0.2",
        ...
      }
      ...

7. Run Hubot with the VictorOps adapter:

   ::

      bin/hubot --adapter victorops

8. You may have to remove the empty hubot-scripts.json file, and `add a
   coffee-script
   dependency <https://github.com/hubotio/hubot/issues/1404>`__.
   Additionally, you can remove the “hubot-heroku-keepalive” line from
   both external-scripts.json and dependencies in package.json to avoid
   an aesthetic error message.

Hubot and the Rules Engine
--------------------------

You can annotate Hubot commands directly to take automated actions.

To accomplish this you will need an additional Hubot script that can be
found `here <https://gist.github.com/nategrieb/d0bd735c34e1870b14d0>`__.

Then you will need to add an annotation with the name “HUBOT COMMAND”
and you will be able to all Hubot programatically.

 

.. image:: /_images/spoc/hubot3.png
   :alt: hubot3

   hubot3

.. |image1| _images/spoc/Integrations-VictorOps_Demo_9.png
