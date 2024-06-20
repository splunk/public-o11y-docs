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

Use the service filter throughout Splunk APM to filter to show data from the services you want to view. You can select 1 or more services. Select :guilabel:`Add Row` to add multiple services. Wildcards (``*``) are supported in service values.

..  image:: /_images/apm/apm-filters/apm-filters-service.png
    :width: 65%
    :alt: Service filter dropdown available in various Splunk APM pages

.. raw:: html

  <embed>
    <h2>Filter by operation<a name="filter-by-operation" class="headerlink" href="#filter-by-operation" title="Filter by operation">¶</a></h2>
  </embed>

Use the operation filter throughout Splunk APM to filter to show data from the operations you want to view. You can select 1 or more service-operation combinations. Select :guilabel:`Add Row` to add multiple service-operation combinations. Wildcards (``*``) are supported in operation values. 

.. raw:: html

 <embed>
    <h3>Available operators<a name="available-operation-operators" class="headerlink" href="#available-operation-operators" title="Available operators">¶</a></h3>
  </embed>

* Equals (``=``)
* Not equal to (``!=``)

..  image:: /_images/apm/apm-filters/apm-filters-operations.png
    :width: 65%
    :alt: Operations filter dropdown available in various Splunk APM pages

.. raw:: html

  <embed>
    <h2>Filter by tags<a name="filter-by-tags" class="headerlink" href="#filter-by-tags" title="Filter by tags">¶</a></h2>
  </embed>

Use the tag filter throughout Splunk APM to filter to show data from the tags you want to view. You can select 1 or more indexed or unindexed tags. You can select multiple values for the same tag. To add filters for multiple tags, select :guilabel:`Add filters` to add another tag filter.  Wildcards (``*``) are supported in tag values. 

.. raw:: html

 <embed>
    <h3>Available operators<a name="available-tag-operators" class="headerlink" href="#available-tag-operators" title="Available operators">¶</a></h3>
  </embed>

* Equals (``=``)
* Not equal to (``!=``)

..  image:: /_images/apm/apm-filters/apm-filters-tag.png
    :width: 65%
    :alt: Tags filter dropdown available in various Splunk APM pages

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
