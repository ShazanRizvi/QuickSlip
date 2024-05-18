async function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send("No token provided.");
  }

  const { user, error } = await supabase.auth.api.getUser(token);

  if (error) {
    return res.status(401).send("Invalid token.", error);
  }

  req.user = user; // Attach user to request object
  next();
}
module.exports = authenticate;
