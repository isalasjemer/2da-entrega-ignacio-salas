import { RequestHandler } from 'express';

export const roleCheck: RequestHandler = (req, res, next) => {
  if (req.body.admin) {
    return next();
  } else {
    return res.status(401).json({
      error: 'Unauthorized',
      desc: `Route ${req.path} using ${req.method} is only available for admins`,
    });
  }
};
