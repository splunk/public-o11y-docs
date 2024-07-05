.. _sso-okta-spoc:

************************************************************************
Configure Single Sign-On for Okta and Splunk On-Call
************************************************************************

.. meta::
   :description: Enable Splunk On-Call SSO for your organization. 




Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Full-Stack

To enable single sign-on (SSO) for your organization, you will need to provide an updated metadata file and your IDP. If you are
interested in setting up SSO, please contact :ref:`Splunk On-Call Support <spoc-support>`.


Administrator Setup
==========================

Instructions to complete the SSO configuration with Splunk On-Call and your IDP are provided for:

- :ref:`sso-okta-spoc-setup`
- :ref:`sso-google-spoc`
- 

.. _sso-okta-spoc-setup:

Okta
==========

#. From the Okta user homepage, select :guilabel:`Admin` to access the Okta Admin dashboard.


.. image:: /_images/spoc/sso-okta1.png
    :width: 100%
    :alt: Splunk On-Call Okta SSO setup step 1


#. From the Okta Admin Dashboard, Select :guilabel:`Applications`, then select :guilabel:`Applications` from
the drop-down.

.. image:: /_images/spoc/sso-okta2.png
    :width: 100%
    :alt: Splunk On-Call Okta SSO setup step 2



#. Within Applications, select :guilabel:`Add Application`.

.. image:: /_images/spoc/sso-okta3.png
    :width: 100%
    :alt: Splunk On-Call Okta SSO setup step 3

#. Begin entering Splunk On-Call in the search bar. When Splunk On-Call appears, select :guilabel:`Add`.

.. image:: /_images/spoc/sso-okta4.png
    :width: 100%
    :alt: Splunk On-Call Okta SSO setup step 4

#. The Application label, or name, should auto-populate with the name Splunk On-Call, but you can re-name this label. The Browser plugin auto-submit should be auto-populated as well. Verify that this setting is selected and select :guilabel:`Next`.

.. image:: /_images/spoc/sso-okta5.png
    :width: 100%
    :alt: Splunk On-Call Okta SSO setup step 5

#. On the :guilabel:`Sign-On Options` tab, in the :guilabel:`Default Relay State` field enter the following URL:

   -  Default Relay State: https://portal.victorops.com/auth/sso/<your-org-slug>

.. image:: /_images/spoc/sso-okta6.png
    :width: 100%
    :alt: Splunk On-Call Okta SSO setup step 6. Org slug example.

#. Once the URL has been added, select :guilabel:`Identity Provider metadata` to download the metadata file. Splunk On-Call requires this file to complete the SSO configuration. Email this file to Splunk On-Call Support.
#. After downloading the file, select :guilabel:`Next`.

#. Select the users that should have access to add the Splunk On-Call app to their Okta homepage and log in to Splunk On-Call through SSO. Once all of the users have been listed, select :guilabel:`Next`.

.. image:: /_images/spoc/sso-okta7.png
    :width: 100%
    :alt: Add users who should have access to the Splunk On-Call app.

#. Select :guilabel:`Done`.


Once the users have added the app they will be directed to a one-time linking process to connect their Splunk On-Call credentials to Okta. To conduct the one-time linking process outside of the Okta Homepage, see :ref:`sso-linking`.


