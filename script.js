// Fungsi untuk menyalin nomor rekening (dipanggil dari tombol di index.html)
function copyRek(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    try {
        document.execCommand('copy');
        sel.removeAllRanges();
        alert('Nomor rekening berhasil disalin!');
    } catch (e) {
        alert('Gagal menyalin nomor rekening');
    }
}
// Countdown
const targetDate = new Date("maret 10, 2027 08:00:00").getTime();
const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "Waktu telah tiba!";
    }
}, 1000);

// Offcanvas
const stickyTop = document.querySelector('.sticky-top');
const offcanvas = document.querySelector('.offcanvas');
if (offcanvas && stickyTop) {
    offcanvas.addEventListener('show.bs.offcanvas', function() {
        stickyTop.style.overflow = 'visible';
    });
    offcanvas.addEventListener('hidden.bs.offcanvas', function() {
        stickyTop.style.overflow = 'hidden';
    });
}

// Smooth scroll lock/unlock
function disablescroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = function() {
        window.scrollTo(scrollTop, scrollLeft);
    };
    const rootElement = document.querySelector(":root");
    if (rootElement) {
        rootElement.style.scrollBehavior = 'auto';
    }
}

function enablescroll() {
    window.onscroll = function() {};
    const rootElement = document.querySelector(':root');
    if (rootElement) {
        rootElement.style.scrollBehavior = 'smooth';
    }


    playaudio();
    // localStorage.setItem('opened', 'true');
}

// play audio 

function playaudio() {
    const song = document.querySelector('#song');
    const audioiconwraper = document.querySelector('.audio-icon-wraper');
    if (song) {
        song.volume = 0.2; // Set volume to 10%
        song.play();
    }
    if (audioiconwraper) {
        audioiconwraper.style.display = 'flex';
    }
}

// Toggle play/pause audio
function toggleAudio() {
    const song = document.querySelector('#song');
    // Pastikan icon adalah <i> di dalam .audio-icon-wraper
    const audioiconwraper = document.querySelector('.audio-icon-wraper');
    const icon = audioiconwraper ? audioiconwraper.querySelector('i') : null;
    if (!song || !icon) return;
    // Hapus semua class bi-* pada icon
    // icon.classList.forEach(cls => {
    //     if (cls.startsWith('bi-')) icon.classList.remove(cls);
    // });
    if (song.paused) {
        song.play();
        icon.classList.remove('bi', 'bi-pause-circle');
        icon.classList.add('bi', 'bi-disc');
    } else {
        song.pause();
        icon.classList.remove('bi', 'bi-disc');
        icon.classList.add('bi', 'bi-pause-circle');
    }
}

// Event listener untuk icon audio
window.addEventListener('DOMContentLoaded', function() {
    const audioiconwraper = document.querySelector('.audio-icon-wraper');
    if (audioiconwraper) {
        audioiconwraper.addEventListener('click', toggleAudio);
    }
});

// if (!localStorage.getItem('opened')) {
//     disablescroll();
// }

disablescroll();
    
window.addEventListener("load", function() {
  const form = document.getElementById('rsvp-form');
  const messagesList = document.getElementById('messages-list');
  const submitBtn = form.querySelector('button[type="submit"]');
  let originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = new FormData(form);
    const action = e.target.action;
    const name = form.querySelector('[name="name"]').value;
    const attendance = form.querySelector('[name="attendance"]').value;
    const message = form.querySelector('[name="message"]').value;
    // Tampilkan animasi loading pada tombol
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Mengirim...';
    }
    fetch(action, {
      method: 'POST',
      body: data,
    })
    .then(() => {
      // Tampilkan pesan di bawah form
      if (messagesList) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'border rounded p-2 mb-2 text-start bg-light';
        msgDiv.innerHTML = `<strong>${name}</strong> <span class="badge bg-secondary">${attendance}</span><br><span>${message.replace(/\n/g, '<br>')}</span>`;
        messagesList.prepend(msgDiv);
      }
      form.reset();
    })
    .finally(() => {
      // Hilangkan animasi loading
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
      }
    });
  });
});

const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get('n') || '';
const pronoun = urlParams.get('p') || 'Bapak/Ibu/Saudara/i,';

const namaContainer = document.querySelector('.hero h4 span');
namaContainer.innerText = nama;
namaContainer.innerText = `${pronoun} ${nama}`.replace(/ ,$/, ',');

document.querySelector('#name').value = nama;

