The VictorOps Delivery Insights Generic Endpoint accepts messages from
any source via an **HTTPS POST request** in **JSON format**. As long as
you can configure the content of the request, you can post merge, pull
request, and build messages into the timeline.

--------------

Enable the Integration
======================

In VictorOps, navigate to the integrations page.

If the Delivery Insights endpoint integration has not been enabled,
click the blue *Enable* button to generate your endpoint destination
URL.

Note: The Delivery Insights endpoint is different than the `general
API <https://help.victorops.com/knowledge-base/api/>`__ and is the
preferred method to create Delivery Insight messages.

.. image:: images/Integrations_-_VictorOps_Events.jpg

--------------

Required / Recommended Fields:
==============================

The payload for Delivery Insights messages is designed to provide
concise information regarding your delivery lifecycle with a link
quickly bringing you to the information. “event_type” and “entity_type”
are the only fields requiring specific values (listed below). The other
required fields are used to construct the concise and actionable short
message which includes the link. All additional fields are used as part
of the long-form expanded message.

 

.. raw:: html

   <table id="tablepress-restFields-no-2" class="tablepress tablepress-id-restFields alternate_color" style="height: 1004px;" width="588">

.. raw:: html

   <tbody class="row-hover">

.. raw:: html

   <tr class="row-1 odd">

.. raw:: html

   <td class="column-1">

event_type

.. raw:: html

   </td>

.. raw:: html

   <td class="column-2">

REQUIRED

.. container::

Type of message [String]

.. container::

Valid values: Build, Merge, Pull Request

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr class="row-2 even">

.. raw:: html

   <td class="column-1">

entity_type

.. raw:: html

   </td>

.. raw:: html

   <td class="column-2">

REQUIRED

.. container::

Type of event [String]

.. container::

Valid values: Build System, Software Configuration Management

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr class="row-3 odd">

.. raw:: html

   <td class="column-1">

source

.. raw:: html

   </td>

.. raw:: html

   <td class="column-2">

The source system sending this message [String]

.. container::

The name of the third-party tool or internal tool sending the message

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr class="row-4 odd">

.. raw:: html

   <td class="column-1">

summary

.. raw:: html

   </td>

.. raw:: html

   <td class="column-2">

REQUIRED

.. container::

A brief descriptive message [String]

.. container::

This message will be the display value for the URL provided as part of
the payload (see below)

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr class="row-5 even">

.. raw:: html

   <td class="column-1">

url

.. raw:: html

   </td>

.. raw:: html

   <td class="column-2">

REQUIRED

.. container::

URL to link back to the event in the third-party tool [URL]

.. container::

The display for this url will be taken from the summary field provided
as part of the payload (see above)

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr class="row-6 odd">

.. raw:: html

   <td class="column-1">

action

.. raw:: html

   </td>

.. raw:: html

   <td class="column-2">

REQUIRED

.. container::

The specific action taking place for this event [String]

.. container::

The action is appended to the end of the summary to describe what action
is being executed for this event

.. container::

For example: Opened, Deployed, Created, etc.

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr class="row-7 odd">

.. raw:: html

   <td class="column-1">

result

.. raw:: html

   </td>

.. raw:: html

   <td class="column-2">

REQUIRED

.. container::

The result of the action [String]

.. container::

The result is appended before the summary so you can quickly get the
information you need regarding the delivery event

.. container::

For example: Success, Failure, etc.

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr class="row-8 odd">

.. raw:: html

   <td class="column-1">

long message

.. raw:: html

   </td>

.. raw:: html

   <td class="column-2">

Time this issue began [Number] (Linux/Unix time)

.. container::

The time this entity entered its current state (seconds since epoch).
Defaults to the time alert is received

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr class="row-9 odd">

.. raw:: html

   <td class="column-1">

user

.. raw:: html

   </td>

.. raw:: html

   <td class="column-2">

User in other system associated to event [String]

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   </tbody>

.. raw:: html

   </table>

Here is the full timeline view of a Delivery Insights message:

.. image:: images/Timeline_-_VictorOps_Events.jpg

To construct the payload above, the following JSON was used:

{ “entity_type”: “build system”, “event_type”: “Build”, “source”:
“Internal Tool”, “summary”: “new version of mobile app”, “url”:
“https://www.victorops.com”, “action”: “deployed”, “result”: “SUCCESS”,
“long_message”: “New build includes bug fixes for connectivity issues
and that new feature” }

--------------

Filters
=======

You may filter the Delivery Insights messages in the VictorOps timeline
based on the “event_type” field values of *Branch, Pull Request, Merge,
Build,* and *Deploy*.

From the main timeline select the filter icon and then *Message Types >>
selected message types* to adjust your timeline filters based on
Delivery Insights.

The Delivery Insights Quick Filter is located next to the All Filters
drop-down, as indicated in the image below. The Quick Filter is an
on/off button. Turning it on will filter the Timeline for all Delivery
Insights messages that have been pre-selected in the manual filter
drop-down. If none of the messages are selected, the Timeline will
display all Delivery Insights messages.

.. image:: images/Delivery-Insights-Filter.png
