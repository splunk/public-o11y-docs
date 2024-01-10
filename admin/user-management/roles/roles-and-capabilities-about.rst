.. _roles-phase1:

***************************************************
About user roles in Splunk Observability Cloud
***************************************************

.. meta::
   :description: Learn how to how to manage user roles and capabilities (also called permissions).




.. toctree::
   :hidden:

   Matrix of roles and capabilities <roles-and-capabilities-table>
   Assign roles to users <users-assign-roles>


Splunk Observability Clouds lets you restrict access to certain features to specific groups of users. You assign roles to users. For details about each role and the associated capabilities, see :ref:`roles-table-phase1`. 


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
  * - user 
    - This role can access all components in Splunk Observability Cloud, access a subset of settings, and create, delete, and update charts, dashboards and detectors. This is the default role assigned to users.



Splunk Observability Cloud tokens also honor the role-based access control framework. Since tokens can now be assigned to roles, APIs inherit capabilities from their token. For example, an API using a token which is created with an admin role will inherent admin permissions. 


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



