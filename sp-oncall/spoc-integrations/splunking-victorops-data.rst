The Splunk Add-on for On-Call (VictorOps) is a downloadable add-on
(similar to an app) that will ingest Splunk On-Call data into Splunk
using the `Splunk On-Call public
API <https://portal.victorops.com/public/api-docs.html>`__. The add-on
includes pre-built dashboards to help you quick-start visualizing your
Splunk On-Call data.

The add-on is installed on a heavy forwarder and will play nicely with
any other add-ons also installed. The add-on will create an input data
source for users, teams, on-call, and incidents. The polling interval
can be defined for each data source and data sources can be selected or
deselected depending on the data desired.

For each type of data, the script will check to see if the API response
contains duplicate data, and if so, then the data is not indexed. For
example, all users will be polled on the interval, however, if for some
user A data looks the same, then it won't be indexed; if the user
updated their paging policy then the data will be indexed. This is
important because it will ensure that the Splunk On-Call data is a
*very* low amount.

These reports can provide real-time visibility across multiple Splunk
On-Call instances and offer highly granular and customizable reporting.

**Splunk Versions Supported:**

-  Splunk Enterprise, Splunk Cloud

   Platform Version: 9.0\*, 8.2\*, 8.1\*, 8.0\*, 7.3

-  Python version 2 or 3 is supported

\* there is presently an outstanding issue affecting the calendar
display on certain Splunk versions

**General Requirement:**

-  **You will need an active Splunk On-Call instance before you begin.**
   `Click here <https://victorops.com/>`__ **to start a free 14-day
   trial.**
-  **On-Prem** 

   -  customers will need to open **port 443** for outgoing https
      communication with Splunk On-Call.
   -  Proxy is supported (available with 1.0.5 version and above) from
      the Splunk base `HERE <https://splunkbase.splunk.com/app/4886/>`__
      or `contact support <https://victorops.com/contact/>`__ for the
      most recent version.

**Important Notes:**

-  As there are both dashboards and data inputs for the add-on, both

   will need to be configured in all Search Heads and heavy forwarders

-  We recommend using one index per input, but it is possible to have
   multiple inputs write into a single index.

-  The add-on requires macros. It is always good idea to double-check
   your macros and make sure they are pointed toward the correct
   indexes.

   -  |image1|

-  The add-on supports proxy configurations

**Set-Up Instructions**
-----------------------

After downloading the add-on from the Splunk base
`here <https://splunkbase.splunk.com/app/4886/>`__, it needs to be
installed. Navigate to Apps > Manage Apps >> Install App From File and
import the .tar.gz file downloaded previously.

The Splunk add-on for On-Call should now be visible as an app in Splunk,
navigate to the app. Under Inputs, select Create New Input and choose a
type of data you would like Splunk to ingest from Splunk On-Call. For
all data types the input configuration options will look like below:

.. image:: images/Screen_Shot_2020-08-06_at_9_58_34_AM.png

-  **Name** – this is a unique name for the data input. As a best
   practice, choose a name that accurately represents the input. For
   example, use something like vo_users\_<org_name>.
-  **Interval** – this is the polling interval, in seconds, at which the
   Splunk On-Call API will be polled. Keep in mind the time scale that
   is desired to see changes reflected in Splunk, the rate at which
   updates happen in Splunk On-Call, and the resource consumption of
   running the polling scripts when selecting this number. 

   -  We recommend the polling interval for incidents and on call to be
      around 300 seconds. While the polling interval for teams and users
      to be closer to 3600 seconds but adjust these values for your
      needs and use cases.

-  **Index** – select any Splunk index where the data should be
   available. We recommend one index per input. You will need to update
   the dashboard search macros to use the index name you decide on in
   order for data to populate on the dashboards.
-  **Organization ID** – Note which Splunk On-Call organization this
   data is coming from. This of even more importance if collecting data
   from multiple organizations in Splunk On-Call
-  **API ID** – This value can be found in Splunk On-Call under
   Integrations >> API (admin or alert admin required).
-  **API Key** – This value can be found in Splunk On-Call under
   INtegrations >> API (admin or alert admin required).

**Input Details**
~~~~~~~~~~~~~~~~~

There are four types of inputs collected: users, oncall, teams (which
includes routing keys) and incidents. Each input can be selected
individually and independently of other inputs. In other words, users
have the option to decide what exactly would be indexed per
organization. Below are the inputs and their respective attributes in a
sample JSON format.

**Users (type=user)**

-  Info

   -  Names (first, last, username)
   -  Created date
   -  Date created
   -  Date password updated
   -  Verified

-  Contact Methods - Name, verification status (phone only) and value of
   all contact methods.
-  Paging Policy
-  Organization

**On-Call (type=oncall, events are split per team)**

-  Organization
-  Team name, slug
-  Escalation Policy

   -  Oncall user(s) at time of index

**Teams (type=team)**

-  Info

   -  Number of members, verified members
   -  Team name, slug

-  Members

   -  Username, first name, last name
   -  Verified

-  Organization
-  Policies

   -  Name, slug

**Routing Keys (type=routingkey)**

-  Default routing key status (true/false)
-  Organization
-  Name
-  Target escalation policies

   -  Escalation policy name, slug
   -  Team name, slug

**Incidents (source=victorops_incidents)**

-  Paged Users, Teams
-  State changes (ack, resolve)
-  All Metadata
-  Index timestamp is set to the startTime field
-  Alert Count

**Troubleshooting**
~~~~~~~~~~~~~~~~~~~

Things to verify, generally in order, if encountering problems

1. Check that the API credentials are correct. Note, this is not the
   ‘Splunk API key' this is the public API key and id found under
   Integrations >> API.
2. Is the environment permitted to access the outside web? Ensure that
   from the host you can reach the Splunk On-Call API. Try running ‘ping
   api.victorops.com' to confirm the connection.
3. You can investigate further by inspecting the logs in
   $SPLUNK_HOME/var/log/splunk/ta_splunk_add_on_for_victorops_victorops\_<INSERT_INPUT_TYPE_HERE>.log.
4. If polling incidents in an organization with more than 60 incidents
   in the past seven days, the incident poll can take some time to run
   due to Splunk On-Call API rate limits. If the input has been
   configured correctly and incident data is still not appearing, check
   the above log path for the incidents log (i.e. tail -f
   ta_splunk_add_on_for_victorops_victorops_incidents.log), if the last
   log entry is similar to “Waiting 59.985822999999996 seconds”, the
   script is waiting on rate limits to finish collecting and indexing
   the data. If this issue persists, consider reducing the polling
   interval.
5. If dashboard items are not appearing, check the dashboard macros by
   navigating to Settings>>Advanced Search>>Search macros and ensure the
   index name you created for the inputs is being used in the macros.

[ht_toggle title=“Webhook Set Up” id=“” class=“” style=“” ]

**Important Notes:**

-  While the webhook configuration is available if needed, we highly
   recommend the native add-on instead of the webhook configuration.

**Webhooks**
------------

**Ingesting Data**
~~~~~~~~~~~~~~~~~~

Splunk On-Call will send data to Splunk using an `HTTP Endpoint
Collector <https://docs.splunk.com/Documentation/Splunk/9.0.5/Data/UsetheHTTPEventCollector>`__
(HEC) depending upon your deployment a heavy forwarder may also be
needed. To ensure communication from Splunk On-Call to Splunk, Splunk
On-Call's range of IP addresses should be whitelisted.

*Tip: When setting up the HEC in Splunk, create a new Source Type for
the type of data that you're sending in. This allows for you to send in
and keep track of multiple different types of OnCall data like chats,
incident action logs, different teams incidents, etc.*

**Creating the Webhooks**
~~~~~~~~~~~~~~~~~~~~~~~~~

Four `outgoing
webhooks <https://help.victorops.com/knowledge-base/custom-outbound-webhooks/>`__
can be created, one for each event type. See below for each
configuration. While the url will be the same for each webhook, keep in
mind that the url will vary with different deployments of Splunk.

.. raw:: html

   <table style="width: 758px;" border="1">

.. raw:: html

   <tbody>

.. raw:: html

   <tr>

.. raw:: html

   <td style="width: 350px;">

Splunk Version

.. raw:: html

   </td>

.. raw:: html

   <td style="width: 398px;">

Url

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr>

.. raw:: html

   <td style="width: 350px;">

On-Prem Instance

.. raw:: html

   </td>

.. raw:: html

   <td style="width: 398px;">

https://<host>:8088/services/collector

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr>

.. raw:: html

   <td style="width: 350px;">

Self-Service Splunk Cloud Instance

.. raw:: html

   </td>

.. raw:: html

   <td style="width: 398px;">

https://input-<host>:8088/services/collector

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr>

.. raw:: html

   <td style="width: 350px;">

All Other Splunk Cloud Instances

.. raw:: html

   </td>

.. raw:: html

   <td style="width: 398px;">

https://http-inputs-<host>:8088/services/collector

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   </tbody>

.. raw:: html

   </table>

*Note: Although rare, some Splunk instances use port 443 instead of 8088
for event ingestion.*

The header will be the same for all webhooks and Splunk deployments. Be
sure to replace with the appropriate value for the HEC.

.. raw:: html

   <table style="width: 370px;" border="1">

.. raw:: html

   <tbody>

.. raw:: html

   <tr>

.. raw:: html

   <td style="width: 172px;">

Key

.. raw:: html

   </td>

.. raw:: html

   <td style="width: 186px;">

Value

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   <tr>

.. raw:: html

   <td style="width: 172px;">

Authorization

.. raw:: html

   </td>

.. raw:: html

   <td style="width: 186px;">

Splunk <token>

.. raw:: html

   </td>

.. raw:: html

   </tr>

.. raw:: html

   </tbody>

.. raw:: html

   </table>

The Content Type field should be set to application/json

The body of each webhook will vary according to the event-type. Be sure
to replace your org slug (organization id found in the url of victorops,
e.g. https://portal.victorops.com/dash/<org_slug>/outgoing-webhooks) in
all instance of <org_slug>.

--------------

*Event Type*: Any Incidents

*Body*:

{ “sourcetype”: “\_json”, “event”: { “slug”: “<org_slug>”, “link”:
“https://portal.victorops.com/client/<org_slug>/popoutIncident?incidentName=\ :math:`{{STATE.INCIDENT\_NAME}}",  "type": "incident",  "alertService": "`\ {{ALERT.service}}”,
“hostName”:
“:math:`{{ALERT.host\_name}}",  "service": "`\ {{ALERT.service}}”,
“ENTITY_TYPE”:
“:math:`{{INCIDENT.ENTITY\_TYPE}}",  "SERVICESTATE": "`\ {{ALERT.SERVICESTATE}}”,
“VO_ALERT_RCV_TIME”:
“:math:`{{ALERT.VO\_ALERT\_RCV\_TIME}}",  "alert\_url": "`\ {{ALERT.alert_url}}”,
“entity_display_name”:
“:math:`{{ALERT.entity\_display\_name}}",  "entity\_state": "`\ {{ALERT.entity_state}}”,
“message_type”:
“:math:`{{ALERT.message\_type}}",  "monitor\_name": "`\ {{ALERT.monitor_name}}”,
“monitoring_tool”:
“:math:`{{ALERT.monitoring\_tool}}",  "routing\_key": "`\ {{ALERT.routing_key}}”,
“alert_timestamp”:
“:math:`{{ALERT.timestamp}}",  "ACK\_MSG": "`\ {{STATE.ACK_MSG}}”,
“ACK_USER”:
“:math:`{{STATE.ACK\_USER}}",  "ACK\_TIMESTAMP": "`\ {{STATE.ACK_TIMESTAMP}}”,
“ALERT_COUNT”:
“:math:`{{STATE.ALERT\_COUNT}}",  "CURRENT\_ALERT\_PHASE": "`\ {{STATE.CURRENT_ALERT_PHASE}}”,
“CURRENT_STATE”:
“:math:`{{STATE.CURRENT\_STATE}}",  "ENTITY\_ID": "`\ {{STATE.ENTITY_ID}}”,
“IncidentNum”:
“:math:`{{STATE.INCIDENT\_NAME}}",  "INCIDENT\_TIMESTAMP": "`\ {{STATE.INCIDENT_TIMESTAMP}}”,
“LAST_TIMESTAMP”:
“:math:`{{STATE.LAST\_TIMESTAMP}}",  "MONITOR\_TYPE": "`\ {{STATE.MONITOR_TYPE}}”,
“stateService”:
“:math:`{{STATE.SERVICE}}",  "alert\_uuid": "`\ {{ALERT.VO_UUID}}” } }

--------------

*Event Type*: Any-Paging

*Body*:

{ “sourcetype”: “\_json”, “event”:{ “slug”:“<org_slug>”,
“type”:“paging”, “user”:
“:math:`{{PAGE.USER\_ID}}",  "started":"`\ {{PAGE.STARTED}}”, “page_id”:
“:math:`{{PAGE.ID}}",  "attempt\_num": "`\ {{PAGE.ATTEMPT_NUMBER}}”,
“method_type”:
“:math:`{{PAGE.METHODS.0.TYPE}}",  "method\_label": "`\ {{PAGE.METHODS.0.LABEL}}”,
“cancellation”: “${{PAGE.CANCELLATION}}” } }

--------------

*Event-type:* Any-On-Call

*Body*:

{ “sourcetype”: “\_json”, “event”:{ “slug”:“<org_slug>”,
“type”:“oncall”,
“user”:“:math:`{{ONCALL.USER\_ID}}",  "state":"`\ {{ONCALL.STATE}}”,
“team”:“:math:`{{ONCALL.TEAM\_NAME}}",  "group":"`\ {{ONCALL.GROUP_ID}}”,
} }

--------------

*Event-type:* All-Chats

*Body*:

{ “sourcetype”: “\_json”, “event”:{ “slug”:“<org_slug>”, “type”:“chat”,
“user”: “:math:`{{CHAT.USER\_ID}}",  "text": "`\ {{CHAT.TEXT}}”,
“is_robot”: “${{CHAT.IS_ROBOT}}” } }

[/ht_toggle]

.. |image1| image:: images/Screen-Shot-2020-08-06-at-9.51.25-AM.png
