.. _autodetect:


Use and customize AutoDetect alerts and detectors
******************************************************

.. meta::
   :description: Splunk Observability Cloud automatically alerts and detectors when you have supported integrations configured. Learn how to use and customize with AutoDetect alerts and detectors.

AutoDetect alerts and detectors are alerts and detectors that Splunk Observability Cloud automatically creates when you have supported integrations configured. AutoDetect detectors are available for Splunk APM and Splunk Infrastructure Monitoring.

.. note:: AutoDetect detectors don't count toward the maximum number of detectors you can have in your organization.

Prerequisites
==============================

To use AutoDetect alerts and detectors, you must first send data for integrations and instrumented services. AutoDetect detectors are also configured for some system settings of Splunk Observability Cloud.

See the following topics for more information on how to collect the required data:

- :ref:`apm-gdi`
- :ref:`get-started-aws`
- :new-page-ref:`kafka`
- :ref:`get-started-k8s`

After you've set up the supported integrations, AutoDetect alerts and detectors automatically appear on the :strong:`Alerts` page, the :strong:`Detectors` page, and the corresponding navigators for your integrations. 

.. note:: By default, you are not subscribed to receive notifications from AutoDetect. To learn how to subscribe to AutoDetect notifications, see :ref:`autodetect-subscribe`.

View AutoDetect alerts and detectors
======================================

You can view AutoDetect detectors on the :strong:`Alerts` page, in a navigator for a service, or in a chart.

To view a complete list of all available AutoDetect alerts and detectors in your organization, do the following:

#. From the Splunk Observability Cloud home page, go to the :strong:`Alerts` page.
#. Select the :strong:`Active Alerts` or :strong:`Detectors` tab on the :strong:`Alerts` page. AutoDetect components are indicated by the :strong:`Auto` badge.

    .. image:: /_images/images-detectors-alerts/autodetect/autodetect-alerts-page.png
      :width: 90%
      :alt: This screenshot shows what an AutoDetect component looks like on the Alerts page.

To view AutoDetect alerts and detectors specific to an instrumented service or integration, do the following:

.. tabs:: 

   .. tab:: APM

      #. From the Splunk Observability Cloud home page, go to the :strong:`APM` page.
      #. From the APM overview, click the active alerts for a service.
      #. Select the alert to see more details.

      A panel with additional details for the alert appears, as shown in the following image. AutoDetect components are indicated by the :strong:`Autodetect` badge.

      .. image:: /_images/images-detectors-alerts/autodetect/apm-detector-auto.gif
         :width: 100%
         :alt: AutoDetector details as accessed from the APM Overview page.

   .. tab:: Infrastructure

      #. From the Splunk Observability Cloud home page, go to the :strong:`Infrastructure` page.
      #. Select the navigator for the integration you want to view.
      #. On the navigator page, click :guilabel:`Alerts` or :guilabel:`Active Detectors` in the Filter bar.

      A sidebar with all alerts related to the content on the page appears, as shown in the following image. AutoDetect components are indicated by the :strong:`Auto` badge.

      .. image:: /_images/images-detectors-alerts/autodetect/autodetect-in-context.png
         :width: 100%
         :alt: AutoDetect component in the Alerts sidebar for a navigator.

      .. note:: In either view, if there is no component with the :strong:`Auto` badge, then you don't have any integration supported by AutoDetect.

If available, AutoDetect detectors are connected to a chart by default. To view AutoDetect detectors related to a chart, do the following:

#. From the Splunk Observability Cloud home page, go to the :strong:`Infrastructure` page or the :strong:`Dashboards` page.
#. Select the navigator or dashboard you want to view.
#. On the navigator or dashboard page, select the bell icon on a chart to see AutoDetect detectors linked to that chart. 

    A green dot indicates that there is no alert for the detector. A red dot indicates that the detector has an active alert.

    .. image:: /_images/images-detectors-alerts/autodetect/autodetect-linked-chart.png
      :width: 60%
      :alt: This screenshot shows where linked AutoDetect detectors are listed for a chart. In this example, there is one AutoDetect detector with a green dot, meaning there is no active alert.

.. _autodetect-subscribe:

Subscribe to AutoDetect notifications
========================================

The procedures for subscribing to AutoDetect alerts and detectors are the same as those for interacting with other alerts and detectors.

To learn how to subscribe to a detector or alert for notifications, see :ref:`manage-notifications`.

.. _autodetect-customize:

Copy and customize an AutoDetect detector
============================================

When you customize an AutoDetect detector, Splunk Observability Cloud creates a copy of the original detector for you to apply the customizations.

- Any changes you make to the customized detector don't apply to the original AutoDetect detector.
- Customized detectors created from AutoDetect detectors count toward the maximum numbers of detectors your organization can have. To learn more about detectors limit, see :ref:`maximum-number-of-detectors-per-org`.
- The default limit for customized detectors per AutoDetect detector is 15. If you want to increase this limit, contact support for help.

To customize a copy of an AutoDetect detector, do the following:

#. Log in to Observability Cloud.
#. In the navigation menu, select :menuselection:`Alerts`. 
#. Select the :strong:`Detectors` tab on the :strong:`Alerts` page.
#. In the search field, enter the name of the detector you want to customize.
    
    For example, to search for the ``K8s Node Memory Utilization is high`` detector, start by entering ``K8s Node``. The result lists update automatically.

    .. image:: /_images/images-detectors-alerts/autodetect/autodetect-search.png
      :width: 80%
      :alt: This screenshot shows what an searching for an AutoDetect looks like on the Alerts page.

#. Select the detector you want to customize to open it.
#. Select :guilabel:`Create a Customized Version`.

    .. image:: /_images/images-detectors-alerts/autodetect/autodetect-disable-customize.png
      :width: 60%
      :alt: This screenshot shows the position of the Create a Customized Version button.

#. Make customizations you want to the detector. For the full list of customizable arguments for each AutoDetect detector, see :ref:`autodetect-list`.
#. Rename your customized detector to distinguish it from the original detector and any other copy.
#. Select :guilabel:`Activate`.

Customized detectors created from AutoDetect detectors are indicated by the :strong:`Custom` badge.

    .. image:: /_images/images-detectors-alerts/autodetect/autodetect-custom.png
      :width: 90%
      :alt: This screenshot shows a customized detector indicated by the Custom badge.

Mute AutoDetect alerts and detectors
======================================

The procedures for muting AutoDetect alerts and detectors are the same as those for interacting with other alerts and detectors.

To learn how to create muting rules for alerts and detectors, see :ref:`mute-notifications`.

Turn off AutoDetect detectors
======================================

To turn off an AutoDetect detector, do the following:

#. Log in to Observability Cloud.
#. In the navigation menu, select :menuselection:`Alerts`. 
#. Select the :strong:`Detectors` tab on the :strong:`Alerts` page.
#. In the search field, enter the name of the detector you want to turn off.
    
    For example, to search for the ``K8s Node Memory Utilization is high`` detector, start by entering ``K8s Node``. The result lists update automatically.

    .. image:: /_images/images-detectors-alerts/autodetect/autodetect-search.png
      :width: 80%
      :alt: This screenshot shows what an searching for an AutoDetect looks like on the Alerts page.

#. Select the detector you want to turn off to open it.
#. Select :guilabel:`Disable Detector`.

    .. image:: /_images/images-detectors-alerts/autodetect/autodetect-disable-customize.png
      :width: 60%
      :alt: This screenshot shows the position of the Disable Detector button.

After you turn off a detector, you can no longer edit it. You need to turn on a detector before making new updates.


