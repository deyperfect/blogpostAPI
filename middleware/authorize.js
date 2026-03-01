/**
 * Role-based authorization middleware
 * Usage: authorize('admin') or authorize('admin','moderator')
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    // protect middleware must run first
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Please login.',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. You do not have permission to perform this action.',
      });
    }

    next();
  };
};

module.exports = { authorize };