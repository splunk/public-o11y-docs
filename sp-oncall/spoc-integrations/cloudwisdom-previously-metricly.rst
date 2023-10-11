`CloudWisdom <https://www.virtana.com/products/cloudwisdom/>`__
(previously known as `Metricly <https://www.metricly.com/>`__) leverages
the simple yet powerful analytics to lower cloud costs and assure
performance. Provide actionable sizing recommendations per workload by
applying CloudWisdom’s deep analytics to capacity utilization across all
cloud computing dimensions.The following guide will walk you through the
steps needed to integrate the two systems.

**In VictorOps**
----------------

From the VictorOps web portal select *Integrations* >> *CloudWisdom*

Select the *CloudWisdom* integration and copy the **Service API
Endpoint** to your clipboard.

.. image:: images/Screen-Shot-2020-05-20-at-11.11.52-AM.png

Make sure to add the appropriate `Routing
Key <https://help.victorops.com/knowledge-base/routing-keys/>`__ to the
end of the URL.

**In CloudWisdom**
------------------

1. Create a VictorOps (Webhook) Notification
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Navigate to ​\ **User Settings**\ ​ >> **N**\ ​\ **otifications**\ ​

2. Select the ​\ **Webhook** ​tab

3. Select ​\ **+ Add Webhook​**

.. image:: images/Screen-Shot-2020-04-17-at-11.05.45-AM.png

          4. Complete the following fields:

-  

   -  **Name**\ ​: Names the Notification

      -  **Enabled**\ ​: Indicates notification is active
      -  **URL**\ ​: (found in VictorOps)
      -  **Username**\ ​: Optional
      -  **Password**\ ​:​ ​Optional
      -  **Header**\ ​: Optional
      -  **Payload**\ ​: Can be a default or custom template

5. Select ​\ **Test** and **Save**\ ​

.. image:: images/Screen-Shot-2020-04-17-at-12.08.30-PM.png

2. Apply Notification to a Policy
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Navigate to ​\ **Monitoring** ​>> **Alerts**\ ​

2. Select ​\ **+ New Policy**\ ​ (or edit an existing one). A modal
appears.

.. image:: images/Screen-Shot-2020-04-17-at-11.14.04-AM.png

3. Complete the policy’s ​\ **Scope** ​and ​\ **Conditions**\ ​
4. Navigate to ​\ **Notifications**\ ​ >> **A​dd Notification​**
5. For Notification Type, select ​\ **Webhook**

.. image:: images/Screen-Shot-2020-04-17-at-11.17.34-AM.png

6. Select the VictorOps webhook notification you created
7. Finish policy configuration
8. **Save**\ ​
