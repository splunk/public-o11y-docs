.. _rum-setup:

*******************************************************************************
Set up Splunk RUM for mobile and browser applications
*******************************************************************************

Follow these steps to instrument your mobile and browser applications and get data into Splunk Real User Monitoring (RUM).

.. _rum-access-token:

Generate your RUM access token in Observability Cloud
===========================================================

A RUM token is a public key used only during RUM ingestion. To create the RUM Token you need to be an administrator in Splunk Observability Cloud. For more information, see :ref:`admin-org-tokens`.

Follow these steps to create a RUM access token for your organization.

#. Log in to Splunk Observability Cloud.

#. Select  :strong:`Settings > Access Tokens`.

#. Select :strong:`New Token` and enter a name.

#. Select :strong:`RUM Token`.

#. Copy the RUM token to your clipboard.

#. Click :strong:`Ok`.

Get data in 
=================================

Follow these steps to instrument your application:  

* :ref:`browser-rum-gdi`
* :ref:`rum-mobile-ios`
* :ref:`rum-mobile-android`

.. note::
    RUM access tokens are publicly visible in the client-side code. 

Check that your data is coming in 
=================================

Follow these steps to check that your data is in your Splunk RUM for Mobile instance:

:strong:`Preparation`

To start sending data to Splunk RUM, you need to first have user activity on your application.

:strong:`Steps`

#. Log in to Splunk Observability Cloud. 

#. Select RUM. 

#. In the Source menu, select Mobile or Browser. 

#. Check that data appears in the RUM dashboard. 

Learn about the types of data RUM collects
===========================================

To learn about the types of data RUM collects about your application, see :ref:`rum-data-collected`. 
