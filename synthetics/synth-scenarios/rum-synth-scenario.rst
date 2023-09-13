.. _rum-synth-scenario:

******************************************************************************************
Scenario: Compare run results to Web Vitals with Splunk RUM
******************************************************************************************


The site reliability engineering (SRE) team at the fictitious Buttercup Games company sets up tests to monitor the checkout workflow for their online store using an API test. For steps on how they setup their API test, see :ref:`api-test-scenario`.

About this scenario 
====================

The SRE team wants to determine the health of the API test by run location. The data centers for Buttercup Games are in Johannesburg and the Web Vitals for the local tests reflect optimal performance. 

#. Kai goes to the run results for their test and sees that the Buttercup Games LCP really lagged in comparison to global Web Vitals. 

.. image:: /_images/rum/web-vital-example.png
      :width: 30%
      :alt: Shows LCP range for global view. 

#. To investigate which regions are experiencing poor performance, the SRE team selects the RUM link to Tag Spotlight. 
#. The team sees that Mumbai has a large range of response times for LCP. The SRE team can apply Mumbai as a filter and explore individual user sessions to find if there are performance discrepancies in relation to the of type of browser, browser version, OS Version, App version and more.  

.. image:: /_images/rum/tag-spotlight-rum-snyth.png
      :width: 80%
      :alt: Shows Tag Spotlight dashboard for global view of LCP metric. 


Summary
=========
To learn more, see: 

* :ref:`rum-synth`
* :ref:`test-config`