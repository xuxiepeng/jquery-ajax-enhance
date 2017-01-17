/**
 * Created by kun on 1/15/17.
 */
function im() {}

im.prototype={
    /**
     * 判断是同步还是异步，默认是异步。
     * @param async
     * @returns {string}
     */
    isAsync:function (async) {
        return      (async==null || async=="" || typeof(async)=="undefined")? "true" : async;
    },
    /**
     * 判断请求类型，如果使用都没有传请求类型，默认是:post
     * @param type 保存请求类型
     * @returns {string}
     */
    type:function (type) {
        return (type==null || type=="" || typeof(type)=="undefined")? "post" : type;
    },
    /**
     * 返回数据类型，如果不指定，默认是json
     * @param dataType
     * @returns {string}
     */
    dataType:function (dataType) {
        return (dataType==null || dataType=="" || typeof(dataType)=="undefined")? "json" : dataType;
    },
    /**
     * 判断是否有数据，默认值：当前日期
     * @param data
     * @returns {{date: number}}
     */
    data:function (data) {
        return (data==null || data=="" || typeof(data)=="undefined")? {"date": new Date().getTime()} : data;
    },
    /**
     * 是否为一个函数
     * @param callback
     * @returns {boolean}
     */
    isFun:function (callback) {
        return typeof callback === "function" ? true: false;
    },
    /**
     * 是否为一个字符串
     * @param string
     * @returns {boolean}
     */
    isStr:function (string) {
        return (typeof string == "string") ? true : false;
    },
    /**
     * 执行成功的请求参数
     * @param data 服务器端返回数据
     * @param status 返回状态
     * @param xhr
     * @param callback 回调函数
     */
    execSuccess:function (data, status, xhr,callback){
        if(im.isFun(callback))
        {
            callback(data,status,xhr);
        }
        else if(im.isStr(callback))
        {
            alert(callback);
        }
        else if(im.isStr(data.msg))
        {
            alert(data.msg);
        }
        else
        {
            alert("Error:No infomation to show.")
        }
    },
    /**
     * 执行失败请求函数
     * @param xhr
     * @param status
     * @param error
     * @param callback
     */
    execError:function(xhr,status,error,callback)
    {
        if(im.isFun(callback))
        {
            callback(data,status,xhr);
        }
        else if(im.isStr(callback))
        {
            alert(callback);
        }
        else
        {
            alert(status);
        }
    },
    //设置一些全局配置
    init:function () {

        //全局配置
        $.ajaxSetup({
            dataType: "json",
            contentType: "application/json",
            cache: false,
            error:function(x, e) {
                alert(imerr.errorMessage(x.status));
                return false;
            }
        });
    },
    getJSON:function (url,data,callback) {
        this.init();
        $.getJSON(url,this.data(data),function (data, status, xhr) {
            im.execSuccess(data,status,xhr,callback);
        });
    },
    post:function (url,data,callback,dataType) {
        this.init();
        $.post(url,this.data(data),function (data, status, xhr) {
            im.execSuccess(data, status, xhr);
        },im.dataType(dataType));
    },
    /**
     * Ajax 函数的封装
     * @param url 请求的url地址
     * @param data 需求传递的参数，显示{date:currentdate}
     * @param async 是否异步，默认是异步
     * @param type  请求是以post还是get 方式进行请求，默认是Post
     * @param dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
     * @param suCallback 成功回调函数
     * @param erCallback 失败回调函数
     */
    ajax:function (url,data,async,type,dataType,successfn,errorfn) {
        $.ajax({
            type: im.type(type),
            async: im.isAsync(data),
            data: im.data(data),
            url: url,
            dataType: im.dataType(dataType),
            success: function(result,status,xhr){
                im.execSuccess(result,status,xhr,successfn);
            },
            error: function(xhr,status,error){
                im.execError(xhr,status,error,errorfn);
            }
        });
    },
    ajax4p:function (url,data,successfn,errorfn) {
        $.ajax({
            type: im.type(type),
            async: im.isAsync(data),
            data: im.data(data),
            url: url,
            dataType: im.dataType(dataType),
            success: function(result,status,xhr){
                im.execSuccess(result,status,xhr,successfn);
            },
            error: function(xhr,status,error){
                im.execError(xhr,status,error,errorfn);
            }
        });
    },
};

function imErr(){}

imErr.prototype={
    errorMessage:function (code) {
        var message = "";
        switch (code)
        {
            case 400:
                message = "服务器不理解请求的语法("+code+")";
                break;
            case 401:
                message = "请求要求身份验证"+code+")";
                break;
            case 403:
                message = "服务器拒绝请求("+code+")";
                break;
            case 404:
                message = " 服务器找不到请求的网页("+code+")";
                break;
            case 405:
                message = " 禁用请求中指定的方法("+code+")";
                break;
            case 500:
                message = "服务器遇到错误，无法完成请求("+code+")";
                break;
            default:
                message = "未知错误("+code+")";
                break;
        }
        return message;
    }
};

var imerr = new imErr();
var im = new im();

