The Splunk RUM data model represents the following logical entities, following OpenTelemetry conventions:

.. list-table::
   :widths: 10 90

   * - Trace
     - A set of events triggered as a result of a single logical operation, distributed across various components of an application. Traces contain events that cross process, network, and security boundaries. A RUM trace can, for example, initiate when someone taps on a button to start an action on a website. If you use RUM and APM together, traces represent calls made between the downstream services that handle the requests initiated by the user action.
   * - Span
     - An operation within a transaction. A single span includes the logical name, the start and end timestamp of the operation, and the events and attributes linked to the captured data. A span might have a reference to its parent span and zero or more causally-related spans. Spans have universal attributes and custom attributes.
   * - Session
     - A collection of traces that correspond to the actions a single user takes when interacting with an application over a period of time. By default, a session lasts until 15 minutes passed from the last event captured in the session. The maximum session duration is 4 hours.
   * - Interaction
     - Reflects the action the user conducts within the user interface. Common interaction types include mouse clicks, taps on a touch screen, and keyboard events.
   * - User
     - By default, Splunk RUM doesn't collect identity data. Mapping a trace to a specific user requires manual instrumentation. Users can be represented by their username, email addresses, or using a synthetic identifier. Synthetic representation is useful in situations where PII regulations do not allow users to be identified.

