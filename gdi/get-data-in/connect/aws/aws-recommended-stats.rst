.. _aws-recommended-stats:

************************************************************
AWS recommended stats (polling only)
************************************************************

.. meta::
  :description: List of recommended stats used in the AWS integration.

If you're polling data, by default Splunk Observability Cloud only imports certain stats, which are based on AWS' own recommended stats and vary with service. You can look for your services' AWS recommended stats in the official AWS docs, for example :new-page:`CloudWatch metrics for your Classic Load Balancer <https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-cloudwatch-metrics.html>` or :new-page:`S3 monitoring with Amazon CloudWatch <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/viewing_metrics_with_cloudwatch.html>`.

Splunk Observability Cloud uses the following recommended stats:

AWS/AmazonMQ:
  ConsumerCount:
    - mean
    - upper
    - lower
    - sum
  CpuCreditBalance:
    - mean
    - upper
    - lower
    - sum
  CpuUtilization:
    - mean
    - upper
    - lower
    - sum
  CurrentConnectionsCount:
    - mean
    - upper
    - lower
    - sum
  DequeueCount:
    - mean
    - upper
    - lower
    - sum
  DispatchCount:
    - mean
    - upper
    - lower
    - sum
  EnqueueCount:
    - mean
    - upper
    - lower
    - sum
  EnqueueTime:
    - mean
    - upper
    - lower
    - sum
  ExpiredCount:
    - mean
    - upper
    - lower
    - sum
  HeapUsage:
    - mean
    - upper
    - lower
    - sum
  JournalFilesForFastRecovery:
    - mean
    - upper
    - lower
    - sum
  JournalFilesForFullRecovery:
    - mean
    - upper
    - lower
    - sum
  MemoryUsage:
    - mean
    - upper
    - lower
    - sum
  NetworkIn:
    - mean
    - upper
    - lower
    - sum
  NetworkOut:
    - mean
    - upper
    - lower
    - sum
  OpenTransactionsCount:
    - mean
    - upper
    - lower
    - sum
  ProducerCount:
    - mean
    - upper
    - lower
    - sum
  QueueSize:
    - mean
    - upper
    - lower
    - sum
  StorePercentUsage:
    - mean
    - upper
    - lower
    - sum
  TotalConsumerCount:
    - mean
    - upper
    - lower
    - sum
  TotalMessageCount:
    - mean
    - upper
    - lower
    - sum
  TotalProducerCount:
    - mean
    - upper
    - lower
    - sum
AWS/ApiGateway:
  4XXError:
    - mean
    - sum
  5XXError:
    - mean
    - sum
  CacheHitCount:
    - mean
    - sum
  CacheMissCount:
    - mean
    - sum
  Count:
    - count
AWS/AppStream:
  ActualCapacity:
    - mean
    - upper
    - lower
  AvailableCapacity:
    - mean
    - upper
    - lower
  CapacityUtilization:
    - mean
    - upper
    - lower
  DesiredCapacity:
    - mean
    - upper
    - lower
  InUseCapacity:
    - mean
    - upper
    - lower
  InsufficientCapacityError:
    - mean
    - upper
    - lower
    - sum
  PendingCapacity:
    - mean
    - upper
    - lower
  RunningCapacity:
    - mean
    - upper
    - lower
AWS/ApplicationELB:
  ActiveConnectionCount:
    - sum
  ClientTLSNegotiationErrorCount:
    - sum
  ELBAuthError:
    - sum
  ELBAuthFailure:
    - sum
  ELBAuthLatency:
    - mean
    - upper
    - lower
  ELBAuthRefreshTokenSuccess:
    - sum
  ELBAuthSuccess:
    - sum
  ELBAuthUserClaimsSizeExceeded:
    - sum
  HTTPCode_ELB_3XX_Count:
    - sum
  HTTPCode_ELB_4XX_Count:
    - sum
  HTTPCode_ELB_500_Count:
    - sum
  HTTPCode_ELB_502_Count:
    - sum
  HTTPCode_ELB_503_Count:
    - sum
  HTTPCode_ELB_504_Count:
    - sum
  HTTPCode_ELB_5XX_Count:
    - sum
  HTTPCode_Target_2XX_Count:
    - sum
  HTTPCode_Target_3XX_Count:
    - sum
  HTTPCode_Target_4XX_Count:
    - sum
  HTTPCode_Target_5XX_Count:
    - sum
  HTTP_Fixed_Response_Count:
    - sum
  HTTP_Redirect_Count:
    - sum
  HTTP_Redirect_Url_Limit_Exceeded_Count:
    - sum
  HealthyHostCount:
    - mean
    - upper
    - lower
  IPv6ProcessedBytes:
    - sum
  IPv6RequestCount:
    - sum
  LambdaInternalError:
    - sum
  LambdaTargetProcessedBytes:
    - sum
  LambdaUserError:
    - sum
  NewConnectionCount:
    - sum
  NonStickyRequestCount:
    - sum
  ProcessedBytes:
    - sum
  RejectedConnectionCount:
    - sum
  RequestCount:
    - sum
  RequestCountPerTarget:
    - sum
  RuleEvaluations:
    - sum
  StandardProcessedBytes:
    - sum
  TargetConnectionErrorCount:
    - sum
  TargetResponseTime:
    - mean
  TargetTLSNegotiationErrorCount:
    - sum
  UnHealthyHostCount:
    - mean
    - upper
    - lower
AWS/CloudFront:
  4xxErrorRate:
    - mean
  5xxErrorRate:
    - mean
  BytesDownloaded:
    - sum
  BytesUploaded:
    - sum
  Requests:
    - sum
  TotalErrorRate:
    - mean
AWS/CloudSearch:
  IndexUtilization:
    - mean
    - upper
  Partitions:
    - upper
    - lower
  SearchableDocuments:
    - upper
  SuccessfulRequests:
    - upper
    - sum
AWS/DynamoDB:
  PendingReplicationCount:
    - mean
    - count
    - sum
  ProvisionedReadCapacityUnits:
    - mean
    - upper
    - lower
  ProvisionedWriteCapacityUnits:
    - mean
    - upper
    - lower
  ReadThrottleEvents:
    - count
    - sum
  ReplicationLatency:
    - mean
    - upper
    - lower
  SuccessfulRequestLatency:
    - mean
    - upper
    - lower
    - count
  SystemErrors:
    - count
    - sum
  ThrottledRequests:
    - count
    - sum
  TimeToLiveDeletedItemCount:
    - sum
  UserErrors:
    - count
    - sum
  WriteThrottleEvents:
    - count
    - sum
AWS/EC2:
  NetworkPacketsIn:
    - mean
    - upper
    - lower
  NetworkPacketsOut:
    - mean
    - upper
    - lower
AWS/ECS:
  CPUReservation:
    - mean
  CPUUtilization:
    - mean
    - count
  MemoryReservation:
    - mean
  MemoryUtilization:
    - mean
    - count
AWS/EFS:
  BurstCreditBalance:
    - mean
    - upper
    - lower
  ClientConnections:
    - sum
  PermittedThroughput:
    - mean
    - upper
    - lower
AWS/ELB:
  BackendConnectionErrors:
    - sum
  HTTPCode_Backend_2XX:
    - sum
  HTTPCode_Backend_3XX:
    - sum
  HTTPCode_Backend_4XX:
    - sum
  HTTPCode_Backend_5XX:
    - sum
  HTTPCode_ELB_4XX:
    - sum
  HTTPCode_ELB_5XX:
    - sum
  HealthyHostCount:
    - mean
    - upper
  Latency:
    - mean
    - upper
  RequestCount:
    - sum
  SpilloverCount:
    - sum
  SurgeQueueLength:
    - mean
    - upper
    - lower
  UnHealthyHostCount:
    - mean
    - lower
AWS/ES:
  AutomatedSnapshotFailure:
    - upper
    - lower
  CPUCreditBalance:
    - lower
  CPUUtilization:
    - mean
    - upper
  ClusterIndexWritesBlocked:
    - upper
  ClusterStatus.green:
    - upper
    - lower
  ClusterStatus.red:
    - upper
    - lower
  ClusterStatus.yellow:
    - upper
    - lower
  ClusterUsedSpace:
    - upper
    - lower
  DeletedDocuments:
    - mean
    - upper
    - lower
  DiskQueueDepth:
    - mean
    - upper
    - lower
  ElasticsearchRequests:
    - sum
  FreeStorageSpace:
    - mean
    - upper
    - lower
    - sum
  IndexingLatency:
    - mean
  IndexingRate:
    - mean
  InvalidHostHeaderRequests:
    - sum
  JVMGCOldCollectionCount:
    - upper
  JVMGCOldCollectionTime:
    - upper
  JVMGCYoungCollectionCount:
    - upper
  JVMGCYoungCollectionTime:
    - upper
  JVMMemoryPressure:
    - upper
  KMSKeyError:
    - upper
    - lower
  KMSKeyInaccessible:
    - upper
    - lower
  KibanaHealthyNodes:
    - lower
  MasterCPUCreditBalance:
    - lower
  MasterCPUUtilization:
    - mean
  MasterJVMMemoryPressure:
    - upper
  MasterReachableFromNode:
    - upper
    - lower
  Nodes:
    - mean
    - upper
    - lower
  ReadIOPS:
    - mean
    - upper
    - lower
  ReadLatency:
    - mean
    - upper
    - lower
  ReadThroughput:
    - mean
    - upper
    - lower
  RequestCount:
    - sum
  SearchLatency:
    - mean
  SearchRate:
    - mean
  SearchableDocuments:
    - mean
    - upper
    - lower
  SysMemoryUtilization:
    - mean
    - upper
    - lower
  ThreadpoolBulkQueue:
    - upper
  ThreadpoolBulkRejected:
    - upper
  ThreadpoolBulkThreads:
    - upper
  ThreadpoolForce_mergeQueue:
    - upper
  ThreadpoolForce_mergeRejected:
    - upper
    - sum
  ThreadpoolForce_mergeThreads:
    - mean
    - upper
    - sum
  ThreadpoolIndexQueue:
    - upper
  ThreadpoolIndexRejected:
    - upper
    - sum
  ThreadpoolIndexThreads:
    - upper
  ThreadpoolSearchQueue:
    - upper
  ThreadpoolSearchRejected:
    - upper
    - sum
  ThreadpoolSearchThreads:
    - upper
  WriteIOPS:
    - mean
    - upper
    - lower
  WriteLatency:
    - mean
    - upper
    - lower
  WriteThroughput:
    - mean
    - upper
    - lower
AWS/GameLift:
  ActivatingGameSessions:
    - mean
    - upper
    - lower
  ActiveGameSessions:
    - mean
    - upper
    - lower
  ActiveInstances:
    - mean
    - upper
    - lower
  ActiveServerProcesses:
    - mean
    - upper
    - lower
  AvailableGameSessions:
    - mean
    - upper
    - lower
  AverageWaitTime:
    - mean
    - upper
    - lower
    - sum
  CurrentPlayerSessions:
    - mean
    - upper
    - lower
  CurrentTickets:
    - mean
    - upper
    - lower
    - sum
  DesiredInstances:
    - mean
    - upper
    - lower
  FirstChoiceNotViable:
    - mean
    - upper
    - lower
    - sum
  FirstChoiceOutOfCapacity:
    - mean
    - upper
    - lower
    - sum
  GameSessionInterruptions:
    - mean
    - upper
    - lower
    - sum
  HealthyServerProcesses:
    - mean
    - upper
    - lower
  IdleInstances:
    - mean
    - upper
    - lower
  InstanceInterruptions:
    - mean
    - upper
    - lower
    - sum
  LowestLatencyPlacement:
    - mean
    - upper
    - lower
    - sum
  LowestPricePlacement:
    - mean
    - upper
    - lower
    - sum
  MatchAcceptancesTimedOut:
    - sum
  MatchesAccepted:
    - sum
  MatchesCreated:
    - sum
  MatchesPlaced:
    - sum
  MatchesRejected:
    - sum
  MaxInstances:
    - mean
    - upper
    - lower
  MinInstances:
    - mean
    - upper
    - lower
  PercentAvailableGameSessions:
    - mean
  PercentHealthyServerProcesses:
    - mean
    - upper
    - lower
  PercentIdleInstances:
    - mean
    - upper
    - lower
  Placement:
    - sum
  PlacementsCanceled:
    - mean
    - upper
    - lower
    - sum
  PlacementsFailed:
    - mean
    - upper
    - lower
    - sum
  PlacementsStarted:
    - mean
    - upper
    - lower
    - sum
  PlacementsSucceeded:
    - mean
    - upper
    - lower
    - sum
  PlacementsTimedOut:
    - mean
    - upper
    - lower
    - sum
  PlayerSessionActivations:
    - mean
    - upper
    - lower
    - sum
  PlayersStarted:
    - sum
  QueueDepth:
    - mean
    - upper
    - lower
    - sum
  RuleEvaluationsFailed:
    - sum
  RuleEvaluationsPassed:
    - sum
  ServerProcessAbnormalTerminations:
    - mean
    - upper
    - lower
    - sum
  ServerProcessActivations:
    - mean
    - upper
    - lower
    - sum
  ServerProcessTerminations:
    - mean
    - upper
    - lower
    - sum
  TicketsFailed:
    - sum
  TicketsStarted:
    - sum
  TicketsTimedOut:
    - sum
  TimeToMatch:
    - mean
    - upper
    - lower
    - count
  TimeToTicketCancel:
    - mean
    - upper
    - lower
    - count
  TimeToTicketSuccess:
    - mean
    - upper
    - lower
    - count
AWS/KMS:
  SecondsUntilKeyMaterialExpiration:
    - lower
AWS/Kinesis:
  GetRecords.IteratorAgeMilliseconds:
    - mean
    - upper
    - lower
    - count
  GetRecords.Latency:
    - mean
    - upper
    - lower
  GetRecords.Success:
    - mean
    - count
    - sum
  IteratorAgeMilliseconds:
    - mean
    - upper
    - lower
    - count
  PutRecord.Latency:
    - mean
    - upper
    - lower
  PutRecord.Success:
    - mean
    - count
    - sum
  PutRecords.Latency:
    - mean
    - upper
    - lower
  PutRecords.Success:
    - mean
    - count
    - sum
  SubscribeToShardEvent.MillisBehindLatest:
    - mean
    - upper
    - lower
    - count
AWS/KinesisAnalytics:
  downtime:
    - sum
  lastCheckpointDuration:
    - mean
    - upper
  lastCheckpointSize:
    - sum
AWS/Lambda:
  ConcurrentExecutions:
    - upper
  DeadLetterErrors:
    - sum
  DestinationDeliveryFailures:
    - sum
  Duration:
    - mean
    - upper
  Errors:
    - sum
  Invocations:
    - sum
  IteratorAge:
    - mean
    - upper
  ProvisionedConcurrencyInvocations:
    - sum
  ProvisionedConcurrencySpilloverInvocations:
    - sum
  ProvisionedConcurrencyUtilization:
    - upper
  ProvisionedConcurrentExecutions:
    - upper
  Throttles:
    - sum
  UnreservedConcurrentExecutions:
    - upper
AWS/Logs:
  DeliveryErrors:
    - sum
  DeliveryThrottling:
    - sum
  ForwardedBytes:
    - sum
  ForwardedLogEvents:
    - sum
  IncomingBytes:
    - sum
  IncomingLogEvents:
    - sum
AWS/NATGateway:
  ActiveConnectionCount:
    - upper
  BytesInFromDestination:
    - sum
  BytesInFromSource:
    - sum
  BytesOutToDestination:
    - sum
  BytesOutToSource:
    - sum
  ConnectionAttemptCount:
    - sum
  ConnectionEstablishedCount:
    - sum
  ErrorPortAllocation:
    - sum
  IdleTimeoutCount:
    - sum
  PacketsDropCount:
    - sum
  PacketsInFromDestination:
    - sum
  PacketsInFromSource:
    - sum
  PacketsOutToDestination:
    - sum
  PacketsOutToSource:
    - sum
AWS/NetworkELB:
  ActiveFlowCount:
    - mean
    - upper
    - lower
  ActiveFlowCount_TLS:
    - mean
    - upper
    - lower
  ClientTLSNegotiationErrorCount:
    - sum
  HealthyHostCount:
    - upper
    - lower
  NewFlowCount:
    - sum
  NewFlowCount_TLS:
    - sum
  ProcessedBytes:
    - sum
  ProcessedBytes_TLS:
    - sum
  TCP_Client_Reset_Count:
    - sum
  TCP_ELB_Reset_Count:
    - sum
  TCP_Target_Reset_Count:
    - sum
  TargetTLSNegotiationErrorCount:
    - sum
  UnHealthyHostCount:
    - upper
    - lower
AWS/Polly:
  2XXCount:
    - mean
    - count
    - sum
  4XXCount:
    - mean
    - count
    - sum
  5XXCount:
    - mean
    - count
    - sum
  ResponseLatency:
    - mean
    - upper
    - lower
    - count
AWS/Route53:
  ChildHealthCheckHealthyCount:
    - mean
  ConnectionTime:
    - mean
  HealthCheckPercentageHealthy:
    - mean
    - upper
    - lower
  HealthCheckStatus:
    - lower
  SSLHandshakeTime:
    - mean
  TimeToFirstByte:
    - mean
AWS/S3:
  AllRequests:
    - sum
  BucketSizeBytes:
    - mean
  DeleteRequests:
    - sum
  GetRequests:
    - sum
  HeadRequests:
    - sum
  ListRequests:
    - sum
  NumberOfObjects:
    - mean
  PostRequests:
    - sum
  PutRequests:
    - sum
  SelectRequests:
    - sum
AWS/SNS:
  NumberOfMessagesPublished:
    - sum
  NumberOfNotificationsDelivered:
    - sum
  NumberOfNotificationsFailed:
    - mean
    - sum
  NumberOfNotificationsFilteredOut:
    - mean
    - sum
  NumberOfNotificationsFilteredOut-InvalidAttributes:
    - mean
    - sum
  NumberOfNotificationsFilteredOut-NoMessageAttributes:
    - mean
    - sum
  PublishSize:
    - mean
    - upper
    - lower
    - count
  SMSMonthToDateSpentUSD:
    - upper
  SMSSuccessRate:
    - mean
    - count
    - sum
AWS/SWF:
  ActivityTaskScheduleToCloseTime:
    - mean
    - upper
    - lower
  ActivityTaskScheduleToStartTime:
    - mean
    - upper
    - lower
  ActivityTaskStartToCloseTime:
    - mean
    - upper
    - lower
  ActivityTasksCanceled:
    - sum
  ActivityTasksCompleted:
    - sum
  ActivityTasksFailed:
    - sum
  ConsumedCapacity:
    - sum
  DecisionTaskScheduleToStartTime:
    - mean
    - upper
    - lower
  DecisionTaskStartToCloseTime:
    - mean
    - upper
    - lower
  DecisionTasksCompleted:
    - sum
  PendingTasks:
    - sum
  ProvisionedBucketSize:
    - lower
  ProvisionedRefillRate:
    - lower
  ScheduledActivityTasksTimedOutOnClose:
    - sum
  ScheduledActivityTasksTimedOutOnStart:
    - sum
  StartedActivityTasksTimedOutOnClose:
    - sum
  StartedActivityTasksTimedOutOnHeartbeat:
    - sum
  StartedDecisionTasksTimedOutOnClose:
    - sum
  ThrottledEvents:
    - sum
  WorkflowStartToCloseTime:
    - mean
    - upper
    - lower
  WorkflowsCanceled:
    - sum
  WorkflowsCompleted:
    - sum
  WorkflowsContinuedAsNew:
    - sum
  WorkflowsFailed:
    - sum
  WorkflowsTerminated:
    - sum
  WorkflowsTimedOut:
    - sum
AWS/SageMaker:
  DatasetObjectsAutoAnnotated:
    - upper
  DatasetObjectsHumanAnnotated:
    - upper
  DatasetObjectsLabelingFailed:
    - upper
  Invocation4XXErrors:
    - mean
    - sum
  Invocation5XXErrors:
    - mean
    - sum
  Invocations:
    - count
    - sum
  InvocationsPerInstance:
    - sum
  JobsFailed:
    - count
    - sum
  JobsStopped:
    - count
    - sum
  JobsSucceeded:
    - count
    - sum
  TotalDatasetObjectsLabeled:
    - upper
AWS/StorageGateway:
  CloudBytesDownloaded:
    - count
    - sum
  CloudBytesUploaded:
    - count
    - sum
  CloudDownloadLatency:
    - mean
  ReadBytes:
    - count
    - sum
  ReadTime:
    - mean
  WriteBytes:
    - count
    - sum
  WriteTime:
    - mean
AWS/Translate:
  CharacterCount:
    - mean
    - upper
    - lower
    - sum
  ResponseTime:
    - mean
    - count
  ServerErrorCount:
    - mean
    - sum
  SuccessfulRequestCount:
    - mean
    - sum
  ThrottledCount:
    - mean
    - sum
  UserErrorCount:
    - mean
    - sum
Glue:
  glue.ALL.jvm.heap.usage:
    - mean
  glue.ALL.jvm.heap.used:
    - mean
  glue.ALL.s3.filesystem.read_bytes:
    - sum
  glue.ALL.s3.filesystem.write_bytes:
    - sum
  glue.ALL.system.cpuSystemLoad:
    - mean
  glue.driver.BlockManager.disk.diskSpaceUsed_MB:
    - mean
  glue.driver.ExecutorAllocationManager.executors.numberAllExecutors:
    - mean
  glue.driver.ExecutorAllocationManager.executors.numberMaxNeededExecutors:
    - upper
  glue.driver.aggregate.bytesRead:
    - sum
  glue.driver.aggregate.elapsedTime:
    - sum
  glue.driver.aggregate.numCompletedStages:
    - sum
  glue.driver.aggregate.numCompletedTasks:
    - sum
  glue.driver.aggregate.numFailedTasks:
    - sum
  glue.driver.aggregate.numKilledTasks:
    - sum
  glue.driver.aggregate.recordsRead:
    - sum
  glue.driver.aggregate.shuffleBytesWritten:
    - sum
  glue.driver.aggregate.shuffleLocalBytesRead:
    - sum
  glue.driver.jvm.heap.usage:
    - mean
  glue.driver.jvm.heap.used:
    - mean
  glue.driver.s3.filesystem.read_bytes:
    - sum
  glue.driver.s3.filesystem.write_bytes:
    - sum
  glue.driver.system.cpuSystemLoad:
    - mean
  glue.executorId.jvm.heap.usage:
    - mean
WAF:
  AllowedRequests:
    - sum
  BlockedRequests:
    - sum
  CountedRequests:
    - sum
  PassedRequests:
    - sum
