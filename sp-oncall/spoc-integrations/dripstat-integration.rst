
.. _dripstat-integration:

************************************************************************
DripStat integration for Splunk On-Call
************************************************************************

.. meta::
   :description: The Splunk On-Call (formerly VictorOps) integration allows you to send your DipStat alerts into the Splunk On-Call Timeline.



DripStat is the smartest Java APM, providing code level visibility in production. The Splunk On-Call  integration allows you to send your DipStat alerts into the Splunk On-Call Timeline. The following guide will walk you through how to setup this integration.

In Splunk On-Call
======================

From the top navigation, select :guilabel:`Integrations`.

Select the :guilabel:`DripStat` integration and copy the `Service API Endpoint` to your clipboard.

.. image:: /_images/spoc/dripstat1.png
    :width: 100%
    :alt: Copy the Service API Key.

In DripStat
=================

#. From the main dashboard select :guilabel:`Alerts` then the :guilabel:`Integrations` tan. Select the :guilabel:`VictorOps` integeration.

    .. image:: /_images/spoc/dripstat2.png
       :width: 100%
       :alt: Select the Splunk On-Call (formerly VictorOps) integration.

#. Enter in your Splunk On-Call API key and the appropriate Routing key for this integration. Then :guilabel:`Save`. For details about Routing keys, see :ref:``


You can now manage the integration from the previous Integration tab.

    .. image:: /_images/spoc/drip6.png
       :width: 100%
       :alt: Connected Integration window.

