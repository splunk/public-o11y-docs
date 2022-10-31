.. _otel-using:

********************************************************************************
Use the Collector in Observability Cloud
********************************************************************************

.. meta::
      :description: Describes the resources and info needed to use the Splunk Distribution of OpenTelemetry Collector.

.. toctree::
    :maxdepth: 4
    :titlesonly:
    :hidden:

    translation-tool.rst
    legacy-otel-mappings.md
    data-processing.rst
    deployment-modes.rst
    exposed-endpoints.rst
    monitoring.rst
    sizing.rst
    security.rst
    tags.rst
    collector-with-the-uf.rst
    
The following table describes everything you need to start using the Collector:

.. list-table::
  :widths: 40 60
  :header-rows: 1

  * - Resource
    - Description
  * - Access token
    - Use an access token to track and manage your resource usage. Where you see ``<access_token>``, replace it with the name of your access token. See :ref:`admin-org-tokens`.
  * - Realm
    - A realm is a self-contained deployment that hosts organizations. You can find your realm name on your profile page in the user interface. Where you see ``<REALM>``, replace it with the name of your organization's realm. See :new-page:`realms <https://dev.splunk.com/observability/docs/realms_in_endpoints/>`.   
  * - Agent or Gateway mode
    - In Agent mode, the Collector runs with the application or on the same host as the application. In Gateway mode, one or more collectors run a standalone service, for example, a container or deployment. See :ref:`otel-deployment-mode`.
  * - Ports and endpoints
    - Check exposed ports to make sure your environment doesn't have conflicts. You can change the ports in the Collector's configuration. See :ref:`otel-exposed-endpoints`.
  * - Configuration file translator
    - Splunk provides an experimental command-line tool, ``translatesfx``, that translates a SignalFx Smart Agent configuration file into a configuration file that can be used by the Collector. See :ref:`migrate-from-sa-to-otel`.

Refer to the left navigation menu for additional topics on using the Collector with :ref:`Splunk Observability Cloud <welcome>`.
