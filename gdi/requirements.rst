.. _requirements:

*********************************************************************
Compatibility and requirements for Splunk Observability Cloud
*********************************************************************

.. meta::
   :description: Splunk Observability Cloud's compatibility and requirements, including infrastructure monitoring agents and application and user monitoring instrumentation compatibility information.

You can get infrastructure, application, and user experience data into Splunk Observability Cloud from a variety of monitored and instrumented sources. Check the following requirements to learn which operating systems, languages, and frameworks are compatible with Splunk Observability Cloud.

Infrastructure monitoring (IM)
==================================================

The Splunk Distribution of OpenTelemetry Collector supports the following operating systems and services.

Linux
------------------------------------------------------------

.. include:: /_includes/requirements/collector-linux.rst

See :ref:`get-started-linux` for more information.

Windows
------------------------------------------------------------

.. include:: /_includes/requirements/collector-windows.rst

See :ref:`get-started-windows` for more information.


Available host and application monitors
-------------------------------------------------------------

The following host and application monitors are available. Refer to each service for detailed compatibility and requirements information.

.. include:: /_includes/application-receiver-table.rst

Processor architecture
-------------------------------------------------------------

For information on processor architectures supported by the Collector and the bundled Smart Agent monitors, see :ref:`collector-architecture`.


Application monitoring (APM)
==================================================

The Splunk distributions of OpenTelemetry instrumentation supports the following languages and runtimes.


Java
------------------------------------------

.. include:: /_includes/requirements/java.rst

See :ref:`java-otel-requirements` for more information.


Node
-------------------------------------------

.. include:: /_includes/requirements/nodejs.rst

See :ref:`nodejs-otel-requirements` for more information.



.NET
---------------------------------------------

.. include:: /_includes/requirements/dotnet.rst

See :ref:`dotnet-otel-requirements` for more information.


Go
----------------------------------------------

.. include:: /_includes/requirements/go.rst

See :ref:`go-otel-requirements` for more information.


Python
----------------------------------------------

.. include:: /_includes/requirements/python.rst

See :ref:`python-otel-requirements` for more information.


Ruby
----------------------------------------------

.. include:: /_includes/requirements/ruby.rst

See :ref:`ruby-otel-requirements` for more information.



PHP
----------------------------------------------

.. include:: /_includes/requirements/php.rst

See :ref:`php-requirements` for more information.


AWS Lambda functions
------------------------------------------

.. include:: /_includes/requirements/lambda.rst

See :ref:`instrument-aws-lambda-functions` for more information.



Real user monitoring (RUM)
==================================================

The Splunk distributions of OpenTelemetry instrumentation supports the following platforms and frameworks.


Android
------------------------------------------

.. include:: /_includes/requirements/android.rst

See :ref:`android-rum-install` for more information.



iOS
------------------------------------------

.. include:: /_includes/requirements/ios.rst

See :ref:`ios-rum-install` for more information.



Web applications
------------------------------------------

.. include:: /_includes/requirements/browser.rst

See :ref:`browser-rum-install` for more information.


React Native
------------------------------------------

.. include:: /_includes/requirements/react.rst

See :ref:`react-rum-install` for more information.


Support
======================

.. include:: /_includes/troubleshooting-components.rst
