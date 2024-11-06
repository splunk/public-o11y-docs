The Splunk Distribution of the OpenTelemetry Collector has the following components and services:

* :ref:`Receivers <collector-components-receivers>`: Determine how you'll get data into the Collector.
* :ref:`Processors <collector-components-processors>`: Configure which operations you'll perform on data before it's exported. For example, filtering.
* :ref:`Exporters <collector-components-exporters>`: Set up where to send data to. It can be one or more backends or destinations. 
* :ref:`Extensions <collector-components-extensions>`: Extend the capabilities of the Collector.
* Services. It consists of two elements:

  * List of the :ref:`extensions <collector-components-extensions>` you've configured.

  * :ref:`Pipelines <otel-data-processing>`: Path data will follow from reception, then through processing or modification, and finally exiting through exporters. 

For more information, see :ref:`otel-components`.
