.. _autodetect-view:

View AutoDetect alerts and detectors
******************************************************

.. meta::
   :description: Splunk Observability Cloud automatically creates alerts and detectors when you have supported integrations configured. Learn how to use and customize with AutoDetect alerts and detectors.

You can view AutoDetect detectors on the :guilabel:`Alerts & Detectors` page, in a navigator or dashboard for a service, or in a chart.

To view a complete list of all available AutoDetect alerts and detectors in your organization, do the following:

#. From the Splunk Observability Cloud home page, go to the :guilabel:`Alerts & Detectors` page.
#. Select the :guilabel:`Active Alerts` or :guilabel:`Detectors` tab. Alerts genereated by AutoDetect detectors have an :guilabel:`Auto` badge. 
#. You can also select :guilabel:`AutoDetect` or :guilabel:`Customized AutoDetect` in the filter on the :guilabel:`Active Alerts` or :guilabel:`Detectors` tabs.

    .. image:: /_images/images-detectors-alerts/autodetect/autodetect-alerts-page.png
      :width: 90%
      :alt: This screenshot shows what an AutoDetect component looks like on the Alerts page.

To view AutoDetect alerts and detectors specific to an instrumented service or integration, do the following:

.. tabs:: 

   .. tab:: APM

      #. From the Splunk Observability Cloud home page, go to the :strong:`APM` page.
      #. From the APM overview, select the active alerts for a service.
      #. Select the alert to see more details.

      A panel with additional details for the alert appears, as shown in the following image. AutoDetect components are indicated by an :guilabel:`Autodetect` badge.

      .. image:: /_images/images-detectors-alerts/autodetect/apm-detector-auto.gif
         :width: 100%
         :alt: AutoDetector details as accessed from the APM Overview page.

   .. tab:: Infrastructure

      #. From the Splunk Observability Cloud home page, go to the :strong:`Infrastructure` page.
      #. Select the navigator for the integration you want to view.
      #. On the navigator page, select :guilabel:`Alerts` or :guilabel:`Active Detectors` in the filter.

         .. image:: /_images/images-detectors-alerts/autodetect/autodetect-alerts-active-detectors.png
            :width: 20%
            :alt: This screenshot shows the Alerts and Active Detectors filter options within an navigator.

      A sidebar with all alerts related to the content on the page appears, as shown in the following image. AutoDetect components are indicated by an :guilabel:`Auto` badge.

      .. image:: /_images/images-detectors-alerts/autodetect/autodetect-in-context.png
         :width: 60%
         :alt: AutoDetect component in the alerts sidebar for a navigator.

      .. note:: In either view, if there is no component with an :strong:`Auto` badge, then you don't have an integration that supports AutoDetect.

Navigate to AutoDetect detectors from dashboard and navigator charts
----------------------------------------------------------------------

Many AutoDetect detectors are connected to a charts by default. To learn how to link detectors to charts, see :ref:`linking-detectors`.

To view AutoDetect detectors related to a chart, do the following:

.. tabs:: 

   .. tab:: APM
      #. From the Splunk Observability Cloud home page, go to the :guilabel:`Dashboards` page.
      #. Select the dashboard you want to view.
      #. On the dashboard, if a chart is linked to a detector the chart has a red or green border and the bell icon is red or green. Select the bell icon on a chart to see detectors linked to that chart. 

      A green dot and chart border indicates that there are no active alerts for the detector. A red dot and chart border indicates that the detector has active alerts.

      .. image:: /_images/images-detectors-alerts/autodetect/autodetect-linked-chart-apm.png
         :width: 50%
         :alt: This screenshot shows where linked AutoDetect detectors are listed for a chart. In this example, there is one AutoDetect detector with a red dot, meaning there is an active alert.   

   .. tab:: Infrastructure

      #. From the Splunk Observability Cloud home page, go to the :strong:`Infrastructure` page or the :guilabel:`Dashboards` page.
      #. Select the navigator or dashboard you want to view.
      #. On the navigator or dashboard, if a chart is linked to a detector the chart has a red or green border and the bell icon is red or green. Select the bell icon on a chart to see detectors linked to that chart. 

      A green dot and chart border indicates that there are no active alerts for the detector. A red dot and chart border indicates that the detector has active alerts.

      .. image:: /_images/images-detectors-alerts/autodetect/autodetect-linked-chart.png
         :width: 50%
         :alt: This screenshot shows where linked AutoDetect detectors are listed for a chart. In this example, there is one AutoDetect detector with a green dot, meaning there is no active alert.     


