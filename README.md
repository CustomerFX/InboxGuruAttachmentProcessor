# InboxGuruAttachmentProcessor
Include file attachments for InboxGuru Landing Page forms to create attachments in Infor CRM

How this works is as follows. The included code is an ASP.NET website that you will need to host on an IIS server somewhere. It hijacks the request from InboxGuru forms, and adds any attachments to Infor CRM, then passes the request off to InboxGuru normally to process the data and create a Lead or Contact as defined for the form. 

It does this by adding a unique value to the form, which is passed along with the data to both the attachment record and the data to InboxGuru. When InboxGuru then synchronizes the Lead or Contact to Infor CRM, a SQL trigger will link the already created attachment with the newly created Lead or Contact. 

> ***Note*:** This code uses USERFIELD1 on the LEAD/CONTACT table for storing the unique ID value needed to link the attachment with the lead/contact. If you are using USERFIELD1 for some other purpose, modify the included triggers to use some other field instead.

**To set up the IbgProcessor ASP.NET website:**

1. Unzip the attached on an IIS server and set up as an ASP.NET application
2. Modify the web.config with your SData URL and a valid Infor CRM username & password 
3. Use the triggers in the Database folder to create the LEAD or CONTACT table triggers as necessary *in your Infor CRM database*

**To use this on an InboxGuru Landing Page/Form**

1. You **must** include a hidden field on your InboxGuru forms that is mapped to either LEAD.USERFIELD1 or CONTACT.USERFIELD1

2. Then, in the HTML for the InboxGuru form you must locate this hidden field created for step 1 and add the attribute data-id='match' to it. For example, if the hidden field looks like this: 

`<input type='hidden' name='071-6324b7db-cf5a-4aaa-af46-31a93d201033' value=''>`

Change it to this: 

`<input type='hidden' name='071-6324b7db-cf5a-4aaa-af46-31a93d201033' value='' data-id='match'>`

3. Now, add the javascript file IbgFormClient.js from the items set up for the IbgProcessor above to your HTML file containing the InboxGuru form. For example, add the following:

`<script type="text/javascript" src="http://mywebserver/IbgProcessor/IbgFormClient.js"></script>`

4. You can now include file upload elements to the InboxGuru form (note, you can add a single file element or multiple). For example, add the following: 

`<input id='attachment' name='attachment' type='file' />`

That is all. Now, when the form is submitted, the IbgProcessor will first handle the request and add any attachments to the Infor CRM system. Then, when the Lead or Contact is sent from InboxGuru the trigger will link the attachment to the newly created Lead or Contact.

Copyright (c) 2018 Customer FX Corporation 
[customerfx.com](https://customerfx.com)
