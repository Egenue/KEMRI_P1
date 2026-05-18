import AdminLogon from '../Models/adminLogon.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerAdmin = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingAdmin = await AdminLogon.findOne({ $or: [{ username }, { email }] });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const newAdmin = new AdminLogon({
            username,
            password: hashedPassword,
            email
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        const admin = await AdminLogon.findOne({ username });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: admin._id, username: admin.username },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            admin: { id: admin._id, username: admin.username, email: admin.email }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export default { loginAdmin, registerAdmin };