* ``collection_interval``. ``10s`` by default. Sets the interval this receiver collects metrics on. 
  
  * This value must be a string readable by Golang's ``time.ParseDuration``. Learn more at Go's official documentation :new-page:`ParseDuration function <https://pkg.go.dev/time#ParseDuration>`.
  
  * Valid time units are ``ns``, ``us`` (or ``µs``), ``ms``, ``s``, ``m``, ``h``.
