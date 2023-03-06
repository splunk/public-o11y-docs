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

Role-based access control allows you to restrict users to the least-required permissions, helping you meet compliance, business, or architectural requirements. By assigning the least required permissions, you can help prevent users from accidentally making changes that they shouldn't be allowed to make. It also provides a specific role, subscription usage, for individuals who only require visibility into subscription usage for the org, without needing to access any additional functionality. Similarly, the read-only role provides access to users who need to monitor the system, without taking additional actions.

Additionally, Splunk Observability Cloud role-based access control aligns with roles available in Splunk Cloud, providing a consistent user and permission-based experience across Splunk Cloud and Splunk Observability CLoud.

By default, Splunk Observability Cloud comes with the following roles predefined:

* admin: This role has the most capabilities assigned to it. An admin user has full privileges across Splunk Observability Cloud.
* power user: This role can access all components in Splunk Observability Cloud, access a subset of settings, and create, delete, and update charts, dashboards and detectors.
* read-only: This role can access all pages that a power user can, but cannot create, edit, or delete objects, nor can they view the Settings pages.
* subscription usage: This role allows a user to view the subscription usage page only.
  


Mapping Splunk Observability Cloud and Splunk Cloud roles


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
    - n/a

