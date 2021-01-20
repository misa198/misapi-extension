<template src="./index.html"></template>

<script>
import dateFormat from "dateformat";

import Chart from "../../components/Chart";
import Loading from "../../components/Loading";

import { urlRegex } from "../../constants/regex";

export default {
  components: {
    Chart,
    Loading
  },
  data() {
    return {
      error: "",
      isLoading: true,
      resData: {},
      dataChart: {},
      timeRange: 12
    };
  },
  created() {
    const that = this;
    chrome.tabs.query(
      {
        active: true,
        lastFocusedWindow: true
      },
      function(tabs) {
        let url = tabs[0].url;

        if (!url) {
          that.error = "URL sản phẩm không hợp lệ";
        } else {
          let shopId = "";
          let itemId = "";
          const _url = url.split("?")[0] ? url.split("?")[0] : "";
          if (!_url.match(urlRegex)) that.error = "URL sản phẩm không hợp lệ";
          const urlPaths = _url.split("/");
          if (urlPaths[3] === "product") {
            shopId = urlPaths[4];
            itemId = urlPaths[5];
          } else {
            if (!urlPaths[3]) that.error = "URL sản phẩm không hợp lệ";
            else {
              const pathPaths = urlPaths[3].split(".");
              shopId = pathPaths[pathPaths.length - 2];
              itemId = pathPaths[pathPaths.length - 1];
            }
          }

          if (!shopId || !itemId) that.error = "URL sản phẩm không hợp lệ";
          if (!that.error) {
            fetch(`https:/misapi.tk/statistic?id=${itemId}_${shopId}`)
              .then(res => res.json())
              .then(res => {
                that.isLoading = false;
                if (!res.error) {
                  that.resData = Object.assign({}, that.resData, res.data);
                } else {
                  that.error = "Không có dữ liệu về sản phẩm này";
                }
              });
          } else {
            that.isLoading = false;
          }
        }
      }
    );
  },
  computed: {
    combined() {
      return this.resData || this.timeRange;
    }
  },
  watch: {
    combined() {
      const that = this;
      const data = that.resData;
      if (data.statistic) {
        const time = data.statistic.time;
        let minTime = new Date().getTime();
        minTime = minTime - 1000 * 60 * 60 * 24 * 35 * that.timeRange;
        const labels = [];
        const selectedPrice = [];
        for (const [index, e] of time.entries()) {
          if (e >= minTime) {
            labels.push(dateFormat(new Date(e), "dd-mm-yyyy"));
            selectedPrice.push(data.statistic.price[index]);
          }
        }
        const datasets = [
          {
            label: "Giá sản phẩm",
            data: selectedPrice,
            fill: false,
            backgroundColor: "#ee4d2d",
            borderColor: "#ee4d2d40"
          }
        ];
        that.dataChart = Object.assign({}, that.dataChart, {
          labels,
          datasets
        });
      }
    }
  }
};
</script>

<style src="./index.css"></style>
