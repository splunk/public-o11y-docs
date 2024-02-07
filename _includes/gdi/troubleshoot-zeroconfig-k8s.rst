Troubleshooting
======================================

If you're having trouble setting up auto instrumentation, see the following troubleshooting guidelines.

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

Resolve certificate manager issues
----------------------------------------

A hanging operator can indicate issues with the certificate manager.

* Check the logs of your cert-manager pods.
* Restart the cert-manager pods.
* Ensure that your cluster has only one instance of cert-manager. This includes ``certmanager``, ``certmanager-cainjector``, and ``certmanager-webhook``.

See the official cert manager troubleshooting guide for more information: :new-page:`https://cert-manager.io/docs/troubleshooting/`.

Validate certificates
---------------------------

Ensure that certificates are available for use. Use the following command to search for certificates:

.. code-block:: bash
    
  kubectl get certificates
  # NAME                                          READY   SECRET                                                           AGE
  # splunk-otel-collector-operator-serving-cert   True    splunk-otel-collector-operator-controller-manager-service-cert   5m