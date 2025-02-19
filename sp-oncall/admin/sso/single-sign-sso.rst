.. _single-sign-sso:

************************************************************************
Configure Single Sign-On for Splunk On-Call
************************************************************************

.. meta::
   :description: Enable Splunk On-Call SSO for your organization. 

.. toctree::
   :hidden: 

   Configure SSO for Okta<sp-sso-okta>
   Configure SSO for Google<sp-sso-google>
   Configure SSO for ADFS<sp-sso-adfs>
   Configure SSO for other IDPs<sp-sso-other>
   sp-sso-users

.. raw:: html

  <embed>
    <h2>Requirements<a name="requirements" class="headerlink" href="#requirements" title="Permalink to this headline">¶</a></h2>
  </embed>

This integration is compatible with the following versions of Splunk On-Call:

- Full-Stack

To enable single sign-on (SSO) for your organization, you will need to provide an updated metadata file and your IDP. If you are
interested in setting up SSO, please contact :ref:`Splunk On-Call Support <spoc-support>`.

Configure Single Sign On (SSO) between your Identity Provider (IDP) and  Splunk On-Call. Our standard SSO setup uses SAML 2.0 protocol. As long as your IDP can use SAML 2.0 protocol, it can integrate with Splunk On-Call. The exact steps differ depending on which IDP you use, but the process typically involves exporting a .XML metadata file and sending it to our Support team. Once you have sent the .xml file, a Splunk On-Call support specialist will
complete the setup on the back-end and respond with confirmation.

If your IDP does not have SAML capability, please contact Splunk On-Call Support to explore what alternative options may be available. For details on how to contact Splunk On-Call Support, see :ref:`spoc-support`.

.. raw:: html
   
  <embed>
    <h2>Configure SSO: Admin guides<a name="admin-setup" class="headerlink" href="#admin-setup" title="Permalink to this headline">¶</a></h2>
  </embed>

Instructions to complete the SSO configuration with Splunk On-Call and your IDP are provided for:

- :ref:`sso-okta-spoc`
- :ref:`sso-google-spoc`
- :ref:`sso-onelogin-spoc`
- :ref:`sso-azure-spoc`
- :ref:`sso-aws-spoc`

.. raw:: html
   
  <embed>
    <h2>Sign in to Splunk On-Call through SSO: User guide<a name="user-guide" class="headerlink" href="#user-guide" title="Permalink to this headline">¶</a></h2>
  </embed>

See :ref:`sp-sso-users`.