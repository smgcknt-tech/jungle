module.exports = {
    uploadImage: (req, res) => {
        res.send(`/${req.file.path}`);
    }
}

  