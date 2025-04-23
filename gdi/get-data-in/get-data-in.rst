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
    gdi-guide/additional-resources.rst

Use Splunk Observability Cloud to achieve full-stack observability of all your data sources, including your infrastructure, applications, and user interfaces. Splunk Observability Cloud includes the following solutions:

- :ref:`Splunk Infrastructure Monitoring <infrastructure-infrastructure>`
- :ref:`Splunk Application Performance Monitoring (APM) <get-started-apm>`
- :ref:`Splunk Real User Monitoring (RUM) <rum-gdi>`
- :ref:`Splunk Log Observer Connect <logs-intro-logconnect>`
- :ref:`Splunk Synthetic Monitoring <intro-synthetics>` - Splunk Synthetic Monitoring does not have a data import component

This guide provides 4 chapters that guide you through the process of setting up each component of Splunk Observability Cloud. The following diagram shows the step-by-step process of setting up each Splunk Observability Cloud component:

.. image:: /_images/gdi/gdi-onboarding-diagram.png
  :width: 80%
  :alt: The step-by-step process for setting up each Splunk Observability Cloud component.


.. raw:: html 
    
    <h2>How to use this guide</h2>

You can set up each solution, or you can opt individual components to set up.

If you're setting up all components, follow each part of each chapter in order. Otherwise, select the chapter or part you'd like to follow.

    * :ref:`infrastructure-onboarding`

      - :ref:`integrate-cloud-services`
      - :ref:`send-server-cluster-data`
      - :ref:`configure-third-party-apps`

    * :ref:`apm-onboarding`

      - :ref:`instrument-back-end-services-apm`
      - :ref:`instrument-serverless-functions-apm`
      - :ref:`send-custom-data-apm`

    * :ref:`rum-onboarding`
    * :ref:`api-onboarding`
    * :ref:`additional-resources`