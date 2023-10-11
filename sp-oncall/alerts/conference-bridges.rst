**Use Your Own Conference Bridge**
----------------------------------

This feature is for `enterprise <https://victorops.com/pricing/>`__
customers.

The conference bridge feature allows teams to add their conference
bridge information to an incident in Splunk On-Call. This mobilizes your
team when it matters most. You can use your preferred web conferencing
provider for faster incident response.

**Adding Pre-Set Conference Bridge Information**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Under Settings > Conference Bridges, users with either Global or Alert
Admin permissions can click “add conference bridge” to add a conference
bridge that will be saved and can be retrieved when adding responders
and a conference bridge from the War Room. You may add up to 25 pre-set
conference bridges.

.. image:: images/presetconfbridges.png

**Selecting a Pre-Set Conference Bridge** 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

From the War Room, pre-set conference bridge information may be added so
additional responders can rally to an incident.

Please note, you will not be able to select pre-set conference bridges
from the incident pane.

.. image:: images/usepsconfbride.png

**Creating an Ad-Hoc Conference Bridge**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Add conference bridge information from a manual incident or when adding
responders to an existing incident. 

.. image:: images/adhocconfbridge.png

**Mobile/ Web Display**
~~~~~~~~~~~~~~~~~~~~~~~

This will be available in both the mobile and web UI

|image1|\ |image2|

From the War Room, when you’ve successfully added your pre-set
conference bridge, the conference bridge name will be displayed on the
incident overview pane.

.. image:: images/viewconfbridge.png

**Notification Updates**
~~~~~~~~~~~~~~~~~~~~~~~~

**SMS**

After acknowledging an SMS notification, Splunk On-Call will either send
your conference bridge URL, the primary phone number, or the deep link
URL to an incident as part of the acknowledgment receipt.

.. image:: images/byocb4.png

**Push Notification**

After acknowledging a push notification, a user can select acknowledge
and join a conference call.

.. image:: images/byocb5.png

**Email**

Splunk On-Call sends the incident deep link URL from a Splunk On-Call
email notification. This will open the mobile app if the mobile app is
downloaded on the user’s device, or open the incident pane when the
mobile app is not available.

.. image:: images/byocb6.png

.. |image1| image:: images/byocb2.jpg
.. |image2| image:: images/byocb3.png
