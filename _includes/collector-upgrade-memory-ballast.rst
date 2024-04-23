``memory_ballast`` is no longer effective. You can now control garbage collection with a soft memory limit using the ``SPLUNK_MEMORY_TOTAL_MIB`` env var, which is set to 90% of the total memory by default. For more information, see :ref:`collector-env-var`. 

Follow these steps to ensure your Collector instances work correctly:

* If you haven't customized ``memory_ballast``, remove it from the configuration.

* If you have customized ``memory_ballast`` using ``SPLUNK_BALLAST_SIZE_MIB`` (or ``extensions::memory_ballast::size_mib config``), remove the ``memory_ballast`` extension and use the ``GOMEMLIMIT`` environment variable to set a custom soft memory limit:

  * To increase frequency of garbage collection set ``GOMEMLIMIT`` to a higher value than the default 90% of total memory.

  * To decrease frequency of garbage collection set ``GOMEMLIMIT`` to a lower value than the default 90% of total memory.

  * For more information, see :new-page:`Go environment variables <https://pkg.go.dev/runtime>`.

