.. _gcp-infra-metadata:

**********************************
Google Cloud Platform metadata
**********************************

.. meta::
  :description: GCP infrastructure metadata in Splunk Observability Cloud.

The GCP integration queries the GCP API for metadata about the monitored resources. You can filter and group metrics by this metadata in :ref:`charts <data-visualization-charts>`, or in the Infrastructure Navigator.

-  Metadata that are common to all services within a project (project-level metadata) are put on properties of ``project_id`` dimension.
-  Metadata that are service-specific (service-level metadata) are put on properties of the ``gcp_id`` dimension.

.. _metadata-project-level:

Project-level metadata
=============================================================================

See the metadata synced at a project level:

.. list-table::
    :header-rows: 1
    :width: 100

    * - :strong:`GCP name`
      - :strong:`Custom property`
      - :strong:`Description`

    * - ``creationTimestamp``
      - ``gcp_project_creation_time``
      - time project was created (for example, ``Thu Oct 19 18:16:25 UTC 2017``)

    * - Labels \*
      - ``gcp_project_label_<name-of-label>`` (if user has labels)
      - all project-wide labels except for ``signalfx-id``

    * - ``name``
      - ``gcp_project_name``
      - human readable project name

    * - ``project_number``
      - ``gcp_project_number``
      - project_number given by GCP

    * - ``status``
      - ``gcp_project_status``
      - project status (e.g. ``ACTIVE``, ``DELETE_IN_PROGRESS``, ``DELETE_REQUESTED``)

\* This property is a list of key value pairs in GCP. For example, if GCP has [``key1:label01``, ``key2:label02``] as the labels property, we will have two properties: ``gcp_project_label_key1`` and ``gcp_project_label_key2``.

.. _metadata-service-level:

Service-level metadata
=============================================================================

See the metadata synced at a service level:

.. _compute-engine-properties:

Compute Engine
------------------------------

For Google Cloud Platform Compute Engine instances, Infrastructure Monitoring gets a subset of metadata about the instance, as well as custom metadata specified by the user at an instance level.

.. note::
  The Compute Engine instance metadata table includes two custom properties that are now deprecated, as well as information about which properties replace the deprecated properties.

:strong:`Compute Engine instance metadata`

.. list-table::
    :header-rows: 1
    :width: 100%

    * - :strong:`GCP name`
      - :strong:`Custom property`
      - :strong:`Description`

    * - ``scheduling.automaticRestart``
      - ``gcp_auto_restart``
      - Whether the instance should be automatically restarted if it is terminated by Compute Engine (not terminated by a user)

    * - ``scheduling.onHostMaintenance``
      - ``gcp_behavior_on_maintenance``
      - Maintenance behavior for the instance

    * - ``scheduling.preemptible``
      - ``gcp_preemptibility``
      - True if the instance is preemptible; otherwise false

    * - ``cpuPlatform``
      - ``gcp_cpu_platform``
      - CPU platform used by this instance

    * - ``CPU``
      - ``gcp_cpus``
      - Number of virtual CPUs that are available to the instance

    * - ``creationTimestamp``
      - ``gcp_creation_time``
      - Time when the instance was created,  (for example, ``Thu Oct 19 18:16:25 UTC 2017``)

    * - ``description``
      - ``gcp_description``
      - Description of this instance

    * - ``disks[].licenses[]`` \*
      - ``gcp_image_license``
      - License corresponding to the disks used by the instance

    * - ``canIpForward``
      - ``gcp_ip_forward``
      - Whether to allow this instance to send and receive packets with non-matching destination or source IPs

    * - ``machineType``
      - ``gcp_machine_type``
      - Type of gcp machine to which this instance corresponds

    * - ``memory``
      - ``gcp_memory``
      - Amount of physical memory available to the instance, defined in MB

    * - ``metadata`` \*\*
      - ``gcp_metadata_<metadata-key>``
      - Custom metadata key for the instance (generated based on includelisted properties specified when :ref:`completing the integration in Splunk Infrastructure Monitoringx <gcp-three>`)

    * - ``status``
      - ``gcp_status``
      - String containing instance status and status code, for example ``Code=2, Status=RUNNING``. This property is now deprecated, and won't contain new statuses introduced by GCP such as ``REPAIRING`` or ``SUSPENDING``. Use ``gcp_instance_status`` instead.

    * - ``status``
      - ``gcp_instance_status``
      - Status of the instance, for example ``RUNNING`` or ``STAGING``.

    * - ``self_link``
      - ``gcp_self_link``
      - Instance self link as reported by GCP

    * - ``standard_id``
      - ``gcp_standard_id``
      - Instance ID in a format enforced by Splunk Observability Cloud, for example ``https://compute.googleapis.com/compute/v1/projects/testProject/zones/us-central1-a/instances/testInstance``. This property is now deprecated. Use ``gcp_self_link`` instead.

\* There is not a one-to-one mapping between the gcp_image_license property to one in GCP because the property value is derived from the licenses of the disks associated with the compute instance.

\*\* This property is a list of key value pairs in GCP. For example, if GCP has [``key1:val1``, ``key2:val2``] as the metadata property, we will have two properties: ``gcp_metadata_key1`` and ``gcp_metadata_key2``.

For detailed information on properties, see Google Cloud documentation.

.. _k8-engine-properties:

Kubernetes Engine
------------------------------

GKE syncs properties for the following resources:

:strong:`k8s_container`

.. list-table::
    :header-rows: 1
    :width: 100%

    * - :strong:`GCP name`
      - :strong:`Custom property`
      - :strong:`Description`

    * - ``scheduling.automaticRestart``
      - ``gcp_auto_restart``
      - 

    * - ``scheduling.automaticRestart``
      - ``gcp_auto_restart``
      - 

:strong:`k8s_node`

.. list-table::
    :header-rows: 1
    :width: 100%

    * - :strong:`GCP name`
      - :strong:`Custom property`
      - :strong:`Description`

    * - ``scheduling.automaticRestart``
      - ``gcp_auto_restart``
      - 

    * - ``scheduling.automaticRestart``
      - ``gcp_auto_restart``
      - 

:strong:`k8s_pod`

.. list-table::
    :header-rows: 1
    :width: 100%

    * - :strong:`GCP name`
      - :strong:`Custom property`
      - :strong:`Description`

    * - ``scheduling.automaticRestart``
      - ``gcp_auto_restart``
      - 

    * - ``scheduling.automaticRestart``
      - ``gcp_auto_restart``
      - 

.. _storage-bucket-properties:

Storage Bucket
------------------------------

Storage buckets sync the following properties:

.. list-table::
    :header-rows: 1
    :width: 100%

    * -   :strong:`GCP name`
      -   :strong:`Custom property`
      -   :strong:`Description`

    * -   ``creationTimestamp``
      -   ``gcp_creation_time``
      -   time at which the bucket was created,  (for example, ``Thu Oct 19 18:16:25 UTC 2017``)

    * -  Labels \*
      -   ``gcp_label_<name-of-label>`` (if user has labels)
      -   user |hyph| specified labels

    * -   Storage class
      -   ``gcp_storage_class``
      -   bucket's storage class, such as ``coldline``

\* The labels property is a list of key value pairs in GCP. For example, if GCP has [``key1:label01``, ``key2:label02``] as the labels property, we will have two properties: ``gcp_label_key1`` and ``gcp_label_key2``.

.. _spanner-instance-properties:

Spanner 
------------------------------

Spanner instances currently sync the following properties:

.. list-table::
    :header-rows: 1
    :width: 100%

    * - :strong:`GCP name`
      - :strong:`Custom property`
      - :strong:`Description`

    * - ``state``
      - ``gcp_state``
      - state of the spanner instance (e.g. ``CREATING``, ``READY``)

    * - Labels \*
      - ``gcp_label_<name-of-label>`` (if user has labels)
      - user |hyph| specified labels

\* The labels property is a list of key value pairs in GCP. For example, if GCP has [``key1:label01``, ``key2:label02``] as the labels property, we will have two properties: ``gcp_label_key1`` and ``gcp_label_key2``.

