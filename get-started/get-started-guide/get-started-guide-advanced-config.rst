.. _get-started-advanced-config:

Get started guide: Optional and advanced configurations
*********************************************************

Use these optional and advanced configurations to customize your setup as they apply to your organization. The configurations are organized by the get-started journey phases. 

.. _phase1-advanced-config:

Optional and advanced configurations phase 1: Onboarding readiness 
======================================================================

Use these optional and advanced configurations to customize your setup as they apply to your organization. The configurations are organized by the get-started journey phases. 

.. _advanced-config-custom-URL:

Request a custom URL for your organization
--------------------------------------------------------------

Create a Splunk support request to request a custom URL for your organization, for example, acme.signalfx.com. See :ref:`support` for support contact options.

.. _advanced-config-parent-child:

Separate your teams with a parent-child setup
--------------------------------------------------------------

If you want to create separate environments, you can use parent-child organizations. Perhaps you want a development environment and a production environment, or you want to make sure Team A is fully separated from Team B. Parent-child organizations are 2 or more separate organizations, where your original organization is the parent organization which includes your original usage entitlement. You can then have 1 or more organizations as child organizations within the parent organization. The organizations are fully separated, including users and data. 

You can request a parent-child organization setup by creating a support case. See :ref:`support` for support contact options.

.. _advanced-config-logs:

Set up Log Observer Connect for the Splunk Platform
--------------------------------------------------------------

If your organization has an entitlement for Splunk Log Observer Connect, Splunk Observability Cloud can automatically relate logs to infrastructure and trace data. 

See :ref:`logs-set-up-logconnect` or :ref:`logs-scp`. 

.. _advanced-config-3rd-party:

Collect data from third-party metrics providers
--------------------------------------------------------------

When using the Splunk Distribution of OpenTelemetry Collector, you can use receivers to collect metrics data from third-party providers. For example, you can use the Prometheus receiver to scrape metrics data from any application that exposes a Prometheus endpoint. See :ref:`prometheus-receiver`.

See :ref:`monitor-data-sources` to see a list of receivers.

.. _phase2-advanced-config:

Optional and advanced configurations phase 2: Initial rollout
======================================================================

.. _phase3-advanced-config:

Optional and advanced configurations phase 3: Scaled rollout
======================================================================
