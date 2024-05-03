// TEST 1 - INICIO DE SESIÓN Y VISTA DE PERFIL
describe('TEST 1 - INICIO DE SESIÓN Y VISTA DE PERFIL', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('[data-test-id="cypress-header-login"]').should('exist').should('be.visible');
    cy.get('[data-test-id="cypress-email-login"]').as('loginEmail');
    cy.get('[data-test-id="cypress-password-login"]').as('loginPassword');

    //datos correctos
    cy.get('@loginEmail').type('correotest@gmail.com'); 
    cy.get('@loginPassword').type('Hackerdaniel123+');
    cy.wait(500);

   // click en el botón de login
    cy.get('[data-test-id="cypress-button-login"]').as('loginButton');
    cy.get('@loginButton').click();
    cy.wait(1500);

   // vista de perfil
    cy.intercept('GET', '/vendor/profile').as('profile');
    cy.visit('/vendor/profile');

    //validación de la vista de perfil por medio de la respuesta de la petición
    cy.wait('@profile').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
  })
})

// TEST 2 - INICIO DE SESIÓN Y MENSAJE DE ERROR
describe('TEST 2 - INICIO DE SESIÓN Y MENSAJE DE ERROR', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('[data-test-id="cypress-header-login"]').should('exist').should('be.visible');
    cy.get('[data-test-id="cypress-email-login"]').as('loginEmail');
    cy.get('[data-test-id="cypress-password-login"]').as('loginPassword');

    // datos incorrectos
    cy.get('@loginEmail').type('correotest@gmail.com');
    cy.get('@loginPassword').type('HaerdAniel123');
    cy.wait(500);

    // click en el botón de login
    cy.get('[data-test-id="cypress-button-login"]').as('loginButton');
    cy.intercept('POST', '**/auth/sign/in').as('login');


    cy.get('@loginButton').click();
    cy.wait(1500);
    cy.wait('@login').then(({ request, response }) => {
      expect(response.statusCode).to.eq(400);
      expect(response.body).to.have.property('message', 'Invalid password');
    })
  }
  )
})


//TEST 3 - CREACIÓN DE PRODUCTO CORRECTO
describe('TEST 3 - CREACIÓN DE PRODUCTO CORRECTO', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('[data-test-id="cypress-header-login"]').should('exist').should('be.visible');
    cy.get('[data-test-id="cypress-email-login"]').as('loginEmail');
    cy.get('[data-test-id="cypress-password-login"]').as('loginPassword');

    // datos correctos
    cy.visit('/')
    cy.get('[data-test-id="cypress-header-login"]').should('exist').should('be.visible');
    cy.get('[data-test-id="cypress-email-login"]').as('loginEmail');
    cy.get('[data-test-id="cypress-password-login"]').as('loginPassword');

    // datos correctos
    cy.get('@loginEmail').type('correotest@gmail.com');
    cy.get('@loginPassword').type('Hackerdaniel123+');
    cy.wait(500);

    // click en el botón de login
    cy.get('[data-test-id="cypress-button-login"]').as('loginButton');
    cy.get('@loginButton').click();
    cy.wait(1500);

    cy.visit('/vendor/addproduct');
    cy.wait(500);

    cy.get('[data-test-id="cypress-input-photoProduct"]').as('photoProduct');
    cy.get('[data-test-id="cypress-input-productName"]').as('nameProduct');
    cy.get('[data-test-id="cypress-input-price"]').as('price');
    cy.get('[data-test-id="cypress-input-stock"]').as('stock');
    cy.get('[data-test-id="cypress-input-description"]').as('description');

    //upload file:
    cy.get('@photoProduct').attachFile('oso_peluche.jpg');

    //datos del producto
    cy.get('@nameProduct').type('Oso de peluche - Cypress');
    cy.get('@price').type('200');
    cy.get('@stock').type('10');
    cy.get('@description').type('Oso de peluche de 1 metro de altura - desde Cypress');

    // click en el botón de guardar
    cy.get('[data-test-id="cypress-button-save"]').as('saveButton');

    cy.intercept('POST', '**/products/create').as('product');
    cy.get('@saveButton').click();
    cy.wait(1500);

    // validación de la creación del producto por medio de la respuesta de la petición
    cy.wait('@product').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
    });
  }
  )
}
)

// TEST 4 - Review de producto
describe('TEST 4 - Review de producto', () => {
  it('passes', () => {
    cy.intercept('GET', '/products/all').as('products');
    cy.visit('/')
    cy.get('[data-test-id="cypress-header-login"]').should('exist').should('be.visible');
    cy.get('[data-test-id="cypress-email-login"]').as('loginEmail');
    cy.get('[data-test-id="cypress-password-login"]').as('loginPassword');

    // datos correctos
    cy.get('@loginEmail').type('mariamercedes@gmail.com');
    cy.get('@loginPassword').type('Hola123.');
    cy.wait(500);

    // click en el botón de login
    cy.get('[data-test-id="cypress-button-login"]').as('loginButton');

    cy.get('@loginButton').click();


    // vista de productos
    cy.wait('@products').then(({ request, response }) => {

      // Mensaje de Encontrado
      expect(response.body).to.have.property('message', 'Products found');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('array').that.is.not.empty;

      const productos = response.body.data.length;
      const index = productos - 1;

      cy.get('[data-test-id="btn-comprar-' + index + '"]').click();

      cy.wait(300);

      cy.get('[data-test-id="cypress-button-review"]').as('review');
      cy.get('@review').click();

      cy.wait(300);
      cy.get('[data-test-id="cypress-button-submit"]').as('submit');
      cy.get('[data-test-id="cypress-input-comment"]').as('reviewInput');
      cy.get('@reviewInput').type('No me gustó el producto, le doy 0 estrellas desde Cypress');

      cy.intercept('POST', '**/review/create').as('reviewPOST');

      cy.get('@submit').click();
      cy.wait(1500);

      // validación de la creación del review por medio de la respuesta de la petición
      cy.wait('@reviewPOST').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
      });
    });
  }
  )
}
)

// TEST 5 - AGREGAR AL CARRITO
describe('TEST 5 - Agregar producto al carrito', () => {
  it('passes', () => {
    cy.intercept('GET', '/products/all', req => {
      delete req.headers['if-none-match'];
    }).as('products');
    cy.visit('/')
    cy.get('[data-test-id="cypress-header-login"]').should('exist').should('be.visible');
    cy.get('[data-test-id="cypress-email-login"]').as('loginEmail');
    cy.get('[data-test-id="cypress-password-login"]').as('loginPassword');

    // datos correctos
    cy.get('@loginEmail').type('mariamercedes@gmail.com');
    cy.get('@loginPassword').type('Hola123.');
    cy.wait(500);

    // click en el botón de login
    cy.get('[data-test-id="cypress-button-login"]').as('loginButton');

    cy.get('@loginButton').click();


    // vista de productos
    cy.wait('@products').then(({ request, response }) => {

      // Mensaje de Encontrado
      expect(response.body).to.have.property('message', 'Products found');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('array').that.is.not.empty;

      const productos = response.body.data.length;
      const index = productos - 1;

      cy.get('[data-test-id="btn-comprar-' + index + '"]').click();

      cy.wait(300);

      cy.get('[data-test-id="cypress-button-add"]').as('add');
      cy.get('@add').click();

      cy.intercept('GET', '/users/get/*', req => {
        delete req.headers['if-none-match'];
      }).as('carrito');

      cy.visit('/client/shoppingcart');

      cy.get('[data-test-id="cypress-title-cart"]').should('exist').should('be.visible');
    });
  }
  )
}
)

// TEST 6 - DESDE ADMIN ELIMINAR REVIEW
describe('TEST 6 - ELIMINAR REVIEW DESDE ADMIN', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('[data-test-id="cypress-header-login"]').should('exist').should('be.visible');
    cy.get('[data-test-id="cypress-email-login"]').as('loginEmail');
    cy.get('[data-test-id="cypress-password-login"]').as('loginPassword');

    // datos correctos
    cy.get('@loginEmail').type('admin@gmail.com');
    cy.get('@loginPassword').type('Hacker123+');
    cy.wait(500);

    // click en el botón de login
    cy.get('[data-test-id="cypress-button-login"]').as('loginButton');
    cy.get('@loginButton').click();
    cy.wait(1500);

    // ir a reviews

    cy.intercept('GET', '/review/all', req => {
      delete req.headers['if-none-match'];
    }
    ).as('reviews');

    cy.intercept('DELETE', '/review/delete/*').as('deleteReview');


    cy.visit('/admin/reviews');
    cy.wait('@reviews').then(({ request, response }) => {
      const reviews = response.body.data.length;
      const index = reviews - 1;

      cy.get('[data-test-id="cypress-button-delete-' + index + '"]').click();

      cy.wait(300);
    });

    cy.wait('@deleteReview').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
  })
})

// TEST 7 - EDICION DE PERFIL
describe('TEST 7 - EDICION DE PRODUCTO', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('[data-test-id="cypress-header-login"]').should('exist').should('be.visible');
    cy.get('[data-test-id="cypress-email-login"]').as('loginEmail');
    cy.get('[data-test-id="cypress-password-login"]').as('loginPassword');

    // datos correctos
    cy.get('@loginEmail').type('correotest@gmail.com'); 
    cy.get('@loginPassword').type('Hackerdaniel123+');
    cy.wait(500);

    // click en el botón de login
    cy.get('[data-test-id="cypress-button-login"]').as('loginButton');
    cy.get('@loginButton').click();
    cy.wait(1500);

    // vista de perfil
    cy.intercept('GET', '/products/get/*',
    req => {
      delete req.headers['if-none-match'];
    }
  ).as('getProductos');

    cy.visit('/vendor/myproducts');

    // validación de la vista de perfil por medio de la respuesta de la petición
    cy.wait('@getProductos').then(({ request, response }) => {
       // Mensaje de Encontrado
      expect(response.body).to.have.property('message', 'Products found');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('array').that.is.not.empty;

      const productos = response.body.data.length;
      const index = productos - 1;

      cy.get('[data-test-id="cypress-button-edit-' + index + '"]').click();
    });

    // datos del producto
    cy.get('[data-test-id="cypress-input-productName"]').as('nameProduct');
    cy.get('[data-test-id="cypress-input-productDescription"]').as('description');

    cy.get('@nameProduct').clear();
    cy.get('@nameProduct').type('Oso de peluche - Cypress editado');
    cy.get('@description').clear();
    cy.get('@description').type('Oso de peluche de 1 metro de altura - desde Cypress editado');

    // click en el botón de guardar
    cy.intercept('PATCH', '**/products/update/*').as('product');
    cy.get('[data-test-id="cypress-button-save"]').as('saveButton');

    cy.get('@saveButton').click();
    cy.wait(1500);

    // validación de la creación del producto por medio de la respuesta de la petición
    cy.wait('@product').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });
  })
}
)

//TEST 8 - Revisión de reporte de vendedor
describe('TEST 8 - REVISIÓN CONSULTAS (REPORTE DE INGRESOS)', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('[data-test-id="cypress-header-login"]').should('exist').should('be.visible');
    cy.get('[data-test-id="cypress-email-login"]').as('loginEmail');
    cy.get('[data-test-id="cypress-password-login"]').as('loginPassword');

    // datos correctos
    cy.visit('/')
    cy.get('[data-test-id="cypress-header-login"]').should('exist').should('be.visible');
    cy.get('[data-test-id="cypress-email-login"]').as('loginEmail');
    cy.get('[data-test-id="cypress-password-login"]').as('loginPassword');

    // datos correctos
    cy.get('@loginEmail').type('correotest@gmail.com');
    cy.get('@loginPassword').type('Hackerdaniel123+');
    cy.wait(500);

    // click en el botón de login
    cy.get('[data-test-id="cypress-button-login"]').as('loginButton');
    cy.get('@loginButton').click();
    cy.wait(1500);

    cy.visit('/vendor/info');
    cy.wait(500);

    cy.intercept('GET', '/vendor/ingresos').as('report');
    cy.visit('/vendor/ingresos');

    cy.wait('@report').then(({ request, response }) => {
      expect(response.statusCode).to.eq(200);
    }
    );
    cy.get('[data-test-id="title"]').should('exist').should('be.visible');
  }
  )
}
)


// TEST 9 - DESDE ADMIN ELIMINAR REVIEW
describe('TEST 9 - REVISIÓN REPORTE ADMIN (TOP)', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('[data-test-id="cypress-header-login"]').should('exist').should('be.visible');
    cy.get('[data-test-id="cypress-email-login"]').as('loginEmail');
    cy.get('[data-test-id="cypress-password-login"]').as('loginPassword');

    // datos correctos
    cy.get('@loginEmail').type('admin@gmail.com');
    cy.get('@loginPassword').type('Hacker123+');
    cy.wait(500);

    // click en el botón de login
    cy.get('[data-test-id="cypress-button-login"]').as('loginButton');
    cy.get('@loginButton').click();
    cy.wait(1500);


    cy.visit('/admin/reports');
    cy.wait(500);

    cy.intercept('GET', '/admin/report3').as('report');


    cy.visit('/admin/report3');

    cy.wait('@report').then(({ request, response }) => {
      expect(response.statusCode).to.eq(200);
    }
    );
  })
})

// TEST 10 - Revision de reporte de top vendedores
describe('TEST 10 - REVISIÓN REPORTE ADMIN (TOP VENDEDORES)', () => {
  it('passes', () => {
    cy.visit('/')
    cy.get('[data-test-id="cypress-header-login"]').should('exist').should('be.visible');
    cy.get('[data-test-id="cypress-email-login"]').as('loginEmail');
    cy.get('[data-test-id="cypress-password-login"]').as('loginPassword');

    // datos correctos
    cy.get('@loginEmail').type('admin@gmail.com');
    cy.get('@loginPassword').type('Hacker123+');
    cy.wait(500);

    // click en el botón de login
    cy.get('[data-test-id="cypress-button-login"]').as('loginButton');
    cy.get('@loginButton').click();
    cy.wait(1500);


    cy.visit('/admin/reports');
    cy.wait(500);

    cy.intercept('GET', '/admin/report5').as('report');


    cy.visit('/admin/report5');

    cy.wait('@report').then(({ request, response }) => {
      expect(response.statusCode).to.eq(200);
    }
    );
  })
})