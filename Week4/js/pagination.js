export default{
    props:['pages'],
    template: `
    <nav class="pagination is-rounded" role="navigation" aria-label="pagination">
      <a class="pagination-previous" :class="{ 'is-disabled': !pages.has_pre }" @click="$emit('get-product', pages.current_page - 1)">Previous</a>
      <a class="pagination-next" :class="{ 'is-disabled': !pages.has_next}" @click="$emit('get-product', pages.current_page + 1)">Next page</a>
      <ul class="pagination-list">
        <li v-for="page in pages.total_pages" :key="pages + 'page'">
          <a class="pagination-link"
            :class="{ 'is-current': page === pages.current_page }"
            @click="$emit('get-product',page)">{{ page }}
          </a>
        </li>
      </ul>
    </nav>
    `
}