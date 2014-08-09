function getJSONData($type, $url, $param)
{
    var $objJSON;
    //console.log("type "+$type+"...url "+$url+"...param "+$param);
    $.ajax({
           type: $type,
           url: $url,
           data: ($param) ? $param : '',
           contentType: "application/json; charset=utf-8",
           //contentType: "application/x-www-form-urlencoded",
           dataType: "json",
           async: false,
           success: function (response)
           {
             //console.log("getJSONData response --> " + response);
             $objJSON = response;
           },
           error: function (jqXHR, textStatus, errorThrown)
           {
            //console.log("getJSONData response --> error : getJSONData ( " + jqXHR.status + " textStatus: " + textStatus + " errorThrown : " + errorThrown+")");
            $objJSON = null;
           }
    });
    //console.log("END --> getJSONData");
    return $objJSON;
}