<template>
  <div class="p-8 rounded bg-gray-100 border border-gray-200 dark:bg-[#282c34] dark:border-gray-700 font-inter antialiased">
    <Content />
  </div>
</template>
<script>
import { useSSRContext } from 'vue';
import '../styles/main.pcss?server';
export default {
		mounted() {
				let nodes = document.getElementsByTagName('style'), index;
				for (index = nodes.length - 1; index >= 0; index--) {
						if(nodes[index].innerText !== '' && nodes[index].innerText !== null && !nodes[index].innerText.includes('tailwind')){
								nodes[index].parentNode.removeChild(nodes[index]);
						}
				}
				document.querySelectorAll('style,link[rel="stylesheet"]').forEach((element) => {
						if(!element.href.includes('tailwind')){
								element.remove()
						}
				})
		},
		created () {
				if (__VUEPRESS_SSR__) {
						useSSRContext().head.push(['link', {href: '/assets/tailwind.css', rel: 'stylesheet'}]);
						useSSRContext().head.push(['link', {href: this.$page.path, rel: 'canonical'}]);
				}
		}
}
</script>
