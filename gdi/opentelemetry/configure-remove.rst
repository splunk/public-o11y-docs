.. _configure-remove:

*********************************************************************
Remove ingested data 
*********************************************************************

.. meta::
      :description: Remove data ingested with the Splunk Distribution of OpenTelemetry Collector.

The Collector bla bla

* contents
* sensitive data
* other?

You can use the :ref:`attributes processor <attributes-processor>` to remove any unwanted data you've ingested.

For example, Moira, a performance engineer, notices metrics are ingested along with a huge amount of unnecessary dimensions, which heavily impacts data charges. Moira decides that it's best to drop certain dimensions

The following is an example of a processor that Moira can add to their Splunk Distribution of OpenTelemetry Collector configuration file. In this example, they delete the keys and values of the ``user.password`` attribute from the spans associated with ``checkoutService`` because they know this value is not relevant for debugging application performance.

Additionally, Moira hashes the value of ``user.name`` to replace the user's name with a unique hash value that doesn't contain PIIs. This way, during debugging, they can use these unique hash values to see whether an issue is impacting one or more users without revealing their names.

Moira also redacts the values of ``credit.card.number``, ``cvv``, and ``credit.card.expiration.date`` tags from incoming spans because it's useful to know in debugging that a value was entered for these fields, but not necessary to discern the contents of that value. 

.. code-block:: yaml

    extensions: 
        ...  
    processors:
      attributes/update:
        actions:
          - key: user.password
            action: delete
          - key: user.name
            action: hash
          - key: credit.card.number
            value: redacted
            action: update
          - key: cvv
            value: redacted
            action: update
          - key: credit.card.expiration.date
            value: redacted
            action: update
    service:
        ...
    ...

After configuring the processor, Moira adds the ``attributes/delete`` processor to the ``processors`` pipeline under ``pipelines`` in the Collector's configuration: 

.. code-block:: yaml

    ... 
    service:
        pipelines:
        traces:
            receivers: ...
            processors: [..., attributes/delete, ...] 
            ...


See another example of how to at :ref:`collector-remove-data`.