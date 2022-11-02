



Tracing CLI sessions
If you want to trace cli SAPI functionality, you have to manually enable it. When you enable cli tracing, the instrumentation automatically creates a root span to denote the lifetime of your cli session. This SAPI is disabled by default to avoid undesired traced system activity.

$ export SIGNALFX_TRACE_CLI_ENABLED=true
$ php artisan migrate:fresh
$ php myTracedCliScript.php