document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn-buka');
  buttons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const materiList = ['rata-rata', 'median', 'modus'];
      const topik = materiList[index];
      alert(`Membuka materi ${topik}...`);
      // Bisa diarahkan ke halaman per materi jika sudah dibuat
      // window.location.href = `materi-${topik}.html`;
    });
  });
});
