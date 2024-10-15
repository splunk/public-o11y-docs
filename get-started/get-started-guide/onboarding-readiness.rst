.. _get-started-guide-onboarding-readiness:

Get started guide phase 1: Onboarding readiness 
*********************************************************

In the onboarding readiness phase of the getting started journey for Splunk Observability Cloud you set up users, teams, and access controls using roles and token management. The following sections cover the primary setup steps for onboarding readiness phase. 

To get a high-level overview of the entire getting started journey, see :ref:`get-started-guide`.

.. note:: This guide is for Splunk Observability Cloud users with the admin role. 


.. image:: /_images/get-started/onboarding-guide-2point0-readiness.svg
   :width: 100%
   :alt: 

To configure your users, teams, and tokens complete the following tasks:

#. :ref:`phase1-create-trial`
#. :ref:`phase1-network`
#. :ref:`phase1-user-access`
#. :ref:`phase1-teams-tokens`

.. note::
    Work closely with your Splunk Sales Engineer or Splunk Customer Success Manager as you get started. They can help you fine tune your Splunk Observability Cloud journey and provide best practices, training, and workshop advice.

.. _phase1-create-trial:

Create a trial for your organization 
========================================

If you have a Splunk technical contact, they can create a Splunk Observability Cloud trial for your organization and provide you with the link to log in to your trial organization. Alternatively, you can sign up for a trial. See :ref:`o11y-trial`.

.. _phase1-network:

Analyze your network communication and access requirements
============================================================

Before you begin bringing data into Splunk Observability Cloud from your infrastructure and applications, analyze your required network communications and access requirements.

#. Validate that network connections between your environment and Splunk Observability Cloud are allowed. See :ref:`otel-exposed-endpoints` to determine which ports you need to open in the firewall and what protocols you need to turn on or off in the Collector.
#. If your organization requires a proxy, see :ref:`allow-services`. 
#. For Kubernetes, you need administrator access to monitored hosts of Kubernetes clusters to install the Splunk Distribution of the OpenTelemetry Collector. 
#. Whether you use a guided setup for data management or an advanced install, you use the Splunk Distribution of the OpenTelemetry Collector to ingest, process, and export metric, trace, logs, and metadata into Splunk Observability Cloud. You can run the Splunk Distribution of the OpenTelemetry Collector as a custom user not a root or admin user. For the majority of use cases, the collector doesn't require privileged access to function. 
    #. Collector components might require privileged access. Use care when allowing privilege access for components. For example, a receiver might require the collector to run in a privileged mode, which could be a security concern. Receivers and exporters might expose buffer, queue, payload, and worker settings in configuration parameters. Setting these parameters might expose the collector to additional attack vectors including resource exhaustion. 
    #. Collector components might also require external permissions including network access or role-based access. 
   
   See :ref:`otel-security` for more details.

.. _phase1-user-access:

Decide how to manage user access
========================================

Select from these 3 options for managing user access:

#. Use Splunk Cloud Platform as the unified identity provider. See :ref:`unified-id-unified-identity` for more information.
#. Use an external Lightweight Directory Access Protocol (LDAP) and control access through Single Sign-On (SSO). See :ref:`sso-label` for more information.
#. Use Splunk Observability Cloud user management to allow access using a username and password. See :ref:`user-management-intro`.

.. _phase1-teams-tokens:

Plan your teams structure and token management strategy to control access
=====================================================================================

If you plan to roll out Splunk Observability Cloud across your organization you likely have multiple internal customers with different access requirements for the various features in Splunk Observability Cloud. Complete the following steps to create a consistent team structure and corresponding token management strategy.

#. :ref:`team-token-names`
#. :ref:`team-structure`
#. :ref:`token-mgmt`

.. _team-token-names:

Define team and token naming conventions
------------------------------------------

Before creating teams and tokens, determine your naming convention. A naming convention helps you to track token assignments and control data ingest limits. Aligning team and token names also helps you to identify token owners when viewing the usage reports. For example, you can align team and token names in the following way:

* Team name: FRONTEND_DEV_TEAM 
* Token names: FRONTEND_DEV_TEAM_INGEST, FRONTEND_DEV_TEAM_API, FRONTEND_DEV_TEAM_RUM

.. _team-structure:

Plan your team structure
---------------------------

A user with an admin role can manage teams, which includes adding and removing regular users and assigning a team admin. 

By default, users can join or leave teams at will. For larger organizations, you might want enhanced team security. Use enhanced team security to assign usage rights to each team and their associated tokens. See :ref:`enhanced-team-security`. 

You can also assign team-specific notifications for alerts triggered by the detectors that you set up. Team-specific notifications give your teams different escalation methods for their alerts. See :ref:`admin-team-notifications`.

.. _token-mgmt:

Manage your tokens
--------------------

Use tokens to secure data ingest and API calls in Splunk Observability Cloud. Tokens are valid for 1 year and you can extend them for another 60 days. Your organization has a default token that is automatically generated when the organization is created.

To learn more about token management, see the following topics:

* See :ref:`admin-tokens`.
* See :ref:`admin-manage-usage`.

Next step
===============

Next, prepare for an initial rollout of the Splunk Observability Cloud solutions that are relevant to your organization. See :ref:`get-started-guide-initial-rollout`.
