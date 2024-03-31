import validator from "validator";
import User from "../db/models/user.model.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
});


export const signUp = async (req, res) => {
  try {
    const { name, email, password, cui, role, verified, birthday } = req.body;

    console.log(req.body);

    if (!name || !email || !password || !cui || !role || !verified || !birthday)
      return res.response(null, "Missing fields", 400);

    if (!validator.isEmail(email))
      return res.response(null, "Invalid email", 400);

    if (!validator.isStrongPassword(password))
      return res.response(null, "Password is not strong enough", 400);

    let user = await User.findOne({ email });

    if (user) return res.response(null, "User already exists", 400);

    let bid = new Date(birthday);
    console.log(bid);
    user = new User({ name, email, password, cui, role, verified, birthday: bid});

    user.password = await user.encryptPassword(password);

    await user.save();

    res.response(
      { name: user.name, email: user.email },
      "User created successfully",
      200
    );
  } catch (error) {
    console.log(error);
    res.response(null, error.message, 500);
  }
};

const convertirStringAFecha = (fechaString) => {
  const partes = fechaString.split("/");
  const dia = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10) - 1;
  const anio = parseInt(partes[2], 10);
  const fecha = new Date(anio, mes, dia);

  return fecha;
}

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.response(null, "Missing fields", 400);

    if (!validator.isEmail(email))
      return res.response(null, "Invalid email", 400);

    const user = await User.findOne({ email });

    if (!user) return res.response(null, "User not found", 404);

    const matchPassword = await user.validatePassword(password, user.password);

    if (!matchPassword) return res.response(null, "Invalid password", 400);

    res.response({ id: user.id, rol: user.role }, "User logged", 200);
  } catch (error) {
    console.log(error);
    res.response(null, error.message, 400);
  }
};

export const recuperarPassword = async (req, res) => {
  //try {
    const { email } = req.params;

    if (!email) return res.response(null, "Missing fields", 400);

    if (!validator.isEmail(email))
      return res.response(null, "Invalid email", 400);

    const user = await User.findOne({ email });

    if (!user) return res.response(null, "User not found", 404);

    //Generar nueva contraseña aleatoria
    const newPassword = Math.random().toString(36).slice(-8);

    //Actualizar contraseña en la base de datos
    user.password = await user.encryptPassword(newPassword);
    await user.save();
    //Enviar correo con la nueva contraseña

    const mailOptions = {
      from: 'MarketPlace <' + process.env.MAIL_USERNAME + '>',
      to: email,
      subject: 'Recuperación de contraseña',
      html: `<h1>Tu nueva contraseña es: <b>${newPassword}</b></h1>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.response(null, error.message, 500);
      } else {
        console.log('Email sent: ' + info.response);
        res.response(null, "Email sent", 200);
      }
    });

    res.response(null, "Email sent", 200);
  /*} catch (error) {
    console.log(error);
    res.response(null, error.message, 500);
  }*/
}
