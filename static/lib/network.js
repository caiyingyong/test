


// var newHost = "http://www.yeliemin.com:8106";
// var newHost = "http://localhost:9106";
var newHost = "http://dev.gewuit.com:9106";

/**
 * 新的接口get请求
 * @param url
 * @param success
 * @param error
 */
function getJson(url,data,success,error) {
    console.log(newHost+url);
    $.ajax({
        type:"get",
        data:data,
        url:newHost+url,
        contentType:"application/x-www-form-urlencoded",
        dataType:'json',
        success:success,
        error:error
    })
}
/**
 * 新的接口post请求
 * @param url
 * @param data
 * @param success
 * @param error
 */
function postJson(url,data,success,error) {
    $.ajax({
        type:'post',
        data:data,
        url:newHost+url,
        contentType:"application/x-www-form-urlencoded",
        dataType:"json",
        success:success,
        error:error
    })
}
