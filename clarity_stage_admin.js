(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "id",
            alias: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "createdUtc",
            alias: "Created UTC",
            dataType: tableau.dataTypeEnum.datetime
        },{
            id: "updatedUtc",
            alias: "Updated UTC",
            dataType: tableau.dataTypeEnum.datetime
        },{
            id: "datasetId",
            alias: "Dataset Id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "fileId",   
            dataType: tableau.dataTypeEnum.float
        },{
            id: "filename",
            alias: "File Name",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "size",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "user",
            alias: "User",
            dataType: tableau.dataTypeEnum.string
        },{
           id: "lastStateChangeHours",
           alias: "Last State Change Hours",
           dataType: tableau.dataTypeEnum.float 
        },{
            id: "source",
            alias: "Source",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "state",
            alias: "State",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "workflowType",
            alias: "Workflow Type",
            dataType: tableau.dataTypeEnum.string
        }];
    
        var tableSchema = {
            id: "clarityV2",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
    };

    myConnector.getData = function(table, doneCallback) {
        //$.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson", function(resp) {
            $.getJSON("https://admin.stage.clarity.trimble.com/workflows?code=ad7886f7-c3f7-45de-b189-d898f595d0bc&pageSize=50000", function(resp) {
            var feat = resp,
                tableData = [];
    
            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                id = feat[i].set,
                createdUtc = feat[i].createdUtc,
                updatedUtc = feat[i].updatedUtc,
                datasetId = feat[i].datasetId,
                fileId = feat[i].fileId,
                filename = feat[i].filename,
                size = feat[i].size,
                user = feat[i].user,
                lastStateChangeHours = feat[i].lastStateChangeHours,
                source = feat[i].source,
                state = feat[i].state,
                workflowType = feat[i].workflowType

                tableData.push({
                    "id": id,
                    "createdUtc": createdUtc,
                    "updatedUtc": updatedUtc,
                    "datasetId": datasetId,
                    "fileId": fileId,
                    "filename": filename,
                    "size": size,
                    "user": user,
                    "lastStateChangeHours": lastStateChangeHours,
                    "source": source,
                    "state": state,
                    "workflowType": workflowType
                });
            }
    
            table.appendRows(tableData);
            doneCallback();
        });

    };

    tableau.registerConnector(myConnector);
    
    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Clarity Processing Feed";
            tableau.submit();
        });
    });
})();