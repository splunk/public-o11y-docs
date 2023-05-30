.. _configure-react-instrumentation:

*****************************************************************
Configure the Splunk React Native RUM instrumentation
*****************************************************************

.. meta::
   :description: Configure the Splunk Observability Cloud real user monitoring / RUM instrumentation for your React Native applications.

You can configure the Splunk Distribution of OpenTelemetry for React Native to add custom attributes, adapt the instrumentation to your environment and application, and more.

To configure the React Native RUM agent, add the key-value pairs to a ``ReactNativeConfiguration`` object. For example:

.. code:: javascript

   const RumConfig: ReactNativeConfiguration = {
      realm: '<realm>',
      rumAccessToken: '<rum-access-token>',
      applicationName: '<your-app-name>',
      environment: '<your-environment>',
      debug: true,
      /**
         * URLs that partially match any regex in ignoreUrls aren't traced.
         * URLs that are exact matches of strings in ignoreUrls aren't traced.
      */
      ignoreUrls: ['http://sampleurl.org'],
   }

.. _react-rum-settings:

General settings
======================================================

Use the following settings to configure the React Native RUM agent:

.. list-table:: 
   :header-rows: 1
   :widths: 20 80

   * - Option
     - Description
   * - :code:`beaconEndpoint`
     - Ingest URL to which the agent sends collected telemetry. The URL must contain your realm in Splunk Observability Cloud. For example, ``https://rum-ingest.us0.signalfx.com/v1/rum`` is the ingest URL for the ``us0`` realm.
   * - :code:`rumAccessToken`
     - RUM token that authorizes the agent to send telemetry data to Splunk Observability Cloud. To generate a RUM access token, see :ref:`rum-access-token`.
   * - :code:`globalAttributes`
     - Sets additional attributes added to all spans. Attributes are defined as an array of comma-separated key-value pairs. For example: ``["key1":"value1","key2":3]``. See :ref:`react-rum-globalattributes`.
   * - :code:`environment`
     - Environment for all the spans produced by the application. For example, ``dev``, ``test``, or ``prod``.
   * - :code:`ignoreUrls`
     - Regular expression pattern that matches URLs you want to ignore when reporting HTTP activity.
   * - :code:`debug`
     - Activates debug logging. The default value is ``false``.