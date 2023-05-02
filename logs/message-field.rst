.. _logs-message-field:

*****************************************************************
Display a field separately in the log details flyout
*****************************************************************

.. meta::
  :description: Display the message field from your logs in an easy-to-access flyout in each individual log record.

The log details flyout in Log Observer always displays the ``message`` field in a standalone section called :strong:`MESSAGE` at the top of the log details flyout.

.. image:: /_images/logs/log-observer-message-field2.png
   :width: 99%
   :alt: This image shows the location of the message field in a separate section at the top of the log details flyout.

Your team can choose to display any field of your choice in the :strong:`MESSAGE` section. To display a field of your choice separately, alias the desired field to the ``message`` field. See :ref:`logs-alias` to learn how. 

For example, say your team most frequently uses the ``summary`` field. Add an alias for the ``summary`` field called ``message``. The ``summary`` field still exists but is also known as ``message`` and appears in the :strong:`MESSAGE` section of the log details flyout.

