<template>
  <div class="box">
    <div class="star">
      <h3 class="title">星级评价</h3>
      <div class="star-list content">
        <div class="star-item" v-for="(item,index) in starList" :key="index">
          <span class="star-name">{{item.name}}：</span>
          <div class="star-score">
            <img class="star-score-img" v-for="(star,key) in 5" :key="key" :src="key<=starTotal[item.type]?itemImgUrlLink:itemImgUrlNormal" @click="handelStar(key,item.type)">
            <span class="star-score-txt">{{item.type=='starTime'?timeStar:(item.type=='starServe'?serveStar:majorStar)}}分</span>
          </div>
        </div>
      </div>
    </div>
    <div class="describe">
      <h3 class="title">评价描述</h3>
      <textarea class="content" name="" cols="30" rows="3"></textarea>
    </div>
  </div>
</template>
<script>
export default {
	data() {
		return {
			starTotal: {
				starTime: 5,
				starServe: 5,
				starMajor: 5
			},
			starList: [{ name: '理赔时效', type: 'starTime' }, { name: '服务态度', type: 'starServe' }, { name: '专业态度', type: 'starMajor' }],
			itemImgUrlLink: require('@/assets/module_link.png'),
			itemImgUrlNormal: require('@/assets/module.png')
		}
	},
	computed: {
		timeStar() {
			return 2 * this.starTotal.starTime
		},
		serveStar() {
			return 2 * this.starTotal.starServe
		},
		majorStar() {
			return 2 * this.starTotal.starMajor
		}
	},
	methods: {
		handelStar(idx, type) {
			this.starTotal[type] = idx + 1
		}
	}
}
</script>
<style lang="less" scoped>
.box {
	.title {
		font-size: 14px;
		color: #333;
		font-weight: bold;
	}
	.content {
		margin-top: 10px;
	}
	.star-list {
		.star-item {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.star-name {
				color: #999;
				margin-right: 10px;
			}
			.star-score {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.star-score-img {
					margin-right: 10px;
				}
				.star-score-txt {
					margin-left: 10px;
				}
			}
		}
	}
}
</style>