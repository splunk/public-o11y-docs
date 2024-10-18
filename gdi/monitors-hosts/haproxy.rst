.. _haproxy:

HAProxy
=======

.. meta::
   :description: Use this Splunk Observability Cloud integration for the HAProxy monitor. See benefits, install, configuration, and metrics

The Splunk Distribution of the OpenTelemetry Collector uses the Smart Agent receiver with the
HAProxy monitor type to monitor an HAProxy instance. This monitor
requires HAProxy 1.5+.

.. note:: To monitor your HAProxy instances you can instead use the native OpenTelemetry HAProxy receiver. To learn more, see :ref:`haproxy-receiver`.

Benefits
--------

.. include:: /_includes/benefits.rst

Set up
------

Socket configuration
~~~~~~~~~~~~~~~~~~~~

The location of the HAProxy socket file is defined in the HAProxy
configuration file, as shown in the following example:

.. code-block:: yaml

   global
       daemon
       stats socket /var/run/haproxy.sock
       stats timeout 2m

**Note:** You can use a TCP socket for stats in HAProxy. In your
``haproxy`` plugin configuration file, specify the TCP address for the
socket. For example, you can use
``https://www.example.com/socket:9000``. In the haproxy.cfg file, change
the stats socket to use the same TCP address and port, as shown in the
following example:

.. code-block:: yaml

   global
       daemon
       stats socket localhost:9000
       stats timeout 2m

To use a more restricted TCP socket, follow these steps:

1. Define a backend server that listens to stats on localhost.
2. Define a frontend proxy server that communicates with the back-end
   server on a different port.
3. Use ACLs on both servers to control access. Depending on how
   restrictive your socket is, you might need to add the signalfx-agent
   user to the haproxy group as follows:
   ``sudo usermod -a -G haproxy signalfx-agent``

The following configuration file shows how to define a back-end server
and a frontend proxy:

.. code-block:: yaml

   global
       daemon
       stats socket localhost:9000
       stats timeout 2m

   backend stats-backend
       mode tcp
       server stats-localhost localhost:9000

   frontend stats-frontend
       bind *:9001
       default_backend stats-backend
       acl ...
       acl ...

SELinux setup
~~~~~~~~~~~~~

If you have SELinux activated, create a SELinux policy package by
downloading the `type enforcement
file <https://github.com/signalfx/collectd-haproxy/blob/master/selinux/collectd-haproxy.te>`__
to some place on your server. Run the following commands to create and
install the policy package:

.. code-block:: yaml

       $ checkmodule -M -m -o haproxy.mod haproxy.te
       checkmodule:  loading policy configuration from haproxy.te
       checkmodule:  policy configuration loaded
       checkmodule:  writing binary representation (version 17) to haproxy.mod
       $ semodule_package -o haproxy.pp -m haproxy.mod
       $ sudo semodule -i haproxy.pp
       $ sudo reboot

.. raw:: html

   <!--- changed all above instances of collectd-haproxy to haproxy per updated guidance-->

Installation
------------

.. include:: /_includes/collector-installation.rst

Configuration
-------------

.. include:: /_includes/configuration.rst

Example
~~~~~~~

To activate this integration, add the following to your Collector
configuration:

.. code-block:: yaml

   receivers:
       smartagent/haproxy:
           type: haproxy
           ...  # Additional config

Next, add the monitor to the ``service.pipelines.metrics.receivers``
section of your configuration file:

.. code-block:: yaml

   service:
     pipelines:
       metrics:
         monitors: [smartagent/haproxy]

Configuration options
~~~~~~~~~~~~~~~~~~~~~

The following table shows the configuration options for this monitor:

.. list-table::
   :widths: 18 18 18 18
   :header-rows: 1

   - 

      - Option
      - Required
      - Type
      - Description
   - 

      - ``pythonBinary``
      - no
      - ``string``
      - Path to a python binary that should be used to execute the
         Python code. If not set, a built-in runtime will be used. Can
         include arguments to the binary as well.
   - 

      - ``host``
      - **yes**
      - ``string``
      - 
   - 

      - ``port``
      - no
      - ``integer``
      - (**default:** ``0``)
   - 

      - ``proxiesToMonitor``
      - no
      - ``list of strings``
      - A list of all the pxname(s) or svname(s) that you want to
         monitor (e.g. ``["http-in", "server1", "backend"]``)
   - 

      - ``excludedMetrics``
      - no
      - ``list of strings``
      - Deprecated. Please use ``datapointsToExclude`` on the monitor
         config block instead.
   - 

      - ``enhancedMetrics``
      - no
      - ``bool``
      - (**default:** ``false``)

Metrics
-------

The following metrics are available for this integration:

.. raw:: html
 
      <div class="metrics-yaml" url="https://raw.githubusercontent.com/signalfx/splunk-otel-collector/main/internal/signalfx-agent/pkg/monitors/haproxy/metadata.yaml"></div>

Notes
~~~~~

.. include:: /_includes/metric-defs.rst

Troubleshooting
---------------

.. include:: /_includes/troubleshooting-components.rst
