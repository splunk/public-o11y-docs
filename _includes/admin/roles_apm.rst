

.. list-table::
  :widths: 20,40,10,10,10,10

  * - :strong:`Capability name`
    - :strong:`What it lets you do`
    - :strong:`Admin`
    - :strong:`Power user`
    - :strong:`Read-only`
    - :strong:`Subscription usage`


  * - WRITE_CONFIG
    - In APM, the WRITE_CONFIG capability lets you create, edit, and delete MetricSets and Business Workflows. This permission also controls access to configuration options for traces and spans. Functionality in the API is similarly restricted by capability.

      In the APM API, the WRITE_CONFIG capability lets you use the PUT and POST methods on the APM Visibility Filters resource. See :ref:`sensitive-data-controls` for more information.
    - Yes
    - No
    - No
    - No

  * - UPDATE_TAG and DELETE_TAG
    - In APM, the combination of the UPDATE_TAG and DELETE_TAG capabilities let you view, but not make changes to, the following APM-related pages in the Observability Cloud Settings: APM MetricSets, Business Workflow, Extended Trace Retention. Functionality in the API is similarly restricted by capability.
    - Yes
    - Yes
    - No
    - No

  * - CREATE_REPORT
    - The CREATE_REPORT capability only applies to functionality in the API. In the APM API, the CREATE_REPORT capability lets you access the APM Reporting resource.
    - Yes
    - Yes
    - No
    - No

  * - READ_CONFIG
    - The READ_CONFIG capability only applies to functionality in the API. In the APM API, the READ_CONFIG capability lets you use the GET method on the APM Visibility Filters resource. See :ref:`sensitive-data-controls` for more information.
    - Yes
    - Yes
    - No
    - No

  * - DELETE_CONFIG
    - The DELETE_CONFIG capability only applies to functionality in the API. In the APM API, the DELETE_CONFIG capability lets you use the DELETE method on the APM Visibility Filters resource. See :ref:`sensitive-data-controls` for more information.
    - Yes
    - Yes
    - No
    - No





