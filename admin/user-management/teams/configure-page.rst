.. _admin-configure-page:

********************************************************************
Manage team landing pages in Splunk Observability Cloud
********************************************************************

.. meta::
   :description: Learn how to view and configure an associated landing page that contains information relevant to team members.

Every team has a landing page that contains information relevant to team members. A landing page brings together dashboard groups and alerts triggered by detectors that are linked to the team. The landing page has the following sections:

* A list of services managed by your team. 

* A count of active alerts from detectors linked to the team, grouped by severity.

* Links to one or more dashboard groups linked to the team.

Anyone can view the landing page for any team.

.. _view-team-landing-page:

View a team landing page
============================================================================

You can view team landing pages in different ways.

To see the landing page for any team, follow these steps:

#. Log in to Splunk Observability Cloud.

#. In the left navigation menu, select :guilabel:`Settings` then :guilabel:`Teams management`.

#. A table of current teams appears in the main panel.

#. Select a team name to view its landing page, or select :guilabel:`Go to team page` from the :guilabel:`Actions` menu.

#. (Optional) Select :guilabel:`Join team` to add yourself as a member of the team.

Alternatively, you can view the landing page for teams you are already part of on the Splunk Observability Cloud home page. The teams you are part of display as a tab on the home page. 

Set up team landing page content
============================================================================

To customize the content on your team’s landing page, follow these steps:

#. From a team's landing page, select the :guilabel:`Team details` button. From the side panel that appears, select :guilabel:`Edit page`.

#. Add and remove specific objects from the team's landing page page, such as services and detectors, from the :guilabel:`Team page setup`. 

#. Your changes will automatically populate on the team landing page.

.. _use-team-landing-page:

Use a team landing page
============================================================================

Use a team landing page as your starting point for monitoring important data.

To review services linked to the team, follow these steps: 

#. To view more details about each service, select the service name.

#. To view additional properties for each service, such as the endpoints or traces associated with each service, select the three-dot :guilabel:`Actions` menu and choose one of the options listed. The corresponding page in Splunk APM opens. To learn more about using the service view in APM, see :ref:`apm-service-view`.

#. To see the details of an alert for one of the services associated with your team, select the alert name in the :guilabel:`Alerts` column. 

#. Select :guilabel:`View APM page` to view additional services in your environment.

To review dashboards linked to the team, follow these steps: 

#. To view a specific dashboard, select the dashboard name. 
#. To view only the dashboards you created, select :guilabel:`Created by me`.
#. Select :guilabel:`View Dashboards page` to view additional dashboards in your environment. 

You can review alerts associated with a detector linked to the team in different ways:

#. To see all active alerts for a specific severity level, select the severity. You see active alerts for detectors linked to the team, filtered by the severity level you selected.

#. To see a list of active alerts for each detector linked to the team, select :guilabel:`All severities`. 

#. Select :guilabel:`View Detectors & SLOs page` to view additional detectors in your environment. 

To learn more about linking services and other objects to your team landing page, see:

* :ref:`admin-associate-team`
  
* :ref:`admin-associate-service`
    
.. _edit-landing-page-text:

Edit the landing page text
============================================================================

A team landing page provides a text area where you can provide team documentation and useful links. For example, you can use this area to describe the team's purpose and provide links to relevant wiki pages or runbooks.

The text area supports standard Markdown, including links that use the following format:

``[link](url)``.

To learn about which roles can edit landing page text, see :ref:`about-team-roles`.

To edit landing page text, follow these steps:

#. Select the :guilabel:`Edit` button next to the team name.

#. Enter your changes in the modal.

#. Select :guilabel:`Save`.
