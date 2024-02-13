.. _tls-security-protocol

************************************************************************
TLS integration for Splunk On-Call
************************************************************************

.. meta::
   :description: About the user resolved in Splunk On-Call.


Historically, Splunk On-Call has allowed customers to connect to our platform using older, less-secure encryption protocols (TLS versions prior to 1.2, SSLv3). This was to allow customers using older web client libraries to connect to our API endpoints. In the interest of providing the best possible protection for all of our customers' data, we no
longer support these older protocols.

Please update connecting websocket libraries to support TLS 1.2 or better.



Linux
=============

You can test the protocol you are using by running the below command:

``wget -secure-protocol=TLSv1_2 https://www.google.com``

Windows Powershell
========================

Some monitoring tools leverage PowerShell scripts. If your PowerShell is defaulting to TLS 1.1 try adding this line to the script:

``[Net.ServicePointManager]::SecurityProtocol =
[Net.SecurityProtocolType]::Tls12``

Java Application
=======================

You can enforce java apps to use TLS 1.2 with the below command. Most java systems will default to TLS 1.2 with JDK 8.

-Dhttps.protocols=TLSv1.2

Reach out to support if you have any questions by emailing spoc-support@splunk.com.
