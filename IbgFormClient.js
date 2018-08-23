/* 

    InboxGuruAttachmentProcessor Form Client API 
    --------------------------------------------
    Include file attachments for InboxGuru Landing Page forms to create attachments in Infor CRM

    See full details & license here: 
    https://github.com/CustomerFX/InboxGuruAttachmentProcessor

    Copyright (c) 2018 Customer FX Corporation 

*/

function setupIbgProcessor() {
    if (!setupDataIdField()) {
        document.write('<span style="color:red;">Form is not set up correctly, could not locate hidden field with data-id="match"</span>');
    }

    setupIbgForm();
}

function getIbgProcessorUrl() {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].getAttribute('src').toLowerCase().indexOf('ibgformclient.js') !== -1) {
            var path = scripts[i].src.split('?')[0];
            return path.split('/').slice(0, -1).join('/') + '/IbgProcessor.aspx';
        }
    }
}

function getIbgForm() {
    var forms = document.getElementsByTagName('form');
    for (var i = 0; i < forms.length; i++) {
        if (forms[i].getAttribute('action').toLowerCase().indexOf('inbox.guru') !== -1) {
            return forms[i];
        }
    }
}

function hasFileInputs() {
    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].getAttribute('type').toLowerCase() === 'file') {
            return true;
        }
    }
}

function setupIbgForm() {
    var form = getIbgForm();
    if (!form) return;

    form.setAttribute('action', getIbgProcessorUrl());
    form.setAttribute('enctype', 'multipart/form-data');
}

function setupDataIdField() {
    if (!hasFileInputs()) return true;

    var inputs = document.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].getAttribute('type').toLowerCase() !== 'hidden') continue;
        var dataId = inputs[i].getAttribute('data-id');
        if (dataId && dataId.toLowerCase().indexOf('match') !== -1) {
            var id = createGuid();
            inputs[i].value = id;
            
            var match = document.createElement('input');
            match.setAttribute('type', 'hidden');
            match.setAttribute('name', 'ibgMatchField');
            match.setAttribute('value', id);
            getIbgForm().appendChild(match);

            return true;
        }
    }
}

function createGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

// Mozilla, Opera, Webkit 
if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', function () {
        document.removeEventListener('DOMContentLoaded', arguments.callee, false);
        setupIbgProcessor();
    }, false);

    
} // If IE event model is used
else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', function () {
        if (document.readyState === 'complete') {
            document.detachEvent('onreadystatechange', arguments.callee);
            setupIbgProcessor();
        }
    });
}