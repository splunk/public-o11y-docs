1. Navigate to :guilabel:`Log Observer`. Upon opening, Log Observer runs an initial search of all indexes you have access to and returns the first 150,000 logs. The search then defaults to Pause in order to save Splunk Virtual Compute (SVC) resources. Control your SVC resources, which impact performance and cost, by leaving your search on Pause and selecting :guilabel:`150,000` rather than :guilabel:`Infinite` results.

   .. image:: /_images/logs/LogObserverEnhancements.png
            :width: 90%
            :alt: The Log Observer UI is displayed.

   Perform the remaining steps to determine filters and aggregations.

2. In the content control bar, enter a time range in the time picker.

3. Select :guilabel:`Index` next to :guilabel:`Saved Queries`, then select the indexes you want to query. If you want to search your Splunk platform (Splunk Cloud Platform or Splunk Enterprise) data, select the integration for the appropriate Splunk platform instance first, then select which index you want to query in Log Observer.

You can query indexes from only one Splunk platform instance or Splunk Observability Cloud instance at a time. You can query Splunk platform indexes only if you have the appropriate role and permissions. 

4. In the content control bar next to the index picker, select :guilabel:`Add Filter`.

5. Select the :guilabel:`Keyword` tab to search on a keyword or phrase. Select the :guilabel:`Fields` tab to search on a field. Then press Enter. To continue adding keywords or fields to the search, select :guilabel:`Add Filter` again.

6. Next, select :guilabel:`Unlimited` or :guilabel:`150,000` to determine the number of results you want to return on a single search. Select :guilabel:`150,000` to optimize your Splunk Virtual Compute (SVC) resources and control performance and cost.

7. To narrow your search, use the :guilabel:`Group by` drop-down list to select the field or fields by which you want to group your results, then select :guilabel:`Apply`. To learn more about aggregations, see :ref:`logs-aggregations`.

8. Select :guilabel:`Run search`.

9. Review the top values for your query on the the :guilabel:`Fields` panel on right. This list includes the count of each value in the log records. To include log records with a particular value, select the field name, then select ``=``. To exclude log records with a particular value from your results, select the field name, then select ``!=``. To see the full list of values and distribution for this field, select :guilabel:`Explore all values`.

10. Optionally, if you are viewing Splunk platform data, you can open your query results in the Splunk platform and use SPL to further query the resulting logs. You must have an account in Splunk platform. To open the log results in the Splunk platform, select the :guilabel:`Open in Splunk platform` icon at the top of the Logs table. 

   .. image:: /_images/logs/lo-openinsplunk.png
         :width: 90%
         :alt: The Open in Splunk platform icon is at the top, right-hand side of the Logs table.
    