Loggly provides cloud-based solutions for log management, allowing users
to spot problems in real time and identify root causes.

Configuration Steps
-------------------

 

-  Begin by enabling the Email Endpoint integration under **Settings**
   >> **Alert Behavior** >> **Integrations** >> **Loggly** |image

 

-  Click Enable Integration |image2|
-  Copy the Email address that is generated.\ |image3|
-  From the Loggly dashboard select your user icon and then **Account**.
   |loggly2|

 

-  Go to the **Users** tab and select **Add New**. |loggly3|
-  Name the user whatever you want (VictorOps Alerts in example) and
   paste the Email address you generated in as the user's **Email
   Address** then presses submit\ |loggly4|
-  Go to your **Alerts** and either edit an existing alert or create a
   new one. |loggly5|

 

-  The **Name** of the alert will appear the email subject so put in the
   appropriate key word. For more see the document on `Generic Email
   Endpoint <https://help.victorops.com/knowledge-base/victorops-generic-email-endpoint/>`__

-  Check **Send an email** and add the VictorOps email address. Make
   sure the alert is enabled, then select Submit.

-  .. image:: /_images/spoc/loggly6.png
      :alt: loggly6

      loggly6

Now whenever the search criteria is matched an incident will be posted
in your VictorOps timeline alerting the correct people.

.. |image image:: /_images/spoc/Loggly-final.png
.. |image2| image:: /_images/spoc/Loggly2-final.png
.. |image3| image:: /_images/spoc/Loggly3-skitch.png
.. |loggly2| image:: /_images/spoc/loggly2.png
.. |loggly3| image:: /_images/spoc/loggly3.png
.. |loggly4| image:: /_images/spoc/loggly4.png
.. |loggly5| image:: /_images/spoc/loggly5.png
