.. _prometheus:

********************************************************************************
Configure application receivers with Prometheus metrics
********************************************************************************

.. meta::
   :description: Landing for application receivers for monitoring applications in Splunk Observability Cloud.
   
.. toctree::
   :maxdepth: 4
   :hidden:

   monitors-prometheus/prometheus-exporter
   monitors-prometheus/prometheus-go
   monitors-prometheus/prometheus-nginx-ingress
   monitors-prometheus/prometheus-nginx-vts
   monitors-prometheus/prometheus-node
   monitors-prometheus/prometheus-velero

Splunk Observability Cloud offers the following OTel solutions to monitor applications and services that expose metrics in the Prometheus format:

* :ref:`prometheus-receiver`. You can use the OpenTelementry native Prometheus receiver to gather metrics from any software, tool or service that exposes metrics in the Prometheus format, such as Ansible Tower (AWX), CockroachDB, Docker Daemon, Doorman, Etcd, Flink, Grafana, PATROL, Traefik, or Zipkin. 
* :ref:`prometheus-generic`.

You can find the complete list of third-party applications compatible with Prometheus in :new-page:`Prometheus' official documentation <https://prometheus.io/docs/instrumenting/exporters/>`. 

The following Smart Agent monitors are also available:

* :ref:`prometheus-exporter`
* :ref:`prometheus-go`
* :ref:`prometheus-nginx-ingress`
* :ref:`prometheus-nginx-vts`
* :ref:`prometheus-node`
* :ref:`prometheus-velero`

