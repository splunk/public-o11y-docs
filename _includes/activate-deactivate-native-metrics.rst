Activate or deactivate specific metrics
---------------------------------------------

You can activate or deactivate specific metrics by setting the ``enabled`` field in the ``metrics`` section for each metric. For example:

.. code:: yaml

   receivers:
     samplereceiver:
       metrics:
         metric-one:
           enabled: true
         metric-two:
           enabled: false

.. note:: Deactivated metrics aren't sent to Splunk Observability Cloud.