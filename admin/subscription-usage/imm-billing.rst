.. _imm-billing:
.. _host-overages:

***************************************************************************************
Infrastructure Monitoring billing (Host and metric plans)
***************************************************************************************

.. meta::
      :description: Manage your costs and billing in Infrastructure Monitoring

.. note:: Read this document if your organization's subscription plan is based on the number of hosts or metrics you're monitoring with Infrastructure Monitoring. If your usage plan is based on the rate at which you send data points to Infrastructure Monitoring (DPM), see :ref:`dpm-usage`. 
  
  This topic describes general aspects of your usage and consumption. For more detailed billing-related queries, contact your Splunk Account Team. 

When you exceed your subscription limits for a sustained period of time during a monthly usage period, Splunk Observability Cloud might charge overage fees to your organization.

For information on system limits, see :ref:`per-product-limits`.

.. _calc-monthly-use:

How to calculate monthly usage
=====================================

The number of hosts, containers, and other resources that Infrastructure Monitoring monitors can fluctuate significantly over the course of a month. For this reason, Observability Cloud calculates monthly usage by using averages.

- To calculate monthly usage for hosts and containers, Observability Cloud counts the number of unique hosts and containers sending metrics during each hour in the month. It then calculates the average of these counts to determine monthly usage.

- To calculate monthly usage for custom and high-resolution metrics, Observability Cloud counts the number of custom and high-resolution metrics sent during each hour in the month. It then calculates the average of these counts to determine monthly usage.

Overage fees apply to each type of object individually. 

Example
------------------------------

Let's suppose the your subscription plan covers 25 hosts and 10 containers per host, or 250 containers. 

Let's also suppose that you are over your limits as follows:

- Hosts: 35, or 10 hosts more than the subscription limit of 25.
- Containers: 300, or 50 containers more than the subscription limit of 250.

In this case, Observability Cloud charges overage fees for 10 hosts and for 50 containers.

However, paying the overage fee for 10 hosts doesn't automatically add 100 containers to your subscription limit and accommodate for the 50 additional containers. You must add 10 hosts to your subscription plan, as discussed in :ref:`avoid-fees`, to add support for an additional 100 containers.

Overage fees can be as high as 110% of the monthly list price for each element for which you are over your plan's limit. 

.. _detect-subscription-limits:

Create a detector to receive alerts about subscription limits
========================================================================

To help avoid overage fees, :ref:`create a detector <create-detectors>` to proactively monitor for potential overages and receive alerts when you are nearing a subscription limit.

When creating the detector, you can use these metrics as signals on the :guilabel:`Alert signal` tab.

.. list-table::
   :header-rows: 1
   :width: 100% 
   :widths: 25 75

   *  -  :strong:`Item to alert on`
      -  :strong:`Metric to use as the detector signal`

   *  -  Hosts
      -  ``sf.org.numResourcesMonitored``, filtered on the dimension ``resourceType:host``

   *  -  Containers
      -  ``sf.org.numResourcesMonitored``, filtered on the dimension ``resourceType:container``

   *  -  Custom metrics
      -  ``sf.org.numCustomMetrics``

   *  -  High-resolution metrics
      -  ``sf.org.numHighResolutionMetrics``

Also, consider using one of the following conditions on the :guilabel:`Alert condition` tab:

- :ref:`Static Threshold<static-threshold>` condition: Set the threshold to a relatively high percentage of your limit.

- :ref:`Resource Running Out<resource-running-out>` condition: In :guilabel:`Alert settings`, set :guilabel:`Capacity` to your limit. In :guilabel:`Alert settings`, select :guilabel:`Show advanced settings`, set the :guilabel:`Double EWMA` option to :guilabel:`Yes`.

.. _avoid-fees:

How to avoid overage fees
====================================

If you are approaching or over your limit in any area, you have a few options available to avoid overage fees:

* Monitor fewer hosts, send in fewer custom metrics, and so forth. 
* Reevaluate the size your subscription, increasing your limits to match your need for hosts, containers, custom metrics, or high-resolution metrics.
* If you have Enterprise Edition, you can manage costs associated with sending in data by setting limits on access tokens. See :ref:`admin-manage-usage` for more information.
* If you have a Standard Edition pricing plan, you can upgrade your subscription to Enterprise Edition, which includes support for monitoring more containers, custom metrics, and high-resolution metrics per host. 
* Purchase support for increasing your limits on any of these items. 
  
To get help with understanding which option is best for your organization, contact :ref:`support`.
