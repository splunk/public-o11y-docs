.. _private-locations:

*****************
Private locations
*****************

.. meta::
    :description: Learn about private locations in Splunk Synthetic Monitoring.

A Private location is a software package that enables quick and easy deployment of Splunk Synthetic Monitoring solutions beyond the public network so that you can find, fix, and prevent web performance defects on any internal web application, in any environment - whether inside or outside of your firewalls. Private locations allow Splunk Synthetics Monitoring users to test earlier in the development cycle and against internal sites or applications that aren't available to the public.

Customers can, through the Splunk Synthetics Monitoring web interface, create new Private locations and launch a runner to perform any checks that are assigned to them.

What is a runner?
===================

A runner is a Docker container set up to run tests from a particular Private location. A single Private location can have one or more runners. 

A location consists of a queue of tests assigned to a particular Private location. Runners pick up runs from the queue, so the more active runners you have, the faster the queue of tests is processed. 

Splunk Synthetic Monitoring doesn't track how many runners there are for a given location. It is up to you to manage your own fleet of runners. 


Use cases for Private locations
=================================

* Test private applications that aren't exposed to the public.
* Test pre-production applications which don't have public staging sites.
* Gain a higher level of flexibility in giving Splunk Synthetic Monitoring access to applications.
* Test from locations not currently supported by Splunk Synthetic Monitoring's public locations.


Requirements 
=============

* Docker
* Linux, Windows1, or OSX1
* An internet connection

Recommended for running Browser Tests:
---------------------------------------

* Linux
* 2.3 GHz Dual-Core Intel Xeon (or equivalent) processor
* 8 GB RAM, 2 cores


Set up a new Private location
===============================

Follow these steps to set up a new Private location:

1. Select the settings gear icon > :guilabel:`Private locations`.  
2. Select :guilabel:`+ Add` > and add a name. 
3. Follow the steps in the wizard to set up your runner. 
4. Save your Private location. 


What you can do with your Private location ID 
------------------------------------------------------------

Each private location has a corresponding Private location ID. With this ID, you can:

* Build charts or dashboards
* Search for metrics by Private location
* Refer to your Private location ID if you're interacting with the Splunk Synthetics Monitoring APIs. 

Manage your tokens
--------------------
It is your responsibility to update and manage your tokens. For added security, create a secret environment variable for your token in Docker. Consider creating a second token to provide coverage before your first token expires.



Assess the health of your Private location
==============================================

A Private location's health is based on three factors:

.. list-table::
  :header-rows: 1
  :widths: 20 40 40 

  * - :strong:`Factor`
    - :strong:`Description`
    - :strong:`Solution`
  * - Active runner
    - At least one runner is actively checking in.
    - If no runners are checking in, set up new runners for the Private location. 
  * - Used in tests
    - The Private location is currently being used in one or more tests.
    - Add the Private location to one or more tests. 
  * - Clear queue
    - The queue for a given location is being cleared periodically and is not backed up.
    - If the queue is backed up, add new runner(s) to the Private location.

Troubleshoot queue length and latency
---------------------------------------------------

If both the queue latency and length increase over time, then add more runners to improve performance. 

If your queue latency increases but your queue length doesn’t, then try these troubleshooting methods:

* Check to see  if a step is delaying the rest of the test
* Investigate whether you have the sufficient resources to run Private location runners on your machines.

The maximum number of runners in a queue is 100,000. 

Any runners older than one hour are removed from the queue. 


