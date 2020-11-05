import { getWeChatConfig} from '@/common/api'
const WechatJSSDK = require('wechat-jssdk/dist/client.umd')
var wechatObj = null

// 初始化微信用户对象， 相当于agentConfig（）方法， 该方法修改的wechatObj是后续分享方法的基石
const initAgentConfig = async function(){
  return true
  let data = await getWeChatConfig()

  wechatObj = new WechatJSSDK(data.config)
  let weChatInitData = wechatObj.initialize()
  if(weChatInitData){
    return true
  }
}

//获取当前用户的user_id
const getUserId = async function(){
  return "wmoUknCwAAWU25ag59ILJCVeGMEzrHUg"
  let res = await wechatObj.callWechatApi('getCurExternalContact')
  console.log('获取当前用户的user_id',res)
  return res.userId
}

//分享消息到会话接口
const shareMessageToWeChat = function(message){
  wechatObj.callWechatApi('sendChatMessage',{
    msgtype:'text',
    text:{
      content: message
    }
  }).then(res =>{
    console.log("回调结果",res)
  }).catch(err =>{
    console.log(err)
  })
}

export {
  initAgentConfig,
  getUserId,
  shareMessageToWeChat
}
