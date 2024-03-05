.. note:: About realms

   A realm is a self-contained deployment of Splunk Observability Cloud in which your organization is hosted. Different realms have different API endpoints. For example, the endpoint for sending data in the ``us1`` realm is ``https://ingest.us1.signalfx.com``, while the endpoint for sending data in the ``eu0`` realm is ``https://ingest.eu0.signalfx.com``.

   When you see a placeholder realm name in the documentation, such as ``<YOUR_REALM>``, replace it with your actual realm name. To find your realm name, open the navigation menu in Splunk Observability Cloud, select :menuselection:`Settings`, and select your username. The realm name appears in the :guilabel:`Organizations` section. If you don't include the realm name when specifying an endpoint, Splunk Observability Cloud defaults to the ``us0`` realm.
