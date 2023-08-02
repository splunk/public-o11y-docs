.. _parent-child-orgs:

*********************************************************************
View subscription usage for parent and child organizations
*********************************************************************

.. meta::
   :description: Monitor subscription usage for child orgs individually or view usage at the parent org level. 
   

Splunk Observability Cloud supports a parent and child org configuration. This configuration is useful in the following scenarios:

* Individual billing:
   * Your business bills or tracks departments individually. Each org is independent and admins can view individual org usage in addition to aggregated billing that rolls up to the parent level.
* Data isolation:
   * Keep production orgs separate from non-production orgs.
   * Split orgs by independent business units.
  

A few things to note for in-product subscription usage reports:

* Parent and child orgs must be in the same region. Cross-region orgs are not supported.
* Subscription usage reports are currently only accessible by admins
* These reports are available both at the child level and at the parent level:
   - Child level subscription usage reports: Accessible by admins in child org and only includes usage of that child org.
   - Parent level subscription usage reports: Accessible by admins in parent org and includes both the parent org usage as well as aggregated usage that includes usage of each child org in the same report.


View Splunk Observability Cloud subscription usage data to monitor your organization's usage against its subscription plan and entitlements. You must be an administrator to view the Subscription Usage page for your organization. Go to :guilabel:`Settings`, then :guilabel:` Subscription Usage`. 

View subscription usage for all orgs
=============================================

You must be an admin in the parent org to view usage data for the child orgs. 

To view the available usage reports:

1. Log in to the parent org in Splunk Observability Cloud.

2. In the navigation menu, select :guilabel:`Settings`, then :guilabel:`Subscription Usage`.
   
3. In the filter, select each child org along with the parent organization. This creates a report showing subscription usage for each org individually.
   
   .. image:: /_images/admin/subscription-parent-child1.png
      :width: 40%
      :alt: The drop down filter lists the parent and child organizations.

   
4. Select the parent org to view the aggregated billing and access the Billing and Usage section. The parent org reports displays in the Monthly usage column and the aggregated data for the parent and each child org displays in the Monthly Usage (Multiple Organizations) column.
   
   .. image:: /_images/admin/subscription-parent-child2.png
      :width: 70%
      :alt: The usage report shows the parent org data separate from the child org usage data.

For more details about Service Bureau or parent-child orgs, contact your Account team or Splunk Support.
