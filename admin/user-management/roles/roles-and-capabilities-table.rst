.. _roles-table-phase1:

***************************************************
Splunk Observability Cloud roles
***************************************************

.. meta::
   :description: Matrix of Splunk Observability Cloud user roles and capabilities.



Splunk Observability Clouds lets you restrict access to certain features to specific groups of users using role-based access control. You assign roles to users. The following tables identify the permissions for the admin and user roles.  

.. .. _metrics-pipeline-rbac:

Metrics pipeline management
===============================================================================

.. include:: /_includes/admin/roles-mpm1.rst


Log Observer and Log Observer Connect
===============================================================================

.. include:: /_includes/admin/roles_log_observer1.rst


Alerts and detectors
===============================================================================

.. include:: /_includes/admin/roles_alerts_detectors1.rst


Infrastructure Monitoring navigators
===============================================================================

.. include:: /_includes/admin/roles_navs_dashbds1.rst   


Splunk Synthetic Monitoring 
==================================================

.. include:: /_includes/admin/synth-roles-caps1.rst


.. .. _rum-rbac:

Splunk Real User Monitoring 
==================================================
.. include:: /_includes/admin/rum-roles-caps1.rst

.. apm-rbac:

Splunk Application Performance Monitoring 
==================================================================
.. include:: /_includes/admin/roles_apm1.rst

Settings
===========================

General settings
----------------------------

.. note:: If :ref:`enhanced team security <enhanced-team-security>` is enabled, some of these permissions may change if a user is also designated as a Team Manager. Team Manager is not part of RBAC; it provides a user with additional permissions for managing a specific team. For details, see :ref:`about-team-roles`. 

.. include:: /_includes/admin/roles_navigation1.rst


Data configuration
----------------------------

.. include:: /_includes/admin/roles_data_configuration1.rst


Help and support
----------------------------

.. include:: /_includes/admin/roles_help_support1.rst