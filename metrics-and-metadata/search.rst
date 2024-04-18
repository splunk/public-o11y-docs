.. _gsearch:

*****************************************************************
Search in Splunk Observability Cloud
*****************************************************************

.. meta::
  :description: Learn about how to use the Splunk Observability Cloud search feature to quickly navigate to the objects you want to see.

Use the search capability from the Splunk Observability Cloud top navigation bar to search for Splunk Application Performance Monitoring (APM) services, traceIDs, dashboards, charts, and metrics-based content. Regardless of where you are in the Observability Cloud, you can use the search capability to find metrics-based targets.

Prerequisites
=====================

The search capability will only show results for Splunk APM if your organization has access to Splunk APM. 

The search capability is currently limited to Splunk APM, dashboards, charts, Infrastructure Monitoring navigators, and docs results.

.. _prefix:

Supported search prefixes
===============================

Narrow your search results to specific types of objects by using one of the supported search prefixes to indicate what type of information you're searching for. Supported search prefixes include:

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
- navigation
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

You can either search a specific term, or define what type of object you're looking for by using one of the supported prefixes to narrow the search to specific result types.

#. Navigate to the top right hand corner and locate the magnifying glass icon. 
#. Select the search icon (magnifying glass) to launch search. From there, type in the service name you want to search. In the following example, we search for “checkoutservice.” The results include APM services, dashboards and more. 

    .. image:: /_images/images-ui/search-apm.png
       :width: 100%
       :alt: Search results for "“checkoutservice".

#. (Optional) You can narrow the search to specific types of results using the following supported prefixes. For details, see :ref:`prefix`.
#. Select one of the search results to be taken to that object.
