

.. list-table::
  :widths: 60,10,10,10,10

  * - :strong:`Capability`
    - :strong:`Admin`
    - :strong:`Power user`
    - :strong:`Read-only`
    - :strong:`Subscription usage`


  * -  Create, edit, and delete the following APM components. Functionality in the API is similarly restricted by capability.
        - Span tags
        - MetricSets
        - Business Workflows
    - Yes
    - No
    - No
    - No

  * - Configure options for traces and spans. 
    - Yes
    - No
    - No
    - No

  * - The following methods for the APM Visibility Filters resource. See :ref:`sensitive-data-controls` for more information.
      - PUT
      - POST
    - Yes
    - No
    - No
    - No

  * - In APM, the combination of the UPDATE_TAG and DELETE_TAG capabilities let you view, but not make changes to, the following APM-related pages in the Observability Cloud Settings: APM MetricSets, Business Workflow, Extended Trace Retention. Functionality in the API is similarly restricted by capability.
    - Yes
    - Yes
    - No
    - No

  * - The CREATE_REPORT capability only applies to functionality in the API. In the APM API, the CREATE_REPORT capability lets you access the APM Reporting resource.
    - Yes
    - Yes
    - No
    - No

  * - The READ_CONFIG capability only applies to functionality in the API. In the APM API, the READ_CONFIG capability lets you use the GET method on the APM Visibility Filters resource. See :ref:`sensitive-data-controls` for more information.
    - Yes
    - Yes
    - No
    - No

  * - The DELETE_CONFIG capability only applies to functionality in the API. In the APM API, the DELETE_CONFIG capability lets you use the DELETE method on the APM Visibility Filters resource. See :ref:`sensitive-data-controls` for more information.
    - Yes
    - Yes
    - No
    - No





