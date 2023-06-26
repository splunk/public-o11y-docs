.. _java-servers-instructions:

******************************************************************************
Define agent paths for Java application servers for Splunk Observability Cloud
******************************************************************************

.. meta:: 
   :description: To instrument your Java application, you must define the path to the agent from the Splunk OpenTelemetry Java agent. The following sections describe how to set the agent path for supported Java servers.

To instrument your Java application for Splunk Observability Cloud, you must define the path to the agent from the :ref:`Splunk Distribution of OpenTelemetry Java <splunk-java-otel-dist>`. The following sections describe how to set the agent path for each of the supported servers.

.. _jboss-javaagent:

JBoss EAP and WildFly
==============================================

Add the ``javaagent`` argument to the standalone configuration file:

.. tabs::

   .. group-tab:: Linux

      On Linux add the following line at the end of the standalone.conf file:
         
         .. code-block:: shell
         
            JAVA_OPTS="$JAVA_OPTS -javaagent:/path/to/splunk-otel-javaagent.jar"

   .. group-tab:: Windows

      On Windows, add the following line at the end of the standalone.conf.bat file:
         
         .. code-block:: shell

            set "JAVA_OPTS=%JAVA_OPTS% -javaagent:<Drive>:\path\to\splunk-otel-javaagent.jar"
   
.. _jetty-javaagent:

Jetty
==============================================

Add the path to the JVM agent using the ``-javaagent`` argument:

.. code-block:: shell

   java -javaagent:/path/to/splunk-otel-javaagent.jar -jar start.jar

Alternatively, you can add the ``-javaagent`` argument to your jetty.sh or start.ini files:

-  If you use the jetty.sh file to start Jetty, add the following line to the <jetty_home>/bin/jetty.sh file:
   
   .. code-block:: shell

      JAVA_OPTIONS="${JAVA_OPTIONS} -javaagent:/path/to/splunk-otel-javaagent.jar"
   
- If you use the start.ini file to define JVM arguments, add the ``javaagent`` argument below the ``--exec`` option:
   
   .. code-block::

      #===========================================================
      # Sample Jetty start.ini file
      #-----------------------------------------------------------
      --exec
      -javaagent:/path/to/splunk-otel-javaagent.jar

.. _glassfish-javaagent:

Glassfish and Payara
==============================================

Add the path to the JVM agent to the settings using the asadmin command-line tool:

- On Linux, enter the following command:

   .. code-block:: shell

      <server_install_dir>/bin/asadmin create-jvm-options "-javaagent\:/path/to/splunk-otel-javaagent.jar" 

- On Windows, enter the following command:

   .. code-block:: shell

      <server_install_dir>\bin\asadmin.bat create-jvm-options '-javaagent\:<Drive>\:\\path\\to\\splunk-otel-javaagent.jar'

You can also add the ``-javaagent`` argument from the Glassfish or Payara Admin Console:

1. Open the GlassFish Admin Console at ``http://localhost:4848``.
2. Go to :menuselection:`Configurations`, then :menuselection:`server-config`.
3. Select :menuselection:`JVM Settings`.
4. Select :menuselection:`JVM Options`, then :menuselection:`Add JVM Option`.
5. In the blank field, enter the path to the splunk-otel-javaagent.jar file:

   ``-javaagent:/path/to/splunk-otel-javaagent.jar``

6. Select :strong:`Save` and restart the server.

.. note:: Make sure that the domain.xml file in your domain directory contains a ``<jmv-options>`` entry for the agent.

.. _tomcat-javaagent:

Tomcat and TomEE
==============================================

Add the path to the JVM agent to your Tomcat or TomEE startup script:

.. tabs::

   .. group-tab:: Linux

      On Linux, add the following line to the <tomcat_home>/bin/setenv.sh file:
   
         .. code-block:: shell

            CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/to/splunk-otel-javaagent.jar"

   .. group-tab:: Windows

      On Windows, add the following line to the <tomcat_home>\bin\setenv.bat file:
   
         .. code-block:: shell

            set CATALINA_OPTS=%CATALINA_OPTS% -javaagent:"<Drive>:\path\to\splunk-otel-javaagent.jar"

.. _weblogic-javaagent:

WebLogic
==============================================

Add the path to the JVM agent to your WebLogic domain startup script:

- On Linux, add the following line to the <domain_home>/bin/startWebLogic.sh file:
   
   .. code-block:: shell

      export JAVA_OPTIONS="$JAVA_OPTIONS -javaagent:/path/to/splunk-otel-javaagent.jar"
   
- On Windows, add the following line to the <domain_home>\bin\startWebLogic.cmd file:
   
   .. code-block:: shell

      set JAVA_OPTIONS=%JAVA_OPTIONS% -javaagent:"<Drive>:\path\to\splunk-otel-javaagent.jar"
   
.. note:: For managed server instances, add the ``-javaagent`` argument using the admin console.

.. _liberty-javaagent:

WebSphere Liberty Profile
==============================================

Add the path to the JVM agent to the jvm.options file:

#. Open the jvm.options file:
   - For a single server, create or edit the ``${server.config.dir}/jvm.options`` file.
   - For all servers, create or edit the ``${wlp.install.dir}/etc/jvm.options`` file.
#. Add the following line:
   
   .. code-block:: shell

      -javaagent:/path/to/splunk-otel-javaagent.jar
   
#. Save the file and restart the server.

Note that WebSphere Liberty servers on mainframes is not supported.

.. _websphere-javaagent:

WebSphere Traditional
==============================================

Open the WebSphere Admin Console and follow these steps:

#. Navigate to :guilabel:`Servers`, then :guilabel:` Server type`.
#. Select :guilabel:`WebSphere application servers`.
#. Select the desired server.
#. Navigate to :guilabel:`Java and Process Management`, then :guilabel:` Process Definition`.
#. Select :guilabel:`Java Virtual Machine`.
#. In the :guilabel:`Generic JVM arguments` field, enter the path to Splunk Java agent:

   .. code-block:: bash
   
      -javaagent:/path/to/splunk-otel-javaagent.jar

#. Select :guilabel:`OK`. When asked, save the main configuration and restart the server.