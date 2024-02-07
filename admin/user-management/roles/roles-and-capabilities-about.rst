.. _roles-and-capabilities:


***************************************************
About roles in Splunk Observability Cloud
***************************************************

.. meta::
   :description: Learn how to how to manage user roles and capabilities (also called permissions).


.. toctree::
   :hidden:

   Matrix of roles and capabilities <roles-and-capabilities-table>
   Assign roles to users <users-assign-roles>

|hr|

:strong:`Available in Enterprise Edition`

|hr|


Splunk Observability Clouds lets you restrict access to certain features to specific groups of users using role-based access control (RBAC). You assign roles to users. A role contains a set of capabilities. These capabilities define what actions are available to roles. For example, capabilities determine whether someone with a particular role has capabilities to create detectors or dashboards. For details about each role and the associated capabilities, see :ref:`roles-and-capabilities-table`. 

The new roles provide more restricted access. This supports scenarios where additional teams such as external vendors or teams that might belong to other business units, only need read-only access. Role-based access control lets you restrict users to the least-required capabilities, helping you meet compliance, business, or architectural requirements. By assigning the least required capabilties, you can help prevent users from making unwanted changes. 

Additionally, Splunk Observability Cloud role-based access control aligns with roles available in Splunk Cloud Platform, providing a consistent user and capability-based experience across Splunk Cloud Platform and Splunk Observability CLoud.



.. raw:: html

  <embed>
    <h2>Pre-defined roles</h2>
  </embed>

Splunk Observability Cloud comes with the following roles predefined:

.. list-table::
  :header-rows: 1
  :widths: 30, 70

  * - :strong:`Role`
    - :strong:`Description`
  * - admin
    - This role has the most capabilities assigned to it. An admin user has full privileges across Splunk Observability Cloud.
  * - power 
    - This role can access all components in Splunk Observability Cloud, access a subset of settings, and create, delete, and update charts, dashboards and detectors. This is the default role assigned to users.
  * - usage
    - This role allows a user to view the subscription usage page without being an admin. This role also has read_only privileges.
  * - read_only
    - This role can access all pages and objects that a power user can, but cannot create, edit, or delete objects. They have limited access to the Settings pages.



Splunk Observability Cloud tokens also honor the role-based access control framework. Since tokens can now be assigned to roles, APIs inherit capabilities from their token. For example, an API using a token which is created with read-only role will inherit read-only permissions. This can be used take system backups with a reduced risk of introducing changes.


.. raw:: html

  <embed>
    <h2>Tokens and API</h2>
  </embed>

- Session token APIs inherit the user's role capabilities.
- Org tokens with API authorization scope can be assigned to predefined roles from the user interface.
- RUM or INGEST tokens can't be assigned a role.

APIs honor capabilities based on the role defined to their token. This is important to have strict role-based security control both from the front end and the backend.

* APIs using Session Token - Session Tokens inherit individual user's role capabilities.
* APIs using Org Tokens - Similar to users and teams, even org tokens can be assigned a predefined role and inherit those capabilities. For example, if you are taking system backups on a regular basis, you can use read-only org token APIs to take those backups without worrying about accidental changes with APIs that have full capabilities. 



.. Multiple roles for a user or team
.. =========================================


.. raw:: html

  <embed>
    <h2>Multiple roles for a user or team</h2>
  </embed>

You can assign multiple roles to individual users. The user receives a combination of capabilities inherited from all of their roles. Additionally, if you revoke a role from a user the change takes effect immediately. 


.. list-table::
  :header-rows: 1
  :widths: 30, 70

  * - :strong:`Role`
    - :strong:`Capabilities`
  * - read-only
    - Read-only access to most actions and pages including settings for most products except: the Subscription usage pages, and some admin pages.
  * - subscription usage 
    - Access to Subscription usage page only, plus the read-only capabilities.
  * - power
    - Includes capabilities to access all components in Splunk Observability Cloud. Can access a subset of settings, and create, delete, and update charts, dashboards and detectors.
  * - admin
    - An admin user has full privileges across Splunk Observability Cloud.
  * - subscription usage and power user
    - All the capabilities of a power user, plus the ability to view the Subscription usage pages for the org.
  * - read_only and subscription usage
    - All the capabilities of a read-only user, plus the ability to view the Subscription usage pages for the org.

