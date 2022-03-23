<template>
  <div class="d-flex bg-hover" style="cursor: pointer" @click="onItemClick(source.id)">
    <div class="p-2">
      <img :src="source.image" onerror="this.src='/img/default.jpg';" width="60px" />
    </div>
    <div class="px-2 py-1 flex-grow-1">
      <p
        class="mb-0"
        style="
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        "
      >
        {{ source.title }}
      </p>
      <p class="mb-0">{{ diffForHumans(source.date) }}</p>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "ItemWatchListNews",
  props: {
    source: {
      type: Object,
      default() {
        return {};
      },
    },
    onItemClick: {
      type: Function,
      default() {
        return ()=> {};
      },
    }
  },
  methods: {
    diffForHumans(times) {
      const convertTime = moment(times);
      const timeNow = new Date();
      const convertTimeNow = moment(timeNow);
      const duration = moment.duration(convertTimeNow.diff(convertTime));
      const seconds = duration.seconds();
      const minutes = duration.minutes();
      const hours = duration.hours();
      const days = duration.days();
      const weeks = duration.weeks();
      const months = duration.months();
      const years = duration.years();
      if (years > 0) {
        return years + " năm trước";
      }
      if (months > 0) {
        return months + " tháng trước";
      }
      if (weeks > 0) {
        return weeks + " tuần trước";
      }
      if (days > 0) {
        return days + " ngày trước";
      }
      if (hours > 0) {
        return hours + " giờ trước";
      }
      if (minutes > 0) {
        return minutes + " phút trước";
      }
      if (seconds > 0) {
        return seconds + " giây trước";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>