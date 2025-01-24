.. _k8s-predefined-metric-classes:

************************************
Available predefined metric classes
************************************

.. meta::
   :description: Learn what predefined metric classes are and which predefined metric classes are currently available.

.. note:: Predefined metric classes are only available on Kubernetes navigators.

In Splunk Infrastructure Monitoring, a metric class is a grouping of related metrics and KPIs. You can use predefined metric classes to customize your Kubernetes navigator table view to troubleshoot specific aspects of your deployment.

For more information on using predefined metric classes, see :ref:`k8s-nav-metric-class-overview`.

List of predefined metric classes
===================================

Splunk Infrastructure Monitoring includes the following predefined metric classes:

 ========================= ============================ ================================================================================================================================================================= 
  Navigator                 Metric class                 Description                                                                                                                                                      
 ========================= ============================ ================================================================================================================================================================= 
  Kubernetes clusters       Default                      A default group of metrics and KPIs that are essential for troubleshooting Kubernetes clusters.                                                                  
  Kubernetes nodes          Default                      A default group of metrics and KPIs that are essential for troubleshooting Kubernetes nodes.                                                                     
                            Node CPU                     A group of metrics and KPIs related to node CPU troubleshooting.                                                                                                 
                            Node memory                  A group of metrics and KPIs related to node memory troubleshooting.                                                                                              
                            Node file system             A group of metrics and KPIs related to node storage troubleshooting.                                                                                             
                            Node network metrics         A group of metrics and KPIs related to node network troubleshooting.                                                                                             
  Kubernetes pods           Default                      A default group of metrics and KPIs that are essential for troubleshooting Kubernetes pods.                                                                      
                            Pod status                   A group of metrics and KPIs related to pod status troubleshooting.                                                                                               
                            Pod CPU                      A group of metrics and KPIs related to pod CPU troubleshooting. Note: Pod Limits & requests is the sum of individual container limits and requests in the pod.   
                            Pod memory                   A group of metrics and KPIs related to pod memory troubleshooting. Note: Pod Limits & requests is the sum of individual container limits and requests in the pod.  
                            Pod file system              A group of metrics and KPIs related to pod storage troubleshooting.                                                                                              
  Kubernetes containers     Default                      A default group of metrics and KPIs that are essential for troubleshooting Kubernetes containers.                                                                
                            Container CPU                A group of metrics and KPIs related to container CPU troubleshooting.                                                                                            
                            Container memory             A group of metrics and KPIs related to container memory troubleshooting.                                                                                         
                            Container file system        A group of metrics and KPIs related to container storage troubleshooting.                                                                                        
                            Container network metrics    A group of metrics and KPIs related to container network troubleshooting.                                                                                        
  Kubernetes Clusters       Cluster CPU                                                                                                                                                                                   
  Kubernetes Clusters       Cluster Memory                                                                                                                                                                                
  Kubernetes Clusters       Cluster File system                                                                                                                                                                           
  Kubernetes Clusters       Cluster Control Panel                                                                                                                                                                         
  Kubernetes workloads      Default                      A default group of metrics and KPIs that are essential for troubleshooting Kubernetes workloads.                                                                 
                            Workload pods                A group of metrics and KPIs related to troubleshooting the pods of a workload.                                                                                   
                            Workload churn               A group of metrics and KPIs related to workload churn troubleshooting.                                                                                           
                            Workload scaling             A group of metrics and KPIs related to workload scaling troubleshooting.                                                                                         
                            Workload attributes          A group of metrics and KPIs related to workload attributes.                                                                                                      
  Kubernetes deployments    Default                      A default group of metrics and KPIs that are essential for troubleshooting Kubernetes deployments.                                                               
                            Deployment pods              A group of metrics and KPIs related to troubleshooting the pods of a deployment.                                                                                 
                            Deployment churn             A group of metrics and KPIs related to deployment churn troubleshooting.                                                                                         
                            Deployment scaling           A group of metrics and KPIs related to deployment scaling troubleshooting.                                                                                       
                            Deployment attributes        A group of metrics and KPIs related to deployment attributes.                                                                                                    
  Kubernetes ReplicaSets    Default                      A default group of metrics and KPIs that are essential for troubleshooting Kubernetes ReplicaSets.                                                               
                            ReplicaSet pods              A group of metrics and KPIs related to troubleshooting the pods of a ReplicaSet.                                                                                 
                            ReplicaSet churn             A group of metrics and KPIs related to ReplicaSet churn troubleshooting.                                                                                         
                            ReplicaSet scaling           A group of metrics and KPIs related to ReplicaSet scaling troubleshooting.                                                                                       
                            ReplicaSet attributes        A group of metrics and KPIs related to ReplicaSet attributes.                                                                                                    
  Kubernetes DaemonSets     Default                      A default group of metrics and KPIs that are essential for troubleshooting Kubernetes DaemonSets.                                                                
                            DaemonSet nodes              A group of metrics and KPIs related to troubleshooting the pods of a DaemonSet.                                                                                  
                            DaemonSet churn              A group of metrics and KPIs related to DaemonSet churn troubleshooting.                                                                                          
                            DaemonSet attributes         A group of metrics and KPIs related to DaemonSet attributes.                                                                                                     
  Kubernetes StatefulSets   Default                      A default group of metrics and KPIs that are essential for troubleshooting Kubernetes StatefulSets.                                                              
                            StatefulSet pods             A group of metrics and KPIs related to troubleshooting the pods of a StatefulSet.                                                                                
                            StatefulSet churn            A group of metrics and KPIs related to StatefulSet churn troubleshooting.                                                                                        
                            StatefulSet attributes       A group of metrics and KPIs related to StatefulSet attributes.                                                                                                   
  Kubernetes namespaces     Default                      A default group of metrics and KPIs that are essential for troubleshooting Kubernetes namespaces.                                                                
                            Namespace workloads          A group of metrics and KPIs related to troubleshooting the workloads of a namespace.                                                                             
                            Namespace resources          A group of metrics and KPIs related to troubleshooting namespace resources.                                                                                      
  Kubernetes CronJobs       Default                      A default group of metrics and KPIs that are essential for troubleshooting Kubernetes CronJobs.                                                                  
                            CronJob jobs                 A group of metrics and KPIs related to troubleshooting the jobs of a CronJob.                                                                                    
                            CronJob pods                 A group of metrics and KPIs related to troubleshooting the pods of a CronJob.                                                                                    
                            CronJob attributes           A group of metrics and KPIs related to CronJob attributes.                                                                                                       
  Kubernetes jobs           Default                      A default group of metrics and KPIs that are essential for troubleshooting Kubernetes jobs.                                                                      
                            Job attributes               A group of metrics and KPIs related to job attributes.                                                                                                           
 ========================= ============================ ================================================================================================================================================================= 



