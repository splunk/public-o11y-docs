(org-metrics)=

# View organization metrics for Splunk Observability Cloud

Splunk Observability Cloud provides the following metrics to measure your organization's usage of the platform:

* **Ingest metrics**: Measure the data you're sending to Infrastructure Monitoring, such as the number of data points you've sent.

* **App usage metrics**: Measure your use of application features, such as the number of dashboards in your organization.

* **Integration metrics**: Measure your use of cloud services integrated with your organization, such as the number of calls to the AWS CloudWatch API.

* **Resource metrics**: Measure your use of resources that you can specify limits for, such as the number of custom metric time series (MTS) you've created.

You're not charged for these metrics, and they don't count against any limits.

## Access organization metrics

If you're an admin, you can view some of these metrics in built-in charts on the Organization Overview page. Any user can view these metrics in custom charts.

To access the Organization Overview page, follow these steps:

1. Log into **Observability Cloud**.

2. On the left nav, select **Settings**, then select **Organization Overview**.

3. Select the tab for the metrics you want to view:

   - Engagement: Metrics about your users and the charts, detectors, dashboards, dashboard groups, and teams they've created.
   - APM entitlements: For APM troubleshooting.
   - APM throttling: These charts highlight metrics that track throttling and limiting in your organization.
   - IMM entitlements: For IMM troubleshooting.
   - IMM system limits: These charts identify metrics that track usage of system limits in your organization. 
   - IMM throttling: These charts highlight metrics that track throttling and limiting in your organization. 
   - Cloud integrations: These charts highlight metrics that track errors and throttling which might limit collection of telemetry from cloud provider APIs.

## Interpret and work with org metrics

This section provides tips that can help you interpret and work with usage metrics.

### Metrics for values by token

In some cases, Infrastructure Monitoring has two similar metrics:

* One metric, such as `sf.org.numAddDatapointCalls`, represents the total across your entire organization.

* The similar metric, `sf.org.numAddDatapointCallsByToken`, represents the total for each unique access token you use.

The sum of all the by token metric values for a measurement might be less than the total value metric value. For example, the sum, of all `sf.org.numAddDatapointCallsByToken` values might be less than the value of `sf.org.numAddDatapointCalls`. The sums differ because Infrastructure Monitoring doesn't use a token to retrieve data from cloud services you've integrated. Infrastructure Monitoring counts the data point calls for the integrated services, but it doesn't have a way to count the calls for any specific token.

This difference in values applies to AWS CloudWatch, GCP StackDriver, AppDynamics, and New Relic integrations.

### Metrics with values for each metric type

Some metrics have a value for each metric type (counter, cumulative counter, or gauge), so you have three MTS per metric. Each MTS has a dimension named `category` with a value of `COUNTER`, `CUMULATIVE_COUNTER`, or `GAUGE`. Because you can have multiple MTS for these metrics, you need to use the `sum()` SignalFlow function to see the total value.

For example, you might receive three MTS for `sf.org.numMetricTimeSeriesCreated`, one for the number of MTS that are counters, another for the number of MTS that are cumulative counters, and a third for the number of MTS that are gauges.

Also, you can filter by a single value of `category`, such as `GAUGE`, to see only the metrics of that type.

### A metric that counts stopped detectors

The metric `sf.org.numDetectorsAborted` monitors the number of detectors that Infrastructure Monitoring stopped because the detector reached a resource limit. In most cases, the detector exceeds the limit of 250K MTS. This condition also generates the event `sf.org.abortedDetectors`, which records details including the detector ID, the reason it stopped, and the value or limit of MTS or data points, whichever caused the detector to stop.

To learn more, see {ref}`Add context to metrics using events <events-intro>`.

### Metrics that track system limits

These metrics track limits that Infrastructure Monitoring enforces for your organization:

* `sf.org.limit.activeTimeSeries` (gauge): Maximum number of active MTS, within a moving window of the past 25 hours, that your organization can have. If you exceed this limit, Infrastructure Monitoring stops accepting data points for new MTS, but continues to accept data points for existing MTS. To monitor your usage against the limit, use the metric `sf.org.numActiveTimeSeries`.

* `sf.org.limit.containers` (gauge): Maximum number of containers that can send data to your organization. This limit is higher than your contractual limit to allow for burst and overage usage. If you exceed this limit, Infrastructure Monitoring drops data points from new containers but keeps accepting data points for existing containers. To monitor your usage against the limit, use the metric `sf.org.numResourcesMonitored` and filter for the dimension `resourceType:containers`.

* `sf.org.limit.computationsPerMinute` (gauge): Maximum number of SignalFlow computations per minute.

* `sf.org.limit.customMetricMaxLimit` (gauge): Maximum number of active custom MTS, within a moving window of the previous 60 minutes, that can send data to your organization. **If you exceed this limit, Infrastructure Monitoring drops data points** for the custom MTS that exceeded the limit, but it continues to accept data points for custom MTS that already existed. See the custom metrics you’ve defined with `sf.org.numCustomMetrics`. 

    To learn more about custom MTS, see {ref}`About custom, bundled, and high-resolution metrics <about-custom-high-res>`.

* `sf.org.limit.customMetricTimeSeries` (gauge): Maximum number of active custom MTS.

* `sf.org.limit.detector` (gauge): Maximum number of detectors that you can use for your organization. After you reach this limit, you can't create new detectors. To monitor the number of detectors you create, use the metric `sf.org.num.detector`.

* `sf.org.limit.eventsPerMinute` (gauge): Maximum number of incoming events per minute.

* `sf.org.limit.hosts` (gauge): Maximum number of hosts that can send data to your organization. The limit is higher than your contractual limit to allow for burst and overage usage. If you exceed this limit, Infrastructure Monitoring drops data points from new hosts but keeps accepting data points for existing hosts. To monitor your usage against the limit, use the metric `sf.org.numResourcesMonitored` and filter for the dimension `resourceType:hosts`.

* `sf.org.limit.metricTimeSeriesCreatedPerMinute` (gauge): Maximum rate at which you can create new MTS in your organization, measured in MTS per minute. If you exceed this rate, Infrastructure Monitoring stops accepting data points for new MTS, but continues to accept data points for existing MTS. To monitor the number of metrics you've created overall, use the metric `sf.org.numMetricTimeSeriesCreated`.

### Authentication error metrics 

Editing a role and removing a user's permissions to cloud services might generate authentication errors from your cloud service provider. When this happens, Observability Cloud integrations won't work properly, and won't be able to collect data and metadata from your services.

Observability Cloud has the following metrics to track auth errors:

* `sf.org.num.awsServiceAuthErrorCount`

* `sf.org.num.gcpServiceAuthErrorCount`

* `sf.org.num.azureServiceAuthErrorCount`

If you're getting any of these errors, you need to fix your roles or tokens so Observability Cloud can retrieve your data.

You can use these errors in {ref}`dashboards <dashboards>` to detect whether you're experiencing this issues. 

### Compare `gross` and `num` metric values

Some metrics report a `gross` value and a `num` value. Compare the `gross` and `num` values of a metric to learn about how the system limits or filters data for whatever the metric represents.

* A `gross` metric reports the total number of data points the system receives before any throttling or filtering kicks in.

* A `num` metric reports the total number of data points the system receives after it completes any throttling or filtering.


## Metric details

Use the {ref}`Metric Finder <metrics-finder-and-metadata-catalog>` to find all org metrics.

These are the main organization metrics provided by Observability Cloud:

<div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/integrations/main/signalfx-org-metrics/metrics.yaml"></div>

## Get help

```{include} /_includes/troubleshooting.md
```
