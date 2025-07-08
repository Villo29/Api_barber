import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';

// Importar todas las rutas
import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';
import appointmentRoutes from './routes/appointment.routes';
import batherRoutes from './routes/bather.routes';
import serviceRoutes from './routes/service.routes';
import packageRoutes from './routes/package.routes';
import orderRoutes from './routes/order.routes';
import shopRoutes from './routes/shop.routes';
import dashboardRoutes from './routes/dashboard.routes';
import batherOptionsRoutes from './routes/bather-options.routes';


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/bathers', batherRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/bather-options', batherOptionsRoutes);


app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ msg: 'Something broke!' });
});

export default app;