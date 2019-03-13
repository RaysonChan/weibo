<template>
    <div>
        <ul class="mui-table-view" v-for="(item, index) in this.fans" :key="index">
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="../../assets/images/logo.jpg">
						<div class="mui-media-body">
							{{item}}
						</div>
					</a>
				</li>
			</ul>
    </div>
</template>

<script>
import {mapState} from 'vuex';
export default{
    computed:{
        ...mapState(['fans'])
    }
}
</script>

<style>

</style>
