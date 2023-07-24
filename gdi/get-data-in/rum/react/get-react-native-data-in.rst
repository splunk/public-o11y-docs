.. _rum-mobile-react:

**************************************************************
Instrument React Native applications for Splunk RUM
**************************************************************

.. meta::
   :description: Learn how to instrument your React Native applications for Splunk Observability Cloud real user monitoring / RUM and what data you can collect.

.. toctree::
   :hidden:

   Install the React Native RUM agent <install-rum-react>
   Configure the instrumentation <configure-rum-react-instrumentation>
   Manually instrument applications <manual-rum-react-instrumentation>
   React Native RUM data model <rum-react-data-model>

Instrument your React Native applications to get Real User Monitoring (RUM) data into Splunk Observability Cloud. With Splunk RUM for Mobile, you can gain insight about the performance and health of your mobile apps.

.. caution:: This distribution is currently in beta. Don't use it in production environments without extensive prior testing. Some features might not be supported or might have constrained capabilities.

.. raw:: html

   <embed>
   <h2>Get started with Splunk RUM for Mobile<a name="get-started-splunk-rum-mobile" class="headerlink" href="#get-started-splunk-rum-mobile" title="Permalink to this headline">¶</a></h2>
   </embed>

To generate all the basic installation commands for your environment and application, use the React Native guided setup. To access the React Native guided setup, follow these steps:

1. Log in to Splunk Observability Cloud.

2. Open the :new-page:`React Native guided setup <https://login.signalfx.com/#/gdi/scripted/react-native/>`. Optionally, you can navigate to the guided setup on your own:
   
   3. In the navigation menu, select :menuselection:`Data Management` to open the Integrate Your Data page.

   4. In the integration filter menu, select :guilabel:`By Use Case`.

   5. Select the :guilabel:`Monitor user experience` use case.

   6. Click the :guilabel:`React Native Instrumentation` tile to open the React Native guided setup.

For detailed installation instructions and requirements, see :ref:`react-rum-install`.

.. raw:: html

   <embed>
   <h2>See also<a name="next-steps" class="headerlink" href="#next-steps" title="Permalink to this headline">¶</a></h2>
   </embed>

* Learn about the Splunk React Native RUM data model. See :ref:`rum-react-data`.
* :ref:`configure-react-instrumentation`.
* :ref:`manual-rum-react-instrumentation`.
