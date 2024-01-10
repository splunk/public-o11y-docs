.. _autodetect-subscribe-mute-turn-off:

Subscribe to, mute, or turn off AutoDetect notifications
**********************************************************

By default, you aren't subscribed to receive notifications from AutoDetect. There are various options to choose how you are notified of alerts generated from AutoDetect detectors. See the following sections to learn how to subscribe or mute notifications or turn off the detector. 

Subscribe to AutoDetect notifications
========================================

Subscribe to detectors to receive notifications When a detector triggers an alert in Observability Cloud. The steps for subscribing to AutoDetect alerts and detectors are the same as those for other alerts and detectors.

To learn how to subscribe to a detector or alert for notifications, see :ref:`manage-notifications`.

Mute AutoDetect alerts and detectors
======================================

Mute notifications when you need to stop sending alert notifications during situations that are known to trigger alerts, such as maintenance windows or tests. The steps for muting AutoDetect alerts and detectors are the same as those for interacting with other alerts and detectors.

To learn how to create muting rules for alerts and detectors, see :ref:`mute-notifications`.

Turn off AutoDetect detectors
======================================

To turn off an AutoDetect detector, do the following:

#. In the navigation menu, select :menuselection:`Alerts & Detectors`. 
#. Select the :strong:`Detectors` tab.
#. In the search field, enter the name of the detector you want to turn off.
    
    For example, to search for the "K8s Node Memory Utilization is high" detector, enter "K8s Node."" The result list update automatically.

    .. image:: /_images/images-detectors-alerts/autodetect/autodetect-search.png
      :width: 80%
      :alt: This screenshot shows what an searching for an AutoDetect looks like on the Alerts page.

#. Select the detector you want to turn off.
#. Select :guilabel:`Disable Detector`.

    .. image:: /_images/images-detectors-alerts/autodetect/autodetect-disable-customize.png
      :width: 60%
      :alt: This screenshot shows the position of the Disable Detector button.

After you turn off a detector, you can no longer edit it. You need to turn on a detector before making new updates.
