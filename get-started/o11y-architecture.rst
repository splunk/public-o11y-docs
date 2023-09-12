.. _architecture:

*******************************************
Splunk Observability Cloud architecture
*******************************************

.. meta::
   :description: Overview of the architecture of Splunk Observability Cloud


.. mermaid::

  %%{
    init: {
      'theme': 'base',
      'themeVariables': {
        'primaryColor': '#FFFFFF',
        'primaryTextColor': '#000000',
        'primaryBorderColor': '#000000',
        'nodeBorder':'#000000',
        'lineColor': '#000000',
      }
    }
  }%%

  flowchart LR
      %% LR indicates the direction (left-to-right)

      %% You can define classes to style nodes and oth
      classDef default fill:#FFFFFF, stroke:#000
      log-->splunkPlatform[(Splunk platform)]-->logObserver[(Log Observer Connect)]-->analytics
      
      subgraph o11yArchitecture[Splunk Observability Cloud Architecture]
      direction LR
        data-->otel-->ingestion-->processingRetention-->analytics

        subgraph data[Data sources]
            direction LR
            log(Logs)
            disTrace(Distributed traces)
            metric(Metrics)
        end 
        
        subgraph otel[OpenTelemetry Collector]
            direction LR
            aggregate((aggregate))
            parse((parse, extract, enrich))
            delete((delete))
        end

        subgraph ingestion[Ingestion]
            direction LR 
            traceAssembly(Trace assembly)
            quantizer(Quantizer)---rollups(Rollups)
            quantizer---lagAdjust(Dynamic lag adjustment)
            metadataExtraction(Metadata extraction)
        end

        subgraph processingRetention[Processing and retention]
            direction LR 
            indexStorage(Indexing and storage)
            traceMetricization(Trace metricization)
        end

        subgraph analytics[Analytics]
            direction LR 
            traceAnalyis(Tracing analysis)
            predictiveAnalysis(Predictive analytics)
            incidentAnalysis(Incident analysis)
            anommalyDetection(Anomaly detection)
            signalflow(SignalFlow)
            historicalBaseline(Historical baselines)
        end

      end