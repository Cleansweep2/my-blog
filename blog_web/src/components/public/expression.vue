<template>
  <div class="ta-bq flex animate__animated animate__fadeInDown">
    <i
      @click="handleClick(item)"
      class="flex jc-center ai-center"
      v-for="(item, i) in bq"
      :key="i"
    >
      {{ item }}
    </i>
  </div>
</template>

<script>
export default {
  name: "expression",
  data() {
    return {
      bq: [
        "😀",
        "😁",
        "😂",
        "😃",
        "😄",
        "😅",
        "😆",
        "😉",
        "😊",
        "😋",
        "😎",
        "😍",
        "😘",
        "😗",
        "😙",
        "😚",
        "☺",
        "😇",
        "😐",
        "😑",
        "😶",
        "😏",
        "😣",
        "😥",
        "😮",
        "😯",
        "😪",
        "😫",
        "😴",
        "😌",
        "😛",
        "😜",
        "😝",
        "😒",
        "😓",
        "😔",
        "😕",
        "😲",
        "😷",
        "😖",
        "😞",
        "😟",
        "😤",
        "😢",
        "😭",
        "😦",
        "😧",
        "😨",
        "😬",
        "😰",
        "😱",
        "😳",
        "😵",
        "😡",
        "😠",
        "💪",
        "👈",
        "👉",
        "☝",
        "👆",
        "👇",
        "✌",
        "✋",
      ],
    };
  },
  methods: {
    handleClick(item) {
      this.$emit("handleClcik", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.ta-bq {
  margin-top: 5px;
  flex-wrap: wrap;
  height: 150px;
  overflow-y: auto;
  border: 1px solid #ccc;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track-piece {
    background-color: #fff;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cccccc;
    opacity: 0.7;
    border-radius: 2px;
  }
  i {
    width: 38px;
    height: 50px;
    cursor: pointer;
  }
}
</style>
