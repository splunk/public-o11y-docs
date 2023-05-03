.. _dashboards-import-export:

*****************************************************************
Import and export dashboards
*****************************************************************

.. meta::
      :description: Learn how to import and export dashboards as JSON files to collaborate with your team.  

You can import or export dashboards from the UI. You can export the dashboard as a JSON file for other users to import to their dashboard or dashboard group. Exporting a dashboard is also a way to maintain a backup of the dashboard. Splunk does not support editing the exported JSON file, which could negatively impact import.

.. _import-dashboard:

Import a dashboard
=================================================================

To import a dashboard or dashboard group, follow these steps:

1. Select :guilabel:`Dashboard` from the Splunk Observability Cloud home page.

2. Click the :guilabel:`Create (+)` menu.

3. If you are in a dashboard group, select :guilabel:`Import > Dashboard`. If you are not in a dashboard group, first select :guilabel:`Import > Dashboard Group` then select a dashboard. You must be in a dashboard group to import a dashboard.

4. Select the dashboard you want to import. The dashboard file must be on your local workstation, and it must be in JSON format.

.. _export-dashboard:

Export a dashboard
=================================================================


To export a dashboard, follow these steps:

#. Select :guilabel:`Dashboard` from the Splunk Observability Cloud home page.
#. Navigate to the dashboard you want to export.
#. Click the :guilabel:`Dashboard actions` (|more|) menu.

   .. image:: /_images/images-dashboard/dashboard-page-dashboard-actions-menu.png
      :width: 99%
      :alt: This image shows the Dashboard actions menu in dashboard view.

#. Select :guilabel:`Export`.
#. Click :guilabel:`Download`.

.. _export-dashboard-group:

Export a dashboard group
=================================================================

To export a dashboard group, follow these steps:

1. Select :guilabel:`Dashboard` from the Splunk Observability Cloud home page and navigate to the dashboard you want to export.

2. Click the :guilabel:`Dashboard Group actions` (|more|) menu.

3. Select :guilabel:`Export`.

4. Click :guilabel:`Download`.

.. failed-import:

Failed import
=================================================================

If your import fails, check the following:

- If you tried the :guilabel:`Legacy Import` option, and you exported on or after December 8, 2020, try the :guilabel:`Import` option. The :guilabel:`Legacy Import` option was deprecated as of June 8, 2021.

- If your file name's format is ``dashboard_<dashboard name>.json``, make sure you are using the :guilabel:`Import > Dashboard` option. If your file's name format is ``<group_name>.json``, make sure you are using the :guilabel:`Import > Dashboard Group` option.