.. _troubleshoot-business-workflows:

**************************************************************************
Accelerate troubleshooting using Business Workflows on Tag Spotlight
**************************************************************************

.. meta::
    :description: This Splunk APM use case describes how to use APM Tag Spotlight of Business Workflows to accelerate troubleshooting.

Deepu, the payment service owner at Buttercup Games, wants to understand how errors in the payment service impact business KPIs. 

To understand the impact of errors on business KPIs, Deepu takes the following steps:

#. Deepu selects the payment service on the service map and opens Tag Spotlight 

Deepu selects the payment service on the service map and opens Tag Spotlight 
===============================================================================

Deepu selects the :strong:`paymentservice` node on the service map, and then selects :strong:`Tag Spotlight` to look at errors and latency for the :strong:`Workflow` tag.

..  image:: /_images/apm/apm-use-cases/TagSpotlightUseCase_OpenTagSpotlight.png
    :width: 99%
    :alt: This screenshot shows the Tag Spotlight view of the payment service, which shows that the frontend:/cart/checkout workflow has the most errors

Deepu selects the payment service on the service map and opens Tag Spotlight 
===============================================================================

Deepu notices that the requests of the :strong:`frontend:/cart/checkout` workflow return a majority of root cause errors. Because APM supports infinite cardinality, 

..  image:: /_images/apm/apm-use-cases/troubleshoot-business-workflows-01.png
    :width: 99%
    :alt: This screenshot shows the Tag Spotlight view of the payment service, which shows that the frontend:/cart/checkout workflow has the most errors

Deepu selects the :strong:`frontend:/cart/checkout`  workflow and applies filters to show only data from traces. Deepu filters :strong:`version` to ``v350.10`` and :strong:`Kind` to ``SERVER`` to view the tags to examine the subset of traces where the most errors occur:

..  image:: /_images/apm/apm-use-cases/troubleshoot-business-workflows-02.png
    :width: 99%
    :alt: This screenshot shows the Tag Spotlight view of the frontend:/cart/checkout workflow filtered by Version and Kind.

Because Splunk APM stores all traces without sampling, Deepu clicks the peak of errors on the chart to see example traces of those tag combinations at that timestamp. Deepu finds that the requests from :strong:`checkoutservice` to :strong:`paymentservice` are failing. 

Deepu remembers that version 350.10 of the payment service recently deployed a backwards incompatible change to its API. Because Deepu enabled :ref:`Related Content <get-started-relatedcontent>` in Splunk APM, Deepu can click :strong:`Logs for payment service` to switch to Splunk Log Observer to investigate whether the deployment causes the error. 

Learn more
==============

* For details about business workflows, see :ref:`apm-workflows`.
* For details about using Related Content, see :ref:`get-started-relatedcontent`.
* For more information about using Splunk Log Observer to detect the source of problems, see :ref:`get-started-logs`.