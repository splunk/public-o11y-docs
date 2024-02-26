To override the host used by the agent, use the environment variable ``OTEL_RESOURCE_ATTRIBUTES`` to set your host's name to the desired source:

.. tabs::

   .. code-tab:: bash Linux

      export OTEL_RESOURCE_ATTRIBUTES=host.name=<host_name>

   .. code-tab:: shell Windows PowerShell

      $env:OTEL_RESOURCE_ATTRIBUTES=host.name=<host_name>