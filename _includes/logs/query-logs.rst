1. Navigate to :guilabel:`Log Observer`. In the content control bar, enter a time range in the time picker if you know it.

.. image:: /_images/logs/LogObserverEnhancements.png
         :width: 100%
         :alt: The Open in Splunk platform icon is at the top, right-hand side of the Logs table.

2. Select :guilabel:`Index` next to :guilabel:`Saved Queries`, then select the indexes you want to query. If you want to search your Splunk platform (Splunk Cloud Platform or Splunk Enterprise) data, select the integration for the appropriate Splunk platform instance first, then select which index you want to query in Log Observer. 

.. note:: You can only query indexes from one Splunk platform instance or Splunk Observability Cloud instance at a time. You can query Splunk platform indexes only if you have the appropriate role and permissions in the Splunk platform instance. 

3. In the content control bar next to the index picker, select :guilabel:`Add Filter`.

4. To search on a keyword, select the :guilabel:`Keyword` tab, type the keyword or phrase you want to search on, then press Enter. If you want to search on a field, select the :guilabel:`Fields` tab, enter the field name, then press Enter. To continue adding keywords or fields to the search, select :guilabel:`Add Filter`.

5. Next, select :guilabel:`Unlimited` or :guilabel:`150,000` results to determine the number of results you want to return on a single search.

6. Select :guilabel:`Run search`.

7. To narrow your search, use the :guilabel:`Group by` drop-down list to select the field or fields by which you want to group your results, then select :guilabel:`Apply`. To learn more about aggregation, see :ref:`logs-aggregations`.

6. Review the top values for your query on the the :guilabel:`Fields` panel on right. This list includes the count of each value in the log records. To include log records with a particular value, select the field name, then select ``=``. To exclude log records with a particular value from your results, select the field name, then select ``!=``. To see the full list of values and distribution for this field, select :guilabel:`Explore all values`.

6. Optionally, if you are viewing Splunk platform (Splunk Cloud Platform or Splunk Enterprise) data, you can open your query results in the Splunk platform to use SPL to further filter or work with the query results. You must have an account in Splunk platform. To open the log results in the Splunk platform, select the :guilabel:`Open in Splunk platform` icon at the top of the Logs table. 

   .. image:: /_images/logs/lo-openinsplunk.png
         :width: 100%
         :alt: The Open in Splunk platform icon is at the top, right-hand side of the Logs table.
    