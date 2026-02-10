import { sign, verify } from 'jsonwebtoken';

export function generateToken(id, role) {
    return sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '24h'
    });
}

export function verifyToken(token) {
    return verify(token, process.env.JWT_SECRET);
}