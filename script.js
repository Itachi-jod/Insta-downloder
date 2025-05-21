// script.js
document.getElementById('download-btn').addEventListener('click', async () => {
  const url = document.getElementById('video-url').value;
  const status = document.getElementById('status');
  status.textContent = 'Downloading...';

  try {
    const res = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    const data = await res.json();

    if (data.success && data.videoUrl) {
      const a = document.createElement('a');
      a.href = data.videoUrl;
      a.download = 'video.mp4';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      status.textContent = 'Download started!';
    } else {
      status.textContent = 'Failed to download video.';
    }
  } catch (e) {
    status.textContent = 'Error: ' + e.message;
  }
});
