/* 

    InboxGuruAttachmentProcessor  
    ----------------------------
    Include file attachments for InboxGuru Landing Page forms to create attachments in Infor CRM

    See full details & license here: 
    https://github.com/CustomerFX/InboxGuruAttachmentProcessor

    Copyright (c) 2018 Customer FX Corporation 

*/

using System;
using System.Linq;
using System.Text;
using System.Web.Configuration;
using Saleslogix.SData.Client;
using Saleslogix.SData.Client.Framework;

public partial class IbgProcessor : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        HandleFileAttachments();
        RedirectToInboxGuru();
    }

    private void HandleFileAttachments()
    {
        if (!Request.Form.AllKeys.Contains("ibgMatchField") || string.IsNullOrEmpty(Request.Form["ibgMatchField"])) return;

        var matchValue = Request.Form["ibgMatchField"];
        if (string.IsNullOrEmpty(matchValue)) return;

        var client = new SDataClient(SDataUrl)
        {
            UserName = SDataUser,
            Password = SDataPassword
        };

        foreach (string fileKey in Request.Files)
        {
            var file = Request.Files[fileKey];
            if (file == null || file.ContentLength == 0) continue;
            
            var attachment = new AttachedFile(null, file.FileName, file.InputStream);
            client.Execute(new SDataParameters
            {
                Method = HttpMethod.Post,
                Path = "attachments",
                Content = new CrmAttachment { Description = matchValue },
                Files = { attachment }
            });
        }
    }

    private void RedirectToInboxGuru()
    {
        Response.Clear();

        var sb = new StringBuilder();
        sb.Append("<html>");
        sb.Append("<body onload='document.forms[\"ibgsubmitform\"].submit();'>");
        sb.Append("<form name='ibgsubmitform' action='https://r.inbox.guru/lc.aspx' method='post'>");

        foreach (string key in Request.Form.Keys)
        {
            if (key == "ibgMatchField") continue;
            sb.AppendFormat("<input type='hidden' name='{0}' id='{0}' value='{1}'>", key, Request.Form[key]);
        }

        sb.Append("</form>");
        sb.Append("</body>");
        sb.Append("</html>");

        Response.Write(sb.ToString());
        Response.End();
    }

    private string SDataUrl
    {
        get
        {
            var url = GetConfigValue("SDataUrl");
            if (!url.EndsWith("/")) url += "/";
            url += "slx/system/-/";
            return url;
        }
    }

    private string SDataUser
    {
        get { return GetConfigValue("SDataUser"); }
    }

    private string SDataPassword
    {
        get { return GetConfigValue("SDataPassword"); }
    }

    private string GetConfigValue(string key)
    {
        return WebConfigurationManager.AppSettings[key];
    }
}