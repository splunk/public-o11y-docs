.. _private-locations:

***************************
Private locations
***************************

.. meta::
    :description: Run synthetic tests from private locations such as internal sites, private web applications, or private networks.

A private location is a name you create in Splunk Synthetic Monitoring to represent a custom location from which you can run synthetic tests. The name you give to a private location allows you to specify that name in a synthetic test's :guilabel:`Locations` field. To run synthetic tests from private locations, you must also set up one or more private runners within the private location to do the actual communication with your test targets and with Splunk Synthetic Monitoring.  


Use cases for private locations
====================================

Private locations provide a way for you to find, fix, and prevent performance problems in internal applications in any environment, inside or outside of your firewalls. You can use private locations to run tests earlier in your development cycle against internal sites or applications that aren't available to the public. You can also use private locations to test public endpoints from locations that aren't included in the :ref:`list of Splunk Synthetic Monitoring public locations <public-locations>`. 

To summarize, here are sample use cases for private locations:

* Test private applications that aren't exposed to the public.
* Test pre-production applications which don't have public staging sites.
* Gain a higher level of flexibility by giving Splunk Synthetic Monitoring access to applications.
* Test from locations not currently supported by Splunk Synthetic Monitoring's public locations.


Set up a new private location
=====================================

Follow these steps to set up a new private location:

1. In Splunk Synthetic Monitoring, select the settings gear icon, then :guilabel:`Private locations`.  
2. Select :guilabel:`+ Add` and add a name. 
3. Follow the steps in the guided setup to set up one or more private runners for that private location. 
4. Save your private location. 


What you can do with your private location ID 
------------------------------------------------------------

Each private location has a corresponding private location ID. With this ID, you can:

* Build charts or dashboards
* Search for metrics by private location
* Refer to your private location ID if you're interacting with the Splunk Synthetics Monitoring APIs. 

Manage your tokens
--------------------------------
It is your responsibility to update and manage your tokens. Tokens are valid for one year. For added security, create a secret environment variable for your token in Docker. Consider creating a second token to provide coverage before your first token expires. You are not notified of expiring tokens.

Assess the health of a private location
---------------------------------------------------------

A private location's health depends on three factors:

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
    - If you need to delete a private location, you need to first delete it from all tests.
  * - Clear queue
    - The queue for a given location is being cleared periodically and is not backed up.
    - If the queue is backed up, add new runners to the private location.


Troubleshoot queue length and latency
---------------------------------------------------

If both the queue latency and length increase over time, then add more runners to improve performance. 

If your queue latency increases but your queue length doesn't, then try these troubleshooting methods:

* Check to see if a step is delaying the rest of the test
* Investigate whether you have the sufficient resources to run private location runners on your machines.

The maximum number of runs in a queue is 100,000. 

Any runs older than one hour are removed from the queue. 


Private runners
=====================================


What is a private runner?
-------------------------------------

A private runner is a Docker image which you deploy on your own infrastructure, within your own internal network. It picks up test runs from the queue of tests assigned to its associated private location, performs the actions in the test run on the test target, and reports the results back to Splunk Synthetic Monitoring. 


If you create multiple private runners for a private location, they can process that location's test queue faster. Splunk Synthetic Monitoring doesn't track how many private runners there are for a given private location. It's up to you to manage your own fleet of private runners. 


Requirements for private runners 
-------------------------------------

.. list-table::
  :header-rows: 1
  :widths: 20 80 

  * - :strong:`Requirement`
    - :strong:`Description`
  * - Docker
    - 
        * The Docker container requires the host have the ifb kernel module installed. 
        * The Docker container needs outbound internet access; however it doesn't need inbound access.  
  * - Allowlist
    - 
        * ``runner.<realm>.signalfx.com`` 
        * ``*.signalfx.com`` 
        * ``*.amazonaws.com``
        * ``quay.io/signalfx``
        * ``quay.io/v2``
  * - Operating system   
    -  Linux, Windows, or macOS


For optimal performance when running browser tests:

* Linux
* 2.3 GHz Dual-Core Intel Xeon (or equivalent) processor
* 8 GB RAM, 2 cores


Working with Docker 
-------------------------------------

Follow these steps to limit logging in Docker:

#. Create a file in a directory like this: ``/etc/docker/daemon.json``.

#. In the file, add: 

.. code:: yaml

    {
      "log-driver": "local",
      "log-opts": {
        "max-size": "10m",
        "max-file": "3"
      }
    }

#. Restart your docker service: ``sudo systemctl docker.service restart``.


Add certificates
-------------------------------------

Splunk Synthetic Monitoring supports injecting custom root CA certificates for Uptime tests running from your private locations. Client keys and certificates aren't supported at this time. 

#. Create a folder called ``certs`` on your host machine and place the CA Certificate (in CRT format) in the folder.

#. Add the certs folder as a volume to the container ``(-v ./certs:/usr/local/share/ca-certificates/my_certs/)``.

#. Modify the command you use when launching the container to update the CA Certificate cache before starting the agent binary ``(bash -c "sudo update-ca-certificates && bundle exec bin/start_runner)``.


For example, here is what a command might look like after you modify it to fit your environment:  

.. code:: yaml

    docker run -e "RUNNER_TOKEN=<insert-token>" --volume=`pwd`/certs:/usr/local/share/ca-certificates/my_certs/ quay.io/signalfx/splunk-synthetics-runner:latest bash -c "sudo update-ca-certificates && bundle exec bin/start_runner"


.. Note:: Custom root CA certificates aren't supported for Browser tests. Browser tests require SSL/TLS validation for accurate testing. Optionally, you can deactivate SSL/TLS validation for Browser tests when necessary.


Configure proxy settings for a private runner
---------------------------------------------------------

In environments where direct internet access is restricted, you can route synthetic test traffic through a proxy server by configuring the following environment variables:

* ``http_proxy``: Specifies the proxy server for HTTP traffic.

    * Example: ``export http_proxy="http://proxy.example.com:8443"``

* ``https_proxy``: Specifies the proxy server for HTTPS traffic.

    * Example: ``export https_proxy="http://proxy.example.com:8443"``

* ``no_proxy``: Specifies a comma-separated list of domains or IP addresses that should bypass the proxy.

    * Example: ``export no_proxy="localhost,127.0.0.1,.internal-domain.com"``

For example, here is what a command might look like after you modify it to fit your environment:


.. code:: yaml

    docker run --cap-add NET_ADMIN -e "RUNNER_TOKEN=*****" -e "no_proxy=.signalfx.com,.amazonaws.com,127.0.0.1,localhost" -e "https_proxy=http://172.17.0.1:1234" -e "http_proxy=http://172.17.0.1:1234" quay.io/signalfx/splunk-synthetics-runner:latest

    
In this example:

``http_proxy`` and ``https_proxy`` are set to route traffic through a proxy at ``http://172.17.0.1:1234``.

``no_proxy`` is configured to bypass the proxy for local addresses and specific domains like .signalfx.com and .amazonaws.com.

Ensure that these variables are correctly configured to comply with your network policies. This setup allows the synthetic tests to communicate securely and efficiently in a controlled network environment.

When using a private runner, it's important to correctly configure the proxy settings to avoid issues with browser-based tests. The following steps should be followed when setting up their environment:

1. :strong:`Ensure proper no_proxy setup`:
   
   - When configuring ``no_proxy`` always include the following addresses:
   
     - ``127.0.0.1`` (for localhost communication)
     - ``localhost`` (for resolving local tests)
   
   These addresses ensure that internal services and tests run correctly without routing through a proxy, preventing potential failures.

3. :strong:`Dockerfile defaults`:
   
   - By default, the private runner sets the ``no_proxy`` variable in the Dockerfile to include ``127.0.0.1``. If you override ``no_proxy``, you must ensure that ``127.0.0.1`` and ``localhost`` are still present, or browser tests may fail.


.. note:: 
  Lower case variable names take precedence and are best practice.

