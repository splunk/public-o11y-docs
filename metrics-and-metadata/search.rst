.. _gsearch:

*****************************************************************
Search in Splunk Observability Cloud
*****************************************************************

.. meta::
  :description: Learn about how to use the Splunk Observability Cloud search feature to quickly navigate to the objects you want to see.

Use the search from the Splunk Observability Cloud top navigation bar to search for Splunk Application Performance Monitoring (APM) services, traceIDs, dashboards, charts, and more. Regardless of where you are in the Splunk Observability Cloud, you can use the search capability to find metrics-based targets.

Prerequisites
=====================

Search only shows results for Splunk APM if your organization has access to Splunk APM. 

Search is currently limited to Splunk APM, dashboards, charts, Infrastructure Monitoring navigators, and docs results.

.. _prefix:

Supported search prefixes
===============================

Narrow your search results to specific types of objects by using one of the supported search prefixes to indicate what type of information you're searching for. While wildcard characters are not supported, search does match on substrings. 

Supported search prefixes include:

- metric search
- dashboard
- chart
- team
- metric
- integration
- detector
- help
- dimension
- tag
- property
- navigation (takes you to the corresponding page)
- action
- trace (APM trace)
- service (APM service)
- business workflow (APM workflow)
  
.. - index (Log index) PI2
.. - saved query (Log saved query)
.. - infrastructure (infrastructure navigator)

Use the prefix in a 'key value pair' format to narrow your search. For example, enter ``service: checkoutservice`` to search for a service named ``checkoutservice``. 

You can also search using only the prefix to search for all objects of that type.


How to use observability search
=====================================

You can either search a specific term, or define what type of object you're looking for by using one of the supported prefixes to narrow the search to specific result types. This allows you to search for a specific object, if you know the type and name. Or, you can search by prefix type if you're unsure of the name. 

#. Navigate to the top right-hand corner and locate the magnifying glass icon. You can also search using the keyboard shortcut Ctrl+Shift+A.
#. Select the search icon (magnifying glass) to launch search. From there, enter the service name you want to search. The results include APM services, dashboards and more. Search displays results by category. 

    .. image:: /_images/images-ui/search-apm.png
       :width: 100%
       :alt: Search results for "“checkoutservice".

#. (Optional) You can narrow the search to specific types of results using the following supported prefixes. Use prefeixes to focus search results to a single category. For details, see :ref:`prefix`.
#. (Optional) Select a "more results" link to see more matching results in the search category. 
#. Select one of the search results to be taken to that object.
