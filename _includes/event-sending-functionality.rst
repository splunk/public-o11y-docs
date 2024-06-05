This monitor includes event-sending functionality to let you post your
own custom events to Splunk Observability Cloud. For example, you can send your
own custom event when you deploy a new version of your software or
update other parts of your infrastructure. You can then view these
events in the Splunk Observability Cloud user interface (UI).

Make monitors with event-sending functionality members of a logs
pipeline that uses a SignalFx exporter to make the event submission
requests. Use a Resource Detection processor to ensure that host
identity and other useful information is made available as event
dimensions.

For example:

.. code-block:: yaml

   service:
     pipelines:
       logs:
         receivers:
           - smartagent/<receiver>
   # Adds the Resource Detection processor to the logs pipeline.
         processors:
           - resourcedetection
         exporters:
           - signalfx
