.. _auto-clearing-alerts:

**********************
Auto-clear alerts
**********************



.. meta::
  :description: The Auto-clear feature automatically resolves active alerts after a certain amount of time when a metric time series stops reporting as expected, so that you don't have to clear alerts manually.

The Auto-clear feature automatically resolves active alerts after a designated amount of time when a metric time series stops reporting as expected, so that you don't have to clear alerts manually. Auto-clear is available for all condition types, including Sudden Change, Resource Running Out, and Historical Anomaly.

To turn on Auto-clear alerts when :ref:`creating or editing a detector <create-detectors>`:

#. Go to :guilabel:`Alert settings`.

#. Select :guilabel:`Auto-Clear Alerts`.

#. Enter a duration (numerical value and time period in days, hours, or minutes). For example, 3d, 1h, or 4m.

#. Select :guilabel:`Done` to save your changes.

.. note:: You can use Auto-clear alerts to specify that alerts from heartbeat detectors persist longer than alerts from other detectors before being cleared. Alternatively, to clear a heartbeat alert within an activity period and before inactivity sets in, set explicit clear conditions such as the following, rendered in SignalFlow: ``detect(when(A is None, '10s') and not when(A is None, '40s'))``


Resolution logic
==================

A detector auto resolves if it can't evaluate the condition specified for the time interval of the ``auto_resolve_after`` parameter. The following cases can prevent a detector from successfully evaluating the condition:
 
* When a metric time series (MTS) lapses into inactivity, it stops reporting and triggers an auto-resolve countdown clock. If reporting resumes within your specified time interval, the countdown clock is freed to re-trigger in case reporting stops again. If reporting does not resume within the interval you've specified, then the involved MTS is considered no longer relevant, and the alert for it is auto-cleared.

* When there are too many null data points for the detector to successfully evaluate the condition for the specified time interval, the alert will auto-clear. This can happen because the MTS is aperiodic or sparse. It can also happen when there is a mismatch between the detector resolution and the MTS resolution. For example, you have the following condition for auto-clearing your alerts:
  
  .. code-block::
      
      detect(when(A > threshold(99), lasting='1h', at_least=0.8), lasting='30m', at_least=0.9), auto_resolve_after='1h')

  In this example, if the MTS does not send a data point for at least 80% of the detector time windows, active alerts will auto-clear because the condition can't be evaluated for the time interval provided in ``auto_resolve_after``.

* When the requirements to fire and clear alerts are both true or are both false, the alert will auto-clear.

Auto-clear alert settings do not affect detectors created before they are applied, but you can edit an existing detector to configure it for auto-clearing.

When an alert has been auto-cleared rather than resolved manually, it is listed as :guilabel:`Auto-Cleared` rather than :guilabel:`Cleared`.


