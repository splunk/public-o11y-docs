---
title: "Scalyr Integration Guide - VictorOps"
date: "2017-11-14"
---

[Scalyr](https://www.scalyr.com/) aggregates all your server logs and metrics into a centralized system in real time. The following guide will walk you through the steps needed to integrate the two systems.

## **In VictorOps**

From the VictorOps web portal select _**Settings** \>> **Alert Behavior** >> **Integrations**_

Select the **Scalyr** integration and copy the **Service API Endpoint** to your clipboard.

Make sure to add the appropriate [Routing Key](https://help.victorops.com/knowledge-base/routing-keys/) to the end of the URL.

## **In Scalyr**

In Scalyr, click **Alerts**, then click **Edit Alerts**.

![](images/Scalyr_integration_alerts.png)

Edit the Alerts configuration file to specify VictorOps as the alert recipient. To do this for all Scalyr alerts, create or edit an alertAddress field at the top level of the file as shown below using your Service API Endpoint from the "In VictorOps" section.

{
  alertAddress: "victorops:webhookUrl=https://alert.victorops.com/integrations/generic/20131114/alert/$api\_key/$routing\_key",
  alerts: \[
    {
      trigger: "alert expression 1",
      description: ""
    },
    {
      trigger: "alert expression 2",
      description: ""
    }
  \]
}

To send notifications to one or more e-mail addresses in addition to VictorOps, list them all in alertAddress.

```
"alertAddress": "victorops:webhookUrl=https://alert.victorops.com/integrations/generic/20131114/alert/$api_key/$routing_key, foo@example.com, bar@example.com",
```

If you only want to use VictorOps for certain alerts, you can specify an alertAddress field for those alerts:

{
  alertAddress: "email@example.com",

  alerts: \[
    // This alert will be sent to VictorOps
    {
      trigger: "count:1m(error) > 10",
      "alertAddress": "victorops:webhookUrl=https://alert.victorops.com/integrations/generic/20131114/alert/$api\_key/$routing\_key"
    },

    // This alert will send notifications to email@example.com
    {
      trigger: "mean:10m($source='tsdb' $serverHost='server1' metric='proc.stat.cpu\_rate' type='user') > 50"
    }
  \]
}

To link a whole group of alerts to VictorOps, specify an appropriate alertAddress for the group. See [Specifying Alert Recipients](https://www.scalyr.com/help/alerts?teamToken=0zFj3HWlC473ZO04SOwc7w--#recipients).

### Configuring Alerts sent to VictorOps

#### Message Type/Severity

Scalyr will send a message to VictorOps when an alert triggers.  By default, the message severity will be CRITICAL.  All CRITICAL alerts create incidents and notify users.

In order to change the severity, you can add a parameter in the endpoint URL and create a matching Rules Engine rule. (_Note: the VictorOps [Rules Engine](https://help.victorops.com/knowledge-base/transmogrifier/) is an Full-Stack level feature only.)_

The below example passes a payload field of _scalyrMessageType_ with a value of _WARNING_:

`victorops:webhookUrl=https://alert.victorops.com/integrations/generic/20131114/alert/<unique_victorops-generated_endpoint>/<routing_key>/?scalyrMessageType=WARNING`

A corresponding Rules Engine rule can match on the field of _scalyrMessageType_ with a value of **_WARNING_**, and transform the **_message\_type_** field to a value of **_WARNING_**. The _message\_type_ field specifically is what tells VictorOps how to treat the alert:

This same process can be applied to nearly any pertinent payload field. For more information, see our [glossary of fields](https://help.victorops.com/knowledge-base/incident-fields-glossary/).

All the resolved Scalyr alerts will be sent with a message type RECOVERY.

You should now begin seeing Scalyr alerts in your VictorOps timeline. If you have any questions please contact [VictorOps Support](mailto:Support@victorops.com?Subject=Scalyr%20VictorOps%20Integration).
