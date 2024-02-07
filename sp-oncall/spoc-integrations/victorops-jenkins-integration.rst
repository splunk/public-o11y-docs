.. _jenkins-spoc:

With hundreds of plugins in the Update Center, Jenkins integrates with
practically every tool in the continuous integration and continuous
delivery toolchain. The VictorOps integration with Jenkins provides
real-time contextual information regarding your builds directly into the
timeline. The following guide will walk you through this
simple-to-implement integration.

**Note:** 

-  There are two Jenkins integrations. The other is `Jenkins Delivery
   Insights Integration
   Guide <https://help.victorops.com/knowledge-base/victorops-jenkins2-integration/>`__,
   which sends you notifications in the Timeline regarding build status.

**In VictorOps**
----------------

Navigate to the Integrations page and find the REST endpoint integration
by visiting *Integrations >> REST Endpoint*

Copy the REST endpoint URL to your clipboard.

..image images/rest-final.png

**In Jenkins**
--------------

First, select the build or deployment you want to add VictorOps
notifications for. Then select **Configure**.

.. figure:: images/jenkins4.png
   :alt: jenkins4

   jenkins4

Under “Build” select **Add build step** then **Execute shell**.

.. figure:: images/jenkins5.png
   :alt: jenkins5

   jenkins5

Paste the following cURL command into the “Command” box. Make sure to
replace the “VICTOROPS_REST_ENDPOINT_URL” with the URL you copied from
VictorOps.

``curl -X POST --header 'Accept: application/json' --data '{ "entity_id": "'${BUILD_NAME}'", "message_type": "INFO", "state_message": "Jenkins Build: '${BUILD_DISPLAY_NAME}' is underway", "BUILD_ID": "'${BUILD_ID}'" }' '**VICTOROPS_REST_ENDPOINT_URL**'``

If you wish to add additional Jenkins variables please see the available
list by selecting the link below the Command Box:

.. figure:: images/jenkins6.png
   :alt: jenkins6

   jenkins6

Make sure to save your configuration and you are done.
