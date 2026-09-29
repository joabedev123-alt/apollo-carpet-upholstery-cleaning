/**
 * Apollo Local Server with robust HTTP 206 Partial Content (Range) & HEAD support for MP4 videos
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname, '..');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Range, Origin, Accept, Content-Type');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range, Accept-Ranges, Content-Length');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';

  const filePath = path.join(PUBLIC_DIR, reqPath);

  // Security: prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`404 Not Found: ${reqPath}`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const totalSize = stats.size;

    // Handle Range Requests for MP4 Streaming
    const range = req.headers.range;

    if (range && ext === '.mp4') {
      const match = range.match(/bytes=(\d*)-(\d*)/);
      if (!match) {
        res.writeHead(416, {
          'Content-Range': `bytes */${totalSize}`,
          'Content-Type': contentType
        });
        res.end();
        return;
      }

      let start = match[1] ? parseInt(match[1], 10) : 0;
      let end = match[2] ? parseInt(match[2], 10) : totalSize - 1;

      // Handle suffix range (e.g. bytes=-500)
      if (!match[1] && match[2]) {
        start = totalSize - parseInt(match[2], 10);
        end = totalSize - 1;
      }

      if (isNaN(start) || start < 0) start = 0;
      if (isNaN(end) || end >= totalSize) end = totalSize - 1;

      if (start > end || start >= totalSize) {
        res.writeHead(416, {
          'Content-Range': `bytes */${totalSize}`,
          'Content-Type': contentType
        });
        res.end();
        return;
      }

      const chunkSize = end - start + 1;

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${totalSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      });

      if (req.method === 'HEAD') {
        res.end();
        return;
      }

      const fileStream = fs.createReadStream(filePath, { start, end });
      fileStream.on('error', () => {
        if (!res.headersSent) {
          res.writeHead(500);
        }
        res.end();
      });

      req.on('close', () => {
        fileStream.destroy();
      });

      fileStream.pipe(res);

    } else {
      // Standard 200 Response
      res.writeHead(200, {
        'Content-Length': totalSize,
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes',
        'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=3600'
      });

      if (req.method === 'HEAD') {
        res.end();
        return;
      }

      const fileStream = fs.createReadStream(filePath);
      fileStream.on('error', () => {
        if (!res.headersSent) {
          res.writeHead(500);
        }
        res.end();
      });

      req.on('close', () => {
        fileStream.destroy();
      });

      fileStream.pipe(res);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Apollo Website Server running at http://localhost:${PORT}/`);
});
