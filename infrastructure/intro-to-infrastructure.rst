.. _get-started-infrastructure:

************************************************************
Introduction to Splunk Infrastructure Monitoring
************************************************************

.. meta::
  :description: Get started monitoring your infrastructure with Splunk Observability Cloud.


Gain insights into and perform powerful, capable analytics on your infrastructure and resources across hybrid and multi-cloud environments with Splunk Infrastructure Monitoring. Infrastructure Monitoring offers support for a broad range of integrations for collecting all kinds of data, from system metrics for infrastructure components to custom data from your applications.


==========================================================
Splunk Infrastructure Monitoring hierarchy
==========================================================

The following diagram gives you an overview of the different components and their hierarchical relationship in Splunk Infrastructure Monitoring.

.. mermaid::

  %%{
    init: {
      'theme': 'base',
      'themeVariables': {
        'primaryColor': '#FFFFFF',
        'primaryTextColor': '#000000',
        'primaryBorderColor': '#000000',
        'nodeBorder':'#000000',
        'lineColor': '#000000',
      }
    }
  }%%


  flowchart TB
    accTitle: Splunk Infrastructure Monitoring hierarchy
    accDescr: In Splunk Infrastructure Monitoring, realm is the all-encompassing top level. A realm contains multiple organizations. Each organization contains dashboard groups, navigators, detectors, and teams. Teams contain users. Both dashboard groups and navigators contain dashboards. Dashboards contain charts. Charts and detectors use metrics to operate. Detectors can generate alerts and send notifications.

      %% LR indicates the direction (left-to-right)

      %% You can define classes to style nodes and other elements
      classDef default fill:#FFFFFF, stroke:#000

      subgraph Splunk Infrastructure Monitoring hierarchy
      direction TB
      realm[Realm]--contains-->org[Organizations]--contain-->dashboardGroup[Dashboard groups] & navigator[Navigators] & detector[Detectors] & teams[Teams]
      dashboardGroup --contain-->dashboard[Dashboards]
      navigator--contain-->dashboard--contain-->chart[Charts]
      chart--use-->metric[Metrics]
      detector--use-->metric
      detector--generate-->alert[Alerts]
      teams--contain-->users[Users]
      alert--send-->notification[Notifications]
      end

Metrics are the driving components for Splunk Infrastructure Monitoring. To learn more about metrics, see :ref:`get-started-metrics`.


==========================================================
Get started with Splunk Infrastructure Monitoring
==========================================================

For a step-by-step tutorial on how to set up Splunk Infrastructure Monitoring, see :ref:`Quick start tutorial <quickstart-imm>`.

To learn how to get data in, monitor, and troubleshoot your infrastructure, see :ref:`infrastructure-infrastructure`.


.. _wcidw-imm:

==============================================================
What can I do with Splunk Infrastructure Monitoring?
==============================================================

Explore all you can do with Splunk Infrastructure Monitoring:

.. list-table::
  :header-rows: 1
  :widths: 50, 20, 30

  * - :strong:`Do this`
    - :strong:`With this tool`
    - :strong:`Link to documentation`

  * - Orient and explore different layers of your tech stacks, including your public cloud services, containers, and hosts.
    - Navigators
    - :ref:`use-navigators-imm`

  * - Find, view, and edit metrics you monitor, across infrastructure and over diverse applications and sources.
    - Metric Finder and Metadata Catalog
    - :ref:`metrics-finder-and-metadata-catalog`

  * - Run calculations and analytics on your data.
    - SignalFlow programs
    - :ref:`get-started-signalflow`

  * - Visualize metrics to understand your system better at a glance.
    - Dashboards and charts
    - * :ref:`dashboards`
      * :ref:`data-visualization-charts`

  * - Receive alerts and notifications to keep up with key indicators for services, infrastructure, and applications.
    - Alerts and detectors
    - :ref:`get-started-detectoralert`

  * - Easily jump between components of Splunk Observability Cloud by clicking related data.
    - Related Content
    - :ref:`get-started-relatedcontent`

For a set of interactive walkthroughs of Splunk Infrastructure Monitoring, see :new-page:`Splunk Infrastructure Monitoring scenarios <https://bossofopsando11y.com/imt/>`.

For an overview of an end-to-end experience, see :ref:`get-started-scenario`.
