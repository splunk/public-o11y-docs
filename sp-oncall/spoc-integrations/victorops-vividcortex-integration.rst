VividCortex integration for Splunk On-Call
**********************************************************

VividCortex provides advanced monitoring for the most advanced
opensource databases. The VictorOps integration with VividCortex makes
use of the VictorOps REST endpoint to send alerts into the VictorOps
timeline. The following will guide you through the steps needed to
integrate the two systems.

**In VictorOps**
----------------

From the main timeline go select **Settings** then **Alert
Behavior** then **Integrations**.

.. image:: /_images/spoc/settings-alert-behavior-integrations-e1480978368974.png

Select the **Vivid Cortex** Integration.

.. image:: /_images/spoc/Integrations-victorops-5.png

Enable the integration and copy the “Service API Key” to your clipboard.

.. image:: /_images/spoc/Integrations-victorops-6.png

**In VividCortex**
------------------

Select **Settings** then **Integrations**.

.. image:: /_images/spoc/VividCortex4.png
   :alt: vividcortex4

   vividcortex4

Then select **Create New Integration**.

.. image:: /_images/spoc/VividCortex5.png
   :alt: vividcortex5

   vividcortex5

Select the **VictorOps** integration. Give the integration a name, make
sure to add the appropriate `Routing
Key <https://help.victorops.com/knowledge-base/routing-keys/>`__, paste
in your API Key you copied from VictorOps, select **Create
Integration**. And you are done.  

.. image:: /_images/spoc/VividCortex6.png
   :alt: vividcortex6

   vividcortex6

If you have any questions please `contact
support <mailto:support@victorops.com?Subject=VividCortex%20VictorOps%20Integration>`__.
