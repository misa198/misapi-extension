<script>
import { Line, mixins } from "vue-chartjs";

const { reactiveProp } = mixins;

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: false,
          fontFamily: "Roboto",
          callback: function(value) {
            return new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "VND"
            }).format(value);
          }
        }
      }
    ]
  },
  tooltips: {
    callbacks: {
      label: function(tooltipItem) {
        return new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "VND"
        }).format(tooltipItem.value);
      },
      labelColor: function() {
        return {
          borderColor: "#ee4d2d",
          backgroundColor: "#ee4d2d"
        };
      }
    }
  }
};

export default {
  extends: Line,
  props: ["dataChart"],
  mixins: [reactiveProp],
  mounted() {
    this.renderChart(this.dataChart, options);
  },
  watch: {
    dataChart() {
      this.renderChart(this.dataChart, options);
    }
  }
};
</script>

<style></style>
