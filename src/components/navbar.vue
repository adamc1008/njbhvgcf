<script setup>
    import logo from '@/assets/images/HN_icon.jpg';
</script>

<template>
  <nav role="navigation" aria-label="Main navigation">
    <b-navbar toggleable="lg" type="dark" variant="info" class="fixed-top">
      <b-navbar-brand href="#" aria-label="Hacker News home">
        <img :src="logo" alt="Hacker News logo" />
      </b-navbar-brand>

      <b-navbar-brand href="#">Hacker News</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse" aria-label="Toggle navigation"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/top" tag="router-link">Top</b-nav-item>
          <b-nav-item to="/new" tag="router-link">New</b-nav-item>
          <b-nav-item to="/ask" tag="router-link">Ask</b-nav-item>
          <b-nav-item to="/show" tag="router-link">Show</b-nav-item>
          <b-nav-item to="/job" tag="router-link">Jobs</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ms-auto">
          <b-nav-form role="search" aria-label="Search posts">
            <b-form-input size="sm" class="me-sm-2" placeholder="Search" aria-label="Search posts" />
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </nav>
</template>

