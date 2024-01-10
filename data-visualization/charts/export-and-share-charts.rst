.. _export-and-share-charts:

***************************************************************
Export and share charts in Splunk Observability Cloud
***************************************************************

.. meta::
    :description: Share and export charts in Splunk Observability Cloud

Infrastructure Monitoring provides a number of ways to `share a chart <sharing-a-chart_>`_ with someone else. The technique to use depends on several factors, such as the version you want to share (last saved version or version you are viewing that has unsaved changes) and whether you want to share the original or a copy.

.. _exporting-chart-contents:

Export chart contents
==========================

For line charts, area charts, and column charts, you can export the chart contents to a CSV file. The most recent 100 data points will be exported, along with the values of the dimensions associated with them.

To export a chart, select :strong:`Export Chart as CSV` from the chart's :guilabel:`Actions` menu (|more|).

.. note:: List charts and table charts can't be exported because they don't have a data table.

.. _sharing-a-chart:

Share a chart
==================

The techniques available for sharing a chart depend on where you are viewing the chart (on a dashboard or in the Chart builder). The following sections describe the various ways to share a chart.

.. list-table::
   :header-rows: 1
   :widths: 25, 25, 25, 25, 25

   * - :strong:`Where you are viewing the chart`
     - :strong:`Technique`
     - :strong:`Version shared`
     - :strong:`Format`
     - :strong:`Notes`

   * - In the Chart Builder
     - Use the Share icon at top right or select :strong:`Share` from the chart's Actions menu (|more|)
     - Version you are viewing, including any unsaved changes
     - URL that links to a copy of the chart, which you can send to others (see :ref:`share-feature-to-share`) or :ref:`pasting-chart-url-into-slack`
     - In most cases, can be viewed only by other users

   * -
     - Copy the URL for the chart from your browser's address bar :strong:`(see important note below table)`
     - Most recently saved version
     - URL that links to the actual chart, which you can send to others or :ref:`pasting-chart-url-into-slack`
     - Can be viewed only by other users

   * -
     - Take a screenshot of the chart
     - Version you are viewing, including any unsaved changes
     - Provides a graphic representation of the chart
     - Can be viewed by anyone

   * - On a dashboard
     - Select :strong:`Share` from the chart's Action menu (|more|)
     - Most recently saved version
     - URL that links to a copy of the chart, which you can send to others (see :ref:`share-feature-to-share`) or :ref:`pasting-chart-url-into-slack`
     - In most cases, can be viewed only by other users

   * -
     - Right-click on the chart name and copy the link address :strong:`(see important note below table)`
     - Most recently saved version
     - URL that links to the actual chart, which you can send to others or :ref:`pasting-chart-url-into-slack`
     - Can be viewed only by other users

   * -
     - Select :strong:`Download chart as image` from the chart's Actions menu
     - Most recently saved version
     - Provides a graphic representation of the chart
     - Can be viewed by anyone

   * -
     - Take a screenshot of the chart
     - Most recently saved version
     - Provides a graphic representation of the chart
     - Can be viewed by anyone

.. caution:: 

   
   Provide a browser's URL for a chart with caution; any changes someone makes to the chart are visible to everyone viewing the chart, and can overwrite changes others have made to the chart.

.. _share-feature-to-share:

Use the Share feature to share a chart
----------------------------------------------

You can share a copy of a chart. Copies include unsaved changes at the time you share, and autoexpire unless the recipient saves them. Sharing a copy is perfect for when you make a change that you want to show your team members, but don't want to modify the original chart.

- To share a chart you are viewing in the Chart Builder, select the :strong:`Share` icon near the upper right corner of the chart or select :strong:`Share` from the chart's Actions menu (|more|).

- To share a chart you are viewing in a dashboard, select :strong:`Share` from the chart's Actions menu (|more|).

You'll see options for sharing, discussed below.

.. _share-copy-directly-from-infra-monitoring:

Share a copy directly from Infrastructure Monitoring
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can send a copy of the chart to an email address or to any available third-party services (See :ref:`admin-notifs-index`.).

After adding recipients, select :strong:`Share`. Recipients receive a link to the copy. When they open it, they can edit and save their copy without affecting the original.

.. caution:: 

   
   Administrators can add email addresses of people who aren't members of your organization. Recipients are to create a user account before they can view the shared content. Be sure the email addresses you enter for nonmembers are correct, especially if the item you are sharing contains any sensitive or proprietary information.

.. _share-copy-using-a-link:

Share a copy by using a link
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You might want to send out a personal email or post a link to the copy on an internal website. To do this, select :strong:`Copy`. Only members of your organization with a login will be able to see the chart you share.

.. _pasting-chart-url-into-slack:

Paste a chart URL into Slack
---------------------------------

You can give someone access to a chart by pasting the chart's URL into a Slack channel; Slack displays a preview image of the chart along with the URL. You can paste a URL that was generated by using the Share feature or by copying the chart's URL, as described in :ref:`sharing-a-chart`.

Note the following regarding this feature.

- The preview image will appear in public channels, and in private channels or direct messages that are visible to the user who authorized the Slack integration (See: :ref:`slack`).

- The preview image has a standard size and is always displayed using the light theme.

- The time zone is always represented as GMT (marked on the chart as UTC).

.. note:: Troubleshooting

   If you don't see the preview image in Slack, possible reasons are:

   - An administrator in your organization needs to upgrade the Slack integration (See: :ref:`slack`).

   - The channel you are pasting into isn't visible to the user who authorized the Slack integration in Infrastructure Monitoring.

   - Your Slack settings block link previews or block links sharing.
