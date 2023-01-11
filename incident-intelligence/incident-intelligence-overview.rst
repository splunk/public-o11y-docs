.. _ii-incident-intelligence-overview:

Splunk Incident Intelligence Overview
************************************************************************

Welcome to Incident Intelligence! Use this overview to better understand the end-to-end journey of an incident; from how it is triggered to when it is resolved. This is a high-level and doesn't include minute details that are occur at each stage. See :ref:`ii-key-terms-icons` to familiarize yourself with the icons used in the graphics in this overview. 

Detectors within Splunk Observability Cloud monitor the system. Users configure detectors at varying thresholds to generate alerts when something unusual happens, such as a bug or issue. If a specified threshold is met, alerts are generated. A single detector can generate multiple alerts, particularly when several issues occur at once; or when an issue persists over time and then causes further problems downstream. The end result is a countless number of generated alerts.

.. image:: /_images/incident-intelligence/Incident-Intelligence-Overview-1.png
      :width: 99%
      :alt: Alert generation creates alert noise.

.. _ii-key-terms-icons:

Key terms and icons
=======================

These icons are used in the overview graphics to symbolize key terms and and processes in Incident Intelligence and Splunk Observability Cloud.

.. image:: /_images/incident-intelligence/Incident-Intelligence-Overview-Terms-Icons.png
      :width: 99%
      :alt: Incident Intelligence key terms and icons.