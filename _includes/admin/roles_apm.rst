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

  * - The following functionality in the APM API.
       - The APM Reporting resource
       - The following methods for the APM Visibility Filters resource. See :ref:`sensitive-data-controls` for more information.
         - PUT
         - POST
         - DELETE
    - Yes
    - No
    - No
    - No

  * - The GET method for the APM Visibility Filters resource. See :ref:`sensitive-data-controls` for more information.
    - Yes
    - No
    - No
    - No

  * - View the following APM-related pages in the Observability Cloud Settings. Functionality in the API is similarly restricted by capability.
       - APM MetricSets
       - Business Workflow
       - Extended Trace Retention
    - Yes
    - Yes
    - No
    - No

  * - The GET method on the APM Visibility Filters resource in the APM API, see :ref:`sensitive-data-controls` for more information.
    - Yes
    - Yes
    - Yes
    - No