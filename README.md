# c-p-login-admin

Interfaz frontend para el panel de inicio de sesión de administradores del sistema de pagos.

Permite a los administradores ingresar sus credenciales, autenticarse y recibir un token que luego usarán para acceder a recursos protegidos.

---

## 🧩 Descripción general

Este proyecto representa la capa de presentación (UI) del módulo de login de administradores:

- Formulario de login con campos de usuario y contraseña.  
- Envío de credenciales al backend para validar autenticación.  
- Manejo de estados (carga, éxito, error) en la interfaz.  
- Almacenamiento seguro del token de acceso (por ejemplo en `localStorage` o `sessionStorage`) y redirección posterior.

---


Descripción de carpetas / archivos:

| Carpeta / archivo | Propósito |
|-------------------|-----------|
| `assets/`         | Recursos estáticos: imágenes, íconos, logos |
| `js/`          | Lógica, scripts y estilos específicos para el formulario de login y panel |
| `index.html`      | Página principal de login |
| `syle`       | Estilos globales / específicos para login |
| `README.md`       | Documentación del proyecto |

---

## 🚀 Instalación y ejecución

Este frontend es estático (HTML, CSS, JS). Puedes desplegarlo en cualquier servidor estático o usarlo localmente en tu navegador.

### Pasos sugeridos

```bash
# Clona el repositorio
git clone https://github.com/alecxxc/c-p-login-admin.git
cd c-p-login-admin

