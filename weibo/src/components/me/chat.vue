<template>
  <div class="page-chat">
    <div id="cat_sever">
      <!--机器人客服-->
      <div class="robot">
        <div class="avatar">
          <img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2177643743,102517029&fm=58">
        </div>
        <div class="cat">
          <span id="robot_contents">你好!有什么可以帮你的吗？</span>
        </div>
      </div>
      <!--用户-->
      <div class="user" style="display: none;">
        <div class="avatar">
          <img src="../../assets/images/logo.png">
        </div>
        <div class="cat">
          <span id="user_contents">你好!</span>
        </div>
      </div>
    </div>
    <div class="send_chat">
      <input
        onkeypress="if(event.keyCode==13){document.getElementById('send').click()}"
        type="text"
        id="contents"
        required
        pattern=".{1,}"
        oninvalid="setCustomValidity('两至五个汉字')"
        oninput="setCustomValidity('')"
      >
      <button type="submit" id="send">发送</button>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  created() {
    $(document).ready(function() {
      $("#send").click(function() {
        if ($("#contents").val().length != 0) {
          $("<div>")
            .addClass("user")
            .html(
              '<div class="avatar"><img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4028281909,2422160378&fm=26&gp=0.jpg" ></div><div class="cat"><span id="user_contents">' +
                $("#contents").val() +
                '</span><div class="right_triangle"></div></div>'
            )
            .appendTo("#cat_sever");
          $.ajax({
            type: "POST",
            url: "http://www.tuling123.com/openapi/api",
            dataType: "json",
            data: {
              key: "609ccedb839240aeb9fe130f7c70fdf1",
              info: $("#contents").val(),
              userid: "SmallMacro"
            },
            success: function(data) {
              $("#contents").val("");
              $("<div>")
                .addClass("robot")
                .html(
                  '<div class="avatar"><img src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2177643743,102517029&fm=58"></div><div class="cat"><span id="robot_contents">' +
                    data.text +
                    '</span><div class="left_triangle"></div></div>'
                )
                .appendTo("#cat_sever");
              //即时聊天让滚动条自动滚到最底部
              $("#cat_sever").scrollTop($("#cat_sever")[0].scrollHeight);
            },
            error: function(jqXHR) {
              $(".chat").html(" " + jqXHR.status);
            }
          });
        } else {
          alert("请认真问问题好嘛：）");
        }
      });
    });
  }
};
</script>

<style lang="scss">
.page-chat {
  * {
    margin: 0;
    padding: 0;
    font-family: "微软雅黑";
    overflow-y: hidden;
    overflow-x: hidden;
  }

  .robot,
  .user {
    display: block;
    /*height: 50px;*/
    clear: both;
    width: auto;
    margin: 0 20px 10px 15px;
    padding: 10px 10px 10px 0px;
  }

  .robot .avatar {
    float: left;
  }

  .user .avatar {
    float: right;
    border-radius: 50%;
  }

  .robot img,
  .user img {
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }

  .robot .cat {
    position: relative;
    background-color: royalblue;
    float: left;
    margin: 0 0px 10px 20px;
    padding: 10px 10px 10px 0px;
    border-radius: 10px;
  }

  .user .cat {
    position: relative;
    background-color: sandybrown;
    float: right;
    margin: 0 20px 10px 10px;
    padding: 10px 0px 10px 10px;
    border-radius: 10px;
  }

  span {
    margin: 10px 10px 10px 10px;
    color: #fff;
  }
  .send_chat {
    // height: 8%;
    position: fixed;
    width: 100%;
    height: 8%;
    min-height: 48px;
    border-top: solid 1px #bbb;
    left: 0px;
    bottom: 0px;
    overflow: hidden;
    padding: 5px 80px 5px 5px;
    background-color: #fafafa;
  }

  input {
    line-height: 0px;
    font-size: 18px;
    width: 100%;
    padding: 0px;
    padding-top: 0px;
    float: left;
  }

  input:required:valid {
    background-position: right center;
    background-repeat: no-repeat;
    box-shadow: none;
  }

  input:focus {
    outline: none;
  }

  .send_chat button {
    border-radius: 5px;
    position: absolute;
    width: 65px;
    height: 40px;
    text-align: center;
    vertical-align: middle;
    line-height: 100%;
    margin-left: 5px;
    display: inline-block;
    background-color: orange;
    color: #fff;
  }

  .robot .cat:before {
    position: absolute;
    content: "";
    height: 0px;
    width: 0px;
    border-top: 10px solid transparent;
    border-right: 20px solid royalblue;
    border-bottom: 10px solid transparent;
    left: -20px;
    top: 15px;
  }

  .user .cat:after {
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 20px solid sandybrown;
    border-bottom: 10px solid transparent;
    right: -20px;
    top: 15px;
  }

  #cat_sever {
    position: absolute;
    width: 100%;
    height: 86%;
    /*overflow-x: hidden;*/
    overflow-y: auto;
    /*overflow: hidden;*/
  }
}
</style>

