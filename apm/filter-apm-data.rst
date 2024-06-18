.. _filter-apm-data:

Filter data in Splunk APM
************************************************************************

.. meta::
  :description: Learn about your options for filtering data in Splunk APM.

Use the filtering options on the various APM pages to refine the scope of the data you are viewing. 

Available filter fields
=============================

You can filter by the following fields in Splunk APM. 

* Time range
* Environment
* Workflow 
* Service
* Operation
* Tags

Available operators
=====================

* All filters support an equals operator. 
* The operation and tag filters support both equals (``=``) or not equal to (``!=``).

Available values
===================

* The environment and workflow filters have an ``All`` selection.
* The service and operation filters support multiple service and operation values by adding rows. 
* The tag filter supports selection of multiple values.
* The operation and tag filters support wildcards (``*``).

Supported APM pages
======================

The above filters are available on all APM pages with the exception of service view and AlwaysOn Profiling. 

* The service view supports a time range filter, and a single environment and service filter. 
* AlwaysOn Profiling has a unique set of available filters. See :ref:`search-filter-flamegraph`.

.. list-table::
  :header-rows: 1
  :widths: 20, 20, 20, 20, 20

  * - :strong:`APM page`
    - :strong:`Workflow filter`
    - :strong:`Service filter`
    - :strong:`Operation filter`
    - :strong:`Tag filter`

  * - Service map
    - Wildcard (``*``) is supported
    - Wildcard (``*``) is supported
    - Wildcard (``*``) and not (``!=``) are supported
    - Wildcard (``*``) and not (``!=``) are supported

  * - Tag Spotlight
    - Wildcard (``*``) is supported
    - Wildcard (``*``) is supported
    - Wildcard (``*``) and not (``!=``) are supported
    - Wildcard (``*``) and not (``!=``) are supported
 
  * - Trace Analyzer
    - Wildcard (``*``) is supported
    - Wildcard (``*``) is supported
    - Wildcard (``*``) and not (``!=``) are supported
    - Wildcard (``*``) and not (``!=``) are supported

  * - Classic Traces page
    - Wildcard (``*``) is supported
    - Wildcard (``*``) is supported
    - Wildcard (``*``) and not (``!=``) are supported
    - Wildcard (``*``) and not (``!=``) are supported

  * - Endpoint performance
  * - Database performance
  * - AlwaysOn Profiling
    - n/a
    - n/a
    - n/a
    - n/a

  * - Service view
    - n/a
    - n/a
    - n/a
    - n/a