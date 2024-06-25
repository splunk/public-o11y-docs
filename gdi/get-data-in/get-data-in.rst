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

Use Splunk Observability Cloud to achieve full-stack observability of all your data sources, including your infrastructure, applications, and user interfaces. Splunk Observability Cloud includes the following products:

- :ref:`Splunk Infrastructure Monitoring <infrastructure-infrastructure>`
- :ref:`Splunk Application Performance Monitoring (APM) <get-started-apm>`
- :ref:`Splunk Real User Monitoring (RUM) <rum-gdi>`
- :ref:`Splunk Log Observer <get-started-logs>` and :ref:`Log Observer Connect <logs-intro-logconnect>`

This guide provides four chapters that guide you through the process of setting up each component of Splunk Observability Cloud.

.. raw:: html 
    
    <h2>How to use this guide</h2>

You can set up each of Splunk's products, or you can choose individual components to set up.

If you're setting up all components, follow each part of each chapter in order. Otherwise, select the chapter or part you'd like to follow.

.. list-table:: 
    :header-rows: 1

    * - Chapter
      - Parts
      - Prerequisites
    * - :ref:`infrastructure-onboarding`
      - * :ref:`integrate-cloud-services`
        * :ref:`send-server-cluster-data`
        * :ref:`configure-third-party-apps`
      - None.
    * - :ref:`apm-onboarding`
      - * :ref:`instrument-back-end-services-apm`
        * :ref:`instrument-serverless-functions-apm`
        * :ref:`send-custom-data-apm`
      - None, but completing chapter 1 first is recommended.
    * - :ref:`rum-onboarding`
      - This chapter is standalone.
      - None.
    * - :ref:`api-onboarding`
      - This chapter is standalone.
      - Complete chapter 1, 2, or 3 before starting.
    * - :ref:`additional-resources`
      - This chapter is standalone.
      - Complete chapter 1, 2, or 3 before starting.