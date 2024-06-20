.. _filter-apm-data:

Filter data in Splunk APM
************************************************************************

.. meta::
  :description: Learn about your options for filtering data in Splunk APM.

Use the filtering options on the various APM pages to refine the scope of the data you are viewing. 

.. list-table::
  :header-rows: 1
  :widths: 10, 20, 30, 30

  * - :strong:`Filter field`
    - :strong:`Available operators`
    - :strong:`Available values`
    - :strong:`Supported APM pages`

  * - Time range
    - n/a
    - * Last 5 minutes (-5m)
      * Last 15 minutes (-15m)
      * Last 1 hour (-1h)
      * Last 4 hours (-4h)
      * Last 12 hours (-12h)
      * Last 1 day (-1d)
      * Last 2 days (-2d)
      * Last 8 days (-8d)
      * Custom relative ranges and absolute ranges
    - * AlwaysOn Profiling
      * Database performance 
      * Endpoint performance
      * Service map
      * Service view
      * Tag Spotlight
      * Trace Analyzer
      * Trace search (classic)
  
  * - Environment
    - Equals (``=``)
    - 1 or more environments
    - * AlwaysOn Profiling
      * Database performance 
      * Endpoint performance
      * Service map
      * Service view
      * Tag Spotlight
      * Trace Analyzer
      * Trace search (classic)

  * - Workflow
    - Equals (``=``)
    - Single workflow or ``All``
    - * Database performance 
      * Endpoint performance
      * Service map
      * Trace Analyzer
      * Trace search (classic)
  
  * - Service
    - Equals (``=``)
    - 1 or more services, wildcards (``*``) are supported 
      
      Select :guilabel:`Add Row` to add multiple services
    - * AlwaysOn Profiling - Only supports selection of 1 service
      * Database query performance 
      * Endpoint performance
      * Service map
      * Service view - Only supports selection of 1 service
      * Tag Spotlight
      * Trace Analyzer
      * Trace search (classic)
    
  * - Operation
    - * Equals (``=``)
      * Not equal to (``!=``)
    - 1 or more service-operation combinations, wildcards (``*``) are supported 
    
      Select :guilabel:`Add Row` to add multiple service-operation combinations
    - * Database query performance 
      * Endpoint performance
      * Service map
      * Tag Spotlight
      * Trace Analyzer
      * Trace search (classic)
  
  * - Tags
    - * Equals (``=``)
      * Not equal to (``!=``)
    - 1 or more indexed or unindexed tags, wildcards (``*``) are supported 
      
      You can select multiple values for the same tag. To add filters for multiple tags, select :guilabel:`Add filters` to add another tag filter.
    - * Database performance 
      * Endpoint performance
      * Service map
      * Tag Spotlight
      * Trace Analyzer
      * Trace search (classic)