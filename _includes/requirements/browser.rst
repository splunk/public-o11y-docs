The Browser RUM agent instruments all front-end experiences that run in modern browsers, regardless of the JavaScript library or framework you use, with the following requirements:

- All your pages, assets, and requests must be securely loaded over the HTTPS protocol.
- Your application must not override standard methods.

The Browser RUM agent is compatible with the all the supported versions of the following browsers:

- Google Chrome
- Google Chrome for Android
- Microsoft Edge
- Mozilla Firefox
- Apple Safari
- Apple Safari for iOS
- Chromium-based browsers

Microsoft Internet Explorer 11 is supported by a separate legacy build, available as ``splunk-otel-web-legacy.js`` in the :new-page:`release assets on GitHub <https://github.com/signalfx/splunk-otel-js-web/releases>`.

.. note:: Splunk APM is not required to instrument Splunk RUM for Browser.
