import jwt from "jsonwebtoken";

// Genera el token principal para autorizar peticiones protegidas. (Valida las peticiones).
export const generateToken = (uid) => {
  try {
    const expiresIn = 60 * 15;
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
    return { token, expiresIn };
  } catch (error) {
    console.log("GENERATE_TOKEN_ERROR", error);
  }
};

// Regenerar otro token. (No valida las peticiones).
export const generateRefreshToken = (uid, res) => {
  const expiresIn = 60 * 60 * 24 * 30;

  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
      expiresIn,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: !(process.env.MODO === "developer"),
      expires: new Date(Date.now() + expiresIn * 1000),
    });
  } catch (error) {
    console.log("GENERATE_REFRESH_TOKEN", error);
  }
};

// El cliente no va a acceder al token que realmente sirve para hacer las peticiones,
// pero si va a contar un el refresh token y este lo que va a hacer es mandar una solicitud
// al servidor y si este refresh token es válido, le va a regresar al cliente el token verdadero.
// Y con ese token podrá realizar las peticiones y este token que es verdadero solamente va a existir en memoria
// de la computadora del cliente. No va a estar almacenado en ninguna parte (navegador, bd), solamente en una constante en js que se encuentra
// en la memoria ram y de esa forma hacemos más segura la app.
