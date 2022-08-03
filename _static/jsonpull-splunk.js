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


});