Deactivate specific metrics
-----------------------------

You can deactivate specific metrics by setting the metric to ``enabled: false`` in the ``metrics`` section. For example:

.. code:: yaml

   receivers:
     samplereceiver:
       metrics:
         metric-one:
           enabled: false
         metric-two:
           enabled: false

Deactivated metrics aren't sent to Splunk Observability Cloud.