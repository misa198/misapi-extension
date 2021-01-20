<script>
import { Line } from "vue-chartjs";

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
  props: ["chartdata"],
  mounted() {
    this.renderChart(this.chartdata, options);
  }
};
</script>

<style></style>
