
$(document).ready(function () {


    $('.metrics-table').each(function () {

        $(this).append('<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>');

    });

    $.ajaxSetup({
        cache: true
    });

    let converter = new showdown.Converter();

    $.getScript('https://public-sites--signalfx-com.s3.us-east-1.amazonaws.com/cdn/integrations-docs/integrations-docs.js', function () {
        $('.metrics-table').each(function () {

            let monitorKey = $(this).attr('type');
            let monitor = window.pluginMetrics[monitorKey];

            $(this).html("<div class='monitor-separator'></div>");
            $(this).append("<table class='monitor-stats docutils'></table>");


            try {
                if ($(this).attr('include') === 'markdown') {
                    let htmlFromMkd = converter.makeHtml(window.integrationsDocumentation[$(this).attr('type')]['markdown']);
                    let htmlPieces = htmlFromMkd.split('<h2 id="metrics">Metrics</h2>');

                    $(this).append(htmlPieces[1]);
                }
            } catch (err) {
                console.log(err);
            }


            $(this).find('.monitor-stats').append("<thead>\n" +
                "<tr>\n" +
                "<th>Metric Name</th>\n" +
                "<th>Description</th>\n" +
                "<th>Type</th>\n" +
                "</tr>\n" +
                "</thead>");

            if(!monitor){
                for(let x in window.metricDocumentation){
                    if(window.metricDocumentation[x]['yaml']['monitor'] === monitorKey && monitorKey !== ''){
                        $(this).find('.monitor-stats').append("<tr>" +
                            "<td>" + x + "</td>" +
                            "<td>" + converter.makeHtml(window.metricDocumentation[x]['markdown']) + "</td>" +
                            "<td>" + window.metricDocumentation[x]['yaml']['metric_type'] + "</td>" +
                            "</tr>");
                    }
                }
            }else{
                for (let x in monitor) {
                    try {
                        $(this).find('.monitor-stats').append("<tr>" +
                            "<td>" + monitor[x] + "</td>" +
                            "<td>" + converter.makeHtml(window.metricDocumentation[monitor[x]]['markdown']) + "</td>" +
                            "<td>" + window.metricDocumentation[monitor[x]]['yaml']['metric_type'] + "</td>" +
                            "</tr>");
                    } catch (err) {
                        console.log(err);
                    }
                }
            }

        });
    });


    monitorsFromRaw();

    function coalesce() {
        return [].find.call(arguments, x => x !== null && x !== undefined);
    }

    function monitorsFromRaw() {
        try {
            let columnMap = {
                'title': 'Name',
                'description': 'Description',
                'metric_type': 'Type',
                'type': 'Type',
                'category': 'Category',
                'custom': 'Category',
                'default': 'Category',
            };

            let converter = new showdown.Converter();
            let cache = [];
            let idMap = [];

            function getDataFromObject(data,type) {

                let metrics;
                try {
                    metrics = data.monitors[0][type];
                    try{
                        let overridemetrics = data.common[type];
                        metrics = overridemetrics ? overridemetrics : metrics;
                    }catch(err){
                        //console.log(err);
                    }
                } catch (err) {
                    //console.log(err);
                    if(type == 'metrics'){
                        metrics = data;
                    }
                }

                return metrics;
            }

            function getDocFromObject(data) {
                let doc;
                try {
                    doc = data.monitors[0].doc;
                } catch (err) {
                    doc = '';
                }
                return doc;
            }

            function traverseFields(mainObj, data, preRef = '', h2Text = '') {

                let id =  "monitor-stats-" + data['type'].replace(/[^0-9A-Z]+/gi, "");
                idMap[id] = (idMap[id] !== undefined) ? (idMap[id] + 1) : 0;
                id += idMap[id] > 0 ? '-' + idMap[id] : '';


                if (preRef != '' && h2Text != '') {
                    $(mainObj).append('<h2 class="sub-table-heading" id="' + preRef + '-table">Attributes of <i>' + h2Text + '</i></h2>');
                }

                let table = "<table style='width: 100%' class='monitor-stats docutils monitor-stats-standard' id='" + id + "'>" +
                        "<thead>" +
                            "<th class='head name-head'>Name</th>" +
                            "<th class='head type-head'>Type</th>" +
                            "<th class='head kind-head'>Kind</th>" +
                            "<th class='head description-head'>Description</th>" +
                        "</thead>" +
                    "<tbody></tbody>";

                $(mainObj).append(table);

                let newObject = $(mainObj).find('#' + id);

                for (let i in data['fields']) {

                    let rowId = id + '-' + data['fields'][i]['name'];

                    let row = "<td id='" + rowId + "'>" + data['fields'][i]['name'] + "</td><td>" + coalesce(data['fields'][i]['type'], '') + "</td><td>" + coalesce(data['fields'][i]['kind'], '') + "</td><td>" + coalesce(converter.makeHtml(data['fields'][i]['doc']), '') + "</td>";
                    newObject.append('<tr>' + row + '</tr>');

                    if (data['fields'][i]['fields'] !== undefined) {
                        traverseFields(mainObj, data['fields'][i], rowId, data['fields'][i]['name']);
                        newObject.find('#' + rowId).html(data['fields'][i]['name'] + ' (<a href="#' + rowId + '-table">see attributes</a>)');
                    }
                }
            }

            $('.metrics-standard').each(function () {

                let url = $(this).attr('url');
                let metricsYamlObject = $(this);

                try {

                    let client = new XMLHttpRequest();
                    client.open('GET', url);
                    client.onreadystatechange = function () {

                        const result = jsyaml.load(client.responseText, 'utf8');
                        if (result != null && !cache[result.type]) {

                            metricsYamlObject.append(traverseFields(metricsYamlObject, result));
                            cache[result.type] = true;

                        }

                    }
                    client.send();


                } catch (e) {
                    console.log(e);
                }

            });

            $('.metrics-yaml').each(function () {

                let url = $(this).attr('url');
                let metricsYamlObject = $(this);
                let category = $(this).attr('category');

                try {

                    var client = new XMLHttpRequest();
                    client.open('GET', url);
                    client.onreadystatechange = function() {

                        const result = jsyaml.load(client.responseText, 'utf8');
                        //console.log(result);
                        loadYamls(result);

                    }
                    client.send();


                } catch (e) {
                    console.log(e);
                }


                function loadYamls(result) {

                    let monitors = getDataFromObject(result,'metrics');

                    let doc = getDocFromObject(result);

                    let columns = [];
                    columns['title'] = 'Name';

                    for (let i in monitors) {
                        for (let j in monitors[i]) {
                            if (typeof columns[j] !== 'undefined') {
                                continue;
                            } else {
                                if (monitors[i][j] != null && columnMap[j] != null && monitors[i][j] != '') {
                                    columns[j] = columnMap[j];
                                }
                            }
                        }
                    }

                    let header = '';

                    for (let i in columns) {
                        header += '<th>' + columns[i] + '</th>';
                    }

                    if(category == 'included'){
                        header += '<th>Category</th>';
                    }

                    metricsYamlObject.html("<div class='monitor-separator'></div>");
                    if (doc != '') {
                        //metricsYamlObject.append("<div>" + converter.makeHtml(doc) + "</div>");
                    }
                    metricsYamlObject.append("<table class='monitor-stats docutils'></table>");
                    metricsYamlObject.find('.monitor-stats').append("<thead>\n" + header + "</thead>");

                    for (let i in monitors) {
                        let row = '';
                        let addedCategory = false;

                        for (let j in columns) {

                            if (j == 'category') {
                                addedCategory = true;
                                monitors[i][j] = monitors[i][j] ? 'Default' : '';
                            } else if (j == 'default') {
                                addedCategory = true;
                                monitors[i][j] = (monitors[i][j] == true) ? 'Default' : '';
                            } else if (j == 'custom') {
                                addedCategory = true;
                                monitors[i][j] = (monitors[i][j] == true) ? 'Custom' : '';
                            }

                            if (typeof monitors[i][j] == 'undefined' && j == 'title') {
                                row += '<td>' + i + '</td>';
                            } else {
                                row += '<td>' + monitors[i][j] + '</td>';
                                //row += '<td>' + converter.makeHtml(monitors[i][j]) + '</td>';
                            }
                        }

                        if(!addedCategory && category == 'included'){
                            row += '<td>Included</td>';
                        }

                        metricsYamlObject.find('.monitor-stats').append("<tr>" + row + "</tr>");

                    }


                    let extradata = ['dimensions','properties'];

                    for(let i in extradata){
                        let newData = getDataFromObject(result,extradata[i]);

                        if(newData){

                            let heading = '<p class="heading-title">' + extradata[i] + '</p>';
                            let header = '<th>Name</th><th>Description</th>';
                            let classTable = 'monitor-dimensions-' + extradata[i];
                            metricsYamlObject.append(heading + "<table class='monitor-stats docutils " + classTable + "'></table>");
                            metricsYamlObject.find('.' + classTable).append("<thead>\n" + header + "</thead>");
                            let rows = '';

                            for(let i in newData){
                                rows += '<tr><td>' + i + '</td><td>' + newData[i].description + '</td></tr>';
                            }

                            metricsYamlObject.find('.' + classTable).append(rows);

                        }
                    }

                }
            });
        } catch (err) {
            console.log(err);
        }
    }

// this is just a comment
});