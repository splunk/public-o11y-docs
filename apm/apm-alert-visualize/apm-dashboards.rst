.. _apm-dashboards:

************************************************************
Track service performance using dashboards in Splunk APM
************************************************************

.. Metadata updated: 1/23/23

.. meta::
   :description: Learn how to use built-in dashboards in Splunk APM to help you see problems occurring in real time.

Splunk APM provides a set of built-in dashboards that present  :ref:`charts<data-visualization-charts>` and visualized metrics to help you see problems occurring in real time and quickly determine whether the problem is associated with a service, a specific endpoint, or the underlying infrastructure. To learn about dashboards in Splunk Observability Cloud, see :ref:`dashboards`. 

The following image shows an example service dashboard for ``paymentservice``. 

   .. image:: /_images/apm/dashboards/dashboard-gif-2.gif
      :alt: This image shows an example APM service dashboard.

APM dashboards present request, error, and duration (RED) metrics based on :ref:`Monitoring MetricSets<monitoring-metricsets>` created from endpoint spans for your services, endpoints, and Business Workflows. They also present related host and Kubernetes metrics to help you determine whether problems are related to the underlying infrastructure, as in the following image.

   .. image:: /_images/apm/dashboards/dashboard-k8s-metrics.png
      :alt: This image shows Kubernetes metrics in an APM service dashboard.

To view host and Kubernetes metrics in your dashboards, you need to have a Splunk Distribution of OpenTelemetry Collector instance installed on your hosts and clusters. See :ref:`deploy-connector` to learn how. 

.. note::
  See :ref:`monitor-services` for a scenario involving built-in dashboards in Splunk APM. 

You can customize built-in dashboards to present the information you’re most interested in, or build your own from scratch. To learn more, see :ref:`apm-custom-dashboards`.
 
You can also create detectors directly from dashboards to receive alerts on the problems that matter most to you. See :ref:`apm-detector-from-dashboard` to learn how. 

Navigate to dashboards in Splunk APM
=======================================

You can access dashboards in APM in several places, described in the following table:

.. list-table::
   :header-rows: 1
   :widths: 20, 80

   * - :strong:`Location`
     - :strong:`Instructions`

   * - From the main menu
     - #. Select :guilabel:`Dashboards` in the main menu
       #. Select :guilabel:`APM Services` to view service and service endpoint dashboards, or select :guilabel:`APM Business Workflows` to view workflow dashboards.
       #. Use the filters in the filter bar at the top of each dashboard to select the service or workflow of interest, as well as to set the environment, time range, and other optional filters for your view.
   * - From the APM landing page
     - #. Scroll to a specific service or Business Workflow in the Services or Business Workflows table.
       #. Select the more menu (|more|) in the rightmost column and select :guilabel:`View Dashboard` from the menu. 
   * - From the service map 
     - #. Select on a service in the service map to open its sidebar. 
       #. Select :guilabel:`View Dashboard` to view a dashboard that preserves the filters you were using in the service map.

Use dashboards to troubleshoot issues in APM
=============================================
You can navigate from within a dashboard directly to the relevant troubleshooting view with all the relevant data populated. In a dashboard, select the more menu (|more|) within a chart and select :guilabel:`Troubleshoot from the Time Window` to open the troubleshooting view (which includes the service map). The dashboard’s filters are preserved so that you can continue troubleshooting issues in context. 

See :ref:`service-map` for a sample scenario of the troubleshooting view in Splunk APM. 

.. note:: Dashboards are powered by Monitoring MetricSets, which are based on service endpoints. For this reason, dashboards only display data when the selected service has at least one instrumented endpoint. 

.. _apm-custom-dashboards:

Customize APM dashboards
========================

You can customize your dashboard by setting filters, chart type, and chart resolution on a pre-built dashboard. 

Edit a specific chart by selecting its more menu (|more|) and selecting :guilabel:`Open`. This opens a detailed chart editor you can use to adjust chart type, axis labels, formulas, and more. Once you edit a chart or dashboard, select the more menu (|more|) and select :guilabel:`Save As` from the dropdown to save your customizations for future reference.  

You can also create a new dashboard from scratch. See :ref:`create-dashboard` to learn more. See :ref:`dashboard-group` to learn how you can share your custom dashboards in groups. 

Use SignalFlow to create charts
-------------------------------------

The dashboard editor provides a lot of customization options for your charts, but if you need even more flexibility, you can use SignalFlow to run calculations and create charts from your data. See the :new-page:`Analyze Data Using SignalFlow <https://dev.splunk.com/observability/docs/signalflow/>` topic in the Splunk Observability Cloud Developer Guide to learn more.

.. note:: See :ref:`dashboards-best-practices` for more tips on building informative dashboards.

.. _apm-detector-from-dashboard:

Create a detector from a dashboard
===================================

To create a detector from a dashboard, select the bell icon within a specific chart in the dashboard and select :guilabel:`New Detector From Chart`. 

If you don't have write permissions on the dashboard you're viewing, a Detector Linking pop-up informs you the detector is not linked directly to the dashboard. You can select :guilabel:`Ok` to proceed, or save a copy of the dashboard to gain write permissions so that you can create a linked detector based on your new dashboard. To learn more about linking detectors, see :ref:`linking-detectors`. 

In the New Detector window, enter a name for your detector and select :guilabel:`Create Alert Rule`. The Alert Rule guided setup opens. Follow the steps in the guided setup to configure your detector, or see :ref:`create-detectors` for more information. 

To learn more about creating detectors from charts, see :ref:`create-detector-from-chart`.
