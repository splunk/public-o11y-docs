.. _get-started-get-data-in:

****************************************************************
Get data into Splunk Observability Cloud (DRAFT)
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
