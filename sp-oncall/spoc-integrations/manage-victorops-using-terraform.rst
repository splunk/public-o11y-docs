**HashiCorp Terraform**
-----------------------

`HashiCorp's Terraform <https://terraform.io>`__ has emerged as a
powerful tool for managing infrastructure as code. Teams can fully
describe an application's infrastructure needs such as physical
machines, VMs, containers and more using configuration files. This
allows the application infrastructure to be version controlled, reducing
human errors during deployments.

**Splunk On-Call and Terraform**
--------------------------------

Terraform modules and providers are extensions that allow configuring
applications that a service depends on. For example monitoring tools,
on-call, communications etc.

Using the HashiCorp verified `Splunk On-Call Terraform
provider <https://registry.terraform.io/providers/splunk/victorops/latest>`__,
teams can fully automate the Splunk On-Call setup steps associated with
an application. A common scenario our customers run into when deploying
a new service is to also ensure Splunk On-Call is configured to page
appropriate users with alerts related to the service. With Terraform,
this can be fully automated in a declarative way, ensuring that the new
service is properly monitored with Splunk On-Call from day 1.

In this post, we will use the Splunk On-Call Terraform provider to
create the following resources, without logging into Splunk On-Call:

1. User
2. Team
3. Assign User to Team
4. Escalation Policies
5. Routing Keys

Note that you can also manage existing Splunk On-Call resources or
destroy them with this provider, but we will focus on resource creation
in this post.

Steps to get started
--------------------

If you don't already have Terraform installed, go through the
instructions here:
https://learn.hashicorp.com/tutorials/terraform/install-cli

**Once Terraform is installed, verify you are running the latest version
by entering the following command in the terminal.**

$ terraform version Terraform v0.13.2

**Next, create a new file named victorops.tf and paste the following in
the file:** 

# Install VictorOps Terraform Provider terraform { required_providers {
victorops = { source = “splunk/victorops” version = “0.1.1” } } }

**Save the file and type following in the terminal.**

$ terraform init

This should download and install the Splunk On-Call Terraform provider
automatically, from the Terraform Registry.

The provider communicates with Splunk On-Call using the `REST
API <https://portal.victorops.com/public/api-docs.html>`__, so we need
to provide it with an API key. Here are the instructions to find your
organization's API key: https://help.victorops.com/knowledge-base/api/

**Copy the API Id and API Key from Splunk On-Call and paste it in the
following format.**

provider “victorops” { api_id  = “your api id goes here” api_key = “your
api key goes here” }

**Next, we will start creating Splunk On-Call resources. Paste the
following into the file.**

**Note that the Terraform provider calls Splunk On-Call's public API.
For that reason, only user-level users can be created through Terraform
at this time. Edits to a user's permissions levels will need to be done
through the UI once the user has been created.**

# Create a team within victorops resource “victorops_team” “team” { name
= “DevOps-Test” } # Create a user within the victorops organization
resource “victorops_user” “user1” { first_name       = “John” last_name 
      = “Doe” user_name        = “john.doe-test” email            =
“john.doe@example.org” is_admin         = “false” } # Assign user to a
team resource “victorops_team_membership” “test-membership” { team_id   
      = victorops_team.team.id user_name        =
victorops_user.user1.user_name } # Create email contact method for a
user resource “victorops_contact” “contact_email” { user_name    =
victorops_user.user1.user_name type         = “email” value        =
“john.doe2@example.org” label        = “test email” } # Create phone
number contact method for a user resource “victorops_contact”
“contact_phone” { user_name    = victorops_user.user1.user_name type    
    = “phone” value        = “+12345678900” label        = “test phone”
} # Create an Escalation Policy for the team resource
“victorops_escalation_policy” “devops_high_severity” { name    = “High
Severity” team_id = victorops_team.team.id step { timeout = 0 entries =
[ { type = “user” username = “john.doe-test” } ] } } # Create a Routing
Key that uses the above Escalation Policy resource
“victorops_routing_key” “infrastructure_high_severity” { name =
“infrastructure-high-severity” targets =
[victorops_escalation_policy.devops_high_severity.id] }

The comments within the code above describe what each block does. For
more detailed documentation for each of the resources being used, visit
our `Provider
documentation <https://registry.terraform.io/providers/splunk/victorops/latest/docs>`__: 

**Save the file and type the following command in the terminal.**

$ terraform plan

This should result in a summary of the resources that Terraform will
create. 

**Next, to execute creation of the resources in Splunk On-Call, type the
following:**

$ terraform apply

You should see an output similar to terraform plan, this time with a
prompt to confirm execution.

Do you want to perform these actions?   Terraform will perform the
actions described above.   Only ‘yes' will be accepted to approve.
  **Enter a value:** 

**Type yes to approve and you should see output as follows:**

victorops_team.team: Creating… victorops_user.user1: Creating…
victorops_team.team: Creation complete after 1s
[id=team-0mnx4iUkiP2OkqCt]
victorops_escalation_policy.devops_high_severity: Creating…
victorops_user.user1: Creation complete after 2s [id=john.doe-test]
victorops_contact.contact_email: Creating…
victorops_team_membership.test-membership: Creating…
victorops_contact.contact_phone: Creating…
victorops_escalation_policy.devops_high_severity: Creation complete
after 1s [id=pol-tRi4Mn8fyGoN6p8b]
victorops_routing_key.infrastructure_high_severity: Creating…
victorops_contact.contact_phone: Creation complete after 1s
[id=554c80cf-b6b7-465d-ab9f-0884b41a98fc]
victorops_contact.contact_email: Creation complete after 1s
[id=a56f04be-04fa-4edb-a349-1705e1ac5a1c]
victorops_routing_key.infrastructure_high_severity: Creation complete
after 1s [id=infrastructure-high-severity]
victorops_team_membership.test-membership: Creation complete after 2s
[id=team-0mnx4iUkiP2OkqCt_john.doe-test] Apply complete! Resources: 7
added, 0 changed, 0 destroyed.

**Login to Splunk On-Call and click on the Teams tab. You should see a
new Team created with the name “*DevOps-Test*” (or the name you provided
for the team in config file). Within the team you should see the User
and Escalation Policy as defined in the config file and a Routing Key
under Settings–>\ Routing Key tab.**

This was a basic demonstration of what you can do with the new Splunk
On-Call Terraform Provider. Check out more detailed documentation here:
https://registry.terraform.io/providers/splunk/victorops/latest

To use the Splunk On-Call provider with your team, sign up for
`Terraform Cloud <https://app.terraform.io/signup/account>`__.

**Feedback**
------------

If you have feedback please visit https://ideas.splunk.com/ where you
can submit and vote on enhancements to any Splunk product!
