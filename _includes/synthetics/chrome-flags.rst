.. list-table::
  :header-rows: 1
  :widths: 40 60
  :width: 100%

  * - :strong:`Chrome flag`  
    - :strong:`Description`
  * - ``--disable-http2``
    - Requests are made using using ``http/1.1`` instead of ``http/2.0``. This HTTP version is viewable in the HAR file.
  * - ``--disable-quic``
    - Deactivates QUIC, which also deactivates HTTP3.
  * - ``--disable-web-security``
    - Deactivate enforcement of same origin policy.
  * - ``--unsafely-treat-insecure-origin-as-secure=http://a.test,http://b.test``
    - Treat given insecure origin as secure. Multiple origins can be supplied in a comma-separated list.
  * - ``--proxy-bypass-list="*.google.com;*foo.com;127.0.0.1:8080"``
    - Proxy bypass list for any specified proxy for the given semi-colon-separated list of hosts. This flag must be used with ``--proxy-server``.
  * - ``--proxy-server="foopy:8080"``
    - Uses a specified proxy server to override default settings.
  * - ``--no-proxy-server``
    - Don't use a proxy server, always make direct connections. This flag can be used to override any other proxy server flags that you may have set up in a private location. 

