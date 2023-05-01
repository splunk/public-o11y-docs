.. _rum-tag-search:

******************************************
Filter your data by tags in Splunk RUM 
******************************************

.. meta::
      :description: Learn how to filter your data by tags in Splunk RUM.  

Filtering your data by tags helps you refine the scope of your search results and glean meaningful insights. In Splunk RUM, you can filter both indexed and unindexed tags using two operators, :strong:`=` and :strong:`!=`.

Understand the results of your search 
=====================================

The following examples show how search results differ depending on the combination of filters you select. 

Apply multiple filters under the same operator
-----------------------------------------------------------------

You can apply multiple filters under the same operator. For example, the following image shows how to select multiple browser types. The results from this search include metrics, events, or sessions originating from Chrome, Electron, Firefox, or Safari. 

..  image:: /_images/rum/multiple-browsers.png
    :width: 80%
    :alt: This shows how to apply multiple filters under the same = sign operator. 

Apply separate filters 
----------------------------

Suppose you want to monitor the checkout latency of your site on Chrome. If you apply the following filters, the results of the search include metrics, events, or sessions from the custom event Checkout that occurred on a Chrome browser. 

..  image:: /_images/rum/custom-rum-filter.png
    :width: 80%
    :alt: This shows how to select two different filters, in this case Browser=Chrome and Custom Event Name = Checkout. 

.. _rum-global_attributes:

Search for global attributes 
==============================

Global attributes are key-value pairs added to all reported data. Global attributes are useful for reporting app or user-specific values as tags. You can create global attributes either at the time of library initialization, or afterwards. Span attributes are custom attributes that you can add to specific spans. Custom events capture logic for a specific workflow you define, for example a checkout workflow. For more, see :ref:`rum-custom-event`. 

To search for global attributes, type the tag and value into the filter bar like in the following image:

..  image:: /_images/rum/global-attributes.png
    :width: 30%
    :alt: This shows how to search for a global attribute. in this case enduser.id=123.

.. _rum-global-attributes:

How to set global attributes
------------------------------------

For instructions on how to set global attributes, see the instrumentation documentation for: 

* :ref:`Android <android-rum-attributes>`
* :ref:`iOS <ios-rum-globalattributes>`
* :ref:`Browser <browser-rum-identify-users>`

Global attributes examples
-----------------------------------------

Suppose you want to identify users, you can add global attributes ``enduser.id`` and 
``enduser.role``. You might also consider adding ``environment`` and ``app.version``.

Span attributes example
--------------------------------

Suppose you have have an autofill function in your code, and you'd like to know whether it's turned on or off. You can use one of the following settings as a span attribute: 

* ``{'autocomplete': 'true'}``
* ``{'autocomplete': 'false'}`` 
* ``{'autocomplete_status': 'on'}``
* ``{'autocomplete_status': 'off'}`` 

Search for unindexed tags
==========================

To search for unindexed tags, type the tag and value into the filter bar. This following animation shows an example from the fictitious Buttercup Industries on how to filter by an unindexed tag called ButtercupSession. 

..  image:: /_images/rum/unindexed-tag.gif
    :width: 70%
    :alt: This shows how to search for unindexed tags by typing in the value directly into the filter box. 

After entering a value in the filter, a Session Search page appears. The page contains a list of sessions that match the filter criteria.

Undefined tag values
======================

Sometimes, you might see a message in the UI that says ``Tag value undefined``. This might happen because some data was missing when it was ingested by Splunk RUM. 

Try these steps to troubleshoot: 

* If the environment tag is undefined, try setting it in the instrumentation by following the steps here: :ref:`rum-gdi`. 
* If the tag is related to a geo location that is calculated based off of an IP address, this data could be missing if the user is on VPN. 

Search for indexed tags 
=========================

Splunk RUM provides the ability to filter on the following tags out of the box: 

.. list-table:: 
   :widths: 25 25 
   :header-rows: 1

   * - :strong:`Splunk RUM for Browser`
     - :strong:`Splunk RUM for Mobile`
   * - 
      * url name
      * operation
      * HTTP Method and status code  
      * custom event name
      * browser and version
      * OS name and version
      * city, region, country 
     - 
      * network connection 
      * HTTP method and status code
      * screen name
      * operation 
      * custom event name
      * url name
      * app version
      * device name
      * platform
      * OS name and version
      * city, region, country 

.. _rum-undefined-tag:

Why are some tag values undefined?
===================================

You might see the following message in the Splunk RUM Tag Spotlight page: ``Tag value undefined.`` This means that there were no tag values associated with the span. There are many reasons why a tag value might be undefined. Here are two examples:

* If a URL doesn't load because of a poor network connection, the HTTPS status codes might be unavailable. This situation results in the message ``Tag value undefined.`` 

* For some errors, the error type, message, or stack trace could be unavailable. In this scenario, you might see the following message: ``JS Errors without type, message or stack trace.`` This means that the spans were missing information (required to compute the ErrorId) when they were ingested into Splunk RUM.

Examples on how to filter by tags
======================================

The following examples outline how you can filter tags in Splunk RUM.

Search by status code
-----------------------

Suppose you want to filter by status code, excluding 200s. You can apply a filter like in the image below. Using the wildcard :strong:`*`, you can search for all status codes starting with 2 and then using the :strong:`!=` operator you can filter out the success status code. 

..  image:: /_images/rum/filter-status-code.png
    :width: 75%
    :alt: This shows how to search for multiple tag values using the * wildcard.  

Similarly, if you want to search for all 400 error responses, but not 404 you can apply filters like these: 

..  image:: /_images/rum/filter-400.png
    :width: 75%
    :alt: This shows how to search for multiple tag values using the * wildcard. 

Search for a specific browser version
----------------------------------------
This example shows how to search for all data from a browser version 99.0 excluding one release. 

..  image:: /_images/rum/multiple-tags-filters.png
    :width: 80%
    :alt: This shows how to search for multiple tags at the same time. 

Include all results or exclude all results 
-------------------------------------------
This search returns results for all browser versions. 

..  image:: /_images/rum/filter-all-rum.png
    :width: 30%
    :alt: This shows how to search for all results for a filter. 

If you want to search for results with no browser version you can apply the filter ``BrowserVersion != *``. 



