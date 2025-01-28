.. _apm-data-links:

*****************************************************************
Use data links to connect APM properties to relevant resources
*****************************************************************

.. meta::
   :description: Use global data links for services, traces, and spans to transfer APM context to other resources.

.. toctree::
      :hidden:
      :maxdepth:  3

      apm-create-data-links
      apm-datalinks-terraform/apm-data-links-terraform
      apm-use-data-links

Create global data links to link Splunk APM properties, such as services, traces, spans, and span tags, to relevant resources. For example, you can link APM properties to Infrastructure Monitoring dashboards, Splunk instances, Kibana logs, or custom URLs.

Global data links are useful because they dynamically transfer contextual information about the property you're viewing to the resource, helping you get to relevant information faster.

For information about creating global data links, see:

* :ref:`apm-create-data-links`
* :ref:`apm-create-data-links-terraform`

For information about using global data links, see :ref:`apm-use-data-links`.

For information about data links in general, see :ref:`data-link-def`.
