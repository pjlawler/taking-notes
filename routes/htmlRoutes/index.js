const path = require('path');
const router = require('express').Router();

router.get('/notes', (req, res) => {
    // Directs the /notes to then notes.html
    res.sendFile(path.join(__dirname, '../../public/notes.html'))
})
router.get('/', (req, res) => {
    // Directs the main url to the landing page
    res.sendFile(path.join(__dirname, '../../public/index.html'))
});
router.get('*', (req, res) => {
    // Wildcard allows all other redirects to the landing page
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

module.exports = router;


