<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"><i class="fa-solid fa-file-invoice me-2"></i>FactureMaster</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <RouterLink activeClass="active" to="/" class="nav-link"
                ><i class="fas fa-home me-2"></i>Accueil</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink activeClass="active" to="/factures" class="nav-link"
                ><i class="fas fa-file-invoice-dollar me-2"></i>Factures</RouterLink
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
