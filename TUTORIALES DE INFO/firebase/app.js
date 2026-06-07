// --- CONFIGURACIÓN & IMPORTACIONES ---
// Obtenemos los módulos que cargamos en el HTML (simulando imports de node)
const { initializeApp, getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } = window.firebaseModules;
const { getFirestore, doc, getDoc, setDoc, updateDoc, onSnapshot, collection, query, where, getDocs } = window.firebaseModules;
const { getStorage, ref, uploadBytes, getDownloadURL } = window.firebaseModules;
const { useState, useEffect } = React;

// TODO: JMGV, AQUÍ PEGAS TUS CREDENCIALES DE FIREBASE
const firebaseConfig = {
	apiKey: "AIzaSyC08vUkWdQ9Ad3PaXS0uZ0yu_EWWBaq-aQ",
	authDomain: "acceso-a-cursos-4a314.firebaseapp.com",
	projectId: "acceso-a-cursos-4a314",
	storageBucket: "acceso-a-cursos-4a314.firebasestorage.app",
	messagingSenderId: "851856735092",
	appId: "1:851856735092:web:04290714cb63e4244c4a21",
	measurementId: "G-ZG280G922Y"
};

// Inicializar Servicios
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// --- COMPONENTES UI (ATÓMICOS) ---

const LoadingSpinner = () => <div className="subtitle"><i className="fas fa-circle-notch fa-spin"></i> Cargando sistema...</div>;

// --- VISTAS PRINCIPALES ---

// 1. Vista de Login (La Puerta)
const LoginView = ({ onLogin }) => {
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            // El listener en App se encarga del resto
        } catch (error) {
            console.error("Error auth:", error);
            alert("Error al entrar. Revisa la consola.");
        }
    };

    return (
        <div className="card">
            <h1 className="title">Bienvenido, Alumno</h1>
            <p className="subtitle">Accede para ver tu contenido exclusivo o gestionar tu suscripción.</p>
            <button className="btn btn-google" onClick={handleGoogleLogin}>
                <i className="fab fa-google"></i> Continuar con Google
            </button>
        </div>
    );
};

// 2. Vista de Pagos (La Pasarela)
const PaymentView = ({ user, refreshProfile }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async () => {
        if (!file) return alert("Por favor selecciona una imagen del comprobante.");
        setUploading(true);

        try {
            // 1. Subir imagen a Storage
            // Nota: Usamos el UID del usuario para organizar carpetas
            const storageRef = ref(storage, `comprobantes/${user.uid}/${file.name}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            // 2. Actualizar Firestore con estado 'pending'
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                displayName: user.displayName,
                status: "pending", // Clave: Estado pendiente de validación humana
                proofUrl: downloadURL,
                updatedAt: new Date()
            }, { merge: true });

            alert("¡Comprobante enviado! Validaremos tu pago en breve.");
            refreshProfile(); // Recargar estado visual
        } catch (error) {
            console.error("Error subida:", error);
            alert("Error al subir. ¿Habilitaste Storage en Firebase?");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="card">
            <h2 className="title">Suscripción Requerida</h2>
            <p className="subtitle">Para acceder al tutorial avanzado, realiza una transferencia o escanea el QR.</p>
            
            <div className="qr-container">
                {/* Aquí iría tu imagen real del QR <img src="qr.png" /> */}
                <i className="fas fa-qrcode qr-placeholder"></i>
                <p style={{marginTop: '10px', fontSize: '0.9rem'}}>Banco: BBVA<br/>Cuenta: 1234-5678-90<br/>Ref: TU-EMAIL</p>
            </div>

            <div style={{textAlign: 'left', marginBottom: '1rem'}}>
                <label style={{fontSize: '0.8rem', fontWeight: 'bold'}}>Subir Comprobante:</label>
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
            </div>

            <button className="btn btn-primary" onClick={handleUpload} disabled={uploading}>
                {uploading ? "Subiendo..." : "Confirmar Pago"} <i className="fas fa-check"></i>
            </button>
            <button className="btn btn-outline" onClick={() => signOut(auth)}>Cerrar Sesión</button>
        </div>
    );
};

// 3. Vista de Espera (La Ansiedad Controlada)
const PendingView = ({ onLogout }) => (
    <div className="card">
        <div className="status-badge status-pending">Verificación en Proceso</div>
        <h2 className="title">Comprobante Recibido</h2>
        <p className="subtitle">
            Nuestro equipo está validando tu transferencia manualmente. 
            Te notificaremos en cuanto el acceso se libere.
        </p>
        <button className="btn btn-outline" onClick={onLogout}>Volver más tarde</button>
    </div>
);

// 4. Dashboard Premium (El Premio)
const Dashboard = ({ user, onLogout }) => (
    <div className="app-container"> {/* Contenedor más amplio para el contenido */}
        <div className="card" style={{textAlign: 'left'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div className="status-badge status-active">Acceso Total</div>
                <button onClick={onLogout} style={{border:'none', background:'none', cursor:'pointer', color: 'red'}}>Salir</button>
            </div>
            
            <h1 className="title" style={{marginTop: '1rem'}}>Masterclass: Firebase Auth</h1>
            <p className="subtitle">Bienvenido, {user.displayName}. Aquí tienes el contenido exclusivo.</p>
            
            <div style={{background: '#EFF6FF', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #2563EB'}}>
                <h3><i className="fas fa-video"></i> Lección 1: Seguridad</h3>
                <p style={{fontSize: '0.9rem', marginTop: '0.5rem'}}>
                    El contenido seguro se carga solo cuando el estado del usuario es 'active'.
                </p>
            </div>
            {/* Aquí iría el resto del curso */}
        </div>
    </div>
);

// 5. Panel Admin (El Ojo que Todo lo Ve)
// Un pequeño "hack" para que tú (JMGV) puedas aprobar pagos desde la misma app
const AdminPanel = ({ onLogout }) => {
    const [pendingUsers, setPendingUsers] = useState([]);

    useEffect(() => {
        // Escucha en tiempo real usuarios pendientes
        const q = query(collection(db, "users"), where("status", "==", "pending"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPendingUsers(users);
        });
        return () => unsubscribe();
    }, []);

    const approveUser = async (userId) => {
        if(confirm("¿Confirmar recepción del dinero?")) {
            await updateDoc(doc(db, "users", userId), { status: "active" });
        }
    };

    return (
        <div className="app-container">
            <div className="card">
                <h2 className="title">Panel Admin</h2>
                <p className="subtitle">Validación manual de pagos</p>
                
                {pendingUsers.length === 0 ? <p>No hay pagos pendientes.</p> : (
                    <table className="admin-table">
                        <thead><tr><th>Email</th><th>Acción</th></tr></thead>
                        <tbody>
                            {pendingUsers.map(u => (
                                <tr key={u.id}>
                                    <td>
                                        {u.email}<br/>
                                        <a href={u.proofUrl} target="_blank" style={{fontSize:'0.7rem', color:'blue'}}>Ver Comprobante</a>
                                    </td>
                                    <td>
                                        <button onClick={() => approveUser(u.id)} style={{background:'green', color:'white', border:'none', padding:'5px', borderRadius:'4px', cursor:'pointer'}}>
                                            Aprobar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <button className="btn btn-outline" style={{marginTop: '1rem'}} onClick={onLogout}>Salir</button>
            </div>
        </div>
    );
};

// --- ORQUESTADOR PRINCIPAL (APP) ---

const App = () => {
    const [currentUser, setCurrentUser] = useState(null); // Datos de Auth
    const [userProfile, setUserProfile] = useState(null); // Datos de Firestore (Status)
    const [loading, setLoading] = useState(true);

    // 1. Escuchar Auth de Firebase
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);
                await fetchUserProfile(user.uid);
            } else {
                setCurrentUser(null);
                setUserProfile(null);
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    // 2. Buscar perfil extendido en Firestore
    const fetchUserProfile = async (uid) => {
        setLoading(true);
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            setUserProfile(docSnap.data());
        } else {
            // Usuario nuevo, no tiene registro en DB aún
            setUserProfile({ status: "none" });
        }
        setLoading(false);
    };

    if (loading) return <div style={{display:'flex', justifyContent:'center', marginTop:'50px'}}><LoadingSpinner /></div>;

    // --- ENRUTAMIENTO LÓGICO ---

    if (!currentUser) {
        return <div className="app-container"><LoginView /></div>;
    }

    // "Backdoor" simple para que TU entres como admin (Cambia este email por el tuyo real)
    if (currentUser.email === "manuel.vargas@uadec.edu.mx" || currentUser.email === "TU_EMAIL_ADMIN@GMAIL.COM") {
       // Puedes mostrar el panel admin O el dashboard. Aquí fuerzo el admin para demo.
       return <AdminPanel onLogout={() => signOut(auth)} />;
    }

    // Lógica de Estados del Alumno
    switch (userProfile?.status) {
        case 'active':
            return <Dashboard user={currentUser} onLogout={() => signOut(auth)} />;
        case 'pending':
            return <div className="app-container"><PendingView onLogout={() => signOut(auth)} /></div>;
        default:
            // Status 'none' o cualquier otro cae en la pantalla de pago
            return <div className="app-container"><PaymentView user={currentUser} refreshProfile={() => fetchUserProfile(currentUser.uid)} /></div>;
    }
};

// Renderizado en el DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);