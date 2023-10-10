.. _splunk-integration-scenario1:

*******************************************************************************************************************
Scenario: Kai troubleshoots a problem faster with Splunk IT Service Intelligence and Splunk Observability Cloud
*******************************************************************************************************************

.. meta::
   :description: This scenario describers how users can use Splunk ITSI and Splunk Observability Cloud together to drill down faster on problems and reduce mean time to resolution.

Buttercup Games, a fictitious company that runs an e-commerce site to sell its games online, is suddenly experiencing degraded revenue in online sales. Kai, a site reliability engineer at Buttercup Games, uses Splunk IT Service Intelligence and Splunk Observability Cloud together to accelerate troubleshooting.

To troubleshoot the problem, Kai takes the following actions: 

1. :ref:`glass-table`

2. :ref:`synthetics-check` 



.. _glass-table:

Kai checks service health in Splunk IT Service Intelligence
===================================================================================================================

1. Kai opens Splunk IT Service Intelligence (ITSI) and navigates to a glass table that monitors service health. The glass table shows service health scores that update in real time.

   .. image:: /_images/splunkplatform/glass_table.png
     :width: 100%
     :alt: This screenshot shows a glass table in Splunk IT Service Intelligence that tracks service health.

2. In the :guilabel:`Services Health Scores` section of a glass table, Kai sees red dots under :guilabel:`Synthetics Checks` and :guilabel:`Real User Monitoring` under the :guilabel:`Checkout` service, indicating poor health. Kai also sees poor health indicators under :guilabel:`Real User Monitoring` and :guilabel:`Application Performance Monitoring` for the :guilabel:`Payment` service. Kai begins the investigation by selecting the red dot under :guilabel:`Synthetics Checks` for the :guilabel:`Checkout` service, which prompts Synthetics to open in Splunk Observability Cloud.

   .. image:: /_images/splunkplatform/glass_table-close-up.png
     :width: 100%
     :alt: This screenshot shows a close up of the services health scores section of a glass table in Splunk IT Service Intelligence.


.. _synthetics-check:

Kai troubleshoots with Synthetics and APM in Splunk Observability Cloud
===================================================================================================================

1. In the :guilabel:`Synthetics` view, Kai opens one of the failed tests then scrolls down to the :guilabel:`Recent run results` section and opens one of the results. Kai notices that Splunk tracks the front-end service of each element of the Buttercup Games website. Splunk also tracks the visual experience of the end-to-end customer journey so that Kai can replay it in a video capture to see what customers are seeing.

   .. image:: /_images/splunkplatform/synth-recentrun.png
     :width: 100%
     :alt: This screenshot shows a Synthetics recently run tests.


2. Kai selects :guilabel:`Play` on the video capture in the upper right corner. The video capture shows that users are attempting to make purchases, but checkout fails. The application delivers no error or feedback to the user, making it an unacceptable customer experience. Kai closes the video replay.

   .. image:: /_images/splunkplatform/synthetics_video.png
     :width: 100%
     :alt: This screenshot shows a Synthetics view with video capture of user experience in upper right corner.


3. Kai selects the :guilabel:`APM` link next to the checkout element to open Splunk APM where they can see which procedure calls are slow, which are stalled, and which failed. Kai can use Splunk's full fidelity tracing to pivot to a reconstructed application map from the exact time of this issue or view a live service dependency map.

   .. image:: /_images/splunkplatform/synthetics2apm.png
     :width: 100%
     :alt: This screenshot shows how to link from Synthetics to APM.
     

4. In Splunk APM, Kai chooses to go to a live service map. Kai sees red lines indicating slowness between the external clients and the payment service. Kai hovers over the :guilabel:`paymentservice` and sees that it is responsible for many root cause errors.

   .. image:: /_images/splunkplatform/service_map.png
     :width: 100%
     :alt: This screenshot shows a close up of the frontend, checkout service, and payment service.

5. Kai selects :guilabel:`paymentservice` on the map to to split the payment service out by application version, revealing whether a recent code push might have negative impact on customers. On the right panel, Kai selects :guilabel:`Breakdown` then selects :guilabel:`Version`, then :guilabel:`Errors`. Sure enough, the new version of the code is causing all of the slowness and root cause errors. Kai lets the development team know that they should roll back the new version, v350.10. 

   .. image:: /_images/splunkplatform/code_version.png
     :width: 100%
     :alt: This screenshot shows the service map filtered on the payment service by code version. All errors are associated with the recent code push. 

6. Kai returns to the Splunk IT Service Intelligence glass table and is able to correlate the same application and business service with security notable events around the same time. Kai sees threat activity and some access and network activity right before that happened and immediately reports their findings to the Security team.

  