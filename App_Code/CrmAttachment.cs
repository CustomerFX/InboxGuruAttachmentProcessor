using System;
using Saleslogix.SData.Client;

[SDataPath("attachments")]
public class CrmAttachment
{
    [SDataProtocolProperty(SDataProtocolProperty.Key)]
    public string Id { get; set; }

    public string Description { get; set; }
}