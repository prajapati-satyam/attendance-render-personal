const logout = (req,res) => {
    // res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.clearCookie('token', {path: '/'});
    res.json({redirect: '/', mess: "logout done"});
}



module.exports = logout;