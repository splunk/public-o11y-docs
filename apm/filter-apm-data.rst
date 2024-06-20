.. _filter-apm-data:

Filter data in Splunk APM
************************************************************************

.. meta::
  :description: Learn about your options for filtering data in Splunk APM.

Use the filtering options on the various APM pages to refine the scope of the data you are viewing. 

.. raw:: html

  <embed>
    <h2>Filter by time range<a name="filter-by-time-range" class="headerlink" href="#filter-by-time-range" title="Filter by time range">¶</a></h2>
  </embed>

Use the time range selector throughout Splunk APM and Splunk Observability Cloud to filter data to the time range you want to view. . The time range selector has 8 default relative values from the last 5 minutes to the last 8 days. You can also select custom or relative time ranges.

.. raw:: html

 <embed>
    <h3>Available time range values<a name="available-time-range-values" class="headerlink" href="#available-time-range-values" title="Available time range values">¶</a></h3>
  </embed>

* Last 5 minutes (-5m)
* Last 15 minutes (-15m)
* Last 1 hour (-1h)
* Last 4 hours (-4h)
* Last 12 hours (-12h)
* Last 1 day (-1d)
* Last 2 days (-2d)
* Last 8 days (-8d)
* Custom relative ranges and absolute ranges

See :ref:`time-range-selector`.

.. raw:: html

  <embed>
    <h2>Filter by environment<a name="filter-by-environment" class="headerlink" href="#filter-by-environment" title="Filter by environment">¶</a></h2>
  </embed>

.. raw:: html

 <embed>
    <h3>Available environment values<a name="available-environment-values" class="headerlink" href="#available-environment-values" title="Available environment values">¶</a></h3>
  </embed>

You can select 1 or more environments.

.. raw:: html

  <embed>
    <h2>Filter by workflow<a name="filter-by-workflow" class="headerlink" href="#filter-by-workflow" title="Filter by workflow">¶</a></h2>
  </embed>

.. raw:: html

 <embed>
    <h3>Available workflow values<a name="available-workflow-values" class="headerlink" href="#available-workflow-values" title="Available workflow values">¶</a></h3>
  </embed>

You can select 1 workflow or ``All``.

.. raw:: html

  <embed>
    <h2>Filter by service<a name="filter-by-service" class="headerlink" href="#filter-by-service" title="Filter by service">¶</a></h2>
  </embed>

.. raw:: html

 <embed>
    <h3>Available service values<a name="available-service-values" class="headerlink" href="#available-service-values" title="Available service values">¶</a></h3>
  </embed>

You can select 1 or more services. Select :guilabel:`Add Row` to add multiple services. Wildcards (``*``) are supported in service values.

.. raw:: html

  <embed>
    <h2>Filter by operation<a name="filter-by-operation" class="headerlink" href="#filter-by-operation" title="Filter by operation">¶</a></h2>
  </embed>

.. raw:: html

 <embed>
    <h3>Available operators<a name="available-operation-operators" class="headerlink" href="#available-operation-operators" title="Available operators">¶</a></h3>
  </embed>

* Equals (``=``)
* Not equal to (``!=``)

.. raw:: html

 <embed>
    <h3>Available operation values<a name="available-operation-values" class="headerlink" href="#available-operation-values" title="Available operation values">¶</a></h3>
  </embed>

You can s elect 1 or more service-operation combinations. Select :guilabel:`Add Row` to add multiple service-operation combinations. Wildcards (``*``) are supported in operation values. 

.. raw:: html

  <embed>
    <h2>Filter by tags<a name="filter-by-tags" class="headerlink" href="#filter-by-tags" title="Filter by tags">¶</a></h2>
  </embed>

.. raw:: html

 <embed>
    <h3>Available operators<a name="available-tag-operators" class="headerlink" href="#available-tag-operators" title="Available operators">¶</a></h3>
  </embed>

* Equals (``=``)
* Not equal to (``!=``)

.. raw:: html

 <embed>
    <h3>Available tag values<a name="available-tag-values" class="headerlink" href="#available-tag-values" title="Available tag values">¶</a></h3>
  </embed>

You can select 1 or more indexed or unindexed tags. You can select multiple values for the same tag. To add filters for multiple tags, select :guilabel:`Add filters` to add another tag filter.  Wildcards (``*``) are supported in operation values. 

.. raw:: html

  <embed>
    <h2>Supported APM pages<a name="supported-apm-pages" class="headerlink" href="#supported-apm-pages" title="Supported APM pages">¶</a></h2>
  </embed>

.. list-table::
  :header-rows: 1
  :widths: 14, 14, 14, 14, 14, 14, 14

  * - :strong:`APM page`
    - :strong:`Time range filter`
    - :strong:`Environment filter`
    - :strong:`Workflow filter`
    - :strong:`Service filter`
    - :strong:`Operation filter`
    - :strong:`Tag filter`

  * - AlwaysOn Profiling
    - Yes
    - Yes
    - No
    - Yes (Supports the selection of only 1 service)
    - No
    - No

  * - Database query performance
    - Yes
    - Yes
    - Yes
    - Yes
    - Yes
    - Yes

  * - Endpoint performance
    - Yes
    - Yes
    - Yes
    - Yes
    - Yes
    - Yes

  * - Service map
    - Yes
    - Yes
    - Yes
    - Yes
    - Yes
    - Yes

  * - Service view
    - Yes
    - Yes
    - No
    - Yes (Supports selection of only 1 service)
    - No
    - No

  * - Tag Spotlight
    - Yes
    - Yes
    - No
    - Yes
    - Yes
    - Yes


  * - Trace Analyzer
    - Yes
    - Yes
    - Yes
    - Yes
    - Yes
    - Yes

  * - Trace search (classic)
    - Yes
    - Yes
    - Yes
    - Yes
    - Yes
    - Yes

.. list-table::
  :header-rows: 1
  :widths: 10, 15, 35, 30

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
    - 1 workflow or ``All``
    - * Database performance 
      * Endpoint performance
      * Service map
      * Trace Analyzer
      * Trace search (classic)
  
  * - Service
    - Equals (``=``)
    - 1 or more services, wildcards (``*``) are supported. Select :guilabel:`Add Row` to add multiple services
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
    - 1 or more service-operation combinations. Select :guilabel:`Add Row` to add multiple service-operation combinations.

      Wildcards (``*``) are supported. 
    - * Database query performance 
      * Endpoint performance
      * Service map
      * Tag Spotlight
      * Trace Analyzer
      * Trace search (classic)
  
  * - Tags
    - * Equals (``=``)
      * Not equal to (``!=``)
    - 1 or more indexed or unindexed tags. You can select multiple values for the same tag. To add filters for multiple tags, select :guilabel:`Add filters` to add another tag filter.
      
      Wildcards (``*``) are supported 
    - * Database performance 
      * Endpoint performance
      * Service map
      * Tag Spotlight
      * Trace Analyzer
      * Trace search (classic)