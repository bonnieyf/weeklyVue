<template>
  <div class="about">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to='/'>Caf'e vue 後台</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to='/admin/products'>Products</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to='/admin/coupon'>Coupon</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <h1>後台</h1>
    <router-view/>
  </div>
</template>
