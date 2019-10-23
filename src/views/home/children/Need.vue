<template>
  <div class="need">
    <img class="need-img" :src="productInfo.ProductImgBig">
    <div class="need-main">
      <P class="need-name"><span class="need-name-title">{{productInfo.ProductName}}</span><i class="need-name-icon">{{productInfo.ProductType}}</i></P>
      <p class="need-price">￥{{productInfo.SellPrice}}</p>
      <p class="need-describe">{{productInfo.ProductIntroduce}}</p>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="使用规则" name="2" title-class="rules-title" size="large">
          <div class="collapse-item">{{productInfo.UseIntroduce}}</div>
        </van-collapse-item>
        <van-collapse-item title="退票规则" name="3" title-class="rules-title" size="large">
          <div class="collapse-item">{{productInfo.RefundIntroduce}}</div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>
<script>
export default {
	data() {
		return {
			productInfo: {},
			activeNames: []
		}
	},
	created() {
		this.productInfo = JSON.parse(this.$route.query.productInfo)
	}
}
</script>
<style lang="less" scoped src="@/style/home/need.less"></style>