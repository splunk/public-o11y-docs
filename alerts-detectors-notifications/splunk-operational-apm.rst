.. _splunk-operational-apm:

What to do when you receive a Splunk operational APM AutoDetect alert 
****************************************************************************

After you receive an alert from one of the following Splunk operational APM AutoDetect detectors, here are some potential next steps: 

1. Identify when the corresponding alert threshold was exceeded. did your workload increase? did a new release occur?
2. Review additional metrics, for example "byToken", to better understand what source is getting throttled - perhaps you have a separate token for staging, and a separate one for production. ... you can use the "byToken" metrics to see if there is anything interesting there.