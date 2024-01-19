Splunk On-Call allows you to quickly mobilize teams around an incident.
While a regular incident only requires a single acknowledgement to stop
paging, multi responder incidents require responses from each user or
escalation policy being paged.

**Please note**: The ability to manually invoke Multi-Responder Incident
Response (as opposed to it being automatically invoked via a `Routing
Key <https://help.victorops.com/knowledge-base/routing-keys/>`__)
requires an *Enterprise* level of service.

**Cascading Escalation Policies**

If an alert is sent to an escalation policy that references another
escalation policy or set of escalation policies, and multi-responder is
enabled, every first step in the escalation policy is required to
respond if the parent escalation policy is called via manual incident or
additional responder.

Using this, you may build response plays that allow you to organize
multiple teams around an incident by calling on only one escalation
policy.

Manual Incident - Multi Responder
---------------------------------

You may manually send an incident to users and escalation policies,
requiring an individual acknowledge per user or escalation policy.

.. image:: images/Multiresponder-Incident.jpg

When an incident requires multiple responders, it will not move to an
acknowledged state until all required responders have acknowledged it.
As an example, you will see the state of paging and progress of
acknowledgement in the incident card in the below graphic.

.. image:: images/Screen-Shot-2019-07-19-at-4.04.23-PM.png

Adding Responders to an Incident
--------------------------------

You may require responder acknowledgement by clicking the responders
icon and adding responders to a particular incident.

.. image:: images/Screen-Shot-2019-07-19-at-4.10.51-PM.png

 

You will then be prompted by the following modal; here you are able to
select which user or Escalation Policies to page and require individual
acknowledgement. This is similar to reroute, but instead of cancelling
paging via a singular *Ack*, each escalation policy or user must
acknowledge to move an incident to an acknowledged state.

.. image:: images/Screen-Shot-2019-07-19-at-4.14.23-PM.png

**Suggested Responders**
------------------------

Splunk On-Call can suggest responders who are likely able to help.
Splunk On-Call leverages information about user involvement in past
incidents to suggest responders that may be added to incident response.
If a user is currently not on-call a red warning symbol will appear next
to the user's name.

.. image:: images/Screen-Shot-2019-07-19-at-4.17.41-PM.png

Automated Multi-Responder via Routing Keys
------------------------------------------

Splunk On-Call offers the ability to have multi-responder functionality
automatically invoked on a Routing Key level.

Navigate to Routing Keys under *Settings >> Routing Keys* and click on
the pencil icon that appears while hovering your mouse over an existing
key.  Next, check the checkbox on the Multi-Responder column and click
the adjacent check mark to save the changes.

If multiple escalation policies are specified through the routing key,
an acknowledgement will be required from each of them before the
incident becomes fully acknowledged.
