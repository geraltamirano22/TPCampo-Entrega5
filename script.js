class App {
    constructor() {
        this.currentPage = 'gestion-ofertas-empresa';
        this.empresaActual = 1; // Tech Solutions
        this.busquedaOferta = '';
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
                    estadoValidacion: 'Aprobada',
                    estadoOperativo: 'Activa',
                    fechaLimite: '2025-12-31',
                    modalidad: 'Remoto',
                    areaEstudio: 'Tecnología',
                    ubicacion: { calle: 'Calle 10', numero: '123', piso: '', depto: '', pais: 'Argentina', provincia: 'Buenos Aires', localidad: 'La Plata' },
                    empresaId: 1
                },
                {
                    id: 2,
                    titulo: 'Analista Funcional',
                    categoria: 'Administrativo',
                    descripcion: 'Relevamiento, user stories y testing de aceptación',
                    estadoValidacion: 'Pendiente',
                    estadoOperativo: 'Activa',
                    fechaLimite: '2026-01-15',
                    modalidad: 'Híbrido',
                    areaEstudio: 'Administración',
                    ubicacion: { calle: 'Av. Siempre Viva', numero: '742', piso: '2', depto: 'B', pais: 'Argentina', provincia: 'Buenos Aires', localidad: 'La Plata' },
                    empresaId: 1
                },
                {
                    id: 3,
                    titulo: 'Frontend Developer',
                    categoria: 'IT',
                    descripcion: 'React y TypeScript',
                    estadoValidacion: 'Rechazada',
                    estadoOperativo: 'Cerrada',
                    fechaLimite: '2025-11-30',
                    modalidad: 'Remoto',
                    areaEstudio: 'Tecnología',
                    ubicacion: { calle: '', numero: '', piso: '', depto: '', pais: 'Argentina', provincia: 'Buenos Aires', localidad: 'CABA' },
                    empresaId: 1
                },
                {
                    id: 4,
                    titulo: 'Desarrollador Full Stack',
                    categoria: 'IT',
                    descripcion: 'Node.js, React, MongoDB. Experiencia en desarrollo de APIs',
                    estadoValidacion: 'Aprobada',
                    estadoOperativo: 'Activa',
                    fechaLimite: '2026-02-28',
                    modalidad: 'Híbrido',
                    areaEstudio: 'Tecnología',
                    ubicacion: { calle: 'Av. Corrientes', numero: '1500', piso: '5', depto: 'A', pais: 'Argentina', provincia: 'Buenos Aires', localidad: 'CABA' },
                    empresaId: 1
                },
                {
                    id: 5,
                    titulo: 'Data Analyst',
                    categoria: 'IT',
                    descripcion: 'Análisis de datos con Python, SQL y Power BI',
                    estadoValidacion: 'Aprobada',
                    estadoOperativo: 'Activa',
                    fechaLimite: '2026-01-31',
                    modalidad: 'Remoto',
                    areaEstudio: 'Tecnología',
                    ubicacion: { calle: 'Calle 50', numero: '456', piso: '', depto: '', pais: 'Argentina', provincia: 'Buenos Aires', localidad: 'La Plata' },
                    empresaId: 1
                },
                {
                    id: 6,
                    titulo: 'Diseñador UX/UI',
                    categoria: 'Diseño',
                    descripcion: 'Diseño de interfaces y experiencia de usuario para aplicaciones web',
                    estadoValidacion: 'Aprobada',
                    estadoOperativo: 'Activa',
                    fechaLimite: '2026-03-15',
                    modalidad: 'Híbrido',
                    areaEstudio: 'Diseño',
                    ubicacion: { calle: 'Calle 7', numero: '890', piso: '3', depto: 'C', pais: 'Argentina', provincia: 'Buenos Aires', localidad: 'La Plata' },
                    empresaId: 1
                },
                {
                    id: 7,
                    titulo: 'QA Tester',
                    categoria: 'IT',
                    descripcion: 'Testing manual y automatizado. Selenium, Cypress',
                    estadoValidacion: 'Aprobada',
                    estadoOperativo: 'Activa',
                    fechaLimite: '2026-02-15',
                    modalidad: 'Remoto',
                    areaEstudio: 'Tecnología',
                    ubicacion: { calle: 'Av. 7', numero: '1234', piso: '', depto: '', pais: 'Argentina', provincia: 'Buenos Aires', localidad: 'La Plata' },
                    empresaId: 1
                },
                {
                    id: 8,
                    titulo: 'Especialista en Marketing Digital',
                    categoria: 'Marketing',
                    descripcion: 'Gestión de redes sociales, SEO, campañas digitales',
                    estadoValidacion: 'Aprobada',
                    estadoOperativo: 'Activa',
                    fechaLimite: '2026-01-20',
                    modalidad: 'Híbrido',
                    areaEstudio: 'Marketing',
                    ubicacion: { calle: 'Av. 13', numero: '567', piso: '2', depto: 'B', pais: 'Argentina', provincia: 'Buenos Aires', localidad: 'La Plata' },
                    empresaId: 1
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
                { id: 3, nombre: 'Carlos López', legajo: '12347', telefono: '1155555555', carrera: 'Administración', graduado: true },
                { id: 4, nombre: 'Ana Martínez', legajo: '12348', telefono: '1144444444', carrera: 'Ingeniería Industrial', graduado: false },
                { id: 5, nombre: 'Pedro Rodríguez', legajo: '12349', telefono: '1133333333', carrera: 'Ingeniería Electrónica', graduado: true },
                { id: 6, nombre: 'Laura Fernández', legajo: '12350', telefono: '1166666666', carrera: 'Licenciatura en Administración', graduado: true },
                { id: 7, nombre: 'Diego Sánchez', legajo: '12351', telefono: '1177777777', carrera: 'Ingeniería en Sistemas', graduado: false },
                { id: 8, nombre: 'Sofia Gómez', legajo: '12352', telefono: '1188888888', carrera: 'Contaduría Pública', graduado: true },
                { id: 9, nombre: 'Martín Torres', legajo: '12353', telefono: '1199999999', carrera: 'Ingeniería Química', graduado: false },
                { id: 10, nombre: 'Valentina Ruiz', legajo: '12354', telefono: '1111111111', carrera: 'Diseño Gráfico', graduado: true }
            ],
            postulaciones: [
                { id: 1, ofertaId: 1, candidato: { id: 1, nombre: 'Juan Perez' }, fecha: '2025-12-01', estado: 'En Revisión' },
                { id: 2, ofertaId: 1, candidato: { id: 2, nombre: 'María García' }, fecha: '2025-12-05', estado: 'Aceptado' },
                { id: 3, ofertaId: 1, candidato: { id: 3, nombre: 'Carlos López' }, fecha: '2025-12-03', estado: 'En Revisión' },
                { id: 4, ofertaId: 1, candidato: { id: 4, nombre: 'Ana Martínez' }, fecha: '2025-12-04', estado: 'Rechazado' },
                { id: 5, ofertaId: 1, candidato: { id: 5, nombre: 'Pedro Rodríguez' }, fecha: '2025-12-06', estado: 'En Revisión' },
                { id: 6, ofertaId: 2, candidato: { id: 6, nombre: 'Laura Fernández' }, fecha: '2025-12-02', estado: 'Aceptado' },
                { id: 7, ofertaId: 2, candidato: { id: 7, nombre: 'Diego Sánchez' }, fecha: '2025-12-07', estado: 'En Revisión' },
                { id: 8, ofertaId: 2, candidato: { id: 8, nombre: 'Sofia Gómez' }, fecha: '2025-12-08', estado: 'En Revisión' },
                { id: 9, ofertaId: 2, candidato: { id: 9, nombre: 'Martín Torres' }, fecha: '2025-12-09', estado: 'Aceptado' },
                { id: 10, ofertaId: 2, candidato: { id: 10, nombre: 'Valentina Ruiz' }, fecha: '2025-12-10', estado: 'En Revisión' },
                { id: 11, ofertaId: 3, candidato: { id: 1, nombre: 'Juan Perez' }, fecha: '2025-11-20', estado: 'Rechazado' },
                { id: 12, ofertaId: 3, candidato: { id: 3, nombre: 'Carlos López' }, fecha: '2025-11-22', estado: 'En Revisión' },
                { id: 13, ofertaId: 3, candidato: { id: 5, nombre: 'Pedro Rodríguez' }, fecha: '2025-11-25', estado: 'Rechazado' },
                { id: 14, ofertaId: 4, candidato: { id: 1, nombre: 'Juan Perez' }, fecha: '2025-12-07', estado: 'Aceptado' },
                { id: 15, ofertaId: 4, candidato: { id: 3, nombre: 'Carlos López' }, fecha: '2025-12-08', estado: 'En Revisión' },
                { id: 16, ofertaId: 4, candidato: { id: 7, nombre: 'Diego Sánchez' }, fecha: '2025-12-09', estado: 'En Revisión' },
                { id: 17, ofertaId: 5, candidato: { id: 2, nombre: 'María García' }, fecha: '2025-12-05', estado: 'Aceptado' },
                { id: 18, ofertaId: 5, candidato: { id: 8, nombre: 'Sofia Gómez' }, fecha: '2025-12-06', estado: 'En Revisión' },
                { id: 19, ofertaId: 6, candidato: { id: 10, nombre: 'Valentina Ruiz' }, fecha: '2025-12-07', estado: 'Aceptado' },
                { id: 20, ofertaId: 6, candidato: { id: 4, nombre: 'Ana Martínez' }, fecha: '2025-12-08', estado: 'En Revisión' },
                { id: 21, ofertaId: 6, candidato: { id: 6, nombre: 'Laura Fernández' }, fecha: '2025-12-09', estado: 'En Revisión' },
                { id: 22, ofertaId: 7, candidato: { id: 4, nombre: 'Ana Martínez' }, fecha: '2025-12-08', estado: 'En Revisión' },
                { id: 23, ofertaId: 7, candidato: { id: 6, nombre: 'Laura Fernández' }, fecha: '2025-12-09', estado: 'Aceptado' },
                { id: 24, ofertaId: 7, candidato: { id: 10, nombre: 'Valentina Ruiz' }, fecha: '2025-12-10', estado: 'En Revisión' },
                { id: 25, ofertaId: 8, candidato: { id: 5, nombre: 'Pedro Rodríguez' }, fecha: '2025-12-06', estado: 'En Revisión' },
                { id: 26, ofertaId: 8, candidato: { id: 9, nombre: 'Martín Torres' }, fecha: '2025-12-11', estado: 'Aceptado' }
            ]
        };
        this.nextEmpresaId = 5;
        this.nextCandidatoId = 11;
        this.nextOfertaId = 9;
        this.nextPostulacionId = 27;
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
        
        if (this.currentPage === 'gestion-ofertas-empresa') {
            app.innerHTML = this.renderGestionOfertasEmpresa();
        } else if (this.currentPage === 'menu') {
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
                        <button class="menu-btn" onclick="app.navigateTo('gestion-ofertas-empresa')">Ofertas</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderOfertas() {
        const ofertasFilas = this.data.ofertas.map(oferta => {
            const empresa = this.data.empresas.find(e => e.id === oferta.empresaId);
            const empresaNombre = empresa ? empresa.nombre : 'Sin empresa';
            return `
            <tr>
                <td>${oferta.titulo}</td>
                <td>${oferta.categoria}</td>
                <td>${oferta.descripcion.substring(0, 50)}${oferta.descripcion.length > 50 ? '...' : ''}</td>
                <td><span style="background: #d4edda; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${oferta.estadoValidacion}</span></td>
                <td>${oferta.fechaLimite}</td>
                <td>${oferta.modalidad}</td>
                <td>${oferta.ubicacion.localidad}, ${oferta.ubicacion.provincia}</td>
                <td>${oferta.areaEstudio}</td>
                <td><button class="btn btn-secondary btn-small" onclick="app.mostrarDetalleEmpresaOferta(${oferta.id})">${empresaNombre}</button></td>
                <td style="display: flex; gap: 8px; align-items: center;">
                    <a href="#" style="cursor:pointer; color:#0066cc; text-decoration:underline; white-space: nowrap;" onclick="app.verPostulacionesOferta(${oferta.id}); return false;">Postulaciones</a>
                    <button class="icon-btn edit" onclick="app.editarOferta(${oferta.id})" title="Editar">✎</button>
                    <button class="icon-btn delete" onclick="app.eliminarOferta(${oferta.id})" title="Eliminar">🗑</button>
                </td>
            </tr>
        `;
        }).join('');

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
        const tituloPantalla = this.editingOferta ? 'Editar Oferta' : 'Nueva Oferta';
        const empresasOptions = this.data.empresas.map(e => `<option value="${e.nombre}">`).join('');
        const candidatosOptions = this.data.candidatos ? this.data.candidatos.map(c => `<option value="${c.nombre}">`).join('') : '';

        return `
            <div style="width: 100%; min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 16px 24px; display: flex; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">📝</div>
                        <span style="color: white; font-weight: 600; font-size: 16px; text-shadow: 0 1px 2px rgba(0,0,0,0.1);">${tituloPantalla}</span>
                    </div>
                </div>
                
                <div style="padding: 32px; max-width: 1200px; margin: 0 auto;">
                    <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.06);">
                        <div class="tabs" style="display: flex; border-bottom: 2px solid #f3f4f6; background: #f9fafb;">
                            <button class="tab active" data-tab="oferta" style="flex: 1; padding: 16px 24px; border: none; background: white; cursor: pointer; font-weight: 600; color: #667eea; border-bottom: 3px solid #667eea; transition: all 0.2s; font-size: 14px;">Oferta</button>
                            <button class="tab" data-tab="ubicacion" style="flex: 1; padding: 16px 24px; border: none; background: transparent; cursor: pointer; font-weight: 500; color: #6b7280; transition: all 0.2s; font-size: 14px;">Ubicación</button>
                            <button class="tab" data-tab="entidades" style="flex: 1; padding: 16px 24px; border: none; background: transparent; cursor: pointer; font-weight: 500; color: #6b7280; transition: all 0.2s; font-size: 14px;">Entidades</button>
                        </div>
                        
                        <div style="padding: 32px;">
                            <div class="tab-content active" data-content="oferta">
                                <div style="margin-bottom: 24px;">
                                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Título:</label>
                                    <input type="text" id="tituloOferta" placeholder="Título de la oferta" value="${oferta.titulo}" style="width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: all 0.2s; outline: none;" onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#e5e7eb'">
                                </div>
                                
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
                                    <div>
                                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Fecha Límite:</label>
                                        <input type="date" id="fechaLimiteOferta" value="${oferta.fechaLimite}" style="width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: all 0.2s; outline: none;" onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#e5e7eb'">
                                    </div>
                                    <div>
                                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Categoría:</label>
                                        <select id="categoriaOferta" style="width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: all 0.2s; outline: none;" onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#e5e7eb'">
                                            <option value="">Seleccionar...</option>
                                            <option value="IT" ${oferta.categoria === 'IT' ? 'selected' : ''}>IT</option>
                                            <option value="Administrativo" ${oferta.categoria === 'Administrativo' ? 'selected' : ''}>Administrativo</option>
                                            <option value="Ventas" ${oferta.categoria === 'Ventas' ? 'selected' : ''}>Ventas</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div style="margin-bottom: 24px;">
                                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Descripción:</label>
                                    <textarea id="descripcionOferta" placeholder="Inserte una descripción..." style="width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; min-height: 120px; transition: all 0.2s; outline: none; resize: vertical;" onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#e5e7eb'">${oferta.descripcion}</textarea>
                                </div>
                                
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                                    <div>
                                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Modalidad:</label>
                                        <select id="modalidadOferta" style="width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: all 0.2s; outline: none;" onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#e5e7eb'">
                                            <option value="Presencial" ${oferta.modalidad === 'Presencial' ? 'selected' : ''}>Presencial</option>
                                            <option value="Remoto" ${oferta.modalidad === 'Remoto' ? 'selected' : ''}>Remoto</option>
                                            <option value="Híbrido" ${oferta.modalidad === 'Híbrido' ? 'selected' : ''}>Híbrido</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Área de estudio:</label>
                                        <select id="areaEstudioOferta" style="width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: all 0.2s; outline: none;" onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#e5e7eb'">
                                            <option value="">Seleccionar...</option>
                                            <option value="Tecnología" ${oferta.areaEstudio === 'Tecnología' ? 'selected' : ''}>Tecnología</option>
                                            <option value="Administración" ${oferta.areaEstudio === 'Administración' ? 'selected' : ''}>Administración</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div style="margin-top: 32px; padding-top: 24px; border-top: 2px solid #f3f4f6; display: flex; gap: 12px; justify-content: flex-end;">
                                    <button onclick="app.cancelarEdicionOferta()" style="padding: 12px 28px; background: white; border: 2px solid #e5e7eb; color: #6b7280; cursor: pointer; font-size: 14px; font-weight: 600; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.borderColor='#d1d5db'" onmouseout="this.style.borderColor='#e5e7eb'">Cancelar</button>
                                    <button onclick="app.guardarOferta()" style="padding: 12px 28px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; cursor: pointer; font-size: 14px; font-weight: 600; border-radius: 8px; box-shadow: 0 4px 6px rgba(102,126,234,0.3); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 6px 12px rgba(102,126,234,0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px rgba(102,126,234,0.3)'">Guardar</button>
                                </div>
                            </div>
                            
                            <div class="tab-content" data-content="ubicacion" style="display: none;">
                                <div style="display: grid; grid-template-columns: 3fr 1fr; gap: 24px; margin-bottom: 24px;">
                                    <div>
                                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Calle:</label>
                                        <input type="text" id="calleOferta" value="${oferta.ubicacion.calle}" style="width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: all 0.2s; outline: none;" onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#e5e7eb'">
                                    </div>
                                    <div>
                                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Número:</label>
                                        <input type="text" id="numeroOferta" value="${oferta.ubicacion.numero}" style="width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: all 0.2s; outline: none;" onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#e5e7eb'">
                                    </div>
                                </div>
                                
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
                                    <div>
                                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Piso:</label>
                                        <input type="text" id="pisoOferta" value="${oferta.ubicacion.piso}" style="width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: all 0.2s; outline: none;" onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#e5e7eb'">
                                    </div>
                                    <div>
                                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Departamento:</label>
                                        <input type="text" id="deptoOferta" value="${oferta.ubicacion.depto}" style="width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: all 0.2s; outline: none;" onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#e5e7eb'">
                                    </div>
                                </div>
                                
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
                                    <div>
                                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">País:</label>
                                        <select id="paisOferta" style="width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: all 0.2s; outline: none;" onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#e5e7eb'">
                                            <option value="">Seleccionar...</option>
                                            <option value="Argentina" ${oferta.ubicacion.pais === 'Argentina' ? 'selected' : ''}>Argentina</option>
                                            <option value="Chile" ${oferta.ubicacion.pais === 'Chile' ? 'selected' : ''}>Chile</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Provincia:</label>
                                        <select id="provinciaOferta" style="width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: all 0.2s; outline: none;" onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#e5e7eb'">
                                            <option value="">Seleccionar...</option>
                                            <option value="Buenos Aires" ${oferta.ubicacion.provincia === 'Buenos Aires' ? 'selected' : ''}>Buenos Aires</option>
                                            <option value="Córdoba" ${oferta.ubicacion.provincia === 'Córdoba' ? 'selected' : ''}>Córdoba</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div>
                                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Localidad:</label>
                                    <select id="localidadOferta" style="width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: all 0.2s; outline: none;" onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#e5e7eb'">
                                        <option value="">Seleccionar...</option>
                                        <option value="La Plata" ${oferta.ubicacion.localidad === 'La Plata' ? 'selected' : ''}>La Plata</option>
                                        <option value="Berazategui" ${oferta.ubicacion.localidad === 'Berazategui' ? 'selected' : ''}>Berazategui</option>
                                    </select>
                                </div>
                                
                                <div style="margin-top: 32px; padding-top: 24px; border-top: 2px solid #f3f4f6; display: flex; gap: 12px; justify-content: flex-end;">
                                    <button onclick="app.cancelarEdicionOferta()" style="padding: 12px 28px; background: white; border: 2px solid #e5e7eb; color: #6b7280; cursor: pointer; font-size: 14px; font-weight: 600; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.borderColor='#d1d5db'" onmouseout="this.style.borderColor='#e5e7eb'">Cancelar</button>
                                    <button onclick="app.guardarOferta()" style="padding: 12px 28px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; cursor: pointer; font-size: 14px; font-weight: 600; border-radius: 8px; box-shadow: 0 4px 6px rgba(102,126,234,0.3); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 6px 12px rgba(102,126,234,0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px rgba(102,126,234,0.3)'">Guardar</button>
                                </div>
                            </div>
                            
                            <div class="tab-content" data-content="entidades" style="display: none;">
                                <div style="margin-bottom: 24px;">
                                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Empresa:</label>
                                    <div style="display: flex; gap: 12px;">
                                        <input type="text" id="empresaOferta" list="listaEmpresas" placeholder="Buscar empresa..." value="${oferta.empresa?.nombre || ''}" style="flex: 1; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: all 0.2s; outline: none;" onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#e5e7eb'">
                                        <datalist id="listaEmpresas">${empresasOptions}</datalist>
                                        <button onclick="app.navigateTo('alta-empresa', 'alta-oferta')" style="padding: 12px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; box-shadow: 0 2px 4px rgba(102,126,234,0.3); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-1px)'" onmouseout="this.style.transform='translateY(0)'" title="Nueva Empresa">+ Nueva</button>
                                    </div>
                                </div>
                                
                                <div>
                                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Candidato:</label>
                                    <div style="display: flex; gap: 12px;">
                                        <input type="text" id="candidatoOferta" list="listaCandidatos" placeholder="Buscar candidato..." value="${oferta.candidato?.nombre || ''}" style="flex: 1; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: all 0.2s; outline: none;" onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#e5e7eb'">
                                        <datalist id="listaCandidatos">${candidatosOptions}</datalist>
                                        <button onclick="app.navigateTo('alta-candidato', 'alta-oferta')" style="padding: 12px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; box-shadow: 0 2px 4px rgba(102,126,234,0.3); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-1px)'" onmouseout="this.style.transform='translateY(0)'" title="Nuevo Candidato">+ Nuevo</button>
                                    </div>
                                </div>
                                
                                <div style="margin-top: 32px; padding-top: 24px; border-top: 2px solid #f3f4f6; display: flex; gap: 12px; justify-content: flex-end;">
                                    <button onclick="app.cancelarEdicionOferta()" style="padding: 12px 28px; background: white; border: 2px solid #e5e7eb; color: #6b7280; cursor: pointer; font-size: 14px; font-weight: 600; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.borderColor='#d1d5db'" onmouseout="this.style.borderColor='#e5e7eb'">Cancelar</button>
                                    <button onclick="app.guardarOferta()" style="padding: 12px 28px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; cursor: pointer; font-size: 14px; font-weight: 600; border-radius: 8px; box-shadow: 0 4px 6px rgba(102,126,234,0.3); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 6px 12px rgba(102,126,234,0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px rgba(102,126,234,0.3)'">Guardar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderEmpresas() {
        const empresasFilas = this.data.empresas.map(empresa => `
            <tr style="transition: background 0.2s;" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='white'">
                <td style="padding: 16px 20px; color: #374151; font-size: 14px;">${empresa.cuil}</td>
                <td style="padding: 16px 20px; color: #6b7280; font-size: 14px;">${empresa.descripcion}</td>
                <td style="padding: 16px 20px;"><span style="background: #d1fae5; color: #065f46; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 500; border: 1px solid #a7f3d0;">Activa</span></td>
                <td style="padding: 16px 20px; color: #374151; font-weight: 500; font-size: 14px;">${empresa.nombre}</td>
                <td style="padding: 16px 20px; color: #6b7280; font-size: 14px;">${empresa.razonSocial}</td>
                <td style="padding: 16px 20px;">
                    <div style="display: flex; gap: 8px;">
                        <button onclick="app.editarEmpresa(${empresa.id})" style="padding: 6px 10px; background: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer; color: #6b7280; font-size: 13px; transition: all 0.2s;" title="Editar" onmouseover="this.style.background='#e5e7eb'" onmouseout="this.style.background='#f3f4f6'">✏️</button>
                        <button onclick="app.eliminarEmpresa(${empresa.id})" style="padding: 6px 10px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; cursor: pointer; color: #dc2626; font-size: 13px; transition: all 0.2s;" title="Eliminar" onmouseover="this.style.background='#fee2e2'" onmouseout="this.style.background='#fef2f2'">🗑️</button>
                    </div>
                </td>
            </tr>
        `).join('');

        const filasVacias = this.data.empresas.length === 0 ? `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px; color: #999;">Sin empresas registradas</td>
            </tr>
        ` : '';

        return `
            <div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; flex-direction: column;">
                <div style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); padding: 24px 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.07); border-bottom: 1px solid rgba(255,255,255,0.3);">
                    <h1 style="margin: 0; font-size: 28px; color: #1f2937; display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 32px;">🏢</span> Empresas
                    </h1>
                </div>
                <div style="flex: 1; padding: 32px 40px;">
                    <div style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.07); margin-bottom: 24px;">
                        <input type="text" placeholder="Buscar empresa..." id="searchEmpresa" style="width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: all 0.2s;" onfocus="this.style.borderColor='#667eea'; this.style.outline='none'" onblur="this.style.borderColor='#e5e7eb'">
                    </div>
                    
                    <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
                        <table style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                                    <th style="padding: 16px 20px; text-align: left; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">CUIL</th>
                                    <th style="padding: 16px 20px; text-align: left; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">DESCRIPCIÓN</th>
                                    <th style="padding: 16px 20px; text-align: left; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">ESTADO</th>
                                    <th style="padding: 16px 20px; text-align: left; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">NOMBRE</th>
                                    <th style="padding: 16px 20px; text-align: left; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">RAZÓN SOCIAL</th>
                                    <th style="padding: 16px 20px; text-align: left; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody style="background: white;">
                                ${empresasFilas}
                                ${filasVacias}
                            </tbody>
                        </table>
                    </div>
                    
                    <div style="margin-top: 24px; display: flex; justify-content: flex-end;">
                        <button onclick="app.navigateTo('menu')" style="padding: 12px 24px; background: white; color: #667eea; border: 2px solid #667eea; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; transition: all 0.2s;" onmouseover="this.style.background='#667eea'; this.style.color='white'" onmouseout="this.style.background='white'; this.style.color='#667eea'">Salir</button>
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
            <tr style="transition: background 0.2s;" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='white'">
                <td style="padding: 16px 20px; color: #374151; font-weight: 500; font-size: 14px;">${candidato.nombre}</td>
                <td style="padding: 16px 20px; color: #3b82f6; font-size: 14px;">${candidato.legajo}</td>
                <td style="padding: 16px 20px; color: #6b7280; font-size: 14px;">${candidato.telefono}</td>
                <td style="padding: 16px 20px; color: #6b7280; font-size: 14px;">${candidato.carrera}</td>
                <td style="padding: 16px 20px; font-size: 14px;">${candidato.graduado ? '<span style="color: #059669; font-weight: 500;">Sí</span>' : '<span style="color: #6b7280;">No</span>'}</td>
                <td style="padding: 16px 20px;">
                    <div style="display: flex; gap: 8px;">
                        <button onclick="app.editarCandidato(${candidato.id})" style="padding: 6px 10px; background: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer; color: #6b7280; font-size: 13px; transition: all 0.2s;" title="Editar" onmouseover="this.style.background='#e5e7eb'" onmouseout="this.style.background='#f3f4f6'">✏️</button>
                        <button onclick="app.eliminarCandidato(${candidato.id})" style="padding: 6px 10px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; cursor: pointer; color: #dc2626; font-size: 13px; transition: all 0.2s;" title="Eliminar" onmouseover="this.style.background='#fee2e2'" onmouseout="this.style.background='#fef2f2'">🗑️</button>
                    </div>
                </td>
            </tr>
        `).join('');

        const filasVacias = this.data.candidatos.length === 0 ? `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px; color: #999;">Sin candidatos registrados</td>
            </tr>
        ` : '';

        return `
            <div style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; flex-direction: column;">
                <div style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); padding: 24px 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.07); border-bottom: 1px solid rgba(255,255,255,0.3);">
                    <h1 style="margin: 0; font-size: 28px; color: #1f2937; display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 32px;">👨‍🎓</span> Candidatos
                    </h1>
                </div>
                <div style="flex: 1; padding: 32px 40px;">
                    <div style="background: white; border-radius: 12px; padding: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.07); margin-bottom: 24px;">
                        <input type="text" placeholder="Buscar candidato..." id="searchCandidato" style="width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: all 0.2s;" onfocus="this.style.borderColor='#667eea'; this.style.outline='none'" onblur="this.style.borderColor='#e5e7eb'">
                    </div>
                    
                    <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07);">
                        <table style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                                    <th style="padding: 16px 20px; text-align: left; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">NOMBRE</th>
                                    <th style="padding: 16px 20px; text-align: left; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">LEGAJO</th>
                                    <th style="padding: 16px 20px; text-align: left; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">TELÉFONO</th>
                                    <th style="padding: 16px 20px; text-align: left; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">CARRERA</th>
                                    <th style="padding: 16px 20px; text-align: left; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">¿ES GRADUADO?</th>
                                    <th style="padding: 16px 20px; text-align: left; font-weight: 600; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody style="background: white;">
                                ${candidatosFilas}
                                ${filasVacias}
                            </tbody>
                        </table>
                    </div>
                    
                    <div style="margin-top: 24px; display: flex; justify-content: flex-end;">
                        <button onclick="app.navigateTo('menu')" style="padding: 12px 24px; background: white; color: #667eea; border: 2px solid #667eea; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600; transition: all 0.2s;" onmouseover="this.style.background='#667eea'; this.style.color='white'" onmouseout="this.style.background='white'; this.style.color='#667eea'">Salir</button>
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
        const postulaciones = this.data.postulaciones
            .filter(p => !this.ofertaSeleccionadaId || p.ofertaId === this.ofertaSeleccionadaId)
            .filter(p => p.candidato && p.candidato.nombre); // Filtrar postulaciones sin candidato
        const filas = postulaciones.map(p => {
            const candidatoId = p.candidato?.id || null;
            const candidatoNombre = p.candidato?.nombre || 'Sin candidato';
            const getEstadoColor = (estado) => {
                const colores = {
                    'En Revisión': { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' },
                    'Aceptado': { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7' },
                    'Rechazado': { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' }
                };
                return colores[estado] || colores['En Revisión'];
            };
            const color = getEstadoColor(p.estado);
            return `
                <tr style="border-bottom: 1px solid #f3f4f6; transition: background 0.2s;" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='white'">
                    <td style="padding: 16px 20px;">
                        <span style="display: inline-block; padding: 4px 12px; background: ${color.bg}; color: ${color.text}; border: 1px solid ${color.border}; border-radius: 6px; font-size: 11px; font-weight: 600;">${p.estado}</span>
                    </td>
                    <td style="padding: 16px 20px; color: #6b7280; font-size: 14px;">${p.fecha}</td>
                    <td style="padding: 16px 20px;">
                        <button onclick="app.mostrarDetalleCandidato(${candidatoId})" style="background: none; border: none; cursor: pointer; color: #3b82f6; text-decoration: underline; font-size: 14px; font-weight: 500;">${candidatoNombre}</button>
                    </td>
                    <td style="padding: 16px 20px;">
                        <div style="display: flex; gap: 8px;">
                            <button onclick="app.editarPostulacion(${p.id})" style="padding: 6px 10px; background: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer; color: #6b7280; font-size: 13px; transition: all 0.2s;" title="Editar" onmouseover="this.style.background='#e5e7eb'" onmouseout="this.style.background='#f3f4f6'">✏️</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        const filasVacias = postulaciones.length === 0 ? `
            <tr>
                <td colspan="4" style="text-align: center; padding: 40px; color: #d1d5db; font-size: 14px;">Sin postulaciones registradas</td>
            </tr>
        ` : '';

        return `
            <div style="width: 100%; min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; flex-direction: column; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">👥</div>
                        <span style="color: white; font-weight: 600; font-size: 16px; text-shadow: 0 1px 2px rgba(0,0,0,0.1);">Postulaciones - ${tituloOferta}</span>
                    </div>
                </div>
                <div style="flex: 1; padding: 32px; overflow-y: auto;">
                    <div style="background: white; padding: 24px; border-radius: 12px; margin-bottom: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.06);">
                        <div style="display: flex; gap: 12px; align-items: center;">
                            <div style="flex: 1; position: relative;">
                                <input type="text" placeholder="Buscar postulación..." style="width: 100%; padding: 12px 12px 12px 44px; border: 2px solid #e5e7eb; border-radius: 10px; font-size: 14px; box-sizing: border-box; transition: all 0.2s; outline: none;" onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102,126,234,0.1)'" onblur="this.style.borderColor='#e5e7eb'; this.style.boxShadow='none'">
                                <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #9ca3af; font-size: 18px;">🔍</span>
                            </div>
                        </div>
                    </div>
                    <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.06);">
                        <div style="max-height: calc(100vh - 320px); overflow-y: auto;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <thead style="background: linear-gradient(to bottom, #f9fafb, #f3f4f6); position: sticky; top: 0; z-index: 10;">
                                    <tr>
                                        <th style="padding: 16px 20px; text-align: left; font-weight: 600; color: #374151; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Estado</th>
                                        <th style="padding: 16px 20px; text-align: left; font-weight: 600; color: #374151; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Fecha</th>
                                        <th style="padding: 16px 20px; text-align: left; font-weight: 600; color: #374151; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Candidato</th>
                                        <th style="padding: 16px 20px; text-align: left; font-weight: 600; color: #374151; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${filas}
                                    ${filasVacias}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div style="margin-top: 24px; display: flex; justify-content: flex-end;">
                        <button onclick="app.navigateTo('gestion-ofertas-empresa')" style="padding: 12px 28px; background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.3); color: white; cursor: pointer; font-size: 14px; font-weight: 600; border-radius: 10px; transition: all 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.1);" onmouseover="this.style.background='rgba(255,255,255,0.3)'; this.style.transform='translateY(-1px)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'; this.style.transform='translateY(0)'">Volver</button>
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
        const tituloPantalla = this.editingPostulacion ? 'Editar Postulación' : 'Nueva Postulación';
        const candidatosOptions = this.data.candidatos ? this.data.candidatos.map(c => `<option value="${c.nombre}">`).join('') : '';
        const deshabilitarCampos = true; // Siempre deshabilitar fecha
        
        return `
            <div style="width: 100%; min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 16px 24px; display: flex; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">📋</div>
                        <span style="color: white; font-weight: 600; font-size: 16px; text-shadow: 0 1px 2px rgba(0,0,0,0.1);">${tituloPantalla}</span>
                    </div>
                </div>
                
                <div style="padding: 32px; max-width: 900px; margin: 0 auto;">
                    <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.06);">
                        <div style="padding: 32px;">
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
                                <div>
                                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Fecha:</label>
                                    <input type="date" id="fechaPostulacion" value="${postulacion.fecha}" ${deshabilitarCampos ? 'disabled' : ''} style="width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: all 0.2s; outline: none; ${deshabilitarCampos ? 'background: #f9fafb; cursor: not-allowed;' : ''}" onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#e5e7eb'">
                                </div>
                                <div>
                                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Estado:</label>
                                    <select id="estadoPostulacion" ${deshabilitarCampos ? 'disabled' : ''} style="width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: all 0.2s; outline: none; ${deshabilitarCampos ? 'background: #f9fafb; cursor: not-allowed;' : ''}" onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#e5e7eb'">
                                        <option value="En Revisión" ${postulacion.estado === 'En Revisión' ? 'selected' : ''}>En Revisión</option>
                                        <option value="Aceptado" ${postulacion.estado === 'Aceptado' ? 'selected' : ''}>Aceptado</option>
                                        <option value="Rechazado" ${postulacion.estado === 'Rechazado' ? 'selected' : ''}>Rechazado</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div style="margin-bottom: 32px;">
                                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #374151; font-size: 14px;">Buscar Candidato:</label>
                                <input type="text" id="candidatoPostulacion" list="listaCandidatosPost" placeholder="Ej: Juan Perez" value="${postulacion.candidato?.nombre || ''}" style="width: 100%; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; transition: all 0.2s; outline: none;" onfocus="this.style.borderColor='#667eea'" onblur="this.style.borderColor='#e5e7eb'">
                                <datalist id="listaCandidatosPost">
                                    ${candidatosOptions}
                                </datalist>
                            </div>
                            
                            <div style="padding-top: 24px; border-top: 2px solid #f3f4f6; display: flex; gap: 12px; justify-content: flex-end;">
                                <button onclick="app.cancelarEdicionPostulacion()" style="padding: 12px 28px; background: white; border: 2px solid #e5e7eb; color: #6b7280; cursor: pointer; font-size: 14px; font-weight: 600; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.borderColor='#d1d5db'" onmouseout="this.style.borderColor='#e5e7eb'">Cancelar</button>
                                <button onclick="app.guardarPostulacion()" style="padding: 12px 28px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; cursor: pointer; font-size: 14px; font-weight: 600; border-radius: 8px; box-shadow: 0 4px 6px rgba(102,126,234,0.3); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 6px 12px rgba(102,126,234,0.4)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px rgba(102,126,234,0.3)'">Guardar</button>
                            </div>
                        </div>
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
        this.navigateTo('gestion-ofertas-empresa');
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
            this.navigateTo('postulaciones');
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

    // Gestión de Ofertas Empresa
    renderGestionOfertasEmpresa() {
        const empresa = this.data.empresas.find(e => e.id === this.empresaActual);
        const todasOfertas = this.data.ofertas.filter(o => o.empresaId === this.empresaActual);
        
        // Filtrar ofertas por búsqueda
        const ofertas = this.busquedaOferta 
            ? todasOfertas.filter(o => 
                o.titulo.toLowerCase().includes(this.busquedaOferta.toLowerCase()) ||
                o.categoria.toLowerCase().includes(this.busquedaOferta.toLowerCase()) ||
                o.descripcion.toLowerCase().includes(this.busquedaOferta.toLowerCase())
              )
            : todasOfertas;

        const getEstadoBadge = (estado) => {
            const colores = {
                'Pendiente': { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' },
                'Aprobada': { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7' },
                'Rechazada': { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' },
                'Cerrada': { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' }
            };
            const color = colores[estado] || colores['Cerrada'];
            return `<span style="display: inline-block; padding: 4px 12px; background: ${color.bg}; color: ${color.text}; border: 1px solid ${color.border}; border-radius: 6px; font-size: 11px; font-weight: 600; letter-spacing: 0.02em;">${estado}</span>`;
        };

        const filas = ofertas.map(oferta => {
            const postulaciones = this.data.postulaciones.filter(p => p.ofertaId === oferta.id).length;
            const puedeVerPostulaciones = oferta.estadoValidacion === 'Aprobada';
            
            return `
                <tr style="border-bottom: 1px solid #f3f4f6; transition: background 0.2s;" onmouseover="this.style.background='#f9fafb'" onmouseout="this.style.background='white'">
                    <td style="padding: 16px 20px;">${getEstadoBadge(oferta.estadoValidacion)}</td>
                    <td style="padding: 16px 20px; color: #6b7280; font-size: 14px;">${oferta.categoria}</td>
                    <td style="padding: 16px 20px;">
                        <div style="font-weight: 600; margin-bottom: 4px; color: #111827; font-size: 14px;">${oferta.titulo}</div>
                        <div style="color: #9ca3af; font-size: 13px;">${oferta.descripcion.substring(0, 60)}${oferta.descripcion.length > 60 ? '...' : ''}</div>
                    </td>
                    <td style="padding: 16px 20px;">
                        <div style="display: flex; gap: 8px; align-items: center;">
                            ${puedeVerPostulaciones ? 
                                `<button onclick="app.verPostulacionesOferta(${oferta.id})" style="padding: 6px 14px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 500; transition: background 0.2s;" onmouseover="this.style.background='#2563eb'" onmouseout="this.style.background='#3b82f6'">Ver postulaciones (${postulaciones})</button>` : 
                                `<span style="color: #d1d5db; font-size: 12px; font-weight: 500;">Sin acceso</span>`
                            }
                            <button onclick="app.editarOferta(${oferta.id})" style="padding: 6px 10px; background: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer; color: #6b7280; font-size: 13px; transition: all 0.2s;" title="Editar" onmouseover="this.style.background='#e5e7eb'" onmouseout="this.style.background='#f3f4f6'">✏️</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        const filasVacias = ofertas.length === 0 ? `
            <tr>
                <td colspan="4" style="text-align: center; padding: 40px; color: #a1a1aa; font-size: 13px;">
                    ${this.busquedaOferta ? 'No se encontraron ofertas con ese criterio' : 'No hay ofertas registradas'}
                </td>
            </tr>
        ` : '';

        return `
            <div style="width: 100%; min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; flex-direction: column; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                
                <!-- Barra de título -->
                <div style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); padding: 16px 24px; display: flex; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">🏢</div>
                        <span style="color: white; font-weight: 600; font-size: 16px; text-shadow: 0 1px 2px rgba(0,0,0,0.1);">${empresa?.nombre || 'Gestión de Ofertas'}</span>
                    </div>
                </div>

                <!-- Contenido -->
                <div style="flex: 1; padding: 32px; overflow-y: auto;">
                    
                    <!-- Sección buscar -->
                    <div style="background: white; padding: 24px; border-radius: 12px; margin-bottom: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.06);">
                        <div style="font-weight: 600; color: #111827; margin-bottom: 16px; font-size: 15px;">Buscar oferta</div>
                        <div style="display: flex; gap: 12px; align-items: center;">
                            <div style="flex: 1; position: relative;">
                                <input 
                                    type="text" 
                                    id="busquedaOferta"
                                    placeholder="Buscar por título, categoría o descripción..." 
                                    value="${this.busquedaOferta}"
                                    onkeyup="app.actualizarBusqueda(this.value)"
                                    style="width: 100%; padding: 12px 12px 12px 44px; border: 2px solid #e5e7eb; border-radius: 10px; font-size: 14px; box-sizing: border-box; transition: all 0.2s; outline: none;"
                                    onfocus="this.style.borderColor='#667eea'; this.style.boxShadow='0 0 0 3px rgba(102,126,234,0.1)'"
                                    onblur="this.style.borderColor='#e5e7eb'; this.style.boxShadow='none'">
                                <span style="position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #9ca3af; font-size: 18px;">🔍</span>
                            </div>
                            <button 
                                onclick="app.navegarAltaOferta()"
                                style="padding: 12px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 10px; cursor: pointer; font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 8px; box-shadow: 0 4px 6px rgba(102,126,234,0.3); transition: all 0.2s;"
                                onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 6px 12px rgba(102,126,234,0.4)'"
                                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 6px rgba(102,126,234,0.3)'"
                                title="Nueva oferta">
                                <span style="font-size: 18px;">+</span>
                                <span>Nueva oferta</span>
                            </button>
                        </div>
                    </div>

                    <!-- Tabla de ofertas -->
                    <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.06);">
                        <div style="max-height: calc(100vh - 320px); overflow-y: auto;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <thead style="background: linear-gradient(to bottom, #f9fafb, #f3f4f6); position: sticky; top: 0; z-index: 10;">
                                    <tr>
                                        <th style="padding: 16px 20px; text-align: left; font-weight: 600; color: #374151; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Estado</th>
                                        <th style="padding: 16px 20px; text-align: left; font-weight: 600; color: #374151; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Categoría</th>
                                        <th style="padding: 16px 20px; text-align: left; font-weight: 600; color: #374151; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Descripción</th>
                                        <th style="padding: 16px 20px; text-align: left; font-weight: 600; color: #374151; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${filas}
                                    ${filasVacias}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Botón salir -->
                    <div style="margin-top: 24px; display: flex; justify-content: flex-end;">
                        <button 
                            onclick="app.navigateTo('menu')"
                            style="padding: 12px 28px; background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.3); color: white; cursor: pointer; font-size: 14px; font-weight: 600; border-radius: 10px; transition: all 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
                            onmouseover="this.style.background='rgba(255,255,255,0.3)'; this.style.transform='translateY(-1px)'"
                            onmouseout="this.style.background='rgba(255,255,255,0.2)'; this.style.transform='translateY(0)'">Salir</button>
                    </div>
                </div>
            </div>
        `;
    }

    actualizarBusqueda(valor) {
        this.busquedaOferta = valor;
        this.render();
    }

    navegarAltaOferta() {
        this.editingOferta = null;
        this.navigateTo('alta-oferta');
    }

    cerrarOfertaOperativa(ofertaId) {
        if (!confirm('¿Está seguro de cerrar esta oferta? Los candidatos ya no podrán postularse.')) {
            return;
        }
        const oferta = this.data.ofertas.find(o => o.id === ofertaId);
        if (oferta) {
            oferta.estadoOperativo = 'Cerrada';
            this.saveData();
            this.render();
        }
    }

    verPostulacionesOferta(ofertaId) {
        this.ofertaSeleccionadaId = ofertaId;
        this.navigateTo('postulaciones');
    }
}

const app = new App();
