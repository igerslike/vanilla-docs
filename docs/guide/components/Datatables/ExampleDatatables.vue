<template>
		<VanillaDatatable
				:config="config"
				:unique-name="'payments'"
				:columns="columns"
				:options="options"
				:translations="translations"
				:actions="actions"
				:per-page-options="perPageItemsOptions"
				:filters="filters"
				:fetch-data="fetchData"
		/>
</template>
<script type="ts">
import {VanillaDatatable} from '@indigit/vanilla-components';
import {onMounted, defineComponent} from 'vue';
export default defineComponent({
		name: 'ExampleDatatables',
		components: {
				VanillaDatatable
		},
		setup(props){

				onMounted(() => window.parent.postMessage('mounted', '*'));

				// Function to grab data
				const fetchData = (query, nextPage) => {
						const url = `https://www.omdbapi.com/?apikey=e1b3617e&s=${query}&page=${nextPage || 1}`;
						return fetch(url)
								.then((response) => response.json())
								.then((data) => ({
										results: data.Search,
										hasMorePages: data.Search && data.totalResults > (data.Search.length * (nextPage || 1)) * 10,
								}));
				};

				// Options
				const options = {
						selectable: true,
						searchable: true,
						refreshable: true,
						manageSettings: true,
						showTotalItems: true,
						compact: false,
						striped: false,
				}

				// Columns
				const columns = [
						{
								name: 'id',
								label: '#',
								sortable: true,
								native: true,
								hidden: false,
								defaultSortAs: 'desc',
								raw: false,
						},
						{
								name: 'name',
								label: 'Name',
								sortable: true,
								native: true,
								hidden: false,
								defaultSortAs: undefined,
								raw: false,
						}
				];

				// Actions
				const actions = [
						{
								name: 'delete-items',
								label: 'Deleted Items',
								permissions: {
										execute: true,
										view: true,
								},
								before: {
										confirm: {
												enable: true,
												options: {
														title: 'Delete Payments?',
														subtitle: undefined,
														text: 'Are you sure you want to delete all the selected payments?',
														icon: undefined,
														confirmButton: 'Yes, go on',
														cancelButton: 'No, take me back.',
												}
										},
										callback: () => {
												console.log('Im being executed before')
										}
								},
								after: {
										clearSelected: true,
										resetFilters: false,
										pooling: {
												enable: true,
												interval: 5,
												during: 120,
												stopWhenDataChanges: false
										},
										callback: () => {
												console.log('Im being executed after')
										}
								}
						},
				];

				const filters = [
						{
								name: 'id',
								label: 'Filter by ID',
								component: 'VanillaInputText',
								placeholder: 'Ex: 1,2,3',
								value: undefined,
								defaultValue: undefined,
								options: [],
								rules: []
						},
				]

				// Translations
				const translations = {
						title: 'Payments',
						subtitle: 'Check your latest payments here',
						resource: 'Payment',
						resources: 'Payments',

						actionsButton: 'Actions',
						actionsSelectedRows: 'With :rows selected',

						search: 'Search',
						searchPlaceholder: 'Search your latest Payments',

						selectRows: 'You currently have :rows payments selected',
						selectedUndo: 'Deselect',
						selectAllOr: 'Select current page or',
						selectAllMatching: 'Select all records matching filter',
						selectAllMatchingUndo: 'Select only current page',

						filters: 'Filters',
						filtersWithEmptyData: 'Oops, seems like there is no records after filtering',
						filtersReset: 'Reset Filters',

						recordsEmpty: 'Seems like its quiet here! No Records were found',
						settingsPerPage: ':count Items per page',
				}

				// Per Page Options
				const perPageItemsOptions = [
						{value: 5, label: '5 Items per page'},
						{value: 10, label: '10 Items per page'},
						{value: 50, label: '50 Items per page'},
						{value: 100, label: '100 Items per page'},
						{value: 300, label: '300 Items per page'},
				]

				const config = {
						columns: columns,
						options: options,
						translations: translations,
						actions: actions,
						filters: filters,
						perPageItemsOptions: perPageItemsOptions,
						fetchData: fetchData,
				};

				return {
						columns,
						options,
						translations,
						actions,
						filters,
						perPageItemsOptions,
						fetchData,
						config
				}

		}
});
</script>
