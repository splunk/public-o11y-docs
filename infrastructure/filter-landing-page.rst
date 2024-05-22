.. _filter-landing-page:

****************************************************************
Filter data on your landing page
****************************************************************

.. meta::
    :description: Filter the data displayed by navigators on your Splunk Infrastructure Monitoring landing page

To narrow the scope of the data you want to analyze, try filtering on data sources on the Splunk Infrastructure Monitoring landing page.
On the Infrastructure Monitoring landing page, each card represents a navigator corresponding to the services you monitor in Splunk Observability Cloud. A navigator card shows a count of instances in the population and highlights critical alerts linked to that population.

.. _build-filter:

Create a filter
----------------------

To create a filter, you search in the filter database using any of the following parameters:
* Filter name
* Property name
* Special characters

.. _apply-filter:

Apply a filter
----------------------

To filter data on the landing page, perform the following steps: 

#. Select :guilabel:`Add filters`
#. Find the filter you want in either of the following ways:
   - Scroll through the dropdown list of filters displayed in alphabetical order.
   - Use the text field displayed above :guilabel:`Add filters` to enter search parameters.
#. Select the name of the filter you want.
#. Hover over the filter name to see and select one or more of the recommended values for that filter.
#. Select :guilabel:`Apply filter`
#. (Optional) Repeat steps 2 through 5 for any other filters you want to apply.

Filters that you apply on the Infrastructure Monitoring landing page persist in the navigators accessed through data source cards on that page, so that you see only relevant instances.

Source cards on the landing page default briefly to a grayed-out loading state while your filter or filters are applied. If no data matches the parameters of a filter that you have applied, the system returns a “No Matching Result” message.

 .. note:: Applying any filter narrows the range of filters available to you in that session, because Splunk Infrastructure Monitoring uses your input to determine what subset of filters applies to the data you want. You can't, for example, mix AWS (Amazon Web Services) filters with GCP (Google Cloud Platform) filters.

Splunk Infrastructure Monitoring adds filters to the URL for the data source to which they apply. You can bookmark filtered views for later reference or to share with other people on your team.

If you remove a filter, any data source cards that had been hidden because they were filtered out reappear on your landing page. Data source cards can also display unexpectedly if an entity that was dormant because no data was found for it changes state to become active.

Remove a filter
----------------------

You remove a filter in either of the following ways:

- On the Splunk Infrastructure Monitoring landing page, select X on the filter label you want to close. 

- From within a navigator, select :guilabel:`All infrastructure`. This returns you to the Infrastructure landing page in its default state, without filters. 

 .. note:: To return to the Infrastructure landing page from within a navigator without losing filters you've already set up, use the back button on your web browser.




   

