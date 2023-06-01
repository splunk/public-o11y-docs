.. _metrics-finder-and-metadata-catalog:

*****************************************************************
Search the Metric Finder and Metadata catalog 
*****************************************************************

.. meta::
    :description: How to use the Metric Finder and Metadata Catalog to find, view, and edit information about metrics metadata in Splunk Observability Cloud.


Search the Metric Finder to find, view, and edit metrics and metadata in your applications. 

.. _metric-finder:

Search for metrics in the Metric Finder  
==============================================
In the Metric Finder, search using whatever information you know. For example, you can search by: 

* name of the metric, or part of the name
* metadata like dimensions, properties, and tags that are relevant to your target metric
* value of a dimension or property associated with the metric
* integration that the metric sends data from
* property of the environment it's reporting from
* exact values into the search field. For example, search a host name to find out what data the host reported.

Search guidance and syntax 
--------------------------------
Refine a search by entering more search terms or by adding filters. You can add filters by selecting in the left menu, or matching metadata in any of the search results. The following table outlines guidance for search syntax. The Metric Finder doesn't support advanced search operations like combining search terms with Boolean operators, wildcard matching in plain text search terms, or exact matches on multiple search terms aren't supported.


.. list-table::
   :header-rows: 1
   :width: 100
   :widths: 20 80

   * - :strong:`Syntax`
     - :strong:`Notes`

   * - :strong:`.`
     - Enter in a dot (.) in the search bar to see a list of possible completions for the prefix you’ve already searched.
   * - :strong:`:`
     - Enter in the name of a dimension or property followed by (:), to see a list of possible values for that key in your data.
   * - :strong:`*` 
     - Option to include wildcards in your filters. For example, ``host:test-*`` filters the results to only those with a value of ``host`` beginning with ``test-``.
   * - :strong:`!`
     - Use (!) (NOT) in your filters to exclude results. For example, ``!env:qa`` filters the results to exclude any metrics with a value of ``env`` equal to ``qa``.



Search results 
===============

Each search result is the name of a metric. Search results are URL-addressable; you can link to a set of search results using the URL for that search. For example, a plaintext search for ``docker cpu prod`` returns the top 100 metrics that contained ``docker``, ``cpu``, or ``prod`` in their name or metadata. Splunk Observability Cloud highlights the metric name, or metadata, to show what search terms it matches. 


.. _metric-descriptions:

Add metric descriptions
-----------------------------

Descriptions help users understand what metrics are measuring, especially when the names of metrics are jargon or difficult to recognize. To add a metric description select :guilabel:`Add description`, or select :guilabel:`Edit description` to edit the custom description. Some metrics have built-in descriptions like integrations, this provided description is always shown and isn't editable. The maximum length of a metric description is 1,024 characters. 

If you hover over a metric name a tooltip opens that provides information about the metric:

* metric name
* description and type
* time of creation
* number of time series 



.. _filter-or-exclude-sidebar:

Use the filter or exclude sidebar
--------------------------------------

The :guilabel:`Filter or exclude`surfaces relevant metadata from the search results. Custom categories appear at the top of the list. For more, see :ref:`managing-custom-categories`. If you don't see the value that you're looking for in the longer list, enter the value in the search field to return more relevant search results.

Hovering anywhere over a value in the left sidebar highlights the row and displays the :guilabel:`Filter` and :guilabel:`Exclude Button`. Select a value, or the :guilabel:`Filter`, to add it to your search as a filter. To exclude a value from your search results, select the :guilabel:`Exclude Button`.Exclamation point (!) at the beginning of a filter indicate an excluded term. 

.. _matching-metadata:

Match metadata
------------------------------------------------------------

When a search term that you typed also matches metric metadata (such as a dimension name or a property value), that match is shown under the metric name with a grey outline. Select the match, or the (+) icon, to add it to your search as a filter. To exclude the metadata from your search results, select the (-) icon.

.. _finding-more-results:

Increase search results
------------------------------------------------------------

If your search didn't match any metrics, change the query or remove a filter. Shorter search terms like ``util`` are likely to match more results than longer terms like ``utilization``. If you don't see any results using a long search term, try shortening it to a prefix or separating it into a few smaller terms. For example, break ``NumRequests`` into ``num requests``.

You can also uncheck :guilabel:`Active metrics only` to include inactive metrics that are no longer actively sending data to Infrastructure Monitoring in your search. By default, the Metric Finder looks for metrics that actively send data. If you uncheck this control, the time series count shown when you hover over a metric name include matching inactive time series as well as active time series.


.. _open-chart-from-metric:

Open a chart from a metric
------------------------------------------------------------

When you have found the metric you want, select the metric name to open the Chart Builder and to start building a new chart with that metric. The new metric plot includes any filters that were part of your search, as well as any matching metadata on the search result that you selected. For more information on using the Chart Builder, see :ref:`chart-builder`.


To return to search results from the new chart, select either the :guilabel:`Close` button or the Back button in your browser. If you want to save the chart to a dashboard before exiting, select the :guilabel:`Save as` button.

.. _managing-custom-categories:

Manage custom categories
------------------------------------------------------------

Custom categories help you quickly find metrics related to commonly used dimensions in your organization. If your administrators haven't created any custom categories, the custom categories section isn't visible. Infrastructure Monitoring administrators can add them. See :ref:`managing-custom-categories`.

When you select a custom category value or integration, a key-value pair is added as a search filter, and a metric search is run.

If there are more than a few values for a custom category, you can select :guilabel:`Show more` to see the first 100 results. If you don’t see the value that you’re looking for in the longer list, you can enter it in the search field to return more relevant search results.

Use custom categories to browse for metrics using features that are unique to your organization’s data, like custom tags or properties. If you use custom metrics, you can set up custom categories to surface key dimensions from your data to help your user get started. Administrators can add custom categories.

To display dimensions and properties as custom categories on the Metrics page, select :guilabel:`Add custom categories`. Select :guilabel:`Save and close` when you finish adding categories. The custom categories you added are available for use on the Metrics page. Selecting :guilabel:`Edit` lets you add, delete, or update existing custom categories.


.. _search-edit-metadata:

Use the Metadata Catalog to search and edit metadata
=================================================================

Use the Metadata Catalog to find, view, and edit information about the :ref:`metadata <metrics-dimensions-mts>` in your system, such as dimensions, properties, and tags.

.. caution:: You can't add or edit a new dimension to any object after data ingest in Splunk Observability Cloud. To learn more, see :ref:`metadata-best-practices`.  

#. Go to :menuselection:`Settings > Metric Metadata`.
#. Enter your search criteria in the :guilabel:`Search bar`. You can search for metrics, dimensions, custom properties, and tags.
    
    .. note:: As soon as you enters a search term, the search bar automatically expands a drop-down menu with a matching list of results. The listed values are marked as :strong:`metric`, :strong:`property`, or :strong:`tag`. Both dimensions and custom properties are marked as :strong:`property`. 
    
    * To search for a metric, enter the metric name you want to search for. For example, enter ``cpu.utilization``. Observability Cloud displays a chart for the metric, the metric type, and a list of properties (dimensions and custom properties) associated with the metric. 

        .. image:: /_images/images-metrics/metadata-catalog-metric-view.png
            :width: 80%
            :alt: This image shows an example of a metric search result.

    * To search for a dimension or a custom property, do one of the following:

            * Enter a dimension or custom property key. For example, enter ``host.name``. Observability Cloud displays a list of associated metrics and a list of possible values for the key.

                .. image:: /_images/images-metrics/metadata-catalog-key-view.png
                    :width: 100%
                    :alt: This image shows an example of a dimension key search result.               

            * Enter the complete dimension or custom property key-value pair. For example, enter ``host.name:appsvr01``. Observability Cloud displays all the metrics, metadata, and data links associated with the key-value pair.

                .. image:: /_images/images-metrics/metadata-catalog-pair-view.png
                    :width: 100%
                    :alt: This image shows an example of a dimension key-value pair search result.

    * To search for a tag, enter the tag you want to search for. For example, enter ``kubernetes_service_redis-cart``. Observability Cloud displays a list of metrics and properties (dimensions and custom properties) assigned with the tag.
        
        .. image:: /_images/images-metrics/metadata-catalog-tag-view.png
                    :width: 80%
                    :alt: This image shows an example of a tag search result.

#. Add or edit metadata. You can add or edit the following metadata:

    * For a metric:
        
        * Metric type: To edit metric type, select :guilabel:`Edit` next to the :strong:`Metric Type`.
        
        .. note:: While chart isn't metadata for a metric, you can also view and edit a chart when searching for a metric using the Metadata Catalog. To edit the chart associated with a metric, select :guilabel:`View In Chart` and make changes to the chart.
        
    * For a dimension or custom property:

        * Custom property: To add or edit a new custom property, select :guilabel:`Edit` or :guilabel:`Add new property...` in the :strong:`Properties` section.
        * Tag: To add or edit a new tag, select :guilabel:`Edit` or :guilabel:`Add new tag...` in the :strong:`Tags` section.
        * Data links: To add a new data link, select :guilabel:`New Link` in the :strong:`Data Links` section.

    * For a tag:
        
        * Custom property: To add or edit a new custom property to a tag, select :guilabel:`Edit` or :guilabel:`Add new property...` in the :strong:`Properties` section.

    For more information on naming custom properties and tags, see :ref:`Guidance for metric and dimension names <metric-dimension-names>`.

        


Resources
===========
For more information, see: 


.. list-table::
   :header-rows: 1
   :width: 100
   :widths: 20 80

   * - :strong:`Content`
     - :strong:`Resource`

   * - Metrics
     - :ref:`metrics-landing`.




- Use dashboards to see groupings of charts and visualizations of metrics. To learn more, see :ref:`dashboards`.
- Use navigators to see a data-driven visualization of resources in your environment that are visible to Infrastructure Monitoring. To learn more, see :ref:`use-navigators-imm`.
- Use global search to search all available data.
