.. _auto-clearing-alerts:

**********************
Auto-clearing alerts
**********************

.. meta::
  :description: The Auto-clear feature automatically resolves active alerts after a certain amount of time when a metric time series stops reporting as expected, so that you don't have to clear alerts manually.

The Auto-clear feature automatically resolves active alerts after a designated amount of time when a metric time series stops reporting as expected, so that you don't have to clear alerts manually. Auto-clear is available for all condition types, including Sudden Change, Resource Running Out, and Historical Anomaly.

To enable Auto-clear alerts when :ref:`creating or editing a detector <create-detectors>`:

#. Go to :guilabel:`Alert settings`.

#. Select :guilabel:`Auto-Clear Alerts`.

#. Enter a duration (numerical value and time period in days, hours, or minutes). For example, 3d, 1h, or 4m.

#. Click :guilabel:`Done` to save your changes.

.. note:: You can use Auto-clear alerts to specify that alerts from heartbeat detectors persist longer than alerts from other detectors before being cleared. Alternatively, to clear a heartbeat alert within an activity period and before inactivity sets in, set explicit clear conditions such as the following, rendered in SignalFlow: ``detect(when(A is None, '10s') and not when(A is None, '40s'))``


Resolution logic
==================

When a metric time series (MTS) lapses into inactivity, it stops reporting, and triggers an auto-resolve countdown clock that stops if reporting resumes within your specified period. Reporting that resumes frees the countdown clock to re-trigger if reporting stops again.

If reporting does not resume within the interval you've specified, then the involved MTS is considered no longer relevant, and the alert for it is auto-cleared according to the parameters of the ``auto_resolve_after`` mechanism.

Auto-clear alert settings do not affect detectors created before they are applied, but you can edit an existing detector to configure it for auto-clearing.

When an alert has been auto-cleared rather than resolved manually, it is listed as :guilabel:`Auto-Cleared` rather than :guilabel:`Cleared`.
