.. roles-mpm

.. list-table::
  :header-rows: 1
  :width: 100%
  :widths: 50, 25, 25

  * - :strong:`Permission`
    - :strong:`Admin`
    - :strong:`User`

  * - :strong:`View metrics pipeline management metric summary (no ruleset)`
    - Yes
    - Yes

  * - :strong:`View metrics pipeline management metric summary with rulesets`
    - Yes
    - Yes


  * - :strong:`Edit default data routing`
    - Yes
    - No


  * - :strong:`Add data routing exception rule`
    - Yes
    - Yes


  * - :strong:`Edit data routing exception rule`
    - Yes
    - Yes


  * - :strong:`Activate, deactivate, or delete data routing exception rule`
    - Yes
    - Yes


  * - :strong:`Add MTS aggregation rule`
    - Yes
    - Yes

  * - :strong:`Edit MTS aggregation rule`
    - Yes
    - Yes


  * - :strong:`Activate, deactivate, or delete MTS aggregation rule`
    - Yes
    - Yes


  * - :strong:`Delete entire metrics pipeline management ruleset`
    - Yes
    - Yes, if default routing is real-time storage and the user deletes all aggregation rules.
      No, if default routing is Drop Data and the user deletes all aggregation rules. Metrics pipeline management
      doesn't delete the ruleset. An Admin needs to change the routing to real-time storage and delete the ruleset.
