.. _terraform-spoc:

Terraform integration for Splunk On-Call
***************************************************

.. meta::
    :description: Configure the Terraform integration for Splunk On-Call.

Terraform modules and providers are extensions that allow configuring applications that a service depends on. For example monitoring tools, on-call, communications etc. Using the HashiCorp verified `Splunk On-Call Terraform
provider <https://registry.terraform.io/providers/splunk/victorops/latest>`__, teams can fully automate the Splunk On-Call setup steps associated with an application.

A common scenario our customers run into when deploying a new service is to also ensure Splunk On-Call is configured to page appropriate users with alerts related to the service. With Terraform, this can be fully automated in a declarative way, ensuring that the new service is properly monitored with Splunk On-Call from day 1.


Requirements
==================

This integration is compatible with the following versions of Splunk On-Call:

- Starter
- Growth
- Enterprise


Steps to get started
==================

Create a new file named ``sp-oncall.tf`` and paste the following content:

```
# Install VictorOps Terraform Provider
terraform {
required_providers {
victorops = {
source = "splunk/victorops"
version = "0.1.4"
}
}
}
```

Save the file and type following in the terminal:

```sh
terraform init
```

This downloads and install the Splunk On-Call Terraform provider from the Terraform Registry.

The provider communicates with Splunk On-Call using the REST API, so you need to provide an API key. See :ref:`spoc-api` for instructions.

Copy the API ID and API Key from Splunk On-Call and paste it following this format:

```
provider "victorops" 
{
api_id  = "your api id goes here"
api_key = "your api key goes here"
}
```

Next, create Splunk On-Call resources. Paste the following into the TF file:

```
# Create a team within victorops
resource "victorops_team" "team" {
name = "DevOps-Test"
}
# Create a user within the victorops organization
resource "victorops_user" "user1" {
first_name       = "John"
last_name        = "Doe"
user_name        = "john.doe-test"
email            = "john.doe@example.org"
is_admin         = "false"
}
# Assign user to a team
resource "victorops_team_membership" "test-membership" {
team_id          = victorops_team.team.id
user_name        = victorops_user.user1.user_name
}
# Create email contact method for a user
resource "victorops_contact" "contact_email" {
user_name    = victorops_user.user1.user_name
type         = "email"
value        = "john.doe2@example.org"
label        = "test email"
}
# Create phone number contact method for a user
resource "victorops_contact" "contact_phone" {
user_name    = victorops_user.user1.user_name
type         = "phone"
value        = "+12345678900"
label        = "test phone"
}
# Create an Escalation Policy for the team
resource "victorops_escalation_policy" "devops_high_severity" {
name    = "High Severity"
team_id = victorops_team.team.id
step {
timeout = 0
entries = [
{
type = "user"
username = "john.doe-test"
}
]
}
}
# Create a Routing Key that uses the above Escalation Policy
resource "victorops_routing_key" "infrastructure_high_severity" {
name = "infrastructure-high-severity"
targets = [victorops_escalation_policy.devops_high_severity.id]
}
```



.. note:: The Terraform provider calls Splunk On-Call's public API. For that reason, only user-level users can be created through Terraform at this time. Edits to a user's permissions levels need to be done through the UI once the user has been created.

The comments within the previous code describe what each block does. For more information for each of the resources being used, see the `Provider
documentation <https://registry.terraform.io/providers/splunk/victorops/latest/docs>`__ on GitHub.

Save the file and type the following command in the terminal:

```
terraform plan
```

This results in a summary of the resources that Terraform can create.

Next, to initiatiate the creation of the resources in Splunk On-Call, type the
following command:

```
terraform apply
```

Type ``yes`` to approve and see an output similar to the following:

```
victorops_team.team: Creating...
victorops_user.user1: Creating...
victorops_team.team: Creation complete after 1s [id=team-0mnx4iUkiP2OkqCt]
victorops_escalation_policy.devops_high_severity: Creating...
victorops_user.user1: Creation complete after 2s [id=john.doe-test]
victorops_contact.contact_email: Creating...
victorops_team_membership.test-membership: Creating...
victorops_contact.contact_phone: Creating...
victorops_escalation_policy.devops_high_severity: Creation complete after 1s [id=pol-tRi4Mn8fyGoN6p8b]
victorops_routing_key.infrastructure_high_severity: Creating...
victorops_contact.contact_phone: Creation complete after 1s [id=554c80cf-b6b7-465d-ab9f-0884b41a98fc]
victorops_contact.contact_email: Creation complete after 1s [id=a56f04be-04fa-4edb-a349-1705e1ac5a1c]
victorops_routing_key.infrastructure_high_severity: Creation complete after 1s [id=infrastructure-high-severity]
victorops_team_membership.test-membership: Creation complete after 2s [id=team-0mnx4iUkiP2OkqCt_john.doe-test]
Apply complete! Resources: 7 added, 0 changed, 0 destroyed.
```

Log in to Splunk On-Call and select the Teams tab. Confirm that a new Team has been created with the name ``DevOps-Test`` or the name you provided for the team in the config file.

Within the team, see the User and Escalation Policy as defined in the config file and a Routing Key
under :guilabel:`Settings`, :guilabel:`Routing Key` tab.
