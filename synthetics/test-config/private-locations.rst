.. _private-locations:

*****************
Private locations
*****************

.. meta::
    :description: Learn about private locations in Splunk Synthetic Monitoring.

.. admonition:: Preview feature

    Preview features described in this document are provided by Splunk to you "as is" without any warranties, maintenance and support, or service level commitments. Splunk makes this preview feature available in its sole discretion and may discontinue it at any time. These documents are not yet publicly available and we ask that you keep such information confidential. Use of preview features is subject to the :new-page:`Splunk Pre-Release Agreement for Hosted Services <https://www.splunk.com/en_us/legal/pre-release-agreement-for-hosted-services.html>`.




A private location is a software package that enables quick and easy deployment of Splunk Synthetic Monitoring solutions beyond the public network so that you can find, fix, and prevent web performance defects on any internal web application, in any environment - whether inside or outside of your firewalls. This allows Splunk Synthetics Monitoring users to test earlier in the development cycle and against internal sites or applications that are not available to the public.

Customers can, through the Splunk Synthetics Monitoring web interface, create new Private Locations and launch a runner to perform any checks that are assigned to them.

What is a runner?
===================

A runner is a Docker container set up to run tests from a particular private location. A single private location can have one or more runners. 

A location consists of a queue of tests assigned to a particular private location. Runners pick up runs from the queue, so the more active runners you have, the faster the queue of tests is processed. 

Splunk Synthetic Monitoring doesn't track how many runners there are for a given location. It is up to you to manage your own fleet of runners. 


Use cases for private locations
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


Set up a new private location
================================

Each private location has a corresponding Private location ID. With this ID, you can:

* build charts or dashboards
* search for metrics by Private location
* use in the API 


Follow these steps to set up a new private location:

1. Select the settings gear icon > :guilabel:`Private locations`.  
2. Select :guilabel:`+ Add` > and add a name. 
3. Follow the steps in the wizard to set up your runner using Docker. 
4. Save your private location. 

Manage tokens
--------------------
It is your responsibility to update and manage your token. For added security, create a secret environment variable for your token in Docker. Consider creating a second token to provide coverage before your first token expires.

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
     - The queue for a given location is being cleared periodically and is not backed up.
     - If the queue is backed up, add new runner(s) to the private location.




