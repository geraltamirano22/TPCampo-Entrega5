class App {
    constructor() {
        this.currentPage = 'menu';
        this.editingEmpresa = null;
        
        // Cargar datos del localStorage o usar valores por defecto
        const savedData = localStorage.getItem('sistemaGestionData');
        if (savedData) {
            this.data = JSON.parse(savedData);
        } else {
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
        }
        
        this.nextEmpresaId = this.data.empresas.length > 0 ? Math.max(...this.data.empresas.map(e => e.id)) + 1 : 1;
        this.init();
    }

    saveData() {
        localStorage.setItem('sistemaGestionData', JSON.stringify(this.data));
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    navigateTo(page, returnTo = null) {
        this.currentPage = page;
        if (returnTo) {
            this.returnTo = returnTo;
        } else if (page === 'menu') {
            this.returnTo = null;
        }
        this.render();
        this.attachEventListeners();
    }

    navigateBack(defaultPage) {
        if (this.returnTo) {
            const returnPage = this.returnTo;
            this.returnTo = null;
            this.navigateTo(returnPage);
        } else {
            this.navigateTo(defaultPage);
        }
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
        const ofertasFilas = this.data.ofertas.map(oferta => `
            <tr>
                <td>${oferta.titulo}</td>
                <td>${oferta.categoria}</td>
                <td>${oferta.descripcion.substring(0, 50)}${oferta.descripcion.length > 50 ? '...' : ''}</td>
                <td><span style="background: #d4edda; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${oferta.estado}</span></td>
                <td>${oferta.fechaLimite}</td>
                <td>${oferta.modalidad}</td>
                <td>${oferta.ubicacion.localidad}, ${oferta.ubicacion.provincia}</td>
                <td>${oferta.areaEstudio}</td>
                <td>${oferta.empresa.nombre}</td>
                <td>
                    <button class="icon-btn delete" onclick="app.eliminarOferta(${oferta.id})" title="Eliminar">🗑</button>
                </td>
            </tr>
        `).join('');

        const filasVacias = this.data.ofertas.length === 0 ? `
            <tr>
                <td colspan="10" style="text-align: center; padding: 40px; color: #999;">Sin ofertas registradas</td>
            </tr>
        ` : '';

        return `
            <div class="container">
                <div class="header">
                    <h1>Ofertas</h1>
                </div>
                <div style="padding: 20px;">
                    <div class="search-bar">
                        <div class="search-input-group">
                            <input type="text" placeholder="Buscar ofertas...">
                            <button class="btn btn-secondary">🔍</button>
                            <button class="btn btn-primary" onclick="app.navigateTo('alta-oferta')">+</button>
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
                                ${ofertasFilas}
                                ${filasVacias}
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn btn-secondary" onclick="app.navigateTo('menu')">Salir</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderAltaOferta() {
        const empresasOptions = this.data.empresas.map(e => `<option value="${e.nombre}">`).join('');
        const candidatosOptions = this.data.candidatos ? this.data.candidatos.map(c => `<option value="${c.nombre}">`).join('') : '';

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
                            <input type="text" id="tituloOferta" placeholder="Título de la oferta">
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>Fecha Límite:</label>
                                <input type="date" id="fechaLimiteOferta">
                            </div>
                            <div></div>
                        </div>
                        
                        <div class="form-group">
                            <label>Categoría:</label>
                            <select id="categoriaOferta">
                                <option value="">Seleccionar...</option>
                                <option value="IT">IT</option>
                                <option value="Administrativo">Administrativo</option>
                                <option value="Ventas">Ventas</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Descripción:</label>
                            <textarea id="descripcionOferta" placeholder="Inserte una descripción..."></textarea>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>Modalidad:</label>
                                <select id="modalidadOferta">
                                    <option value="Presencial">Presencial</option>
                                    <option value="Remoto">Remoto</option>
                                    <option value="Híbrido">Híbrido</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Área de estudio:</label>
                                <select id="areaEstudioOferta">
                                    <option value="">Seleccionar...</option>
                                    <option value="Tecnología">Tecnología</option>
                                    <option value="Administración">Administración</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Tab Ubicación -->
                    <div class="tab-content" data-content="ubicacion">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Calle:</label>
                                <input type="text" id="calleOferta" placeholder="">
                            </div>
                            <div class="form-group">
                                <label>Número:</label>
                                <input type="text" id="numeroOferta" placeholder="">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>Piso:</label>
                                <input type="text" id="pisoOferta" placeholder="">
                            </div>
                            <div class="form-group">
                                <label>Departamento:</label>
                                <input type="text" id="deptoOferta" placeholder="">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>País:</label>
                                <select id="paisOferta">
                                    <option value="">Seleccionar...</option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Chile">Chile</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Provincia:</label>
                                <select id="provinciaOferta">
                                    <option value="">Seleccionar...</option>
                                    <option value="Buenos Aires">Buenos Aires</option>
                                    <option value="Córdoba">Córdoba</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Localidad:</label>
                            <select id="localidadOferta">
                                <option value="">Seleccionar...</option>
                                <option value="La Plata">La Plata</option>
                                <option value="Berazategui">Berazategui</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Tab Entidades -->
                    <div class="tab-content" data-content="entidades">
                        <div class="form-group">
                            <label>Empresa:</label>
                            <div class="search-input-group">
                                <input type="text" id="empresaOferta" list="listaEmpresas" placeholder="Buscar empresa...">
                                <datalist id="listaEmpresas">
                                    ${empresasOptions}
                                </datalist>
                                <button class="btn btn-primary" onclick="app.navigateTo('alta-empresa', 'alta-oferta')" title="Nueva Empresa">+</button>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Candidato:</label>
                            <div class="search-input-group">
                                <input type="text" id="candidatoOferta" list="listaCandidatos" placeholder="Buscar candidato...">
                                <datalist id="listaCandidatos">
                                    ${candidatosOptions}
                                </datalist>
                                <button class="btn btn-primary" onclick="app.navigateTo('alta-candidato', 'alta-oferta')" title="Nuevo Candidato">+</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn btn-primary" onclick="app.guardarOferta()">Guardar</button>
                        <button class="btn btn-secondary" onclick="app.navigateTo('ofertas')">Cancelar</button>
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
                </div>
                <div style="padding: 20px;">
                    <div class="search-bar">
                        <div class="search-input-group">
                            <input type="text" placeholder="Buscar empresa..." id="searchEmpresa">
                            <button class="btn btn-secondary" onclick="app.buscarEmpresas()">🔍</button>
                            <button class="btn btn-primary" onclick="app.navigateTo('alta-empresa')">+</button>
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
                        <button class="btn btn-secondary" onclick="app.navigateTo('menu')">Salir</button>
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
                    <button class="back-btn" onclick="app.navigateBack('empresas')">← Volver</button>
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
                        <button class="btn btn-primary" onclick="app.guardarEmpresa()">Guardar</button>
                        <button class="btn btn-secondary" onclick="app.navigateBack('empresas')">Cancelar</button>
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
                </div>
                <div style="padding: 20px;">
                    <div class="search-bar">
                        <div class="search-input-group">
                            <input type="text" placeholder="Buscar candidato...">
                            <button class="btn btn-secondary">🔍</button>
                            <button class="btn btn-primary" onclick="app.navigateTo('alta-candidato')">+</button>
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
                        <button class="btn btn-secondary" onclick="app.navigateTo('menu')">Salir</button>
                    </div>
                </div>
            </div>
        `;
    }
    renderAltaCandidato() {
        return `
            <div class="container">
                <div class="header">
                    <button class="back-btn" onclick="app.navigateBack('candidatos')">← Volver</button>
                    <h1>Registrar Candidato</h1>
                </div>
                <div style="padding: 20px;">
                    <div class="form-group">
                        <label>Nombre y Apellido:</label>
                        <input type="text" id="nombreCandidato" placeholder="">
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Legajo:</label>
                            <input type="text" id="legajoCandidato" placeholder="">
                        </div>
                        <div class="form-group">
                            <label>Teléfono:</label>
                            <input type="tel" id="telefonoCandidato" placeholder="">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Carrera:</label>
                        <select id="carreraCandidato">
                            <option>Seleccionar...</option>
                            <option>Ingeniería Informática</option>
                            <option>Ingeniería en Sistemas</option>
                            <option>Administración</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>¿Es graduado?</label>
                        <div class="radio-group">
                            <label><input type="radio" name="graduado" value="si"> Sí</label>
                            <label><input type="radio" name="graduado" value="no" checked> No</label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Curriculum:</label>
                        <input type="file" id="cvCandidato">
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
                        <button class="btn btn-primary" onclick="app.guardarCandidato()">Guardar</button>
                        <button class="btn btn-secondary" onclick="app.navigateBack('candidatos')">Cancelar</button>
                    </div>
                </div>
            </div>
        `;
    }

    guardarCandidato() {
        const nombre = document.getElementById('nombreCandidato').value.trim();
        const legajo = document.getElementById('legajoCandidato').value.trim();
        const telefono = document.getElementById('telefonoCandidato').value.trim();
        const carrera = document.getElementById('carreraCandidato').value;
        
        if (!nombre || !legajo) {
            alert('Por favor, completa los campos obligatorios (Nombre, Legajo)');
            return;
        }

        const nuevoCandidato = {
            id: Date.now(),
            nombre,
            legajo,
            telefono,
            carrera,
            graduado: document.querySelector('input[name="graduado"]:checked').value === 'si'
        };

        this.data.candidatos.push(nuevoCandidato);
        this.saveData();
        
        alert('Candidato guardado correctamente');
        this.navigateBack('candidatos');
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
                            <button class="btn btn-primary" onclick="app.navigateTo('alta-postulacion')">+</button>
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
                        <button class="btn btn-secondary" onclick="app.navigateTo('ofertas')">Salir</button>
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
                        <button class="btn btn-primary">Guardar</button>
                        <button class="btn btn-secondary" onclick="app.navigateTo('postulaciones')">Cancelar</button>
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

    eliminarOferta(id) {
        if (confirm('¿Estás seguro de que deseas eliminar esta oferta?')) {
            this.data.ofertas = this.data.ofertas.filter(o => o.id !== id);
            this.saveData();
            this.render();
            this.attachEventListeners();
        }
    }

    guardarOferta() {
        // Obtener valores del formulario
        const titulo = document.getElementById('tituloOferta').value;
        const fechaLimite = document.getElementById('fechaLimiteOferta').value;
        const categoria = document.getElementById('categoriaOferta').value;
        const descripcion = document.getElementById('descripcionOferta').value;
        const modalidad = document.getElementById('modalidadOferta').value;
        const areaEstudio = document.getElementById('areaEstudioOferta').value;
        
        const calle = document.getElementById('calleOferta').value;
        const numero = document.getElementById('numeroOferta').value;
        const piso = document.getElementById('pisoOferta').value;
        const depto = document.getElementById('deptoOferta').value;
        const pais = document.getElementById('paisOferta').value;
        const provincia = document.getElementById('provinciaOferta').value;
        const localidad = document.getElementById('localidadOferta').value;
        
        const empresaNombre = document.getElementById('empresaOferta').value;
        const candidatoNombre = document.getElementById('candidatoOferta').value;

        if (!titulo || !fechaLimite || !categoria || !empresaNombre || !calle || !numero || !pais || !provincia || !localidad) {
            let faltantes = [];
            if (!titulo) faltantes.push("Título");
            if (!fechaLimite) faltantes.push("Fecha Límite");
            if (!categoria) faltantes.push("Categoría");
            if (!empresaNombre) faltantes.push("Empresa");
            if (!calle) faltantes.push("Calle");
            if (!numero) faltantes.push("Número");
            if (!pais) faltantes.push("País");
            if (!provincia) faltantes.push("Provincia");
            if (!localidad) faltantes.push("Localidad");
            
            alert('Por favor, completa los siguientes campos obligatorios: ' + faltantes.join(', '));
            return;
        }

        const empresa = this.data.empresas.find(e => e.nombre === empresaNombre);
        const candidato = this.data.candidatos ? this.data.candidatos.find(c => c.nombre === candidatoNombre) : null;

        const nuevaOferta = {
            id: Date.now(), // ID simple basado en timestamp
            titulo,
            fechaLimite,
            categoria,
            descripcion,
            modalidad,
            areaEstudio,
            ubicacion: {
                calle, numero, piso, depto, pais, provincia, localidad
            },
            empresa: {
                id: empresa ? empresa.id : null,
                nombre: empresaNombre
            },
            candidato: {
                id: candidato ? candidato.id : null,
                nombre: candidatoNombre
            },
            estado: 'Activa'
        };

        this.data.ofertas.push(nuevaOferta);
        this.saveData();
        
        alert('Oferta guardada correctamente');
        this.navigateTo('ofertas');
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

        this.saveData();
        alert('Empresa guardada correctamente');
        this.navigateBack('empresas');
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
            this.saveData();
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
