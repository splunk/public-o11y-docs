.. _troubleshoot-tag-spotlight:

Scenario: Deepu finds the root cause of an error using Tag Spotlight
*********************************************************************

.. meta::
    :description: This Splunk APM scenario describes how to use APM Tag Spotlight to find root cause errors.

Deepu receives a notification from Kai, the site reliability engineer. The notification says that the high root cause error rate with the ``/PaymentService/Charge`` endpoint is preventing customers from shopping on the Buttercup Games website. The notification also includes a link to the endpoint on the Splunk APM service map. 

To troubleshoot the issue, Deepu takes the following steps:

#. :ref:`open-tag-spotlight`
#. :ref:`correlated-errors`
#. :ref:`version-tag`
#. :ref:`tag-spotlight-use-case-example-trace`
#. :ref:`tag-spotlight-use-case-log-observer`

.. _open-tag-spotlight:

Deepu selects the affected service on the service map and opens Tag Spotlight 
===============================================================================

Deepu selects the :strong:`paymentservice` node on the service map and selects the :strong:`Tag Spotlight` view on the sidebar. 

..  image:: /_images/apm/apm-use-cases/TagSpotlightUseCase_OpenTagSpotlight.png
    :width: 99%
    :alt: This screenshot shows the payment service in the service map and Tag Spotlight side panel. 

.. _correlated-errors:

Deepu reviews Tag Spotlight for tags that are correlated with errors
=========================================================================================

Deepu scans through the requests and errors correlated with each indexed tag in the payment service.

..  image:: /_images/apm/apm-use-cases/troubleshoot-tag-spotlight-01.png
    :width: 99%
    :alt: This screenshot shows the Tag Spotlight view of the payment service.

.. _version-tag:

Deepu notices errors differ based on the version tag
======================================================

Deepu sees that the errors are evenly distributed for all tag values except the :strong:`version` tag. All errors occur in version 350.10, a recent code release for the service. Deepu rolls back to the previous release, version 350.9, to keep the site running while notifying and waiting for the engineers to solve the issue.

..  image:: /_images/apm/apm-use-cases/TagSpotlightUseCase_VersionTag.png
    :width: 50%
    :alt: This screenshot shows the data based in the indexed version tag in Tag Spotlight. 

.. _tag-spotlight-use-case-example-trace:

Deepu opens an example trace
==============================

Deepu narrows the investigation to the code in version 350.10 of the ``/PaymentService/Charge`` endpoint and selects the :strong:`Request/Errors` chart to get an example trace to see what the error is. 

..  image:: /_images/apm/apm-use-cases/TagSpotlightUseCase_ExampleTrace.png
    :width: 99%
    :alt: This screenshot shows an example trace with errors in Tag Spotlight.

.. _tag-spotlight-use-case-log-observer:

Deepu switches to Splunk Log Observer for further troubleshooting
===================================================================

Because Deepu turned on Related Content in Splunk APM, Deepu can select :strong:`Logs for trace` to switch to Splunk Log Observer for further troubleshooting. 

..  image:: /_images/apm/apm-use-cases/TagSpotlightUseCase_LogsForTrace.png
    :width: 99%
    :alt: This screenshot shows a trace view with the option to review the logs for the trace.

Summary
===========

Deepu used Tag Spotlight to quickly isolate a recent code release as the cause of errors that prevented customers from shopping on the Buttercup Games website. Using the links to example traces in Tag Spotlight, they quickly navigate to an example trace and its corresponding logs to further troubleshoot.

Learn more
============

* For details about Tag Spotlight, see :ref:`apm-tag-spotlight`.
* For an interactive walkthrough of Tag Spotlight, see :new-page:`APM Tag Spotlight Scenario <https://quickdraw.splunk.com/redirect/?product=Observability&location=apm-tag-spotlight-walkthrough&version=current>`. 
* For details about using Related Content, see :ref:`get-started-relatedcontent`.
* For more information about using Splunk Log Observer to detect the source of problems, see :ref:`get-started-logs`. 
