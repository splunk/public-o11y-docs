.. _azure-prereqs:
.. _azure-integration-prereqs:

*******************************************************************
Azure authentication, permissions, and supported regions 
*******************************************************************

.. meta::
   :description: These are the metrics available for the Azure integration with Splunk Observability Cloud, grouped according to Azure resource.

Successful integration requires administrator privileges for the following:

- Your organization in Splunk Observability Cloud.
- Creating a new Microsoft Entra ID (formerly Azure Active Directory) application.

To learn more about these privileges, see the Azure documentation for registering a new app.

.. note:: Splunk Observability Cloud supports all Azure regular regions, and Azure Government.

.. _prep-azure-integration:

Prepare Azure for the integration
============================================

To prepare Microsoft Azure to connect with Splunk Observability Cloud: 

#. Create a Microsoft Entra ID (formerly Azure Active Directory) application.
#. Specify subscriptions and set subscription permissions.

.. note:: You need to prepare your Microsoft Account in the Azure console. The following sections summarize the steps you need to follow. For more details, refer to the official Azure documentation.

.. _prep-ms-app:

Create a Microsoft Entra ID (formerly Azure Active Directory) application
--------------------------------------------------------------------------------------

Follow these steps to create a new Microsoft Entra ID application:

  #. In your Azure portal, navigate to :menuselection:`Microsoft Entra ID`, and register your new app. Splunk Observability Cloud does not use this information, but you need to provide it in order to create an app on Azure.
  #. The Azure portal displays a summary about the application. Save the following information to use when you create your Azure integration in Splunk Observability Cloud:
      * :guilabel:`Directory (tenant) ID`
      * :guilabel:`Application (client) ID`
  #. Select :guilabel:`Certificates & secrets`. The Certificate is your public key, and the client secret is your password.
  #. Create a client secret by providing a description and setting the duration to the longest possible interval, and :guilabel:`Save`. Remember the client secret, you'll need it to create your Azure integration in Splunk Observability Cloud.

.. _prep-ms-subs:

Specify subscriptions and set subscription permissions
--------------------------------------------------------------------------------------

Set your subscription permissions:

  #. In the Azure portal, look for your :guilabel:`Subscriptions`.
  #. Find a subscription you want to monitor, and navigate to :menuselection:`Access control (IAM)`.
  #. Select :menuselection:`Add`, then select :menuselection:`Add role assignment`.
  #. On the :guilabel:`Add role assignment page`, perform the following steps:
      * From the :guilabel:`Role` drop-down list, select the :menuselection:`Monitoring Reader` role.
      * Leave the :guilabel:`Assign access to` drop-down list unchanged.
      * Go to :guilabel:`Select member`. In the :guilabel:`Select` text box, start entering the name of the Azure application you just created. The Azure portal automatically suggests names as you type. Enter the application name, and :guilabel:`Save`.

.. note:: Repeat these steps for each subscription you want to monitor.

Next, see :ref:`azure-connect`.