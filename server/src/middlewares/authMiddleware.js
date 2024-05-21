const supabase = require("../supabaseClient");

async function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("No token provided.");
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);
    //console.log("data", data);

    if (error) {
      return res.status(401).send("Invalid token.", error);
    }

    req.user = data.user; // Attach user to request object
    next();
  } catch (error) {
    console.error("Error authenticating:", error);
    return res.status(500).send("Internal server error.");
  }
}

module.exports = authenticate;