.. _autodetect-intro:

Intro to AutoDetect alerts and detectors
******************************************************

.. meta::
   :description: Splunk Observability Cloud automatically creates alerts and detectors when you have supported integrations configured. Learn how to use and customize with AutoDetect alerts and detectors.

AutoDetect alerts and detectors are automatically created in Splunk Observability Cloud when you have supported integrations configured. AutoDetect detectors are available for Splunk APM and Splunk Infrastructure Monitoring.

.. note:: AutoDetect detectors don't count toward the maximum number of detectors you can have in your organization.

Prerequisites
==============================

To use AutoDetect alerts and detectors, you have to first send data for integrations and instrumented services. AutoDetect detectors are also configured for some system settings of Splunk Observability Cloud.

See the following topics for more information on how to collect the required data:

- :ref:`apm-gdi`
- :ref:`get-started-aws`
- :new-page-ref:`kafka`
- :ref:`get-started-k8s`

After you've set up the supported integrations, AutoDetect alerts and detectors automatically appear on the :strong:`Alerts & Detectors` page and the corresponding dashboards and navigators for your integrations. 

.. note:: By default, you aren't subscribed to receive notifications from AutoDetect. To learn how to subscribe to AutoDetect notifications, see :ref:`autodetect-subscribe-mute-turn-off`.

See also
============

Use the following topics to learn how to use and customize AutoDetect detectors:

* :ref:`autodetect-view`
* :ref:`autodetect-customize`
* :ref:`autodetect-subscribe-mute-turn-off`