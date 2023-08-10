.. _rum-mobile-android:

**************************************************************
Instrument Android applications for Splunk RUM
**************************************************************

.. meta::
   :description: Learn how to instrument your Android applications in Splunk Observability Cloud real user monitoring / RUM instrumentation, and what data you can collect.

.. toctree::
   :hidden:

   Install the Android RUM agent <install-rum-android>
   Configure the instrumentation <configure-rum-android-instrumentation>
   Manually instrument applications <manual-rum-android-instrumentation>
   Android RUM data model <rum-android-data-model>
   Troubleshooting <troubleshooting>

Instrument your Android applications to get Real User Monitoring (RUM) data into Splunk Observability Cloud. With Splunk RUM for Mobile, you can gain insight about the performance and health of your mobile apps.

.. raw:: html

   <embed>
   <h2>Get started with Splunk RUM for Mobile<a name="get-started-splunk-rum-mobile" class="headerlink" href="#get-started-splunk-rum-mobile" title="Permalink to this headline">¶</a></h2>
   </embed>

To generate all the basic installation commands for your environment and application, use the Android Instrumentation guided setup. To access the Android Instrumentation guided setup, follow these steps:

#. Log in to Splunk Observability Cloud.

#. Open the :new-page:`Android Instrumentation guided setup <https://login.signalfx.com/#/gdi/scripted/android/step-1?category=use-case-user-experience&gdiState=%7B"integrationId":"android"%7D>`. Optionally, you can navigate to the guided setup on your own:

   #. In the navigation menu, select :menuselection:`Data Management`. 

   #. Select :guilabel:`Add Integration` to open the :guilabel:`Integrate Your Data` page.

   #. In the integration filter menu, select :guilabel:`By Use Case`.

   #. Select the :guilabel:`Monitor user experience` use case.

   #. Select the :guilabel:`Android Instrumentation` tile to open the Android Instrumentation guided setup.

For detailed installation instructions and requirements, see :ref:`android-rum-install`.

.. raw:: html

   <embed>
   <h2>See also<a name="next-steps" class="headerlink" href="#next-steps" title="Permalink to this headline">¶</a></h2>
   </embed>

* Learn about the Splunk Android RUM data model. See :ref:`rum-android-data`.
* :ref:`configure-android-instrumentation`.
* :ref:`manual-android-instrumentation`.
* :ref:`common-android-troubleshooting`.