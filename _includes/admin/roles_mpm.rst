

.. list-table::
  :header-rows: 1
  :widths: 20,20,20,20,20

  * - :strong:`Permission`
    - :strong:`Admin`
    - :strong:`Power user`
    - :strong:`Usage`
    - :strong:`Read_only`


  * - :strong:`View metrics pipeline management metric summary (no ruleset)`
    - Yes
    - Yes
    - Yes
    - Yes


  * - :strong:`View metrics pipeline management metric summary with rulesets`
    - Yes
    - Yes
    - Yes
    - Yes

  * - :strong:`Edit default data routing`
    - Yes
    - No
    - No
    - No

  * - :strong:`Add data routing exception rule`
    - Yes
    - Yes
    - No
    - No

  * - :strong:`Edit data routing exception rule`
    - Yes
    - Yes
    - No
    - No

  * - :strong:`Activate, deactivate, or delete data routing exception rule`
    - Yes
    - Yes
    - No
    - No

  * - :strong:`Add MTS aggregation rule`
    - Yes
    - Yes
    - No
    - No

  * - :strong:`Edit MTS aggregation rule`
    - Yes
    - Yes
    - No
    - No

  * - :strong:`Activate, deactivate, or delete MTS aggregation rule`
    - Yes
    - Yes
    - No
    - No

  * - :strong:`Delete entire metrics pipeline management ruleset`
    - Yes
    - Yes, if default routing is real-time storage and the user deletes all aggregation rules.
      No, if default routing is Drop Data and the user deletes all aggregation rules. Metrics pipeline management
      doesn't delete the ruleset. An Admin needs to change the routing to real-time storage and delete the ruleset.
    - No
    - No
