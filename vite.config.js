import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

const base = process.env.BASE_URL || "";

export default defineConfig({
	plugins: [react()],
	base
})
