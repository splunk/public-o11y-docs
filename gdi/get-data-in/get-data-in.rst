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

.. _gdi-per-product:

Per product integration recommendations
============================================

If you're not yet implementing full-stack observability as described in the diagram above, and are using only one or a few products, see the table to learn which steps are recommended, optional, or not applicable (n/a) based on your use case. 

.. list-table::
   :header-rows: 1
   :widths: 30 17 17 17 17

   *  -  :strong:`Step`
      -  :strong:`Infrastructure Monitoring only`
      -  :strong:`APM only`
      -  :strong:`RUM only`
      -  :strong:`Sends logs?`

   *  -  :ref:`1. Integrate with cloud services <gdi-1>`
      -  :strong:`Recommended`
      -  n/a
      -  n/a
      -  Yes

   *  -  :ref:`2. Install the OpenTelemetry Collector for servers and clusters <gdi-2>`
      -  :strong:`Recommended`
      -  :strong:`Recommended`
      -  n/a
      -  Yes

   *  -  :ref:`3. Configure third-party server apps <gdi-3>`
      -  Optional
      -  Optional
      -  n/a
      -  Yes

   *  -  :ref:`4. Instrument apps and back-end services <gdi-4>`
      -  Optional
      -  :strong:`Recommended`
      -  n/a
      -  Yes

   *  -  :ref:`5. Instrument serverless functions <gdi-5>`
      -  Optional
      -  :strong:`Recommended`
      -  n/a
      -  No

   *  -  :ref:`6. Configure apps and serverless functions to send custom data <gdi-6>`
      -  n/a
      -  n/a
      -  :strong:`Recommended`
      -  No

   *  -  :ref:`7. Instrument user interfaces <gdi-7>`
      -  :strong:`Recommended`
      -  :strong:`Recommended`
      -  n/a
      -  No

   *  -  :ref:`8. Use the API to send custom data <gdi-8>`
      -  Optional
      -  Optional
      -  n/a
      -  Yes
