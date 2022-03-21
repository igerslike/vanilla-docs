<template>
  <div class="p-8 rounded bg-gray-100 border border-gray-200 dark:bg-[#282c34] dark:border-gray-700 font-inter antialiased">
    <Content />
  </div>
</template>
<script>
import '../styles/main.pcss';
export default {
		mounted() {
				console.log('🧹 Mounting Blank Template for Preview');
				let nodes = document.getElementsByTagName('style'), index;
				for (index = nodes.length - 1; index >= 0; index--) {
						if(nodes[index].innerText !== '' && nodes[index].innerText !== null && !nodes[index].innerText.includes('tailwind')){
								nodes[index].parentNode.removeChild(nodes[index]);
						}
				}
		}
}
</script>
