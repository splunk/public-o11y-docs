.. _splunk-operational-apm:

What to do when you receive a Splunk operational APM AutoDetect alert 
****************************************************************************

There are 3 Splunk operational APM AutoDetect detectors:

* Splunk operational - APM profiling messages are throttled. See :ref:`apm-autodetector-profile-msg-throttled` for more information about this detector.
* Splunk operational - APM spans are throttled. See :ref:`apm-autodetector-spans-throttled` for more information about this detector.
* Splunk operational - APM spans are blocked. See :ref:`apm-autodetector-spans-blocked` for more information about this detector.

After you receive an alert from one of the following Splunk operational APM AutoDetect detectors, here are some potential next steps: 

1. Identify when the alert threshold was exceeded.
2. Review additional metrics

Identify when the alert threshold was exceeded
================================================================= 

did your workload increase? did a new release occur?

Review additional metrics
===========================

, for example "byToken", to better understand what source is getting throttled - perhaps you have a separate token for staging, and a separate one for production. ... you can use the "byToken" metrics to see if there is anything interesting there.