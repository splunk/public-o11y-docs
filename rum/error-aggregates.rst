.. _error-aggregates:

******************************************************************************************
Error monitoring and crash aggregation in Tag spotlight 
******************************************************************************************


.. meta::
   :description: Group errors together in Splunk RUM and use the Tag spotlight to understand application crashes and drill into errors to see associated stack traces and error messages. 

Errors are aggregated based on the stack trace. The error stack trace contains the error type and error message in the body of the stack trace. The following table outlines the different ways errors are grouped together depending on the situation. 

.. list-table::
   :widths: 20 20 
   :header-rows: 1

   * - :strong:`Situation`
     - :strong:`How errors are grouped together`
   * - Errors have a stack trace
     - Errors are grouped by the hash ID of the stack trace
   * - Error groups are generated with a stack trace
     - Errors are grouped by the hash ID of the message and error type
   * - Errors don't have an error message
     - Errors are grouped by the hash ID of the error type

The error ID can represent: 

* hash ID of a stack trace
* hash ID of a message 
* hash ID of the error type 


.. _about-error-id:

About the error ID  
==========================================================================================
 
Splunk RUM groups errors based on an error ID (labeled :guilabel:`ErrorID`) that it computes for each error. Its computation is based on a hash of the error's stack trace, the error's message, and the error's type. It computes each error ID only once. The stack trace component of the hash is different depending on whether the stack trace is symbolicated or not. Therefore, the computed error ID, and hence the grouping of errors, is different depending on when you upload source maps:

* If you never upload source maps, the error IDs are based on the unreadable stack traces.
* If you upload source maps at instrumentation time, the error IDs are based on the readable stack traces.
* If you upload source maps "on-demand" (in other words, after Splunk RUM has already ingested some errors) through the UI, the error IDs of existing errors are unchanged (still based on unreadable stack traces) but the error IDs, and hence error groupings, of future errors will be different (based on  readable stack traces). If you're looking at a large enough time range to include errors ingested before and after you uploaded your source map, you will see that your application's errors are grouped differently, and the :guilabel:`Error summary` displays a message to alert you to this fact. The message varies depending on the application's platform, but is something like  :guilabel:`..older instances of this crash remain in their original groupings, but newer instances are grouped based on the de-obfuscation now available`.



Mobile crash aggregation 
==========================================================================================

A crash happens when a user encounters an error and has to exit the app. App errors are all other types of errors that occur but don't result in the user having to exit the app. For example, ANR (application not responding). 


Splunk RUM's :guilabel:`APPLICATION SUMMARY DASHBOARD` groups errors by platform:

* Browser applications each have their own section.
* Android applications are grouped by error ID.
* iOS apps are grouped by error ID.


Each error group has a unique error ID. For more information about the error ID, see :ref:`about-error-id`.

To see crashes from a specific mobile application:

#. Scroll down to the :guilabel:`Android Symbolication` or :guilabel:`iOS Symbolication` section and expand it. 
#. In the expanded section, select the :guilabel:`Crashes`, :guilabel:`App Errors`, or :guilabel:`All` tab in the pane on the right. These tabs display aggregated data with a count of the number of crashes or errors in each aggregation.
#. To see details about a specific crash or error, select it. This opens the :guilabel:`Error groups` side panel on the right.
#. In the panel on the right, Splunk RUM displays the stack trace for this crash or error. If Splunk RUM has a mapping file (Android) or dSYM (iOS) for the application that this crash or error originated from, it displays the stack trace in readable form. Otherwise, it displays the message :guilabel:`No mapping file detected`  (Android) or :guilabel:`No dSYM detected` (iOS).


View session details
------------------------------------------------------------------------------------------

The session details pane lists every session ID (span) that belongs to the user session you select. It also displays the entire timeline of the user session so that you have more insight into the events leading up to a crash. For example, you can see which views were loaded, and what requests were made.

To see session details for a specific crash:

#. Select that crash. This opens the :guilabel:`Error groups` side panel on the right.
#. In the :guilabel:`Error groups` side panel, select the :guilabel:`User Sessions` tab. This opens the list of user sessions associated with the crash you selected.
#. Select a specific session ID. This opens the :guilabel:`Crash` side panel with session details.
#. If you've uploaded source mapping for your application, you can also see a human-readable stack trace: expand :guilabel:`Stack Trace`.  



Explore top crashes across in Tag Spotlight 
------------------------------------------------------------------------------------------

From the Splunk RUM overview dashboard, select :guilabel:`See all` on the Crashes and App Errors chart to open Tag Spotlight. In Tag Spotlight you can explore application based errors, metrics, and events. 

.. image:: /_images/rum/crashes_app_errors.png
   :width: 60%
   :alt: This image shows the crashed and app errors chart in the RUM overview dashboard. 

To learn more about Tag Spotlight, see:

* :ref:`apm-tag-spotlight-overview` for an orientation to Tag Spotlight
* :ref:`troubleshoot-tag-spotlight` for a specific scenario leveraging Tag Spotlight. 



.. _mobile-connect-source-files:

Connect source files
------------------------------------------------------------------------------------------

The information in most raw crash stack traces is not fully human-readable. To make a stack trace readable, you must provide platform-specific mapping information that translates that stack trace into human-readable form:

* To upload mappping files at instrumentation time, see :ref:`add-dsyms` for iOS applications or :ref:`add-mapping-file` for Android applications.
* To upload mapping files using the widget on this dashboard, select :guilabel:`Add dSYMs` for iOS applications or :guilabel:`Add a mapping file` for Android applications. 




JavaScript error aggregation 
==========================================================================================

Splunk RUM's :guilabel:`APPLICATION SUMMARY DASHBOARD` groups errors by platform:

* Browser applications each have their own section.
* Android applications are grouped by error ID.
* iOS apps are grouped by error ID.

Each error group has a unique error ID. The JavaScript Errors metric in RUM displays JavaScript errors (grouped by error ID) which occur most often in your applications. The error ID is created by hashing the associated stack trace, error message, and error type. When you drill into an error, you can see the error type, the error message, associated stack trace, and the trend of the error frequency. For more information about the error ID, see :ref:`about-error-id`.

To see errors from a specific browser application:

#. Scroll down to the application name and expand its section. The expanded section displays a :guilabel:`JavaScript Errors` pane on the right.  
#. To see details about a specific error, select it.
#. If Splunk RUM has source mapping for this application, it displays the error's stack trace in readable form. Otherwise, it displays a message indicating that it didn't detect any source mapping that corresponds to this error.  



.. _browser-connect-source-files:

Upload source maps for readable stack traces
------------------------------------------------------------------------------------------

The information in most raw stack traces is not fully human readable. To make your raw stack traces easier for you to read, you need to provide source maps that correspond to this browser application. Source maps enable Splunk RUM to translate raw stack traces back into a human-readable form. You can either upload source maps now ("on-demand”) or at the time that you instrument your browser application:

* To upload source maps now, select Upload on this dashboard.
* To upload source maps at instrumentation time, see :ref:`set-up-javascript-source-mapping`. 


Find the top JavaScript errors across your applications in Tag Spotlight 
------------------------------------------------------------------------------------------

In Splunk RUM, the JavaScript errors view shows the JavaScript errors sorted by page, whereas the metric :guilabel:`JavaScript Errors (by error ID)` shows the top ten JavaScript errors across your entire application. In the metric :guilabel:`Frontend Errors by ErrorID` the information is displayed by error type, error ID, then error message. 

1. Open RUM. From the left navigation panel, select :guilabel:`RUM` and :guilabel:`Browser` as the source and the application you wan to monitor.  

2. To open Tag Spotlight from either the Application Summary Dashboard, or Overview pages click on any metric. 

* For example, select :guilabel:`See all` in the metric :guilabel:`JavaScript errors(by error ID)` to explore all of the JavaScript errors in Tag Spotlight. 


JavaScript errors without stacktrace, type, or message 
------------------------------------------------------------------------------------------

Sometimes, you might see a message in the UI that says :guilabel:`JavaScript error without a stacktrace, type, or message`. This might happen because the error didn't have any information about the  stack trace before it was ingested by Splunk RUM. To troubleshoot, try narrowing in on a specific time range which shows the JS error only, and explore the related  User sessions.



Learn more 
==========================================================================================

* For more examples on how you can use Tag Spotlight, see :ref:`troubleshoot-tag-spotlight`.
* To learn more about monitoring errors in Splunk RUM for browser, see the scenario :ref:`rum-identify-span-problems`.
* For examples on working with tags, see :ref:`rum-tag-search`

