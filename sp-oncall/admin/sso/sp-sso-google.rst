.. _sso-google-spoc:

************************************************************************
Configure Single Sign-On for Splunk On-Call using Google Apps
************************************************************************

.. meta::
   :description: Enable Splunk On-Call SSO for your organization. 

To configure SSO for Splunk On-Call using Google Apps:

#. Access the Admin portal for Google Apps and navigate to :guilabel:`Apps` then :guilabel:`SAML Apps`.

   .. image:: /_images/spoc/sso-google1.png
       :width: 100%
       :alt: Splunk On-Call SSO Google Apps Setup 1 

#. Select :guilabel:`Set up my own custom app`.

   .. image:: /_images/spoc/sso-google2.png
       :width: 100%
       :alt: Splunk On-Call SSO Google Apps Setup 2

#. From step 2 of the guided setup, select :guilabel:`Option 2` to download IDP metadata in XML format. Attach and send the downloaded .xml file to :ref:`Splunk On-Call Support <spoc-support>`.

   .. image:: /_images/spoc/sso-google3.png
       :width: 100%
       :alt: Splunk On-Call SSO Google Apps Setup 3

  #. Save the Splunk On-Call logo file found `HERE <https://help.victorops.com/wp-content/uploads/2016/11/256x256-VictorOps-Oakleaf.png>`__.
#. Enter a name for the application (Splunk On-Call) and upload the logo file.

   .. image:: /_images/spoc/sso-google4.png
       :width: 100%
       :alt: Splunk On-Call SSO Google Apps Setup 5

#. In the :guilabel:`Service Provider Details` step, enter the following values:
   - In the :guilabel:`ACS URL` field: :samp:`https://sso.victorops.com:443/sp/ACS.saml2`
   - In the :guilabel:`Entity ID` field: :samp:`victorops.com`
   - In the :guilabel:`Start URL` field, enter the following with the correct Organization Slug at the end: :samp:`https://portal.victorops.com/auth/sso/<<org-slug-here>>.`

#. Skip the attribute mapping step and select :guilabel:`Finish`.