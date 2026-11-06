import express from 'express';
import { createServer as createViteServer } from 'vite';
import { exec } from 'child_process';
import util from 'util';
import dotenv from 'dotenv';

dotenv.config();

const execPromise = util.promisify(exec);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // API Route: Git Push
  app.post('/api/git-push', async (req, res) => {
    try {
      const { token, repoUrl } = req.body;
      if (!token) {
        res.status(400).json({ error: 'GitHub Personal Access Token is required.' });
        return;
      }

      const targetRepo = repoUrl || 'https://github.com/Bhavani-1-sudo/Job-board.git';
      // Format authenticated URL
      const cleanRepo = targetRepo.replace(/^https:\/\//, '');
      const authUrl = `https://${token}@${cleanRepo}`;

      // Configure git, stage, commit, and push
      const commands = [
        'git config --global --add safe.directory /app/applet',
        'git config user.name "AI Studio"',
        'git config user.email "build@aistudio.google.com"',
        'git add -A',
        'git commit -m "feat: complete JobHub job board application" || echo "No changes to commit"',
        'git branch -M main',
        `git remote set-url origin "${authUrl}" || git remote add origin "${authUrl}"`,
        'git push -u origin main',
      ];

      const { stdout, stderr } = await execPromise(commands.join(' && '));

      // Reset origin to public URL after push to avoid saving token in local git config
      await execPromise(
        `git remote set-url origin "${targetRepo}"`
      ).catch(() => {});

      res.json({
        success: true,
        message: 'Successfully committed and pushed all files to main branch!',
        details: stdout || stderr,
      });
    } catch (err: unknown) {
      console.error('Git push error:', err);
      const errMsg = err instanceof Error ? err.message : String(err);
      // Clean token from error message if present
      const sanitized = errMsg.replace(/:[^@]+@github\.com/, ':***@github.com');
      res.status(500).json({
        error: sanitized,
      });
    }
  });

  // API Route: Git Status
  app.get('/api/git-status', async (_req, res) => {
    try {
      const { stdout: branch } = await execPromise('git branch --show-current || echo "main"');
      const { stdout: status } = await execPromise('git status -s || echo ""');
      const { stdout: remote } = await execPromise('git remote -v || echo ""');
      res.json({
        branch: branch.trim() || 'main',
        status: status.trim(),
        remote: remote.trim(),
      });
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      res.json({ branch: 'main', status: '', error: errMsg });
    }
  });

  // Mount Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`JobHub server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
