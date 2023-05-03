.. _dashboards-best-practices:

********************************************************************
Best practices for creating dashboards in Splunk Observability Cloud
********************************************************************

.. meta::
      :description: Share a dashboard with your organization, create a dashboard style guide, and other best practices for creating dashboards in Splunk Observability Cloud. 

Splunk Observability Cloud provides a range of visualization and organizational options for dashboards. This section provides guidance for using these options.

Use single-instance and multi-instance dashboards
=============================================================================

Dashboards are an effective vehicle for grouping together charts about similar topics. For example, it's common to look at multiple metrics for a given host, or for a service.

In the case of infrastructure or shared services, it is often also useful to construct dashboards that look at aggregates or populations. 

.. Many of the chart types discussed in :ref:`chart-analytics` are good examples of ways to do so.

Note that most of the built-in dashboards that Infrastructure Monitoring provides include both a single-instance and multi-instance version.

Avoid dashboard clutter
=============================================================================

Often, you might want to see the same dashboard, but for a different element, service, environment, or team. For example, you may have a set of infrastructure metrics that you want to monitor for your test environment vs. your production environment.

Rather than creating individual dashboards for each environment, you can use dashboard variables to create a dashboard that defaults to viewing a specific environment, but that can be easily changed to view a different environment. 

.. For more information, see :ref:`dashboard-variables`.

Publish dashboards to share with your organization
=============================================================================

Sometimes, you might want to create a dashboard and share it outside of your team. Follow this workflow when publishing dashboards to share with your organization.

-	Users create charts and dashboards for their own use, including as drafts, in their own user dashboard group. Charts are usually created starting from the Metric Finder if they don’t know the name of the metrics they want to chart, or starting from the Chart Builder directly if they do. Alternatively, a team dashboard group can be created as a shared workspace, with creation and editing done in there.

-	When users have a chart or dashboard that is ready to be shared, they create an appropriately named custom dashboard group (if it doesn’t already exist) for the team that is meant to use it, or for the service or environment that it represents, and then copy the chart or dashboard into that dashboard group.

-	If there are built-in dashboards (or filtered versions thereof) that are logically part of a team’s responsibility, or supporting a component of a service, then they are often saved into the appropriate dashboard group as well. For example, you may have a custom dashboard group for your Kafka service, and in addition to the Kafka-specific metrics, you may want to see the EC2 infrastructure metrics for the cluster upon which Kafka depends. In that case, you would apply an appropriate filter to the EC2 built-in dashboard (using ``aws_tag_service:Kafka``, for example) and then use :menuselection:`Save as` add the dashboard to your Kafka dashboard group.

Establish a style guide for your organization
=============================================================================

Establish a style guide to make practical and beautiful dashboards across your organization. Common elements of such a guide include standards for chart configuration options, such as those listed below.

-  :strong:`Terms to use in chart titles, and how to abbreviate them:` "Transmitted" or "tx", "connections" or "conns", "writes per second" or "writes/sec"?
-  :strong:`Consistent casing:` Choose sentence-style capitalization or headline-style capitalization.
-  :strong:`Employ short titles and meaningful descriptions:` Charts displayed on a dashboard will include both their title and their descriptions.
-  :strong:`Consistent color schemes:` Infrastructure Monitoring provides an automated coloring scheme for charts. If you choose to set colors manually, use a consistent palette.
-  :strong:`Units:` Use Y-axis labels with units.
-  :strong:`Time ranges:` Choose a time range that fits the data and chart type that you have.

A style guide would also include standards for dashboard layout, depending on how typical users will view a given dashboard:

-  For dashboards meant to be used with wall-mounted flat panel displays, each row can typically accommodate 3-5 charts. More than 5 may be difficult to see, and even then one or two of the charts are likely to be single value charts.
-  For dashboards meant to be used on smaller screens, such as your laptop, you will typically want no more than 4 charts across, and usually 2 or 3.
-  To ensure readability, try to have 3-5 rows of charts per dashboard.

Plan ahead to avoid blank charts
=============================================================================

It is possible to apply filters to a chart that will make it appear blank. To avoid this outcome, you should consider how you plan to use dashboards before creating them. Some common issues to consider:

- Are the dimensions or properties that are applicable common across all the charts on the dashboard?
- Have you named the charts or set their individual timeframes in such a way as to make it easy for a user to understand what they are seeing, even when the dashboard has been filtered?
- Have you used a text note to explain how to use the chart?
