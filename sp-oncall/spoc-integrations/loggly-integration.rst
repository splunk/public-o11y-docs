.. _loggly-spoc:

Loggly integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Loggly integration for Splunk On-Call.

Loggly provides cloud-based solutions for log management, allowing users to spot problems in real time and identify root causes.

Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise

Configuration
==================

1. Activate the Email Endpoint integration under :guilabel:`Settings`, :guilabel:`Alert Behavior` :guilabel:`Integrations`, :guilabel:`Loggly`.

   |image1|

2. Select :guilabel:`Enable Integration`.

   |image2|

3. Copy the email address.

   |image3|

4. From the Loggly dashboard, select your user icon and then :guilabel:`Account`.

   |loggly2|

5.  Go to the :guilabel:`Users` tab and select :guilabel:`Add New`.

   |loggly3|

6.  Name the user and paste the email address you generated in as the user's email
   address, then select :guilabel:`Submit`.

   |loggly4|

7. Go to :guilabel:`Alerts` and either edit an existing alert or create a new one.

   |loggly5|

8. Since the :guilabel:`Name` of the alert appears in the email subject, enter an appropriate value.

9. Check :guilabel:`Send an email` and add the Splunk On-Call email address. Make sure the alert is activated, then select :guilabel:`Submit`.

Whenever the search criteria matches, an incident is posted in your Splunk On-Call timeline.

.. |image1| image:: /_images/spoc/Loggly-final.png
.. |image2| image:: /_images/spoc/Loggly2-final.png
.. |image3| image:: /_images/spoc/Loggly3-skitch.png
.. |loggly2| image:: /_images/spoc/loggly2.png
.. |loggly3| image:: /_images/spoc/loggly3.png
.. |loggly4| image:: /_images/spoc/loggly4.png
.. |loggly5| image:: /_images/spoc/loggly5.png
