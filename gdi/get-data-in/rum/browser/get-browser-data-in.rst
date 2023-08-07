.. _browser-rum-gdi:

*******************************************************************************
Instrument browser-based web applications for Splunk RUM
*******************************************************************************

.. meta::
   :description: Learn how to instrument your browser-based web applications for Splunk Observability Cloud real user monitoring / RUM and what data you can collect.

.. toctree::
   :hidden:

   Install the Browser RUM agent <install-rum-browser>
   Instrument single-page apps <instrument-single-page-applications>
   Configure the instrumentation <configure-rum-browser-instrumentation>
   Manually instrument applications <manual-rum-browser-instrumentation>
   Migrate manual instrumentation <migrate-manual-instrumentation>
   Data collected by Browser RUM <rum-browser-data-model>
   Instrumentation-specific data <browser-rum-instrumentations>
   Errors collected by Browser RUM <browser-rum-errors>
   Browser RUM API reference <browser-rum-api-reference>
   Troubleshooting <troubleshooting>

Instrument your browser-based web applications to get Real User Monitoring (RUM) data into Splunk Observability Cloud. With Splunk RUM, you can gain insight about the performance and health of your front-end apps, including single-page applications and mobile WebViews.

.. raw:: html

   <embed>
   <h2>Get started with Splunk RUM for Browser<a name="get-started-splunk-rum-browser" class="headerlink" href="#get-started-splunk-rum-browser" title="Permalink to this headline">¶</a></h2>
   </embed>

To generate all the basic installation commands for your environment and application, use the Browser Instrumentation guided setup. To access the Browser Instrumentation guided setup, follow these steps:

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`Browser Instrumentation guided setup <https://login.signalfx.com/#/gdi/scripted/browser/step-1?category=use-case-user-experience&gdiState=%7B"integrationId":"browser"%7D>`. Optionally, you can navigate to the guided setup on your own:

   #. In the navigation menu, select :menuselection:`Data Management`. 
   
   #. Select :guilabel:`Add Integration` to open the :guilabel:`Integrate Your Data` page.
   
   #. In the integration filter menu, select :guilabel:`By Use Case`.

   #. Select the :guilabel:`Monitor user experience` use case.

   #. Select the :guilabel:`Browser Instrumentation` tile to open the Browser Instrumentation guided setup.

For detailed installation instructions and requirements, see :ref:`browser-rum-install`.

.. raw:: html

   <embed>
   <h2>See also<a name="next-steps" class="headerlink" href="#next-steps" title="Permalink to this headline">¶</a></h2>
   </embed>

* Learn about the Splunk Browser RUM data model. See :ref:`rum-browser-data`.
* Learn which errors the Browser RUM agent collects. See :ref:`browser-rum-data-js-errors`
* :ref:`configure-browser-instrumentation`.
* :ref:`manual-rum-browser-instrumentation`.
* :ref:`common-browser-troubleshooting`
