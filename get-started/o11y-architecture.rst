.. _architecture:

*******************************************
Splunk Observability Cloud architecture
*******************************************

.. meta::
   :description: Overview of the architecture of Splunk Observability Cloud

Splunk Observability Cloud is built on top of OpenTelemetry and uses it as the default way of getting data in, which gives you a open standards-based set of instrumentation across all your data types. With the use Log Observer Connect, you can also query your Splunk Enterprise or Splunk Cloud Platform logs using the capabilities in Splunk Observability Cloud, giving you an overview of all your data in one place.

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
        'fontSize': '22px',
      }
    }
  }%%

  flowchart LR
      %% LR indicates the direction (left-to-right)


      classDef default fill:#FFFFFF, stroke:#000
      classDef platform fill:#acd1a4, stroke:#000
      classDef loc fill:#fdf8a4, stroke:#000
      classDef dataColor fill:#d9d9d9, stroke:#000
      classDef otelColor fill:#afcedb, stroke:#000
      classDef ingestionColor fill:#fbc477, stroke:#000
      classDef processingColor fill:#fab9b4, stroke:#000
      classDef analyticsColor fill:#f999cb, stroke:#000

      log-->splunkPlatform[(Splunk platform)]:::platform-->logObserver[(Log Observer Connect)]:::loc-->analytics
      
      subgraph o11yArchitecture[&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspSplunk Observability Cloud Architecture]
      direction LR
        data-->otel-->ingestion
        ingestion-->processingRetention-->analytics

        class data dataColor
        
        subgraph data[Data sources]
            direction LR
            log(Logs)
            disTrace(Distributed traces)
            metric(Metrics)
        end 
        
        class otel otelColor

        subgraph otel[OpenTelemetry Collector]
            direction LR
            aggregate((aggregate))
            parse((parse, extract, enrich))
            delete((delete))
        end

        class ingestion ingestionColor

        subgraph ingestion[Ingestion]
            direction LR 
            traceAssembly(Trace assembly)
            quantizer(Quantizer)---rollups(Rollups)
            quantizer---lagAdjust(Dynamic lag adjustment)
            metadataExtraction(Metadata extraction)
        end

        class processingRetention processingColor

        subgraph processingRetention[Processing and retention]
            direction LR 
            indexStorage(Trace indexing and storage)
            traceMetricization(Trace metricization)
            metricsManagement(Metrics routing and storage)
        end

        class analytics analyticsColor

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
