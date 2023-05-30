.. _monitor-autodetect:

****************************************************
Scenario: Kai monitors system limits with AutoDetect 
****************************************************



.. meta::
    :description: This Splunk alerts and detectors scenario describes how to use AutoDetect to track system limits.

Kai, a site reliability engineer at Buttercup Games, wants to know when they are reaching their limit for the number of detectors they can create for Buttercup Games. This limit is automatically monitored through an AutoDetect detector, which Kai can view from the Alerts and Detectors page.

View AutoDetect alerts and detectors
========================================

To use their AutoDetect detector, Kai must first find and view the details of the detector. This name of the detector is :guilabel:`Splunk Operational -- Number of detectors is expected to reach the maximum`.

Kai finds the detector by following these steps:

#. Kai opens the :guilabel:`All alerts` menu and unchecks :strong:`Standard` and :strong:`Customized AutoDetect` to filter for only AutoDetect detectors.
#. Kai enters the name of the detector in the search bar.
#. Kai selects the detector from the result list.

.. image:: /_images/images-detectors-alerts/use-cases/autodetect-search.png
    :width: 100%
    :alt: This screenshot shows the detectors search list with Kai's detector appearing as the first search result.

After Kai finds the AutoDetect detector that monitors the maximum number of detectors for Buttercup Games, they can set up alerts and add a preferred notification channel.

Subscribe to AutoDetect detectors
=========================================

Kai wants to be alerted whenever their AutoDetect detector triggers an alert indicating that Buttercup Games has almost reached their maximum number of detectors. Kai can receive an alert from the system limits detector by subscribing to the detector. 

To subscribe to an AutoDetect detector, Kai follows these steps:

#. Kai finds their AutoDetect detector from the search list or their integration.
#. Kai selects :guilabel:`Add Recipients`.
#. Kai sets up the notification channel of their choice.

Kai will receive a notification whenever their AutoDetect detector triggers an alert for maximum number of detectors created.

Disable AutoDetect detectors
=========================================

Kai decides that they no longer want to use their AutoDetect detector, as Buttercup Games has not come close to reaching their system limit. In this case, Kai can disable the detector by following these steps:

#. Kai finds their detector from the search list.
#. Kai selects :guilabel:`Disable Detector`. This stops the detector from reporting on data and Kai no longer receives notifications from the detector.

Customize AutoDetect detectors
=================================

Kai's AutoDetect detector will trigger an alert when the number of detectors used is 90%, but Kai would like to be alerted when they are reaching 75% of the detectors used instead. To receive these alerts, Kai can customize the system limits AutoDetect detector.

To customize this detector, Kai follows these steps:

#. Kai selects the :guilabel:`Splunk Operational -- Number of detectors is expected to reach the maximum`` detector. 
#. In the detector menu, Kai selects :guilabel:`Create a Customized Version`.
#. Kai changes the :guilabel:`Trigger threshold` to :guilabel:`75%`.
#. Kai selects :guilabel:`Activate`. 

Kai has created a new AutoDetect detector that will alert them whenever the number of detectors used reaches 75%. 

Summary
=====================

In this scenario, Kai set up and subscribed to an AutoDetect detector that reported on system limits for Buttercup Games. Kai also learned how to find, disable, and customize the AutoDetect detector.

Learn more
=========================================

For more information about AutoDetect detectors, see :ref:`autodetect`. 

For information about AutoDetect integrations and types of AutoDetect detectors, see :ref:`autodetect-list`