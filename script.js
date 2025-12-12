class App {
    constructor() {
        this.currentPage = 'menu';
        this.editingEmpresa = null;
        this.editingCandidato = null;
        this.editingOferta = null;
        this.editingPostulacion = null;
        this.ofertaSeleccionadaId = null;
        this.aptitudesTemp = [];
        this.aptitudEditandoIndex = -1;
        this.data = {
            ofertas: [
                {
                    id: 1,
                    titulo: 'Dev Backend',
                    categoria: 'IT',
                    descripcion: 'API REST con Node.js y PostgreSQL',
                    estado: 'Activa',
                    fechaLimite: '2025-12-31',
                    modalidad: 'Remoto',
                    areaEstudio: 'Tecnología',
                    ubicacion: { calle: 'Calle 10', numero: '123', piso: '', depto: '', pais: 'Argentina', provincia: 'Buenos Aires', localidad: 'La Plata' },
                    empresa: { id: 1, nombre: 'Tech Solutions' }
                },
                {
                    id: 2,
                    titulo: 'Analista Funcional',
                    categoria: 'Administrativo',
                    descripcion: 'Relevamiento, user stories y testing de aceptación',
                    estado: 'Activa',
                    fechaLimite: '2026-01-15',
                    modalidad: 'Híbrido',
                    areaEstudio: 'Administración',
                    ubicacion: { calle: 'Av. Siempre Viva', numero: '742', piso: '2', depto: 'B', pais: 'Argentina', provincia: 'Buenos Aires', localidad: 'La Plata' },
                    empresa: { id: 2, nombre: 'Innovation Corp' }
                }
            ],
            empresas: [
                { id: 1, nombre: 'Tech Solutions', cuil: '20-12345678-9', razonSocial: 'Tech Solutions SA', descripcion: 'Empresa de tecnología' },
                { id: 2, nombre: 'Innovation Corp', cuil: '20-98765432-1', razonSocial: 'Innovation Corp SRL', descripcion: 'Consultoría empresarial' },
                { id: 3, nombre: 'Digital Minds', cuil: '20-55555555-5', razonSocial: 'Digital Minds LTDA', descripcion: 'Agencia digital' },
                { id: 4, nombre: 'Global Services', cuil: '20-11111111-2', razonSocial: 'Global Services Inc', descripcion: 'Servicios globales' }
            ],
            candidatos: [
                { id: 1, nombre: 'Juan Perez', legajo: '12345', telefono: '1123456789', carrera: 'Ingeniería Informática', graduado: true },
                { id: 2, nombre: 'María García', legajo: '12346', telefono: '1187654321', carrera: 'Ingeniería en Sistemas', graduado: false },
                { id: 3, nombre: 'Carlos López', legajo: '12347', telefono: '1155555555', carrera: 'Administración', graduado: true }
            ],
            postulaciones: []
        };
        this.nextEmpresaId = 5;
        this.nextCandidatoId = 4;
        this.nextOfertaId = 3;
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
                <td><button class="btn btn-secondary btn-small" onclick="app.mostrarDetalleEmpresaOferta(${oferta.id})">${oferta.empresa.nombre}</button></td>
                <td style="display: flex; gap: 8px; align-items: center;">
                    <a href="#" style="cursor:pointer; color:#0066cc; text-decoration:underline; white-space: nowrap;" onclick="app.verPostulacionesOferta(${oferta.id}); return false;">Postulaciones</a>
                    <button class="icon-btn edit" onclick="app.editarOferta(${oferta.id})" title="Editar">✎</button>
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
                            <button class="btn btn-primary" onclick="app.irAltaOfertaNueva()">+</button>
                        </div>
                    </div>
                    
                    <div class="table-wrapper">
                        <table style="table-layout: auto; width: 100%;">
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
                                    <th style="min-width: 220px;">Acciones</th>
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

            <!-- Modal genérico para detalles -->
            <div id="modalDetalle" style="display:none; position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.45); z-index: 2000;">
                <div style="position:absolute; top:50%; left:50%; transform: translate(-50%, -50%); background:white; border-radius:8px; box-shadow:0 8px 30px rgba(0,0,0,0.25); width:420px; max-width:90%;">
                    <div style="padding:16px 20px; border-bottom:1px solid #eee; display:flex; justify-content:space-between; align-items:center;">
                        <h3 id="modalDetalleTitulo" style="margin:0; font-size:18px;">Detalle</h3>
                        <button style="border:none; background:none; font-size:18px; cursor:pointer;" onclick="app.cerrarModalDetalle()">×</button>
                    </div>
                    <div id="modalDetalleContenido" style="padding:16px 20px; white-space:pre-line; line-height:1.4;"></div>
                    <div style="padding:12px 20px; border-top:1px solid #eee; display:flex; justify-content:flex-end;">
                        <button class="btn btn-secondary" onclick="app.cerrarModalDetalle()">Cerrar</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderAltaOferta() {
        const oferta = this.editingOferta || {
            titulo: '',
            fechaLimite: '',
            categoria: '',
            descripcion: '',
            modalidad: 'Presencial',
            areaEstudio: '',
            ubicacion: { calle: '', numero: '', piso: '', depto: '', pais: '', provincia: '', localidad: '' },
            empresa: { nombre: '' },
            candidato: { nombre: '' }
        };
        const tituloPantalla = this.editingOferta ? 'Editar Oferta' : 'Guardar Alta Oferta';
        const empresasOptions = this.data.empresas.map(e => `<option value="${e.nombre}">`).join('');
        const candidatosOptions = this.data.candidatos ? this.data.candidatos.map(c => `<option value="${c.nombre}">`).join('') : '';

        return `
            <div class="container">
                <div class="header">
                    <h1>${tituloPantalla}</h1>
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
                            <input type="text" id="tituloOferta" placeholder="Título de la oferta" value="${oferta.titulo}">
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>Fecha Límite:</label>
                                <input type="date" id="fechaLimiteOferta" value="${oferta.fechaLimite}">
                            </div>
                            <div></div>
                        </div>
                        
                        <div class="form-group">
                            <label>Categoría:</label>
                            <select id="categoriaOferta">
                                <option value="">Seleccionar...</option>
                                <option value="IT" ${oferta.categoria === 'IT' ? 'selected' : ''}>IT</option>
                                <option value="Administrativo" ${oferta.categoria === 'Administrativo' ? 'selected' : ''}>Administrativo</option>
                                <option value="Ventas" ${oferta.categoria === 'Ventas' ? 'selected' : ''}>Ventas</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Descripción:</label>
                            <textarea id="descripcionOferta" placeholder="Inserte una descripción...">${oferta.descripcion}</textarea>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>Modalidad:</label>
                                <select id="modalidadOferta">
                                    <option value="Presencial" ${oferta.modalidad === 'Presencial' ? 'selected' : ''}>Presencial</option>
                                    <option value="Remoto" ${oferta.modalidad === 'Remoto' ? 'selected' : ''}>Remoto</option>
                                    <option value="Híbrido" ${oferta.modalidad === 'Híbrido' ? 'selected' : ''}>Híbrido</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Área de estudio:</label>
                                <select id="areaEstudioOferta">
                                    <option value="">Seleccionar...</option>
                                    <option value="Tecnología" ${oferta.areaEstudio === 'Tecnología' ? 'selected' : ''}>Tecnología</option>
                                    <option value="Administración" ${oferta.areaEstudio === 'Administración' ? 'selected' : ''}>Administración</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Tab Ubicación -->
                    <div class="tab-content" data-content="ubicacion">
                        <div class="form-row">
                            <div class="form-group">
                                <label>Calle:</label>
                                <input type="text" id="calleOferta" placeholder="" value="${oferta.ubicacion.calle}">
                            </div>
                            <div class="form-group">
                                <label>Número:</label>
                                <input type="text" id="numeroOferta" placeholder="" value="${oferta.ubicacion.numero}">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>Piso:</label>
                                <input type="text" id="pisoOferta" placeholder="" value="${oferta.ubicacion.piso}">
                            </div>
                            <div class="form-group">
                                <label>Departamento:</label>
                                <input type="text" id="deptoOferta" placeholder="" value="${oferta.ubicacion.depto}">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>País:</label>
                                <select id="paisOferta">
                                    <option value="">Seleccionar...</option>
                                    <option value="Argentina" ${oferta.ubicacion.pais === 'Argentina' ? 'selected' : ''}>Argentina</option>
                                    <option value="Chile" ${oferta.ubicacion.pais === 'Chile' ? 'selected' : ''}>Chile</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Provincia:</label>
                                <select id="provinciaOferta">
                                    <option value="">Seleccionar...</option>
                                    <option value="Buenos Aires" ${oferta.ubicacion.provincia === 'Buenos Aires' ? 'selected' : ''}>Buenos Aires</option>
                                    <option value="Córdoba" ${oferta.ubicacion.provincia === 'Córdoba' ? 'selected' : ''}>Córdoba</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Localidad:</label>
                            <select id="localidadOferta">
                                <option value="">Seleccionar...</option>
                                <option value="La Plata" ${oferta.ubicacion.localidad === 'La Plata' ? 'selected' : ''}>La Plata</option>
                                <option value="Berazategui" ${oferta.ubicacion.localidad === 'Berazategui' ? 'selected' : ''}>Berazategui</option>
                            </select>
                        </div>
                    </div>
                    
                    <!-- Tab Entidades -->
                    <div class="tab-content" data-content="entidades">
                        <div class="form-group">
                            <label>Empresa:</label>
                            <div class="search-input-group">
                                <input type="text" id="empresaOferta" list="listaEmpresas" placeholder="Buscar empresa..." value="${oferta.empresa?.nombre || ''}">
                                <datalist id="listaEmpresas">
                                    ${empresasOptions}
                                </datalist>
                                <button class="btn btn-primary" onclick="app.navigateTo('alta-empresa', 'alta-oferta')" title="Nueva Empresa">+</button>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Candidato:</label>
                            <div class="search-input-group">
                                <input type="text" id="candidatoOferta" list="listaCandidatos" placeholder="Buscar candidato..." value="${oferta.candidato?.nombre || ''}">
                                <datalist id="listaCandidatos">
                                    ${candidatosOptions}
                                </datalist>
                                <button class="btn btn-primary" onclick="app.navigateTo('alta-candidato', 'alta-oferta')" title="Nuevo Candidato">+</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn btn-primary" onclick="app.guardarOferta()">Guardar</button>
                        <button class="btn btn-secondary" onclick="app.cancelarEdicionOferta()">Cancelar</button>
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
        const candidatosFilas = this.data.candidatos.map(candidato => `
            <tr>
                <td>${candidato.nombre}</td>
                <td>${candidato.legajo}</td>
                <td>${candidato.telefono}</td>
                <td>${candidato.carrera}</td>
                <td>${candidato.graduado ? 'Sí' : 'No'}</td>
                <td>
                    <button class="icon-btn edit" onclick="app.editarCandidato(${candidato.id})" title="Editar">✎</button>
                    <button class="icon-btn delete" onclick="app.eliminarCandidato(${candidato.id})" title="Eliminar">🗑</button>
                </td>
            </tr>
        `).join('');

        const filasVacias = this.data.candidatos.length === 0 ? `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px; color: #999;">Sin candidatos registrados</td>
            </tr>
        ` : '';

        return `
            <div class="container">
                <div class="header">
                    <h1>Candidatos</h1>
                </div>
                <div style="padding: 20px;">
                    <div class="search-bar">
                        <div class="search-input-group">
                            <input type="text" placeholder="Buscar candidato..." id="searchCandidato">
                            <button class="btn btn-secondary" onclick="app.buscarCandidatos()">🔍</button>
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
                                ${candidatosFilas}
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
    renderAltaCandidato() {
        const titulo = this.editingCandidato ? 'Editar Candidato' : 'Registrar Candidato';
        const candidato = this.editingCandidato || { nombre: '', legajo: '', telefono: '', carrera: 'Seleccionar...', graduado: false, aptitudes: [] };
        const graduadoSi = candidato.graduado ? 'checked' : '';
        const graduadoNo = !candidato.graduado ? 'checked' : '';
        
        // Si estamos editando, cargar las aptitudes del candidato
        if (this.editingCandidato && this.editingCandidato.aptitudes) {
            this.aptitudesTemp = [...this.editingCandidato.aptitudes];
        } else if (!this.editingCandidato && this.aptitudesTemp.length === 0) {
            this.aptitudesTemp = [];
        }
        
        const aptitudesFilas = this.aptitudesTemp.map((aptitud, index) => `
            <tr>
                <td>${aptitud}</td>
                <td>
                    <button class="icon-btn edit" onclick="app.editarAptitud(${index})" title="Editar">✎</button>
                    <button class="icon-btn delete" onclick="app.eliminarAptitud(${index})" title="Eliminar">🗑</button>
                </td>
            </tr>
        `).join('');

        const filasVacias = this.aptitudesTemp.length === 0 ? `
            <tr>
                <td colspan="2" style="text-align: center; padding: 30px; color: #999;">Sin aptitudes registradas</td>
            </tr>
        ` : '';
        
        return `
            <div class="container">
                <div class="header">
                    <h1>${titulo}</h1>
                </div>
                <div style="padding: 20px;">
                    <div class="form-group">
                        <label>Nombre y Apellido:</label>
                        <input type="text" id="nombreCandidato" placeholder="" value="${candidato.nombre}">
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Legajo:</label>
                            <input type="text" id="legajoCandidato" placeholder="" value="${candidato.legajo}">
                        </div>
                        <div class="form-group">
                            <label>Teléfono:</label>
                            <input type="tel" id="telefonoCandidato" placeholder="" value="${candidato.telefono}">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Carrera:</label>
                        <select id="carreraCandidato">
                            <option value="Seleccionar...">Seleccionar...</option>
                            <option value="Ingeniería Informática" ${candidato.carrera === 'Ingeniería Informática' ? 'selected' : ''}>Ingeniería Informática</option>
                            <option value="Ingeniería en Sistemas" ${candidato.carrera === 'Ingeniería en Sistemas' ? 'selected' : ''}>Ingeniería en Sistemas</option>
                            <option value="Administración" ${candidato.carrera === 'Administración' ? 'selected' : ''}>Administración</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>¿Es graduado?</label>
                        <div class="radio-group">
                            <label><input type="radio" id="graduadoSi" name="graduado" value="true" ${graduadoSi}> Sí</label>
                            <label><input type="radio" id="graduadoNo" name="graduado" value="false" ${graduadoNo}> No</label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Curriculum:</label>
                        <input type="file" id="cvCandidato">
                    </div>
                    
                    <div class="form-group">
                        <label>Aptitud:</label>
                        <div style="display: flex; gap: 10px;">
                            <input type="text" id="inputAptitud" placeholder="Ej: JavaScript, Python, etc.">
                            <button class="btn btn-primary btn-small" onclick="app.agregarAptitud()">+</button>
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
                                    ${aptitudesFilas}
                                    ${filasVacias}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn btn-primary" onclick="app.guardarCandidato()">Guardar</button>
                        <button class="btn btn-secondary" onclick="app.navigateTo('candidatos')">Cancelar</button>
                    </div>
                </div>
            </div>

            <!-- Modal para editar aptitud -->
            <div id="modalAptitud" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 1000;">
                <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 30px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3); width: 400px; max-width: 90%;">
                    <h2 style="margin-top: 0; margin-bottom: 20px;">Editar Aptitud</h2>
                    <div class="form-group" style="margin-bottom: 20px;">
                        <label>Aptitud:</label>
                        <input type="text" id="modalInputAptitud" placeholder="Ej: JavaScript, Python, etc." style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px;">
                    </div>
                    <div style="display: flex; gap: 10px; justify-content: flex-end;">
                        <button class="btn btn-secondary" onclick="app.cerrarModalAptitud()">Cancelar</button>
                        <button class="btn btn-primary" onclick="app.guardarAptitudModal()">Guardar</button>
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
        const oferta = this.data.ofertas.find(o => o.id === this.ofertaSeleccionadaId);
        const tituloOferta = oferta ? oferta.titulo : 'Oferta';
        const postulaciones = this.data.postulaciones.filter(p => !this.ofertaSeleccionadaId || p.ofertaId === this.ofertaSeleccionadaId);
        const filas = postulaciones.map(p => {
            const candidatoId = p.candidato?.id || null;
            const candidatoNombre = p.candidato?.nombre || 'Sin candidato';
            return `
                <tr>
                    <td>${p.estado}</td>
                    <td>${p.fecha}</td>
                    <td><a href="#" style="cursor:pointer; color:#0066cc; text-decoration:underline;" onclick="app.mostrarDetalleCandidato(${candidatoId}); return false;">${candidatoNombre}</a></td>
                    <td>
                        <button class="icon-btn edit" onclick="app.editarPostulacion(${p.id})" title="Editar">✎</button>
                        <button class="icon-btn delete" onclick="app.eliminarPostulacion(${p.id})" title="Eliminar">🗑</button>
                    </td>
                </tr>
            `;
        }).join('');

        const filasVacias = postulaciones.length === 0 ? `
            <tr>
                <td colspan="4" style="text-align: center; padding: 40px; color: #999;">Sin postulaciones registradas</td>
            </tr>
        ` : '';

        return `
            <div class="container">
                <div class="header">
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
                                ${filas}
                                ${filasVacias}
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn btn-secondary" onclick="app.navigateTo('ofertas')">Salir</button>
                    </div>
                </div>
            </div>

            <!-- Modal genérico para detalles -->
            <div id="modalDetalle" style="display:none; position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.45); z-index: 2000;">
                <div style="position:absolute; top:50%; left:50%; transform: translate(-50%, -50%); background:white; border-radius:8px; box-shadow:0 8px 30px rgba(0,0,0,0.25); width:420px; max-width:90%;">
                    <div style="padding:16px 20px; border-bottom:1px solid #eee; display:flex; justify-content:space-between; align-items:center;">
                        <h3 id="modalDetalleTitulo" style="margin:0; font-size:18px;">Detalle</h3>
                        <button style="border:none; background:none; font-size:18px; cursor:pointer;" onclick="app.cerrarModalDetalle()">×</button>
                    </div>
                    <div id="modalDetalleContenido" style="padding:16px 20px; white-space:pre-line; line-height:1.4;"></div>
                    <div style="padding:12px 20px; border-top:1px solid #eee; display:flex; justify-content:flex-end;">
                        <button class="btn btn-secondary" onclick="app.cerrarModalDetalle()">Cerrar</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderAltaPostulacion() {
        const postulacion = this.editingPostulacion || {
            fecha: new Date().toISOString().split('T')[0],
            estado: 'En Revisión',
            candidato: { nombre: '' }
        };
        const tituloPantalla = this.editingPostulacion ? 'Editar Postulación' : 'Registrar Postulación';
        const candidatosOptions = this.data.candidatos ? this.data.candidatos.map(c => `<option value="${c.nombre}">`).join('') : '';
        
        return `
            <div class="container">
                <div class="header">
                    <h1>${tituloPantalla}</h1>
                </div>
                <div style="padding: 20px;">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Fecha:</label>
                            <input type="date" id="fechaPostulacion" value="${postulacion.fecha}">
                        </div>
                        <div class="form-group">
                            <label>Estado:</label>
                            <select id="estadoPostulacion">
                                <option value="En Revisión" ${postulacion.estado === 'En Revisión' ? 'selected' : ''}>En Revisión</option>
                                <option value="Aceptado" ${postulacion.estado === 'Aceptado' ? 'selected' : ''}>Aceptado</option>
                                <option value="Rechazado" ${postulacion.estado === 'Rechazado' ? 'selected' : ''}>Rechazado</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Buscar Candidato:</label>
                        <div class="search-input-group">
                            <input type="text" id="candidatoPostulacion" list="listaCandidatosPost" placeholder="Ej: Juan Perez" value="${postulacion.candidato?.nombre || ''}">
                            <datalist id="listaCandidatosPost">
                                ${candidatosOptions}
                            </datalist>
                        </div>
                    </div>
                    
                    <div class="action-buttons">
                        <button class="btn btn-primary" onclick="app.guardarPostulacion()">Guardar</button>
                        <button class="btn btn-secondary" onclick="app.cancelarEdicionPostulacion()">Cancelar</button>
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

        // Cerrar modal al hacer click fuera de él
        const modal = document.getElementById('modalAptitud');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.cerrarModalAptitud();
                }
            });

            // Cerrar modal con tecla Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.style.display === 'block') {
                    this.cerrarModalAptitud();
                }
            });
        }
    }

    irAltaOfertaNueva() {
        this.editingOferta = null;
        this.navigateTo('alta-oferta');
    }

    editarOferta(id) {
        const oferta = this.data.ofertas.find(o => o.id === id);
        if (!oferta) return;
        this.editingOferta = JSON.parse(JSON.stringify(oferta));
        this.navigateTo('alta-oferta');
    }

    cancelarEdicionOferta() {
        this.editingOferta = null;
        this.navigateTo('ofertas');
    }

    verPostulacionesOferta(id) {
        this.ofertaSeleccionadaId = id;
        this.navigateTo('postulaciones');
    }

    eliminarOferta(id) {
        if (confirm('¿Estás seguro de que deseas eliminar esta oferta?')) {
            this.data.ofertas = this.data.ofertas.filter(o => o.id !== id);
            this.saveData();
            this.render();
            this.attachEventListeners();
        }
    }

    mostrarDetalleAreaOferta(ofertaId) {
        const oferta = this.data.ofertas.find(o => o.id === ofertaId);
        if (!oferta) return;
        const area = oferta.areaEstudio || 'No especificada';
        this.mostrarModalDetalle('Área de estudio', `Área: ${area}`);
    }

    mostrarDetalleEmpresaOferta(ofertaId) {
        const oferta = this.data.ofertas.find(o => o.id === ofertaId);
        if (!oferta) return;
        const empresaId = oferta.empresa?.id;
        const empresaNombre = oferta.empresa?.nombre || 'No especificada';
        const empresa = this.data.empresas.find(e => e.id === empresaId) || this.data.empresas.find(e => e.nombre === empresaNombre);

        if (empresa) {
            const detalle = `Empresa: ${empresa.nombre}\nCUIL: ${empresa.cuil}\nRazón Social: ${empresa.razonSocial}\nDescripción: ${empresa.descripcion || 'N/D'}`;
            this.mostrarModalDetalle('Detalle de empresa', detalle);
        } else {
            this.mostrarModalDetalle('Detalle de empresa', `Empresa: ${empresaNombre}`);
        }
    }

    mostrarModalDetalle(titulo, contenido) {
        const modal = document.getElementById('modalDetalle');
        const tituloEl = document.getElementById('modalDetalleTitulo');
        const contenidoEl = document.getElementById('modalDetalleContenido');
        if (!modal || !tituloEl || !contenidoEl) return;

        tituloEl.textContent = titulo;
        contenidoEl.textContent = contenido;
        modal.style.display = 'block';

        modal.onclick = (e) => {
            if (e.target === modal) this.cerrarModalDetalle();
        };
    }

    cerrarModalDetalle() {
        const modal = document.getElementById('modalDetalle');
        if (!modal) return;
        modal.style.display = 'none';
        modal.onclick = null;
    }

    mostrarDetalleCandidato(candidatoId) {
        if (!candidatoId) {
            alert('Candidato no válido');
            return;
        }
        const candidato = this.data.candidatos.find(c => c.id === candidatoId);
        if (!candidato) {
            alert('Candidato no encontrado');
            return;
        }
        const detalle = `Nombre: ${candidato.nombre}\nLegajo: ${candidato.legajo}\nTeléfono: ${candidato.telefono}\nCarrera: ${candidato.carrera}\nGraduado: ${candidato.graduado ? 'Sí' : 'No'}`;
        this.mostrarModalDetalle('Detalle de Candidato', detalle);
    }

    editarPostulacion(id) {
        const postulacion = this.data.postulaciones.find(p => p.id === id);
        if (!postulacion) return;
        this.editingPostulacion = JSON.parse(JSON.stringify(postulacion));
        this.navigateTo('alta-postulacion');
    }

    eliminarPostulacion(id) {
        if (confirm('¿Estás seguro de que deseas eliminar esta postulación?')) {
            this.data.postulaciones = this.data.postulaciones.filter(p => p.id !== id);
            this.saveData();
            this.render();
            this.attachEventListeners();
        }
    }

    cancelarEdicionPostulacion() {
        this.editingPostulacion = null;
        this.navigateTo('postulaciones');
    }

    guardarPostulacion() {
        const fecha = document.getElementById('fechaPostulacion').value;
        const estado = document.getElementById('estadoPostulacion').value;
        const candidatoNombre = document.getElementById('candidatoPostulacion').value.trim();

        if (!fecha || !estado || !candidatoNombre) {
            alert('Completa fecha, estado y candidato');
            return;
        }

        const candidato = this.data.candidatos.find(c => c.nombre === candidatoNombre);
        if (!candidato) {
            alert('Candidato no encontrado');
            return;
        }

        if (this.editingPostulacion) {
            const idx = this.data.postulaciones.findIndex(p => p.id === this.editingPostulacion.id);
            if (idx !== -1) {
                this.data.postulaciones[idx] = {
                    id: this.editingPostulacion.id,
                    ofertaId: this.editingPostulacion.ofertaId,
                    fecha,
                    estado,
                    candidato: { id: candidato.id, nombre: candidato.nombre }
                };
            }
            this.editingPostulacion = null;
        } else {
            const nuevaPostulacion = {
                id: Date.now(),
                ofertaId: this.ofertaSeleccionadaId || null,
                fecha,
                estado,
                candidato: { id: candidato.id, nombre: candidato.nombre }
            };
            this.data.postulaciones.push(nuevaPostulacion);
        }

        this.saveData();
        alert('Postulación guardada');
        this.navigateTo('postulaciones');
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
        const baseEstado = this.editingOferta ? this.editingOferta.estado : 'Activa';
        const nuevaOferta = {
            id: this.editingOferta ? this.editingOferta.id : Date.now(),
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
            estado: baseEstado
        };

        if (this.editingOferta) {
            const idx = this.data.ofertas.findIndex(o => o.id === this.editingOferta.id);
            if (idx !== -1) {
                this.data.ofertas[idx] = nuevaOferta;
            }
            this.editingOferta = null;
        } else {
            this.data.ofertas.push(nuevaOferta);
        }

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

    guardarCandidato() {
        const nombre = document.getElementById('nombreCandidato').value.trim();
        const legajo = document.getElementById('legajoCandidato').value.trim();
        const telefono = document.getElementById('telefonoCandidato').value.trim();
        const carrera = document.getElementById('carreraCandidato').value;
        const graduado = document.getElementById('graduadoSi').checked;

        if (!nombre || !legajo || !telefono || carrera === 'Seleccionar...') {
            alert('Por favor, completa todos los campos requeridos');
            return;
        }

        if (this.editingCandidato) {
            const candidatoIndex = this.data.candidatos.findIndex(c => c.id === this.editingCandidato.id);
            if (candidatoIndex !== -1) {
                this.data.candidatos[candidatoIndex] = {
                    id: this.editingCandidato.id,
                    nombre,
                    legajo,
                    telefono,
                    carrera,
                    graduado,
                    aptitudes: this.aptitudesTemp
                };
            }
            this.editingCandidato = null;
        } else {
            this.data.candidatos.push({
                id: this.nextCandidatoId++,
                nombre,
                legajo,
                telefono,
                carrera,
                graduado,
                aptitudes: this.aptitudesTemp
            });
        }

        this.aptitudesTemp = [];
        alert('Candidato guardado correctamente');
        this.navigateTo('candidatos');
    }

    editarCandidato(id) {
        const candidato = this.data.candidatos.find(c => c.id === id);
        if (candidato) {
            this.editingCandidato = candidato;
            this.navigateTo('alta-candidato');
        }
    }

    eliminarCandidato(id) {
        if (confirm('¿Estás seguro de que deseas eliminar este candidato?')) {
            this.data.candidatos = this.data.candidatos.filter(c => c.id !== id);
            this.render();
            this.attachEventListeners();
        }
    }

    buscarCandidatos() {
        const searchTerm = document.getElementById('searchCandidato').value.toLowerCase();
        const candidatosFiltrados = this.data.candidatos.filter(candidato => 
            candidato.nombre.toLowerCase().includes(searchTerm) ||
            candidato.legajo.toLowerCase().includes(searchTerm) ||
            candidato.telefono.toLowerCase().includes(searchTerm)
        );

        const candidatosFilas = candidatosFiltrados.map(candidato => `
            <tr>
                <td>${candidato.nombre}</td>
                <td>${candidato.legajo}</td>
                <td>${candidato.telefono}</td>
                <td>${candidato.carrera}</td>
                <td>${candidato.graduado ? 'Sí' : 'No'}</td>
                <td>
                    <button class="icon-btn edit" onclick="app.editarCandidato(${candidato.id})" title="Editar">✎</button>
                    <button class="icon-btn delete" onclick="app.eliminarCandidato(${candidato.id})" title="Eliminar">🗑</button>
                </td>
            </tr>
        `).join('');

        const tablaBody = document.querySelector('table tbody');
        tablaBody.innerHTML = candidatosFilas || `<tr><td colspan="6" style="text-align: center; padding: 40px; color: #999;">Sin resultados</td></tr>`;
    }

    agregarAptitud() {
        const inputAptitud = document.getElementById('inputAptitud');
        const aptitud = inputAptitud.value.trim();

        if (!aptitud) {
            alert('Por favor, ingresa una aptitud');
            return;
        }

        this.aptitudesTemp.push(aptitud);
        inputAptitud.value = '';
        
        // Actualizar solo la tabla sin hacer un full render
        this.actualizarTablaAptitudes();
    }

    actualizarTablaAptitudes() {
        const aptitudesFilas = this.aptitudesTemp.map((aptitud, index) => `
            <tr>
                <td>${aptitud}</td>
                <td>
                    <button class="icon-btn edit" onclick="app.editarAptitud(${index})" title="Editar">✎</button>
                    <button class="icon-btn delete" onclick="app.eliminarAptitud(${index})" title="Eliminar">🗑</button>
                </td>
            </tr>
        `).join('');

        const filasVacias = this.aptitudesTemp.length === 0 ? `
            <tr>
                <td colspan="2" style="text-align: center; padding: 30px; color: #999;">Sin aptitudes registradas</td>
            </tr>
        ` : '';

        const tablaBody = document.querySelector('.form-group .table-wrapper table tbody');
        if (tablaBody) {
            tablaBody.innerHTML = aptitudesFilas + filasVacias;
        }
    }

    editarAptitud(index) {
        const modal = document.getElementById('modalAptitud');
        const modalInput = document.getElementById('modalInputAptitud');
        this.aptitudEditandoIndex = index;
        modalInput.value = this.aptitudesTemp[index];
        modal.style.display = 'block';
        modalInput.focus();
    }

    guardarAptitudModal() {
        const modalInput = document.getElementById('modalInputAptitud');
        const aptitud = modalInput.value.trim();

        if (!aptitud) {
            alert('Por favor, ingresa una aptitud');
            return;
        }

        this.aptitudesTemp[this.aptitudEditandoIndex] = aptitud;
        this.cerrarModalAptitud();
        this.actualizarTablaAptitudes();
    }

    cerrarModalAptitud() {
        const modal = document.getElementById('modalAptitud');
        modal.style.display = 'none';
        this.aptitudEditandoIndex = -1;
    }

    eliminarAptitud(index) {
        this.aptitudesTemp.splice(index, 1);
        if (this.aptitudEditandoIndex === index) {
            this.aptitudEditandoIndex = -1;
        }
        this.actualizarTablaAptitudes();
    }
}

const app = new App();
