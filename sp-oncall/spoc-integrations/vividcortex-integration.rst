.. _vividcortex-integration:

************************************************************************
VividCortex integration for Splunk On-Call
************************************************************************

.. meta::
   :description: The Splunk On-Call integration with VividCortex makes use of the Splunk On-Call REST endpoint to send alerts into the Splunk On-Call timeline.



VividCortex provides advanced monitoring for the most advanced opensource databases. The Splunk On-Call integration with VividCortex makes use of the Splunk On-Call REST endpoint to send alerts into the Splunk On-Call timeline. The following will guide you through the steps needed to integrate the two systems.

In Splunk On-Call
==================

#. From the main timeline, select :guilabel:`Settings`, then :guilabel:`Alert Behavior`. Then select :guilabel:`Integrations`.

.. image:: /_images/spoc/vivid1.png
    :width: 100%
    :alt: The navigation path to Integrations.

#. Select the :guilabel:`Vivid Cortex` integration.

#. Enable the integration and copy the :strong:`Service API Key` to your clipboard.

.. image:: /_images/spoc/vivid2.png
    :width: 100%
    :alt: Copy the Service API Key to your clipboard.

In VividCortex
======================

#. Select :guilabel:`Settings` then :guilabel:`Integrations`.

.. image:: /_images/spoc/vivid3.png
    :width: 100%


#. Then select :guilabel:`Create New Integration`.

.. image:: /_images/spoc/vivid4.png
    :width: 100%


#. Select the Splunk On-Call (formerly VictorOps) integration. Give the integration a name, make sure to add the appropriate Routing Key. For more information about Routing keys, see :ref:`routing-keys`.

#. Paste in the API Key you copied from Splunk On-Call, select :guilabel:`Create Integration`. 

.. image:: /_images/spoc/vivid5.png
    :width: 100%

