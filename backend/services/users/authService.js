import bcrypt from 'bcryptjs';
import { User } from '../../models/Users.js';
import { generateToken } from '../../utils/jwt.js';

export const signupService = async (userData) => {
    const { name, email, password, address } = userData;

    // 1. Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    // 2. Hash Password (Higher rounds = more secure but slower)
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create User in DB
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword, // Store the hash, not the plain text!
        address,
        role: 'USER'
    });

    // 4. Generate JWT
    const token = generateToken(newUser.id, newUser.role);

    return { user: newUser, token };
};

export const loginService = async (credentials) => {
    const { email, password, role } = credentials;

    // 1. Check if user exists
    const user = await User.findByEmail(email);
    if (!user) {
        throw new Error('User not found');
    }

    // 2. Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    //  // Even if password is right, we ensure they are logging into the correct module

    if (user.role !== role) {
        throw new Error(`Role mismatch: Access denied for ${role} module`);
    }

    // 3. Generate JWT
    const token = generateToken(user.id, user.role);

    // 4. remove password before returning it 
    delete user.password;
    return { user, token };
}