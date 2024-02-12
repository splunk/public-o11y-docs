.. _public-locations:

*****************
Public locations
*****************

.. meta::
    :description: Run synthetic tests from locations set by infrastructure and connectivity providers to simulate performance for users in that location.

Public locations are global checkpoints from which you can run synthetic tests to simulate performance for users in that location.

Splunk Synthetic Monitoring partners with infrastructure and connectivity providers around the world to create a global network of checkpoints from which to run tests. You can configure each of your tests to run from any or all of the available monitoring locations.

Best practices 
===============
Locations denoted with `Amazon (Local Zone)` as the Provider are located in AWS Local Zones and the display names are prefixed with `AWS LZ`. These locations have less redundancy than other Amazon locations and are primarily intended for performance testing. If uptime testing is required, run the tests concurrently with multiple locations.


Locations
===========

The following tables provide a full list of locations, available in Splunk Synthetic Monitoring, along with their DNS, region code, and IP address. You can use this information to exclude locations from your site analytics or add them to your browser's allow list.


AU0
----
.. csv-table::
   :file: au0-public-locations.csv
   :widths: 10, 10, 10, 10, 20
   :header-rows: 1

EU0
----
.. csv-table::
   :file: eu0-public-locations.csv
   :widths: 10, 10, 10, 10, 20
   :header-rows: 1

JP0
----
.. csv-table::
   :file: jp0-public-locations.csv
   :widths: 10, 10, 10, 10, 20
   :header-rows: 1

US0
----
.. csv-table::
   :file: us0-public-locations.csv
   :widths: 10, 10, 10, 10, 20
   :header-rows: 1

US1
----
.. csv-table::
   :file: us1-public-locations.csv
   :widths: 10, 10, 10, 10, 20
   :header-rows: 1

US2
----
.. csv-table::
   :file: us2-public-locations.csv
   :widths: 10, 10, 10, 10, 20
   :header-rows: 1
