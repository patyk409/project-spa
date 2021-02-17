document.querySelector('.mobile-hamburger').addEventListener('click', function () {
    document.querySelector('.open-menu-holder').classList.toggle('open');
});

document.querySelector('.mobile-closer').addEventListener('click', function () {
    document.querySelector('.open-menu-holder').classList.toggle('open');
});

const createAppointment = (appointment) => {
    const msg = document.querySelector('.appointment-info');

    fetch('https://akademia108.pl/api/ajax/post-appointment.php', {
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(appointment)
    })
    .then(res => res.json())
    .then(resJSON => {
        console.log(resJSON);
        msg.classList.add('send');
        msg.innerText = `Dziękujemy ${resJSON.appointment.name}. Zostałeś zapisany!`
    });
};

document.querySelector('#appointment-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const msg = document.querySelector('.appointment-info');
    let formFields = document.querySelectorAll('.form-field');
    let allFields = false;
    let appointment = {
        name: document.querySelector('#appointment-name').value,
        email: document.querySelector('#appointment-email').value,
        service: document.querySelector('#appointment-service').value,
        phone: document.querySelector('#appointment-phone').value,
        date: document.querySelector('#appointment-date').value,
        time: document.querySelector('#appointment-time').value,
        message: document.querySelector('#appointment-message').value
    }

    for (let i = 0; i < formFields.length; i++) {
        if (formFields[i].value === '') {
            allFields = false;
            formFields[i].classList.add('error');
        } else {
            allFields = true;
            formFields[i].classList.remove('error');
        }
    }

    if (allFields) {
        createAppointment(appointment);
    } else {
        msg.classList.add('error');
        msg.innerText = 'Wypełnij wszytskie pola!';
    }
});