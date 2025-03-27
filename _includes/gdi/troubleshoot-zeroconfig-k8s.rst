Troubleshooting
======================================

If you're having trouble setting up automatic discovery, see the following troubleshooting guidelines.

Check the logs for failures
--------------------------------------

Examine logs to make sure that the operator and cert manager are working.

.. list-table:: 
  :header-rows: 1
  :width: 100%

  * - Application
    - kubectl command
  * - Operator
    - ``kubectl logs -l app.kubernetes.io/name=operator``
  * - Cert manager
    - * ``kubectl logs -l app=certmanager``
      * ``kubectl logs -l app=cainjector``
      * ``kubectl logs -l app=webhook``

Validate certificates
---------------------------

Ensure that certificates are available for use. Use the following command to search for certificates:

.. code-block:: bash

  kubectl get certificates
  # NAME                                          READY   SECRET                                                           AGE
  # splunk-otel-collector-operator-serving-cert   True    splunk-otel-collector-operator-controller-manager-service-cert   5m