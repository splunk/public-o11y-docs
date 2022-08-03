.. _rum-identify-span-problems:

*****************************************************************
Identify problems in your spans
*****************************************************************

.. meta created 2021-02-12
.. meta DOCS-1963

.. meta::
  :description: Identify problems in your spans

Investigate your spans in the detail view to identify errors and other problems like long resource response times. In Splunk RUM, errors are defined as a span with an attribute of either ``status_code:5xx`` or  ``error:true``. 4xx status codes are not categorized as errors. Each span in Splunk RUM contains tags. The following definitions and examples walk through different types of errors and look for in your data.

Front-end errors
=================
In Splunk RUM, there are two types of front-end errors, explicit JavaScript console errors and uncaught JavaScript errors like onerror events. Front-end errors are shown by page and described in terms of errors per min or errors per page load or route change.

JavaScript console errors
^^^^^^^^^^^^^^^^^^^^^^^^^
A JavaScript console error is an explicit error. When an engineer calls ``console.error(...)`` the error surfaces and sometimes contains a custom error message that describes the context or cause of the error.

Uncaught JavaScript errors
^^^^^^^^^^^^^^^^^^^^^^^^^^
An uncaught JavaScript error is an implicit error. Uncaught JavaScript errors typically do not have custom error messages. Uncaught JavaScript errors can contain important information in an unedited format like a stack trace. Both caught and uncaught JavaScript errors can contain stack traces. This example span of an uncaught error from the fictitious "my-app" walks through what fields you might see in Splunk RUM in the details view.
::

  Span ID                      c85a362c4667
  Operation                    console.error

  TAGS:
  _sf_ua_browserName           Safari
  _sf_ua_browserVersion        87.0.4280.88
  _sf_ua_clientIP              exampleIP
  _sf_ua_osName                Linux
  app                          my-app
  component                    error
  error                        true
  error.message                Uncaught TypeError: Cannot read property 'Price' of undefined
  error.object                 String
  location.href                http://example
  norm.location.href           http://example
  customerId                   c123
  ot.status_code               UNSET
  splunk.rumSessionId          session123
  splunk.rumVersion	        0.0.14
  splunk.scriptInstance        instance123

Back-end errors and long resource response times
================================================
Back-end errors can be captured for both first-party and third-party endpoints.

Resource errors
^^^^^^^^^^^^^^^
In Splunk RUM, resource errors are explicit HTTP <method> event errors like fetch errors, AJAX errors and XHR requests. An XHR/fetch error happens when the server encounters an error. For example, if a user requested to access data on your application like and the data was deleted from the server. A third party resource error is when a user tries to access resource over a network and the resource is unavailable. For example, if a user on your application tries to load a javascript, css, or image resource, but it didn't load.

Resource response time
^^^^^^^^^^^^^^^^^^^^^^
Monitor the performance of endpoints with RUM to identify spikes in behavior like slow resource response.

Example span
^^^^^^^^^^^^^
This shows an example span for the fictitious "my-app" with a 404 error.
::

  Span ID                      c85a362c4668
  Operation                    HTTP GET

  TAGS:
  _sf_ua_browserName           Chrome
  _sf_ua_browserVersion        87.0.4280.88
  _sf_ua_osName                Mac OS X
  _sf_ua_osVersion             10.15.7
  app                          my-app
  component                    xml-http-request
  error                        true
  http.host                    my.app.domain.com
  http.method                  GET
  http.response_content_length 18
  http.scheme                  http
  http.status_code             404
  http.status_text             Not Found
  http.url                     /api/ratings/api/fetch/STAN-1
  http.user_agent              Mozilla/5.0 (Macintosh; Intel Mac OS X 
                              10_15_7) AppleWebKit/537.36 (KHTML, like 
                              Gecko) Chrome/87.0.4280.88 Safari/537.36
  location.href                my-app.comain.com/product/STAN-1
  orgId                        org123
  ot.status_code               UNSET
  span.kind                    client
  splunk.rumSessionId          session123
  splunk.rumVersion	           0.0.14
  splunk.scriptInstance        instance123

