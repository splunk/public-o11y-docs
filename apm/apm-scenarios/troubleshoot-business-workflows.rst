.. _troubleshoot-business-workflows:

Scenario: Deepu accelerates troubleshooting using Business Workflows on Tag Spotlight
***************************************************************************************

.. meta::
    :description: This Splunk APM scenario describes how to use APM Tag Spotlight of Business Workflows to accelerate troubleshooting.

Deepu, the payment service owner at Buttercup Games, wants to understand how errors in the payment service impact business KPIs. 

To understand the impact of errors on business KPIs, Deepu takes the following steps:

#. :ref:`troubleshoot-workflows-tag-spotlight`
#. :ref:`troubleshoot-workflows-errors`
#. :ref:`troubleshoot-workflows-filter`
#. :ref:`troubleshoot-workflows-trace`
#. :ref:`troubleshoot-workflows-LO`

.. _troubleshoot-workflows-tag-spotlight:

Deepu selects the payment service on the service map and opens Tag Spotlight 
===============================================================================

Deepu selects the :strong:`paymentservice` node on the service map and then selects :strong:`Tag Spotlight` to look at errors and latency for the :strong:`Workflow` tag.

..  image:: /_images/apm/apm-use-cases/TagSpotlightUseCase_OpenTagSpotlight.png
    :width: 99%
    :alt: This screenshot shows the payment service in the service map and Tag Spotlight side panel. 

.. _troubleshoot-workflows-errors:

Deepu reviews the errors by workflow 
===============================================================================

Deepu reviews the errors by workflow and notices that the requests for the :strong:`frontend:/cart/checkout` workflow return a majority of root-cause errors. 

..  image:: /_images/apm/apm-use-cases/troubleshoot-business-workflows-01-workflow.png 
    :width: 99%
    :alt: This screenshot shows the Tag Spotlight view of the payment service, which shows that the frontend:/cart/checkout workflow has the most errors

.. _troubleshoot-workflows-filter:

Deepu filters Tag Spotlight to find the subset of traces where most errors occur
=======================================================================================

Because APM supports infinite cardinality, Deepu adds the :strong:`frontend:/cart/checkout` workflow the filter and applies additional filters for :strong:`version` to ``v350.10`` and :strong:`Kind` to ``SERVER`` to examine the subset of traces where the most errors occur:

..  image:: /_images/apm/apm-use-cases/troubleshoot-business-workflows-02-add-filters.gif 
    :width: 99%
    :alt: This animated gif shows the steps to add filters for frontend:/cart/checkout workflow filtered by Version and Kind in Tag Spotlight.

.. _troubleshoot-workflows-trace:

Deepu opens an example trace
==============================

Because Splunk APM stores all traces without sampling, Deepu selects the peak of errors on the chart to see example traces of those tag combinations at that timestamp. Deepu finds that the requests from :strong:`checkoutservice` to :strong:`paymentservice` are failing. 

..  image:: /_images/apm/apm-use-cases/WorkflowUseCase_Exemplars.png
    :width: 99%
    :alt: This screenshot shows an example trace with errors in Tag Spotlight.

.. _troubleshoot-workflows-LO:

Deepu switches to Splunk Log Observer for further troubleshooting
====================================================================

Deepu remembers that version 350.10 of the payment service recently deployed a backward-incompatible change to its API. Because Deepu turned on :ref:`Related Content <get-started-relatedcontent>` in Splunk APM, Deepu can select :strong:`Logs for payment service` to switch to Splunk Log Observer to investigate whether the deployment causes the error. 

..  image:: /_images/apm/apm-use-cases/WorkflowUseCase_Logs.png
    :width: 99%
    :alt: This screenshot shows Tag Spotlight with the option to select to view Logs for paymentservice highlighted.  

Summary
===========

Using Business Workflows and Tag Spotlight Deepu quickly isolated a trace with an error. Because Deepu had related content turned on, Deepu was able to quickly navigate from the trace to logs to further investigate causes of the errors.

Learn more
==============

* For details about business workflows, see :ref:`apm-workflows`.
* For details about using Related Content, see :ref:`get-started-relatedcontent`.
* For more information about using Splunk Log Observer to detect the source of problems, see :ref:`get-started-logs`.