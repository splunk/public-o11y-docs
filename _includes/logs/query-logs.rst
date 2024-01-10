#. Navigate to :guilabel:`Log Observer`. In the content control bar, enter a time range in the time picker if you know it.
#. Select :guilabel:`Index` next to :guilabel:`Saved Queries`, then select the indexes you want to query. If you want to search your Splunk platform (Splunk Cloud Platform or Splunk Enterprise) data, select the integration for the appropriate Splunk platform instance first, then select which index you want to query in Log Observer. You can only query indexes from one Splunk platform instance or Observability Cloud instance at a time. You can only query Splunk platform indexes if you have the appropriate role and permissions in the Splunk platform instance. Select :guilabel:`Apply`.
#. In the content control bar next to the index picker, select :guilabel:`Add Filter`.
#. To search on a keyword, select the :guilabel:`Keyword` tab, type the keyword or phrase you want to search on, then press Enter. If you want to search on a field, select the :guilabel:`Fields` tab, enter the field name, then press Enter. 
#. To continue adding keywords or fields to the search, select :guilabel:`Add Filter`.
#. Review the top values for your query on the the :guilabel:`Fields` panel on right. This list includes the count of each value in the log records. To include log records with a particular value, select the field name, then select ``=``. To exclude log records with a particular value from your results, select the field name, then select ``!=``. To see the full list of values and distribution for this field, select :guilabel:`Explore all values`.
#. Optionally, if you are viewing Splunk platform (Splunk Cloud Platform or Splunk Enterprise) data, you can open your query results in the Splunk platform to use SPL to further filter or work with the query results. You must have an account in Splunk platform. To open the log results in the Splunk platform, select the :guilabel:`Open in Splunk platform` icon at the top of the Logs table. 

   .. image:: /_images/logs/lo-openinsplunk.png
         :width: 100%
         :alt: The Open in Splunk platform icon is at the top, right-hand side of the Logs table.
    