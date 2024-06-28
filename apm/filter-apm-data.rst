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

Use the time range filter throughout Splunk APM and Splunk Observability Cloud to filter data to the time range you want to view. The time range selector has 8 default relative values from last 5 minutes to last 8 days. You can also select custom or relative time ranges. See :ref:`time-range-selector`.

..  image:: /_images/apm/apm-filters/apm-filters-time-range.png
    :width: 35%
    :alt: Time range filter dropdown available in various Splunk APM pages

.. raw:: html

  <embed>
    <h2>Filter by environment<a name="filter-by-environment" class="headerlink" href="#filter-by-environment" title="Filter by environment">¶</a></h2>
  </embed>

Use the environment filter throughout Splunk APM to filter to show data from the environment you want to view. You can select 1 or more environments.

..  image:: /_images/apm/apm-filters/apm-filters-environment.png
    :width: 35%
    :alt: Environment filter dropdown available in various Splunk APM pages

.. raw:: html

  <embed>
    <h2>Filter by workflow<a name="filter-by-workflow" class="headerlink" href="#filter-by-workflow" title="Filter by workflow">¶</a></h2>
  </embed>

Use the workflows filter throughout Splunk APM to filter to show data from the workflow you want to view. You can select 1 workflow or ``All``. Wildcards (``*``) are supported in workflow values.

..  image:: /_images/apm/apm-filters/apm-filters-workflows.png
    :width: 35%
    :alt: Workflows filter dropdown available in various Splunk APM pages

.. raw:: html

  <embed>
    <h2>Filter by service<a name="filter-by-service" class="headerlink" href="#filter-by-service" title="Filter by service">¶</a></h2>
  </embed>

Use the service filter throughout Splunk APM to filter to show data from the services you want to view. On some pages you can select more than 1 service by selecting :guilabel:`Add Row` to add multiple services. Wildcards (``*``) are supported in service values.

..  image:: /_images/apm/apm-filters/apm-filters-service.png
    :width: 65%
    :alt: Service filter dropdown available in various Splunk APM pages

.. raw:: html

  <embed>
    <h2>Filter by operation<a name="filter-by-operation" class="headerlink" href="#filter-by-operation" title="Filter by operation">¶</a></h2>
  </embed>

Use the operation filter throughout Splunk APM to filter to show data from the operations you want to view. You can select 1 or more service-operation combinations. Select :guilabel:`Add Row` to add multiple service-operation combinations. Wildcards (``*``) are supported in operation values. 

..  image:: /_images/apm/apm-filters/apm-filters-operations.png
    :width: 65%
    :alt: Operations filter dropdown available in various Splunk APM pages

.. raw:: html

  <embed>
    <h2>Filter by tags<a name="filter-by-tags" class="headerlink" href="#filter-by-tags" title="Filter by tags">¶</a></h2>
  </embed>

Use the tag filter throughout Splunk APM to filter to show data from the tags you want to view. You can select 1 or more indexed or unindexed tags. You can select multiple values for the same tag. To add filters for multiple tags, select :guilabel:`Add filters` to add another tag filter.  Wildcards (``*``) are supported in tag values. 

..  image:: /_images/apm/apm-filters/apm-filters-tag.png
    :width: 65%
    :alt: Tags filter dropdown available in various Splunk APM pages

.. raw:: html

  <embed>
    <h2>Wildcard, not equals, and APM page support<a name="filter-support" class="headerlink" href="#fiter-supported" title="Wildcard, not equals, and APM page support">¶</a></h2>
  </embed>

.. list-table::
  :header-rows: 1
  :width: 100%
  :widths: 20, 20, 20, 40

  * - :strong:`Filter`
    - :strong:`Not equals support`
    - :strong:`Wildcard support`
    - :strong:`APM pages`

  * - Time range 
    - No
    - No
    - * AlwaysOn Profiling
      * Database query performance
      * Endpoint performance
      * Service map
      * Service view
      * Tag Spotlight
      * Trace Analyzer
      * Trace search (classic)

  * - Environment
    - No
    - No
    - * AlwaysOn Profiling
      * Database query performance
      * Endpoint performance
      * Service map
      * Service view
      * Tag Spotlight
      * Trace Analyzer
      * Trace search (classic)

  * - Workflow
    - No
    - Yes
    - * Database query performance
      * Endpoint performance
      * Service map
      * Tag Spotlight
      * Trace Analyzer
      * Trace search (classic)


  * - Service
    - No
    - Yes
    - * AlwaysOn Profiling (1 service only)
      * Database query performance
      * Endpoint performance
      * Service map
      * Service view (1 service only)
      * Tag Spotlight 
      * Trace Analyzer (1 service only)
      * Trace search (classic) (1 service only)


  * - Operation
    - Yes
    - Yes
    - * Database query performance
      * Endpoint performance
      * Service map
      * Tag Spotlight
      * Trace Analyzer
      * Trace search (classic)


  * - Tag
    - Yes
    - Yes
    - * Database query performance
      * Endpoint performance
      * Service map
      * Tag Spotlight
      * Trace Analyzer
      * Trace search (classic)