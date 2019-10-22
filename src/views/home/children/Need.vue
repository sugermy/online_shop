<template>
  <div class="need">
    <img class="need-img" :src="productInfo.imgSrc">
    <div class="need-main">
      <P class="need-name"><span class="need-name-title">{{productInfo.name}}</span><i class="need-name-icon">{{productInfo.type}}</i></P>
      <p class="need-price">￥{{productInfo.price}}</p>
      <p class="need-describe">{{productInfo.describe}}</p>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="使用规则" name="2" title-class="rules-title" size="large">
          <div class="collapse-item">{{productInfo.rulesA}}</div>
        </van-collapse-item>
        <van-collapse-item title="退票规则" name="3" title-class="rules-title" size="large">
          <div class="collapse-item">{{productInfo.rulesB}}</div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>
<script>
export default {
	data() {
		return {
			productInfo: {
				imgSrc: require('../../../assets/banner1.png'),
				name: '车索【全程票】',
				type: '交通票',
				describe: '今夕何夕兮，搴舟中流。\n今日何日兮，得与王子同舟。\n蒙羞被好兮，不訾诟耻。\n心几烦而不绝兮，得知王子。\n山有木兮木有枝，心悦君兮君不知。',
				price: 78,
				rulesA:
					'欲将沉醉换悲凉，清歌莫断肠。这混乱的尘世，究竟充斥了多少绝望和悲伤。\n你想去做一个勇敢的男子，为爱，为信仰，轰轰烈烈的奋斗一场。你周身充斥着无人可比的灵气和光芒。\n你有着与伟人比肩的才气和名声，你是那样高傲孤洁的男子。你的一寸狂心未说，已经几度黄昏雨',
				rulesB:
					'一段情，反复的掂量，最后加深了岁月的绵长。\n一路追赶里，一路追忆里，最后得到的是什么，最后又失去的是什么。\n或许，只有我们在静思的时候才会明白，这路的追忆里，我们得到的快乐往往比痛苦要少。当相思成殇的时候，除了对月徒悲叹之外，什么也不曾抓到'
			},
			activeNames: []
		}
	},
	created() {
		console.log(this.$route.query)
	}
}
</script>
<style lang="less" scoped src="@/style/home/need.less"></style>