.. _sso-ping-one:

*********************************************************************
Configure a PingOne SSO integration
*********************************************************************

.. meta::
   :description: Splunk Observability Cloud provides the capability for your users to log in using various SSO providers. The PingOne SSO integration allows you to log into Splunk Observability Cloud using PingOne.

When you integrate PingOne with Splunk Observability Cloud, your users can log into Splunk Observability Cloud using PingOne.

Before you configure the OneLogin SSO integration, complete the steps in :new-page-ref:`sso-label`. The section :ref:`Name an SSO integration<naming-note-sso>` describes how to name your integrations.

.. note:: To integrate PingOne with Splunk Observability Cloud, you must be an administrator of your PingOne organization and your Splunk Observability Cloud organization.

Create a PingOne integration in Splunk Observability Cloud
===============================================================================

Start by creating the PingOne integration in Splunk Observability Cloud. Follow these steps:

#. Find the realm for your organization. To learn more, see :new-page-ref:`organizations`.
#. In the following URL, substitute the name of your realm for ``<REALM>``, then navigate to ``https://<REALM>.signalfx.com/#/integrations/pingone``

   #. Select :guilabel:`New Integration`.
   #. Copy the value of the system-supplied :guilabel:`Integration ID` so you can use it in a next step.
   #. If you want to display a name on the SSO login page, enter a value for :guilabel:`Name`. This name appears on the SSO login page for custom domains.
   #. If you want to display a name on the SSO login page, select :guilabel:`Show on login page`.

Create a SAML application for the PingOne integration in Splunk Observability Cloud
====================================================================================

Next, in PingOne connect a SAML application to the PingOne integration instance in Splunk Observability Cloud. Follow these
steps:

#. Navigate to your PingOne console page. For example, navigate to ``https://console.pingone.com/?env=envId``
#. Select :guilabel:`Connections` from the side menu.
#. Select :guilabel:`Applications` from the menu.
#. To add a SAML application for the login, select the :guilabel:`+` icon.
#. Enter an application name. For example, enter "Splunk Observability SAML".
#. In :guilabel:`Application Type`, select :guilabel:`SAML Application`.
#. Select :guilabel:`Configure`
#. In :guilabel:`SAML Configuration`, select :guilabel:`Manually Enter`.
#. In :guilabel:`ACS URLs`, enter an Assertion Consumer Service (ACS) URL that contains the following information:

   * The realm for your organization
   * From the previous step, the integration ID for the PingOne integration

   The URL format is ``https://api.<REALM>.signalfx.com/v1/saml/acs/<INTEGRATION_ID>``

   For example, enter ``https://api.example0.signalfx.com/v1/saml/acs/XXXXYYZZ``

#. For :guilabel:`Entity ID`, enter a URL to the ACS URL, but with a different ending path segment

   For example, enter ``https://api.example0.signalfx.com/v1/saml/metadata``.

#. Select :guilabel:`Save`
#. Select your newly created application, then select :guilabel:`Configuration` from the sidebar.
#. Select :guilabel:`Download Metadata`.
#. Select :guilabel:`Download Signing Certificate`, then select the Privacy Enhanced Mail (PEM) file with the name ``X509 PEM.crt``.

Enter the PingOne connection information in Splunk Observability Cloud
=============================================================================

In Splunk Observability Cloud, update the integration instance with the information from PingOne. Follow these steps:

#. In Splunk Observability Cloud, open the new PingOne integration instance you created in the previous section.
#. In :guilabel:`Certificate`, select :guilabel:`Upload File`, then select the PEM file with the name ``X509 PEM.crt``.
#. In :guilabel:`Metadata`, select the metadata file you downloaded in a previous step.
#. Select :guilabel:`Save`.

Create data mappings in PingOne
===============================================================================

To provide SAML SSO login for PingOne, Splunk Observability Cloud needs additional information from PingOne data fields. To
set up the data mapping from PingOne to Splunk Observability Cloud, follow these steps:

#. Switch to the PingOne admin console.
#. Select :guilabel:`Attribute Mappings`.
#. Insert the following information in the PingOne text fields:

   * User.FirstName = Given Name
   * User.LastName = Family Name
   * User.email = Email Address
   * PersonImmutableID = User ID

#. Select :guilabel:`Save`
#. To enable the new PingOne SAML application, toggle the switch at the top of the page.

To learn more about mapping Splunk Observability Cloud data fields to PingOne data fields, see the :ref:`saml-user-information` section in the :ref:`sso-generic` topic.

.. include:: /_includes/troubleshooting-components.rst
