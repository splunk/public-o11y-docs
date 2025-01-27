.. _test-config:

***************************************************
Advanced test configurations
***************************************************

.. meta::
    :description: Customize tests run in Splunk Synthetic Monitoring by setting up different devices, variables, locations, test status, and other configurations to best simulate diverse types of traffic to your site or application. 

.. toctree::

   built-in-variables
   custom-variables
   synth-alerts
   devices
   syn-downtimes
   global-variables
   private-locations
   public-locations
   rum-synth
   try-now

   

To simulate diverse types of traffic to your site or application, use a range of configuration options to customize each of your tests.

========================================================================================
Test naming conventions
========================================================================================
Choosing informative names for your tests and alerts helps organize content. Here are some guidelines: 

* Add a category as a prefix to your test name like group, application, brand, or team names so that you can simplify searches. For example, these two Browser tests start with ``[ButtercupGames]``. 

* Add a description about the purpose of the test like the workflow, process, performance, or data source.

.. image:: /_images/synthetics/ButtercupGames-naming-convention.png
      :width: 60%
      :alt: This image shows two browser tests with the prefix [ButtercupGames].


