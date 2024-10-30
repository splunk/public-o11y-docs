.. _gcp-prerequisites:
.. _gcp-prereqs:

********************************************************
GCP authentication, permissions, and supported regions 
********************************************************

.. meta::
   :description: Connect your Google Cloud Platform / GCP account to Splunk Observability Cloud.

The following pre-requisites apply:

* You must be an administrator of your Splunk Observability Cloud organization to create a GCP connection.
* Splunk Observability Cloud supports all GCP regions. 

Account permissions
============================================

Starting in March 2024, GCP disables service account key creation by setting ``iam.disableServiceAccountKeyCreation`` to ``false`` by default. When this constraint is set, you cannot create user-managed credentials for service accounts in projects affected by the constraint. Check the restrictions on your organization's account keys before connecting to Splunk Observability Cloud.

For more information, refer to Google's official announcement :new-page:`Introducing stronger default Org Policies for our customers <https://cloud.google.com/blog/products/identity-security/introducing-stronger-default-org-policies-for-our-customers/>`.

