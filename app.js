// Firebase configuration - Replace with your Firebase project config
const firebaseConfig = {
    // Add your Firebase config here
};

// Initialize Firebase (uncomment when config is added)
// firebase.initializeApp(firebaseConfig);

// Function to fetch Discord widget data
async function fetchDiscordWidgetData() {
    try {
        const response = await fetch('https://discord.com/api/guilds/1336406381640548473/widget.json');
        if (!response.ok) {
            throw new Error('Widget not enabled or server not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Discord widget data:', error);
        return null;
    }
}

// Function to update Discord widget information
async function updateDiscordWidget() {
    const data = await fetchDiscordWidgetData();
    const widgetContainer = document.querySelector('.discord-widget-container');
    if (!widgetContainer) return;

    const widgetInfo = document.createElement('div');
    widgetInfo.className = 'discord-widget-info';

    if (!data) {
        widgetInfo.innerHTML = `
            <div class="server-info error">
                <h4>Estado del Servidor</h4>
                <p>⚠️ No se pudo cargar la información del servidor. El Widget del servidor no está habilitado.</p>
                <div class="mt-3">
                    <p><strong>Para habilitar el Widget:</strong></p>
                    <ol class="text-start">
                        <li>Abre la Configuración del Servidor en Discord</li>
                        <li>Ve a la sección "Widget"</li>
                        <li>Activa "Habilitar Widget del Servidor"</li>
                        <li>Guarda los cambios</li>
                    </ol>
                </div>
                <small class="d-block mt-2">Si necesitas ayuda, únete a nuestro <a href="https://discord.gg/jAUYsFBsrD" target="_blank" class="text-info">servidor de soporte</a></small>
            </div>
        `;

    } else {
        widgetInfo.innerHTML = `
            <div class="server-info">
                <h4>${data.name || 'Servidor de Matecito'}</h4>
                <p>🟢 ${data.presence_count || 0} miembros en línea</p>
                ${data.instant_invite ? `<a href="${data.instant_invite}" class="btn btn-primary btn-sm mt-2" target="_blank">Unirse al Servidor</a>` : ''}
            </div>
        `;
    }

    // Update widget container
    const existingInfo = widgetContainer.querySelector('.discord-widget-info');
    if (existingInfo) {
        widgetContainer.replaceChild(widgetInfo, existingInfo);
    } else {
        widgetContainer.insertBefore(widgetInfo, widgetContainer.firstChild);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Handle smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize Discord widget
    updateDiscordWidget();
    // Update Discord widget every 60 seconds
    setInterval(updateDiscordWidget, 60000);

    // Add Discord Bot with direct OAuth2 URL
    const addToDiscordBtn = document.getElementById('add-to-discord');
    if (addToDiscordBtn) {
        addToDiscordBtn.href = 'https://discord.com/oauth2/authorize?client_id=1283401603843493960&permissions=689879477312&integration_type=0&scope=bot';
    }

    // Load announcements
    loadAnnouncements();

    // Load ToS and PP content
    loadToSAndPP();
});

async function loadAnnouncements() {
    const container = document.getElementById('announcements-container');
    if (!container) return;

    try {
        // Replace this with actual API call to your backend/Firebase
        const announcements = [
            {
                title: 'Nueva Función: Precios Regionales de Steam en América',
                date: '17-3-2025',
                content: '¡Nos complace anunciar que Matecito🧉 ahora puede mostrar los precios de Steam para todas las regiones de América! Esta nueva función te permite comparar los precios de los juegos en diferentes países del continente americano, ayudándote a comparar precios de manera efectiva.'
            }
        ];

        announcements.forEach(announcement => {
            const announcementElement = createAnnouncementElement(announcement);
            container.appendChild(announcementElement);
        });
    } catch (error) {
        console.error('Error loading announcements:', error);
        container.innerHTML = '<p class="text-center">Error al cargar los anuncios.</p>';
    }
}

function createAnnouncementElement(announcement) {
    const div = document.createElement('div');
    div.className = 'announcement';
    div.innerHTML = `
        <h3>${announcement.title}</h3>
        <div class="date">${announcement.date}</div>
        <p>${announcement.content}</p>
    `;
    return div;
}

async function loadToSAndPP() {
    // Load Terms of Service
    const tosContent = document.getElementById('tos-content');
    if (tosContent) {
        tosContent.innerHTML = `
            <h2>Términos de Servicio de Matecito Bot</h2>
            <p class="date">Fecha: 26/9/2024 (Última)</p>

            <h3>1. Propósito y funcionalidad del bot</h3>
            <p>El bot Matecito🧉 es un bot de Discord diseñado para proporcionar información sobre juegos de Steam y realizar conversiones monetarias de USD (Dólares) a ARS (Pesos Argentinos), incluyendo los impuestos aplicables y diferencias de dólar (Cripto o Tarjeta). A través de comandos, los usuarios pueden obtener detalles sobre juegos y realizar conversiones monetarias personalizadas. El bot maneja datos relacionados con juegos, precios, usuarios de Steam y conversiones de monedas internacionales.</p>

            <h3>2. Uso de APIs externas</h3>
            <p>Matecito🧉 utiliza las siguientes APIs externas para su funcionamiento:</p>
            <ul>
                <li>Steam API: Para obtener información sobre juegos y usuarios de Steam (nombre de usuario, ID, perfil, juegos jugados, etc.).</li>
                <li>Dolar API: Para realizar conversiones de USD a ARS con distintos valores de cambio.</li>
                <li>Exchangerate API: Para realizar conversiones entre diferentes monedas internacionales.</li>
            </ul>
            <p>El bot procesa y muestra estos datos en Discord bajo el control del usuario, quien decide cuánto contenido mostrar.</p>

            <h3>3. Alcance y limitaciones</h3>
            <p>El uso del bot está permitido solo para usuarios mayores de 13 años, y aunque está diseñado para usuarios en Argentina, es accesible a nivel mundial.</p>
            <p>El bot depende de las API's externas, que en ocasiones pueden no proporcionar información actualizada o exacta, lo que puede afectar la precisión de los datos de precios y conversiones.</p>
            <p>Matecito🧉 no garantiza la disponibilidad continua de estas API's ni la exactitud de los datos regionales de los juegos.</p>

            <h3>4. Responsabilidades del usuario</h3>
            <p>Al utilizar Matecito🧉, los usuarios se comprometen a:</p>
            <ul>
                <li>No abusar del bot enviando comandos repetidamente en cortos períodos de tiempo (spam).</li>
                <li>No intentar colapsar o interrumpir el funcionamiento del bot mediante el envío de múltiples solicitudes simultáneas.</li>
            </ul>
            <p>Actualmente, no existen sanciones aplicables por incumplimiento de estas normas, pero se reserva el derecho de aplicar baneos por ID de usuario o servidor en futuras versiones.</p>

            <h3>5. Recopilación de datos</h3>
            <p>Matecito🧉 no recopila ni almacena datos personales de los usuarios, como SteamIDs, preferencias de moneda o ubicación. Toda la información mostrada se elimina de manera volátil después de su uso en Discord y no se comparte con terceros.</p>

            <h3>6. Limitación de responsabilidad</h3>
            <p>Matecito🧉 no se hace responsable de los siguientes eventos:</p>
            <ul>
                <li>Mal funcionamiento del bot debido a ataques al servidor.</li>
                <li>Inexactitudes en los datos de conversión de monedas proporcionados por las APIs.</li>
                <li>Uso inapropiado de la API de Steam por parte de los usuarios.</li>
            </ul>
            <p>El uso del bot es bajo el propio riesgo del usuario, y no se garantiza la exactitud ni la disponibilidad continua del servicio.</p>

            <h3>7. Derechos de autor y propiedad intelectual</h3>
            <p>Todos los derechos relacionados con las APIs de terceros utilizadas por Matecito🧉 (Steam API, Dolar API, Exchangerate API) son propiedad de sus respectivos dueños. El nombre y el código del bot Matecito🧉 son propiedad privada de su creador.</p>

            <h3>8. Modificaciones a los Términos de Servicio</h3>
            <p>Nos reservamos el derecho de modificar estos Términos de Servicio en cualquier momento. Cualquier cambio en los términos será publicado en nuestro repositorio de <a href="https://github.com/MOtaMore/matecitoservices/wiki" target="_blank">GitHub</a> y nuestro servidor de <a href="https://discord.gg/jAUYsFBsrD" target="_blank">Discord</a> donde los usuarios serán notificados oportunamente.</p>

            <h3>9. Condiciones de uso de Discord</h3>
            <p>El uso de Matecito🧉 está sujeto a las <a href="https://discord.com/terms" target="_blank">Condiciones de Servicio</a> de Discord y <a href="https://discord-com.translate.goog/terms/guidelines-march-2022?_x_tr_sl=en&_x_tr_tl=es&_x_tr_hl=es&_x_tr_pto=tc" target="_blank">Normas de la Comunidad</a> de Discord. Al usar el bot, aceptas cumplir con dichas condiciones.</p>
        `;
    }
    }

    // Load Privacy Policy
    const ppContent = document.getElementById('pp-content');
    if (ppContent) {
        ppContent.innerHTML = `
            <h2>Política de Privacidad de Matecito Bot</h2>
            <p class="date">Fecha: 26/9/2024 (Última)</p>
            
            <h3>1. Información que recopilamos</h3>
            <p>El bot Matecito🧉 no recopila, almacena ni procesa información personal de los usuarios. No se guarda ningún tipo de dato que permita identificar a un usuario, tales como:</p>
            <ul>
                <li>SteamIDs</li>
                <li>Nombres de usuario</li>
                <li>Preferencias de moneda</li>
                <li>Ubicación geográfica</li>
                <li>Otros datos personales identificables</li>
            </ul>
            <p>Toda la información que el bot maneja es temporal y se utiliza exclusivamente para procesar y mostrar respuestas en Discord.</p>

            <h3>2. Uso de la información</h3>
            <p>El bot utiliza APIs externas para obtener la información necesaria para su funcionamiento. Esta información incluye:</p>
            <ul>
                <li>Datos de juegos y usuarios de Steam: proporcionados por la Steam API para mostrar información sobre los juegos y los perfiles de los usuarios de Steam.</li>
                <li>Datos de conversión de moneda: proporcionados por las APIs de conversión (Dolar API y Exchangerate API) para realizar cálculos y conversiones de USD a ARS y otras monedas internacionales.</li>
            </ul>
            <p>Estos datos se procesan en tiempo real y solo para el propósito específico de mostrar la información solicitada en los canales de Discord.</p>

            <h3>3. Almacenamiento y eliminación de datos</h3>
            <p>Toda la información que el bot procesa se almacena de manera volátil, es decir, solo mientras se realiza la solicitud del usuario. Una vez que la información ha sido presentada en Discord, se borra automáticamente del sistema. Matecito🧉 no guarda registros de las solicitudes ni conserva datos en bases de datos externas.</p>

            <h3>4. Compartición de información con terceros</h3>
            <p>Matecito🧉 no comparte ninguna información con terceros. Los datos proporcionados por las APIs externas se utilizan únicamente dentro del contexto de las funciones del bot en Discord y no se envían ni distribuyen a ninguna otra entidad.</p>

            <h3>5. Seguridad</h3>
            <p>El bot Matecito🧉 implementa medidas razonables para asegurar que los datos procesados estén protegidos contra accesos no autorizados. Sin embargo, como el bot no recopila ni almacena información personal, los riesgos de seguridad relacionados con la privacidad de los usuarios son mínimos.</p>

            <h3>6. Uso de APIs de terceros</h3>
            <p>El bot Matecito🧉 se basa en las siguientes APIs de terceros para proporcionar sus servicios:</p>
            <ul>
                <li>Steam API: Para obtener información sobre juegos y usuarios de Steam.</li>
                <li>Dolar API: Para realizar conversiones de USD a ARS.</li>
                <li>Exchangerate API: Para realizar conversiones de monedas internacionales.</li>
            </ul>
            <p>El uso de estas APIs está sujeto a sus propios términos de servicio y políticas de privacidad. Recomendamos a los usuarios revisar los documentos relevantes de estas plataformas.</p>

            <h3>7. Derechos del usuario</h3>
            <p>Dado que Matecito🧉 no recopila ni almacena información personal, no se aplican derechos de acceso, rectificación, eliminación ni portabilidad de datos, ya que no se guarda ningún tipo de información personal del usuario.</p>

            <h3>8. Cambios en las Políticas de Privacidad</h3>
            <p>Nos reservamos el derecho de modificar estas Políticas de Privacidad en cualquier momento. Cualquier cambio será notificado a los usuarios a través de nuestro repositorio de GitHub. Recomendamos revisar regularmente estas Políticas para estar al tanto de las actualizaciones.</p>

            <h3>9. Contacto</h3>
            <p>Si tienes alguna pregunta o inquietud sobre estas Políticas de Privacidad o el uso del bot Matecito🧉, puedes ponerte en contacto con nosotros a través del siguiente enlace: <a href="https://discord.gg/jAUYsFBsrD" target="_blank">Matecito🧉 Soporte (Discord)</a>.</p>
        `;
    }
