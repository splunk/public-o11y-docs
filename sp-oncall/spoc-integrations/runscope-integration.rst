.. _runscope-spoc:

Runscope integration for Splunk On-Call
******************************************************

.. meta::
    :description: Configure the Runscope integration for Splunk On-Call.


Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Getting Started, Essentials,  or Full-Stack. Full Stack is required for adding alert annotations.

Annotating the links provided by DataDog to your incidents requires use of the Rules Engine (Enterprise only feature)


:new-page:`Runscope <https://www.runscope.com/>` allows you to log, monitor and measure your API usage to solve API problems fast. The following steps will walk you through the integration process. You can also refer to Runscope's documentation on this integration
:new-page:`here <https://www.runscope.com/docs/api-testing/victorops>`.

In Splunk On-Call
=========================

In Splunk On-Call, select :guilabel:`Settings`, then :guilabel:`Alert Behavior*`. Next select :guilabel:`Integrations`, and then :guilabel:`Runscope`.

.. image:: /_images/spoc/integrations.png

If the integration has not yet been enabled, select :guilabel:`Enable Integration` to generate your endpoint URL as seen below. Copy
this key to your clipboard.

.. image:: /_images/spoc/api_key@2x.png

In Runscope
===============

#. Select API tests from the tab at the top of the interface and then select the Test you want to add the Splunk On-Call integration to. In the below example we have selected “test”.

.. image:: /_images/spoc/rs_test@2x.png

#. From within the test select :guilabel:`Edit` the side bar and then navigate to :guilabel:`Integrations` and then select :guilabel:`View All Services`.

.. image:: /_images/spoc/test_edit_integrations@2x.png

#. Find the Splunk On-Call (formerly VictorOps) integration and select :guilabel:`Connect VictorOps`.

.. image:: /_images/spoc/connect_vo@2x.png

#. Paste in your API Key and Routing key. Ensure you select :guilabel:`Automatically resolve incidents when test passes` and set the :guilabel:`Notification Threshold` to 1. 
#. To complete the configuration, select :guilabel:`Connect Account`/

.. image:: /_images/spoc/vo_rs_config@2x.png

Recommended Rules engine rules
====================================

.. note:: This added feature requires Full Stack features, as it makes use of the Rules Engine.

In the alert details of Runscope alerts are several URLs which can quickly link a paged user to the test in question. These alerts can be
made readily available by surfacing them as :ref:`annotations <rules-engine-annot>`.
The following alert rule will yield alerts of the form shown in the screenshot. For convenience, you can copy and paste the below
information.

When `monitoring_tool`` matches `Runscope``

Annotate the alert with:

URL - Go to Test Run - `${{test_run_url}}`
URL - `Go to Trigger` - `${{trigger_url}}`

URL - Go to Test - `${{test_url}}`

.. image:: /_images/spoc/transmog@2x.png

Your alerts will look like the following:

.. image:: /_images/spoc/sample-Alert@2x.png
