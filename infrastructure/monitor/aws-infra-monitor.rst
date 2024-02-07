.. _aws-infra-monitor:

**********************************
Monitor Amazon Web Services
**********************************

.. meta::
   :description: The Splunk Infrastructure Monitoring AWS integration helps you monitor your AWS resources and the applications that are using those resources.

.. note:: 
   
   To set up your AWS integration and start sending AWS data to Splunk Observability Cloud, see :ref:`get-started-aws` and :ref:`aws-infra-import`.

   To understand the costs associated to working with AWS data in Splunk Observability Cloud see :ref:`aws-infra-costs`.

Now that your AWS data is in Splunk Observability Cloud, use the available features to monitor your AWS services.

.. _monitor-aws-services:

Monitor AWS services and identify problems
=====================================================

Visit the :strong:`Infrastructure page` to monitor the health of the AWS services you're using. It provides a key metric for each service. You can also drill down into specific instances of an AWS service. For example, start by viewing the key metrics for your EC2 service, and then filter for a specific instance ID to analyze the EC2 instance with that ID.

Follow these steps to find and troubleshoot AWS services from the Infrastructure page:

#. Select :menuselection:`Navigation menu > Infrastructure`, then click :guilabel:`Amazon Web Services` category.

#. Select the specific service you want to analyze. For example, click :guilabel:`EBS` to view information about your storage volumes. If you see the message :guilabel:`No Data Found`, you first need to configure the integration for the service.

#. Compare instances of the services to investigate their relative health. Select a metric from the :strong:`Color by` drop-down list.
   In the heat map, colors indicate the health of each instance based on the selected metric. For example, consider an AWS EBS heat map for the total number of I/O operations in a time period (Total IOPS). The heat map displays high Total IOPS in lighter colors, which indicates that the instances are healthy. In comparison, the heat map displays low IOPS in a darker color, which indicates that the instances have a I/O-related problem.

   If the heat map only uses green and red, then green indicates a healthy instance and red indicates a problem.

   To apply visually-accessible color palettes to heat maps, select :menuselection:`<USER-ID> > App Preferences`,
   then select your desired color accessibility from the :guilabel:`Color Accessibility` menu.

#. Investigate correlations between instances and their health by grouping the instances based on a dimension, custom property, or tag. To group instances, select the metadata name from the :guilabel:`Group by` drop-down list.

   .. note:: In the DynamoDB navigator, when you view the heatmap and group the instances by ``aws_account_id``, some entries might report back as "n/a" because properties are omitted when the query is not specific enough. To work around this issue, filter by :strong:`Operation`, then group by ``aws_account_id``.

#. Outliers are another indication of instance health. An outlier is a metric value that is significantly outside the mean or median value of all other metric values. To find the outliers in metrics coming from AWS services, use the :strong:`Find Outliers` setting and specify the :strong:`Scope` and :strong:`Strategy`:

   You can select one of two :strong:`Strategies` to find outliers, as described in the following table.

   .. list-table::
      :header-rows: 1
      :widths: 30 70

      *  - :strong:`Strategy`
         - :strong:`Description`

      *  - ``Deviation from Mean``
         - Instances shown in red are ones that exceed the mean value of the metric by at least three standard deviations.
   
      *  - ``Deviation from Median``
         - Instances shown in red are ones that exceed the median absolute deviation value by at least three absolute deviations. Deviation from Median This setting does not weigh extreme outliers as heavily as the standard deviation.

#. To drill down to a specific instance you want to investigate, hover over the heatmap to find the specific instance ID, then click the cell to see the information for that ID. For every instance, Infrastructure Monitoring provides a default dashboard.

The default dashboard helps you analyze all the available metadata about the cloud service the instance is running in, the instance itself, and any custom tags associated with the instance. The default dashboard provides metric time series (MTS) for key metrics.

.. _aws-dashboards:

Use default dashboards to monitor AWS services
===========================================================

Splunk Observability Cloud provides default dashboards for supported AWS services. Default dashboards are available in dashboard groups based on the AWS service a dashboard represents data for.

To find default dashboards for AWS services, select :strong:`Navigation menu > Dashboards` and search for the AWS service you want to view dashboards for.

Explore built-in content
-------------------------------------------------------------------

To see all of the navigators provided for data collected in your organization, go to the :strong:`Infrastructure` page. To see all the pre-built dashboards for data collected in your organization, select :strong:`Dashboards > Built-in`.

The Amazon EC2 instances dashboard is powered by the CloudWatch metrics as well as the Splunk Distribution of the OpenTelemetry Collector. You need both for all the charts to display data in the built-in dashboards. To install the Collector, see :ref:`otel-install-platform`.

- If you're only using the AWS integration to fetch CloudWatch metrics, you can see all the cards representing the services where data come from, but some charts in the built-in dashboards for Amazon EC2 instances display no data.
- If you're using the AWS integration and the Smart Agent (deprecated) to fetch CloudWatch metrics, some charts in the built-in dashboards for Amazon EC2 instances display no data.
- If you have only Smart Agent (deprecated) configured, the Amazon EC2 instance navigator isn't available.
- To start using the Collector, see :ref:`migration-process`.

