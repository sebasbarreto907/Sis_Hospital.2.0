// Datos de doctores por especialidad
const doctorsBySpecialty = {
    general: [
        { name: 'Dr. Carlos Mendez', email: 'carlos@clinica.com' }
    ],
    cardio: [
        { name: 'Dra. María García', email: 'maria@clinica.com' }
    ],
    cirugia: [
        { name: 'Dr. Juan Rodríguez', email: 'juan@clinica.com' }
    ],
    pediatria: [
        { name: 'Dra. Ana López', email: 'ana@clinica.com' }
    ],
    neurologia: [
        { name: 'Dr. Roberto Martínez', email: 'roberto@clinica.com' }
    ],
    gineco: [
        { name: 'Dra. Patricia Sánchez', email: 'patricia@clinica.com' }
    ]
};

// Nombres de especialidades
const specialtyNames = {
    general: 'Medicina General',
    cardio: 'Cardiología',
    cirugia: 'Cirugía General',
    pediatria: 'Pediatría',
    neurologia: 'Neurología',
    gineco: 'Ginecología y Obstetricia'
};

// Actualizar doctores cuando cambia la especialidad
function updateDoctors() {
    const specialtySelect = document.getElementById('specialty');
    const doctorSelect = document.getElementById('doctor');
    const selectedSpecialty = specialtySelect.value;

    // Limpiar opciones anteriores
    doctorSelect.innerHTML = '<option value="">-- Selecciona un doctor --</option>';

    if (selectedSpecialty && doctorsBySpecialty[selectedSpecialty]) {
        const doctors = doctorsBySpecialty[selectedSpecialty];
        doctors.forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.name;
            option.textContent = doctor.name;
            doctorSelect.appendChild(option);
        });
    }
}

// Formatear fecha
function formatDate(dateString) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString + 'T00:00:00').toLocaleDateString('es-ES', options);
}

// Actualizar resumen de cita
function updateSummary() {
    const specialty = document.getElementById('specialty').value;
    const doctor = document.getElementById('doctor').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const appointmentDate = document.getElementById('appointmentDate').value;
    const appointmentTime = document.getElementById('appointmentTime').value;
    const typeConsultation = document.querySelector('input[name="typeConsultation"]:checked').value;

    const summaryContent = document.getElementById('summaryContent');

    if (specialty && doctor && firstName && lastName && appointmentDate && appointmentTime) {
        const consultationType = typeConsultation === 'presencial' ? 'Presencial' : 'Virtual (Telemedicina)';
        const formattedDate = formatDate(appointmentDate);
        
        summaryContent.innerHTML = `
            <div style="font-size: 0.95rem;">
                <p><strong>Paciente:</strong> ${firstName} ${lastName}</p>
                <p><strong>Especialidad:</strong> ${specialtyNames[specialty]}</p>
                <p><strong>Doctor/Doctora:</strong> ${doctor}</p>
                <p><strong>Fecha:</strong> ${formattedDate}</p>
                <p><strong>Hora:</strong> ${appointmentTime}</p>
                <p><strong>Tipo de Consulta:</strong> ${consultationType}</p>
            </div>
        `;
    } else {
        summaryContent.innerHTML = '<p>Completa todos los pasos para ver el resumen de tu cita</p>';
    }
}

// Event listeners para actualizar el resumen
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentForm');
    
    // Agregar event listeners para actualizar resumen
    document.getElementById('specialty').addEventListener('change', updateSummary);
    document.getElementById('doctor').addEventListener('change', updateSummary);
    document.getElementById('firstName').addEventListener('input', updateSummary);
    document.getElementById('lastName').addEventListener('input', updateSummary);
    document.getElementById('appointmentDate').addEventListener('change', updateSummary);
    document.getElementById('appointmentTime').addEventListener('change', updateSummary);
    
    const consultationRadios = document.querySelectorAll('input[name="typeConsultation"]');
    consultationRadios.forEach(radio => {
        radio.addEventListener('change', updateSummary);
    });

    // Validar fecha mínima (hoy)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('appointmentDate').setAttribute('min', today);

    // Manejar envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validación básica
        const terms = document.querySelector('input[name="terms"]').checked;
        
        if (!terms) {
            alert('Debes aceptar los términos y condiciones');
            return;
        }

        // Recopilar datos del formulario
        const formData = {
            specialty: specialtyNames[document.getElementById('specialty').value],
            doctor: document.getElementById('doctor').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            rut: document.getElementById('rut').value,
            age: document.getElementById('age').value,
            reason: document.getElementById('reason').value,
            appointmentDate: formatDate(document.getElementById('appointmentDate').value),
            appointmentTime: document.getElementById('appointmentTime').value,
            typeConsultation: document.querySelector('input[name="typeConsultation"]:checked').value,
            newsletter: document.querySelector('input[name="newsletter"]').checked
        };

        // Mostrar confirmación
        const confirmationMessage = `
Cita Agendada Exitosamente!

Detalles de tu cita:
- Paciente: ${formData.firstName} ${formData.lastName}
- Especialidad: ${formData.specialty}
- Doctor/Doctora: ${formData.doctor}
- Fecha: ${formData.appointmentDate}
- Hora: ${formData.appointmentTime}
- Tipo: ${formData.typeConsultation === 'presencial' ? 'Presencial' : 'Virtual (Telemedicina)'}

Se ha enviado un correo de confirmación a: ${formData.email}

¡Gracias por confiar en nosotros!
        `;

        alert(confirmationMessage);

        // Aquí irían las acciones adicionales:
        // - Enviar datos a un servidor
        // - Guardar en base de datos
        // - Enviar email de confirmación
        // console.log(formData);

        // Opcional: limpiar formulario después de enviar
        // form.reset();
        // updateSummary();
    });

    // Permitir solo números en edad
    document.getElementById('age').addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
});
