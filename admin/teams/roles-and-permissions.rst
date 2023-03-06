.. _roles-and-permissions:

***************************************************
About roles and permissions
***************************************************

.. meta::
   :description: Learn how to how to manage user roles and permissions



|hr|

:strong:`Available in Enterprise Edition`

|hr|

Splunk Observability Clouds allows you to restrict access to certain features and data to specific groups of users. This is enforced using role-based access control. Users are assigned to roles. A role contains a set of capabilities. These capabilities specify what actions are available to roles. For example, capabilities determine whether someone with a particular role is allowed to create detectors or dashboards. The various capabilities are listed in "XXXXXXXXXXXXX". 

The new roles provide more restricted access which are needed to allow additional teams such as external vendors, teams that may belong to other business units or the business owners who only need read-only access. Role-based access control allows you to restrict users to the least-required permissions, helping you meet compliance, business, or architectural requirements. By assigning the least required permissions, you can help prevent users from accidentally making changes that they shouldn't be allowed to make. 

Additionally, Splunk Observability Cloud role-based access control aligns with roles available in Splunk Cloud, providing a consistent user and permission-based experience across Splunk Cloud and Splunk Observability CLoud.

By default, Splunk Observability Cloud comes with the following roles predefined:

* admin: This role has the most capabilities assigned to it. An admin user has full privileges across Splunk Observability Cloud.
* power user: This role can access all components in Splunk Observability Cloud, access a subset of settings, and create, delete, and update charts, dashboards and detectors. This is the default role assigned to users.
* read-only: This role can access all pages that a power user can, but cannot create, edit, or delete objects, nor can they view the Settings pages.
* subscription usage: This role allows a user to view the subscription usage page only.
  



The Splunk Observability Cloud APIs also honor the role-based access control framework as well. APIs will inherit permissions of the read-only role, since tokens can be assigned to roles. This can be used take system backups with a reduced risk of introducing changes.


Mapping Splunk Observability Cloud and Splunk Cloud roles
===============================================================

Splunk Observability Cloud role-based access control aligns with roles available in Splunk Cloud. This role mapping is pre-configured to allow a seamless transition of Splunk Cloud users into Splunk Observability Cloud.


.. list-table::
  :header-rows: 1
  :widths: 50, 50

  * - :strong:`Splunk Observability Cloud`
    - :strong:`Splunk Cloud`
  * - admin
    - admin
  * - power user 
    - power roles and can_delete role
  * - read-only
    - user role
  * - subscription usage
    - n/a Role is not available in Splunk Cloud

For example, when a Splunk Cloud user with a power role logs in to Splunk Cloud Observability for the first time, that user is automatically created and assigned the power user role within Splunk Cloud Observability, based on the pre-defined mapping. Assigning users and teams to roles is also available via an API call to reduce the administrative burden.



User roles and API permissions
===================================

APIs will honor permissions based on the role defined. This is important to have strict role-based security control both from the front end and the backend.
* APIs using Session Token - Session Tokens will inherit individual user's role permissions.
* APIs using Org Tokens - Similar to users and teams, even org tokens can be assigned a predefined role and will inherit those permissions. For example, if you are taking system backups on a regular basis, you can leverage read-only org token APIs to take those backups without worrying about accidental changes with APIs that have full permissions. 


Assign multiple roles to users or teams
===========================================

Individual users or teams can have multiple roles. In this scenario, they receive a combination of permissions inherited from all of their roles.

.. list-table::
  :header-rows: 1
  :widths: 50, 50

  * - :strong:`Role`
    - :strong:`Capabilities`
  * - read-only
    - Read-only access to most actions and pages including settings for most products except: the Subscription usage pages, and some admin pages.
  * - subscription usage 
    - Access to Subscription usage page only, plus the read-only capabilities.
  * - power
    - All the capabilities of the existing user role.
  * - admin
    - An admin user has full privileges across Splunk Observability Cloud.
  * - subscription usage and power user
    - All the capabilities of a power user, plus the ability to view the Subscription useage pages for the org.
  * - read-only and subscription usage
    - All the capabilities of a read-only user, plus the ability to view the Subscription useage pages for the org.
