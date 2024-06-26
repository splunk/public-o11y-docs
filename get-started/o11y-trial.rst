.. _o11y-trial:

******************************************************
Free trial of Splunk Observability Cloud
******************************************************

.. meta::
    :description: About the free trial available for Splunk Observability Cloud.


The trial install will guide you through the steps to create your Splunk Observability Cloud trial environment. As part of the trial, Hipster shop - the Splunk Observability Cloud trial shop - will be deployed to a local minikube cluster as a set of Docker containers that will provide metrics and traces. To set up your minikube cluster and OpenTelemetry collector you'll also need Helm and gsed installed for the automation to configure the cluster.

You can try out Splunk Observability Cloud for 14 days, absolutely free. You can explore the trial in two ways:

* Use the sample data in a pre-instrumented environment (Hipster shop).
* Use your own data by instrumenting your applications with OpenTelemetry.

For an introduction to Splunk Observability Cloud products, see :ref:`welcome`.

For information about how to use these products together to address real-life scenarios, see :ref:`get-started-scenario`.

Sign up for the trial
============================

If this is your first experience with Splunk Observability Cloud, here's how you can sign up for your free trial.

#. Navigate to one of the following URLs:
    * For AWS regions, see :new-page:`https://www.splunk.com/en_us/download/o11y-cloud-free-trial.html`. 
    * For GCP regions, see :new-page:`https://www.splunk.com/en_us/download/observability-for-google-cloud-environments.html`
  
#. In the free trial sign-up window, select the location closest to the region you are in. Options include: United States, Europe, Asia Pacific (Australia), Asia Pacific (Japan). Select :guilabel:`Next`.
#. Enter your contact information. Note:
    - The name and email address is used to create the first user on the system and is granted the admin role automatically.
    - The company name is used to name the organization. Select a name which describes your account as well as its function. For example, ACME Dev platform.
#. Agree to the terms and conditions and select :guilabel:`Start Free Trial`.
#. You will receive an email with a link to sign in to your org. If this takes longer than ten minutes, check your spam folder.
    #. In the email, select :guilabel:`Verify` or paste the link into your browser. 
    #. Create your password and select :guilabel:`Sign in Now`.

What you'll see when you sign in
====================================


.. image:: /_images/get-started/trial-exp.png
   :width: 80%
   :alt: Free trial first sign-in view

When you first sign in, you see your Home page. You can show onboarding content by selecting the action menu (|more|) in the upper right-hand corner. This will display helpful videos and links on most pages to help you get started.

You can also expand the left-hand navigation menu to show the full names of the sections instead of the icons only, by selecting the double angle brackets in the bottom left-hand corner.

.. image:: /_images/get-started/trial1.png
   :width: 80%
   :alt: The right-angle brackets in the bottom, left corner of the UI expands the navigation menu.



Guided onboarding
=========================

There are five steps to the guided onboarding. The UI guides you through each of the steps, providing the commands and links you require.

#. Preparing the prerequisites.
#. Install OpenTelemetry.
#. Install the Hipster Shop into your local cluster.
#. Create traffic by exploring the Hipster Shop. Clicking around the Hipster Shop site will generate traces and metrics for you to view in Splunk Observability Cloud.
#. Explore the results in Application Performance Monitoring (APM).


Pre-Requisites
---------------------

The first step is to set up some pre-requistes for the demo enviornmnet. The trial UI will guide you through this and link to the resources you need. 

To run the demo environment, install and have functioning versions of:

- Docker: Install Docker if needed. See :new-page:`https://docs.docker.com/engine/install`
- minikube: Install and configure minikube. See :new-page:`https://minikube.sigs.k8s.io/docs/start`
- Helm: Install Helm version 3.0 or higher. See :new-page:`https://helm.sh/docs/intro/install/`
- GSED: GNU implementations of the stream editor. gnu-sed is used in the configuration script for the kubernetes manifests. - See :new-page:`https://formulae.brew.sh/formula/gnu-sed`.
- The Hipster Shop cluster requires a minimum 4 GB of memory. 

Install the OpenTelemetry collector
------------------------------------------------
To install the OpenTelemetry collector, you'll need to know:

- Your Splunk Observability Cloud realm. To locate your realm, see :new-page:`View your realm and org info <https://docs.splunk.com/Observability/admin/references/organizations.html>`.
- Your Splunk Observability Cloud access token. For details, see :ref:`admin-org-tokens`.

Install the Hipster Shop
-------------------------------------

The Hipster Shop allows you to generate sample data. To install the Hipster shop demo locally, you'll need your Real User Management (RUM) token. For instructions, see :ref:`rum-access-token`.

Once you have installed and configured the Hipster Shop environment, you can generate traffic and explore the results in your Splunk Observability Cloud trial organization.

