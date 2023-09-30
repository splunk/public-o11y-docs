.. _splunk-integration-scenario1:

*******************************************************************************************************************
Scenario: Kai troubleshoots a problem faster with Splunk IT Service Intelligence and Splunk Observability Cloud
*******************************************************************************************************************

.. meta::
   :description: This scenario describers how users can use Splunk ITSI and Splunk Observability Cloud together to drill down faster on problems and reduce mean time to resolution.

Buttercup Games, a fictitious company that runs an e-commerce site to sell its games online, is suddenly experiencing degraded revenue in online sales. Kai, a site reliability engineer at Buttercup Games, uses Splunk IT Service Intelligence and Splunk Observability Cloud together to accelerate troubleshooting.

To troubleshoot the problem, Kai takes the following actions: 

1. :ref:`glass-table`

2. :ref:`synthetic-check` 



.. _glass-table:

Kai checks service health in Splunk IT Service Intelligence
===================================================================================================================

1. Kai opens Splunk IT Service Intelligence (ITSI) and navigates to a glass table that his team has configured to monitor service health. The glass table shows service health scores that update in real time.

2. Kai sees red dots under :guilabel:`Synthetics Checks` and :guilabel:`Real User Monitoring` under the :guilabel:`Checkout`` service, indicating poor health. Kai also sees a poor health indicator under :guilabel:`Real User Monitoring` and :guilabel:`Application Performance Monitoring` for the :guilabel:`Payment` service. Kai begins his investigation by clicking the red dot under :guilabel:`Synthetics Checks` for the :guilabel:`Checkout` service. 

.. image:: /_images/splunkplatform/glass_table.png
  :width: 50%
  :alt: This screenshot shows a glass table in Splunk IT Service Intelligence that tracks service health.
  

.. _synthetic-check:

1. The :guilabel:`Synthetics` view opens when Kai clicks the red dot. In the :guilabel:`Synthetics` view, Kai clicks one of the failed tests that contains a slow checkout service call. Kai notices that Splunk tracks the front-end service of each element of the Buttercup Games website. Splunk also tracks the visual experience of the end-to-end customer journey so that Kai can replay it and see what customers are seeing.

2. Kai clicks :guilabel:`Play` on the video replay in the upper right corner. The video capture shows that users are attempting to make purchases, but checkout fails. The application delivers no error or feedback to the user, making it an unacceptable customer experience. Kai closes the video replay.

3. Kai clicks the :guilabel:`APM` link next to the checkout element.
***insert screenshot of ITSI glass table***