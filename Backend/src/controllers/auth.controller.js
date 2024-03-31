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

    //Codigo para primer login

    const code = generateCode();


    let bid = new Date(birthday);
    console.log(bid);
    user = new User({ name, email, password, cui, role, verified, birthday: bid, code, verified: false });

    user.password = await user.encryptPassword(password);
    user.code = await user.encryptPassword(code);

    await user.save();

    const mailOptions = {
      from: 'MarketPlace <' + process.env.MAIL_USERNAME + '>',
      to: email,
      subject: 'Verificación de correo',
      html: `<p>Para poder ingresar a tu cuenta, necesitamos que confirmes tu correo electrónico.</p>
            <p>Para confirmar tu correo, ingresa el siguiente código en el apartado de password de la aplicación en el primer inicio de sesión:</p>
            <p><strong>${code}</strong></p>
            <p>Si no has solicitado este correo, puedes ignorarlo.</p>
            <p>¡Gracias!</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.response(null, error.message, 500);
      }
      else {
        console.log('Email sent: ' + info.response);
      }
    });

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

    if (user.verified) {
      const matchPassword = await user.validatePassword(password, user.password);

      if (!matchPassword) return res.response(null, "Invalid password", 400);

      
      res.response({ id: user.id, rol: user.role }, "User logged", 200);
    } else {

      const isCode = await user.validatePassword(password, user.code);

      if (!isCode) return res.response(null, "Invalid code", 400);

      user.verified = true;
      await user.save();

      res.response({ id: user.id, rol: user.role }, "User logged", 200);
    }

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


function generateCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';

  for (let i = 0; i < 12; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return code;
}