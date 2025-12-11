class App {
    constructor() {
        this.currentPage = 'menu';
        this.editingEmpresa = null;
        this.data = {
            ofertas: [],
            empresas: [
                { id: 1, nombre: 'Tech Solutions', cuil: '20-12345678-9', razonSocial: 'Tech Solutions SA', descripcion: 'Empresa de tecnología' },
                { id: 2, nombre: 'Innovation Corp', cuil: '20-98765432-1', razonSocial: 'Innovation Corp SRL', descripcion: 'Consultoría empresarial' },
                { id: 3, nombre: 'Digital Minds', cuil: '20-55555555-5', razonSocial: 'Digital Minds LTDA', descripcion: 'Agencia digital' },
                { id: 4, nombre: 'Global Services', cuil: '20-11111111-2', razonSocial: 'Global Services Inc', descripcion: 'Servicios globales' }
            ],
            candidatos: [],
            postulaciones: []
        };
        this.nextEmpresaId = 5;
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    navigateTo(page) {
        this.currentPage = page;
        this.render();
        this.attachEventListeners();
    }

    render() {
        const app = document.getElementById('app');
        
        if (this.currentPage === 'menu') {
            app.innerHTML = this.renderMenu();
        } else if (this.currentPage === 'ofertas') {
            app.innerHTML = this.renderOfertas();
        } else if (this.currentPage === 'alta-oferta') {
            app.innerHTML = this.renderAltaOferta();
        } else if (this.currentPage === 'empresas') {
            app.innerHTML = this.renderEmpresas();
        } else if (this.currentPage === 'alta-empresa') {
            app.innerHTML = this.renderAltaEmpresa();
        } else if (this.currentPage === 'candidatos') {
            app.innerHTML = this.renderCandidatos();
        } else if (this.currentPage === 'alta-candidato') {
            app.innerHTML = this.renderAltaCandidato();
        } else if (this.currentPage === 'postulaciones') {
            app.innerHTML = this.renderPostulaciones();
        } else if (this.currentPage === 'alta-postulacion') {
            app.innerHTML = this.renderAltaPostulacion();
        }
        
        window.scrollTo(0, 0);
    }

    renderMenu() {
        return `
            <div class="container">
                <div class="header">
                    <h1>Sistema de Gestión</h1>
                </div>
                <div class="menu">
                    <div class="menu-title">Selecciona un módulo</div>
                    <div class="menu-buttons">
                        <button class="menu-btn" onclick="app.navigateTo('empresas')">Empresas</button>
                        <button class="menu-btn" onclick="app.navigateTo('candidatos')">Candidatos</button>
                        <button class="menu-btn" onclick="app.navigateTo('ofertas')">Ofertas</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderOfertas() {
        return `
            <div class="container">
                <div class="header">
                    <h1>Ofertas</h1>
                    <button class="btn btn-primary" onclick="app.navigateTo('alta-oferta')">+ Nueva Oferta</button>
                </div>
                <div style="padding: 20px;">
                    <div class="search-bar">
                        <div class="search-input-group">
                            <input type="text" placeholder="Buscar ofertas...">
                            <button class="btn btn-secondary">🔍</button>
                        </div>
                    </div>
                    
                    <div class="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Título</th>
                                    <th>Categoría</th>
                                    <th>Descripción</th>
                                    <th>Estado</th>
                                    <th>Fecha Límite</th>
                                    <th>Modalidad</th>
                                    <th>Ubicación</th>
                                    <th>Área Estudio</th>
                                    <th>Empresa</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="10" style="text-align: center; padding: 40px; color: #999;">Sin ofertas registradas</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn btn-secondary" onclick="app.navigateTo('menu')">Volver</button>
                        <button class="btn btn-primary" onclick="app.navigateTo('alta-oferta')">Guardar Nueva Oferta</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderAltaOferta() {
        return `
            <div class="container">
                <div class="header">
                    <button class="back-btn" onclick="app.navigateTo('ofertas')">← Volver</button>
                    <h1>Guardar Alta Oferta</h1>
                </div>
                
                <div class="tabs">
                    <button class="tab active" data-tab="oferta">Oferta</button>
                    <button class="tab" data-tab="ubicacion">Ubicación</button>
                    <button class="tab" data-tab="entidades">Entidades</button>
                </div>
                
                <div style="padding: 20px;">
                    <!-- Tab Oferta -->
                    <div class="tab-content active" data-content="oferta">
                        <div class="form-group">
                            <label>Título:</label>
                            <input type="text" placeholder="Título de la oferta">
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>Fecha Límite:</label>
                                <input type="date">
                            </div>
                            <div></div>
                        </div>
                        
                        <div class="form-group">
                            <label>Categoría:</label>
                            <select>
                                <option>Seleccionar...</option>
                                <option>IT</option>
                                <option>Administrativo</option>
                                <option>Ventas</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Descripción:</label>
                            <textarea placeholder="Inserte una descripción..."></textarea>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>Modalidad:</label>
                                <select>
                                    <option>Presencial</option>
                                    <option>Remoto</option>
                                    <option>Híbrido</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Área de estudio:</label>
                                <select>
                                    <option>Seleccionar...</option>
                                    <option>Tecnología</option>
                                    <option>Administración</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Tab Ubicación -->
                    <div class="tab-content" data-content="ubicacion">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Calle:</label>
                                <input type="text" placeholder="">
                            </div>
                            <div class="form-group">
                                <label>Número:</label>
                                <input type="text" placeholder="">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>Piso:</label>
                                <input type="text" placeholder="">
                            </div>
                            <div class="form-group">
                                <label>Departamento:</label>
                                <input type="text" placeholder="">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>País:</label>
                                <select>
                                    <option>Seleccionar...</option>
                                    <option>Argentina</option>
                                    <option>Chile</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Provincia:</label>
                                <select>
                                    <option>Seleccionar...</option>
                                    <option>Buenos Aires</option>
                                    <option>Córdoba</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Localidad:</label>
                            <select>
                                <option>Seleccionar...</option>
                                <option>La Plata</option>
                                <option>Berazategui</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Tab Entidades -->
                    <div class="tab-content" data-content="entidades">
                        <div class="form-group">
                            <label>Empresa:</label>
                            <select>
                                <option>Seleccionar empresa...</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Contacto:</label>
                            <input type="text" placeholder="Nombre del contacto">
                        </div>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn btn-secondary" onclick="app.navigateTo('ofertas')">Cancelar</button>
                        <button class="btn btn-primary">Guardar</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderEmpresas() {
        const empresasFilas = this.data.empresas.map(empresa => `
            <tr>
                <td>${empresa.cuil}</td>
                <td>${empresa.descripcion}</td>
                <td><span style="background: #d4edda; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Activa</span></td>
                <td>${empresa.nombre}</td>
                <td>${empresa.razonSocial}</td>
                <td>
                    <button class="icon-btn edit" onclick="app.editarEmpresa(${empresa.id})" title="Editar">✎</button>
                    <button class="icon-btn delete" onclick="app.eliminarEmpresa(${empresa.id})" title="Eliminar">🗑</button>
                </td>
            </tr>
        `).join('');

        const filasVacias = this.data.empresas.length === 0 ? `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px; color: #999;">Sin empresas registradas</td>
            </tr>
        ` : '';

        return `
            <div class="container">
                <div class="header">
                    <h1>Empresas</h1>
                    <button class="btn btn-primary" onclick="app.navigateTo('alta-empresa')">+ Nueva Empresa</button>
                </div>
                <div style="padding: 20px;">
                    <div class="search-bar">
                        <div class="search-input-group">
                            <input type="text" placeholder="Buscar empresa..." id="searchEmpresa">
                            <button class="btn btn-secondary" onclick="app.buscarEmpresas()">🔍</button>
                        </div>
                    </div>
                    
                    <div class="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>CUIL</th>
                                    <th>Descripción</th>
                                    <th>Estado</th>
                                    <th>Nombre</th>
                                    <th>Razón Social</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${empresasFilas}
                                ${filasVacias}
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn btn-secondary" onclick="app.navigateTo('menu')">Volver</button>
                        <button class="btn btn-primary" onclick="app.navigateTo('alta-empresa')">Guardar Nueva Empresa</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderAltaEmpresa() {
        const titulo = this.editingEmpresa ? 'Editar Empresa' : 'Registrar Empresa';
        const empresa = this.editingEmpresa || { nombre: '', cuil: '', razonSocial: '', descripcion: '' };
        
        return `
            <div class="container">
                <div class="header">
                    <button class="back-btn" onclick="app.navigateTo('empresas')">← Volver</button>
                    <h1>${titulo}</h1>
                </div>
                <div style="padding: 20px;">
                    <div class="form-group">
                        <label>Nombre:</label>
                        <input type="text" id="nombreEmpresa" placeholder="Ej: Tech Solutions" value="${empresa.nombre}">
                    </div>
                    
                    <div class="form-group">
                        <label>CUIL:</label>
                        <input type="text" id="cuilEmpresa" placeholder="Ej: 20-12345678-9" value="${empresa.cuil}">
                    </div>
                    
                    <div class="form-group">
                        <label>Razón Social:</label>
                        <input type="text" id="razonSocialEmpresa" placeholder="Ej: Tech Solutions SA" value="${empresa.razonSocial}">
                    </div>
                    
                    <div class="form-group">
                        <label>Descripción:</label>
                        <textarea id="descripcionEmpresa" placeholder="Describa el ramo de la empresa">${empresa.descripcion}</textarea>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn btn-secondary" onclick="app.navigateTo('empresas')">Cancelar</button>
                        <button class="btn btn-primary" onclick="app.guardarEmpresa()">Guardar</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderCandidatos() {
        return `
            <div class="container">
                <div class="header">
                    <h1>Candidatos</h1>
                    <button class="btn btn-primary" onclick="app.navigateTo('alta-candidato')">+ Nuevo Candidato</button>
                </div>
                <div style="padding: 20px;">
                    <div class="search-bar">
                        <div class="search-input-group">
                            <input type="text" placeholder="Buscar candidato...">
                            <button class="btn btn-secondary">🔍</button>
                        </div>
                    </div>
                    
                    <div class="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Legajo</th>
                                    <th>Teléfono</th>
                                    <th>Carrera</th>
                                    <th>¿Es graduado?</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="6" style="text-align: center; padding: 40px; color: #999;">Sin candidatos registrados</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn btn-secondary" onclick="app.navigateTo('menu')">Volver</button>
                        <button class="btn btn-primary" onclick="app.navigateTo('alta-candidato')">Guardar Nuevo Candidato</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderAltaCandidato() {
        return `
            <div class="container">
                <div class="header">
                    <button class="back-btn" onclick="app.navigateTo('candidatos')">← Volver</button>
                    <h1>Registrar Candidato</h1>
                </div>
                <div style="padding: 20px;">
                    <div class="form-group">
                        <label>Nombre y Apellido:</label>
                        <input type="text" placeholder="">
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Legajo:</label>
                            <input type="text" placeholder="">
                        </div>
                        <div class="form-group">
                            <label>Teléfono:</label>
                            <input type="tel" placeholder="">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Carrera:</label>
                        <select>
                            <option>Seleccionar...</option>
                            <option>Ingeniería Informática</option>
                            <option>Ingeniería en Sistemas</option>
                            <option>Administración</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>¿Es graduado?</label>
                        <div class="radio-group">
                            <label><input type="radio" name="graduado"> Sí</label>
                            <label><input type="radio" name="graduado"> No</label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Curriculum:</label>
                        <input type="text" placeholder="Elegir archivo...">
                    </div>
                    
                    <div class="form-group">
                        <label>Aptitud:</label>
                        <div style="display: flex; gap: 10px;">
                            <input type="text" placeholder="">
                            <button class="btn btn-primary btn-small">+</button>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <div class="table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Descripción</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="2" style="text-align: center; padding: 30px; color: #999;">Sin aptitudes registradas</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn btn-secondary" onclick="app.navigateTo('candidatos')">Cancelar</button>
                        <button class="btn btn-primary">Guardar</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderPostulaciones() {
        return `
            <div class="container">
                <div class="header">
                    <button class="back-btn" onclick="app.navigateTo('ofertas')">← Volver</button>
                    <h1>Postulaciones de la Oferta</h1>
                </div>
                <div style="padding: 20px;">
                    <div class="search-bar">
                        <div class="search-input-group">
                            <input type="text" placeholder="Buscar postulación...">
                            <button class="btn btn-secondary">🔍</button>
                            <button class="btn btn-primary" onclick="app.navigateTo('alta-postulacion')">+ Nueva</button>
                        </div>
                    </div>
                    
                    <div class="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Estado</th>
                                    <th>Fecha</th>
                                    <th>Candidato</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="4" style="text-align: center; padding: 40px; color: #999;">Sin postulaciones registradas</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn btn-secondary" onclick="app.navigateTo('ofertas')">Volver</button>
                        <button class="btn btn-primary" onclick="app.navigateTo('alta-postulacion')">Guardar Nueva Postulación</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderAltaPostulacion() {
        return `
            <div class="container">
                <div class="header">
                    <button class="back-btn" onclick="app.navigateTo('postulaciones')">← Volver</button>
                    <h1>Registrar Postulación</h1>
                </div>
                <div style="padding: 20px;">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Fecha:</label>
                            <input type="date" placeholder="">
                        </div>
                        <div class="form-group">
                            <label>Estado:</label>
                            <select>
                                <option>En Revisión</option>
                                <option>Aceptado</option>
                                <option>Rechazado</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Buscar Candidato:</label>
                        <input type="text" placeholder="">
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn btn-secondary" onclick="app.navigateTo('postulaciones')">Cancelar</button>
                        <button class="btn btn-primary">Guardar</button>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Tabs
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.getAttribute('data-tab');
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                document.querySelector(`[data-content="${tabName}"]`).classList.add('active');
            });
        });
    }

    guardarEmpresa() {
        const nombre = document.getElementById('nombreEmpresa').value.trim();
        const cuil = document.getElementById('cuilEmpresa').value.trim();
        const razonSocial = document.getElementById('razonSocialEmpresa').value.trim();
        const descripcion = document.getElementById('descripcionEmpresa').value.trim();

        if (!nombre || !cuil || !razonSocial) {
            alert('Por favor, completa todos los campos requeridos');
            return;
        }

        if (this.editingEmpresa) {
            // Editar empresa existente
            const empresaIndex = this.data.empresas.findIndex(e => e.id === this.editingEmpresa.id);
            if (empresaIndex !== -1) {
                this.data.empresas[empresaIndex] = {
                    id: this.editingEmpresa.id,
                    nombre,
                    cuil,
                    razonSocial,
                    descripcion
                };
            }
            this.editingEmpresa = null;
        } else {
            // Agregar nueva empresa
            this.data.empresas.push({
                id: this.nextEmpresaId++,
                nombre,
                cuil,
                razonSocial,
                descripcion
            });
        }

        alert('Empresa guardada correctamente');
        this.navigateTo('empresas');
    }

    editarEmpresa(id) {
        const empresa = this.data.empresas.find(e => e.id === id);
        if (empresa) {
            this.editingEmpresa = empresa;
            this.navigateTo('alta-empresa');
        }
    }

    eliminarEmpresa(id) {
        if (confirm('¿Estás seguro de que deseas eliminar esta empresa?')) {
            this.data.empresas = this.data.empresas.filter(e => e.id !== id);
            this.render();
            this.attachEventListeners();
        }
    }

    buscarEmpresas() {
        const searchTerm = document.getElementById('searchEmpresa').value.toLowerCase();
        const empresasFiltradas = this.data.empresas.filter(empresa => 
            empresa.nombre.toLowerCase().includes(searchTerm) ||
            empresa.cuil.toLowerCase().includes(searchTerm) ||
            empresa.razonSocial.toLowerCase().includes(searchTerm)
        );

        const empresasFilas = empresasFiltradas.map(empresa => `
            <tr>
                <td>${empresa.cuil}</td>
                <td>${empresa.descripcion}</td>
                <td><span style="background: #d4edda; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Activa</span></td>
                <td>${empresa.nombre}</td>
                <td>${empresa.razonSocial}</td>
                <td>
                    <button class="icon-btn edit" onclick="app.editarEmpresa(${empresa.id})" title="Editar">✎</button>
                    <button class="icon-btn delete" onclick="app.eliminarEmpresa(${empresa.id})" title="Eliminar">🗑</button>
                </td>
            </tr>
        `).join('');

        const tablaBody = document.querySelector('table tbody');
        tablaBody.innerHTML = empresasFilas || `<tr><td colspan="6" style="text-align: center; padding: 40px; color: #999;">Sin resultados</td></tr>`;
    }
}

const app = new App();
