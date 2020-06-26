var fileHost = "https://jojoho.oss-cn-beijing.aliyuncs.com/";//你的阿里云地址最后面跟上一个/   在你当前小程序的后台的uploadFile 合法
var config = {
   //aliyun OSS config
   uploadImageUrl: `${fileHost}`, // 默认存在根目录，可根据需求改
   AccessKeySecret: 'hUJYAJ9R2gsu87Egrs3HEfziGNaD8g',        // AccessKeySecret 去你的阿里云上控制台上找
   OSSAccessKeyId: 'LTAI4G27HYpdCr2opf6hbgV3',         // AccessKeyId 去你的阿里云上控制台上找
   timeout: 87600 //这个是上传文件时Policy的失效时间
};
module.exports = config
