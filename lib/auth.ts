import jwt from 'jsonwebtoken';
import next, { NextApiRequest, NextApiResponse } from 'next';
import prisma from './prisma';

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { TRAX_ACCESS_TOKEN: token } = req.cookies;
    let user;
    try {
      if (token) {
        const { id } = jwt.verify(token, 'hello');
        user = await prisma.user.findUnique({
          where: {
            id,
          },
        });
        if (!user) {
          throw new Error('User not found');
        }
      } else {
        throw new Error('Token not found');
      }
    } catch (error) {
      res.status(401).json({ error: error.message });
      return;
    }
    return handler(req, res, user);
  };
};

export const validateToken = (token) => {
  const user = jwt.verify(token, 'hello');
  return user;
};
