:orphan:

.. _grafana-create-queries:

.. include:: /private-preview/splunk-o11y-plugin-for-grafana/toc.rst
  :start-after: :orphan:

**************************************
Create queries to filter dashboards
**************************************

You can manually add queries to Grafana and view the query output on your dashboards. The Splunk Observability Cloud plugin for Grafana supports the following query types:

* SignalFlow queries: Filters dashboards based on SignalFlow computations.
    For more information on SignalFlow and its syntax, see :new-page:`Analyze data using SignalFlow <https://dev.splunk.com/observability/docs/signalflow/>` and :new-page:`Intermediate to advanced SignalFlow <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/docs/flow.md>`.
* Suggest API: Populates variables on dashboards. You can use this query to create a drop-down menu to filter your dashboard by services.
* Pending Alerts: Returns a dataframe with rows that represent pending incidents for specified services. You can use this query to create a dashboard panel with a table that lists pending incidents.

Add a query to a dashboard
===========================

.. note::
    We recommend using one query per dashboard panel.

You can use either of the following methods to add a query to a dashboard:

* :ref:`add-query-editor`
* :ref:`add-query-dashboard`

.. _add-query-editor:

Add a query with the query editor
----------------------------------

To add a query to a dashboard using the query editor:

#. In the Grafana main menu, select :guilabel:`Connections` and then :guilabel:`Data sources`.
#. Select your Splunk Observability Cloud data source.
#. Select :guilabel:`Explore data`.
#. Select :guilabel:`SignalFlow`, :guilabel:`Suggest API`, or :guilabel:`Pending Alerts` to create a query.
#. Configure the query fields.
    - For more information on SignalFlow query syntax, see :new-page:`Analyze data using SignalFlow <https://dev.splunk.com/observability/docs/signalflow/>` and :new-page:`Intermediate to advanced SignalFlow <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/docs/flow.md>`.
    - For more information on the SignalFlow query fields (:guilabel:`Max Delay` and :guilabel:`Resolution`), see :new-page:`Input lag management <https://dev.splunk.com/observability/docs/signalflow/#Input-lag-management>` and :new-page:`Resolution of computations <https://dev.splunk.com/observability/docs/signalflow/#Resolution-of-computations>`. The Splunk plugin measures resolution in milliseconds.
#. Select :guilabel:`Run query`. The query editor selects a panel on your dashboard to run the query on, based on the required data input.
#. To view the query output on your dashboard:
    #. In the Grafana main menu, select :guilabel:`Dashboards`.
    #. Select your dashboard.

.. _add-query-dashboard:

Add a query from the dashboard view
------------------------------------

To add a query directly from the dashboard view:

#. In the Grafana main menu, select :guilabel:`Dashboards`. Select your dashboard.
#. Select :guilabel:`Add`, then :guilabel:`Visualization`.
#.  By default, the :guilabel:`Time series` visualization is selected. Use the drop-down menu to select your preferred visualization type.
#. On the :guilabel:`Query` tab, select :guilabel:`SignalFlow`, :guilabel:`Suggest API`, or :guilabel:`Pending Alerts` to create a query.
#. Configure the query fields.
    - For more information on SignalFlow query syntax, see :new-page:`Analyze data using SignalFlow <https://dev.splunk.com/observability/docs/signalflow/>` and :new-page:`Intermediate to advanced SignalFlow <https://github.com/signalfx/signalflow-library/blob/master/library/signalfx/docs/flow.md>`.
    - For more information on the SignalFlow query fields (:guilabel:`Max Delay` and :guilabel:`Resolution`), see :new-page:`Input lag management <https://dev.splunk.com/observability/docs/signalflow/#Input-lag-management>` and :new-page:`Resolution of computations <https://dev.splunk.com/observability/docs/signalflow/#Resolution-of-computations>`. The Splunk plugin measures resolution in milliseconds.
#. Select :guilabel:`Apply`.

Example queries
------------------

This section contains examples of queries you can add to your dashboards.

SignalFlow examples
^^^^^^^^^^^^^^^^^^^^^

 .. list-table::
    :header-rows: 1
    :widths: 50 50

    * - :strong:`Description`
      - :strong:`Example SignalFlow query`
    
    * - Query the number of error calls
      - .. code-block:: none
            
            A = histogram('spans', filter('sf_error', 'true')).count().publish(label='Error')
    * - Query the number of calls for a specific service, with a service name passed via a dashboard variable
      - .. code-block:: none

            A = histogram('spans', filter=filter('sf_service', '$service')).count().publish(label='OK')
    * - Query the number of calls grouped by a metric dimension (sf_operation)
      - .. code-block:: none

            A = histogram('spans').count(by=['sf_operation']).publish(label='Count')
    * - Query various span duration percentiles
      - .. code-block:: none

            A = histogram('spans', filter=filter('sf_service', '$service')).percentile(pct=50) / 1000000
            A.publish(label='p50')
            B = histogram('spans', filter=filter('sf_service', '$service')).percentile(pct=90) / 1000000
            B.publish(label='p90')
            C = histogram('spans', filter=filter('sf_service', '$service')).percentile(pct=99) / 1000000
            C.publish(label='p99')
    * - Create a panel that dynamically adjusts the resolution to a selected time window selected
      - Set the :guilabel:`Resolution` query field to ``$__interval_ms``.

Suggest API examples
^^^^^^^^^^^^^^^^^^^^^^

 .. list-table::
    :header-rows: 1
    :widths: 50 50

    * - :strong:`Description`
      - :strong:`Example query field values`
    
    * - Get a list of tag names
      - * :guilabel:`Metric Name` = spans
        * :guilabel:`isHistogram` = true
        * :guilabel:`Tag Name` = <leave-blank>
    * - Get a list of values for a specific tag
      - * :guilabel:`Metric Name` = spans
        * :guilabel:`isHistogram` = true
        * :guilabel:`Tag Name` = sf_environment
    * - Get a list of values for a specific tag, filtered by another variables (cascading variables)
      - * :guilabel:`Metric Name` = spans
        * :guilabel:`isHistogram` = true
        * :guilabel:`Tag Name` = sf_service
        * :guilabel:`Filter 0:`
            * :guilabel:`Tag Name` = sf_environment
            * :guilabel:`Value` = $env
    * - Support an “all” option for variables
      - SignalFlow honors the use of * as an open filter. Navigate to the Grafana variable configuration and set the following:
          - :guilabel:`Include All` = true
          - :guilabel:`Custom All` = *

Pending Alerts examples
^^^^^^^^^^^^^^^^^^^^^^^^^

 .. list-table::
    :header-rows: 1
    :widths: 50 50

    * - :strong:`Description`
      - :strong:`Example query field values`
    
    * - Fetch incidents for a specified service
      - :guilabel:`Services` = MyService
    * - Fetch incidents for multiple specified services
      - :guilabel:`Services` = MyService, YourService
    * - Fetch incidents using a Grafana variable as a filter service name
      - :guilabel:`Services` = $service
    * - Fetch incidents for all services
      - :guilabel:`Services` = *

