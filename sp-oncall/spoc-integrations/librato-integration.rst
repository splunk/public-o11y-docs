.. _librato-integration:

************************************************************************
Librato integration for Splunk On-Call
************************************************************************

.. meta::
   :description: The Splunk On-Call integration with Librato allows you to send all Librato alerts into the Splunk On-Call timeline so that the right people are paged.



Librato provides a complete solution for monitoring and understanding the metrics that impact your business at all levels of the stack.

The Splunk On-Call integration with Librato allows you to send all Librato alerts into the Splunk On-Call timeline so that the right people are paged. The following instructions go through how to quickly implement this integration.


In Splunk On-Call
==========================

From the main timeline select :guilabel:`Settings`, then :guilabel:`Alert Behavior`. Then select :guilabel:`Integrations`, then :guilabel:`AppOptics`.

.. image:: /_images/spoc/librato-1.png
    :width: 100%


If the integration has not yet been enabled, select :guilabel:`Enable Integration` to generate your Service API Key, as seen here:

.. image:: /_images/spoc/librato-2.png
    :width: 100%

Copy the Service API Key to your clipboard and determine which Splunk On-Call routing-key value will be used for this integration. For more information on routing keys and best practices, see :ref:`routing-keys`. 


In Librato
==========

First go to :guilabel:`Account Settings`

.. image:: /_images/spoc/librato-3.png
    :width: 100%

Select :guilabel:`Services` in the left side bar, and then select :guilabel:`VictorOps`, now called Splunk On-Call.

.. image:: /_images/spoc/librato4.png
    :width: 100%

Configure the new Splunk On-Call service by giving it a title, then enter your Splunk On-Call Service API Key that you'd copied earlier and Routing key.

Select :guilabel:`Create service`.

.. image:: /_images/spoc/librato-5.png
    :width: 100%

