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
           
The following is an example of host metrics receiver configuration with activated metrics:

.. code:: yaml

   receivers:
     hostmetrics:
       scrapers:
         process:
           metrics:
             process.cpu.utilization:
               enabled: true

.. note:: Deactivated metrics aren't sent to Splunk Observability Cloud.
