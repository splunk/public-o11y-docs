---
title: "Team Admin Training"
date: "2020-09-22"
---

**NOTE:** New to Splunk On-Call? A great place to get acquainted with the platform is through our _User Training_ documentation, found [here](https://help.victorops.com/knowledge-base/user-training/). Once you familiarize yourself with your User permissions, come back to this article to learn about your increased responsibilities as a Team Admin.

### **Your Role as a Team Admin**

A user can be elevated to a Team Admin for one or more teams. Likewise, there may be multiple Team Admins within a single team. As a Team Admin, you're responsible for a team's on-call schedules, escalation policies, and the overall management of the users who are apart of your team.

### **Your Permissions as a Team Admin**

Permissions for the Team-Admin are limited to the team or teams that you've been assigned to. As Team Admin, you may take any of the following actions:

<table style="height: 131px; border-color: #454343; background-color: #0a0101;" border="2" width="306"><tbody><tr><td style="width: 296.023px; text-align: left;"><strong>Permissions specific to a Team Admin</strong></td></tr><tr><td style="width: 296.023px; text-align: left;">Invite Users to Your Team</td></tr><tr><td style="width: 296.023px; text-align: left;">Edit Team Members Paging Policies</td></tr><tr><td style="width: 296.023px; text-align: left;">Create/Edit/Delete Schedules</td></tr><tr><td style="width: 296.023px; text-align: left;">Create/Assign Scheduled Overrides for Team Members</td></tr></tbody></table>

**View all [User Roles and Permissions!](https://help.victorops.com/knowledge-base/user-roles-and-permissions/)**

### **Your Resources as a Team Admin**

**Knowledge Base:** Splunk On-Call has an extensive [Knowledge Base](https://help.victorops.com/) that is always a good place to start if you are unsure how something works or are in need of some tips! A whole section on scheduling can be found [here](https://help.victorops.com/article-categories/scheduling/)!

**Contact Us:** All users have the ability to reach out to Splunk On-Call support at any time with any questions!

**1.**  **Live Chat:** If you are logged into your Splunk On-Call instance, you will have the ability to Live Chat with the Splunk On-Call Support team.

**2.**  **Splunk Support Portal:** You can open a Splunk On-Call support case in the Splunk Support Portal:[https://login.splunk.com/](https://login.splunk.com/)

**If you are facing any issues when trying to contact us please have a look [HERE](https://help.victorops.com/knowledge-base/important-splunk-on-call-support-changes-coming-nov-11th/)!**

### **Recommendations to be a Successful Team Admin:** 

1. **Setup your profile and familiarize yourself with the Splunk On-Call web and mobile platforms:** As a Team Admin, it's your responsibility to ensure that you and the members of your team are familiar with the Splunk On-Call platform.
2. **Learn your Internal Resources in Splunk On-Call:** On the Users tab, you can see specific user roles and find out who your Global Admins or Alert Admins are within your organization. _NOTE: You will need to be familiar with your admins for configuration assistance outside of your permissions._
3. **Set up your Personal Paging Policies: Your paging policy determines how Splunk On-Call notifies you of an incident. **Quick video on [Personal Paging Polices](https://share.vidyard.com/watch/gpRuaMFxCK8wZyB9oFRXBA?)****!****
    
    **♦** **Best Practice Tip** **♦ Your Primary Paging Policy should be the loudest and most attention-grabbing notification method. We recommend a diverse paging policy (Push, SMS, Phone) with multiple steps to avoid single points of notification failure. Use a custom paging policy for a configured period time, a time that may not require such aggressive paging (i.e. during business hours).**
    
4. **Learn and understand the difference between a Rotation, Shifts, and Escalation Policies:** It is crucial as a Team Admin to understanding how _rotations, shifts, and escalation policies_ interact and depend on one another. 
    
    **♦** **Best Practice Tip** **♦** Taking the time to understand the relationship between these functions will help you determine the most effective way to configure your team's on-call schedule.
    
5. **Map out your team's schedule before configuring it in Splunk On-Call:** Using a spreadsheet or a whiteboard to map out your team's on-call schedule will help you visualize the schedule and determine what kind of rotations and shifts to use.
    
    **♦** **Best Practice Tip** **♦** Keep your rotations as simple as possible, preferably with a continuous rotation of the same users to make your on-call schedule easy to manage. Remember that you can leverage scheduled overrides to address holidays or schedule conflicts.
    
6. **Invite your Users to your Team: Add all necessary users to your team. _NOTE: If a team member is not yet in Splunk On-Call you will need a Global Admin to invite them if the Team Admin role has been restricted from inviting users to Splunk On-Call_. **Quick video on [Adding Users in Splunk On-Call](https://share.vidyard.com/watch/Qsz3gv47pTC4dkhV1zpWaU?) & [Removing Users in Splunk On-Call](https://share.vidyard.com/watch/1dXmEF5dGyKbLfc7z5xu3Z?)!****
7. **Create your team's schedule** **in Splunk On-Call: Following the schedule you mapped out, build your on-call schedule in Splunk On-Call.** **Quick video on [shifts & rotations](https://share.vidyard.com/watch/XGXQDBDWfoYyw31F2xnuhG?)!**
8. **Setup your team's Escalation Policies:** There are quite a few actions Escalation Policies are able to initiate, take some time to understand what each action does. **Quick video on Escalation Policies!**
    
    **♦** **Best Practice Tip** **♦** When creating escalation policies keep a naming convention that allows others to know which escalation policies belong to your team. Most mapping/callout actions within Splunk On-Call are tied to Escalation Policies.
    
    **♦** **Best Practice Tip** **♦** Use the escalation “Page Entire Team” sparingly or as the very last step in an Escalation Policy to avoid notification fatigue.
    
9. **Connect with a Global or Alert Admin to create your team's routing key(s):** Once you are ready for alerts to be routed to your team, you will need a Global or Alert Admin to create routing key(s) for your team's Escalation Policies. _Tip: you can find user roles under the Users tab_ 
    
    **♦** **Best Practice Tip** **♦** Request that your routing key name(s) follow your Escalation Policy naming convention. 
    
10. **Understand Scheduled Overrides & Manual Takes:** As a Team Admin, you have permissions to manage scheduled overrides for users on your team. **Quick video on [Scheduled Overrides](https://share.vidyard.com/watch/5W1zAqWnYD8aXsi9XPwtbt?) & [Manual Takes](https://share.vidyard.com/watch/Jfm3pcAxRkpw8bQE4JF91i?)!**
    
    **♦** **Best Practice Tip** **♦** _Scheduled overrides_ should be used for planned absences, whereas _Manual takes_ should only be used for last-minute coverage needs.
    

### **Team Admin Checklist**

![](images/Screen-Shot-2020-11-12-at-8.32.14-AM.png)
