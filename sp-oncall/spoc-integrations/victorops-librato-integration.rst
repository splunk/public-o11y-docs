Librato provides a complete solution for monitoring and understanding
the metrics that impact your business at all levels of the stack.

The VictorOps integration with Librato allows you to send all Librato
alerts into the VictorOps timeline so that the right people are paged.
The following instructions go through how to quickly implement this
integration.

--------------

**In VictorOps**
================

From the main timeline select *Settings >> Alert Behavior* >>
Integrations >> *AppOptics*.

..image images/Integrations_-_votest-vo2_kb-3.jpg

If the integration has not yet been enabled, click the *Enable
Integration* button to generate your Service API Key, as seen here:

..image images/Librato.png

Copy the *Service API Key* to your clipboard and determine which
VictorOps routing-key value will be used for this integration.  For more
information on routing keys and best practices, click
`HERE <https://help.victorops.com/knowledge-base/routing-keys/>`__.

--------------

In Librato
==========

First go to “Account Settings”.\ |librato1|

Select “Services” in the left side bar, and then select
**VictorOps**.\ |librato2|

Configure the new VictorOps service by giving it a title, then enter
your VictorOps Service API Key (that you'd copied earlier) and Routing
key.\ |librato6|

Hit “create service” and you are done!

.. |librato1| image:: /_images/librato1.png
.. |librato2| image:: /_images/librato2.png
.. |librato6| image:: /_images/librato6.png
