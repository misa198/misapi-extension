<template src="./index.html"></template>

<script>
import { urlRegex } from "../../constants/regex";

export default {
  data() {
    return {
      error: "",
      isLoading: true,
      data: {}
    };
  },
  created() {
    const data = this.data;
    chrome.tabs.query(
      {
        active: true,
        lastFocusedWindow: true
      },
      function(tabs) {
        let url = tabs[0].url;

        if (!url) {
          data.error = "URL sản phẩm không hợp lệ";
        } else {
          let shopId = "";
          let itemId = "";
          const _url = url.split("?")[0] ? url.split("?")[0] : "";
          if (!_url.match(urlRegex)) data.error = "URL sản phẩm không hợp lệ";
          const urlPaths = _url.split("/");
          if (urlPaths[3] === "product") {
            shopId = urlPaths[4];
            itemId = urlPaths[5];
          } else {
            if (!urlPaths[3]) data.error = "URL sản phẩm không hợp lệ";
            else {
              const pathPaths = urlPaths[3].split(".");
              shopId = pathPaths[pathPaths.length - 2];
              itemId = pathPaths[pathPaths.length - 1];
            }
          }

          if (!shopId || !itemId) data.error = "URL sản phẩm không hợp lệ";
          if (!data.error) {
            fetch(`https:/misapi.tk/statistic?id=${itemId}_${shopId}`)
              .then(res => res.json())
              .then(res => {
                data.isLoading = false;
                if (!res.error) {
                  data.data = res.data;
                } else {
                  data.error = "Không có dữ liệu về sản phẩm này";
                }
              });
          } else {
            data.isLoading = false;
          }
        }
      }
    );
  }
};
</script>

<style src="./index.css"></style>
