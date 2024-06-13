.. _get-started-get-data-in:

****************************************************************
Get data into Splunk Observability Cloud 
****************************************************************

.. meta:: 
    :description: Configure each layer of your stack to achieve full-stack observability. Follow the guide for a full onboarding experience, or choose individual components such as Splunk APM to configure.

.. toctree::
    :hidden:

    gdi-guide/infrastructure-onboarding.rst
    gdi-guide/apm-onboarding.rst
    gdi-guide/rum-onboarding.rst
    gdi-guide/api-onboarding.rst

Use Splunk Observability Cloud to achieve full-stack observability of all your data sources, including your infrastructure, applications, and user interfaces. Splunk Observability Cloud includes the following products:

- :ref:`Splunk Infrastructure Monitoring <infrastructure-infrastructure>`
- :ref:`Splunk Application Performance Monitoring (APM) <get-started-apm>`
- :ref:`Splunk Real User Monitoring (RUM) <rum-gdi>`
- :ref:`Splunk Log Observer <get-started-logs>` and :ref:`Log Observer Connect <logs-intro-logconnect>`

Here's a high-level overview of your options for getting data from each layer of your stack into the Splunk Observability Cloud product best suited to provide insights about your system. 

.. image:: /_images/gdi/GDI_sequence.png
   :width: 80%   

.. source in Figma: https://www.figma.com/file/0tm4yT04K6MlwM7dMA62ad/Docs-Graphic

For standard environments and workflows, perform all the steps described below to get the most out of Splunk Observability Cloud. However, depending on your observability goals and environment, you can choose to perform only a subset of the steps. For example, if you don't use every Splunk Observability Cloud product, or if you don't want to collect data from every eligible data source.

How to use this guide
=============================

Next: Leverage the full benefits of Splunk Observability Cloud
=============================================================================

Now that you have your desired full stack of data coming into Splunk Observability Cloud, consider exploring the following features that can help you monitor, visualize, and coordinate team work around your data:

- :ref:`Create detectors <create-detectors>` to receive alerts about conditions in your data that are important you.
- :ref:`Create charts <create-charts>` to visualize your data.
- :ref:`Use Related Content <get-started-relatedcontent>` to jump between components of Splunk Observability Cloud by clicking related data.
- :ref:`Create and customize dashboards <dashboard-create-customize>` to organize and share your charts.
- :ref:`admin-manage-teams` to coordinate team work around your data.
- Check system critical metrics, access real-time alerts, and view mobile-friendly dashboards on the go using the :ref:`Splunk Observability Cloud mobile app <intro-to-mobile>`.
- Learn more about :ref:`the Splunk Observability Cloud data model <data-model>`.
- Learn more about each product in the Splunk Observability Cloud suite:
   - :ref:`get-started-apm`
   - :ref:`get-started-infrastructure`
   - :ref:`get-started-logs`
   - :ref:`get-started-rum`