.. _monitors-common-config:

********************************************************************************
Common configuration settings for monitors
********************************************************************************

.. meta::
   :description: Common configuration settings for monitors.

.. toctree::
   :maxdepth: 4
   :hidden:

The following config options are common to all monitors, which can be used with the Collector using the :ref:`smartagent-receiver`:

.. list-table::
   :header-rows: 1
   :widths: 25 10 10 10 45
   :width: 100%

   *  - Config option	
      - Default	
      - Required	
      - Type	
      - Description

   *  - ``type``		
      - 
      - no	
      - ``string``	
      - The type of the monitor

   *  - ``discoveryRule``		
      - 
      - no	
      - ``string``	
      - The rule used to match up this configuration with a discovered endpoint. If blank, the configuration runs immediately when the agent is started. If multiple endpoints match this rule, multiple instances of the monitor type are created with the same configuration, except for different hosts or ports.

   *  - ``validateDiscoveryRule``	
      - ``false``	
      - no	
      - ``bool``	
      - If ``true``, a warning is emitted if a discovery rule contains variables that will never possibly match a rule. If using multiple observers, set this to ``false`` to suppress spurious errors. The top-level setting ``validateDiscoveryRules`` acts as a default if this isn't set.

   *  - ``extraDimensions``
      - 		
      - no	
      - ``map of strings``	
      - A set of extra dimensions (key-value pairs) to include on datapoints emitted by the monitor(s) created from this configuration. To specify metrics from this monitor should be high-resolution, add the dimension ``sf_hires: 1``.

   *  - ``extraSpanTags``
      -    		
      - no	
      - ``map of strings``	
      - A set of extra span tags (key-value pairs) to include on spans emitted by the monitor(s) created from this configuration.

   *  - ``extraSpanTagsFromEndpoint``		
      - 
      - no	
      - ``map of strings``	
      - A mapping of extra span tag names to a discovery rule expression that is used to derive the value of the span tag. For example, to use a certain container label as a span tag, use something similar to ``extraSpanTagsFromEndpoint: {env: 'Get(container_labels, "myapp.com/environment")'}``. This only applies when the monitor has a ``discoveryRule`` or was dynamically instantiated by an endpoint. 

   *  - ``defaultSpanTags``
      - 
      - no	
      - ``map of strings``	
      - A set of default span tags (key-value pairs) to include on spans emitted by the monitor(s) created from this configuration.

   *  - ``defaultSpanTagsFromEndpoint``
      - 
      - no
      - ``map of strings``	
      - A mapping of default span tag names to a discovery rule expression that is used to derive the default value of the span tag. For example, to use a certain container label as a span tag, use something similar to ``defaultSpanTagsFromEndpoint: {env: 'Get(container_labels, "myapp.com/environment")'}``. This only applies when the monitor has a ``discoveryRule`` or was dynamically instantiated by an endpoint. 

   *  - ``extraDimensionsFromEndpoint``
      - 
      - no	
      - ``map of strings``	
      - A mapping of extra dimension names to a discovery rule expression that is used to derive the value of the dimension. For example, to use a certain container label as a dimension, use something similar to ``extraDimensionsFromEndpoint: {env: 'Get(container_labels, "myapp.com/environment")'}``. This only applies when the monitor has a ``discoveryRule`` or was dynamically instantiated by an endpoint. 

   *  - ``configEndpointMappings``		
      - 
      - no	
      - ``map of strings``	
      - A set of mappings from a configuration option on this monitor to attributes of a discovered endpoint. The keys are the config option on this monitor and the value can be any valid expression used in discovery rules.

   *  - ``intervalSeconds``	
      - ``0``	
      - no	
      - ``integer``	
      - The interval (in seconds) at which to emit datapoints from the monitor(s) created by this configuration. If not set (or set to 0), the global agent intervalSeconds config option will be used instead.

   *  - ``solo``	
      - ``false``	
      - no	
      - ``bool``	
      - If one or more configurations have this set to ``true``, only those configurations will be considered. This setting can be useful for testing.

   *  - ``datapointsToExclude``
      - 
      - no	
      - ``list of objects``	
      - A list of datapoint filters. These filters allow you to comprehensively define which datapoints to exclude by metric name or dimension set, as well as the ability to define overrides to re-include metrics excluded by previous patterns within the same filter item. 

   *  - ``disableHostDimensions``	
      - ``false``	
      - no	
      - ``bool``	
      - Some monitors pull metrics from services not running on the same host and should not get the host-specific dimensions set on them, for example ``host`` or ``AWSUniqueId``. Setting this to ``true`` causes those dimensions to be omitted. You can disable this globally with the ``disableHostDimensions`` option on the top level of the config.

   *  - ``disableEndpointDimensions``	
      - ``false``	
      - no	
      - ``bool``	
      - This can be set to true if you don't want to include the dimensions that are specific to the endpoint that was discovered by an observer. This is useful when you have an endpoint whose identity is not particularly important since it acts largely as a proxy or adapter for other metrics.

   *  - ``metricNameTransformation``			
      - 
      - no	
      - ``map``	
      - A map from original metric name to a replacement value. The keys are intepreted as regular expressions and the values can contain backreferences, so escape any RE characters in the original metric name with ``\``. Use `` \.`` for periods, as period is interpreted as "all characters" if unescaped. The Go regexp language, and backreferences are of the form ``$1``. If there are multiple entries in list of maps, they will each be run in sequence, using the transformation from the previous entry as the input the subsequent transformation. To add a common prefix to all metrics coming out of a monitor, use a mapping like ``(.*): myprefix.$1``.

   *  - ``dimensionTransformations``		
      - 
      - no	
      - ``map of strings``	
      - A map from dimension names emitted by the monitor to the desired dimension name that will be emitted in the datapoint that goes to Splunk Observability Cloud. This can be useful if you have custom metrics from your applications and want to make the dimensions from a monitor match those. Also can be useful when scraping free-form metrics.

   *  - ``extraMetrics``
      - 
      - no	
      - ``list of strings``	
      - Extra metrics to enable besides the default included ones. This is an overridable filter.

   *  - ``extraGroups``
      - 
      - no	
      - ``list of strings``	
      - Extra metric groups to enable in addition to the metrics that are emitted by default. A metric group is simply a collection of metrics, and they are defined in each monitor's documentation.