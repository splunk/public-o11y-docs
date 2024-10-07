.. list-table::
  :header-rows: 1
  :widths: 40 60
  :width: 100%

  * - :strong:`Chrome flag`  
    - :strong:`Description`
  * - ``--disable-http2```
    - Requests are made using using ``http/1.1`` instead of ``http/2.0``. This HTTP version is viewable in the HAR file.
  * - ``--disable-quic``
    - Deactivates QUIC, which also deactivates HTTP3.
  * - ``--disable-web-security``
    - Deactivate enforcement of same origin policy. Intended for website testing only. This flag has no effect unless ``--user-data-dir`` as defined by the content embedded is also present.
  * - ``--unsafely-treat-insecure-origin-as-secure=http://a.test,http://b.test``
    - Treat given insecure origin as secure. Option to supply multiple origins in a comma-separated list. For the definition of secure contexts, see :new-page:`Secure Contexts https://w3c.github.io/webappsec-secure-contexts/ ` and :new-page:`Is origin potentially trustworthy? https://www.w3.org/TR/powerful-features/#is-origin-trustworthy` from the w3C documentation. 
  * - ``--proxy-bypass-list="*.google.com;*foo.com;127.0.0.1:8080"``
    - Proxy bypass list for any specified proxy for the given semi-colon-separated list of hosts. This flag must be used with ``--proxy-server``.
  * - ``--proxy-server="foopy:8080"``
    - Uses a specified proxy server to override default settings.
  * - ``--no-proxy-server``
    - Don't use a proxy server, always make direct connections. Overrides any other proxy server flags that are passed to the server.
  

