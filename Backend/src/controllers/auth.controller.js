export const signUp = async (req, res) => {
    
    try {
        const { name, username, email, age, specialty, webSite, password } = req.body;

        console.log(name, username, email, age, specialty, webSite, password);

        if (!name || !username || !email || !age || !specialty || !password) {
            return res.response(null, 'Missing fields', 400);
        }

        res.response(null, 'User created', 200);
        

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 500);
    }
}

export const signInPassword = async (req, res) => {
    
    try{
        const { email, password } = req.body;

        res.response(resp , 'User logged', 200);

    } catch (error) {
        console.log(error);
        res.response(null, error.message, 400);
    }
}