.. _delivery-insights-spoc:

Delivery Insights integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Delivery Insights integration for Splunk On-Call.

The Splunk On-Call Delivery Insights Generic Endpoint accepts messages from any source through an HTTPS POST request with a JSON payload. As long as you can configure the content of the request, you can post merge, pull request, and build messages into the timeline.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise


Activate the integration
===========================

In Splunk On-Call, navigate to the integrations page.

If the Delivery Insights endpoint integration has not been activated, select :guilabel:`Enable` to generate your endpoint destination URL.

.. note::
   The Delivery Insights endpoint is different than the general API and is the preferred method to create Delivery Insight messages.

Required and recommended fields
=================================

The payload for Delivery Insights messages provides concise information regarding your delivery lifecycle with a link quickly bringing you to the information. ``event_type`` and ``entity_type`` are the only fields requiring specific values. The other required fields are used to construct the concise and actionable short message which includes the link. All additional fields are used as part of the long-form expanded message.

.. list-table::
   :header-rows: 1
   :widths: 20 20 60
   :width: 100%

   * - :strong:`Field`
     - :strong:`Required`
     - :strong:`Description`

   * - ``event_type``
     - Yes
     - Type of message. Valid values: Build, Merge, Pull Request.
   * - ``entity_type``
     - Yes
     - Type of event. Valid values: Build System, Software Configuration Management.
   * - ``source``
     - No
     - The source system sending this message. The name of the third-party tool or internal tool sending the message.
   * - ``summary``
     - Yes
     - A brief descriptive message. This message will be the display value for the URL provided as part of the payload.
   * - ``url``
     - Yes
     - URL to link back to the event in the third-party tool. The display for this url will be taken from the summary field provided as part of the payload.
   * - ``action``
     - Yes
     - The specific action taking place for this event. The action is appended to the end of the summary to describe what action is being executed for this event. For example: Opened, Deployed, Created, and so on.
   * - ``result``
     - Yes
     - The result of the action. The result is appended before the summary so you can quickly get the information you need regarding the delivery event. For example: Success, Failure, and so on.
   * - ``long message``
     - No
     - Time this issue began (Unix time). The time this entity entered its current state (seconds since epoch). Defaults to the time alert is received.
   * - ``user``
     - No
     - User in other system associated to event.


Example
--------------------

The following example JSON adds a message to the timeline:

.. code-block:: json

   {
      "entity_type": "build system",
      "event_type": "Build",
      "source": "Internal  Tool",
      "summary": "new version of mobile app",
      "url": "https://www.splunk.com",
      "action": "deployed",
      "result": "SUCCESS",
      "long_message": "New build includes bug fixes for connectivity issues and that new feature"
   }

Filters
=======

You can filter the Delivery Insights messages in the Splunk On-Call timeline based on the ``event_type`` field values of Branch, Pull Request, Merge, Build, and Deploy.

From the main timeline, select the filter icon and then select :guilabel:`Message Types` and the message types to adjust your timeline filters based on Delivery Insights.

The Delivery Insights Quick Filter is next to the All Filters menu, as indicated in the following image. The Quick Filter is a switch: turning it on filters the timeline for all Delivery Insights messages that have been preselected in the manual filter. If none of the messages are selected, the timeline shows all Delivery Insights messages.

.. image:: /_images/spoc/Delivery-Insights-Filter.png
   :alt: Filter for Delivery Insights