.. _jenkins-spoc:

Jenkins integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Jenkins integration for Splunk On-Call.

With hundreds of plugins in the Update Center, Jenkins integrates with
practically every tool in the continuous integration and continuous
delivery toolchain. The Splunk On-Call integration with Jenkins provides
real-time contextual information regarding your builds directly into the
timeline. 

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise


The remainder of this topic walks you through the Jenkins integration with Splunk On-Call.

.. note::
   There are two Jenkins integrations. The other is`Jenkins Delivery
   Insights Integration
   Guide <https://help.victorops.com/knowledge-base/victorops-jenkins2-integration/>`__,
   which sends you notifications in the Timeline regarding build status.

Splunk On-Call configuration
------------------------------

Navigate to the Integrations page and find the REST endpoint integration
by visiting *Integrations >> REST Endpoint*

Copy the REST endpoint URL to your clipboard.

.. image:: /_images/spoc/rest-final.png

Jenkins configuration
------------------------

First, select the build or deployment you want to add Splunk On-Call notifications for, then select **Configure**.

.. image:: /_images/spoc/jenkins4.png
   :alt: jenkins4

   jenkins4

Under “Build” select **Add build step** then **Execute shell**.

.. image:: /_images/spoc/jenkins5.png
   :alt: jenkins5

   jenkins5

Paste the following cURL command into the “Command” box. Make sure to
replace the “VICTOROPS_REST_ENDPOINT_URL” with the URL you copied from
Splunk On-Call.

.. code-block:: none

   curl -X POST --header 'Accept: application/json' --data '{ "entity_id": "'${BUILD_NAME}'", "message_type": "INFO", "state_message": "Jenkins Build: '${BUILD_DISPLAY_NAME}' is underway", "BUILD_ID": "'${BUILD_ID}'" }' '**VICTOROPS_REST_ENDPOINT_URL**'


If you want to add additional Jenkins variables, see the available list by selecting the link below the Command Box:

.. image:: /_images/spoc/jenkins6.png
   :alt: jenkins6

   jenkins6

Make sure to save your configuration. Then you are done.
