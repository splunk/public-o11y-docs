
.. _delete-metric-ruleset-arm:

*******************************************************************************
Delete a metrics ruleset
*******************************************************************************

.. meta::
    :description: Learn how to control your storage by deleting an entire metrics ruleset.

|hr|

:strong:`Available in Enterprise Edition and Service Bureau`

|hr|

When you want to clear all your routing exception and MTS aggregation rules for a metric,
delete the metric ruleset for the metric. Deleting the ruleset resets the storage of the metric to its
default routing.

.. _delete-ruleset-arm:

Delete the ruleset
===============================================================================

.. note::

   - Users who have the Admin role can delete a metric ruleset regardless of the default routing for the metric.
   - Users who have the Power user role can only delete a metric ruleset if the default routing for the metric is
     real-time storage. If the default routing is archived storage or drop data, a user with the Admin role needs to
     delete the ruleset.

.. TODO Finish the rest of the procedure