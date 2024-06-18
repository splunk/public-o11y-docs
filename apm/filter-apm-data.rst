.. _filter-apm-data:

Filter data in Splunk APM
************************************************************************

.. meta::
  :description: Learn about your options for filtering data in Splunk APM.

Use the filtering options on the various APM pages to refine the scope of the data you are viewing. 

.. raw:: html

  <embed>
    <h2>Available filter fields<a name="available-filter-fields" class="headerlink" href="#available-filter-fields" title="Available filter fields">¶</a></h2>
  </embed>

You can filter by the following fields in Splunk APM. 

* Time range
* Environment
* Workflow 
* Service
* Operation
* Tags

.. raw:: html

  <embed>
    <h2>Available operators<a name="available-operators" class="headerlink" href="#available-operators" title="Available operators">¶</a></h2>
  </embed>

* All filters support the equals  (``=``) operator. 
* The operation and tag filters support equals (``=``) or not equal to (``!=``).

.. raw:: html

  <embed>
    <h2>Available values<a name="available-values" class="headerlink" href="#available-values" title="Available values">¶</a></h2>
  </embed>

* The environment and workflow filters have an ``All`` selection.
* The service and operation filters support multiple values. Add multiple values select :guilabel:`Add Row`. 
* The tag filter supports selection of multiple values for a given tag. 
* The operation and tag filters support wildcards (``*``).

.. raw:: html

  <embed>
    <h2>Supported APM pages<a name="supported-APM-pages" class="headerlink" href="#supported-APM-pages" title="Supported APM pages">¶</a></h2>
  </embed>

The above filters are available on all APM pages with the exception of the service view and AlwaysOn Profiling. 

* The service view supports a time range filter and a single environment and service filter. See :ref:`apm-service-view`.
* AlwaysOn Profiling has a unique set of available filters. See :ref:`search-filter-flamegraph`.