.. _manage-dashboards-imm:

***************************************************************************
Customize dashboards in Splunk Infrastructure Monitoring navigators
***************************************************************************

.. meta::
    :description: Customize dashboards in the navigators for Splunk Infrastructure Monitoring

.. note:: You must be an admin user to perform the tasks described in this topic.

Apart from modifying parameters for the data that you view and monitor in a navigator as explained in :ref:`customize-navigator`, you can also   
use navigator customization to modify the number and scope of the dashboards associated with a navigator. Dashboard customization persists
across sessions and applies to all users viewing the involved navigator.

You can apply custom dashboard settings to both the aggregate view of all navigators for a specific techhology, or the more focused instance view of 
navigators for a representative example, as for example, monitoring all active EC2 hosts in an aggregate view vs. monitoring one active EC2 host in an instance view. 
A label next to the title of the Navigator settings page identifies whether you're working with an aggregate
view or an instance view. Fewer dashboards display for instance views than for aggregate views, but you can customize either view.

Use :guilabel:`Manage navigator dashboards` to find dashboards that you can add to the set associated with a navigator.

As an admin user, you can access :guilabel:`Manage navigator dashboards` in either of the following ways:

- From the drop-down menu displayed when you select the gear icon on the Infrastructure Navigabor home page.

- From the ellipses at the right side of a navigator title bar.

Either access method opens the Navigator settings page, from which you can select up to 10 dashboards to display in the navigator. Current
dashboards are listed in a table that displays them by name.

To add one or more dashboards to the default dashboard set for a navigator, do the following from the Navigator settings page:

#. Click on **+Add dashboard**.

#. Scroll through the list of dashboards, using the Prev and Next buttons to navigate through multiple pages as desired. All available dashboards are displayed bydefault, so the dashboard list can be extensive.

#. (Optional) In the search field of the :guilabel:`Select a dashboard`` window, enter the name of the dashboard you want to find. If dashboards in different groups have the same name, as they might in the case of a common function like "Service endpoint," then search displays the relevant part of the dashboard list where the dashboards appear in alphabetical order.

#. (Optional) Use the buttons next to the search field to apply either of the following search filters:

   * Created by me
   * Favorites

#. Click on the name of the dashboard you want to link to the navigator.

#. Click :guilabel:`Select` at the bottom right of the dashboard listing.

#. (Optional) Repeat steps 2 through 5 to link additional dashboards to the navigator.

#. (Optional) To change the dashboard display order on the home page for the navigator, click on a dashboard name and drag it up or down in the dashboard list.

#. Click :guilabel:`Save changes` to confirm and apply your choices. 

If you select :guilabel:`Reset to built-in dashboards` rather than :guilabel:`Save changes`, then your system resets to the original state 
of the navigator without any customization.

To hide a dashboard from view temporarily without actually disassociating it from a navigator, open the Dashboards list and click on the eye symbol shown to the right of the dashboard namew. When a dashboard is hidden, the eye symbol has a slash through it and the dashboard name displays with its name grayed out. 


Built-in dashboards
-----------------------------

Built-in dashboards ship with particular navigators as part of a default set. In dashboard lists, they have a :guilabel:`Built-in` label next to their names.
A dashboard with a :guilabel:`Limited access` label is associated with an access control list (ACL), and might not be visible to all users.

Custom dashboards
-----------------------------

Custom dashboards are monitoring tools that you add to the built-in dashboard set when you modify navigators to more closely match the needs
of your end-to-end computing environment.
