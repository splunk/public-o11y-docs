.. _syslog-receiver:

*************************
Syslog receiver
*************************

.. meta::
      :description: The Syslog receiver parses Syslogs received over TCP or UDP.

The Syslog receiver parses Syslogs received over TCP or UDP. The supported pipeline type is ``logs``. See :ref:`otel-data-processing` for more information.

Get started
======================


Data in the Filelog receiver
--------------------------------------------------------------------------

All operators either create, modify, or consume :strong:`entries`. 



Parsers with embedded operations
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



Sample configurations
--------------------------------

es
^^^^^^^^^^^^^^^^^^^^^^^^^^

This example shows how to tail a simple json file:

.. code-block:: yaml

Settings
======================

The following table shows the configuration options for the Syslog receiver:

.. raw:: html

  <div class="metrics-standard" category="included" url="https://raw.githubusercontent.com/splunk/collector-config-tools/main/cfg-metadata/receiver/syslog.yaml"></div>

Troubleshooting
======================

.. include:: /_includes/troubleshooting-components.rst
