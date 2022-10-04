.. _private-locations:

*****************
Private locations
*****************

.. meta::
    :description: Learn about private locations in Splunk Synthetic Monitoring.


A private location is a software package that enables quick and easy deployment of Splunk Synthetic Monitoring solutions beyond Rigor's public network so you can find, fix, and prevent web performance defects on any internal web application, in any environment - whether inside or outside of your firewalls. This allows Rigor users to test earlier in the development cycle and against internal sites or applications that are not available to the public.

Customers can, through our web interface, create new Private Locations and launch a runner to perform any checks that are assigned to them.

What is a runner?
===================

A runner is a Docker container set up to run tests from a particular private location. A single private location can have one or more runners. 

A location consists of a queue of tests assigned to a particular private location. Runners pick up runs from the queue, so the more active runners you have, the faster the queue of tests is processed. 

Splunk Synthetic Monitoring doesn't track how many runners there are for a given location -- you must manage your own fleet of runners. 


Use cases for private locations
=================================

* Test private applications that are not exposed to the public
* Test pre-production applications which don't have public staging sites
* Gain a higher level of flexibility in giving Splunk Synthetic Monitoring access to applications
* Test from locations not currently supported by Splunk Synthetic Monitoring's public locations


Prerequisites
=============

* Docker
* Linux, Windows1, or OSX1
* An internet connection

Recommended for running Browser Tests:
---------------------------------------

* Linux
* 2.3 GHz Dual-Core Intel Xeon (or equivalent) processor
* 8 GB RAM


Set up a new private location
================================

Follow these steps to set up a new private location:

<add steps once UI is built> 

Assess the health of your private location
==============================================

A private location's health is based on three factors:

.. list-table::
   :header-rows: 1
   :widths: 20 40 40 

   * - :strong:`Factor`
     - :strong:`Description`
     - :strong:`Solution`

   * - Active runner
     - At least one runner is actively checking in.
     - If no runners are checking in, set up new runners for the private location. 

   * - Used in tests
     - The private location is currently being used in one or more tests.
     - Add the private location to one or more tests. 

   * - Clear queue
     - The queue for a given location is being cleared perioically and is not backed up.
     - If the queue is backed up, add new runner(s) to the private location.




