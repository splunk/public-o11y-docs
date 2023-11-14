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

      accTitle: Splunk Observability Cloud architecture diagram
      accDescr: Splunk Observability Cloud architecture can be broken down into 4 main components, data collection, data ingestion, data procesisng and rentention, and analytics. Splunk Observability Cloud uses OpenTelemetry as the default method of data collection, which gives you a single set of instrumentation across different data types, such as distributed traces and metrics. You can also send Splunk Enterprise or Splunk Cloud Platform logs to Observability Cloud with the use of Log Observer Connect. Once you get your data in, OpenTelemetry Collector can aggregate, parse, extract, enrich, or delete your data as needed. The underlying mechanism for data ingestion is the Quantizer, which offers rollups and dynamic lag adjustment. Trace assembly and metadata extraction are also parts of data ingestion. Data processing and retention includes trace indexing and storage, trace metricization, as well as metrics routing and storage. Lastly, Observability Cloud offers various analytics tools for your data, including but not limited to, tracing analysis, predictive analysis, incident analysis, anomaly detection, SignalFlow, and historical baselines.
      
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
