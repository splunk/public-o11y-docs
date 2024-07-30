.. _splunkplatform:

********************************************************************************
Send alert notifications to Splunk platform using Splunk Observability Cloud
********************************************************************************

.. meta::
      :description: Configure Splunk Observability Cloud to send alerts to Splunk platform when an alert condition triggers the detector and when the condition clears.

You can configure Splunk Observability Cloud to automatically send alert notifications to Splunk platform when a condition triggers the detector and when a clear condition clears the alert.

.. note::

   * To add Splunk platform as a detector alert recipient, you must have administrator access. To get this access,
     an existing administrator adds it to your user profile. See :ref:`admin-manage-users` for more information.

To send Splunk Observability Cloud alert notifications to Splunk platform, complete the following configuration tasks:

* :ref:`splunkplatform1`

* :ref:`splunkplatform2`

.. _splunkplatform1:

Step 1: Create a Splunk platform integration in Splunk Observability Cloud
=================================================================================

#. Log in to Splunk Observability Cloud.
#. Open the :new-page:`Splunk platform guided setup <https://login.signalfx.com/#/integrations/splunk-platform>`. Alternatively, you can navigate to the guided setup on your own:

   #. In the navigation menu, select :menuselection:`Data Management`.
   #. Go to the :guilabel:`Available integrations` tab, or select :guilabel:`Add Integration` in the :guilabel:`Deployed integrations` tab.
   #. In the integration filter menu, select :guilabel:`All`.
   #. In the :guilabel:`Search` field, search for :guilabel:`Splunk platform`, and select it.
   #. Select :strong:`New Integration` to display the configuration options.

#. On the :strong:`Summary` page, select :guilabel:`Next`.
#. On the :strong:`Configure connection` page, enter information into the following fields:

   .. list-table::
      :header-rows: 1
      :widths: 25 75

      * - :strong:`Field`
        - :strong:`Description`

      * - Name
        - Give your integration a unique and descriptive name. For information about the downstream use of this name, see :new-page-ref:`About naming your integrations <naming-note>`.

      * - URL
        - Enter the HTTP Event Collector (HEC) URI for your Splunk platform instance. To learn more, see the :new-page:`Send data to HTTP Event Collector <https://docs.splunk.com/Documentation/SplunkCloud/9.1.2312/Data/UsetheHTTPEventCollector#Send_data_to_HTTP_Event_Collector>` section in the *Documentation for Splunk Cloud Platform*.

      * - HEC token
        - Enter the HTTP Event Collector token that allows access to your Splunk platform instance. To learn more, see :new-page:`Set up and use HTTP Event Collector in Splunk Web <https://docs.splunk.com/Documentation/SplunkCloud/9.2.2403/Data/UsetheHTTPEventCollector>`.
          
   .. note:: Splunk Observability Cloud doesn't support HEC indexer acknowledgement. If you want to use the Splunk platform integration, don't activate HEC indexer acknowledgement in your Splunk Enterprise instance.

#. Select :guilabel:`Next`.
#. On the :strong:`Customize message` page, you see the default template for a Splunk platform integration. You can customize your payload to make sure responders have the context needed to resolve the issues. To learn more, see :ref:`splunk-platform-variables`.
#. Select :guilabel:`Next`.
#. Review your integration and select :guilabel:`Save`.

.. _splunkplatform2:

Step 2: Add a Splunk platform integration as a detector alert recipient in Observability Cloud
=====================================================================================================================

To add a Splunk platform integration as a detector alert recipient in Splunk Observability Cloud:

#. Create or edit a detector that you want to configure to send alert notifications using your Splunk platform integration.

   For more information about working with detectors, see :ref:`create-detectors` and :ref:`subscribe`.

#. In the :strong:`Alert recipients` step, select :strong:`Add Recipient`.
#. Select :strong:`Splunk platform` and then select the name of the Splunk platform integration you want to use to send alert notifications. This is the integration name you created in :ref:`splunkplatform1`.
#. Activate and save the detector.

Splunk Observability Cloud sends an alert notification to Splunk platform when the detector triggers or clears an alert.


.. _splunk-platform-variables:

Supported variables for Splunk platform integration custom payload
==========================================================================

The following table shows the full list of variables for customization.

.. note:: 
    * Unless otherwise indicated in the description, all variables are of type string
    * When a variable is optional, it means it's not always available. If you use an optional variable that isn't available in the present conditions to construct your payload, Handlebars converts it to an empty string.

.. list-table::
   :header-rows: 1
   :widths: 30, 40

   * - :strong:`Variable`
     - :strong:`Description`

   * - ``detector``
     - Name of the detector.

   * - ``detectorUrl``
     - URL of the detector, which includes a parameter to select this specific incident.

   * - ``detectorId``
     - ID of the detector.

   * - ``description``
     - (Optional) Description of the rule for the detector.
   
   * - ``dimensions``
     - A map of the dimensions in the input MTS.

   * - ``imageUrl``
     - (Optional) URL of the alert preview image.
   
   * - ``incidentId``
     - Unique identifier for this alert notification.

   * - ``eventType``
     - Unique identifier for the version of the detector that sent the notification.

   * - ``rule``
     - Name of the detector rule that triggered the alert.

   * - ``severity``
     - Severity level of the rule determined by Splunk Observability Cloud. Use this variable in your custom payload.

   * - ``runbookUrl``
     - Runbook URL specified in this rule.

   * - ``tip``
     - Tip specified in this rule.

   * - ``messageTitle``
     - Notification title for this rule.

   * - ``messageBody``
     - Notification message for this rule.
  
   * - ``detectOnCondition``
     - (Optional) Criteria for metric data and detection criteria for the detector rule, written in SignalFlow format.

   * - ``detectOffCondition``
     - (Optional) Clear metric data and detection criteria in this rule, in SignalFlow format.
   
   * - ``status``
     - Status of the incident, kept for backwards compatibility. Use ``statusExtended`` for more detailed information. Valid values include:

       * ``anomalous``: the alert is firing because the detect conditions are met.
       * ``ok``: the alert is cleared because the detect conditions are no longer met or the clear conditions, if any, are met.
   
   * - ``statusExtended``
     - New variable for status of the incident. Use in place of ``status``. Valid values include:

       * ``anomalous``: the alert is firing because the detect conditions are met.
       * ``ok``: the alert is cleared because the detect conditions are no longer met or the clear conditions, if any, are met.
       * ``manually resolved``: a user resolves the alert through the UI or the API.
       * ``stopped``: the detector that triggered the alert is edited or deleted.
   
   * - ``timestamp``
     - Time the event occurred, in ISO 8601 format.
  
   * - ``inputs``
     - Map of the inputs involved in this rule. This variable is of type array. For more information, see :ref:`inputs-array`.
   
   * - ``sf_schema``
     - The schema version for this event. The value is always set to ``2``.

   * - ``orgId``
     - The organization ID of the Splunk Observability Cloud org where the alert is coming from.

   * - ``originatingMetric``
     - Name of the metric that triggered the alert.

   * - ``src``
     - The source of the alert, as defined by the following dimensions. The first dimension value available is set as the source of the alert.
       
       * ``k8s.pod.name``
       * ``k8s.cluster.name``
       * ``k8s.node.name``
       * ``k8s.container.name``
       * ``host``
       * ``host.name``
       * ``aws_arn``
       * ``gcp_standard_id``
       * ``azure_resource_id``
       * ``sf_service``
       * ``sf_workflow``
       * ``sf_operation``
       * ``test``

.. _inputs-array:

``inputs`` array
-----------------------------

Each object in the ``inputs`` array is named after the program variable it’s bound to. If an object isn’t bound to a program variable, it uses a name like ``_S0``, ``_S1``, and so on.

Each input object contains the following elements:

.. list-table::
   :header-rows: 1
   :widths: 30, 40

   * - :strong:`Element`
     - :strong:`Description`

   * - ``key``
     - (Optional) Map of the dimensions of the input signal. This element might be empty if there are no dimensions; for example, if the input was a static value and not a comparison against scalar values.

   * - ``value``
     - Value of the input when the alert triggered or when it cleared.


   * - ``fragment``
     - (Optional) This is the fragment of the SignalFlow program that represents the input. This element might not be present for some detectors or for static, anonymous inputs.

.. _helper-functions:

Helper functions 
------------------------

Apart from using template variables to customize your payload, you can also use the following helper functions to make sure the right value is set on the outgoing alert.

.. list-table::
   :header-rows: 1
   :widths: 20, 40, 40

   * - :strong:`Function`
     - :strong:`Description`
     - :strong:`Examples`

   * - ``coalesce``
     - Returns the first value that is not empty. You can use this function to specify the desired order of dimensions for the ``src`` variable.
     - | {{{coalesce dimensions.host dimensions.aws_arn ‘No ID Found!’}}}
       | This example sets ``dimensions.host`` on the alert if it is present, ``dimensions.aws_arn`` as a second option, and the string ``“No ID Found!”`` if neither host nor AWS ID is present.
   
   * - ``severityDecoder``
     - Returns ``2`` if the status variable is ``ok``. Otherwise, the function checks and decodes the severity variable:

       * ``1``: Info
       * ``3``: Warning
       * ``4``: Minor
       * ``5``: Major
       * ``6``: Critical
       * ``empty``: Unknown severity
     
     - | {{{severityDecoder ok='ok' Major='not_ok' default='empty'}}}
       | This example overrides the default return values and customizes them.

   * - ``encodeString``	
     - Escapes quote and newline characters in a string.	
     - {{{encodeString messageTitle}}}
   
   * - ``notEmpty``
     - Adds text to a payload only if the value specified is not empty map. This function only works with the ``inputs`` and ``dimensions`` variables.	
     - | This example only prints if dimensions is not empty: {{#notEmpty dimensions}}
       | {{/notEmpty}}
      
   * - ``json``
     - Converts a string to a raw JSON value. Use this function to turn text from a detector into a JSON payload that can be evaluated in third-party integrations.	
     - {{{json dimensions}}}
   
   * - ``substring``
     - Returns a new character sequence that is a subsequence of this sequence. The subsequence starts with the character at the specified index and ends with the character at the second to last index.	
     - | {{substring var 1}}
       | {{substring var 1 3}}

   * - ``abbreviate``
     - Truncates a string if it is longer than the specified number of characters. Minimum abbreviation width is 4.	
     - {{abbreviate long_str 5}}

   * - ``replace``
     - Replaces each substring of this string that matches the literal target sequence with the specified literal replacement sequence.	
     - {{replace abbreviated '...' ''}}

   * - ``eq``
     - Checks if two elements are equal.	
     - | {{#eq a b}}yes{{else}}no{{/eq}}
       | {{#eq a 2}}yes{{else}}no{{/eq}}


     

 


  
    
    




