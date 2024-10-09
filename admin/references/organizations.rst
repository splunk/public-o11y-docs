.. _organizations:

*********************************************************************************
View your realm, API endpoints, and organization
*********************************************************************************

.. meta::
   :description: View and copy your Splunk Observability Cloud realm, API endpoints, organizations, and organization IDs on your user profile page.

To view your realm, organization, or admin status in an organization, follow these steps:

1. In the Splunk Observability Cloud main menu, select :strong:`Settings`.

2. Select your user name at the top of the :strong:`Settings` menu.

3. On the :strong:`Organizations` tab, you can view or copy your realm, API endpoints, organizations, organization IDs, and API access token for your current organization. You can also see if you are an administrator of an organization and switch to another organization if you are a member. To view or copy your API access token, select :strong:`Show API Access Token`.

Update your realm in your configuration settings and files
====================================================================================

A realm is a self-contained deployment that hosts your organization. 

Wherever you see ``<REALM>``, replace it with the name of your organization's realm. For example, if your realm is ``eu0``, change the endpoint ``https://api.<REALM>.signalfx.com`` to ``https://api.eu0.signalfx.com``.

.. caution:: If you don't include your realm and use ``https://api.signalfx.com``, Splunk Observability Cloud interprets the endpoint as pointing to the ``us0`` realm.